Layer Cake  [<img src="https://github.com/mhkeller/layercake-examples/raw/master/assets/layercake-logo-500x400.png" width="115" align="right" alt="layercake-logo">](https://mhkeller.github.io/layercake)
===

> a framework for mostly-reusable graphics with [svelte](https://github.com/sveltejs/svelte)

[![Travis (.org) branch](https://img.shields.io/travis/mhkeller/layercake/master.svg?style=flat-square)](https://travis-ci.org/mhkeller/layercake) [![npm version](https://img.shields.io/npm/v/layercake.svg?style=flat-square)](https://npmjs.org/package/layercake)

 🍰 [See examples](https://layercake.graphics)
 🍰 [Read the guide](https://layercake.graphics/guide)
 🍰 [API docs](https://layercake.graphics/guide#store-api)
 🍰

## Example

```js
import LayerCake from 'LayerCake';

const myCake = new LayerCake({
    padding: { top: 0, right: 0, bottom: 20, left: 25 },
    x: 'x',
    y: 'y',
    yDomain: [0, null],
    data: points,
    target: document.getElementById('chart-target')
  })

// Returns a Svelte store that you can use on your own own...
console.log(myCake.get());

// Or to render out components
myCake
  .svgLayers([
    { component: AxisX },
    { component: AxisY },
    { component: Line },
    { component: Area }
  ])
  .htmlLayers([
    { component: TextAnnotations, opts: { annos } },
  ])
  .render();
```

## Install

```sh
npm install layercake
```
