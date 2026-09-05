A line chart with a brush under it. The `Brush.html.svelte` component reports a `min` and `max` from 0 to 1 through bindable props, and the top chart shows only that slice of the rows. Drag on the bottom chart to try it.

This is the server-side rendered version. `ssr` and `percentRange` on `<LayerCake>` put the scales in percentages, so the chart renders before the browser measures it. The axes are HTML components and the marks sit in a `<ScaledSvg>` that stretches to fit its box. The brush is HTML, so it works the same way in both versions.
