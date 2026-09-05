/* globals describe it */
import * as assert from 'assert';
import { scaleLinear, scaleBand, scaleOrdinal, scaleSequential, scaleDiverging } from 'd3-scale';

import createScale from '../../src/lib/helpers/createScale.js';
import { DIMENSIONS } from '../../src/lib/settings/dimensions.js';

const dims = Object.fromEntries(DIMENSIONS.map(d => [d.name, d]));

const w = 900;
const h = 500;

const scheme = ['#1f77b4', '#ff7f0e', '#2ca02c'];

// Independent copy of the default c palette – must match d3's schemeCategory10
const schemeCategory10 = [
	'#1f77b4',
	'#ff7f0e',
	'#2ca02c',
	'#d62728',
	'#9467bd',
	'#8c564b',
	'#e377c2',
	'#7f7f7f',
	'#bcbd22',
	'#17becf'
];

function ctx(overrides = {}) {
	const base = { width: w, height: h, percentRange: false, scales: {}, ...overrides };
	base.rangeWidth = base.percentRange === true ? 100 : base.width;
	base.rangeHeight = base.percentRange === true ? 100 : base.height;
	return base;
}

function run(opts) {
	return createScale({ nice: false, reverse: false, ctx: ctx(), ...opts });
}

describe('createScale', () => {
	describe('preserves a customized range on a passed-in scale (#364)', () => {
		it('keeps an ordinal color scheme passed via the scale initializer', () => {
			const scale = run({
				dimension: dims.z,
				scale: scaleOrdinal(scheme),
				domain: ['a', 'b', 'c']
			});
			assert.deepStrictEqual(scale.range(), scheme);
		});

		it('keeps a customized linear range', () => {
			const scale = run({
				dimension: dims.x,
				scale: scaleLinear().range([10, 500]),
				domain: [0, 10]
			});
			assert.deepStrictEqual(scale.range(), [10, 500]);
		});

		it('keeps a customized band range', () => {
			const scale = run({
				dimension: dims.y,
				scale: scaleBand().range([0, 300]),
				domain: ['a', 'b']
			});
			assert.deepStrictEqual(scale.range(), [0, 300]);
		});

		it('a customized range beats percentRange', () => {
			const scale = run({
				dimension: dims.x,
				scale: scaleLinear().range([10, 500]),
				domain: [0, 10],
				ctx: ctx({ percentRange: true })
			});
			assert.deepStrictEqual(scale.range(), [10, 500]);
		});

		it('an explicit range prop beats a customized scale range', () => {
			const scale = run({
				dimension: dims.z,
				scale: scaleOrdinal(scheme),
				domain: ['a', 'b', 'c'],
				range: ['red', 'blue']
			});
			assert.deepStrictEqual(scale.range(), ['red', 'blue']);
		});
	});

	describe('default range on pristine scales', () => {
		it('a pristine passed-in linear scale gets the default range', () => {
			const scale = run({ dimension: dims.x, scale: scaleLinear(), domain: [0, 10] });
			assert.deepStrictEqual(scale.range(), [0, w]);
		});

		it('a pristine passed-in band scale gets the default range', () => {
			const scale = run({ dimension: dims.y, scale: scaleBand(), domain: ['a', 'b'] });
			assert.deepStrictEqual(scale.range(), [0, h]);
		});

		it('the default scale gets the default range', () => {
			const scale = run({ dimension: dims.x, domain: [0, 10] });
			assert.deepStrictEqual(scale.range(), [0, w]);
		});

		it('a pristine scale under percentRange gets [0, 100]', () => {
			const scale = run({
				dimension: dims.x,
				scale: scaleLinear(),
				domain: [0, 10],
				ctx: ctx({ percentRange: true })
			});
			assert.deepStrictEqual(scale.range(), [0, 100]);
		});

		it('reverse applies to the managed default range', () => {
			const scale = run({
				dimension: dims.y,
				scale: scaleLinear(),
				domain: [0, 10],
				reverse: true
			});
			assert.deepStrictEqual(scale.range(), [h, 0]);
		});

		// known limitation: pass a range prop to assert a literal [0, 1] range
		it('a scale left at the default [0, 1] range is treated as pristine', () => {
			const scale = run({
				dimension: dims.x,
				scale: scaleLinear().range([0, 1]),
				domain: [0, 10]
			});
			assert.deepStrictEqual(scale.range(), [0, w]);
		});
	});

	describe('color dimension defaults', () => {
		it('c keeps a scheme passed via the scale initializer', () => {
			const scale = run({
				dimension: dims.c,
				scale: scaleOrdinal(scheme),
				domain: ['a', 'b', 'c']
			});
			assert.deepStrictEqual(scale.range(), scheme);
		});

		it('a pristine c scale gets the default categorical palette', () => {
			const scale = run({ dimension: dims.c, scale: scaleOrdinal(), domain: ['a', 'b'] });
			assert.deepStrictEqual(scale.range(), schemeCategory10);
		});

		it('c2 defaults to a linear scale with a [0, 1] range', () => {
			const scale = run({ dimension: dims.c2, domain: [0, 10] });
			assert.deepStrictEqual(scale.range(), [0, 1]);
			assert.strictEqual(scale(5), 0.5);
		});
	});

	describe('sequential scales', () => {
		it('keeps a custom interpolator instead of taking the default range', () => {
			const scale = run({
				dimension: dims.x,
				scale: scaleSequential(t => `rgb(${Math.round(t * 255)},0,0)`),
				domain: [0, 10]
			});
			assert.strictEqual(scale(10), 'rgb(255,0,0)');
		});

		it('with the default identity interpolator gets the default range', () => {
			const scale = run({ dimension: dims.x, scale: scaleSequential(), domain: [0, 10] });
			assert.strictEqual(scale(10), w);
		});

		it('an identity-behaving interpolator under any name gets the default range', () => {
			const scale = run({ dimension: dims.x, scale: scaleSequential(x => x), domain: [0, 10] });
			assert.strictEqual(scale(10), w);
		});

		it('an explicit range prop wins over a custom interpolator', () => {
			const scale = run({
				dimension: dims.c,
				scale: scaleSequential(t => `rgb(${Math.round(t * 255)},0,0)`),
				domain: [0, 10],
				range: [0, 100]
			});
			assert.strictEqual(scale(10), 100);
		});
	});

	describe('diverging scales', () => {
		it('a pristine diverging scale gets a three-stop default range', () => {
			const scale = run({ dimension: dims.x, scale: scaleDiverging(), domain: [-10, 0, 10] });
			assert.strictEqual(scale(-10), 0);
			assert.strictEqual(scale(0), w / 2);
			assert.strictEqual(scale(10), w);
		});

		it('keeps a custom diverging interpolator instead of taking the default range', () => {
			const scale = run({
				dimension: dims.x,
				scale: scaleDiverging(t => `c${t}`),
				domain: [-10, 0, 10]
			});
			assert.strictEqual(scale(10), 'c1');
		});

		// A two-stop range leaves a diverging scale returning undefined for
		// nearly every value, so the midpoint gets filled in wherever the two
		// stops came from
		it('fills in the midpoint of a two-value range prop', () => {
			const scale = run({
				dimension: dims.x,
				scale: scaleDiverging(),
				domain: [-10, 0, 10],
				range: [0, 500]
			});
			assert.deepStrictEqual(scale.range(), [0, 250, 500]);
			assert.strictEqual(scale(0), 250);
			assert.strictEqual(scale(10), 500);
		});

		it('leaves a three-value range prop alone', () => {
			const scale = run({
				dimension: dims.x,
				scale: scaleDiverging(),
				domain: [-10, 0, 10],
				range: [0, 100, 500]
			});
			assert.deepStrictEqual(scale.range(), [0, 100, 500]);
		});

		// Piecewise linear scales also hold three range stops, but there a
		// two-stop range is a valid thing to ask for
		it('leaves a two-value range on a piecewise linear scale alone', () => {
			const scale = run({
				dimension: dims.x,
				scale: scaleLinear().domain([0, 5, 10]).range([0, 50, 100]),
				domain: [0, 5, 10],
				range: [0, 500]
			});
			assert.deepStrictEqual(scale.range(), [0, 500]);
		});
	});

	describe('errors', () => {
		it('throws a clear error for an uninstantiated scale factory', () => {
			assert.throws(
				() => run({ dimension: dims.x, scale: scaleLinear, domain: [0, 10] }),
				/must be an instantiated scale/
			);
		});
	});
});
