A grouped bar chart using the `y2` nested dimension. `y2` is a band scale whose range is one y band tall, so setting `y2="fruit"` positions each bar inside its group with no extra code.

This is the server-side rendered version. `ssr` and `percentRange` on `<LayerCake>` put the scales in percentages, so the chart renders before the browser measures it. The axes are HTML components and the marks sit in a `<ScaledSvg>` that stretches to fit its box. The `y2` band is in percent as well, so the bars inside each group share the ScaledSvg's units.
