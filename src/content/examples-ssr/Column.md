Since we want an ordinal x-axis and Layer Cake defaults to a linear scale, pass in a custom scale to `xScale` with a few formatting options. Set the y-scale to always start at `0` so you don't show misleading differences between groups.

Since it's tricky to server-side render circles in SVG, this example uses a second `<LayerCake>` component for the arrow, which renders client-side and uses the `position='absolute'` prop to make sure the two cakes are super-imposed on one another.

For the annotation arrowhead, note that, depending on your app structure, such as if you're using Sapper, you may need to provide an [explicit link to your SVG marker id](https://github.com/sveltejs/svelte/issues/3450), such as in `./components/Arrows.svelte` using `window.location.href`.
