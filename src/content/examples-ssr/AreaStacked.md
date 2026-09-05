Stacked area chart using D3's [stack](https://github.com/d3/d3-shape#stacks) function. Because this creates a nested data structure, we use Layer Cake's `flatten` function to pass a flat list to the `flatData` prop. See the [client-side example](/example/AreaStacked) for the same chart with Layer Cake's `stack` helper.

This is the server-side rendered version. `ssr` and `percentRange` on `<LayerCake>` put the scales in percentages, so the chart renders before the browser measures it. The axes are HTML components and the marks sit in a `<ScaledSvg>` that stretches to fit its box.
