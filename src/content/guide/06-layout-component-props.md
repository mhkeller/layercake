---
title: Layout component props
---

In addition to the [accessibility props](guide#accessibility) described above, all layout components accept the following props:

- [zIndex](guide#zindex) `Number|string`
- [pointerEvents](guide#pointerevents) `Boolean`

The Svg and ScaledSvg layout components also accept:

- [viewBox](guide#viewbox) `string`

And ScaledSvg additionally accepts:

- [fixedAspectRatio](guide#fixedaspectratio) `Number`

The WebGL Component accepts:

- [contextAttributes](guide#contextattributes) `Object`

Each layout component also export an `element` prop that you can bind to and represents the HTML element that wraps the layout component. These are also available as slot props.

- In the `Html` component, `element` equals the `<div>` tag.
- In the `Svg` component, `element` equals the `<svg>` tag.
  - This layout component also has a `innerElement` binding to the `<g>` tag, which wraps all of the content.
- In the `ScaledSvg` component, `element` equals the `<svg>` tag.
- In the `Canvas` component, `element` equals the `<canvas>` tag.
- In the `WebGL` component, `element` equals the `<canvas>` tag.

The `Canvas` and the `WebGL` components also export a `context` variable that you can bind to and is also available as a slot prop.

- In the `Canvas` component, `context` equals `element.getContext('2d')`.
- In the `WebGL` component, `context` equals `element.getContext('webgl')`.

```svelte
<script>
	let svgElement;
	let canvasElement;
	let canvasContext;
</script>

<LayerCake ...>
	<Svg bind:element={svgElement} let:element>
		{console.log(svgElement === element)}
	</Svg>

	<Canvas bind:element={canvasElement} bind:context={canvasContext} let:element let:context>
		{console.log(canvasElement === element)}
		{console.log(canvasContext === context)}
	</Canvas>
</LayerCake>
```

### zIndex `Number|undefined`

This lets you fine-tune your layering and is useful if you want your layers to build in a certain order but have a different appearance than their DOM order.

```svelte
<LayerCake ...>
	<Svg zIndex={2}></Svg>
</LayerCake>
```

### pointerEvents `Boolean|undefined`

Useful for tooltip layers that need to be display above chart elements but not capture mouse events. Defaults to no `pointer-events` CSS being set. Set to `false` to set `pointer-events: none;`

```svelte
<LayerCake ...>
	<Html pointerEvents={false}></Html>
</LayerCake>
```

### viewBox `string`

For Svg components, this defaults to `''` and for ScaledSvg it defaults to `0 0 100 100`.

```svelte
<LayerCake ...>
	<Svg viewBox="0 0 100 50"></Svg>
</LayerCake>
```

### fixedAspectRatio `Number=1`

For ScaledSvg components, you can pass in a set aspect ratio. See the [server-side rendered Map](/example-ssr/MapSvg) for an example. Default is `1`.

```svelte
<LayerCake ...>
	<ScaledSvg fixedAspectRatio={16 / 9}></ScaledSvg>
</LayerCake>
```

### contextAttributes `Object|undefined`

For WebGL components, you can pass in an object that gets passed as the second argument to `canvas.getContext()`. See the [WebGL docs](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext) for more details on what those attributes can be.

```svelte
<LayerCake ...>
	<WebGL
		contextAttributes={{
			antialias: false,
			depth: false,
			alpha: false
		}}
	></WebGL>
</LayerCake>
```
