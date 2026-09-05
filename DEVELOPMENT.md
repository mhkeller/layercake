# Layer Cake Development

## Project Structure

The main `LayerCake` library which you get when you

```js
import { LayerCake } from 'layercake';
```

is in `src/lib`.

The Layer Cake library doesn't include chart components, instead example components that live inside of the projects are presented on the Layer Cake website, where they can be downloaded or tried out in the Svelte Playground.

The example components are in `src/_components`.

Their basic structure and properties are demonstrated on their respective pages in `src/routes/_components` and `src/routes/_components_ssr`.

Further examples using combinations of the components are in `src/routes/_examples` and `src/routes/_examples_ssr`.

The actual loading of these pages happens in `src/routes/components`, `src/routes/example` and `src/routes/example-ssr` where the Markdown descriptions from `src/content` and code files are combined.

## Setup

The root Layer Cake project uses pnpm. Install the dependencies with

```sh
pnpm install
```

The embedded project in `src/scripts/svelte-app` remains an npm-based template and is not part of a pnpm workspace.

## Type checking

```sh
pnpm check
```

checks the whole project with `svelte-check`. The library in `src/lib` is clean. The chart components and examples still report errors, so this command isn't a pass/fail gate yet.

```sh
pnpm check:site
```

checks the website code only: the routes, the site components in `src/routes/_site-components`, the modules in `src/_modules` and the build scripts. It skips `src/lib`, the chart components and the examples, and it fails on any error, so it can run in CI.

## Testing

### Unit Tests

Unit tests using [Mocha](https://mochajs.org/) are in `test/lib` and can be run with

```sh
pnpm test:lib
```

### End-to-End Tests

To test more complex interactions of the website and rendering of documentation and the display of components [Playwright](https://playwright.dev/) is used.

```sh
pnpm test:playwright
```

There are YAML-based ARIA snapshots of component property tables as well as screenshots of rendered components on the various pages.

They can be updated with

```sh
pnpm test:init:snapshots
```

To have better matching between the CI environment and the saved screenshots they can be updated through a CI action (in `.github/workflows/update-snapshots.yml`), for example after a component's defaults have changed.

The actions can be triggered to run on a branch by going to <https://github.com/mhkeller/layercake/actions/workflows/update-snapshots.yml> (or in a fork) and selecting the respective branch in the `Run workflow` button.
