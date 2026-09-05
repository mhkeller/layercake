A grouped column chart using the `x2` nested dimension. `x2` is a band scale whose range is one x band wide, so setting `x2="fruit"` positions each column inside its group with no extra code.

This is the server-side rendered version. `ssr` and `percentRange` on `<LayerCake>` put the scales in percentages, so the chart renders before the browser measures it. The axes are HTML components and the marks sit in a `<ScaledSvg>` that stretches to fit its box. The `x2` band is in percent as well, so the columns inside each group share the ScaledSvg's units.
