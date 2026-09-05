/**
 * Writes the per-dimension documentation from settings/dimensions.js, so
 * adding a dimension or feature flag updates everything that depends on it.
 * It writes four files, of two kinds:
 *
 * - The `Props` typedef (src/lib/LayerCake.svelte) and the `LayerCakeContext`
 *   typedef (src/lib/context.js). These are the published types.
 * - The repeated "Same as xDomain but for the y scale" sections in guides 03
 *   and 04. These are the published docs.
 *
 * Both typedefs stay plain object literals with no type intersections from
 * other modules. svelte2tsx, which emits LayerCake.svelte.d.ts on
 * `pnpm package`, can only resolve local object-literal typedefs.
 *
 * Usage:
 *   node src/scripts/generateDimensionDocs.js          # update the files
 *   node src/scripts/generateDimensionDocs.js --check  # exit 1 if stale
 *
 * test/lib/dimensionsRegistry.test.js also fails if the files are stale.
 *
 * The two kinds are spliced differently. The JSDoc typedefs have no marker
 * comments around the generated lines. TypeScript stops reading a typedef's
 * property list at the first tag that isn't `@property`, so a marker tag
 * would silently drop every prop after it from the emitted d.ts. Instead the
 * generated lines sit at the end of each typedef and are swapped out by
 * property name. Markdown has no such problem, so the guides use
 * `<!-- generated:X -->` markers. That keeps each hand-written primary section
 * next to the generated siblings it explains.
 */
import { readFileSync, writeFileSync } from 'fs';

import {
	DIMENSIONS,
	DIMENSION_KEY_FAMILIES,
	FAMILIES_BY_DIMENSION
} from '../lib/settings/dimensions.js';

// Ask "does x2 have Nice?" by checking the per-dimension family lists in
// settings/dimensions.js. `includes` works because both tables share the same
// family objects.
function hasFamily(dimension, family) {
	return FAMILIES_BY_DIMENSION[dimension.name].includes(family);
}

/*
 * The three value shapes every dimension prop uses, defined in src/lib/types.js.
 * The Props typedef uses these names instead of spelling out the same union
 * about forty times. LayerCake.svelte imports the names and the package exports
 * them, so users can write `import('layercake').DataAccessor`.
 *
 * The guide headings still print the full unions. A reader scanning the props
 * table wants the shape, not a name they'd have to look up.
 */
const ACCESSOR_TYPE = 'DataAccessor';
const DOMAIN_TYPE = 'DimensionDomain';
const RANGE_TYPE = 'DimensionRange';

/**
 * Per-dimension doc facts that can't be worked out from the dimension entries.
 * Every field is optional. A dimension without an entry gets the generic
 * template text, so a new dimension needs none of this to ship.
 *
 * Exported so test/lib/dimensionsRegistry.test.js can run each `defaultRange`
 * and check these strings still describe it. That way a change in
 * settings/dimensions.js can't leave stale text in the published types.
 * Nesting parents live on the dimension entries themselves (`dimension.parent`).
 * @type {Object.<string, {defaultRangeText?: string, reversedRangeText?: string, chartExample?: string, niceType?: string}>}
 */
export const FACTS = {
	x: { defaultRangeText: '[0, width]' },
	y: { defaultRangeText: '[0, height]', reversedRangeText: '[height, 0]' },
	z: { defaultRangeText: '[0, width]' },
	r: { defaultRangeText: '[1, 25]', niceType: 'boolean' },
	x2: { chartExample: 'grouped column charts' },
	y2: { chartExample: 'grouped bar charts' }
};

/** Prose that is unique to one dimension and not worth templating. */
const CUSTOM = {
	c: {
		accessor:
			'The c accessor, a dedicated color dimension. Its domain is computed from the data like any other dimension and its range defaults to a ten-color categorical palette – supply your own colors via `cRange`.',
		range:
			"The colors of the c scale, as an array or a function with argument `({ width, height, rangeWidth, rangeHeight, percentRange, scales })`. Defaults to a ten-color categorical palette (d3's `schemeCategory10`), recycled past ten categories.",
		guideRangeType: 'Array<string|number>|Function',
		contextAccessor: 'The c (color) accessor.'
	},
	c2: {
		accessor:
			'The c2 accessor, a second color-like dimension, useful for encoding opacity alongside color. Defaults to a linear scale mapping the data extent to `[0, 1]`.',
		range: 'The range of the c2 scale, such as a list of opacity values. Defaults to `[0, 1]`.',
		guideRangeType: 'Array<string|number>|Function',
		contextAccessor: 'The c2 accessor, for a second color-like scale such as opacity.'
	}
};

/** The scale factory's exported name, e.g. the d3 `band` factory -> `scaleBand()`. */
function defaultScaleName(dimension) {
	const fnName = dimension.defaultScale.name || 'scale';
	return `scale${fnName[0].toUpperCase()}${fnName.slice(1)}()`;
}

function isPrimary(dimension) {
	// Read `isPrimary` straight off the entry. Working it out from a feature
	// flag would mean turning on a feature could silently change how a
	// dimension is documented.
	return dimension.isPrimary === true;
}

// Prop descriptions, one function per family
function accessorProp(dim) {
	const n = dim.name;
	const fact = FACTS[n] || {};
	const custom = CUSTOM[n] || {};
	let desc;
	if (custom.accessor) {
		desc = custom.accessor;
	} else if (dim.parent) {
		desc = `The ${n} accessor, for a scale nested inside the ${dim.parent} scale, such as in ${fact.chartExample}. By default its range is the bandwidth of the ${dim.parent} scale.`;
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
	if (custom.range) return { type: RANGE_TYPE, desc: custom.range };
	if (dim.parent) {
		return {
			type: RANGE_TYPE,
			desc: `Override the default ${n} range, which is the bandwidth of the ${dim.parent} scale. Functions receive \`({ width, height, rangeWidth, rangeHeight, percentRange, scales })\` where \`scales\` holds the computed sibling scales, e.g. \`${n}Range={({ scales }) => [0, scales.${dim.parent}.bandwidth() / 2]}\`.`
		};
	}
	const reverseNote =
		dim.features.reverse === true ? ` Setting this prop overrides \`${n}Reverse\`.` : '';
	return {
		type: RANGE_TYPE,
		desc: `Override the default ${n} range of \`${fact.defaultRangeText || 'the chart size'}\` by setting an array or function with argument \`({ width, height, rangeWidth, rangeHeight, percentRange, scales })\` that returns an array.${reverseNote} This can also be a list of numbers or strings for scales with discrete ranges like [scaleThreshold](https://github.com/d3/d3-scale#threshold-scales) or [scaleQuantize](https://github.com/d3/d3-scale#quantize-scales).`
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
	// The "only when ordinal" caveat applies to every dimension. Sorting only
	// happens when measuring unique values, so on c2's default linear scale
	// the prop does nothing.
	const desc = isPrimary(dim)
		? 'Only used when scale is ordinal. Set whether the calculated unique items come back sorted.'
		: `Only used when the scale is ordinal. Set whether the ${n} scale's calculated unique items come back sorted.`;
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

// Context descriptions, one function per family.
//
// x, y, z and r are typed as always there. A component reading `k.xScale` is an
// x component, so warning that it might be missing is only noise. x2, y2, c and
// c2 stay optional. Components really do ask whether those are set up, the way
// `k.cGet?.(d)` colors a mark only when there is a c scale to color it with.
//
// So these types describe a chart that uses the dimension. On a chart that
// skips it the value is missing, which each x/y/z/r description says in words.
/** The sentence added to each x/y/z/r description saying what the key holds on a chart that never sets that dimension. */
function unsetNote(dim, value) {
	return ` On a chart that never sets \`${dim.name}\`, this is \`${value}\` at runtime.`;
}
/** @type {Object.<string, (dim: any) => {type: string, desc: string}>} */
const CONTEXT_TEMPLATES = {
	'': dim => {
		const desc =
			(CUSTOM[dim.name] || {}).contextAccessor ||
			(dim.parent
				? `The ${dim.name} accessor, for a scale nested inside the ${dim.parent} scale such as in ${FACTS[dim.name].chartExample}.`
				: `The ${dim.name} accessor.`);
		return isPrimary(dim)
			? { type: 'Accessor', desc: desc + unsetNote(dim, 'null') }
			: { type: 'Accessor|null', desc };
	},
	// Scales are typed `Scale` rather than `Function` because `Function` has no
	// properties, so `k.xScale.ticks()` wouldn't type-check. See context.js.
	Scale: dim => ({
		type: isPrimary(dim) ? `ScaleFor<S, '${dim.name}'>` : `ScaleFor<S, '${dim.name}'>|undefined`,
		desc: `The computed ${dim.name} scale.` + (isPrimary(dim) ? unsetNote(dim, 'undefined') : '')
	}),
	// A getter takes a row of data, not a domain value. It has no scale
	// methods either. So it gets its own type instead of the scale's.
	Get: dim => ({
		type: isPrimary(dim) ? 'Getter' : 'Getter|undefined',
		desc:
			`Runs a datum through the ${dim.name} accessor and scale.` +
			(isPrimary(dim) ? unsetNote(dim, 'undefined') : '')
	}),
	Domain: dim => ({
		type: isPrimary(dim) ? 'Array<any>' : 'Array<any>|undefined',
		desc:
			(isPrimary(dim)
				? `The ${dim.name} scale's domain, which may have been modified by \`.nice()\`.`
				: `The ${dim.name} scale's domain.`) + (isPrimary(dim) ? unsetNote(dim, 'undefined') : '')
	}),
	Range: dim => ({
		type: isPrimary(dim) ? 'Array<any>' : 'Array<any>|undefined',
		desc: `The ${dim.name} scale's range.` + (isPrimary(dim) ? unsetNote(dim, 'undefined') : '')
	}),
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
			if (family.isProp !== true || !hasFamily(dimension, family)) continue;
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
			if (!hasFamily(dimension, family)) continue;
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
 * generated set. Existing dimension lines are removed and the generated
 * lines go where the first one was. Running it again changes nothing.
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

/*
 * Guide sections.
 *
 * Guides 03 and 04 explain one dimension per family by hand. `xDomain` gets
 * the real explanation. Then every sibling repeats it ("Same as xDomain but
 * for the y scale"). Those repeats are what we generate, so a new dimension
 * can't ship undocumented.
 *
 * Markdown can hold marker comments safely, so each run of siblings sits
 * between `<!-- generated:Domain -->` and its closing tag. The hand-written
 * primary section stays above the markers.
 *
 * The links are spelled out per guide instead of computed. The site gives
 * duplicate headings across guide files a number, so `xDomain` anchors as
 * `#xdomain` in the props guide but `#xdomain-1` in the context guide.
 */

/** The link label and target for a family's hand-written section, per guide. */
const PROPS_GUIDE = 'src/content/guide/03-layercake-props.md';
const CONTEXT_GUIDE = 'src/content/guide/04-computed-context-values.md';

/** @type {Array<{path: string, families: Object.<string, {heading: (dim: any) => string, body: (dim: any) => string}>}>} */
export const GUIDES = [
	{
		path: PROPS_GUIDE,
		families: {
			Scale: {
				heading: dim => `d3.${defaultScaleName(dim)}`,
				body: dim =>
					`Same as [xScale](/guide#xscale) but for the ${dim.name} scale. The default is \`d3.${defaultScaleName(dim)}\`.`
			},
			Domain: {
				heading: () => 'Array:[min: number|null, max: number|null]|Array<number|string>|Function',
				body: dim => `Same as [xDomain](/guide#xdomain) but for the ${dim.name} scale.`
			},
			Range: {
				heading: dim =>
					(CUSTOM[dim.name] || {}).guideRangeType ||
					'Function|Array:[min: number, max: number]|Array<number|string>',
				body: dim => {
					const custom = (CUSTOM[dim.name] || {}).range;
					if (custom) return custom;
					// A nested dimension's range defaults to its parent's bandwidth, so
					// "same as xRange" would be wrong here
					if (dim.parent) {
						return `Same as [xRange](/guide#xrange) but for the ${dim.name} scale, which defaults to the bandwidth of the ${dim.parent} scale. Pass a function to customize it, e.g. \`${dim.name}Range={({ scales }) => [0, scales.${dim.parent}.bandwidth() / 2]}\`.`;
					}
					return `Same as [xRange](/guide#xrange) but for the ${dim.name} scale.`;
				}
			},
			Nice: {
				// Match the hand-written xNice heading. The default belongs to the
				// boolean, so it reads `boolean=false|number` and not `boolean|number=false`
				heading: dim =>
					(FACTS[dim.name] || {}).niceType === 'boolean' ? 'boolean=false' : 'boolean=false|number',
				body: dim => `Same as [xNice](/guide#xnice) but for the ${dim.name} domain.`
			},
			Padding: {
				heading: () => 'Array:[leftPixels: number, rightPixels: number]',
				body: dim => `Same as [xPadding](/guide#xpadding) but for the ${dim.name} domain.`
			},
			Reverse: {
				heading: dim => `boolean=${dim.name === 'y' ? 'true' : 'false'}`,
				body: dim => {
					const fact = FACTS[dim.name] || {};
					// When the default is worked out at runtime there is an exception the
					// reader needs to know about. y flips to `false` for band scales. So
					// "same as xReverse" would be wrong here.
					if (typeof dim.defaultReverse === 'function') {
						return `Same as [xReverse](/guide#xreverse) but for the ${dim.name} range, and the default is worked out rather than fixed. It is \`true\` – making the range \`${fact.reversedRangeText || 'its reverse'}\` – unless the \`${dim.name}Scale\` has a \`.bandwidth\` method, as \`scaleBand\` and \`scalePoint\` do, in which case it is \`false\` so the values read top-down. Setting the prop yourself overrides that.`;
					}
					return `Same as [xReverse](/guide#xreverse) but for the ${dim.name} range, which defaults to \`${fact.defaultRangeText || 'its default'}\`.`;
				}
			},
			DomainSort: {
				heading: () => 'boolean=false',
				body: dim =>
					dim.name === 'x2'
						? 'Same as [xDomainSort](/guide#xdomainsort) but for the x2 domain, which controls the order of the groups in a [grouped column chart](/example/ColumnGrouped).'
						: `Same as [xDomainSort](/guide#xdomainsort) but for the ${dim.name} domain.`
			}
		}
	},
	{
		path: CONTEXT_GUIDE,
		families: {
			'': {
				heading: () => 'Function',
				body: dim => `Same as [x](/guide#x-1) but for the ${dim.name} dimension.`
			},
			Scale: {
				heading: () => 'Function',
				body: dim => `Same as [xScale](/guide#xscale-1) but for the ${dim.name} scale.`
			},
			Domain: {
				heading: () => 'Array:[min: number, max: number]',
				body: dim => `Same as [xDomain](/guide#xdomain-1) above but for the ${dim.name} domain.`
			},
			Range: {
				heading: () => 'Array:[min: number, max: number]',
				body: dim => `Same as [xRange](/guide#xrange-1) above but for the ${dim.name} domain.`
			},
			Get: {
				heading: () => '(d: `Object`)',
				body: dim => `Same as [xGet](/guide#xget) but for the ${dim.name} scale.`
			}
		}
	}
];

/**
 * The markdown for one family's sibling sections, i.e. every dimension that
 * supports the family except the hand-written primary, `x`.
 * @param {{heading: (dim: any) => string, body: (dim: any) => string}} template
 * @param {string} suffix
 * @returns {string}
 */
export function generateGuideFamily(template, suffix) {
	const family = familiesBySuffix[suffix];
	const blocks = [];
	for (const dimension of DIMENSIONS) {
		if (dimension.name === 'x' || !hasFamily(dimension, family)) continue;
		const name = `${dimension.name}${suffix}`;
		const heading = template.heading(dimension);
		// The Get family renders its args inside the heading rather than after it
		const title = suffix === 'Get' ? `${name}${heading}` : `${name} \`${heading}\``;
		blocks.push(`### ${title}\n\n${template.body(dimension)}`);
	}
	return blocks.join('\n\n');
}

/**
 * Replace the contents of each `<!-- generated:X -->` region in a markdown
 * file. Missing markers are an error. Skipping them quietly is how a
 * dimension ends up undocumented.
 * @param {string} source
 * @param {Object.<string, {heading: (dim: any) => string, body: (dim: any) => string}>} families
 * @param {string} path Only used for the error message.
 * @returns {string}
 */
export function spliceGuideSections(source, families, path) {
	let next = source;
	for (const [suffix, template] of Object.entries(families)) {
		const key = suffix === '' ? 'accessor' : suffix;
		const open = `<!-- generated:${key} -->`;
		const close = `<!-- /generated:${key} -->`;
		const start = next.indexOf(open);
		const end = next.indexOf(close);
		if (start === -1 || end === -1 || end < start) {
			throw new Error(`[generateDimensionDocs] ${path} is missing the ${open} … ${close} markers.`);
		}
		const body = generateGuideFamily(template, suffix);
		next = `${next.slice(0, start + open.length)}\n\n${body}\n\n${next.slice(end)}`;
	}
	return next;
}

/** The files the generator owns dimension lines in, with their comment prefixes. */
export const TARGETS = [
	{ path: 'src/lib/LayerCake.svelte', generate: () => generatePropLines('\t * ') },
	{ path: 'src/lib/context.js', generate: () => generateContextLines(' * ') },
	...GUIDES.map(guide => ({
		path: guide.path,
		splice: (/** @type {string} */ source) =>
			spliceGuideSections(source, guide.families, guide.path)
	}))
];

// CLI
const isCli = process.argv[1] && process.argv[1].endsWith('generateDimensionDocs.js');
if (isCli) {
	const check = process.argv.includes('--check');
	let stale = false;
	for (const target of TARGETS) {
		const current = readFileSync(target.path, 'utf-8');
		// JSDoc targets splice by property name; markdown targets by marker comment
		const next = target.splice
			? target.splice(current)
			: spliceDimensionLines(current, target.generate());
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
