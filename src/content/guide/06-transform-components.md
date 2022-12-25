---
title: Transform components
---

Layer Cake also provides one component (for now) that modifies your input data to produce fancier layouts.

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

Here's an example splitting a scatter plot into three ([edit in REPL](https://svelte.dev/repl/f71eebb8f0014bbe93739937a122bbe4?version=3.55.0)):

```svelte
<script>
  import { LayerCake, Svg, Html } from 'layercake';

	import Facet from './Facet.svelte';

	import Line from './Line.svelte';

	let facetBy;

  const data = [
    { myX: 0, myY: 0, group: 'one' },
    { myX: 1, myY: 1, group: 'one' },
    { myX: 2, myY: 2, group: 'one' },
		{ myX: 3, myY: 3, group: 'one' },
		{ myX: 4, myY: 4, group: 'one' },
		{ myX: 5, myY: 5, group: 'one' },
		{ myX: 6, myY: 6, group: 'one' },
		{ myX: 7, myY: 7, group: 'one' },

    { myX: 0, myY: 0, group: 'two' },
		{ myX: 0, myY: 7, group: 'two' },
		{ myX: 7, myY: 0, group: 'two' },
		{ myX: 7, myY: 7, group: 'two' },
		{ myX: 3.5, myY: 3.5, group: 'two' },

    { myX: 0, myY: 7, group: 'three' },
		{ myX: 1, myY: 6, group: 'three' },
		{ myX: 2, myY: 5, group: 'three' },
		{ myX: 3, myY: 4, group: 'three' },
		{ myX: 4, myY: 3, group: 'three' },
		{ myX: 5, myY: 2, group: 'three' },
		{ myX: 6, myY: 1, group: 'three' },
		{ myX: 7, myY: 0, group: 'three' },
  ];
</script>

Facet by: <select bind:value={facetBy}>
	<option value="none">None</option>
	<option value="group">group</option>
</select>

<div class="chart-container">
  <Facet
    {data}
    by={facetBy}
    orientation="column"

    let:groupKey
    let:groupData
  >
		<div>
			{groupKey}
		</div>
    <!-- In this example, three charts will render -->
    <LayerCake
			padding={{ top: 15, bottom: 15 }}
      data={groupData.sort((a, b) => a.myX - b.myX)}
      x='myX'
      y='myY'
			xPadding={[5, 5]}
			yPadding={[5, 5]}
    >
      <Svg>
        <Line/>
      </Svg>
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
    width: 300px;
****    height: 300px;
  }
</style>
```
