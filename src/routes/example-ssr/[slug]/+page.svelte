<script>
	import MarkdownIt from 'markdown-it';
	import hljs from 'highlight.js';

	import CopyBtn from '../../_site-components/CopyBtn.svelte';
	import DownloadBtn from '../../_site-components/DownloadBtn.svelte';
	import hljsDefineSvelte from '../../../_modules/hljsDefineSvelte.js';
	import cleanTitle from '../../../_modules/cleanTitle.js';
	import constructReplLink from '../../../_modules/constructReplLink.js';

	hljs.registerLanguage('svelte', hljsDefineSvelte);
	hljsDefineSvelte(hljs);

	import examples from '../../_examples_ssr.js';

	const md = new MarkdownIt({
		html: true,
		linkify: true
	});

	/** @type {import('./$types').PageProps} */
	let { data } = $props();

	let active = $derived(data.active);

	function markdownToHtml(text) {
		return md.render(text);
	}

	function highlight(str, title) {
		const parts = title.split('.');
		let ext = parts[parts.length - 1];
		if (ext === 'csv') ext = 'diff';
		return hljs.highlight(str, { language: ext }).value;
	}

	let pages = $derived(
		[data.content.main]
			.concat(data.content.components)
			.concat(data.content.componentModules)
			.concat(data.content.modules)
			.concat(data.content.componentComponents)
			.concat(data.content.jsons)
			.concat(data.content.csvs)
	);

	const exampleLookup = new Map();
	examples.forEach(exmpl => {
		exampleLookup.set(exmpl.slug.toLowerCase(), exmpl);
	});

	let example = $derived(exampleLookup.get(data.slug.toLowerCase()));
</script>

<svelte:head>
	<title>{example.title}</title>
</svelte:head>

<div class="main" data-label="Server-side">
	<h1>
		{example.title}{#await constructReplLink(example?.title, data.content) then replLink}
			<a class="edit-repl" href={replLink} target="_blank" rel="noreferrer">Edit</a>
		{/await}
	</h1>

	<div class="chart-hero" data-slug={data.slug.toLowerCase()}>
		<example.component />
	</div>

	<div class="download">
		<DownloadBtn data={data.content} slug={data.slug} ssr />
	</div>

	{#if data.content.dek}
		<div class="dek">
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html markdownToHtml(data.content.dek)}
		</div>
	{/if}

	<div id="pages" class={data.content.dek ? 'has-dek' : ''}>
		<ul id="page-nav">
			{#each pages as page}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
				<li
					class="tab {active === cleanTitle(page.title) ? 'active' : ''}"
					onclick={() => (active = cleanTitle(page.title))}
				>
					{page.title}
				</li>
			{/each}
		</ul>
		<div id="contents-container">
			<CopyBtn getText={() => pages.filter(d => cleanTitle(d.title) === active)[0].contents} />
			{#each pages as page}
				<div
					class="contents"
					style="display: {active === cleanTitle(page.title) ? 'block' : 'none'};"
				>
					<!-- eslint-disable-next-line svelte/no-at-html-tags -->
					<pre>{@html highlight(page.contents, page.title)}</pre>
				</div>
			{/each}
		</div>
	</div>
</div>

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

	.main:before {
		content: attr(data-label);
		position: absolute;
		top: 5px;
		text-transform: uppercase;
		font-size: 12px;
	}

	.chart-hero {
		width: 100%;
		height: 200px;
		margin: 1.5em auto 2em auto;
		position: relative;
	}

	.chart-hero[data-slug^='map'] {
		max-width: 526px;
	}

	.chart-hero :global(.chart-container) {
		height: 100% !important;
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

	.dek :global(pre code) {
		display: block;
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

	.edit-repl {
		text-decoration: none !important;
		/* font-size: 12px; */
		text-transform: lowercase;
		font-family: monospace;
		color: rgba(0, 0, 0, 0.5);
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
