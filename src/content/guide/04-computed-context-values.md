---
title: Computed context values
---

In addition to the values you set on the LayerCake component, additional properties are computed and exposed on the context, which you access in a layer component with `const c = getLayerCakeContext()`. The same object is also passed to the `<LayerCake>` component's children snippet:

```svelte
<LayerCake x="myX" y="myY" {data}>
	{#snippet children(c)}
		<!-- Components... or use values directly, e.g. {c.containerWidth} -->
	{/snippet}
</LayerCake>
```

### activeGetters `Object`

An object that has a key for each dimension of data you have provided an accessor key for and a value that is the accessor function. This used internally but it's exposed here in case it's useful.

```js
{
  x: '<function>',
  y: '<function>',
  z: '<function>',
  r: '<function>'
}
```

### aspectRatio `number`

The aspect ratio of the chart, `width / height`. Read it off the children snippet to swap between layouts:

```svelte
<LayerCake>
	{#snippet children(c)}
		{#if c.aspectRatio > 1}
			<LayoutOne />
		{:else}
			<LayoutTwo />
		{/if}
	{/snippet}
</LayerCake>
```

### config `Object`

A copy of some of the config properties set on the `<LayerCake>` component.

Some of these properties get changed by the time they end up on the context object. For example, the [x](/guide#x), [y](/guide#y), [z](/guide#z) and [r](/guide#r) LayerCake properties can be strings or arrays but when they're exposed on the context as computed values, they are always a function. Sometimes, it's useful to refer to those original props such as in the [Cleveland Dot Plot example](/example/ClevelandDotPlot), which uses the x accessor shorthand of providing a list of keys.

Or, [xDomain](/guide#xdomain) and the other domain props can be used to set manual limits on the min or max of the domain scale. This can be different from what gets set on the context [xDomain](/guide#xdomain) if the prop value contained any `null` values. If you want to refer to the original value for any reason, it's set on this object.

Having access to this field can help you not repeat yourself in specifying things twice or in scenarios where Layer Cake is doing a transformation on that original value, like in accessors or domain inputs, and you want to know about the original value.

### containerWidth `number`

The width of the parent container – the div element that contains the `<LayerCake>` component. Unlike [width](/guide#width-1), this value does not take into account any padding. It's also on the children snippet, as `c.containerWidth`.

### containerHeight `number`

The height of the parent container – the div element that contains the `<LayerCake>` component. Unlike [height](/guide#height-1), this value does not take into account any padding. It's also on the children snippet, as `c.containerHeight`.

### data `Array`

The `data` you passed in as a prop. This is what your layer components will most commonly iterate over, like `{#each c.data as d}`.

The [flatData](/guide#flatdata), [padding](/guide#padding) and [custom](/guide#custom) props are also available on the context under those same names, as is an `extents` object holding the measured data extents for each active dimension.

### width `number`

The width of the drawable space for the chart. This is the width of the parent container taking into account any padding. It's also on the children snippet, as `c.width`.

### height `number`

The height of the drawable space for the chart. This is the height of the parent container taking into account any padding. It's also on the children snippet, as `c.height`.

### x `Function`

The x accessor. This will always be a function regardless of whether you passed in a string or an array as a prop. If you passed in an array, it will return an array of equal length.

```svelte
<LayerCake
  x='x'
  <!-- equivalent to -->
  x={ d => d.x }
>
```

```svelte
<script>
	import { getLayerCakeContext } from 'layercake';
	const c = getLayerCakeContext();
</script>

{#each c.data as d}
	<circle cx={c.xScale(c.x(d))} cy={c.yScale(c.y(d))} />
{/each}
```

### y `Function`

Same as [x](/guide#x-1) but for the y dimension.

### z `Function`

Same as [x](/guide#x-1) but for the z dimension.

### r `Function`

Same as [x](/guide#x-1) but for the r dimension.

### x1, y1, c and c1 `Function`

Same as [x](/guide#x-1) but for the nested x1 and y1 dimensions – useful for grouped charts such as [grouped columns](/example/ColumnGrouped) – and the color dimensions c and c1. Like every dimension, they each also expose their computed scale, domain, range and getter on the context, e.g. `c.x1Scale`, `c.cGet(d)`.

### xDomain `Array:[min: number, max: number]`

The calculated extent of the x-dimension of the data. This is the extent of the data taking into account any manual settings passed in for [xDomain](/guide#xdomain).

For example, if the extent of the data is `[10, 100]` and you set the xDomain prop to `[0, null]`, the xDomain on the context value is `[0, 100]`.

It's equivalent to calling `c.xScale.domain()`.

### yDomain `Array:[min: number, max: number]`

Same as [xDomain](/guide#xdomain-1) above but for the y domain.

### zDomain `Array:[min: number, max: number]`

Same as [xDomain](/guide#xdomain-1) above but for the z domain.

### rDomain `Array:[min: number, max: number]`

Same as [xDomain](/guide#xdomain-1) above but for the r domain.

### xRange `Array:[min: number, max: number]`

The range used for the x-scale. This is usually `[0, width]` unless it's been manually set via the [xRange](/guide#xrange) prop.

It's equivalent to calling `c.xScale.range()`.

### yRange `Array:[min: number, max: number]`

Same as [xRange](/guide#xrange-1) above but for the y domain.

### zRange `Array:[min: number, max: number]`

Same as [xRange](/guide#xrange-1) above but for the z domain.

### rRange `Array:[min: number, max: number]`

Same as [xRange](/guide#xrange-1) above but for the r domain.

### xGet(d: `Object`)

Often you want to get the x value from a row in your data and scale it like so: `c.xScale(c.x(d))`. Avoid that confusing syntax with this function like so `c.xGet(d)`.

Why use this? Hard coding key names into your components makes them less reusable. By using the [x](/guide#x), [y](/guide#y), [z](/guide#z) and [r](/guide#r) accessors, you can use the same component across projects. Or, you can use the same component to render different fields from one dataset across separate charts in the same project, say using small multiples. You can use the same component and just alter the accessor.

Here are a few examples to show how it works and what it's equivalent to:

```svelte
<script>
	import { getLayerCakeContext } from 'layercake';

	const c = getLayerCakeContext();

	// data === [{ myX: 'hello', myY: 'hi' }];
</script>

{#each c.data as d}
	<!-- These are equivalent: -->
	d.myX === c.x(d); c.xScale(d.myX) === c.xScale(c.x(d)) === c.xGet(d);
{/each}
```

Here's an example from a simple scatter plot:

```svelte
<script>
	import { getLayerCakeContext } from 'layercake';

	const c = getLayerCakeContext();
</script>

{#each c.data as d}
	<circle cx={c.xGet(d)} cy={c.yGet(d)} r="5" fill="#000" />
{/each}
```

### yGet(d: `Object`)

Same as [xGet](/guide#xget) but for the y scale.

### zGet(d: `Object`)

Same as [xGet](/guide#xget) but for the z scale.

### rGet(d: `Object`)

Same as [xGet](/guide#xget) but for the r scale.

### xScale `Function`

The calculated D3 scale for the x dimension. Call it with a value from your data's domain, e.g. `c.xScale(c.x(d))`.

### yScale `Function`

Same as the above but for the y dimension.

### zScale `Function`

Same as the above but for the z dimension.

### rScale `Function`

Same as the above but for the r dimension.
