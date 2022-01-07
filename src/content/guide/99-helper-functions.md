---
title: Helper functions
---

Layer Cake exposes some commonly-used helper functions. If you don't use them, they will be tree-shaken so there's no added bloat!

### flatten(data: `Array`)

Flatten an array one-level down. Handy for preparing data from stacked layouts whose extents can easily be calculated. This is equivalent to `Array.prototype.flat()` but is kept in for old versions of node that support that or other browser compatibility.

This data:

```js
const data = [
  [{x: 0, y: 1}, {x: 1, y: 5}, {x: 2, y: 10}],
  [{x: 0, y: 10}, {x: 1, y: 15}, {x: 2, y: 20}]
];
```

Becomes this:

```js
import { flatten } from 'layercake';

const flatData = flatten(data);
/*
  [{x: 0, y: 1}, {x: 1, y: 5}, {x: 2, y: 10},
   {x: 0, y: 10}, {x: 1, y: 15}, {x: 2, y: 20}]
*/
```

You can safely use this function on arrays of arrays of arrays, such as the output from `d3.stack()`

```js
[
  [[   0, 3840], [   0, 1600], [   0,  640], [   0,  320]],
  [[3840, 5760], [1600, 3040], [ 640, 1600], [ 320,  800]],
  [[5760, 6720], [3040, 4000], [1600, 2240], [ 800, 1440]],
  [[6720, 7120], [4000, 4400], [2240, 2640], [1440, 1840]]
]
```

Becomes...

```js
[ [ 0, 3840 ],
  [ 0, 1600 ],
  [ 0, 640 ],
  [ 0, 320 ],
  [ 3840, 5760 ],
  [ 1600, 3040 ],
  [ 640, 1600 ],
  [ 320, 800 ],
  [ 5760, 6720 ],
  [ 3040, 4000 ],
  [ 1600, 2240 ],
  [ 800, 1440 ],
  [ 6720, 7120 ],
  [ 4000, 4400 ],
  [ 2240, 2640 ],
  [ 1440, 1840 ]
]
```

### scaleCanvas(ctx: `CanvasRenderingContext2D`, width: `Number`, height: `Number`)

Scale your canvas size to retina screens. This function will modify the canvas, if necessary, and return an object with the new `width` and `height` as properties.

Such as in the [Scatter canvas](/example/Scatter) example:

```html
<!-- { filename: 'Scatter.html' } -->
<script>
	import { getContext } from 'svelte';
	import { scaleCanvas } from 'layercake';

	const { data, xGet, yGet, width, height } = getContext('LayerCake');

	const { ctx } = getContext('canvas');

	export let r;
	export let fill;

	$: {
		if ($ctx) {
			/* --------------------------------------------
			 * If you were to have multiple canvas layers
			 * maybe for some artistic layering purposes
			 * put these reset functions in the first layer, not each one
			 * since they should only run once per update
			 */
			scaleCanvas($ctx, $width, $height);
			$ctx.clearRect(0, 0, $width, $height);

			/* --------------------------------------------
			 * Draw our scatterplot
			 */
			$data.forEach(d => {
				$ctx.beginPath();
				$ctx.arc($xGet(d), $yGet(d), r, 0, 2 * Math.PI, false);
				$ctx.fillStyle = fill;
				$ctx.fill();
			});
		}
	}
</script>
```

### calcExtents(flatData: `Array`, fields: `{x?: Function, y?: Function, z?: Function, r?: Function}`)

Calculate the extents of any of the keys specified in **fields**, which is an object whose keys represent the name of the dimension (`x`, `y`, `z` or `r`) and whose values are an accessor function.

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

Returns an object whose keys are the field names specified as the first item in the key group array followed by an array of `[min, max]`. This function will also work on strings, which is useful if your data fields are date-time strings like `'2020-03-09T18:00:00'`.

You can also return an array if you have an object with keys where each one is more logically associated with the min or the max like this:

```js
const timeData = [{ start: 0, end: 1 }, { start: -10000, end: 0 }];

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

### uniques(data: `Array`[, accessor: `String|Function`, transform: `Boolean`])

A function to get the unique values from a list. If **accessor** is specified, the uniqueness will be compared using that and, by default, the values in the returned list of unique values will be values returned by the accessor. Accessor can also be the string name of the key. Pass `false` to the **transform** argument if you want to return the original elements, which will be the first one that appears for every unique value. The default for **transform** is `true`.

This is different from Underscore's [uniq](https://underscorejs.org/#uniq) because that function doesn't return the transformed value.

```js
import { uniques } from 'layercake';

const data = [
  { year: '1990', x: 0, y: 1},
  { year: '1990', x: 5, y: 4},
  { year: '1991', x: 2, y: 5},
  { year: '1991', x: 6, y: 1},
  { year: '1992', x: 1, y: 6},
  { year: '1992', x: 7, y: 3},
  { year: '1993', x: 7, y: 8},
  { year: '1993', x: 3, y: 2}
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

### raise(el: `DOM Element`)

Adapted from the [raise](https://github.com/d3/d3-selection#selection_raise) method in d3-selection, this is a convenience function to re-insert the passed in element as the last child of its parent. Equivalent to:

```js
el.parentNode.appendChild(el);
```

This is useful for hovering over SVG maps so that the hovered-over feature is not obstructed by neighboring shapes. See how it's used in the [SVG map component](/example/MapSvg).
