Histogram using Layer Cake's [bin function](/guide#bin). Each bin has `x0` and `x1` edges, so the x accessor is both of them and each column spans its bin. Drag the slider to change how many bins there are.

This is the server-side rendered version. `ssr` and `percentRange` on `<LayerCake>` put the scales in percentages, so the chart renders before the browser measures it. The axes are HTML components and the marks sit in a `<ScaledSvg>` that stretches to fit its box.
