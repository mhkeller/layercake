---
title: Computed context values
---

In addition to the values you set on the LayerCake component, additional properties are computed and exposed on the context. These are also exposed as slot props via the `let:` keyword on the `<LayerCake>` component such as:

```svelte
<LayerCake let:xScale let:yGet let:containerWidth>
	<!-- Components... -->
</LayerCake>
```

### activeGetters `Object`

An object that has a key for each dimension of data you have provided an accessor key for and a value that is the accessor function. This used internally but it's exposed here in case it's useful.

```js
{
  x: '<function>',
  y: '<function>',
  z: '<function>',
  r: '<function>
}
```

### aspectRatio `Number`

The aspect ratio of the chart, `width / height`. As a slot prop, you could use it to selectively display some components over others:

```svelte
<LayerCake let:aspectRatio>
	{#if aspectRatio > 1}
		<LayoutOne />
	{:else}
		<LayoutTwo />
	{/if}
</LayerCake>
```

### box `Object`

A bounding box object of the parent container with `top`, `right`, `bottom`, `left`, `width` and `height` numbers in pixels. Useful for creating tooltips.

### config `Object`

A copy of some of the config properties set on the `<LayerCake>` component.

Some of these properties get changed by the time they end up on the context object. For example, the [x](/guide#x), [y](/guide#y), [z](/guide#z) and [r](/guide#r) LayerCake properties can be strings or arrays but when they're exposed on the context as compued values, they are always a function. Sometimes, it's useful to refer to those original props such as in the [Cleveland Dot Plot example](/example/ClevelandDotPlot), which uses the x accessor shorthand of providing a list of keys.

Or, [xDomain](/guide#xdomain) and the other domain props can be used to set manual limits on the min or max of the domain scale. This can be different from what gets set on the context [xDomain](/guide#xdomain) if the prop value contained any `null` values. If you want to refer to the original value for any reason, it's set on this object.

Having access to this field can help you not repeat yourself in specifying things twice or in scenarios where Layer Cake is doing a transformation on that original value, like in accessors or domain inputs, and you want to know about the original value.

### containerWidth `Number`

The width of the parent container – the div element that contains the `<LayerCake>` component. Unlike [width](/guide#width), this value does not take into account any margin. As a variable on the Layer Cake slot so you can access it with `let:containerWidth`.

### containerHeight `Number`

The height of the parent container – the div element that contains the `<LayerCake>` component. Unlike [height](/guide#height), this value does not take into account any margin. This is also exposed as a variable on the Layer Cake slot so you can access it with `let:containerHeight`.

### extents `Object`

An object containing a key for x, y or r (if any are set), whose value is two-value array representing the min and max values for that field in the data.

This value could differ from the domain of your scale if you are manually setting a limit on your scale by setting any of the `xDomain`, `yDomain`, `zDomain` or `rDomain` settings. This is used internally to set domain things but it's also useful as a reference if you want to toggle between an arbitrary domain and the measured extents of the data, such as in the [small multiples example](/example/SmallMultiples).

```js
{
  x: [0, 235],
  y: [0, 80],
  z: [0, 90],
  r: [0, 35]
}
```

### width `Number`

The width of the drawable space for the chart. This is the width of the parent container taking into account any margin. This is also exposed as a variable on the Layer Cake slot so you can access it with `let:width`.

### height `Number`

The width of the drawable space for the chart. This is the height of the parent container taking into account any margin. This is also exposed as a variable on the Layer Cake slot so you can access it with `let:height`.

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
	import { getContext } from 'svelte';
	const { data, x, y } = getContext('LayerCake');
</script>

{#each $data as d}
	<circle cx={$xScale($x(d))} cy={$yScale($y(d))} />
{/each}
```

### y `Function`

Same as [x](/guide#x-1) but for the y dimension.

### z `Function`

Same as [x](/guide#x-1) but for the z dimension.

### r `Function`

Same as [x](/guide#x-1) but for the r dimension.

### xDomain `Array:[min: Number, max: Number]`

The calculated extent of the x-dimension of the data. This is the extent of the data taking into account any manual settings passed in for [xDomain](/guide#xdomain).

For example, if the extent of the data is `[10, 100]` and you set the xDomain prop to `[0, null]`, the xDomain on the context value is `[0, 100]`.

It's equivalent to calling `$xScale.domain()`.

### yDomain `Array:[min: Number, max: Number]`

Same as [xDomain](/guide#xdomain-1) above but for the y domain.

### zDomain `Array:[min: Number, max: Number]`

Same as [xDomain](/guide#xdomain-1) above but for the z domain.

### rDomain `Array:[min: Number, max: Number]`

Same as [xDomain](/guide#xdomain-1) above but for the r domain.

### xRange `Array:[min: Number, max: Number]`

The range used for the x-scale. This is usually `[0, width]` unless it's been manually set via the [xRange](/guide#xrange) prop.

It's equivalent to calling `$xScale.range()`.

### yRange `Array:[min: Number, max: Number]`

Same as [xRange](/guide#xrange-1) above but for the y domain.

### zRange `Array:[min: Number, max: Number]`

Same as [xRange](/guide#xrange-1) above but for the z domain.

### rRange `Array:[min: Number, max: Number]`

Same as [xRange](/guide#xrange-1) above but for the r domain.

### xGet(d: `Object`)

Often you want to get the x value from a row in your data and scale it like so: `$xScale($x(d))`. Avoid that confusing syntax with this function like so `$xGet(d)`.

Why use this? Hard coding key names into your components makes them less reusable. By using the [x](/guide#x), [y](/guide#y), [z](/guide#z) and [z](/guide#z) accessors, you can use the same component across projects. Or, you can use the same component to render different fields from one dataset across separate charts in the same project, say using small multiples. You can use the same component and just alter the accessor.

Here are a few examples to show how it working and what it's equivalent to:

```svelte
<script>
	import { getContext } from 'svelte';

	const { data, x, xScale, xGet } = getContext('LayerCake');

	// data === [{ myX: 'hello', myY: 'hi }];
</script>

{#each data as d}
	<!-- These are equivalent: -->
	d.myX === $x(d); $xScale(d.myX) === $xScale($x(d)) === $xGet(d);
{/each}
```

Here's an example from a simple scatter plot:

```svelte
<script>
	import { getContext } from 'svelte';

	const { data, xGet, yGet } = getContext('LayerCake');
</script>

{#each $data as d}
	<circle cx={$xGet(d)} cy={$yGet(d)} r="5" fill="#000" />
{/each}
```

### yGet(d: `Object`)

Same as [xGet](/guide#xget) but for the y scale.

### zGet(d: `Object`)

Same as [xGet](/guide#xget) but for the z scale.

### rGet(d: `Object`)

Same as [xGet](/guide#xget) but for the r scale.

### xScale(d: `Object`)

The calculated scale for the x dimension.

### yScale(d: `Object`)

Same as the above but for the y dimension.

### zScale(d: `Object`)

Same as the above but for the z dimension.

### rScale(d: `Object`)

Same as the above but for the r dimension.
