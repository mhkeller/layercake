A map component using [d3-geo](https://github.com/d3/d3-geo) for the projection. The SVG map component uses Layer Cake's built-in `raise` function (adapted from [d3-selection](https://github.com/d3/d3-selection)) to ensure the hovered-over SVG element is always on top of its siblings.

To render server-side, this example uses the `fixedAspectRatio` property, which the user sets ahead of time.

For an example using a client-side projection function, see the [layered map](/example-ssr/MapLayered) example or the [map components examples](https://layercake.graphics/components#map).
