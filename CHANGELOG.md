Changelog
===

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
