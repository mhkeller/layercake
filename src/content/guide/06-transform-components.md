---
title: Transform components
---

Layer Cake also provides a set of components don't render any HTML but instead transform your data. They are meant to wrap your `<LayerCake>` component and to be handy shortcuts for common data transformations.

### Bin

The **Bin** transform component is a wrapper around the `bin` function in [d3-array](https://github.com/d3/d3-array#bins). It's useful for histograms.

The component has the following props:

* **data** `Array|Object`
  * The data to be binned.
* **value** `Function|String`
  * Optional. An accessor function passed to [`bin.value()`](https://github.com/d3/d3-array#bin_value). If this is a string, it will be transformed into an accessor for that key.
* **domain** `Array`
  * Optional. The domain passed to [`bin.domain()`](https://github.com/d3/d3-array#bin_domain).
* **thresholds** `Number|Array|Function`
  * Optional. The thresholds passed to [`bin.thresholds()`](https://github.com/d3/d3-array#bin_thresholds). Optional. Can be a number, array or function.

It returns as slot props:

* **binData** `Array`
  * The transformed data.

Here's an example ([edit in REPL](https://svelte.dev/repl/dc86fbe62a0940afb28ce6ab69c4150a?version=3.49.0)) on a stacked area chart:

```svelte
<script>
  import { LayerCake, Bin, Svg } from 'layercake';

  import { scaleBand } from 'd3-scale';

  import Column from './components/Column.svelte';

  const data = [
    { myX: 0 },
    { myX: 1 },
    { myX: 2 },
    { myX: 4 },
    { myX: 2 },
    { myX: 8 },
    { myX: 1 },
    { myX: 4 },
    { myX: 7 }
  ];
</script>

<div class="chart-container">
  <Bin
    {data}
    value={d => d.myX}
    // ... can also be a string
    value='myX'

    let:binData
  >
  <!--
    binData equals (taken from the d3-array docs): an array of bins, where each bin is an array containing the associated elements from the input data. Thus, the length of the bin is the number of elements in that bin. Each bin has two additional attributes:

    x0 - the lower bound of the bin (inclusive).
    x1 - the upper bound of the bin (exclusive, except for the last bin).

    [
      [
        { myX: 0 },
        { myX: 1 },
        { myX: 1 }
      ], // length: 3, x0: 0, x1: 2
      [
        { myX: 2 },
        { myX: 2 }
      ], // length: 2, x0: 2, x1: 4,
      [
        { myX: 4 },
        { myX: 4 }
      ], // length: 2, x0: 4, x1: 6,
      [
        { myX: 7 }
      ], // length: 1, x0: 7, x1: 8,
      [
        { myX: 8 }
      ] // length: 1, x0: 8, x1: 10,
    ]
    -->
    <LayerCake
      data={binData}
      x={['x0', 'x1']}
      y='length'
      xScale={scaleBand().paddingInner([0])}
      yDomain={[0, null]}
    >
      <Svg>
        <Column stroke="#000" strokeWidth="1"/>
      </Svg>
    </LayerCake>
  </Bin>
</div>

<style>
  /*
  	The wrapper div needs to have an explicit width and height in CSS.
  	It can also be a flexbox child or CSS grid element.
  	The point being it needs dimensions since the <LayerCake> element will
  	expand to fill it.
  */
  .chart-container {
    width: 100%;
    height: 300px;
  }
</style>
```

### Facet

The **Facet** transform component will segment your data into multiple groups and display those groups as separate charts in a small multiple format.

Here's an example making a scatter plot where the original data includes a bunch of points but that can be segregated into three groups.

The component has the following props:

* **data** `Array|Object`
  * The data to be faceted
* **by** `String`
  * The field name to facet by as a string.
* **orientation** `String="column"`
  * Can be 'column' or 'row', defaults to 'column'. It determines whether to arrange the faceted charts by row or column. This is passed to `flex-direction` on the parent container.

It returns as slot props:

* **groupKey** `String`
  * The key of each group.
* **groupData** `Array`
  * The data in each group.

Here's an example splitting a scatter plot into three:

```svelte
<script>
  import { LayerCake, Facet, Html } from 'layercake';

  import Scatter from './components/Scatter.html.svelte';

  const data = [
    { myX: 0, myY: 1, group: 'one' },
    { myX: 1, myY: 3, group: 'one' },
    { myX: 2, myY: 1, group: 'one' },

    { myX: 4, myY: 1, group: 'two' },
    { myX: 2, myY: 4, group: 'two' },
    { myX: 8, myY: 2, group: 'two' },

    { myX: 1, myY: 5, group: 'three' },
    { myX: 4, myY: 2, group: 'three' },
    { myX: 7, myY: 3, group: 'three' }
  ];
</script>

<div class="chart-container">
  <Facet
    {data}
    by="group"
    orientation="column"

    let:groupKey
    let:groupData
  >
    <!-- In this example, three charts will render -->
    <LayerCake
      data={groupData}
      x='myX'
      y='myY'
    >
      <Html>
        <Scatter>
      </Html>
    </LayerCake>
  </Facet>
</div>

<style>
  /*
  	The wrapper div needs to have an explicit width and height in CSS.
  	It can also be a flexbox child or CSS grid element.
  	The point being it needs dimensions since the <LayerCake> element will
  	expand to fill it.
  */
  .chart-container {
    width: 100%;
    height: 300px;
  }
</style>
```

### SeriesLonger

The **SeriesLonger** transform component is useful for data that you get in a "wide" format that you want to break into a multi-series chart.

For example, let's say you have a spreadsheet like this and you want to create a line chart with one line for each fruit over time.

```txt
month,apples,bananas,cherries,dates
2015-03-01,1600,1440,960,400
2015-02-01,640,960,640,400
2015-01-01,320,480,640,400
```

You need to convert your data into something like this:

```js
[
  {
    series: 'apples',
    values: [
      {
        month: '2015-03-01',
        value: 1600,
        series: 'apples'
      },
      {
        month: '2015-02-01',
        value: 640,
        series: 'apples'
      },
      {
        month: '2015-01-01',
        value: 320,
        series: 'apples'
      }
    ]
  },
  {
    series: 'bananas',
    values: [
      {
        month: '2015-03-01',
        value: 1440,
        series: 'bananas'
      },
      {
        month: '2015-02-01',
        value: 960,
        series: 'bananas'
      },
      {
        month: '2015-01-01',
        value: 480,
        series: 'bananas'
      }
    ]
  },
  {
    series: 'cherries',
    values: [
      {
        month: '2015-03-01',
        value: 960,
        series: 'cherries'
      },
      {
        month: '2015-02-01',
        value: 640,
        series: 'cherries'
      },
      {
        month: '2015-01-01',
        value: 640,
        series: 'cherries'
      }
    ]
  },
  {
    series: 'dates',
    values: [
      {
        month: '2015-03-01',
        value: 400,
        series: 'dates'
      },
      {
        month: '2015-02-01',
        value: 400,
        series: 'dates'
      },
      {
        month: '2015-01-01',
        value: 400,
        series: 'dates'
      }
    ]
  }
]
```

The component has the following props:

* **data** `Array|Object`
  * The data to be transformed.
* **seriesNames** `String[]`
  * The series names to break out out into separate groups.
* **seriesTo** `String='series'`
  * Optional. This name of the field that is added to each group object. Defaults to 'group'. This field is also added to each row of data.
* **valueTo** `String='value'`
  * Optional. The name of the new field on each row of data to store the value under. Defaults to 'value'.
* **keepKeys** `String[]`
  * Optional. Any keys we want to explicitly keep. If this is unset, all keys not specified in your groups will be kept. The list of full keys is determined by naively looking at the first row of the data.

It returns as slot props:

* **seriesData** `Array`
  * The transformed data.

Here's an example on a multline chart:

```svelte
<script>
  import { LayerCake, Bin, Svg } from 'layercake';

  import MultiLine from './components/MultiLine.svelte';

  const data = [
    { month: '2015-03-01', apples: 1600, bananas: 1440, cherries: 960, dates: 400 },
    { month: '2015-02-01', apples: 640, bananas: 960, cherries: 640, dates: 400 },
    { month: '2015-01-01', apples: 320, bananas: 480, cherries: 640, dates: 400 }
  ];

  const seriesNames = ['apples', 'bananas', 'cherries', 'dates'];
  const seriesColors = ['#f0c', '#0fc', '#fc0', '#0cf'];
</script>

<div class="chart-container">
  <SeriesLonger
    {data}
    {seriesNames}
    seriesTo='series'
    valueTo='value'

    let:seriesData
  >
  <!--
    seriesData is transformed to this:
    [
      {
        series: 'apples',
        values: [
          {
            month: '2015-03-01',
            value: 1600,
            series: 'apples'
          },
          {
            month: '2015-02-01',
            value: 640,
            series: 'apples'
          },
          {
            month: '2015-01-01',
            value: 320,
            series: 'apples'
          }
        ]
      },
      {
        series: 'bananas',
        values: [
          {
            month: '2015-03-01',
            value: 1440,
            series: 'bananas'
          },
          {
            month: '2015-02-01',
            value: 960,
            series: 'bananas'
          },
          {
            month: '2015-01-01',
            value: 480,
            series: 'bananas'
          }
        ]
      },
      {
        series: 'cherries',
        values: [
          {
            month: '2015-03-01',
            value: 960,
            series: 'cherries'
          },
          {
            month: '2015-02-01',
            value: 640,
            series: 'cherries'
          },
          {
            month: '2015-01-01',
            value: 640,
            series: 'cherries'
          }
        ]
      },
      {
        series: 'dates',
        values: [
          {
            month: '2015-03-01',
            value: 400,
            series: 'dates'
          },
          {
            month: '2015-02-01',
            value: 400,
            series: 'dates'
          },
          {
            month: '2015-01-01',
            value: 400,
            series: 'dates'
          }
        ]
      }
    ]
    -->
    <LayerCake
      data={seriesData}
      x='month'
      y='value'
      z='series'
      yDomain={[0, null]}
      zScale={scaleOrdinal()}
      zDomain={seriesColors}
      flatData={flatten(seriesData, d => d.values)}
    >
      <Svg>
        <MultiLine/>
      </Svg>
    </LayerCake>
  </Bin>
</div>

<style>
  /*
  	The wrapper div needs to have an explicit width and height in CSS.
  	It can also be a flexbox child or CSS grid element.
  	The point being it needs dimensions since the <LayerCake> element will
  	expand to fill it.
  */
  .chart-container {
    width: 100%;
    height: 300px;
  }
</style>
```

### Stack

The **Stack** transform component is a wrapper around the `stack` function in [d3-shape](https://github.com/d3/d3-shape#stacks).

The component has the following props:

* **data** `Array|Object`
  * The data to be stacked.
* **keys** `String[]`
  * The series names to stack, passed to [`stack.keys()`](https://github.com/d3/d3-shape#stack_keys).
* **value** `Function|String`
  * Optional. An accessor function passed to [`stack.value()`](https://github.com/d3/d3-shape#stack_value). If this is a string, it will be transformed into an accessor for that key.
* **order** `Array|Function`
  * Optional. The stack order passed to [`stack.order()`](https://github.com/d3/d3-shape#stack_order).
* **offset** `Array|Function`
  * Optional. The offset function passed to [`stack.offset()`](https://github.com/d3/d3-shape#stack_offset).

It returns as slot props:

* **stackData** `Array`
  * The transformed data.

Here's an example on a stacked area chart:

```svelte
<script>
  import { LayerCake, Stack, Svg, flatten } from 'layercake';

  import ColumnStacked from './components/ColumnStacked.svelte';

  const data = [
    {month: '2015-03-01', apples: 3840, bananas: 1920, cherries: 960, dates: 400},
    {month: '2015-02-01', apples: 1600, bananas: 1440, cherries: 960, dates: 400},
    {month: '2015-01-01', apples: 640,  bananas: 960,  cherries: 640, dates: 400},
    {month: '2015-00-01', apples: 320,  bananas: 480,  cherries: 640, dates: 400}
  ];
</script>

<div class="chart-container">
  <Stack
    {data}
    keys={['apples', 'bananas', 'cherries', 'dates']}

    let:stackData
  >
  <!--
    stackData equals an array of values. The `month` values you can't see because sneakily stashes them as a property on the array, accessible as `d.data`.
    [
      [[   0, 3840], [   0, 1600], [   0,  640], [   0,  320]], // apples
      [[3840, 5760], [1600, 3040], [ 640, 1600], [ 320,  800]], // bananas
      [[5760, 6720], [3040, 4000], [1600, 2240], [ 800, 1440]], // cherries
      [[6720, 7120], [4000, 4400], [2240, 2640], [1440, 1840]]  // dates
    ]
    -->
    <LayerCake
      data={stackData}
      flatData={flatten(stackData)}
      x='myX'
      y='myY'
    >
      <Svg>
        <ColumnStacked/>
      </Svg>
    </LayerCake>
  </Stack>
</div>

<style>
  /*
  	The wrapper div needs to have an explicit width and height in CSS.
  	It can also be a flexbox child or CSS grid element.
  	The point being it needs dimensions since the <LayerCake> element will
  	expand to fill it.
  */
  .chart-container {
    width: 100%;
    height: 300px;
  }
</style>
```
