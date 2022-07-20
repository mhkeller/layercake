---
title: Introduction
---

### What is Layer Cake?

Layer Cake is a graphics framework for [Svelte](https://svelte.dev) that removes the boilerplate from making responsive web graphics. it gives you common elements, like a coordinate system and scales, for you to start creating your own dataviz layers, like axes, plots and annotations.

Layer Cake is described as a framework and not a library because unlike Vega or HighCharts, it doesn't automatically create, for example, a scatter chart for you. It gives you the scales and the DOM element to encode chart elements from your data. This is because every chart usually ends up needing some customization in one way or another. Those other libraries handle customization  usually by creating a complex JSON specification but learning that is a big investment and can be another layer of abstraction to take into account.

The idea behind a Layer Cake chart is you can start from a basic scatter, line or bar chart template and – because those chart layers live in your project – you can customize them however you want.

By organizing a graphic into layers, you can more easily reuse components from project to project. It also lets you easily move between web languages (SVG, Canvas, HTML, WebGL) by giving you a common coordinate system they can all use. That way, you can choose the best format for each element without worrying superimposing different elements on top of one another.

Layer Cake is more about having a system to organize your own custom components than it is a high-level charting library.

> Layer Cake uses D3 scales. See more in the [xScale](/guide#xscale), [yScale](/guide#yscale), [zScale](/guide#zscale) and [rScale](/guide#rscale) sections of the [Layer Cake Props API](/guide#layercake-props).

### Key Concepts

1. Layer components exist inside your own project. Layer Cake doesn't have any built-in concept of what a bar chart or column chart is, for example. It is a tool to give you scales and empty containers to draw on.
2. Layer Cake needs a flat array of objects to measure the extents of your data. In most cases, what you pass in to the `data` prop is already a flat array of objects. In some cases, though, like [multi-series line](/example/MultiLine) charts or [maps](/example/MapSvg), your data needs to take on a more complex shape. In these instances, pass in a flat array of objects to the [`flatData`](/guide#flatdata) prop and your accessors will be called on each object in order to calculate your scale extents.
3. For most scale types, such as [linear scales](https://github.com/d3/d3-scale#scalelinear), Layer Cake measures the extents of your data as the `[min, max]`. For categorical scale types ([`scaleBand`](https://github.com/d3/d3-scale#scaleband), [`scalePoint`](https://github.com/d3/d3-scale#scalepoint and [`scaleOrdinal`](https://github.com/d3/d3-scale#scaleordinal), it calculates the extent as the unique values in that list. Also, if your y-scale is not one of these categorical scales, it reverses the default range from `[0, height]` to `[height, 0]` in order to match the DOM coordinate system and make drawing easier out of the box.

### Getting started

Install Layer Cake in your `dependencies` alongside Svelte.

```sh
npm install --save layercake
```

The easiest way to get started is to clone down, or use [degit](https://github.com/rich-harris/degit) to grab the starter template at [https://github.com/mhkeller/layercake-template](https://github.com/mhkeller/layercake-template).

```sh
degit mhkeller/layercake-template my-chart
cd my-chart
```

The `App.svelte` file in this example is your main Svelte component. You can render a `<LayerCake>` inside a DOM element like so.

```svelte
<!-- { filename: 'js/App.svelte' } -->
<script>
  import { LayerCake } from 'layercake';

  // Define some data
  const points = [
    {x: 0, y: 0},
    {x: 5, y: 10},
    {x: 10, y: 20},
    {x: 15, y: 30},
    {x: 20, y: 40}
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
    data={ points }
    x='x'
    y='y'
  >
    <!-- Components go here -->
  </LayerCake>
</div>
```

> Each of the [chart examples](https://layercake.graphics) can be downloaded or edited live in the browser by clicking on the "Download" or "Edit" buttons, respectively.

### Using layout components

Within the `LayerCake` component, you'll want to add at least one layout component, kind of like a wrapper. It can be `Svg`, `Html`, `Canvas` or `WebGL`. Within any of these is where you'll put your own custom layer components. Here's an example with a few different layout elements working together.

```svelte
<!-- { filename: 'App.svelte' } -->
<script>
  import { LayerCake, Svg, Canvas, Html }  from 'layercake';

  // These are components that live in your project that
  // you can customize as you see fit
  import ScatterCanvas from './components/ScatterCanvas.svelte';
  import AxisX from './components/AxisX.svelte';
  import AxisY from './components/AxisY.svelte';
  import Annotations from './components/Annotations.svelte';

  // Set up some data
  const points = [
    {x: 0, y: 0},
    {x: 5, y: 10},
    {x: 10, y: 20},
    {x: 15, y: 30},
    {x: 20, y: 40}
  ];

  const annotationBlurbs = [
    { x: 10, y: 20, text: 'Look at this value!'}
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
    x='x'
    y='y'
    data={points}
  >
    <Canvas>
      <ScatterCanvas fill={'blue'} r={3}/>
    </Canvas>

    <Svg>
      <AxisX/>
      <AxisY/>
    </Svg>

    <Html>
      <Annotations blurbs={annotationBlurbs} />
    </Html>

    <!-- If you wanted to, you could add another <Svg> again... -->
  </LayerCake>
</div>
```

> Layout components have a few their own properties that let you customize behavior. Read more in the [Layout Components](guide#layout-components) section.

### Layer components

The only components the Layer Cake module exports are `LayerCake` and those layout components, everything else that actually draws your chart is up to you to create. Inside those layer components you can access the scales and other values derived from your data. You do this with Svelte's [`getContext`](https://svelte.dev/docs#getContext) function.

Here's an example starting with a similar `App.svelte` file to the example above. We're creating a scatter chart in SVG.

```svelte
<!-- { filename: 'App.svelte' } -->
<script>
  import { LayerCake, Svg } from 'layercake';
  import Scatter from './components/Scatter.svelte';

  const points = [
    {x: 0, y: 0},
    {x: 5, y: 10},
    {x: 10, y: 20},
    {x: 15, y: 30},
    {x: 20, y: 40}
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
    x='x'
    y='y'
    data={ points }
  >
    <Svg>
      <!-- You can expose properties on your chart components to make them more reusable -->
      <Scatter fill={'blue'} r={3} />
    </Svg>
  </LayerCake>
</div>
```

This is what the scatter component looks like:

```svelte
<!-- { filename: './components/Scatter.svelte' } -->
<script>
  // Import the getContext function from svelte
  import { getContext } from 'svelte';

  // Access the context using the 'LayerCake' keyword
  // Grab some helpful functions
  const { data, x, xScale, y, yScale } = getContext('LayerCake');

  export let fill = '#000';
  export let r = 5;
</script>

<g>
  {#each $data as d}
    <circle cx='{ $xScale($x(d)) }' cy='{ $yScale($y(d)) }' {fill} {r} />
  {/each}
</g>
```

> You *could* hardcode the radius and fill in the component but exposing those variables to your App makes this component more reusable from project to project. Or, within a project, you could use the same layer component to render different charts of varying color.

A few notes on this component:

1. Everything that you export from `getContext('LayerCake')` is a [Svelte store](https://svelte.dev/docs#svelte_store) so prefix them with `$` in the template.
2. This example is a bit verbose because we're calling our accessor functions and then our scale functions. You can combine these two steps with the built-in `xGet` and `yGet` functions. Like so:

```svelte
<!-- { filename: './components/Scatter.svelte' } -->
<script>
  // Import the getContext function from svelte
  import { getContext } from 'svelte';

  // Access the context using the 'LayerCake' keyword
  // Grab some helpful functions
  const { data, xGet, yGet } = getContext('LayerCake');

  // Customizable defaults
  export let fill = '#000';
  export let r = 5;
</script>

<g>
  {#each $data as d}
    <circle cx='{ $xGet(d) }' cy='{ $yGet(d) }' {fill} {r} />
  {/each}
</g>
```

> Many common chart types have example pages. See the gallery at <https://layercake.graphics> or use the dropdown menu at the top of the page to navigate to one.

### Data-less cakes

You can also use Layer Cake to simply arrange SVG, HTML, Canvas and WebGL elements on top of one another, sharing the same dimensions. For example, this would be handy if you have some SVG artwork that you want to put on top of an HTML video player.

Here's an example that doesn't set any properties on the `LayerCake` component:

```svelte
<!-- { filename: 'App.Svelte' } -->
<script>
  import { LayerCake, Svg, Html } from 'layercake';
  import Frame from './components/Frame.svelte';
  import VideoPlayer from './components/VideoPlayer.svelte';
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
  <LayerCake>
    <Svg>
      <Frame/>
    </Svg>

    <Html>
      <VideoPlayer/>
    </Html>
  </LayerCake>
</div>
```

### Server-side rendering

See the [layercake-template](https://github.com/mhkeller/layercake-template) for the rollup config needed to compile LayerCake server-side. In short, it creates a JavaScript file, which then constructs the required HTML and CSS when executed. You have the option of also hydrating that markup with any additiona client-side JavaScript, or building it without any bundled JavaScript.

You can also use LayerCake in Sapper (or similar dev environment) to create charts that work without JavaScript, which is how the server-side examples on this site work. Just set the [ssr](/guide#ssr) prop to `true`. Check out the examples on the [home page](/) for useful patterns using the [percentRange](/guide#percentrange) option, the [ScaledSvg](/guide#scaledsvg) component and other percentage-based components.

### How does LayerCake know what to set as a scale's domain and range?

As of version 7.0, Layer Cake tries to be a little smarter about how it calculates these values. For categorical scales like ([`scaleBand`](https://github.com/d3/d3-scale#scaleband), [`scalePoint`](https://github.com/d3/d3-scale#scalepoint and [`scaleOrdinal`](https://github.com/d3/d3-scale#scaleordinal), it calculates the extent as the list of unique values in your data for a given field. This is useful for bar charts, column charts or color scales where you have discrete values as opposed to a continuous range.

For all other scale types, Layer Cake measures the extent as the simple `[min, max]` values.

The default ranges for each dimension are:

* x: `[0, width]`
* y: `[height, 0]`, unless using a `scaleBand` or `scalePoint` and it is `[0, height]`
* r: `[1, 25]`. The min is `1` and not zero because this is a `scaleSqrt` by default and `0` is not allowed in that type of chart.
* z: `[0, width]`
