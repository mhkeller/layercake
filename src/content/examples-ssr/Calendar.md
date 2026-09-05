A small multiple per month. The rows are grouped by month and then by day with d3-array's `group`, and each month's chart draws every day of that month, colored by how many rows fell on it.

This is the server-side rendered version. `ssr` and `percentRange` on `<LayerCake>` put the scales in percentages, so the chart renders before the browser measures it. The squares sit in a `<ScaledSvg>` that stretches to fit its box.
