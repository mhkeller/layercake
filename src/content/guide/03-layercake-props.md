---
title: LayerCake props
---

These are the props you can set on the `LayerCake` component itself. You set them all like so:

```svelte
<LayerCake
  foo='foo'
  bar='bar'
>
```

The component also exports an `element` prop that represents the main wrapper, in case you need to access it for some reason. It's on the context too, so the children snippet can read it as `k.element`.

```svelte
<script>
	let mainElement = $state();
</script>

<LayerCake bind:element={mainElement}>
	{#snippet children(k)}
		{console.log(mainElement === k.element)}
	{/snippet}
</LayerCake>
```

### Prop types

A few shapes repeat across the props below. Every accessor – `x`, `y`, `c` and the rest – takes the same kind of value, and so does every `*Domain` and every `*Range` prop. Layer Cake names those three shapes and exports them, so your own components can reuse them instead of copying a long union off this page.

- `DataAccessor` is `string|Function|number|Array<string|Function|number>|undefined`
- `DimensionDomain` is `[min: number|null, max: number|null]|Array<string|number>|Function|undefined`
- `DimensionRange` is `[min: number, max: number]|Function|Array<string|number>|undefined`

```svelte
<script>
	/** @type {{ x: import('layercake').DataAccessor }} */
	let { x } = $props();
</script>
```

Two more names come from the context: `LayerCakeContext` for the object you get back from `getLayerCakeContext()`, and `Scale` for the d3 scales hanging off it. Canvas layers have `CanvasContext` and `CanvasDrawFn`. See [Typing the context](/guide#typing-the-context).

The headings below spell out the full shape rather than the alias, so you can see what a prop takes without looking anything up.

### data `Array<Object|Array<any>>|Object`

A list of data items. If this is not a flat data array of objects, you'll also need to set [flatData](/guide#flatdata).

```svelte
<LayerCake
  data={ myData }
>
```

### x `string|Function|number|Array<string|Function|number>|undefined`

The key in each row of data that corresponds to the x-field. This can be a string, number (usually relating to an index of an array), an accessor function, or any combination of those types. This property gets converted to a function when you access it through the context.

```svelte
<LayerCake
  x='myX'
  <!-- is equivalent to... -->
  x={ d => d.myX }
>
```

You can also give this value an array of strings or arrays of functions. While it may seem counter-intuitive to have more than one x- or y-accessor, this is the case in stacked layouts and Cleveland dot plots. See the [Stacked bar](/example/BarStacked), [Stacked area](/example/AreaStacked), [Stacked column](/example/ColumnStacked) or [Cleveland dot plot](/example/ClevelandDotPlot) for complete examples.

Here's an overview using the `d3.stack()` to make a horizontal bar chart, which will have two values for the x-accessor.

```js
const data = [
	{ month: new Date(2015, 3, 1), apples: 3840, bananas: 1920, cherries: 960, dates: 400 },
	{ month: new Date(2015, 2, 1), apples: 1600, bananas: 1440, cherries: 960, dates: 400 },
	{ month: new Date(2015, 1, 1), apples: 640, bananas: 960, cherries: 640, dates: 400 },
	{ month: new Date(2015, 0, 1), apples: 320, bananas: 480, cherries: 640, dates: 400 }
];

const stack = d3.stack().keys(['apples', 'bananas', 'cherries', 'dates']);

const series = stack(data);
```

The data is now an array of values. The `month` values you can't see because `d3.stack()` sneakily stashes them as a property on the array, accessible as `d.data`.

```js
[
	// apples
	[
		[0, 3840],
		[0, 1600],
		[0, 640],
		[0, 320]
	],
	// bananas
	[
		[3840, 5760],
		[1600, 3040],
		[640, 1600],
		[320, 800]
	],
	// cherries
	[
		[5760, 6720],
		[3040, 4000],
		[1600, 2240],
		[800, 1440]
	],
	// dates
	[
		[6720, 7120],
		[4000, 4400],
		[2240, 2640],
		[1440, 1840]
	]
];
```

The x- and y-accessors would then look like this:

```svelte
<LayerCake
  x={ [0, 1] }
  y={ d => d.data.month }
>
```

Calls to `x(dataRow)` in this scenario will return the two-value array. Calls to `xGet(dataRow)` will return a two-value array, mapped through the [xScale](/guide#xscale).

### y `string|Function|number|Array<string|Function|number>|undefined`

Same as [x](/guide#x) but for the y dimension.

### z `string|Function|number|Array<string|Function|number>|undefined`

Same as [x](/guide#x) but for the z dimension.

### r `string|Function|number|Array<string|Function|number>|undefined`

Same as [x](/guide#x) but for the r dimension.

The `2` suffix marks a dimension's secondary channel: `x2` and `y2` are second scales for their axis and default to nesting inside their parent's bandwidth, while `c2` is a second color-like channel with defaults of its own.

### x2 `string|Function|number|Array<string|Function|number>|undefined`

Same as [x](/guide#x) but for the x2 dimension – a scale nested inside the x scale, useful for [grouped column charts](/example/ColumnGrouped). It defaults to a `scaleBand()` whose domain is computed from your data and whose range is the bandwidth of the x scale, so this is usually all you need:

```svelte
<LayerCake
  x="year"
  xScale={scaleBand()}
  x2="fruit"
  y="value"
>
```

In a layer component, position a column with `k.xGet(d) + k.x2Get(d)` and size it with `k.x2Scale.bandwidth()`.

You can customize the nested range by setting [x2Range](/guide#x2range) to a function, which receives the computed sibling scales: `x2Range={({ scales }) => [0, scales.x.bandwidth() / 2]}`.

Like every dimension, x2 also accepts `x2Domain`, `x2Scale`, `x2Range` and `x2DomainSort` props.

### y2 `string|Function|number|Array<string|Function|number>|undefined`

Same as [x2](/guide#x2) but nested inside the y scale, useful for grouped bar charts. Accepts `y2Domain`, `y2Scale`, `y2Range` and `y2DomainSort` props.

### c `string|Function|number|Array<string|Function|number>|undefined`

Same as [x](/guide#x) but for the c dimension, a dedicated color scale. It defaults to a `scaleOrdinal()` whose domain is computed from your data and whose range is a ten-color categorical palette (d3's `schemeCategory10`). Supply your own colors via the `cRange` prop:

```svelte
<LayerCake
  x="year"
  y="value"
  c="fruit"
  cRange={['#fc0', '#c0f']}
>
```

Then color your marks with `k.cGet(d)` in a layer component. Also accepts `cDomain`, `cScale`, `cRange` and `cDomainSort` props.

You can also pass a preconfigured scale instead of setting `cRange` – its range is preserved: `cScale={scaleOrdinal(schemeCategory10)}`.

You can also keep using the [z](/guide#z) dimension for color like in older versions but c is more explicit and frees up z for other encodings.

### c2 `string|Function|number|Array<string|Function|number>|undefined`

Same as [c](/guide#c) but for a second color-like scale, useful for encoding something like opacity alongside color. It defaults to a `scaleLinear()` mapping your data's extent to `[0, 1]`. Accepts `c2Domain`, `c2Scale`, `c2Range` and `c2DomainSort` props.

### debug `boolean`

If this is `true`, Layer Cake will print to the console a helpful debug message.

```svelte
<LayerCake
  debug={true}

  <!-- Can also be set simply with this Svelte shorthand -->
  debug
>
```

It will display:

1. The bounding box dimensions of your chart container
2. The scales you have currently set and for each one:
   1. The accessor function or string key
   2. The scale type
   3. The `domain`
   4. The `range`

It's helpful if you're trying to track down why a chart is not displaying correctly, which comes down to CSS not being set on the parent chart container or weird data issues (`undefined`, `NaN` values etc...) that are throwing off the extent calculation for the `domain`.

If your `domain` or `range` includes values that are colors, the debug interface will highlight them in that color.

![](/print-debug.png)

### padding `Object`

An object that can specify `top`, `right`, `bottom`, or `left` padding in pixels. Any unspecified values are filled in as `0`. Padding operates like CSS `box-sizing: border-box;` where values are subtracted from the parent container's width and height, the same as [a D3 margin convention](https://bl.ocks.org/mbostock/3019563). (It's not called "margin" here because the behavior is more like CSS padding which goes from the outer edge inward, whereas margin goes from the outer edge outward.)

```svelte
<LayerCake
  padding={ { top: 20, right: 10, bottom: 0, left: 0 } }
  // equivalent to...
  padding={ { top: 20, right: 10 } }
>
```

### xScale `d3.scaleLinear()`

The D3 scale that should be used for the x-dimension. Pass in an instantiated D3 scale if you want to override the default [`d3.scaleLinear()`](https://github.com/d3/d3-scale#scalelinear) or you want to add extra options.

If the scale you pass in has a customized range – e.g. `zScale={scaleOrdinal(schemeCategory10)}` – Layer Cake preserves it. Otherwise, it manages the range for you, setting it to the pixel dimensions of the chart. Set an explicit [xRange](/guide#xrange) to override a customized range.

There's one range Layer Cake can't recognize as yours: `[0, 1]`. That's what most d3 scales come with out of the box and there's no way to ask a scale whether someone set it deliberately, so a scale arriving with `[0, 1]` is treated as untouched and gets the chart's dimensions instead. If you want a `[0, 1]` coordinate system, say so with the prop – `xRange={[0, 1]}` – which is never ambiguous and always wins.

See the [Column chart](/example/Column) for an example of passing in a `d3.scaleBand()` to override the default.

<!-- generated:Scale -->

### yScale `d3.scaleLinear()`

Same as [xScale](/guide#xscale) but for the y scale. The default is `d3.scaleLinear()`.

### zScale `d3.scaleLinear()`

Same as [xScale](/guide#xscale) but for the z scale. The default is `d3.scaleLinear()`.

### rScale `d3.scaleSqrt()`

Same as [xScale](/guide#xscale) but for the r scale. The default is `d3.scaleSqrt()`.

### x2Scale `d3.scaleBand()`

Same as [xScale](/guide#xscale) but for the x2 scale. The default is `d3.scaleBand()`.

### y2Scale `d3.scaleBand()`

Same as [xScale](/guide#xscale) but for the y2 scale. The default is `d3.scaleBand()`.

### cScale `d3.scaleOrdinal()`

Same as [xScale](/guide#xscale) but for the c scale. The default is `d3.scaleOrdinal()`.

### c2Scale `d3.scaleLinear()`

Same as [xScale](/guide#xscale) but for the c2 scale. The default is `d3.scaleLinear()`.

<!-- /generated:Scale -->

### xDomain `Array:[min: number|null, max: number|null]|Array<number|string>|Function`

Set a min or max on the x scale. If you want to inherit the value from the data's extent, set that value to `null`. If you set an array with no `null`s, the dynamic extent calculation of the data for that dimension will be skipped. This can be useful as a performance improvement.

```svelte
<LayerCake
  xDomain={ [0, 100] } // Fixes the x scale's domain
  // or..
  xDomain={ [0, null] } // Fixes the min but allows the max to be whatever is in the data
>
```

You can also pass a function. It receives the `[min, max]` measured from your data and returns the domain you want. This is how you keep a value on the axis that your data might not reach, such as zero on a bar chart with negative numbers:

```svelte
<LayerCake
  // Widens whichever end is missing zero. The same line works whether the
  // numbers are all positive, all negative or a mix of both.
  xDomain={ ([min, max]) => [Math.min(0, min), Math.max(0, max)] }
>
```

See the [diverging bar](/example/BarDiverging) and [diverging column](/example/ColumnDiverging) examples. What the function returns is still filled in from the data wherever you leave a `null`, so `([min, max]) => [Math.min(0, min), null]` works too.

This value can also be a longer array because sometimes your scales are [piecewise](https://github.com/d3/d3-scale#continuous_domain) or are a list of discrete string values such as in [ordinal scales](https://github.com/d3/d3-scale#ordinal-scales), useful for color series.

```svelte
<LayerCake
  xDomain={ [-1, 0, 1] } // Could be useful to create a diverging scale
  // or..
  xDomain={ ['group-1', 'group-2', 'group-3'] } // Could be useful for a column chart
>
```

If you set a [`scaleBand`](https://github.com/d3/d3-scale#scaleband), [`scalePoint`](https://github.com/d3/d3-scale#scalepoint) or [`scaleOrdinal`](https://github.com/d3/d3-scale#scaleordinal) to any of the scales, the automatically calculated domain will be a list of unique values for the associated accessor instead of a two-value `[min, max]` array. This is useful for color scales or groups. If you want to sort this group, you can pass a function to this prop and it will receive the calculated list of unique values as an argument.

```svelte
<LayerCake
  // Domain for a column chart was calculated as: ['1989', '1992', '1991', '1990']
  // and we want to sort it properly
  xDomain={ domain => domain.sort() }
>
```

<!-- generated:Domain -->

### yDomain `Array:[min: number|null, max: number|null]|Array<number|string>|Function`

Same as [xDomain](/guide#xdomain) but for the y scale.

### zDomain `Array:[min: number|null, max: number|null]|Array<number|string>|Function`

Same as [xDomain](/guide#xdomain) but for the z scale.

### rDomain `Array:[min: number|null, max: number|null]|Array<number|string>|Function`

Same as [xDomain](/guide#xdomain) but for the r scale.

### x2Domain `Array:[min: number|null, max: number|null]|Array<number|string>|Function`

Same as [xDomain](/guide#xdomain) but for the x2 scale.

### y2Domain `Array:[min: number|null, max: number|null]|Array<number|string>|Function`

Same as [xDomain](/guide#xdomain) but for the y2 scale.

### cDomain `Array:[min: number|null, max: number|null]|Array<number|string>|Function`

Same as [xDomain](/guide#xdomain) but for the c scale.

### c2Domain `Array:[min: number|null, max: number|null]|Array<number|string>|Function`

Same as [xDomain](/guide#xdomain) but for the c2 scale.

<!-- /generated:Domain -->

### xDomainSort `boolean=false`

Taken into account only when the x-scale is ordinal. If `true`, sets whether the calculated unique items come back sorted. It uses [d3.ascending](https://d3js.org/d3-array/sort#ascending) to do the sort calculation.

Set this to `false` if you want the unique items to appear in the order they were found in the data, which is the default.

<!-- generated:DomainSort -->

### yDomainSort `boolean=false`

Same as [xDomainSort](/guide#xdomainsort) but for the y domain.

### zDomainSort `boolean=false`

Same as [xDomainSort](/guide#xdomainsort) but for the z domain.

### rDomainSort `boolean=false`

Same as [xDomainSort](/guide#xdomainsort) but for the r domain.

### x2DomainSort `boolean=false`

Same as [xDomainSort](/guide#xdomainsort) but for the x2 domain, which controls the order of the groups in a [grouped column chart](/example/ColumnGrouped).

### y2DomainSort `boolean=false`

Same as [xDomainSort](/guide#xdomainsort) but for the y2 domain.

### cDomainSort `boolean=false`

Same as [xDomainSort](/guide#xdomainsort) but for the c domain.

### c2DomainSort `boolean=false`

Same as [xDomainSort](/guide#xdomainsort) but for the c2 domain.

<!-- /generated:DomainSort -->

### xPadding `Array:[leftPixels: number, rightPixels: number]`

Assign a pixel value to add to the min or max of the x scale. This will increase the scale's domain by the scale unit equivalent of the provided pixels. This is useful for adding extra space to a scatter plot so that your circles don't interfere with your y-axis. It's better than fussing with the range since you don't need to add a magic number to other components, like axes.

Padding only applies to scales whose domain and range are two numbers. On ordinal and other discrete scales, such as `scaleBand`, the prop is silently ignored.

```svelte
<LayerCake
  xPadding= { [10, 10] } // Add ten pixels of data units to both sides of the scale's domain
>
```

<!-- generated:Padding -->

### yPadding `Array:[leftPixels: number, rightPixels: number]`

Same as [xPadding](/guide#xpadding) but for the y domain.

### zPadding `Array:[leftPixels: number, rightPixels: number]`

Same as [xPadding](/guide#xpadding) but for the z domain.

### rPadding `Array:[leftPixels: number, rightPixels: number]`

Same as [xPadding](/guide#xpadding) but for the r domain.

<!-- /generated:Padding -->

### xNice `boolean=false|number`

Applies D3's [scale.nice()](https://github.com/d3/d3-scale#continuous_nice) to the x domain. This is a separate option instead of being one you can apply to a passed in scale because D3's "nice" transformation only works on existing domains and does not use a state to be able to tell if your existing scale wants to be nice. Can also pass `count` number as argument for greater control.

<!-- generated:Nice -->

### yNice `boolean=false|number`

Same as [xNice](/guide#xnice) but for the y domain.

### zNice `boolean=false|number`

Same as [xNice](/guide#xnice) but for the z domain.

### rNice `boolean=false`

Same as [xNice](/guide#xnice) but for the r domain.

<!-- /generated:Nice -->

### xRange `Function|Array:[min: number, max: number]|Array<number|string>`

Override the default x range of `[0, width]` by setting it here to an array, or to a function that returns one.

This overrides setting [xReverse](/guide#xreverse) to `true`.

```svelte
<LayerCake
  xRange={ [1, 100] }
>
```

It can also be a function:

```svelte
<LayerCake
  xRange={ ({ width, height }) => [0, width / 2] }
>
```

The function is called with the chart's measurements:

- `width` and `height` – the chart size in pixels, with the padding taken off
- `rangeWidth` and `rangeHeight` – the same size in whatever units the ranges use: `100` when [percentRange](/guide#percentrange) is on, pixels otherwise
- `percentRange` – whether that mode is on
- `scales` – the other dimensions' computed scales, e.g. `scales.x`. This dimension's own scale is not there, since its range is one of the things that builds it.

<!-- generated:Range -->

### yRange `Function|Array:[min: number, max: number]|Array<number|string>`

Same as [xRange](/guide#xrange) but for the y scale.

### zRange `Function|Array:[min: number, max: number]|Array<number|string>`

Same as [xRange](/guide#xrange) but for the z scale.

### rRange `Function|Array:[min: number, max: number]|Array<number|string>`

Same as [xRange](/guide#xrange) but for the r scale.

### x2Range `Function|Array:[min: number, max: number]|Array<number|string>`

Same as [xRange](/guide#xrange) but for the x2 scale, which defaults to the bandwidth of the x scale. Pass a function to customize it, e.g. `x2Range={({ scales }) => [0, scales.x.bandwidth() / 2]}`.

### y2Range `Function|Array:[min: number, max: number]|Array<number|string>`

Same as [xRange](/guide#xrange) but for the y2 scale, which defaults to the bandwidth of the y scale. Pass a function to customize it, e.g. `y2Range={({ scales }) => [0, scales.y.bandwidth() / 2]}`.

### cRange `Array<string|number>|Function`

The colors of the c scale, as an array or a function with argument `({ width, height, rangeWidth, rangeHeight, percentRange, scales })`. Defaults to a ten-color categorical palette (d3's `schemeCategory10`), recycled past ten categories.

### c2Range `Array<string|number>|Function`

The range of the c2 scale, such as a list of opacity values. Defaults to `[0, 1]`.

<!-- /generated:Range -->

### xReverse `boolean=false`

Reverse the default x range. By default this is `false` and the range is `[0, width]`.

This is ignored if you set [xRange](/guide#xrange).

<!-- generated:Reverse -->

### yReverse `boolean=true`

Same as [xReverse](/guide#xreverse) but for the y range, and the default is worked out rather than fixed. It is `true` – making the range `[height, 0]` – unless the `yScale` has a `.bandwidth` method, as `scaleBand` and `scalePoint` do, in which case it is `false` so the values read top-down. Setting the prop yourself overrides that.

### zReverse `boolean=false`

Same as [xReverse](/guide#xreverse) but for the z range, which defaults to `[0, width]`.

### rReverse `boolean=false`

Same as [xReverse](/guide#xreverse) but for the r range, which defaults to `[1, 25]`.

<!-- /generated:Reverse -->

### flatData `Array`

In order for Layer Cake to measure the extents of your data, it needs a flat array of items that the x, y, z and r accessors can find. If your data is not flat (often the case if your renderers prefer a nested format such as in [multi-series line](/example/MultiLine) charts or GeoJSON such as in [maps](/example/MapSvg)), you can tell it to measure extents against a flat version. This _will not_ change the shape of the data that gets passed to components — it is only for extent calculation.

> The library also exports a flattening function to handle common use cases if you need to flatten your data and you don't already have a flat version. See the [flatten](/guide#flatten) helper function for more info.

Here's an example showing passing different data formats for extent calculation versus data formats used by layer components.

```svelte
<script>
	import { LayerCake } from 'layercake';

	const data = [
		{
			key: 'apples',
			values: [{ month: '2015-03-01', value: 3840 } /*...*/]
		},
		{
			key: 'bananas',
			values: [{ month: '2015-03-01', value: 1920 } /*...*/]
		}
	];

	const flatData = [
		{ month: '2015-04-01', value: 3840, group: 'apples' },
		{ month: '2015-03-01', value: 1600, group: 'apples' },
		{ month: '2015-02-01', value: 640, group: 'apples' },
		{ month: '2015-01-01', value: 320, group: 'apples' },

		{ month: '2015-04-01', value: 1920, group: 'bananas' },
		{ month: '2015-03-01', value: 1440, group: 'bananas' },
		{ month: '2015-02-01', value: 960, group: 'bananas' },
		{ month: '2015-01-01', value: 480, group: 'bananas' }
	];
</script>

<div class="chart-container">
	<LayerCake x="month" y="value" {data} {flatData}>
		<!-- Components go here -->
	</LayerCake>
</div>

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
```

### ssr `boolean=false`

Set whether this chart should be rendered server side. This is best used in conjunction with the [ScaledSvg](/guide#scaledsvg) component or HTML components that are set to use percentage scales since you won't know the size of the container at render time.

Use it in conjunction with [`percentRange={true}`](/guide#percentrange) to easily set up your scales for a percent coordinate system.

### percentRange `boolean=false`

When rendering charts server side, you pretty much always want your scale range to be `[0, 100]` since you won't be able to base the range off of the target container's width. Use this convenience helper to set the ranges to just that.

It applies to the four dimensions that measure themselves against the container – [x](/guide#x), [y](/guide#y), [z](/guide#z) and [r](/guide#r). The nested dimensions ([x2](/guide#x2), [y2](/guide#y2)) already measure themselves against their parent, so they follow it into percentages on their own, and the color dimensions ([c](/guide#c), [c2](/guide#c2)) have nothing to do with the container and are left alone.

> The default range for the y-scale will be `[100, 0]` because `yReverse` defaults to `true`. All of the range reverse functions will work as usual with this.

A range you set yourself always wins over this. That means both an explicit [xRange](/guide#xrange) prop and a range you baked into a scale you passed to [xScale](/guide#xscale) – in either case that dimension keeps your range and ignores `percentRange`.

### position `string='relative'`

Determine the positioning of the wrapper div. Set this to `'absolute'` when you want to stack two `<LayerCake>` components on top of one another, such as when you have one that is server-side rendered and one client side like in the [Annotated column](/example-ssr/Column) example.

### custom `Object`

Any extra configuration values you want available on the LayerCake context. This could be useful for color lookups or additional constants.

```svelte
<LayerCake
  custom={ { size: 10, names: ['a', 'b', 'c'] } }
>
```

### pointerEvents `boolean=true`

Whether to allow pointer events via CSS. Set this to `false` to set `pointer-events: none;` on all components, disabling all mouse interaction.

### verbose `boolean=true`

Show warnings in the console, such as when the chart container has a zero or negative width or height. Set this to `false` to silence them.
