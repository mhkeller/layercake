A multiline example with a quadtree tooltip. This is an interesting example because the data exists in a few different structures:

1. We're loading data from a "wide" format CSV file where each series has its own column name.

   ```
   [
     {
       month: 2015-03-31T22:00:00.000Z,
       apples: '3840',
       bananas: '1920',
       cherries: '960',
       dates: '400'
     },
     {
       month: 2015-02-28T23:00:00.000Z,
       apples: '1600',
       bananas: '1440',
       cherries: '960',
       dates: '400'
     },
     ...
   ```

   We need to first turn this into...

2. ...a "long" format, where each type of fruit is grouped into its own array and each datapoint is a row. The column name becomes a property on the group whose name we define with the `zKey` variable.

   ```
   [
       {
           "fruit": "apples",
           "values": [
               {
                   "value": 3840,
                   "month": "2015-03-31T22:00:00.000Z",
                   "fruit": "apples"
               },
               {
                   "value": 1600,
                   "month": "2015-02-28T23:00:00.000Z",
                   "fruit": "apples"
               },
               ...
           ]
       },
       {
           "fruit": "bananas",
           "values": [
               {
                   "value": 1920,
                   "month": "2015-03-31T22:00:00.000Z",
                   "fruit": "bananas"
               },
       ...
   ```

3. We also need a flat, ungrouped array of objects so that Layer Cake can measure the full data extents. This gets passed to the `flatData` prop so the scales know the full domain of the data.
   ```
   [
     { value: 3840, month: 2015-03-31T22:00:00.000Z, fruit: 'apples' },
     { value: 1600, month: 2015-02-28T23:00:00.000Z, fruit: 'apples' },
     { value: 640, month: 2015-01-31T23:00:00.000Z, fruit: 'apples' },
     { value: 320, month: 2014-12-31T23:00:00.000Z, fruit: 'apples' },
     { value: 1920, month: 2015-03-31T22:00:00.000Z, fruit: 'bananas' },
     ...
   ```

We're using Layer Cake's [groupLonger transform function](/guide#grouplonger) to do steps one and two. See the [server-side rendered example](/example-ssr/MultiLine) for a regular JavaScript transform.
