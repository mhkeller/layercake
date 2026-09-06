<script>
	import { toAuto } from 'do-not-zip';
	import { uniques } from 'layercake';

	import downloadBlob from '../../_modules/downloadBlob.js';

	/**
	 * @typedef {import('../../_modules/getExampleContent.js').CodeFile} CodeFile
	 * @typedef {import('../../_modules/getExampleContent.js').ExampleContent} ExampleContent
	 * @typedef {import('../../_modules/getTemplateFiles.js').TemplateFile} TemplateFile
	 */

	/**
	 * @typedef {Object} Props
	 * @property {ExampleContent} [data]
	 * @property {string} slug
	 * @property {boolean} [ssr]
	 */

	/** @type {Props} */
	let { data = /** @type {ExampleContent} */ ({}), slug, ssr = false } = $props();

	let downloading = $state(false);

	/** @param {string} [file] */
	function getImports(file = '') {
		const match = file.match(/from\s'(.+)'?/gm) || [];
		const imports = match
			.map(/** @param {string} d */ d => d.replace(/(from |'|"|;)/g, ''))
			.filter(/** @param {string} d */ d => !d.startsWith('.'));
		return imports;
	}

	// The npm packages the example imports, each listed once. Derived from
	// `data` so it follows the example when the page is reused for another one
	// on client-side navigation.
	let imports = $derived([
		...new Set(
			[data.main, ...data.components, ...data.componentComponents].flatMap(
				/** @param {CodeFile} file */ file => getImports(file.contents)
			)
		)
	]);

	async function download() {
		downloading = true;

		const cacheBust = new Date().getTime();
		/** @type {TemplateFile[]} */
		const templateFiles = await (await window.fetch(`/svelte-app.json?${cacheBust}`)).json();
		/** @type {Record<string, string>} */
		const depsLookup = await (await window.fetch(`/deps.json?${cacheBust}`)).json();

		// Start the zip from the template. Binary files such as the favicon arrive
		// base64-encoded and go into the zip as bytes.
		/** @type {{ path: string, data: string | number[] }[]} */
		const files = templateFiles.map(file => ({
			path: file.path,
			data:
				file.encoding === 'base64'
					? Array.from(atob(file.data), char => char.charCodeAt(0))
					: file.data
		}));

		if (imports.length > 0) {
			const idx = files.findIndex(({ path }) => path === 'package.json');
			const pkg = JSON.parse(/** @type {string} */ (files[idx].data));
			/** @type {Record<string, string>} */
			const deps = {};
			/** @type {Record<string, string>} */
			const devDeps = {};
			imports.forEach(
				/** @param {string} mod */ mod => {
					if (mod === 'svelte') {
						return;
					} else {
						deps[mod] = depsLookup[mod];
					}
					if (!depsLookup[mod]) {
						window.alert(`Missing dependency, add "${mod}" to this repo's package.json`);
					}
				}
			);
			Object.assign(pkg.dependencies, deps);
			Object.assign(pkg.devDependencies, devDeps);
			files[idx].data = JSON.stringify(pkg, null, '  ');
		}

		// The example's files go under src/routes, at the paths its imports use
		for (const group of [
			data.components,
			data.componentComponents,
			data.modules,
			data.componentModules,
			data.csvs,
			data.jsons
		]) {
			files.push(
				...group.map(
					/** @param {CodeFile} file */ file => ({
						path: `src/routes/${file.title.replace(/^(\.\.?\/)+/, '')}`,
						data: file.contents
					})
				)
			);
		}
		files.push({
			path: `src/routes/+page.svelte`,
			data: data.main.contents
		});
		const filteredFiles = uniques(files.filter(Boolean), 'path', false);
		downloadBlob(toAuto(filteredFiles), `layercake-${ssr ? 'ssr-' : ''}${slug}.zip`);
		downloading = false;
	}
</script>

<button
	disabled={downloading}
	onclick={download}
	title="download zip file"
	class="icon"
	style="background-image: url(/icons/download.svg)">Download &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button
>

<style>
	button {
		font-weight: 200;
		font-family: Helvetica, sans-serif;
		outline: 0;
		padding: 0;
		border: none;
		float: right;
		cursor: pointer;
		transform: translateY(-6px);
		width: 215px;
		text-align: right;
	}
	.icon {
		color: transparent;
		font-size: 16px;
		height: 2em;
		background: transparent no-repeat 100% 0px;
		background-size: 1.6em 1.6em;
		opacity: 0.6;
	}

	.icon:before {
		content: 'Download';
		color: #000;
		display: inline-block;
		transform: translate(100%, 0);
	}

	.icon:hover {
		opacity: 1;
	}

	.icon:disabled {
		filter: grayscale(1);
		opacity: 0.4;
		cursor: default;
	}

	.icon:disabled:before {
		content: 'Please wait...';
		transform: translate(75%, 0);
	}
</style>
