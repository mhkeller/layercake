Layer Cake  [<img src="https://raw.githubusercontent.com/mhkeller/mhkeller.github.io/layercake.pre-runes/main/static/layercake-logo-500x400.png" width="115" align="right" alt="layercake-logo">](https://mhkeller.github.io/layercake)
===

# 🚨 ARCHIVED REPOSITORY 🚨

## This repository contains pre-Svelte 5 runes documentation and is no longer actively maintained.

### For the latest Layer Cake documentation and updates, please visit:
- **📖 [layercake.graphics](https://layercake.graphics)** - Official documentation site
- **🔗 [github.com/mhkeller/layercake](https://github.com/mhkeller/layercake)** - Main repository

---

> a framework for mostly-reusable graphics with [svelte](https://github.com/sveltejs/svelte)

 🍰 [See examples](https://mhkeller.github.io/layercake.pre-runes)
 🍰 [Read the guide](https://mhkeller.github.io/layercake.pre-runes/guide)
 🍰 [API docs](https://mhkeller.github.io/layercake.pre-runes/guide#layercake-props)
 🍰 [View the Component Gallery](https://mhkeller.github.io/layercake.pre-runes/components)
 🍰 [Try the starter template](https://github.com/mhkeller/layercake-template)

## Svelte versions

Works with Svelte 3 through 5. Note the library itself does not use runes but it is compatible with Svelte 5. This will change in [future versions](https://github.com/mhkeller/layercake/issues/156).

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
