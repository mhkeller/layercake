Changelog
===

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
