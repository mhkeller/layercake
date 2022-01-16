Layer Cake  [<img src="https://raw.githubusercontent.com/mhkeller/layercake.graphics/main/static/layercake-logo-500x400.png" width="115" align="right" alt="layercake-logo">](https://mhkeller.github.io/layercake)
===

> a framework for mostly-reusable graphics with [svelte](https://github.com/sveltejs/svelte)

[![Travis (.org) branch](https://img.shields.io/travis/mhkeller/layercake/master.svg?style=flat-square)](https://travis-ci.org/mhkeller/layercake) [![npm version](https://img.shields.io/npm/v/layercake.svg?style=flat-square)](https://npmjs.org/package/layercake)

 🍰 [See examples](https://layercake.graphics)
 🍰 [Read the guide](https://layercake.graphics/guide)
 🍰 [API docs](https://layercake.graphics/guide#layercake-props)
 🍰 [Component gallery](https://layercake.graphics/components)
 🍰 [Starter template](https://github.com/mhkeller/layercake-template)
 🍰

## Install

```sh
npm install --save layercake
```

## Example

```html
<script>
  import { LayerCake, Svg, Html, Canvas } from 'layercake';

  import AxisX from './components/AxisX.svelte';
  import AxisY from './components/AxisY.svelte';
  import Line from './components/Line.svelte';
  import Scatter from './components/Scatter.svelte';
  import Labels from './components/Labels.svelte';

  const data = [{ x: 0, y: 1 }, { x: 1, y: 2 }];
</script>

<style>
  /* Set dimensions on the parent.
     The <LayerCake> component will expand to fill it.
   */
  .chart-container {
    width: 100%;
    height: 500px;
  }
</style>

<div class="chart-container">
  <LayerCake
    x='x'
    y='y'
    {data}
  >
    <Svg>
      <AxisX/>
      <AxisY/>
      <Line color='#f0c'/>
    </Svg>

    <Canvas>
      <Scatter color='#0fc'/>
    </Canvas>

    <Html>
      <Labels/>
    </Html>
  </LayerCake>
</div>
```

## License

MIT
