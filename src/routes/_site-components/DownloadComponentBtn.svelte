<script>
	import { toAuto } from 'do-not-zip';
	import { uniques } from 'layercake';

	import downloadBlob from '../../_modules/downloadBlob.js';

	/**
	 * @typedef {import('../../_modules/getComponentContent.js').ComponentFile} ComponentFile
	 * @typedef {import('../../_modules/getComponentContent.js').ComponentContent} ComponentContent
	 */

	/**
	 * @typedef {Object} Props
	 * @property {ComponentContent} [data]
	 * @property {string} slug
	 */

	/** @type {Props} */
	let { data = /** @type {ComponentContent} */ ({}), slug } = $props();

	let downloading = $state(false);

	async function download() {
		downloading = true;

		/** @type {{ path: string, data: string }[]} */
		const files = [];
		files.push(
			...data.modules.map(
				/** @param {ComponentFile} mod */ mod => ({
					path: mod.slug.replace('./', ''),
					data: mod.contents
				})
			)
		);
		files.push({
			path: slug,
			data: data.main.contents
		});
		const filteredFiles = uniques(files.filter(Boolean), 'path', false);

		if (filteredFiles?.length === 1) {
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
