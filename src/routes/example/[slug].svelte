<script context="module">
	export async function preload({ params, query }) {
		// the `slug` parameter is available because
		// this file is called [slug].svelte
		const res = await this.fetch(`example/${params.slug}.json`);
		const data = await res.json();

		if (res.status === 200) {
			return { slug: params.slug, data, active: 'index' };
		} else {
			this.error(res.status, data.message);
		}
	}
</script>

<script>
	import marked from 'marked';
	import hljs from 'highlight.js';

	import DownloadBtn from '../../site-components/DownloadBtn.svelte';
	import hljsDefineSvelte from '../../modules/hljsDefineSvelte.js';
	import cleanTitle from '../../modules/cleanTitle.js';

	import examples from '../_examples.js';

	hljs.registerLanguage('svelte', hljsDefineSvelte);
	hljsDefineSvelte(hljs);

	export let slug;
	export let data;

	export let active = 'index';

	const renderer = new marked.Renderer();
	function markdownToHtml (text) {
		return marked(text, { renderer });
	}

	function highlight (str, title) {
		const parts = title.split('.');
		let ext = parts[parts.length - 1];
		if (ext === 'csv') ext = 'diff'
		return hljs.highlight(str, { language: ext }).value;
	}

	$: pages = [data.main]
		.concat(data.components)
		.concat(data.componentModules)
		.concat(data.modules)
		.concat(data.componentComponents)
		.concat(data.jsons)
		.concat(data.csvs);

	const exampleLookup = new Map();
	examples.forEach(exmpl => {
		exampleLookup.set(exmpl.slug, exmpl);
	});

	$: example = exampleLookup.get(slug);

	function copyToClipboard () {
		const text = pages.filter(d => cleanTitle(d.title) === active)[0].contents;
		if (window.clipboardData && window.clipboardData.setData) {
			return window.clipboardData.setData('Text', text);
		} else if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
			const textarea = document.createElement('textarea');
			textarea.textContent = text;
			textarea.style.position = 'fixed';
			document.body.appendChild(textarea);
			textarea.select();
			try {
				return document.execCommand('copy');
			} catch (ex) {
				console.warn('Copy to clipboard failed.', ex);
				return false;
			} finally {
				document.body.removeChild(textarea);
			}
		}
	}

</script>

<style>
	.main {
		position: relative;
		max-width: 54em;
		background-color: white;
		padding: 1.5em 2em 2em 2em;
		margin: 0 auto;
		box-sizing: border-box;
		overflow: hidden;
	}

	.chart-hero {
		width: 100%;
		height: 200px;
		margin: 1.5em 0 2em 0;
		position: relative;
	}

	.dek {
		width: calc(100% - 80px);
	}

	.dek :global(p a) {
		color: #ff3e00;
		text-decoration: none;
	}

	.dek :global(p a:hover) {
		text-decoration: underline;
	}

	#pages {
		margin-top: 50px;
	}

	#pages.has-dek {
		margin-top: 35px;
	}

	.dek {
		width: calc(100% - 80px);
	}

	.dek :global(p a) {
		color: #ff3e00;
		text-decoration: none;
	}

	.dek :global(p a:hover) {
		text-decoration: underline;
	}

	#contents-container {
		position: relative;
		border-left: 3px solid #ccc;
		margin-top: 7px;
	}

	pre {
		margin-top: 7px 0 0 0;
		padding-left: 14px;
		overflow-x: auto;
	}

	#page-nav {
		margin: 0;
		padding: 0;
	}

	.tab {
		display: inline-block;
		vertical-align: top;
		margin-right: 14px;
		margin-bottom: 8px;
		border-bottom: 2px solid transparent;
		color: #ccc;
	}

	.tab:hover {
		border-bottom: 2px solid #aaa;
		cursor: pointer;
	}

	:global(.tab.active) {
		color: #000;
		pointer-events: none;
		border-bottom: 2px solid #000;
	}


	.copy {
		position: absolute;
		top: 0;
		right: 0;
		width: 20px;
		height: 35px;
		opacity: 0.25;
		background-image: url(/copy.svg);
		background-repeat: no-repeat;
		background-size: contain;
		cursor: pointer;
	}

	.copy:hover {
		opacity: 1;
	}

	.copy:active {
		opacity: 0.7;
	}

	.copy:hover:before {
		display: block;
	}

	.edit-repl {
		text-decoration: none !important;
		/* font-size: 12px; */
		text-transform: lowercase;
		font-family: monospace;
		color: rgba(0,0,0,0.5);
		background-color: #f0f0f0;
		padding: 2px 5px;
		margin-left: 7px;
		font-size: 19px;
		vertical-align: top;
		position: relative;
		top: 4px;
	}

	.edit-repl:hover {
		text-decoration: underline;
		color: #ff3e00;
	}

	.copy:before {
		content: 'Copy to clipboard';
		position: absolute;
		top: -7px;
		right: 0;
		background-color: #000;
		border-radius: 2px;
		color: #fff;
		display: none;
		font-size: 13px;
		padding: 3px 5px;
		white-space: nowrap;
		transform: translate(0%, -100%);
	}

	@media (max-width: 750px) {
		.copy {
			transform: translate(0, -80%);
		}
	}
	@media (max-width: 475px) {
		#pages {
			margin-top: 21px;
		}
		.tab {
			margin-top: 8px;
			margin-bottom: 0;
		}
		.download {
			display: none;
		}
		.dek {
			width: 100%;
		}
	}
</style>

<svelte:head>
	<title>{example.title}</title>
	<link rel='stylesheet' href='hljs.css'>
</svelte:head>

<div class="main">
	<h1>{example.title}<a class="edit-repl" href="https://svelte.dev/repl/{example.replPath}" target="_blank" rel="nofollow">Edit</a></h1>

	<div class="chart-hero">
		<svelte:component this={example.component} />
	</div>

	<div class="download">
		<DownloadBtn
			{data}
			slug='{slug}'
		/>
	</div>

	{#if data.dek}
		<div class="dek">
			{@html markdownToHtml(data.dek)}
		</div>
	{/if}

	<div id="pages" class="{data.dek ? 'has-dek' : ''}">
		<ul id="page-nav">
			{#each pages as page}
				<li
					class="tab {active === cleanTitle(page.title) ? 'active' : ''}"
					on:click="{() => active = cleanTitle(page.title)}"
				>{page.title}</li>
			{/each}
		</ul>
		<div id="contents-container">
			<div
				class="copy"
				on:click={copyToClipboard}
			></div>
			{#each pages as page}
				<div class="contents" style="display: {active === cleanTitle(page.title) ? 'block' : 'none'};">
					<pre>{@html highlight(page.contents, page.title)}</pre>
				</div>
			{/each}
		</div>
	</div>

</div>
