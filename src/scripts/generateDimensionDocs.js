/**
 * Generates the per-dimension `@property` lines of the `Props` typedef
 * (src/lib/LayerCake.svelte) and the `LayerCakeContext` typedef
 * (src/lib/context.js) from the dimension registry, splicing them into the
 * files in place, so adding a dimension or feature flag updates the
 * published types automatically.
 *
 * Both typedefs stay plain object literals – no cross-module type
 * intersections – because svelte2tsx (which emits LayerCake.svelte.d.ts
 * on `pnpm package`) only resolves local object-literal typedefs.
 *
 * Usage:
 *   node src/scripts/generateDimensionDocs.js          # update the files
 *   node src/scripts/generateDimensionDocs.js --check  # exit 1 if stale
 *
 * Freshness is also enforced by test/lib/dimensionsRegistry.test.js.
 *
 * There are deliberately no marker comments fencing the generated lines:
 * TypeScript ends a `@typedef`'s property list at the first non-`@property`
 * tag, so an inline sentinel would silently drop every following prop from
 * the emitted d.ts. Instead the generated lines are kept as the tail of each
 * typedef and the header prose names the boundary. The splice below is keyed
 * on property names, not markers.
 */
import { readFileSync, writeFileSync } from 'fs';

import {
	DIMENSIONS,
	DIMENSION_KEY_FAMILIES,
	dimensionHasFamily
} from '../lib/settings/dimensions.js';

const ACCESSOR_TYPE = 'string|Function|number|Array<string|Function|number>|undefined';
const DOMAIN_TYPE = '[min: number|null, max: number|null]|Array<string|number>|Function|undefined';
const RANGE_TYPE = '[min: number, max: number]|Function|Array<string|number>|undefined';

/**
 * Per-dimension doc facts that can't be derived from the registry's functions.
 * Every field is optional – dimensions without an entry get the generic
 * template text, so a brand-new dimension needs none of this to ship.
 * @type {Object.<string, {defaultRangeText?: string, reversedRangeText?: string, parent?: string, chartExample?: string, niceType?: string}>}
 */
const FACTS = {
	x: { defaultRangeText: '[0, width]' },
	y: { defaultRangeText: '[0, height]', reversedRangeText: '[height, 0]' },
	z: { defaultRangeText: '[0, width]' },
	r: { defaultRangeText: '[1, 25]', niceType: 'boolean' },
	x1: { parent: 'x', chartExample: 'grouped column charts' },
	y1: { parent: 'y', chartExample: 'grouped bar charts' }
};

/** Prose that is unique to one dimension and not worth templating. */
const CUSTOM = {
	c: {
		accessor:
			'The c accessor, a dedicated color dimension. Its domain is computed from the data like any other dimension and its range defaults to a ten-color categorical palette – supply your own colors via `cRange`.',
		range:
			"The colors of the c scale, as an array or a function with argument `({ width, height, scales })`. Defaults to a ten-color categorical palette (d3's `schemeCategory10`), recycled past ten categories.",
		rangeType: 'Array<string|number>|Function|undefined',
		contextAccessor: 'The c (color) accessor.'
	},
	c1: {
		accessor:
			'The c1 accessor, a second color-like dimension, useful for encoding opacity alongside color. Defaults to a linear scale mapping the data extent to `[0, 1]`.',
		range: 'The range of the c1 scale, such as a list of opacity values. Defaults to `[0, 1]`.',
		rangeType: 'Array<string|number>|Function|undefined',
		contextAccessor: 'The c1 accessor, for a second color-like scale such as opacity.'
	}
};

/** The scale factory's exported name, e.g. the d3 `band` factory -> `scaleBand()`. */
function defaultScaleName(dimension) {
	const fnName = dimension.defaultScale.name || 'scale';
	return `scale${fnName[0].toUpperCase()}${fnName.slice(1)}()`;
}

function isPrimary(dimension) {
	// Primaries support the full feature set; their docs describe the classic x/y/z/r behavior
	return dimension.features.nice === true;
}

// Prop descriptions, one function per family
function accessorProp(dim) {
	const n = dim.name;
	const fact = FACTS[n] || {};
	const custom = CUSTOM[n] || {};
	let desc;
	if (custom.accessor) {
		desc = custom.accessor;
	} else if (fact.parent) {
		desc = `The ${n} accessor, for a scale nested inside the ${fact.parent} scale, such as in ${fact.chartExample}. By default its range is the bandwidth of the ${fact.parent} scale.`;
	} else {
		desc = `The ${n} accessor. The key in each row of data that corresponds to the ${n}-field. This can be a string, an accessor function, a number or an array of any combination of those types. This property gets converted to a function when you access it through the context.`;
	}
	return { type: ACCESSOR_TYPE, desc };
}

function domainProp(dim) {
	const n = dim.name;
	const desc = isPrimary(dim)
		? "Set a min or max. For linear scales, if you want to inherit the value from the data's extent, set that value to `null`. This value can also be an array because sometimes your scales are [piecewise](https://github.com/d3/d3-scale#continuous_domain) or are a list of discrete values such as in [ordinal scales](https://github.com/d3/d3-scale#ordinal-scales), useful for color series. Set it to a function that receives the computed domain and lets you return a modified domain, useful for sorting values."
		: `Set the domain of the ${n} scale. Computed from the data by default, like any other dimension.`;
	return { type: DOMAIN_TYPE, desc };
}

function niceProp(dim) {
	const fact = FACTS[dim.name] || {};
	return {
		type: fact.niceType || 'boolean|number',
		desc: `Applies D3's [scale.nice()](https://github.com/d3/d3-scale#continuous_nice) to the ${dim.name} domain.`
	};
}

function paddingProp() {
	return {
		type: '[leftPixels: number, rightPixels: number]|undefined',
		desc: 'Assign a pixel value to add to the min or max of the scale. This will increase the scales domain by the scale unit equivalent of the provided pixels.'
	};
}

function scaleProp(dim) {
	const n = dim.name;
	const preserveNote = ` A range you customized on the scale you pass in is preserved – set \`${n}Range\` to override it.`;
	const desc = isPrimary(dim)
		? `The D3 scale that should be used for the ${n}-dimension. Pass in an instantiated D3 scale if you want to override the default or you want extra options.${preserveNote}`
		: `The D3 scale that should be used for the ${n}-dimension. Defaults to a \`${defaultScaleName(dim)}\`.${preserveNote}`;
	return { type: 'Function', desc };
}

function rangeProp(dim) {
	const n = dim.name;
	const fact = FACTS[n] || {};
	const custom = CUSTOM[n] || {};
	if (custom.range) return { type: custom.rangeType || RANGE_TYPE, desc: custom.range };
	if (fact.parent) {
		return {
			type: RANGE_TYPE,
			desc: `Override the default ${n} range, which is the bandwidth of the ${fact.parent} scale. Functions receive \`({ width, height, scales })\` where \`scales\` holds the computed sibling scales, e.g. \`${n}Range={({ scales }) => [0, scales.${fact.parent}.bandwidth() / 2]}\`.`
		};
	}
	const reverseNote =
		dim.features.reverse === true ? ` Setting this prop overrides \`${n}Reverse\`.` : '';
	return {
		type: RANGE_TYPE,
		desc: `Override the default ${n} range of \`${fact.defaultRangeText || 'the chart size'}\` by setting an array or function with argument \`({ width, height, scales })\` that returns an array.${reverseNote} This can also be a list of numbers or strings for scales with discrete ranges like [scaleThreshold](https://github.com/d3/d3-scale#threshold-scales) or [scaleQuantize](https://github.com/d3/d3-scale#quantize-scales).`
	};
}

function reverseProp(dim) {
	const n = dim.name;
	const fact = FACTS[n] || {};
	if (typeof dim.defaultReverse === 'function') {
		return {
			type: 'boolean|undefined',
			desc: `Reverse the default ${n} range. By default this is set dynamically and will be \`true\` – setting the range to \`${fact.reversedRangeText || 'its reversed default'}\` – unless the \`${n}Scale\` has a \`.bandwidth\` method. Dynamic behavior is overridden if the user sets the prop. Ignored if you set the \`${n}Range\` prop.`
		};
	}
	return {
		type: 'boolean',
		desc: `Reverse the default ${n} range. By default this is \`false\` and the range is \`${fact.defaultRangeText || 'the default range'}\`. Ignored if you set the \`${n}Range\` prop.`
	};
}

function domainSortProp(dim) {
	const n = dim.name;
	const desc = isPrimary(dim)
		? 'Only used when scale is ordinal. Set whether the calculated unique items come back sorted.'
		: `Set whether the ${n} scale's calculated unique items come back sorted.`;
	return { type: 'boolean', desc };
}

/** @type {Object.<string, (dim: any) => {type: string, desc: string}>} */
const PROP_TEMPLATES = {
	'': accessorProp,
	Domain: domainProp,
	Nice: niceProp,
	Padding: paddingProp,
	Scale: scaleProp,
	Range: rangeProp,
	Reverse: reverseProp,
	DomainSort: domainSortProp
};

/* Family-major ordering for props, dimension-major for the context */
const PROP_FAMILY_ORDER = [
	'',
	'Domain',
	'Nice',
	'Padding',
	'Scale',
	'Range',
	'Reverse',
	'DomainSort'
];
const CONTEXT_FAMILY_ORDER = [
	'',
	'Scale',
	'Get',
	'Domain',
	'Range',
	'Nice',
	'Padding',
	'Reverse',
	'DomainSort'
];

// Context descriptions, one function per family
/** @type {Object.<string, (dim: any) => {type: string, desc: string}>} */
const CONTEXT_TEMPLATES = {
	'': dim => ({
		type: 'Function|null',
		desc:
			(CUSTOM[dim.name] || {}).contextAccessor ||
			(FACTS[dim.name]?.parent
				? `The ${dim.name} accessor, for a scale nested inside the ${FACTS[dim.name].parent} scale such as in ${FACTS[dim.name].chartExample}.`
				: `The ${dim.name} accessor.`)
	}),
	// Scales and getters are typed `Scale` rather than `Function|undefined`. Two
	// reasons: `Function` has no properties, so `c.xScale.ticks()` wouldn't
	// type-check, and the `|undefined` forced a guard at every call even though a
	// component reading its own dimension can only run if that dimension is set.
	// Domain and Range keep their `|undefined` – those are what one dimension
	// reads off another, where absence is real. See context.js.
	Scale: dim => ({
		type: `ScaleFor<S, '${dim.name}'>`,
		desc: `The computed ${dim.name} scale.`
	}),
	Get: dim => ({
		type: `ScaleFor<S, '${dim.name}'>`,
		desc: `Runs a datum through the ${dim.name} accessor and scale.`
	}),
	Domain: dim => ({
		type: 'Array<any>|undefined',
		desc:
			dim.features.nice === true
				? `The ${dim.name} scale's domain, which may have been modified by \`.nice()\`.`
				: `The ${dim.name} scale's domain.`
	}),
	Range: dim => ({ type: 'Array<any>|undefined', desc: `The ${dim.name} scale's range.` }),
	Nice: dim => ({
		type: (FACTS[dim.name] || {}).niceType || 'boolean|number',
		desc: `Whether \`.nice()\` was applied to the ${dim.name} domain.`
	}),
	Padding: dim => ({
		type: '[number, number]|undefined',
		desc: `The pixel padding applied to the ${dim.name} domain, as \`[left, right]\`.`
	}),
	Reverse: dim => ({
		type: 'boolean',
		desc: `Whether the default ${dim.name} range is reversed.`
	}),
	DomainSort: dim => ({
		type: 'boolean',
		desc: `Whether the ${dim.name} domain's calculated unique values are sorted.`
	})
};

const familiesBySuffix = Object.fromEntries(DIMENSION_KEY_FAMILIES.map(f => [f.suffix, f]));

/** Every name matching the dimension-key pattern, whether currently enabled or not. */
export const allPatternNames = new Set(
	DIMENSIONS.flatMap(d => DIMENSION_KEY_FAMILIES.map(f => `${d.name}${f.suffix}`))
);

/**
 * The generated `@property` lines for the Props typedef in LayerCake.svelte.
 * @param {string} prefix The comment-line prefix, e.g. `\t * ` in a .svelte script block.
 * @returns {Array<string>}
 */
export function generatePropLines(prefix) {
	const lines = [];
	for (const suffix of PROP_FAMILY_ORDER) {
		const family = familiesBySuffix[suffix];
		for (const dimension of DIMENSIONS) {
			if (family.isProp !== true || !dimensionHasFamily(dimension, family)) continue;
			const { type, desc } = PROP_TEMPLATES[suffix](dimension);
			lines.push(`${prefix}@property {${type}} [${dimension.name}${suffix}] - ${desc}`);
		}
	}
	return lines;
}

/**
 * The generated `@property` lines for the LayerCakeContext typedef in context.js.
 * @param {string} prefix The comment-line prefix, e.g. ` * `.
 * @returns {Array<string>}
 */
export function generateContextLines(prefix) {
	const lines = [];
	for (const dimension of DIMENSIONS) {
		for (const suffix of CONTEXT_FAMILY_ORDER) {
			const family = familiesBySuffix[suffix];
			if (!dimensionHasFamily(dimension, family)) continue;
			const { type, desc } = CONTEXT_TEMPLATES[suffix](dimension);
			lines.push(`${prefix}@property {${type}} ${dimension.name}${suffix} ${desc}`);
		}
	}
	return lines;
}

/**
 * Return the `@property` name declared on a JSDoc line, or null.
 * @param {string} line
 * @returns {string|null}
 */
export function propertyName(line) {
	if (!line.includes('@property')) return null;
	const match = line.match(/@property\s+\{.*\}\s+\[?([\w$]+)/);
	return match ? match[1] : null;
}

/**
 * Replace the dimension `@property` lines in a source file with the
 * generated set: existing dimension lines are removed and the generated
 * lines are inserted where the first one was (idempotent).
 * @param {string} source The file contents.
 * @param {Array<string>} generatedLines
 * @returns {string}
 */
export function spliceDimensionLines(source, generatedLines) {
	const lines = source.split('\n');
	const kept = [];
	let insertAt = -1;
	for (const line of lines) {
		const name = propertyName(line);
		if (name !== null && allPatternNames.has(name)) {
			if (insertAt === -1) insertAt = kept.length;
			continue;
		}
		kept.push(line);
	}
	if (insertAt === -1) {
		throw new Error(
			'[generateDimensionDocs] Found no dimension @property lines to replace – the typedef anchor is missing.'
		);
	}
	kept.splice(insertAt, 0, ...generatedLines);
	return kept.join('\n');
}

/** The files the generator owns dimension lines in, with their comment prefixes. */
export const TARGETS = [
	{ path: 'src/lib/LayerCake.svelte', generate: () => generatePropLines('\t * ') },
	{ path: 'src/lib/context.js', generate: () => generateContextLines(' * ') }
];

// CLI
const isCli = process.argv[1] && process.argv[1].endsWith('generateDimensionDocs.js');
if (isCli) {
	const check = process.argv.includes('--check');
	let stale = false;
	for (const target of TARGETS) {
		const current = readFileSync(target.path, 'utf-8');
		const next = spliceDimensionLines(current, target.generate());
		if (next === current) {
			console.log(`[generateDimensionDocs] ${target.path} is up to date.`);
		} else if (check) {
			console.error(
				`[generateDimensionDocs] ${target.path} is out of date. Run \`npm run generate:dims\` and commit the result.`
			);
			stale = true;
		} else {
			writeFileSync(target.path, next);
			console.log(`[generateDimensionDocs] Updated ${target.path}.`);
		}
	}
	if (stale) process.exit(1);
}
