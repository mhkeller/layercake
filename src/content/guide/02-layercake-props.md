---
title: LayerCake props
---

These are the props you can set on the `LayerCake` component itself. You set them all like so:

```html
<Layercake
  foo='foo'
  bar='bar'
>
</LayerCake>
```

The component also exports an `element` prop that represents the main wrapper, in case you need to access it for some reason. It also exposes this as a slot prop.

```html
<script>
  let mainElement;
</script>

<LayerCake
  bind:element={mainElement}
  let:element
>
  {console.log(mainElement === element)}
</LayerCake>
```

### data `Array`

A list of data items. If this is not a flat data array of objects, you'll also need to set [flatData](/guide#flatdata).

```html
<LayerCake
  data={ myData }
>
```

### x `String|Function|Number|Array`

The key in each row of data that corresponds to the x-field. This can be a string, number (usually relating to an index of an array), an accessor function, or any combination of those types. This property gets converted to a function when you access it through the context.

```html
<LayerCake
  x='myX'
  <!-- is equivalent to... -->
  x={ d => d.myX }
>
```

You can also give this value an array of strings or arrays of functions. While it may seem counter-intuitive to have more than one x- or y-accessor, this is the case in stacked layouts and Cleveland dot plots. See the [Stacked bar](/example/BarStacked), [Stacked area](/example/AreaStacked), [Stacked colummn](/example/ColumnStacked) or [Cleveland dot plot](/example/ClevelandDotPlot) for complete examples.

Here's an overview using the `d3.stack()` to make a horizontal bar chart, which will have two values for the x-accessor.

```js
const data = [
  {month: new Date(2015, 3, 1), apples: 3840, bananas: 1920, cherries: 960, dates: 400},
  {month: new Date(2015, 2, 1), apples: 1600, bananas: 1440, cherries: 960, dates: 400},
  {month: new Date(2015, 1, 1), apples: 640,  bananas: 960,  cherries: 640, dates: 400},
  {month: new Date(2015, 0, 1), apples: 320,  bananas: 480,  cherries: 640, dates: 400}
];

const stack = d3.stack()
  .keys(['apples', 'bananas', 'cherries', 'dates']);

const series = stack(data);
```

The data is now an array of values. The `month` values you can't see because sneakily stashes them as a property on the array, accessible as `d.data`.

```js
[
  [[   0, 3840], [   0, 1600], [   0,  640], [   0,  320]], // apples
  [[3840, 5760], [1600, 3040], [ 640, 1600], [ 320,  800]], // bananas
  [[5760, 6720], [3040, 4000], [1600, 2240], [ 800, 1440]], // cherries
  [[6720, 7120], [4000, 4400], [2240, 2640], [1440, 1840]]  // dates
]
```

The x- and y-accessors would then look like this:

```html
<LayerCake
  x={ [0, 1] }
  y={ d => d.data.month }
>
```

Calls to `x(dataRow)` in this scenario will return the two-value array. Calls to `xGet(dataRow)` will return a two-value array, mapped through the [xScale](/guide#xscale).

### y `String|Function|Number|Array`

Same as [x](/guide#x) but for the y dimension.

### z `String|Function|Number|Array`

Same as [x](/guide#x) but for the z dimension.

### r `String|Function|Number|Array`

Same as [x](/guide#x) but for the r dimension.

### padding `Object`

An object that can specify `top`, `right`, `bottom`, or `left` padding in pixels. Any unspecified values are filled in as `0`. Padding operates like CSS `box-sizing: border-box;` where values are subtracted from the parent container's width and height, the same as [a D3 margin convention](https://bl.ocks.org/mbostock/3019563).

```html
<LayerCake
  padding={ { top: 20, right: 10, bottom: 0, left: 0 } }
  // equivalent to...
  padding={ { top: 20, right: 10 } }
>
```

> Another way to set padding is to add it via normal CSS on your target div. The target element is assigned CSS of `box-sizing: border-box;` so padding settings won't affect the width or height. If you set any padding via CSS, the padding object will be ignored.

### xScale `d3.scaleLinear()`

The D3 scale that should be used for the x-dimension. Pass in an instantiated D3 scale if you want to override the default `d3.scaleLinear()` or you want to add extra options.

See the [Column chart](/example/Column) for an example of passing in a `d3.scaleBand()` to override the default.

### yScale `d3.scaleLinear()`

Same as [xScale](/guide#xscale) but for the y scale. The default is `d3.scaleLinear()`.

### zScale `d3.scaleLinear()`

Same as [xScale](/guide#xscale) but for the z scale. The default is `d3.scaleLinear()`.

### rScale `d3.scaleSqrt()`

Same as [xScale](/guide#xscale) but for the r scale. The default is `d3.scaleSqrt()`.

### xDomain `Array:[min: ?Number, max: ?Number]|String[]|Number[]`

Set a min or max on the x scale. If you want to inherit the value from the data's extent, set that value to `null`.

```html
<LayerCake
  xDomain={ [0, 100] } // Fixes the x scale's domain
  // or..
  xDomain={ [0, null] } // Fixes the min but allows the max to be whatever is in the data
>
```

This value can also be an array because sometimes your scales are [piecewise](https://github.com/d3/d3-scale#continuous_domain) or are a list of discrete values such as in [ordinal scales](https://github.com/d3/d3-scale#ordinal-scales), useful for color series.

```html
<LayerCake
  xDomain={ [-1, 0, 1] } // Could be useful to create a diverging scale
  // or..
  xDomain={ ['group-1', 'group-2', 'group-3'] } // Could be useful for a column chart
>
```

### yDomain `Array:[min: Number, max: Number]|String[]|Number[]`

Same as [xDomain](/guide#xdomain) but for the y scale.

### zDomain `Array:[min: Number, max: Number]|String[]|Number[]`

Same as [xDomain](/guide#xdomain) but for the z scale.

### rDomain `Array:[min: Number, max: Number]|String[]|Number[]`

Same as [xDomain](/guide#xdomain) but for the r scale.

### xReverse `Boolean=false`

Reverse the default x range. By default this is `false` and the range is `[0, width]`.

This is ignored if you set [xRange](/guide#xRange).

### yReverse `Boolean=true`

Reverse the default y range. By default this is `true` and the range is `[height, 0]`.

This is ignored if you set [yRange](/guide#yRange).

### zReverse `Boolean=false`

Reverse the default z range. By default this is `false` and the range is `[0, width]`.

This is ignored if you set [zRange](/guide#zRange).

### rReverse `Boolean=false`

Reverse the default r range. By default this is `false` and the range is `[1, 25]`.

This is ignored if you set [rRange](/guide#rRange).

### xRange `Function|Array:[min: Number, max: Number]|String[]|Number[]`

Override the default y range of `[0, width]` by setting it here to an array or function with argument `({ width, height})` that returns an array.

This overrides setting [xReverse](/guide#xreverse) to `true`.

```html
<LayerCake
  xRange={ [1, 100] }
>
```
It can also be a function:

```html
<LayerCake
  xRange={ ({ width, height }) => [0, width / 2] }
>
```

### yRange `Function|Array:[min: Number, max: Number]|String[]|Number[]`

Same as [xRange](/guide#xrange) but for the y scale. Override the default y range of `[0, height]` by setting it here to an array or function with argument `({ width, height})` that returns an array.

This overrides setting [yReverse](/guide#yreverse) to `true`.

### zRange `Function|Array:[min: Number, max: Number]|String[]|Number[]`

Same as [xRange](/guide#xrange) but for the z scale. Override the default z range of `[0, width]` by setting it here to an array or function with argument `({ width, height})` that returns an array.

This overrides setting [zReverse](/guide#zreverse) to `true`.

### rRange `Function|Array:[min: Number, max: Number]|String[]|Number[]`

Same as [xRange](/guide#xrange) but for the r scale. Override the default y range of `[1, 25]` by setting it here to an array or function with argument `({ width, height})` that returns an array. The r scale defaults to `d3.scaleSqrt` so make sure you don't use a zero in your range.

This overrides setting [rReverse](/guide#rreverse) to `true`.

### xPadding `Array:[leftPixels: Number, rightPixels: Number]`

Assign a pixel value to add to the min or max of the x scale. This will increase the scales domain by the scale unit equivalent of the provided pixels. This is useful for adding extra space to a scatter plot so that your circles don't interfere with your y-axis. It's better than fussing with the range since you don't need to add a magic number to other components, like axes.

It will log out a warning if you try to use it on a scale that has a domain or range that isn't two items, such as with ordinal scales.

```html
<LayerCake
  xPadding= { [10, 10] } // Add ten pixels of data units to both sides of the scale's domain
>
```

### yPadding `Array:[leftPixels: Number, rightPixels: Number]`

Same as [xPadding](/guide#xpadding) but for the y domain.

### zPadding `Array:[leftPixels: Number, rightPixels: Number]`

Same as [xPadding](/guide#xpadding) but for the z domain.

### rPadding `Array:[leftPixels: Number, rightPixels: Number]`

Same as [xPadding](/guide#xpadding) but for the r domain.

### xNice `Boolean=false`

Applies D3's [scale.nice()](https://github.com/d3/d3-scale#continuous_nice) to the x domain. This is a separate option instead of being one you can apply to a passed in scale because D3's "nice" transformation only works on existing domains and does not use a state to be able to tell if your existing scale wants to be nice.

### yNice `Boolean=false`

Same as [xNice](/guide#xnice) but for the y domain.

### zNice `Boolean=false`

Same as [xNice](/guide#xnice) but for the z domain.

### rNice `Boolean=false`

Same as [xNice](/guide#xnice) but for the r domain.

### extents `Object`

Manually set the extents of the x, y or r scale as a two-dimensional array of the min and max you want. Setting values here will skip any dynamic extent calculation of the data for that dimension.

```html
<LayerCake
  extents={{ x: [0, 100], y: [50, 100] }}
>
```

### flatData `Array`

In order for Layer Cake to measure the extents of your data, it needs a flat array of items that the x, y, z and r accessors can find. If your data is not flat (often the case if your renderers prefer a nested format such as in [multi-series line](/example/MultiLine) charts or GeoJSON such as in [maps](/example/MapSvg)), you can tell it to measure extents against a flat version. This *will not* change the shape of the data that gets passed to components — it is only for extent calculation.

> The library also exports a flattening function to handle common use cases if you need to flatten your data and you don't already have a flat version. See the [flatten](/guide#flatten) helper function for more info.

Here's an example showing passing different data formats for extent calculation versus what is used by layer components.

```html
<script>
  import { LayerCake } from 'LayerCake';

  const data = [
    {
      key: 'apples',
      values: [{month: '2015-03-01', value: 3840}, ...]
    },
    {
      key: 'bananas',
      values: [{month: '2015-03-01', value: 1920}, ...]
    },
  ];

  const flatData = [
    {month: '2015-03-01', value: 3840, group: 'apples'},
    {month: '2015-02-01', value: 1600, group: 'apples'},
    {month: '2015-01-01', value: 640, group:  'apples'},
    {month: '2015-00-01', value: 320, group:  'apples'},

    {month: '2015-03-01', value: 1920, group: 'bananas'},
    {month: '2015-02-01', value: 1440, group: 'bananas'},
    {month: '2015-01-01', value: 960, group:  'bananas'},
    {month: '2015-00-01', value: 480, group:  'bananas'}
  ];
</script>

<style>
	/*
		The wrapper div needs to have an explicit width and height in CSS.
		It can also be a flexbox child or CSS grid element.
		The point being it needs dimensions since the <LayerCake> element will
		expand to fill it.
	*/
  .chart-container {
    width: 100%;
    height: 300px;
  }
</style>

<div class="chart-container">
  <LayerCake
    x='month'
    y='value'
    {data}
    {flatData}
  >
    <!-- Components go here -->
  </LayerCake>
</div>
```

### ssr `Boolean=false`

Set whether this chart should be rendered server side. This is best used in conjunction with the [ScaledSvg](guide#scaledsvg) component or HTML components that are set to use percentage scales since you won't know the size of the container at render time.

Use it in conjunction with [`percentRange={true}`](guide#percentrange) to easily set up your scales for a percent coordinate systems.

### percentRange `Boolean=false`

When rendering charts server side, you pretty much always want your scale range to be `[0, 100]` since you won't be able to base the range off of the target container's width. Use this convenience helper to set the ranges for any field that has an accessor to just that.

> The default range for the y-scale will be `[100, 0]` because `yReverse` defaults to `true`. All of the range reverse functions will work as usual with this.

### position `String='relative'`

Determine the positioning of the wrapper div. Set this to `'absolute'` when you want to stack two `<LayerCake>` components on top of one another, such as when you have one that is server-side rendered and one client side like in the [Annotated column](/example-ssr/Column) example.

### custom `Object`

Any extra configuration values you want available on the LayerCake context. This could be useful for color lookups or additional constants.

```html
<LayerCake
  custom={ { size: 10, names: ['a', 'b', 'c'] } }
>
```
