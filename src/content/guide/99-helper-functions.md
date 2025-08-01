---
title: Helper functions
---

Layer Cake exposes some commonly-used helper functions. If you don't use them, they will be tree-shaken so there's no added bloat!

### bin(data: `Array`[, accessor: `string|Function`, { domain: `Array`, thresholds: `Array` }])

This is a wrapper around the `bin` function in [d3-array](https://github.com/d3/d3-array#bins). It's useful for histograms.

The component has the following props:

- **data** `Array|Object`
  - The data to be binned.
- **value** `Function|string`
  - Optional. An accessor function passed to [`bin.value()`](https://github.com/d3/d3-array#bin_value). If this is a string, it will be transformed into an accessor for that key.
- **domain** `Array`
  - Optional. The domain passed to [`bin.domain()`](https://github.com/d3/d3-array#bin_domain).
- **thresholds** `number|Array|Function`
  - Optional. The thresholds passed to [`bin.thresholds()`](https://github.com/d3/d3-array#bin_thresholds). Optional. Can be a number, array or function.

See the [stacked bar chart](/example/BarStacked) for an example:

```js
import { bin } from 'layercake';

const data = [
  { myX: 0 },
  { myX: 1 },
  { myX: 2 },
  { myX: 4 },
  { myX: 2 },
  { myX: 8 },
  { myX: 1 },
  { myX: 4 },
  { myX: 7 }
];

// Usage
bin(data, 'myX');
// or...
bin(data, d => d.myX);

// Output...
[
  [ { myX: 0 }, { myX: 1 }, { myX: 1 }, x0: 0, x1: 2 ],
  [ { myX: 2 }, { myX: 2 }, x0: 2, x1: 4 ],
  [ { myX: 4 }, { myX: 4 }, x0: 4, x1: 6 ],
  [ { myX: 7 }, x0: 6, x1: 8 ],
  [ { myX: 8 }, x0: 8, x1: 10 ]
]
```

### calcExtents(flatData: `Array`, fields: `{x?: Function, y?: Function, z?: Function, r?: Function}`)

Calculate the extents of any of the keys specified in **fields**, which is an object whose keys represent the name of the dimension (`x`, `y`, `z` or `r`) and whose value is an accessor function.

For example, calculating the extents for the x and y fields, which are in the data as `myX` and `myY` would look like this:

```js
const extents = calcExtents(flatData, {
	x: d => d.myX,
	y: d => d.myY
});

console.log(extents);
/*
{
  x: [0, 10],
  y: [-20, 20]
}
*/
```

Returns an object matching the keys in the `fields` argument and whose value is an array of `[min, max]`.

This function will also work on strings, which is useful if your data fields are date-time strings like `'2020-03-09T18:00:00'`.

The accessor functions can also return an array. This is useful if you want to scan multiple keys per object:

```js
const timeData = [
	{ start: 0, end: 1 },
	{ start: -10000, end: 0 }
];

const extents = calcExtents(timeData, {
	y: d => [d.start, d.end]
});

console.log(extents);
/*
{
  y: [-10000, 1]
}
*/
```

### calcUniques(flatData: `Array`, fields: `{x?: Function, y?: Function, z?: Function, r?: Function}`[, sortOptions: { sort: `boolean`, x: `boolean`, y: `boolean`, z: `boolean`, r: `boolean` }])

The same API and behavior as `calcExtents` but instead of a two-value array of `[min, max]` values, it returns an array of unique items.

By default, it returns the values in the order they appear in the data. Optionally pass in `sort: true` in the third options argument to do a `.sort(d3.ascending)`. (See [d3-array sort ascending](https://d3js.org/d3-array/sort#ascending) for details on the sort.)

You can also specify sorts on a per-field basis by passing in booleans for specific keys that appear in your `fields` object such as `{ x: true }`.

```js
const uniques = calcUniques(flatData, {
	x: d => d.myX,
	y: d => d.myY
});

console.log(uniques);
/*
{
  x: [0, 85, 123, 43, 10],
  y: ['group-3', 'group-2', 'group-1']
}
*/
```

Sort all fields:

```js
const uniques = calcUniques(
	flatData,
	{
		x: d => d.myX,
		y: d => d.myY
	},
	{ sort: true }
);

console.log(uniques);
/*
{
  x: [0, 10, 43, 85, 123],
  y: ['group-1', 'group-2', 'group-3']
}
*/
```

Sort only the x field:

```js
const uniques = calcUniques(
	flatData,
	{
		x: d => d.myX,
		y: d => d.myY
	},
	{ x: true }
);

console.log(uniques);
/*
{
  x: [0, 10, 43, 85, 123],
  y: ['group-3', 'group-2', 'group-1']
}
*/
```

The accessor functions can also return an array. This is useful if you want to scan multiple keys per object:

```js
const timeData = [
	{ teamCity: 'New York', backupCity: 'Los Angeles' },
	{ teamCity: 'Chicago', backupCity: 'Seattle' }
];

const uniques = calcUniques(
	timeData,
	{
		y: d => [d.teamCity, d.backupCity]
	},
	{ sort: true }
);

console.log(uniques);
/*
{
  y: ['Chicago', 'Los Angeles', 'New York', 'Seattle']
}
*/
```

### flatten(data: `Array`[, accessor: `string|Function`])

Flatten an array one-level down. Handy for preparing data from stacked layouts whose extents can easily be calculated. This is equivalent to `Array.prototype.flat()` but is kept in for old versions of node that support that or other browser compatibility.

In a typical scenario, the data:

```js
const data = [
	[
		{ x: 0, y: 1 },
		{ x: 1, y: 5 },
		{ x: 2, y: 10 }
	],
	[
		{ x: 0, y: 10 },
		{ x: 1, y: 15 },
		{ x: 2, y: 20 }
	]
];
```

Becomes this:

```js
import { flatten } from 'layercake';

const flatData = flatten(data);
/*
  [
    { x: 0, y: 1 }, { x: 1, y: 5 },
    { x: 2, y: 10 }, { x: 0, y: 10 },
    { x: 1, y: 15 }, { x: 2, y: 20 }
  ]
*/
```

You can also pass an optional accessor function if the arrays live on some other key. The accessor can also be the string name of the key.

For example, if you're using the [`GroupLonger.svelte`](#grouplonger) transform component like in the [MultiLine example](/example/MultiLine), that component will generally output data like the following and you can transform it by passing an accessor:

Flatten it like this:

```js
import { flatten } from 'layercake';

const data = [
	{
		key: 'group-one',
		values: [
			{ x: 0, y: 1 },
			{ x: 1, y: 5 },
			{ x: 2, y: 10 }
		]
	},
	{
		key: 'group-two',
		values: [
			{ x: 0, y: 10 },
			{ x: 1, y: 15 },
			{ x: 2, y: 20 }
		]
	}
];

const flatData = flatten(data, d => d.values);
// this is equivalent to
const flatData = flatten(data, 'values');
/*
  [
    { x: 0, y: 1 }, { x: 1, y: 5 },
    { x: 2, y: 10 }, { x: 0, y: 10 },
    { x: 1, y: 15 }, { x: 2, y: 20 }
  ]
*/
```

You can safely use this function on arrays of arrays of arrays, such as the output from `d3.stack()`

```js
[
	[
		[0, 3840],
		[0, 1600],
		[0, 640],
		[0, 320]
	],
	[
		[3840, 5760],
		[1600, 3040],
		[640, 1600],
		[320, 800]
	],
	[
		[5760, 6720],
		[3040, 4000],
		[1600, 2240],
		[800, 1440]
	],
	[
		[6720, 7120],
		[4000, 4400],
		[2240, 2640],
		[1440, 1840]
	]
];
```

Becomes...

```js
[
	[0, 3840],
	[0, 1600],
	[0, 640],
	[0, 320],
	[3840, 5760],
	[1600, 3040],
	[640, 1600],
	[320, 800],
	[5760, 6720],
	[3040, 4000],
	[1600, 2240],
	[800, 1440],
	[6720, 7120],
	[4000, 4400],
	[2240, 2640],
	[1440, 1840]
];
```

### groupLonger(data: `Array`, keys: `string[]`[, { groupTo: `string='group'`, valueTo: `string='value'`, keepKeys: `string[]` }])

This function is useful for data that you get in a "wide" format that you want to break into a multi-series chart.

For example, let's say you have a spreadsheet like this and you want to create a line chart with one line for each fruit over time.

```txt
month,apples,bananas,cherries,dates
2015-01-01,320,480,640,400
2015-02-01,640,960,740,500
2015-03-01,1600,1440,960,600
```

You need to convert your data into something like this:

```js
import { groupLonger } from 'layercake';

const groupData = groupLonger(data, ['apples', 'bananas', 'cherries', 'dates']);

// Outputs
[
	{
		group: 'apples',
		values: [
			{ month: '2015-01-01', value: 320, group: 'apples' },
			{ month: '2015-02-01', value: 640, group: 'apples' },
			{ month: '2015-03-01', value: 1600, group: 'apples' }
		]
	},
	{
		group: 'bananas',
		values: [
			{ month: '2015-01-01', value: 480, group: 'bananas' },
			{ month: '2015-02-01', value: 960, group: 'bananas' },
			{ month: '2015-03-01', value: 1440, group: 'bananas' }
		]
	},
	{
		group: 'cherries',
		values: [
			{ month: '2015-01-01', value: 640, group: 'cherries' },
			{ month: '2015-02-01', value: 740, group: 'cherries' },
			{ month: '2015-03-01', value: 960, group: 'cherries' }
		]
	},
	{
		group: 'dates',
		values: [
			{ month: '2015-01-01', value: 400, group: 'dates' },
			{ month: '2015-02-01', value: 500, group: 'dates' },
			{ month: '2015-03-01', value: 600, group: 'dates' }
		]
	}
];
```

The component has the following props:

- **data** `Array|Object`
  - The data to be transformed.
- **keys** `string[]`
  - The series names to break out out into separate groups.
- **options** `Object` Options object
- **options.groupTo** `string='group'`
  - Optional. This name of the field that is added to each group object. Defaults to 'group'. This field is also added to each row of data.
- **options.valueTo** `string='value'`
  - Optional. The name of the new field on each row of data to store the value under. Defaults to 'value'.
- **options.keepKeys** `string[]`
  - Optional. Any keys we want to explicitly keep. If this is unset, all keys not specified in your groups will be kept. The list of full keys is determined by naively looking at the first row of the data.

It returns:

- **groupData** `Array`
  - The transformed data.

See the example on the [multline chart](/example/MultiLine)

### raise(el: `DOM Element`)

Adapted from the [raise](https://github.com/d3/d3-selection#selection_raise) method in d3-selection, this is a convenience function to re-insert the passed in element as the last child of its parent. Equivalent to:

```js
el.parentNode.appendChild(el);
```

This is useful for hovering over SVG maps so that the hovered-over feature is not obstructed by neighboring shapes. See how it's used in the [SVG map component](/example/MapSvg).

### scaleCanvas(ctx: `CanvasRenderingContext2D`, width: `number`, height: `number`)

Scale your canvas size to retina screens. This function will modify the canvas, if necessary, and return an object with the new `width` and `height` as properties.

Such as in the [Scatter canvas](/example/Scatter) example:

```svelte
<!-- { filename: 'Scatter.html' } -->
<script>
	import { getContext, onMount, untrack } from 'svelte';
	import { scaleCanvas } from 'layercake';

	const { data, xGet, yGet, width, height } = getContext('LayerCake');

	const { ctx } = getContext('canvas');

	let { r = 5, fill = '#0cf', stroke = '#000', strokeWidth = 1 } = $props();

	onMount(() => {
		$effect(() => {
			if ($width && $height) {
				untrack(() => {
					if (!$ctx) return;

					/**
					 * If you were to have multiple canvas layers
					 * maybe for some artistic layering purposes
					 * put these reset functions in the first layer, not each one
					 * since they should only run once per update
					 */
					scaleCanvas($ctx, $width, $height);
					$ctx.clearRect(0, 0, $width, $height);

					/**
					 * Draw our scatterplot
					 */
					$data.forEach((/** @type {any} d */ d) => {
						$ctx.beginPath();
						$ctx.arc($xGet(d), $yGet(d), r, 0, 2 * Math.PI, false);
						$ctx.lineWidth = strokeWidth;
						$ctx.strokeStyle = stroke;
						$ctx.stroke();
						$ctx.fillStyle = fill;
						$ctx.fill();
					});
				});
			}
		});
	});
</script>
```

### stack(data: `Array|Object`[, keys: `string[]`, { domain: `Array`, thresholds: `Array` }])

This function is a wrapper around the `stack` function in [d3-shape](https://github.com/d3/d3-shape#stacks).

The component has the following props:

- **data** `Array|Object`
  - The data to be stacked.
- **keys** `string[]`
  - The series names to stack, passed to [`stack.keys()`](https://github.com/d3/d3-shape#stack_keys).
- **options** `Object` Options object
- **options.value** `Function|string`
  - Optional. An accessor function passed to [`stack.value()`](https://github.com/d3/d3-shape#stack_value). If this is a string, it will be transformed into an accessor for that key.
- **options.order** `Array|Function`
  - Optional. The stack order passed to [`stack.order()`](https://github.com/d3/d3-shape#stack_order).
- **options.offset** `Array|Function`
  - Optional. The offset function passed to [`stack.offset()`](https://github.com/d3/d3-shape#stack_offset).

It returns as slot props:

- **stackData** `Array`
  - The transformed data.

See the example on the [stacked area chart](/example/AreaStacked)

```js
import { stack } from 'layercake';

// Input data
const data = [
  {month: '2015-01-01', apples: 320,  bananas: 480,  cherries: 640, dates: 400}
  {month: '2015-02-01', apples: 640,  bananas: 960,  cherries: 740, dates: 500},
  {month: '2015-03-01', apples: 1600, bananas: 1440, cherries: 920, dates: 600},
  {month: '2015-04-01', apples: 3840, bananas: 1920, cherries: 960, dates: 700},
];

// Usage
stack(data, ['apples', 'bananas', 'cherries', 'dates'])

// Output data. The `month` values you can't see because sneakily stashes them as a property on the array, accessible as `d.data`.
[
  [ [   0, 320],  [   0,  640], [   0, 1600], [   0, 3840] ], // apples
  [ [ 320, 800],  [ 640, 1600], [1600, 3040], [3840, 5760] ], // bananas
  [ [ 800, 1440], [1600, 2340], [3040, 3960], [5760, 6720] ], // cherries
  [ [1440, 1840], [2340, 2840], [3960, 4560], [6720, 7420] ]  // dates
]
```

### uniques(data: `Array`[, accessor: `string|Function`, transform: `boolean=true`])

A function to get the unique values from a list. If **accessor** is specified, the uniqueness will be compared using that and, by default, the values in the returned list of unique values will be values returned by the accessor. Accessor can also be the string name of the key. Pass `false` to the **transform** argument if you want to return the original elements, which will be the first one that appears for every unique value. The default for **transform** is `true`.

This is different from Underscore's [uniq](https://underscorejs.org/#uniq) because that function doesn't return the transformed value.

```js
import { uniques } from 'layercake';

const data = [
	{ year: '1990', x: 0, y: 1 },
	{ year: '1990', x: 5, y: 4 },
	{ year: '1991', x: 2, y: 5 },
	{ year: '1991', x: 6, y: 1 },
	{ year: '1992', x: 1, y: 6 },
	{ year: '1992', x: 7, y: 3 },
	{ year: '1993', x: 7, y: 8 },
	{ year: '1993', x: 3, y: 2 }
];

const uniqueYears = unique(data, 'year');
// ['1990', '1991', '1992', '1993']

// this is equivalent to
const uniqueYears = unique(data, d => d.year);

// setting transform to `false` gives you the full row of the first unique element
const uniqueYears = unique(data, 'year', false);
/*
[
  {year: '1990', x: 0, y: 1},
  {year: '1991', x: 2, y: 5},
  {year: '1992', x: 1, y: 6},
  {year: '1993', x: 7, y: 8}
*/
```
