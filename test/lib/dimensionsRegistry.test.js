/* globals describe it */
import * as assert from 'assert';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import {
	DIMENSIONS,
	DIMENSION_KEY_FAMILIES,
	dimensionHasFamily
} from '../../src/lib/settings/dimensions.js';
import { TARGETS, spliceDimensionLines } from '../../src/scripts/generateDimensionDocs.js';

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

/** The prop names the registry generates, i.e. what LayerCake.svelte accepts. */
const expectedProps = [];
/** The context keys the registry generates, i.e. what getLayerCakeContext() returns. */
const expectedContextKeys = [];

for (const dimension of DIMENSIONS) {
	for (const family of DIMENSION_KEY_FAMILIES) {
		if (dimensionHasFamily(dimension, family)) {
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

describe('dimensions registry typedef generation', () => {
	TARGETS.forEach(target => {
		describe(target.path, () => {
			const source = repoFile(target.path);

			it('is up to date with the registry', () => {
				assert.strictEqual(
					spliceDimensionLines(source, target.generate()),
					source,
					`The dimension @property lines in ${target.path} are stale. Run \`npm run generate:dims\` and commit the result.`
				);
			});

			it('declares exactly the keys the registry generates', () => {
				const declared = declaredDimensionProperties(source);
				const expected = expectedByPath[target.path];
				assert.deepStrictEqual([...declared].sort(), [...expected].sort());
			});
		});
	});
});
