A scatter plot drawn with HTML. The [client-side version](/example/Scatter) stacks canvas and SVG layers with a Voronoi hover layer on top. None of those render on the server, so this version uses the HTML scatter component with a stroke to keep the dots visible on their own.

This is the server-side rendered version. `ssr` and `percentRange` on `<LayerCake>` put the scales in percentages, so the chart renders before the browser measures it. The axes are HTML components and so are the dots.
