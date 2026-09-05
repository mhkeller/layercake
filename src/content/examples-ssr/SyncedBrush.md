Four charts sharing one brush. Each `SyncedBrushWrapper.percent-range.svelte` holds a chart and a brush and exposes `min` and `max` as bindable props. Binding all four to the same values keeps them in step, so dragging any brush zooms every chart.

This is the server-side rendered version. `ssr` and `percentRange` on `<LayerCake>` put the scales in percentages, so the chart renders before the browser measures it. The axes are HTML components and the marks sit in a `<ScaledSvg>` that stretches to fit its box.
