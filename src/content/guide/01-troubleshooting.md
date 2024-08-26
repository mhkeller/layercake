---
title: Troubleshooting
---

### Use the debug feature

To get more information about what scales you're using and the calculated `domain` and `range`, set the [`debug`](/guide#debug) prop to `true`.

```svelte
<LayerCake
  debug={true}

  <!-- Can also be set simply with this Svelte shorthand -->
  debug
>
```

This will print:

1. The bounding box dimensions of your chart container
2. The scales you have currently set and for each one:
   1. The accessor function or string key
   2. The scale type
   3. The `domain`
   4. The `range`

It's helpful if you're trying to track down why a chart is not display correctly, which comes down to CSS not being set on the parent chart container or weird data issues (`undefined`, `NaN` values etc...) that are throwing off the extent calculation for the `domain`.

### TypeScript

Layer Cake suggests using TypeScript 5 and, [per the SvelteKit docs](https://kit.svelte.dev/docs/packaging#typescript), suggests you set the `moduleResolution` option to `bundler`. See the SvelteKit docs [for more info](https://kit.svelte.dev/docs/packaging#typescript).

### The chart is blank

The `<LayerCake>` component expands to fill the size of its parent `<div>` – that's why all of the examples define a `chart-container` element with a specific width and height. If your chart isn't showing up, make sure you have a width and height set on your wrapper div.

Inspect the DOM tree with your browser's dev tools and look at what width and height the Layer Cake layout elements are receiving and trace up the parents in the tree to see which element may not be sized properly. If you have an unusual combination of `absolute`-ly positioned elements, it could be one of the parents is not getting a specific width and height.

Also take a look in the console for any warnings. LayerCake will warn you if any of the dimensions are zero or negative.

### The chart is a very small square

This is likely due to some other JavaScript error on the page. A small rectangle of a chart, probably 100x100 means that the server-side rendering was able to bake elements onto the page, but something short-circuited the JavaScript. Check for other console errors that halted the JavaScript process.

### The library isn't building properly

Layer Cake is _almost entirely_ a basic Svelte component. The exception is the [index.js](https://github.com/mhkeller/layercake/blob/bc13c6c38d54abc16d20ef37878fa707bf48a3bf/src/index.js) file, which is an esm module. This file, though, is non-essential to how the library works and is just a pointer for the rest of the library's imports. If you copy Layer Cake's source into your project directly and import the individual components, it should build just like any other Svelte component in your project.

For example:

```svelte
<script>
	import LayerCake from './layercake/src/LayerCake.svelte';
	import Svg from './layercake/src/layouts/Svg.svelte';
	// etc...
</script>
```

> Copying Layer Cake's layout components into your library is actually a great way to add any additional customizations or functionality while maintaining compatibility with the rest of the library's API. You can use any of the built-in layout components as a starting point for something more complex, if need be.

### Listening for click events on the entire component

See the example in [this issue](https://github.com/mhkeller/layercake/issues/123).
