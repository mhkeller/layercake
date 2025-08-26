Layer Cake  [<img src="https://raw.githubusercontent.com/mhkeller/layercake.graphics/main/static/layercake-logo-500x400.png" width="115" align="right" alt="layercake-logo">](https://mhkeller.github.io/layercake)
===

> a framework for mostly-reusable graphics with [svelte](https://github.com/sveltejs/svelte)

[![Tests badges](https://github.com/mhkeller/layercake/actions/workflows/node.js.yml/badge.svg)](https://github.com/mhkeller/layercake/actions/workflows/node.js.yml) [![npm version](https://img.shields.io/npm/v/layercake.svg)](https://npmjs.org/package/layercake) [![npm](https://img.shields.io/npm/dm/layercake.svg)](https://www.npmjs.com/package/layercake)

 🍰 [See examples](https://layercake.graphics)
 🍰 [Read the guide](https://layercake.graphics/guide)
 🍰 [API docs](https://layercake.graphics/guide#layercake-props)
 🍰 [View the Component Gallery](https://layercake.graphics/components)
 🍰 [Try the starter template](https://github.com/mhkeller/layercake-template)

## Svelte versions

Works with version 5, see this [issue](https://github.com/mhkeller/layercake/issues/156).
Users needing Svelte 3 or Svelte 4 support should use version 8.4.4.

All of the examples use Rune syntax but the Svelte 3 and Svelte 4 versions are still available at the [documentation archive](https://mhkeller.github.io/layercake-prerunes).

## Install

```sh
npm install --save layercake
```

## Example

```svelte
<script>
  // The library provides a main wrapper component
  // and a bunch empty layout components...
  import { LayerCake, Svg, Html, Canvas } from 'layercake';

  // ...that you fill with your own chart components,
  // that live inside your project and which you
  // can copy and paste from here as starting points.
  import AxisX from './components/AxisX.svelte';
  import AxisY from './components/AxisY.svelte';
  import Line from './components/Line.svelte';
  import Scatter from './components/Scatter.svelte';
  import Labels from './components/Labels.svelte';

  const data = [
    { x: 0, y: 1 },
    { x: 1, y: 2 },
    { x: 2, y: 3 }
  ];
</script>

<style>
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
