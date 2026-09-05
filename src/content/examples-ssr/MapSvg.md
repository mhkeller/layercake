A map component using pre-projected topojson. The SVG map component uses Layer Cake's built-in `raise` function (adapted from [d3-selection](https://github.com/d3/d3-selection)) to keep the hovered state on top of its siblings, and a tooltip shows the state's data.

To render server-side, the map gets a `fixedAspectRatio` set ahead of time, since the server can't measure the container. The tooltip is HTML and works once the page is in the browser.

For an example using a client-side projection function, see the [layered map](/example-ssr/MapLayered) example or the [map components](/components#map).
