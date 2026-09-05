/* globals describe it */
import * as assert from 'assert';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { scaleBand } from 'd3-scale';

import {
	DIMENSIONS,
	DIMENSION_KEY_FAMILIES,
	FAMILIES_BY_DIMENSION
} from '../../src/lib/settings/dimensions.js';
import { TARGETS, spliceDimensionLines, FACTS } from '../../src/scripts/generateDimensionDocs.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function repoFile(filePath) {
	return readFileSync(path.join(__dirname, '../../', filePath), 'utf-8');
}

// Parsed independently of the generator so this check can catch its bugs too
const patternNames = new Set(
	DIMENSIONS.flatMap(d => DIMENSION_KEY_FAMILIES.map(f => `${d.name}${f.suffix}`))
);

function declaredDimensionProperties(source) {
	const names = [];
	for (const line of source.split('\n')) {
		const match = line.match(/@property\s+\{.*\}\s+\[?([\w$]+)/);
		if (match && patternNames.has(match[1])) names.push(match[1]);
	}
	return names;
}

/** The prop names the dimension tables generate, i.e. what LayerCake.svelte accepts. */
const expectedProps = [];
/** The context keys the dimension tables generate, i.e. what getLayerCakeContext() returns. */
const expectedContextKeys = [];

for (const dimension of DIMENSIONS) {
	for (const family of DIMENSION_KEY_FAMILIES) {
		if (FAMILIES_BY_DIMENSION[dimension.name].includes(family)) {
			const key = `${dimension.name}${family.suffix}`;
			if (family.isProp === true) expectedProps.push(key);
			expectedContextKeys.push(key);
		}
	}
}

const expectedByPath = {
	'src/lib/LayerCake.svelte': expectedProps,
	'src/lib/context.js': expectedContextKeys
};

describe('dimension typedef generation', () => {
	TARGETS.forEach(target => {
		describe(target.path, () => {
			const source = repoFile(target.path);

			it('is up to date with settings/dimensions.js', () => {
				// Markdown targets splice on marker comments, JSDoc targets on property names
				const regenerated = target.splice
					? target.splice(source)
					: spliceDimensionLines(source, target.generate());
				assert.strictEqual(
					regenerated,
					source,
					`${target.path} is stale. Run \`npm run generate:dims\` and commit the result.`
				);
			});

			const expected = expectedByPath[target.path];
			if (expected) {
				it('declares exactly the keys the dimension tables generate', () => {
					const declared = declaredDimensionProperties(source);
					assert.deepStrictEqual([...declared].sort(), [...expected].sort());
				});
			}
		});
	});
});

// The freshness test above only proves the files match the generator. This
// one proves the generator's hand-written FACTS strings still describe the
// actual defaultRange functions, so changing a default in
// settings/dimensions.js can't leave stale prose in the published types and guides.
describe('generator FACTS agree with the dimension entries', () => {
	const w = 100;
	const h = 50;
	const ctx = {
		width: w,
		height: h,
		percentRange: false,
		rangeWidth: w,
		rangeHeight: h,
		scales: {}
	};

	function rangeFromText(text) {
		return JSON.parse(text.replace('width', String(w)).replace('height', String(h)));
	}

	DIMENSIONS.forEach(dimension => {
		const fact = FACTS[dimension.name] || {};
		if (fact.defaultRangeText) {
			it(`${dimension.name}: defaultRangeText "${fact.defaultRangeText}" matches defaultRange()`, () => {
				assert.deepStrictEqual(dimension.defaultRange(ctx), rangeFromText(fact.defaultRangeText));
			});
		}
		if (fact.reversedRangeText) {
			it(`${dimension.name}: reversedRangeText "${fact.reversedRangeText}" is the reverse of defaultRange()`, () => {
				assert.deepStrictEqual(
					dimension.defaultRange(ctx).slice().reverse(),
					rangeFromText(fact.reversedRangeText)
				);
			});
		}
		if (dimension.parent) {
			it(`${dimension.name}: default range reads its declared parent '${dimension.parent}'`, () => {
				const parentScale = scaleBand().domain(['a', 'b']).range([0, w]);
				const withParent = dimension.defaultRange({
					...ctx,
					scales: { [dimension.parent]: parentScale }
				});
				assert.deepStrictEqual(withParent, [0, parentScale.bandwidth()]);
				// With no parent scale to measure it falls back to the whole chart,
				// along whichever axis the parent runs on
				const chartSpan = dimension.parent === 'y' ? ctx.rangeHeight : ctx.rangeWidth;
				assert.deepStrictEqual(dimension.defaultRange(ctx), [0, chartSpan]);
			});
		}
	});
});

describe('guide documents every dimension prop', () => {
	// The generator only fills the marker regions, so a prop could still go
	// undocumented if nobody adds a region for its family. This catches that.
	const source = repoFile('src/content/guide/03-layercake-props.md');
	const documented = new Set([...source.matchAll(/^### (\w+) /gm)].map(m => m[1]));

	it('has a section for every prop the dimension tables accept', () => {
		const missing = expectedProps.filter(name => !documented.has(name));
		assert.deepStrictEqual(
			missing,
			[],
			`These props are accepted but undocumented in the guide: ${missing.join(', ')}`
		);
	});
});
