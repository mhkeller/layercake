---
title: Accessibility
---

### Layout attributes

Since Layer Cake components live inside your project, you have full control over what your markup looks like. The exception is the built-in layout components `Svg`, `Canvas`, `Html`, `Svg` and `WebGl`.

Each of these components exposes props that will help with accessibility. These are the props that are common to all layout components:

* `label` → Sets [`aria-label`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label)
* `labelledBy` → Sets [`aria-labelledby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby)
* `describedBy` → Sets [`aria-describedby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby)

```svelte
<LayerCake>
  <Svg
    label="A chart showing a decrease in output as time progresses."
  >
    <!-- Components go here -->
  </Svg>
</LayerCake>
```

### HTML layouts

These aria labels are not very meaningful for `Html` components without also specifying a `role` attribute so if you set any of the above attributes, your HTML component will have `role='figure'` set. If you don't want that falue to be `'figure'`, the `Html` component – and only that one – has a `role` prop that will override it.

```svelte
<LayerCake>
  <!-- By default, any Html component has role set to 'figure' but you can change it with a prop -->
  <Html
    role='figure'
    label="A chart label of some kind."
  >
    <!-- Components go here -->
  </Html>
</LayerCake>
```

### SVG layouts

The `Svg` and `ScaledSvg` components have a `title` prop and a named `title` slot.

The prop is shorthand to set the contents of a `<title>` tag like this:

```svelte
<LayerCake>
  <Svg
    title='A chart title of some kind.'
  >
    <!-- Components go here -->
  </Svg>
</LayerCake>
```

And becomes...

```html
<div class="layercake-container">
  <div class="layercake-layout-html">
    <title>A chart title of some kind.</title>
    <!-- Components go here -->
  </div>
</div>
```

If you want to set more custom HTML, you can use the named `title` slot.

```svelte
<LayerCake>
  <Svg>
    <div slot="title">A chart title of some kind in custom HTML.</div>
    <!-- Components go here -->
  </Svg>
</LayerCake>
```

And becomes...

```html
<div class="layercake-container">
  <div class="layercake-layout-svg">
    <div>A chart title of some kind in custom HTML.</div>
    <!-- Components go here -->
  </div>
</div>
```

You mostly will just use the `title` prop but the slot is there as an escape hatch. Setting the `title` slot will override any value you set as the prop.

### Canvas and WebGl layouts

The `Canvas` and `WebGl` layout components have a `fallback` prop and a named `fallback` slot that defines the text to display when `<canvas>` is unavailable.

```svelte
<LayerCake>
  <Canvas fallback="A description of the chart to display when canvas is unavailable.">
    <!-- Components go here -->
  </Canvas>
</LayerCake>
```

And becomes...

```html
<div class="layercake-container">
  <div class="layercake-layout-canvas">
    <canvas>A description of the chart to display when canvas is unavailable.</canvas>
  </div>
</div>
```

If you want more complex fallback markup, set the named `fallback` slot:

```svelte
<LayerCake>
  <Canvas>
    <svelte:fragment slot="fallback">A description of the chart to display when canvas is unavailable.</svelte:fragment>
    <!-- Components go here -->
  </Canvas>
</LayerCake>
```

And becomes...

```html
<div class="layercake-container">
  <div class="layercake-layout-canvas">
    <canvas>A description of the chart to display when canvas is unavailable.</canvas>
  </div>
</div>
```
