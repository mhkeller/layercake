---
title: Transform components
---

Layer Cake also provides a set of components don't render any HTML but instead transform your data. They are meant to wrap your `<LayerCake>` component and to be handy shortcuts for common data transformations.

### Facet

The **Facet** transform component will segment your data into multiple groups and display those groups as separate charts in a small multiple format.

Here's an example making a scatter plot where the original data includes a bunch of points but that can be segregated into three groups.

The component has the following props:

* **data** The data to be faceted
* **by** The field name to facet by as a string.
* **orientation** Can be 'column' or 'row', defaults to 'column. It determines whether to arrange the faceted charts by row or column. This is passed to `flex-direction` on the parent container.

It returns as slot props:

* **groupKey** The key of each group
* **groupData** The data in each group

Here's an example splitting a scatter plot into three:

```svelte
<!-- { filename: 'App.svelte' } -->
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
