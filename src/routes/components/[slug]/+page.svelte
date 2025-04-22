<script>
	import { run } from 'svelte/legacy';

	import MarkdownIt from 'markdown-it';
	import hljs from 'highlight.js';

	import DownloadComponentBtn from '../../_site-components/DownloadComponentBtn.svelte';
	import hljsDefineSvelte from '../../../_modules/hljsDefineSvelte.js';
	// import cleanTitle from '../../_modules/cleanTitle.js';

	import components from '../../_components.js';

	const md = new MarkdownIt({ html: true, linkify: true });

	hljs.registerLanguage('svelte', hljsDefineSvelte);
	hljsDefineSvelte(hljs);

	/** @type {import('./$types').PageProps} */
	let { data } = $props();

	let active = $derived(data.slug);

	function markdownToHtml(text) {
		return md.render(text);
	}

	function highlight(str, s) {
		const parts = s.split('.');
		let ext = parts[parts.length - 1];
		if (ext === 'csv') ext = 'diff';
		return hljs.highlight(str, { language: ext }).value;
	}

	let pages = $derived([data.content.main].concat(data.content.modules));

	const lookup = new Map();
	components
		.flatMap(d => d.components)
		.forEach(d => {
			lookup.set(d.slug, d);
		});

	let component = $derived(lookup.get(data.slug));

	function printTypes(type) {
		if (type.includes('|')) {
			const escaped = type
				.split('|')
				.map(d => `\`${d}\``)
				.join(' &vert; ');
			return `(${escaped})`;
		} else return `\`${type}\``;
	}

	function printDefault(def) {
		if (!def) return 'None';
		return `\`${def}\``;
	}

	function printRequired(required) {
		const str = required ? 'yes' : 'no';
		return `<center>${str}</center>`;
	}

	const jsdocTableHeader = `|Param|Default|Required|Description|
|-----|-------|--------|-----------|`;

	let jsdocTableBody = '';
	let jsdocTable = $state('');

	if (data.content.hasjsDoctable === true) {
		jsdocTableBody = `${data.content.jsdocParsed
			.map(
				d =>
					`**${d.name}** ${printTypes(d.type)}|${printDefault(d.defaultValue)}|${printRequired(
						d.required
					)}|${d.description?.replace(/^(-|–|—)/g, '').trim()}`
			)
			.join('\n')}`;
		jsdocTable = data.content.jsdocParsed.length ? `${jsdocTableHeader}\n${jsdocTableBody}` : '';
	}

	function copyToClipboard() {
		const text = pages[0].contents;
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

<svelte:head>
	<title>{component.slug} component</title>
</svelte:head>

<div class="main">
	<div class="all-components">
		<a href="/components">← View all components</a>
	</div>
	<h1>{component.slug} component</h1>

	<div class="chart-hero">
		<component.component />
	</div>

	<div class="download">
		<DownloadComponentBtn data={data.content} slug={data.slug} />
	</div>

	<div class="dek">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html markdownToHtml(data.content.componentDescription)}
	</div>
	{#if data.content.hasjsDoctable === true}
		<div id="params-table">
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html markdownToHtml(jsdocTable)}
		</div>
	{/if}
	<div id="used-in">
		{#if data.content.usedIn[0].matches.length > 0 || data.content.usedIn[1].matches.length > 0}
			<h3>
				Used in these{data.content.usedIn[0].matches.length === 0 &&
				data.content.usedIn[1].matches.length > 0
					? ' SSR'
					: ''} examples:
			</h3>
			{#each data.content.usedIn as group}
				{#if group.matches.length > 0}
					{#if group.group === 'SSR' && data.content.usedIn[0].matches.length > 0}
						<h3>SSR Examples:</h3>
					{/if}
					<ul>
						{#each group.matches as link}
							<li><a href={link}>{link.split('/').pop()}</a></li>
						{/each}
					</ul>
				{/if}
			{/each}
		{/if}
	</div>

	<div id="pages" class={data.content.dek ? 'has-dek' : ''}>
		<ul id="page-nav">
			{#each pages as page}
				<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
				<li
					class="tab {active === page.slug ? 'active' : ''}"
					onclick={() => (active = page.slug)}
					onkeypress={() => (active = page.slug)}
				>
					{page.slug}
				</li>
			{/each}
		</ul>
		<div id="contents-container">
			<!-- svelte-ignore element_invalid_self_closing_tag -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div class="copy" onclick={copyToClipboard} onkeypress={copyToClipboard}></div>
			{#each pages as page}
				<div class="contents" style="display: {active === page.slug ? 'block' : 'none'};">
					<!-- eslint-disable-next-line svelte/no-at-html-tags -->
					<pre>{@html highlight(page.contents, page.slug)}</pre>
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

	.chart-hero :global(.chart-container) {
		height: 100% !important;
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

	#used-in a,
	.dek :global(p a) {
		color: #ff3e00;
		text-decoration: none;
	}

	#used-in a:hover,
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

	#page-nav :global(.tab.active) {
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

	h3 {
		font-weight: bold;
	}

	h1 {
		margin-top: 10px;
	}

	.all-components a {
		color: #ff3e00;
		text-decoration: none;
		text-transform: uppercase;
		font-size: 11px;
		position: absolute;
		top: 12px;
	}
	.all-components a:hover {
		text-decoration: underline;
	}

	#params-table,
	#used-in {
		width: 100%;
	}
	#params-table {
		margin-top: 25px;
		margin-bottom: 35px;
	}

	#used-in h3 {
		margin-bottom: 0;
	}

	#used-in ul {
		margin: 8px 0 21px 0;
	}

	#params-table :global(table) {
		border-collapse: collapse;
		width: 100%;
	}
	#params-table :global(thead tr) {
		background: #f6f8fa;
	}
	#params-table :global(th:first-child) {
		border-left-width: 1px;
	}
	#params-table :global(th:last-child) {
		border-right-width: 1px;
	}
	#params-table :global(th),
	#params-table :global(td) {
		text-align: left;
		padding: 8px;
	}
	#params-table :global(th) {
		border: 0px solid #ddd;
		border-top-width: 1px;
	}
	#params-table :global(td) {
		border: 1px solid #ddd;
	}

	#params-table :global(a) {
		color: #ff3e00;
		text-decoration: none;
	}
	#params-table :global(a:hover) {
		text-decoration: underline;
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
