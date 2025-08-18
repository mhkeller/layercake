<script>
	import GuideContents from '../_site-components/GuideContents.svelte';

	/** @type {import('./$types').PageProps} */
	let { data } = $props();

	let container;
	let positions = [];
	let lastId = 'introduction';
	let activeGuideSection = $state();

	let anchors = [];
	$effect(() => {
		if (typeof window !== 'undefined') {
			anchors = container.querySelectorAll('[id]');
			lastId = window.location.hash.slice(1);
			activeGuideSection = lastId;

			onresize();
			onscroll();
		}
	});

	function onresize() {
		if (container) {
			const { top } = container.getBoundingClientRect();
			positions = [].map.call(
				anchors,
				/** @param {HTMLAnchorElement} anchor */ anchor => {
					return anchor.getBoundingClientRect().top - top;
				}
			);
		}
	}

	function onscroll() {
		const top = -window.scrollY;

		let i = anchors.length;
		while (i--) {
			if (positions[i] + top < 100) {
				const anchor = anchors[i];
				const { id } = anchor;

				if (id !== lastId) {
					activeGuideSection = id;
					// this.fire('scroll', id);
					lastId = id;
				}
				return;
			}
		}
	}
</script>

<svelte:window {onscroll} {onresize} />

<svelte:head>
	<title>LayerCake - Guide</title>
	<meta name="og:title" content="Layer Cake — Guide" />
	<meta name="twitter:title" content="Layer Cake — Guide" />
</svelte:head>

<sidebar>
	<GuideContents sections={data.sections} bind:activeGuideSection />
</sidebar>

<div id="container" class="content" bind:this={container}>
	<section id="toc">
		<h3>Table of contents</h3>
		<ul>
			{#each data.sections as section}
				<li>
					<a href="#{section.slug}"
						>- {section.slug.replace(/^\w/, d => d.toUpperCase()).replaceAll('-', ' ')}</a
					>
				</li>
			{/each}
		</ul>
	</section>
	{#each data.sections as section}
		<section id={section.slug}>
			<h2>
				{section.metadata.title}
				<small
					><a
						href="https://github.com/mhkeller/layercake/edit/master/src/content/guide/{section.file}"
						target="_blank"
						rel="noreferrer">edit this section</a
					></small
				>
			</h2>
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html section.html}
		</section>
	{/each}
</div>

<style>
	sidebar {
		position: fixed;
		background-color: #fff;
		top: 61px;
		left: 0;
		display: none;
		height: calc(100% - (2.7em + 67px));
		width: 11.75em;
		padding: 1.18em 1em 2em 1.5em;
		overflow-y: auto;
		/*box-sizing: border-box;*/
	}

	#container {
		width: 100%;
		tab-size: 2;
		margin-top: -7rem;
		padding: 7em 2em 2em 2em;
		box-sizing: border-box;
	}

	h2 {
		padding: 4rem 0 0 0;
		margin: -3rem 0 1.05rem 0;
		font-size: 2.3em;
		font-weight: bold;
		pointer-events: none;
	}

	small {
		font-size: 14px;
		opacity: 0.5;
		float: right;
		line-height: 4.4;
		pointer-events: all;
	}

	section :global(small a) {
		color: #333;
	}

	section :global(pre) :global(h2) {
		/*margin: 0 0 1em 0;*/
		padding: 0.2em 0;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		font-size: 1.2em;
		color: rgba(0, 0, 0, 0.5);
	}

	section :global(.code-block) {
		position: relative;
	}

	section :global(.filename) {
		background: #f9f9f9;
		font-size: 16px;
		padding: 6px 12px 4px 12px;
		display: inline-block;
		position: relative;
		top: 2px;
		border-left: 2px solid #eee;
		border-right: 2px solid #eee;
		border-radius: 2px 2px 0 0;
		border-top: 1px solid #eee;
		font-family: 'Inconsolata', monospace;
	}

	section :global(h3) {
		font-size: 1.2em;
		font-weight: 800;
		margin: -4em 0 1em 0;
		padding-top: 6em;
		position: relative;
	}

	section :global(h3 > a) {
		width: 25px;
		height: 25px;
		background-image: url(/icons/link.svg);
		background-repeat: no-repeat;
		position: absolute;
		transform: translate(0px, -3px);
		box-sizing: border-box;
		padding-left: 30px;
		background-position: center center;
		display: none;
	}

	section :global(h3:hover > a) {
		display: inline-block;
	}

	section :global(h3 > code) {
		font-weight: normal;
	}

	section :global(h3 .function) {
		font-weight: normal;
	}

	section :global(h3 .call) {
		font-weight: normal;
	}

	section :global(p) {
		margin: 0 0 1em 0;
		font-family:
			Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
		/* font-weight: 300; */
		color: #181818;
		line-height: 1.5;
		position: relative;
		z-index: 11;
	}

	section :global(li) {
		font-weight: 300;
	}

	section :global(a) {
		text-decoration: none;
		color: #ff3e00;
		/*border-bottom: 1px solid #e3d9d9;*/
	}

	section :global(a:hover) {
		text-decoration: underline;
		/*border-bottom: 1px solid #e3d9d9;*/
	}

	section :global(strong) {
		font-weight: 700;
	}

	section :global(code) {
		background-color: #f9f9f9;
		padding: 0.2em 0.4em;
		border-radius: 3px;
	}

	section :global(a code) {
		color: #ff3e00;
	}

	section :global(pre) :global(code) {
		padding: 0;
	}
	section :global(pre) {
		overflow-x: auto;
	}

	section:first-child :global(h3) {
		border: none;
	}

	section {
		border-bottom: 1px solid #eee;
		max-width: 64em;
		margin: 0 auto 2em auto;
		padding: 0 0 2em 0;
	}

	section:last-child {
		border: none;
	}

	section :global(.code-block) :global(pre),
	section :global(.CodeMirror) {
		background-color: #f9f9f9;
		border-top: 2px solid #eee;
		border-left: 2px solid #eee;
		padding: 8px;
		margin: 0 0 1em 0;
	}

	section :global(.code-block) :global(pre) {
		padding: 12px 8px 12px 12px;
		/* border-radius: 3px; */
	}

	section :global(p),
	section :global(ul) {
		max-width: 48em;
	}

	section :global(ul),
	section :global(ol) {
		line-height: 1.5;
	}

	section :global(li) {
		margin: 0;
	}

	section :global(blockquote) {
		position: relative;
		color: #999;
		margin: 1em 0;
		padding: 0.5em 0 0.5em 2.5em;
		max-width: 48em;
		border-top: 1px solid #eee;
		border-bottom: 1px solid #eee;
	}

	section :global(blockquote) :global(p) {
		color: #666;
	}

	section :global(blockquote) :global(p:last-child) {
		margin: 0;
	}

	section :global(blockquote::before) {
		content: '🍰';
		position: absolute;
		left: 5px;
		top: 7px;
		/*color: rgba(170,0,0, 0.7);*/
		font-size: 1.5em;
		font-weight: 800;
		width: 1em;
		height: 1em;
		text-align: center;
		line-height: 1;
		/*padding: 0.15em 0.1em 0.1em 0.1em;*/
		border-radius: 50%;
		/*border: 2px solid rgba(170,30,30,0.7);*/
	}

	section :global(table) {
		margin: 0 0 2em 0;
		width: 100%;
	}

	section :global(td),
	section :global(th) {
		text-align: left;
		border-bottom: 1px solid #eee;
		padding: 0.2em 0.5em 0.2em 0;
		line-height: 1.8;
	}

	section :global(table) :global(code),
	section :global(table) :global(span) {
		white-space: pre;
	}

	section :global(p img) {
		width: 100%;
	}

	@media (min-width: 768px) {
		sidebar {
			display: block;
		}

		#container {
			padding-left: 15em;
			padding-right: 8em;
		}

		h2 {
			padding: 4rem 0 0 0;
			margin: -3rem 0 0 0;
		}

		section :global(h3) {
			padding-top: 3.5em;
			margin: -2em 0 1em 0;
		}
	}

	#container :global(section p:nth-child(2)) {
		margin-top: 21px;
	}

	#toc h3 {
		margin-top: 14px;
		font-weight: bold;
	}
	#toc ul {
		list-style: none;
		margin: 0;
		padding: 0 0 0 28px;
		margin-bottom: 21px;
	}
	#toc li a {
		text-decoration: none;
	}
	#toc li a:hover {
		text-decoration: underline;
	}
</style>
