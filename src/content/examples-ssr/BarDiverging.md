A bar chart with negative and positive values. The `xDomain` function stretches the measured domain so it always includes zero, and a `c` scale colors each bar by whether its value is up or down.

This is the server-side rendered version. `ssr` and `percentRange` on `<LayerCake>` put the scales in percentages, so the chart renders before the browser measures it. The axes are HTML components and the marks sit in a `<ScaledSvg>` that stretches to fit its box. The zero line uses `vector-effect: non-scaling-stroke` so the stretch doesn't thicken it.
