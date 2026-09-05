You could reshape the rows into `name`, `value` and `group` and plot them like a scatter plot. This chart skips that with Layer Cake's accessor shorthand: the x accessor is the list of columns to plot, so `k.xGet(row)` turns each row into a list of pixel values, one per dot.

This is the server-side rendered version. `ssr` and `percentRange` on `<LayerCake>` put the scales in percentages, so the chart renders before the browser measures it. The axes are HTML components and so are the dots.
