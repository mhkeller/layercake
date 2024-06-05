Changelog
===

# 8.3.0

> 2024-06-04

A very minor update. This adds an index variable `i` to key accessor functions mostly for consistency with the callback signature of a for-loop and to support possible unorthodox arrangments where a row is accessed not from `$data` but from `somethingElse[i]` in the accessor function.

* [PR#207](https://github.com/mhkeller/layercake/pull/207)

# 8.2.0

> 2024-05-17

Adds an option to suppress layout warnings. By default, Layer Cake warns you when you create a div that is too small. But sometimes you want to create a chart inside a hidden element or something and make the chart expand. In these cases, the warnings are annoying.

* [PR#200](https://github.com/mhkeller/layercake/pull/200)

# 8.1.4

> 2024-05-06

Rebuilt the lockfile because of [this issue with GitHub CI](https://github.com/npm/cli/issues/4828#issuecomment-2077092392). Bumping to a new version just so everyone has the same lockfile.

* [ec415109dc871476f3e4f3756eec52999396a83f](https://github.com/mhkeller/layercake/commit/ec415109dc871476f3e4f3756eec52999396a83f)
* [0eb3acd71459cbcfd81336e080bb48b90d5be1e3](https://github.com/mhkeller/layercake/commit/0eb3acd71459cbcfd81336e080bb48b90d5be1e3)
* [14a1ad3fc528c9c5eac2bcdcc768035bf871c83b](https://github.com/mhkeller/layercake/commit/14a1ad3fc528c9c5eac2bcdcc768035bf871c83b)


# 8.1.3

> 2024-05-06

Make compatible with Svelte 5. Note: This does not update the API to use runes, eliminate the use of stores or get rid of reactive statements. Thanks to  @rgieseke for the help on this!

* [PR#190](https://github.com/mhkeller/layercake/pull/190)

# 8.1.2

> 2024-04-24

Excludes `flatData` from the debug printout if it's null.

* [PR#188](https://github.com/mhkeller/layercake/pull/188)

# 8.1.1

> 2024-03-12

Following up on 8.0.3, adds `flatData` to the debug printout.

* [PR#180](https://github.com/mhkeller/layercake/pull/180)

# 8.1.0

> 2024-03-11

This adds `xDomainSort`, `yDomainSort`, `zDomainSort` and `rDomainSort` props that will kick in when the scale is ordinal. By default, unique value calculations return a sorted list. You can now use these props to set that to `false` and return the uniques in the order they appeared in the data.

Also updates the API to `calcUniques` helper function to also accept field-specific sort instructions.

* [PR#176](https://github.com/mhkeller/layercake/pull/176)

# 8.0.3

> 2024-03-07

Also print the `data` object when `debug` is set.

* [PR#173](https://github.com/mhkeller/layercake/pull/173)

# 8.0.2

> 2023-10-14

Corrects the change in 8.0.0 for sorting a domain by adding a comparator function to better sort strings and dates. Also fixes an oversight where domains that were dates would not be calculated uniquely. Also some security upgrades. [Closes #151](https://github.com/mhkeller/layercake/issues/151)

* [PR#149](https://github.com/mhkeller/layercake/pull/149)
* [PR#151](https://github.com/mhkeller/layercake/pull/151)

Note: Due to a publishing error, there is no 8.0.1

# 8.0.0

> 2023-09-19

When calculating uniques for an ordinal scale's domain, sort the list. This will help in case your input data changes order, in which case your colors may be off (if using that dimension for a color scale). This is technically a breaking change although it may not actually affect any live charts.

* [PR#142](https://github.com/mhkeller/layercake/pull/142)

# 7.6.1

> 2023-07-19

Fixes JSDoc types to allow for `null` values in the `xDomain`, `yDomain` etc. props. Thanks [@rgieseke](https://github.com/rgieseke)!

* [PR#141](https://github.com/mhkeller/layercake/pull/141)

# 7.6.0

> 2023-06-27

Upgrade to Svelte 4.0. Set version 3 and 4 as a peer dep.

* [PR#137](https://github.com/mhkeller/layercake/pull/137)

# 7.5.0

> 2023-06-25

Add accessibility props to layout components.

* [PR#133](https://github.com/mhkeller/layercake/pull/133)

# 7.4.0

> 2023-04-15

Expose context values as slot props. Make the defaults for `yReverse` reactive post-load.

* [PR#110](https://github.com/mhkeller/layercake/pull/110)
* [PR#130](https://github.com/mhkeller/layercake/pull/130)
* [2ed7d18cb69a515ebe2d5ce9fe11545ec3ed677b](https://github.com/mhkeller/layercake/commit/2ed7d18cb69a515ebe2d5ce9fe11545ec3ed677b)

# 7.3.5

> 2023-04-04

Dependabot fix

* [PR#126](https://github.com/mhkeller/layercake/pull/126)

# 7.3.4

> 2023-03-17

Bring back the `"main": "./dist/index.js",` field in `package.json` for legacy build systems.

* [639f7397f055fe8bfda0f5cbc04dc58a1b91ca28](https://github.com/mhkeller/layercake/commit/639f7397f055fe8bfda0f5cbc04dc58a1b91ca28)

# 7.3.3

> 2023-03-17

Align values better in print debug output.

# 7.3.2

* [4fe0f3b5e3bc4660107f682f2d0884efa43edb6f](https://github.com/mhkeller/layercake/commit/4fe0f3b5e3bc4660107f682f2d0884efa43edb6f)

> 2023-03-17

Cut down on dependencies by using d3-color for contrast detection

* [0229ab57e817908359d23183dfa8760e4816205f](https://github.com/mhkeller/layercake/commit/0229ab57e817908359d23183dfa8760e4816205f)

# 7.3.1

> 2023-03-16

Adds the `debug-mode` prop. Note: 7.3.0 was skipped because of an npm error.

* [PR #12](https://github.com/mhkeller/layercake/pull/112)

# 7.2.3

> 2023-03-16

Correct the types on the `xDomain`, `rDomain`, `zDomain`, `rDomain` props to reflect that the values can be `null` to inherit the calculated min or max. Updates `svelte-package` and `package.json` to use `exports` field. Adds Typescript 5 as a `peerDep`.

* [0c9b3ddc4ac9f8bb79db346e2682876f280a7862](https://github.com/mhkeller/layercake/commit/0c9b3ddc4ac9f8bb79db346e2682876f280a7862)
* [PR #118](https://github.com/mhkeller/layercake/pull/118)

# 7.2.2

> 2022-12-26

Add the `d3-shape` and `d3-array` as dependencies to handle new helper functions. Note: 7.2.1 was skipped because of an npm error.

* [791107d3c7ffda5e8a56f4f12d3d9179a26c4ffb](https://github.com/mhkeller/layercake/commit/791107d3c7ffda5e8a56f4f12d3d9179a26c4ffb)

# 7.2.0

> 2022-12-23

This release adds new functions: `bin`, `stack`, `groupLonger` and `takeEvery`. It also adds a new second argument to `flatten`.

* [PR #95](https://github.com/mhkeller/layercake/pull/95)

# 7.1.0

> 2022-10-03

Allow for all `nNice` props to take a number instead of just a boolean.

* [PR #101](https://github.com/mhkeller/layercake/pull/101) from [@techniq](https://github.com/techniq).

# 7.0.0

> 2022-07-10

This release has a few new features that should make for nicer default charts when working with ordinal scales. Many thanks to [@techniq](https://github.com/techniq) for kicking things off with this. Here are the highlights:

1. When setting a `scaleBand` or `scalePoint` scale, the `yRange` is no longer reversed by default [PR #85](https://github.com/mhkeller/layercake/pull/85).
2. If the scale already has a custom interpolator function, don't set the range. This helps when using `scaleSequential` and `scaleDiverging` for a color scale. Interpolators are kind of like ranges but set with a different method. Before, any custom interpolator you set when passing in the scale would get overridden when the range was set automatically [PR #89](https://github.com/mhkeller/layercake/pull/89).
3. If setting a `scaleOrdinal`, `scaleBand` or `scalePoint`, the calculated extents will be a series of unique values instead of `[min, max]` [PR #90](https://github.com/mhkeller/layercake/pull/90).
4. A new function called [`calcUniques`](https://github.com/mhkeller/layercake/blob/68ddb96e5f98ec59cbe7cd3cc3e2ca204e457113/src/lib/lib/calcUniques.js) which has the same API as [`calcExtents`](https://github.com/mhkeller/layercake/blob/68ddb96e5f98ec59cbe7cd3cc3e2ca204e457113/src/lib/lib/calcExtents.js) but calculates unique values instead of mins and maxes.

This is technically a breaking change because the behavior is different but the only real change you would see would be the order of an ordinal y scale will be unreversed – which may be more correct than what it was previously.

# 6.1.2

> 2022-07-10

Makes a more helpful error message when the data passed into `calcExtents` isn't an array.

* [0e10894911db7c0cde14aabf44fd18b2235f43dc](https://github.com/mhkeller/layercake/commit/0e10894911db7c0cde14aabf44fd18b2235f43dc)

# 6.1.1

> 2022-06-24

* [PR#82](https://github.com/mhkeller/layercake/pull/82)

Fixes some typos in documentation


# 6.1.0

> 2022-02-22

This adds an `innerElement` prop you can bind to on the `<Svg>` component that lets you bind to the `<g>` element. Mostly this release improves reactivity by setting initial values for store values and changing the syntax from using `.set` to using assignments, which apparently helps Svelte understand the topology. This should lead to fewer re-renders. It also will only warn about negative dimensions on the parent container once DOM elements are mounted. So you won't get a warning because the code was executed before the DOM was able to measure it. This release improves layout components by using new [style directives](https://github.com/sveltejs/rfcs/pull/42).

* [4530774c759114fd8de0854542fa162b694a5c7c](https://github.com/mhkeller/layercake/commit/4530774c759114fd8de0854542fa162b694a5c7c)
* [85684a94c9cf79b204e1453723e97b7853ed2af6](https://github.com/mhkeller/layercake/commit/85684a94c9cf79b204e1453723e97b7853ed2af6)
* [c51506ad0e45718962ccabb831b9408bfe82009a](https://github.com/mhkeller/layercake/commit/c51506ad0e45718962ccabb831b9408bfe82009a)
* [28a1f9e92e39464111055f27801a0af45583df26](https://github.com/mhkeller/layercake/commit/28a1f9e92e39464111055f27801a0af45583df26)

# 6.0.1

> 2022-01-19

Fill in a misssing documentation line for the `padding` prop.

* [e682adaed7a7fbea63f6911e533e37e1c5d9952e](https://github.com/mhkeller/layercake/commit/e682adaed7a7fbea63f6911e533e37e1c5d9952e)

# 6.0.0

> 2022-01-16

Layer Cake is now built with SvelteKit and the website is included in this repo instead of the [layercake.graphics](https://github.com/mhkeller/layercake.graphics) repo. This is a new major version since that seemed like a clean way to separate out any problems that might arise from the SvelteKit build process but there shouldn't actually be any breaking changes. One new feature is you'll now get TypeScript type hints when using the library (powered by JSDoc comments). Many thanks to [everyone](https://github.com/mhkeller/layercake/issues/49) who helped](https://github.com/mhkeller/layercake/issues/58) sort out best practices for that. There are a lot of commits in this release so instead of including them all here, here's the diff between this release and 5.0.3: https://github.com/mhkeller/layercake/compare/v5.0.3...v6.0.0

# 5.0.3

> 2021-12-14

Fix an extra argument that was causing the `aspectRatio` context val to be `NaN`. PR [#55](https://github.com/mhkeller/layercake/pull/55) from @techniq to add `"svelte": "src/index.js"` to package.json, fixes [#54](https://github.com/mhkeller/layercake/issues/54).
  * [ed7e53b672b9e1ddcaf334dad283d6a547552e6a](https://github.com/mhkeller/layercake/commit/ed7e53b672b9e1ddcaf334dad283d6a547552e6a)
  * [ef975738a0d2c8513e3164d218027c3c3c5fc84f](https://github.com/mhkeller/layercake/commit/ef975738a0d2c8513e3164d218027c3c3c5fc84f)

# 5.0.2

> 2021-12-08

PR from @benmccann to add `type: "module"` in package.json to modernize and rename master branch to main.
  * [d4d110943e18c2bc3397d418ad56243ce4b0f8e6](https://github.com/mhkeller/layercake/commit/d4d110943e18c2bc3397d418ad56243ce4b0f8e6)

# 5.0.1

> 2021-11-24

A minor internal change where `calcExtents` is only called when there are active keys. This change preempts an error where a `zGet` function was optionally called in the Map component. Because `zGet` existed in the component, the library was running this bit of code. The `calcExtents` resulted in an error because the data was a geojson object, not an array. Adding this check will allow components that don't necessarily use getters to include references to those functions so they are more reusable.
  * [c614ae14a54065eb2e17a0c0d4644fa9484fd7d6](https://github.com/mhkeller/layercake/commit/c614ae14a54065eb2e17a0c0d4644fa9484fd7d6)

# 5.0.0

> 2021-06-20

Breaking change: The API to `calcExtents` now takes an object instead of an array of objects. See [this issue](https://github.com/mhkeller/layercake/issues/44) for more info. Many thanks to @jtrim-ons for taking the initiative on this!

This shouldn't change much since this is mostly an internal function. If you've used the example components for the Small Multiples or Timeplot graphics, [take a look here](https://github.com/mhkeller/layercake.graphics/pull/35/files) on how to update those components to conform with the new API.

The old API took an array of objects for the `fields` variable like this:

```js
[
  {
  { field: 'x', accessor: d.myX },
  { field: 'y', accessor: d.myY },
  { field: 'z', accessor: d.myZ },
  { field: 'r', accessor: d.myR }
]
```

Now it takes an object like this:

```js
{
  x: d.myX,
  y: d.myY,
  z: d.myZ,
  r: d.myR
}
```

The function returns the same object as before.

* [fc12cd57cda64f29cd00c688bd55a4348c66f32e](https://github.com/mhkeller/layercake/commit/fc12cd57cda64f29cd00c688bd55a4348c66f32e)

# 4.1.1

> 2020-06-29

Thanks to @jtrim-ons for [this PR](https://github.com/mhkeller/layercake/pull/47), the uniques calculation now uses a Set to test for uniqueness, which is much faster. [Issue #46](https://github.com/mhkeller/layercake/issues/46).

* [b7f77ad8d6f84201e6d0ee9a0712d0440b321d62](https://github.com/mhkeller/layercake/commit/b7f77ad8d6f84201e6d0ee9a0712d0440b321d62)

# 4.1.0

> 2021-03-17

Export the layout component elements and any canvas contexts as bindable variables and also as slot props. It also updates the `scaleCanvas` component to no longer need the deprecated `backingPixelStore` value.

* [ce4b5a4ade801d97e37e0626003ae7a457102cfc](https://github.com/mhkeller/layercake/commit/ce4b5a4ade801d97e37e0626003ae7a457102cfc)
* [8de7732247d5bfc6c29ec53c45c27dd344644b59](https://github.com/mhkeller/layercake/commit/8de7732247d5bfc6c29ec53c45c27dd344644b59)
* [97c6094fb47cb455790cb9f561a410f12c00d857](https://github.com/mhkeller/layercake/commit/97c6094fb47cb455790cb9f561a410f12c00d857)
* [9350d3f7d6541973af09e7fb19b390bfcadb633f](https://github.com/mhkeller/layercake/commit/9350d3f7d6541973af09e7fb19b390bfcadb633f)

# 4.0.4

> 2021-02-22

Also issue a warning if container dimensions are zero, not just negative.

* [e798e9cf0069d14a0f3d55403882b96f98baf2f1](https://github.com/mhkeller/layercake/commit/e798e9cf0069d14a0f3d55403882b96f98baf2f1)

# 4.0.3

> 2020-11-27

Fixes an issue where it would throw an error if you set a manual domain and `data` was an empty array.

* [1e3106d6bb050b05cba391e730190ca73ca598b3](https://github.com/mhkeller/layercake/commit/1e3106d6bb050b05cba391e730190ca73ca598b3)

# 4.0.2

> 2020-11-23

Add a warning if you're trying to use domain padding and you have a domain or range that isn't an array with two items.

* [1443c6d766dd900cbcaf4567846cbcdbb788f488](https://github.com/mhkeller/layercake/commit/1443c6d766dd900cbcaf4567846cbcdbb788f488)

# 4.0.1

> 2020-11-23

The `layouts` folder got renamed to `Layouts`. Fix that so imports don't get confused.

* [72a3782ede0e443a280a31a6a3ca9dccfac58cd6](https://github.com/mhkeller/layercake/commit/72a3782ede0e443a280a31a6a3ca9dccfac58cd6)
* [9cb501e55b5b19af663f295d443ca4c1d5aef155](https://github.com/mhkeller/layercake/commit/9cb501e55b5b19af663f295d443ca4c1d5aef155)

# 4.0.0

> 2020-11-22

This changes how scale padding works by a) correcting the calculation so that it's actually accurate (before it was off by a little bit for small amounts and a lot for large amounts) and b) adds support so you can use padding for non-linear scales (log, power, symlog etc.).

It's a breaking change but only if you're using `xPadding`, `yPadding` or `zPadding` and even then, it will likely only adjust by a few pixels. Closes [#17](https://github.com/mhkeller/layercake/issues/17).

* [89f317c09ac046e10ac354e521241e6a4f6245ed](https://github.com/mhkeller/layercake/commit/89f317c09ac046e10ac354e521241e6a4f6245ed)
* [796911d5de2e944ac5180299020457211f3e8958](https://github.com/mhkeller/layercake/commit/796911d5de2e944ac5180299020457211f3e8958)
* [65f2309bed594cc96fb94cc5500b4518c85a8264](https://github.com/mhkeller/layercake/commit/65f2309bed594cc96fb94cc5500b4518c85a8264)

# 3.1.1

> 2020-06-19

Remove `undefined` fields passed into `extents` prop.
  * [a43c463d16b1835d6f816fc5bda7770a0d0fd018](https://github.com/mhkeller/layercake/commit/a43c463d16b1835d6f816fc5bda7770a0d0fd018)

# 3.1.0

> 2020-06-17

Create the `extents` `<LayerCake>` prop that allows for manually setting extents. This also includes a patch to ignore `null` and `NaN` values when calculating extents in addition to `undefined`. This patch shouldn't be a breaking change since the chart would not have worked if you had those values in your data.
  * [8cb8f34ae448f6adbe78a1d4e0feb90b39f9fa18](https://github.com/mhkeller/layercake/commit/8cb8f34ae448f6adbe78a1d4e0feb90b39f9fa18)
  * [16d17c674f5337b11df5f54371d97c08b575bc71](https://github.com/mhkeller/layercake/commit/16d17c674f5337b11df5f54371d97c08b575bc71)

# 3.0.0

> 2020-06-15

A number of neat features including support for server-side rendering, the new `raise` helper for better SVG helpers, defaulting to `position: relative` for `layercake-container`, aspect ratios, viewbox options, allowing a cake to be `position: absolute;`, expose some variables as slot values, adds a defs slot to svg layout components, use the prop `config` instead of `originalSettings` and expose range arrays as props.
  * [cb35d277aef34a32d8f811c563b9c62f9366c86a](https://github.com/mhkeller/layercake/commit/cb35d277aef34a32d8f811c563b9c62f9366c86a)
  * [9f93db589eb10b73c4fe4044ef45a8b1e594db56](https://github.com/mhkeller/layercake/commit/9f93db589eb10b73c4fe4044ef45a8b1e594db56)
  * [fb454b8d328aa2407e0df057ad0e7d2b6a5bb5bc](https://github.com/mhkeller/layercake/commit/fb454b8d328aa2407e0df057ad0e7d2b6a5bb5bc)
  * [c46fae42ebc44a14d89e265ebe8d7dc8b18f0fa7](https://github.com/mhkeller/layercake/commit/c46fae42ebc44a14d89e265ebe8d7dc8b18f0fa7)
  * [fd9e3e1b7ddb28f57f39355f59c74d98d29a1999](https://github.com/mhkeller/layercake/commit/fd9e3e1b7ddb28f57f39355f59c74d98d29a1999)
  * [df01f6a420f459a70cedb3a65997b5f2589e0259](https://github.com/mhkeller/layercake/commit/df01f6a420f459a70cedb3a65997b5f2589e0259)
  * [44c546c15b751da2a674749ce7d3f9cc56cff3fa](https://github.com/mhkeller/layercake/commit/44c546c15b751da2a674749ce7d3f9cc56cff3fa)
  * [4396eb6dd3be33d58d3a343c04a319af69404956](https://github.com/mhkeller/layercake/commit/4396eb6dd3be33d58d3a343c04a319af69404956)
  * [0871e9b725a0994a1e880e804166a08f08dafc11](https://github.com/mhkeller/layercake/commit/0871e9b725a0994a1e880e804166a08f08dafc11)
  * [b37dbcd1d1e8016d330d733eeafc7de15e4202ee](https://github.com/mhkeller/layercake/commit/b37dbcd1d1e8016d330d733eeafc7de15e4202ee)
  * [dfe35d986e4062baf5a07610574d78bf6aaad287](https://github.com/mhkeller/layercake/commit/dfe35d986e4062baf5a07610574d78bf6aaad287)
  * [5d36bff218a3c0be11cdd8167d45495e3350fc1d](https://github.com/mhkeller/layercake/commit/5d36bff218a3c0be11cdd8167d45495e3350fc1d)
  * [ca001628c158216f71a6d62c1c2499e620575b4d](https://github.com/mhkeller/layercake/commit/ca001628c158216f71a6d62c1c2499e620575b4d)
  * [bd18a5a51996ce0123b368e54f86f39068ef60de](https://github.com/mhkeller/layercake/commit/bd18a5a51996ce0123b368e54f86f39068ef60de)
  * [7f586d8c82dd231f24979e6df504bac04cf49270](https://github.com/mhkeller/layercake/commit/7f586d8c82dd231f24979e6df504bac04cf49270)
  * [ae6de4a55635199fd972334364d6855258920e5d](https://github.com/mhkeller/layercake/commit/ae6de4a55635199fd972334364d6855258920e5d)
  * [5224ecb7cb32b8c4104b0be79f88bb51c1218edf](https://github.com/mhkeller/layercake/commit/5224ecb7cb32b8c4104b0be79f88bb51c1218edf)

#### Breaking changes

Rename WebGL component's `contextOptions` prop to `contextAttributes` to reflect the WebGL documentation.
  * [007c2747a2caed77f3046f1dd7cbae2e850b3992](https://github.com/mhkeller/layercake/commit/007c2747a2caed77f3046f1dd7cbae2e850b3992)

Access the `ctx` object off of the Canvas component as `const ctx = getContext('canvas')` instead of `const ctx = getContext('ctx')`, which was a little confusing.
  * [0b0198575a5758bfce9cbd37c22f3b8509c5d96f](https://github.com/mhkeller/layercake/commit/0b0198575a5758bfce9cbd37c22f3b8509c5d96f)

Rename `originalSettings` to `config`
  * [651ce7cbf2bbf4da380244fa2d8d5bcb707ad4fd](https://github.com/mhkeller/layercake/commit/651ce7cbf2bbf4da380244fa2d8d5bcb707ad4fd)


# 2.0.1

> 2020-01-26

Add back the 1.x dot files, including an `.npmignore`
  * [289852f861b35415c509469b181c43dab50e3411](https://github.com/mhkeller/layercake/commit/289852f861b35415c509469b181c43dab50e3411)
  * [483ed60ab49e7c5b3d1ac5b331801126f330334c](https://github.com/mhkeller/layercake/commit/483ed60ab49e7c5b3d1ac5b331801126f330334c)

# 2.0.0

> 2020-01-23

The Tres Leches edition. Complete rewrite to use Svelte 3! It's now a component based interface and is a lot more intuitive to compose graphics. The API options are pretty much the same. Some notable changes:

1. reverse range functions are now `xReverse` instead of `reverseX`
2. There's an added z-scale to give more options. Examples in the works.
3. Domain padding is fixed per https://github.com/mhkeller/layercake/issues/11

# 1.0.2

> 2020-01-23

Push to 1.x so that past versions are stable. Prepare for launch of version 2.x. Archive this branch at https://github.com/mhkeller/v1.layercake.

# 0.4.0

> 2019-03-26

Add custom ranges and some more tests

* Add custom ranges for x, y and r scales
  * [06e0ba69fefcad0862f4a2e1cfd1ce8284f30da6](https://github.com/mhkeller/layercake/commit/06e0ba69fefcad0862f4a2e1cfd1ce8284f30da6)
  * [0e7f5888fb78801a8a93a97e6ba424117db81a81](https://github.com/mhkeller/layercake/commit/0e7f5888fb78801a8a93a97e6ba424117db81a81)
  * [7bd8bb4527c4a72077db75ce9d4152a442b3128e](https://github.com/mhkeller/layercake/commit/7bd8bb4527c4a72077db75ce9d4152a442b3128e)
* Add test for calcExtent when the accessor returns an array
  * [b903113570d6447024a565c160a442dd54090ef4](https://github.com/mhkeller/layercake/commit/b903113570d6447024a565c160a442dd54090ef4)

# 0.3.2

> 2019-03-13

Update dependencies to fix minor lodash security problem

* Update lodash
  * [7e1109615a28f825be12eeb22dbf15d752b38263](https://github.com/mhkeller/layercake/commit/7e1109615a28f825be12eeb22dbf15d752b38263)


# 0.3.1

> 2018-12-23

Some small things

* Add `main` field to package.json. Closes [#6](https://github.com/mhkeller/layercake/issues/6).
  * [e3305a9b1b66c5e25fbbae4a73948d12d0757819](https://github.com/mhkeller/layercake/commit/e3305a9b1b66c5e25fbbae4a73948d12d0757819)
* Add warning if scale does not support `.nice()`
  * [158b4f6cb035ccc0288bb2b38aa7541a8ae869e0](https://github.com/mhkeller/layercake/commit/158b4f6cb035ccc0288bb2b38aa7541a8ae869e0)

# 0.3.0

> 2018-10-20

Change the default behavior of `uniques` since most frequently we'll want it to transform.

* Default to true, change tests
  * [bf8ead913f0a9c30657dff40ad34f3875987e484](https://github.com/mhkeller/layercake/commit/bf8ead913f0a9c30657dff40ad34f3875987e484)

# 0.2.0

> 2018-10-20

Add `uniques` as a helper export.

* Add `src/lib/uniques.js` and tests
  * [b4c768c067ab4680ee3267aa912a34ea0f0d64b4](https://github.com/mhkeller/layercake/commit/b4c768c067ab4680ee3267aa912a34ea0f0d64b4)
  * [11a38d046cd65d2524fe915f0387ca475ac0568d](https://github.com/mhkeller/layercake/commit/11a38d046cd65d2524fe915f0387ca475ac0568d)

# 0.1.2

> 2018-10-18

Let `calcExtents` measure extents of string values. Various small tweaks for publication.

* Add string value support to `calcExtents`
  * [9a50fd9ee959a64276ee7844449f22de76ef1167](https://github.com/mhkeller/layercake/commit/9a50fd9ee959a64276ee7844449f22de76ef1167)
* Fix readme logo
  * [9c5724d58ef87af80abf99e01901b40c6c63b0a7](https://github.com/mhkeller/layercake/commit/9c5724d58ef87af80abf99e01901b40c6c63b0a7)
* Install instructions for devDependencies
  * [bc52b44a9854c75bd6855fe81e42589512516142](https://github.com/mhkeller/layercake/commit/bc52b44a9854c75bd6855fe81e42589512516142)
* More `.npmignore` additions
  * [7095838f4fc45efb9ecb6c978c033690a10051dd](https://github.com/mhkeller/layercake/commit/7095838f4fc45efb9ecb6c978c033690a10051dd)
  * [40a3cfa5b92684804c6f379e278b679cca12213e](https://github.com/mhkeller/layercake/commit/40a3cfa5b92684804c6f379e278b679cca12213e)

# 0.1.1

> 2018-10-17

Add to `.npmignore`.

* Add `test` folder npm ignore
  * [b430f8fa9feeddeb263d10f386a17298e6ac7f18](https://github.com/mhkeller/layercake/commit/b430f8fa9feeddeb263d10f386a17298e6ac7f18)

# 0.1.0

> 2018-10-17

Initial release
