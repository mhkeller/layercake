---
title: Layout components
---

Layer Cake comes with layout components that provide HTML, Svg, ScaledSvg, Canvas and WebGL containers for your custom components.

You must wrap your chart components in these layout components for them to appear properly scaled. For Html and Svg components, they create a `<div>` and `<svg>`, respectively.

The Canvas and WebGL layout components also create canvas contexts that are then available on the LayerCake context object.

Each of these components also takes props. See the next section [Layout component props](/guide#layout-component-props) for more info.

Here are the four layout components: HTML, Svg, ScaledSvg, Canvas and WebGL containers.

### Html

```svelte
<!-- { filename: 'App.svelte' } -->
<script>
	import { LayerCake, Html } from 'layercake';
</script>

<div class="chart-container">
	<LayerCake ...>
		<Html zIndex={1}>
			<!-- Optional z-index -->
			...
		</Html>
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

### Svg

The SVG layout component also accepts a `viewBox` prop. See the [Layout component props](/guide#layout-component-props) section for more information.

```svelte
<!-- { filename: 'App.svelte' } -->
<script>
	import { LayerCake, Svg } from 'layercake';
</script>

<div class="chart-container">
	<LayerCake ...>
		<Svg zIndex={2}><!-- Optional z-index --></Svg>
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

This component also has a [named snippet](https://svelte.dev/docs/svelte/snippet) for adding elements into the SVG `<defs>` field but due to [an issue with Svelte](https://github.com/sveltejs/svelte/issues/7807) sometimes adding SVG nodes as HTML elements, this may not work. As an alternative, you can also simply add a `<defs>` tag:

```svelte
<div class="chart-container">
	<LayerCake ...>
		<Svg>
			<!-- Simply add a defs tag here-->
			<defs>
				<linearGradient id="myGradient" gradientTransform="rotate(90)">
					<stop offset="20%" stop-color="gold" />
					<stop offset="90%" stop-color="red" />
				</linearGradient>
				<defs>
					<!-- If you want to use the named slot,
        add the xmlns attribute on the `<linearGradient>` element -->
					<svelte:fragment slot="defs">
						<linearGradient
							id="myGradient"
							gradientTransform="rotate(90)"
							xmlns="http://www.w3.org/2000/svg"
						>
							<stop offset="20%" stop-color="gold" />
							<stop offset="90%" stop-color="red" />
						</linearGradient>
					</svelte:fragment>
				</defs></defs
			></Svg
		>
	</LayerCake>
</div>
```

### ScaledSvg

Use this when you want to render SVGs server side, using Rich Harris's [Pancake technique](https://dev.to/richharris/a-new-technique-for-making-responsive-javascript-free-charts-gmp).

It's often used in conjunction with props `ssr={true}` and `percentRange={true}`.

> When setting a boolean prop to `true`, you can omit the `={true}` portion and only include the prop name, e.g. `<LayerCake ssr percentRange ...>`.

The ScaledSvg component has two custom props: `fixedAspectRatio` and `viewBox`. See the [Layout component props](/guide#layout-component-props) section for more information.

```svelte
<!-- { filename: 'App.svelte' } -->
<script>
	import { LayerCake, ScaledSvg } from 'layercake';
</script>

<div class="chart-container">
	<LayerCake ssr percentRange>
		<ScaledSvg fixedAspectRatio={16 / 9}><!-- Optional fixed aspect ratio --></ScaledSvg>
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

This component also has a [named slot](https://svelte.dev/docs#slot_name) for adding elements into the SVG `<defs>` field. See [the Svg layout component section above](/guide#svg) for a note about how to use this and a workaround for a Svelte issue where elements are not always recognized.

### Canvas

```svelte
<!-- { filename: 'App.svelte' } -->
<script>
	import { LayerCake, Canvas } from 'layercake';

	import CanvasLayer from './components/CanvasLayer.svelte';
</script>

<div class="chart-container">
	<LayerCake ...>
		<Canvas zIndex={3}>
			<!-- Optional z-index -->
			<CanvasLayer />
		</Canvas>
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

In the component, you access the canvas context with `const { ctx } = getContext('canvas');`. This value is on a different context from the `getContext('LayerCake')` one because you could have multiple canvas layers and there wouldn't be an easy way to grab the right one. This way, the component always has access to just its parent Canvas component.

> Warning: If you want to draw multiple canvas layers, use one `<Canvas>` tag each. There is a bug in [Svelte's reactivity](https://github.com/mhkeller/layercake/issues/50) that will cause an infinite loop if you add two or more components in a single `<Canvas>` tag.

> Since the `ctx` value is a normal 2d context, the underlying canvas element is accessible under `ctx.canvas`.

Here's an example showing a scatter plot.

```svelte
<!-- { filename: './components/CanvasLayer.svelte' } -->
<script>
	import { getContext, onMount, untrack } from 'svelte';
	import { scaleCanvas } from 'layercake';

	const { data, xGet, yGet, width, height } = getContext('LayerCake');

	const { ctx } = getContext('canvas');

	/**
	 * @typedef {Object} Props
	 * @property {number} [r=5] - The circle's radius.
	 * @property {string} [fill='#0cf'] - The circle's fill color.
	 * @property {string} [stroke='#000'] - The circle's stroke color.
	 * @property {number} [strokeWidth=1] - The circle's stroke width.
	 */

	/** @type {Props} */
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

### WebGL

```svelte
<!-- { filename: 'App.svelte' } -->
<script>
	import { LayerCake, WebGL } from 'layercake';
</script>

<div class="chart-container">
	<LayerCake ...>
		<WebGL zIndex={4}><!-- Optional z-index --></WebGL>
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

In the component, you access the canvas context with `const { gl } = getContext('gl');`. This value is on a different context from the `getContext('LayerCake')` one because you could have multiple WebGL layers and there wouldn't be an easy way to grab the right one.

> Since the `gl` value is a normal WebGL context, the underlying canvas element is accessible under `gl.canvas`.

See the [WebGL scatter chart](/example/ScatterWebgl) for a working example.
