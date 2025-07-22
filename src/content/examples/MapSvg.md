A map component using pre-projected topojson. The SVG map component uses Layer Cake's built-in `raise` function (adapted from [d3-selection](https://github.com/d3/d3-selection)) to ensure the hovered-over SVG element is always on top of its siblings.

The topojson file `states-albers-10m.json` is taken from the [U.S. Atlas TopoJSON](https://github.com/topojson/us-atlas) repository. This file is designed to fit a 975×610 viewport. Within the map component we can pass in [d3.geoIdentity](https://github.com/d3/d3-geo/blob/main/README.md#geoIdentity) in place of a projection function, in order to scale the SVG to fit its container.

For an example using a client-side projection function, see the [layered map](/example/MapLayered) example or the [map components examples](https://layercake.graphics/components#map).
