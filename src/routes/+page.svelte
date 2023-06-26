<script>
	import hljs from 'highlight.js';
	import examples from './_examples.js';
	import examplesSsr from './_examples_ssr.js';
	import hljsDefineSvelte from '../_modules/hljsDefineSvelte.js';

	hljs.registerLanguage('svelte', hljsDefineSvelte);

	hljsDefineSvelte(hljs);

	const codeExample = `<scr${''}ipt>
	// The library provides a main wrapper component
	// and a bunch empty layout components...
	import { LayerCake, Svg, Html, Canvas } from 'layercake';

	// ...that you fill with your own chart components,
	// that live inside your project and which you
	// can copy and paste from here as starting points.
	im${''}port AxisX f${''}rom './components/AxisX.svelte';
  im${''}port AxisY f${''}rom './components/AxisY.svelte';
  im${''}port Line f${''}rom './components/Line.svelte';
  im${''}port Scatter f${''}rom './components/Scatter.svelte';
  im${''}port Labels f${''}rom './components/Labels.svelte';

	const data = [{ x: 0, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 3 }];
<\/scr${''}ipt>

<sty${''}le>
	.chart-container {
		width: 100%;
		height: 500px;
	}
</sty${''}le>

<div class="chart-container">
	<LayerCake
		x='x'
		y='y'
		{data}
	>
		<Svg>
			<AxisX/>
			<AxisY/>
			<Line color='#f0c'/>
		</Svg>

		<Canvas>
			<Scatter color='#0fc'/>
		</Canvas>

		<Html>
			<Labels/>
		</Html>
	</LayerCake>
</div>`.trim().replace(/\t/g, '  ');

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

	h1 {
		font-family: "SignPainter";
		font-size: 61px;
	}

	#logo, h1 {
		display: inline-block;
		vertical-align: bottom;
	}
	.logo-container {
		white-space: nowrap;
	}
	#logo {
		width: 80px;
		height: 80px;
		margin-right: 17px;
		background: url('/layercake-logo-128.png');
		background-size: contain;
		background-repeat: no-repeat;
	}
	h1 {
		margin-bottom: 7px;
	}
	.gallery-item {
		display: inline-block;
		vertical-align: top;
		width: 45%;
		position: relative;
		height: 140px;
		margin-bottom: 60px;
	}

	.gallery-item :global(.chart-container) {
		height: 100% !important;
	}

	.gallery-item.scaled {
		height: auto;
	}

	@media (max-width: 650px) {
		.gallery-item {
			width: 100%;
		}
	}
	@media (max-width: 350px) {
		#logo {
			width: 70px;
			margin-right: 7px;
		}
		h1 {
			font-size: 59px;
		}
	}

	.gallery-item:nth-child(odd) {
		margin-right: 5%;
	}
	#dek {
		width: 100%;
		max-width: 800px;
	}
	p a {
		color: #ff3e00;
	}
	p a:hover {
		text-decoration: underline;
	}
	a {
		text-decoration: none;
	}
	.title {
		margin-bottom: 9px;
		white-space: nowrap;
	}
	.title a{
		text-decoration: underline;
		max-width: 415px;
	}
	.title a:hover {
		color: #ff3e00;
	}
	.strong {
		font-weight: bold;
	}
	.edit-repl {
		text-decoration: none !important;
		font-size: 12px;
		text-transform: lowercase;
		font-family: monospace;
		color: rgba(0,0,0,0.5);
		background-color: #f0f0f0;
		padding: 2px 5px;
		margin-left: 4px;
		position: relative;
		top: -1px;
	}
	.edit-repl:hover {
		text-decoration: underline;
	}
	@media (max-width: 895px) {
		:global(#svelte) {
			overflow: hidden;
		}
		.main {
			padding: 1em;
		}
	}

	.code-example {
		border-left: 3px solid #ccc;
		margin-bottom: 35px;
	}

	pre {
		padding-left: 14px;
		overflow-x: auto;
	}
	#server-side {
		padding-top: 65px;
	}
	#server-side h2 {
		font-weight: bold;
	}
</style>

<svelte:head>
	<title>Layer Cake</title>
	<meta name="og:title" content="Layer Cake">
	<meta name="twitter:title" content="Layer Cake">
</svelte:head>

<div class="main">
	<div class="logo-container">
		<div id="logo"></div>
		<h1>Layer Cake</h1>
	</div>

	<div id="dek">
		<p>Layer Cake is a graphics framework for <a href="https://svelte.dev" target="_blank" rel="noreferrer">Svelte</a>. It uses the measurements of your target div and your data extents to create scales that <span class="strong">stay synced</span> on layout changes. Use these scales to organize multiple, <span class="strong">mostly-reusable Svelte components</span>, whether they be SVG, HTML, Canvas or WebGL. Since they all share the same coordinate space, you can build your graphic one layer at a time. It can also be used to easily create <span class="strong">responsive graphics server-side</span> that <a href="#server-side">work without JavaScript</a>.</p>

		<p>Unlike other libraries, <a href="/components">chart components</a> live <span class="strong">inside your project</span>, so you have complete control for <span class="strong">customization</span>. It also includes some handy <a href="/guide#helper-functions">helper functions</a> to help format your data into the right shape.</p>

		<p>Read the <a href="guide">guide</a>, try the <a href="https://github.com/mhkeller/layercake-template" target="_blank" rel="noreferrer">starter template</a> or check out the <a href="components">example components</a>. See the examples below and even edit them live. Here's a sample of what the code looks like:</p>
	</div>

	<div class="code-example">
		<pre>{@html hljs.highlight(codeExample, { language: 'svelte' }).value}</pre>
	</div>

	<div id="gallery">
		{#each examples as example}
			<div class="gallery-item">
				<h4 class="title"><a href="/example/{example.slug}">{example.title}</a> <a class="edit-repl" href="https://svelte.dev/repl/{example.replPath}" target="_blank" rel="noreferrer">Edit</a></h4>
				<svelte:component this="{example.component}"/>
			</div>
		{/each}
	</div>

	<div class="section-hed" id="server-side">
		<h2>Server-side rendering</h2>
		<p>Svelte makes it easy to render your project server side and Layer Cake has built-in helpers to make it even easier for charts. All of these examples below (except for their canvas components) will load and be responsive without client-side JavaScript. The advantage is that you can see the chart as soon as the page loads, avoiding blank placeholder spaces. HTML charts use percentage-based scales and SVG charts take advanage of certain <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/viewBox" target="_blank" rel="noreferrer">viewBox</a> and CSS settings that Rich Harris, Svelte's creator, outlined in <a href="https://dev.to/richharris/a-new-technique-for-making-responsive-javascript-free-charts-gmp" target="_blank" rel="noreferrer">this blog post</a>.</p>
		<p>For shapes that are difficult to render using percentages, such as swoopy arrows, Layer Cake makes it easy to superimpose client-side components that will hydrate once JavaScript is available. See the annotated column example below.</p>
	</div>

	<div id="ssr-gallery">
		{#each examplesSsr as example}
			<div class="gallery-item" class:scaled={example.title.toLowerCase().includes('map')}>
				<h4 class="title"><a href="/example-ssr/{example.slug}">{example.title}</a> <a class="edit-repl" href="https://svelte.dev/repl/{example.replPath}" target="_blank" rel="noreferrer">Edit</a></h4>
				<svelte:component this="{example.component}"/>
			</div>
		{/each}
	</div>
</div>
