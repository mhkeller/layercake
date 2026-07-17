<script>
	import { toAuto } from 'do-not-zip';
	import { uniques } from 'layercake';

	import downloadBlob from '../../_modules/downloadBlob.js';

	/**
	 * @typedef {Object} Props
	 * @property {any} [data]
	 * @property {any} slug
	 * @property {boolean} [ssr]
	 */

	/** @type {Props} */
	let { data = {}, slug, ssr = false } = $props();

	let downloading = $state(false);

	/** @param {string} [file] */
	function getImports(file = '') {
		const match = file.match(/from\s'(.+)'?/gm) || [];
		const imports = match
			.map(/** @param {string} d */ d => d.replace(/(from |'|"|;)/g, ''))
			.filter(/** @param {string} d */ d => !d.startsWith('.'));
		return imports;
	}

	const imports = [data.main, ...data.components, ...data.componentComponents]
		.reduce(
			(/** @type {string[]} */ store, /** @type {{ contents: string }} */ val) =>
				store.concat(getImports(val.contents)),
			/** @type {string[]} */ ([])
		)
		.reduce((/** @type {string[]} */ store, /** @type {string} */ val) => {
			if (!store.includes(val)) {
				store.push(val);
				return store;
			} else {
				return store;
			}
		}, /** @type {string[]} */ ([]));

	async function download() {
		downloading = true;

		// console.log('downloading');

		const cacheBust = new Date().getTime();
		const files = await (await window.fetch(`/svelte-app.json?${cacheBust}`)).json();
		/** @type {Record<string, string>} */
		const depsLookup = await (await window.fetch(`/deps.json?${cacheBust}`)).json();
		if (imports.length > 0) {
			const idx = files.findIndex(
				/** @param {{ path: string }} file */ ({ path }) => path === 'package.json'
			);
			const pkg = JSON.parse(files[idx].data);
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

		files.push(
			...data.components.map(
				/** @param {any} component */ component => ({
					path: `src/routes/${component.title.replace('./', '')}`,
					data: component.contents
				})
			)
		);
		files.push(
			...data.modules.map(
				/** @param {any} mod */ mod => ({
					path: `src/routes/${mod.title.replace('./', '')}`,
					data: mod.contents
				})
			)
		);
		files.push(
			...data.componentModules.map(
				/** @param {any} mod */ mod => ({
					path: `src/routes/${mod.title.replace('../', '')}`,
					data: mod.contents
				})
			)
		);
		files.push(
			...data.componentComponents.map(
				/** @param {any} mod */ mod => ({
					path: `src/routes/${mod.title}`,
					data: mod.contents
				})
			)
		);
		files.push(
			...data.csvs.map(
				/** @param {any} mod */ mod => ({
					path: `src/routes/${mod.title.replace('../', '')}`,
					data: mod.contents
				})
			)
		);
		files.push(
			...data.jsons.map(
				/** @param {any} mod */ mod => ({
					path: `src/routes/${mod.title.replace('../', '')}`,
					data: mod.contents
				})
			)
		);
		files.push({
			path: `src/routes/+page.svelte`,
			data: data.main.contents
		});
		// console.log('here', files);
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

	@keyframes zoom-in {
		0% {
			transform: scale(0);
			opacity: 0;
		}
		100% {
			transform: scale(1);
			opacity: 1;
		}
	}

	@keyframes fade-in {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 0.6;
		}
	}
</style>
