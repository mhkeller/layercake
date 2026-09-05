A scatter plot drawn with WebGL, with HTML axes and a [QuadTree](/components/QuadTree.percent-range.html.svelte) layer that marks the nearest point on hover.

This is the server-side rendered version. `ssr` and `percentRange` on `<LayerCake>` put the scales in percentages, so the chart renders before the browser measures it. The axes are HTML components, and the WebGL layer draws once the page is in the browser.
