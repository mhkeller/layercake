<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import GuideContents from './GuideContents.svelte';
	import examples from '../_examples.js';
	import examplesSsr from '../_examples_ssr.js';

	export let sections;

	let slug = '';
	let path;
	let type;

	// I was getting a weird artifact of a service-worker.js
	// being requested. it's fixed now but keep this for
	// good measure
	$: isServiceWorker = $page.url.pathname === '/service-worker.js';

	let segment = '';

	$: if (!isServiceWorker) {
		path = $page.url.pathname;
		type = path.split('/')[1];
		segment = `/${path.replace('/', '')}`;
		// segment = `/${path.replace('/', '').replace(/\$/, '')}`;
		slug = path.replace(/\/$/, '').split('/').pop();
	}

	let basePath = '/';
	let open = false;

	let nav;

	const slimName = d => d.split(' (')[0];

	function loadPage () {
		open = false;
		goto(this.value || '/');
	}

	function toggleOpen () {
		// if the menu is closing, scroll back to the top *after* it
		// shuts. otherwise, scroll back to the top immediately
		// (just in case the user reopened before it happened).
		// The reason we don't just do it when the menu opens is
		// that the scrollbar visibly flashes
		if (open) {
			setTimeout(() => {
				if (!open) {
					nav.scrollTop = 0;
				}
			}, 350);
		} else {
			nav.scrollTop = 0;
		}
		open = !open;
	}

</script>


<div class='{open ? "open" : "closed"} mousecatcher'
	on:click="{() => open = false}"
	on:keypress="{() => open = false}"
></div>
<div class='container'>
	<span class="menu-link {open ? 'menu-open' : 'menu-closed'}" on:click='{toggleOpen}' on:keypress='{toggleOpen}'>{open ? 'Close' : 'Menu'}</span>
	<a href='/' class='logo'>Layer Cake</a>
</div>

<ul class="dropdown">
	<li>
		<!-- svelte-ignore a11y-no-onchange -->
		<select on:change={loadPage} bind:value="{segment}">
			{#if segment.startsWith('/components')}
				<option value="{segment}" disabled>Select...</option>
			{/if}
			{#if segment.startsWith('/guide')}
				<option value="{segment}" disabled>Select...</option>
			{/if}
			<option value="/">All</option>
			<option class="header" disabled></option>
			<option class="header" disabled>Client-side</option>
			{#each examples.slice().sort((a, b) => a.title < b.title ? -1 : 1) as example}
				<option value="/example/{example.slug}">{slimName(example.title)}</option>
			{/each}
			<option class="header" disabled></option>
			<option class="header" disabled>Server-side</option>
			{#each examplesSsr.slice().sort((a, b) => a.title < b.title ? -1 : 1) as example}
				<option value="/example-ssr/{example.slug}" >{slimName(example.title)}</option>
			{/each}
		</select>
	</li>
</ul>

<nav bind:this={nav} class='{open ? "open" : "closed"}'>
	<ul class='primary'>
		<li><a class='{segment === "/components" ? "active" : ""}' href='/components' on:click='{() => open = false}'><span class="wide-name">Component gallery</span><span class="short-name">Components</span></a></li>
		<li><a class='{segment === "/guide" ? "active" : ""}' href='/guide' on:click='{() => open = false}'>Guide</a></li>
		<li><a id="github-link" target="_blank" rel="noreferrer" href='https://github.com/mhkeller/layercake'> </a></li>
	</ul>

	<div class='secondary'>
		<GuideContents {sections} bind:open={open} />
	</div>
</nav>

<style>
	.mousecatcher {
		position: fixed;
		left: 0;
		top: 0;
		width: 100vw;
		height: 100vh;
		background-color: black;
		pointer-events: none;
		opacity: 0;
		/*transition: opacity 0.4s;*/
		z-index: 3;
	}

	.mousecatcher.open {
		pointer-events: all;
		opacity: 0.3;
	}

	@keyframes fadein {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	.container {
		position: fixed;
		width: 100%;
		height: 2.5em;
		background-color: #fff;
		color: #000;
		border-bottom: 1px solid rgb(170,30,30, 0.1);
		font-family: "SignPainter", Helvetica, sans-serif ;
		z-index: 12;
	}

	.dropdown {
		position: fixed;
		top: 21px;
		transform: translate(0, -50%);
		font-family: SignPainter, Helvetica, sans-serif;
		font-size: 25px;
		z-index: 13;
		line-height: 1;
		right: 1rem;
		left: auto;
	}

	.dropdown li {
		padding: 0;
		margin: 0;
		display: inline-block;
		vertical-align: top;
	}

	.dropdown li:before {
		color: #000;
		content: 'View...';
		margin-right: 0.25em;
	}

	nav {
		position: fixed;
		width: 14em;
		height: calc(100vh - 2.5em);
		top: 2.5em;
		font-family: "SignPainter", Helvetica, sans-serif ;
		background-color: white;
		transform: translate(-100%,0);
		transition: transform 0.2s cubic-bezier(.17,.67,.24,.99);
		border-right: 1px solid #eee;
		z-index: 12;
		padding: 1em;
		user-select: none;
	}

	.open {
		transform: translate(0, 0);
		transition: transform 0.3s cubic-bezier(.17,.67,.24,.99);
		overflow-y: auto;
	}

	.menu-link {
		display: inline;
		position: absolute;
		top: 50%;
		left: 1rem;
		transform: translate(0, -50%);
		font-size: 25px;
		line-height: 1;
		color: #000;
		cursor: pointer;
		/*font-weight: 500;*/
		-webkit-tap-highlight-color: transparent;
		-webkit-touch-callout: none;
	}
	.menu-link.menu-open {
		color: #999;
	}
	.menu-link:hover {
		text-decoration: underline;
	}

	.logo {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -45%);
		-webkit-tap-highlight-color: transparent;
		-webkit-touch-callout: none;
		line-height: 1;
		text-decoration: none;
		font-weight: bold;
		color: #000;
		font-size: 25px;
	}

	ul {
		display: block;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.primary {
		margin: 0 0 0.5em 0;
	}

	.primary li {
		position: relative;
		display: block;
	}

	/**/

	.primary li a {
		display: block;
		font-size: 25px;
		/*font-weight: 500;*/
		padding: 0 0 0.75em 0;
		text-decoration: none;
		line-height: 1;
	}

	.primary a:hover,
	.logo:hover {
		text-decoration: underline;
	}

	.secondary {
		font-family: Helvetica, sans-serif;
		padding-bottom: 2em;
		margin-top: 28px;
	}

	.short-name {
		display: none;
	}

	.secondary :global(.guide-toc > li) {
		margin-bottom: 1.5em !important;
	}

	#github-link {
		width: 22px;
		height: 2px;
		background: url(/github-logo.svg);
		background-repeat: no-repeat;
		position: relative;
		top: 4px;
	}

	#github-link:hover:after {
		content: ' ';
		position: absolute;
		width: 20px;
		bottom: -3px;
		border-top: 1px solid #000;
	}

	@media (max-width: 800px) {
		.dropdown select {
			max-width: 60px;
		}
		.wide-name {
			display: none;
		}
		.short-name {
			display: block;
		}
	}
	.dropdown select {
		position: relative;
		top: -2px;
	}
	@media (max-width: 400px) {
		.dropdown select {
			position: relative;
			top: -3px;
		}
	}
	@media (max-width: 500px) {
		.dropdown li:before {
			content: '';
		}
	}
	@media (min-width: 1100px) {
		.dropdown {
			left: calc((100vw - 800px) / 2) !important;
			transform: translate(0, 0) !important;
		}
	}

	@media (max-width: 645px) {
		a#github-link {
			width: 100% !important;
		}
	}
	@media (min-width: 645px) {
		.mousecatcher,
		.menu-link {
			display: none;
		}

		.dropdown {
			top: 1rem;
			left: 40%;
			transform: translate(-50%, 0);
			right: auto;
		}

		.dropdown li:before {
			content: 'View example...';
			margin-right: 0.25em;
		}

		.container {
			height: 3.5em;
		}

		nav {
			width: 100%;
			height: 3.5em;
			padding: 0 1.5em 0 0;
			transform: none;
			transition: none;
			height: 0;
		}

		.primary {
			position: fixed;
			top: 1rem;
			right: 1.5rem;
			margin: 0;
		}

		.primary li {
			display: inline-block;
			position: relative;
			padding: 0 1em;
		}

		.primary li:last-child::after {
			content: '';
		}
		.primary li::after {
			position: absolute;
			top: -2px;
			right: -3px;
			content: '|';
			font-size: 25px;
		}

		.primary li:last-child::after {
			content: '';
		}

		.primary li a.active {
			color: #ff3e00;
			pointer-events: none;
		}

		.secondary {
			display: none;
		}

		.logo {
			position: absolute;
			top: 1rem;
			left: 1.5rem;
			text-decoration: none;
			/*font-size: 1.5em;*/
			/*font-weight: 700;*/
			transform: none;
		}

		option.header {
			font-weight: bold;
		}
	}
</style>
