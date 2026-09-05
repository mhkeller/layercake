---
title: Layout components
---

Layer Cake comes with layout components that provide HTML, Svg, ScaledSvg, Canvas and WebGL containers for your custom components.

You must wrap your chart components in these layout components for them to appear properly scaled. For Html and Svg components, they create a `<div>` and `<svg>`, respectively.

The Canvas and WebGL layout components also create rendering contexts that are made available to your layer components on their own Svelte contexts, under the `'canvas'` and `'gl'` keys, respectively – `getCanvasContext()` returns the canvas one. See the [Canvas](/guide#canvas) and [WebGL](/guide#webgl) sections below for details.

Each of these components also takes props. See the next section [Layout component props](/guide#layout-component-props) for more info.

Here are the five layout components: Html, Svg, ScaledSvg, Canvas and WebGL containers.

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

This component also has a named `defs` [snippet](https://svelte.dev/docs/svelte/snippet) for adding elements into the SVG `<defs>` field but due to [an issue with Svelte](https://github.com/sveltejs/svelte/issues/7807) sometimes adding SVG nodes as HTML elements, this may not work. If you use it, add the `xmlns` attribute on the top-level element inside the snippet:

```svelte
<div class="chart-container">
	<LayerCake ...>
		<Svg>
			{#snippet defs()}
				<linearGradient
					id="myGradient"
					gradientTransform="rotate(90)"
					xmlns="http://www.w3.org/2000/svg"
				>
					<stop offset="20%" stop-color="gold" />
					<stop offset="90%" stop-color="red" />
				</linearGradient>
			{/snippet}

			<!-- Components go here -->
		</Svg>
	</LayerCake>
</div>
```

As an alternative, you can also simply add a `<defs>` tag yourself:

```svelte
<div class="chart-container">
	<LayerCake ...>
		<Svg>
			<defs>
				<linearGradient id="myGradient" gradientTransform="rotate(90)">
					<stop offset="20%" stop-color="gold" />
					<stop offset="90%" stop-color="red" />
				</linearGradient>
			</defs>

			<!-- Components go here -->
		</Svg>
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

This component also has a named `defs` [snippet](https://svelte.dev/docs/svelte/snippet) for adding elements into the SVG `<defs>` field. See [the Svg layout component section above](/guide#svg) for a note about how to use this and a workaround for a Svelte issue where elements are not always recognized.

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

The `<canvas>` element covers the whole chart container, padding included. Layer Cake moves its origin to the top-left of the chart area, so you draw in the same coordinates as an Svg or Html child: `k.xGet(d)` lands in the same spot on every layout. Anything you draw past the edges shows up in the padding, the way it does on the other layouts. Pass `overflow="hidden"` to clip at the chart area instead.

Components draw by handing Layer Cake a function. Get the canvas context with `getCanvasContext()` and call `canvas.draw(ctx => { ... })`. Here's a scatter plot:

```svelte
<!-- { filename: './components/CanvasLayer.svelte' } -->
<script>
	import { getLayerCakeContext, getCanvasContext } from 'layercake';

	const k = getLayerCakeContext();
	const canvas = getCanvasContext();

	/**
	 * @typedef {Object} Props
	 * @property {number} [r=5] - The circle's radius.
	 * @property {string} [fill='#0cf'] - The circle's fill color.
	 * @property {string} [stroke='#000'] - The circle's stroke color.
	 * @property {number} [strokeWidth=1] - The circle's stroke width.
	 */

	/** @type {Props} */
	let { r = 5, fill = '#0cf', stroke = '#000', strokeWidth = 1 } = $props();

	canvas.draw(ctx => {
		k.data.forEach((/** @type {any} d */ d) => {
			ctx.beginPath();
			ctx.arc(k.xGet(d), k.yGet(d), r, 0, 2 * Math.PI, false);
			ctx.lineWidth = strokeWidth;
			ctx.strokeStyle = stroke;
			ctx.stroke();
			ctx.fillStyle = fill;
			ctx.fill();
		});
	});
</script>
```

Call `draw` once while your component is setting up. Layer Cake runs your function every time the chart repaints: on resize, new data or a prop change. Before each repaint it scales the canvas for the screen, clears it and moves the origin, so your function only draws. Everything the function reads (props, `$state`, `k.*`) is tracked, so changing any of it repaints. The function runs inside an effect: it can read reactive values but should not write them.

Several components can draw on one `<Canvas>`. They paint in the order they called `draw`, so the first component ends up at the bottom. A component that is removed and added back by an `{#if}` goes to the top of the stack. Each component's layer is removed when the component is destroyed. `draw` also returns a function that removes it sooner.

```svelte
<Canvas>
	<Background />
	<Points />
</Canvas>
```

`canvas.ctx` is the canvas's 2d context (`null` until the canvas mounts) for reading – the pixel under the pointer, `canvas.ctx.canvas.toDataURL()` – rather than drawing. If your draw function reads something Svelte can't see change, like an array you mutate in place or an image that just finished loading, call `canvas.redraw()` from wherever that change happens. That runs the whole paint again, the same as after a resize: the canvas is cleared and every draw function is called, not just yours.

The canvas context is separate from the LayerCake one because you could have multiple canvas layers and there wouldn't be an easy way to grab the right one. This way, the component always has access to just its parent Canvas component.

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

In the component, you access the canvas context with `const glCtx = getContext('gl');` and read the WebGL context as `glCtx.gl`. This value is on a different context from the LayerCake one because you could have multiple WebGL layers and there wouldn't be an easy way to grab the right one.

> Since the `glCtx.gl` value is a normal WebGL context, the underlying canvas element is accessible under `glCtx.gl.canvas`.

See the [WebGL scatter chart](/example/ScatterWebgl) for a working example.
