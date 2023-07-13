A multiline example with a quadtree tooltip. This is an interesting example because the data exists in a few different structures:

1. We're loading data from a "wide" format where each series has its own column name. We need to first turn this into...
2. ...a "long" format, where each type of fruit is grouped into its own array and each datapoint is a row. The column name becomes a property on the group whose name we define with the `zKey` variable.
3. We also need a flat, ungrouped array of objects so that Layer Cake can measure the full data extents. This gets passed to the `flatData` prop so the scales know the full domain of the data.

We're using Layer Cake's [groupLonger transform component](/guide#grouplonger) to do steps one and two. See the [server-side rendered example](/example-ssr/Multiline) for a regular JavaScript transform.
