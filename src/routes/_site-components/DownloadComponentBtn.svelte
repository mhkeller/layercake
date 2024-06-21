<script>
	import { toAuto } from 'do-not-zip';
	import { uniques } from 'layercake';

	import downloadBlob from '../../_modules/downloadBlob.js';

	export let data = {};
	export let slug;
	// export let ssr = false;

	let downloading = false;

	// function getImports (file = '') {
	// 	const match = file.match(/from\s'(.+)'?/gm) || [];
	// 	const imports = match.map(d => d.replace(/(from |'|"|;)/g, '')).filter(d => !d.startsWith('.'));
	// 	return imports;
	// }

	// const imports = [data.main]
	// 	.reduce((store, val) => store.concat(getImports(val.contents)), [])
	// 	.reduce((store, val) => {
	// 		if (!store.includes(val)) {
	// 			store.push(val);
	// 			return store;
	// 		} else {
	// 			return store;
	// 		}
	// 	}, []);

	// console.log('data', data);
	// console.log('imports', imports);

	async function download() {
		downloading = true;

		// const cacheBust = new Date().getTime();
		const files = [];
		// const files = await (await window.fetch(`/svelte-app.json?${cacheBust}`)).json();
		// const depsLookup = await (await window.fetch(`/deps.json?${cacheBust}`)).json();

		// if (imports.length > 0) {
		// 	const idx = files.findIndex(({ path }) => path === 'package.json');
		// 	const pkg = JSON.parse(files[idx].data);
		// 	const deps = {};
		// 	const devDeps = {};
		// 	imports.forEach(mod => {
		// 		if (mod === 'layercake') {
		// 			devDeps[mod] = depsLookup[mod];
		// 		} else if (mod === 'svelte') {
		// 			return;
		// 		} else {
		// 			deps[mod] = depsLookup[mod];
		// 		}
		// 		if (!depsLookup[mod]) {
		// 			window.alert(`Missing dependency, add "${mod}" to layercake.graphic's package.json`);
		// 		}
		// 	});
		// 	Object.assign(pkg.dependencies, deps);
		// 	Object.assign(pkg.devDependencies, devDeps);
		// 	files[idx].data = JSON.stringify(pkg, null, '  ');
		// }
		// files.push(...data.components.map(component => ({ path: `src/${component.title.replace('./', '')}`, data: component.contents })));
		files.push(
			...data.modules.map(mod => ({ path: mod.slug.replace('./', ''), data: mod.contents }))
		);
		// files.push(...data.componentModules.map(mod => ({ path: `src/${mod.title.replace('../', '')}`, data: mod.contents })));
		// files.push(...data.componentComponents.map(mod => ({ path: `src/${mod.title}`, data: mod.contents })));
		// files.push(...data.csvs.map(mod => ({ path: `src/${mod.title.replace('../', '')}`, data: mod.contents })));
		// files.push(...data.jsons.map(mod => ({ path: `src/${mod.title.replace('../', '')}`, data: mod.contents })));
		files.push({
			path: slug,
			data: data.main.contents
		});
		const filteredFiles = uniques(files.filter(Boolean), 'path', false);

		if (filteredFiles.length === 1) {
			downloadBlob(filteredFiles[0].data, `layercake-${slug}`, true);
		} else {
			const betterSlug = slug.split('.');
			downloadBlob(toAuto(filteredFiles), `layercake-${betterSlug[0]}.zip`);
		}
		downloading = false;
	}
</script>

<button
	disabled={downloading}
	on:click={download}
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
