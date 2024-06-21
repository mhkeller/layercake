<script>
	import { afterUpdate } from 'svelte';
	import { groupBy, sortBy } from 'underscore';

	import svelteComponents from '../_components.js';

	function getClasses(name) {
		const parts = name.split('.').filter(d => d !== 'svelte');
		parts.shift();
		if (parts.length === 0) return ['svg'];
		return parts;
	}

	const componentGroups = svelteComponents.map(d => {
		return {
			name: `${d.name.replace(/^\w/, w => w.toUpperCase())} components`,
			components: sortBy(d.components, 'slug').map(({ name, slug, component }) => {
				const classes = getClasses(slug);
				return {
					name,
					slug,
					component,
					classes,
					group: classes.filter(d => d !== 'percent-range')[0]
				};
			})
		};
	});

	function formatName(name) {
		return name.split('.')[0];
	}

	function formatSubgroup(subgroup) {
		if (subgroup == 'webgl') return 'WebGL';
		if (subgroup == 'canvas') return 'Canvas';
		return subgroup.toUpperCase();
	}

	function slugify(name) {
		return name.toLowerCase().split(' ')[0];
	}

	let container;
	let positions = [];
	let lastId = 'axis';
	let activeSection = 'axis';

	let anchors = [];
	afterUpdate(() => {
		if (typeof window !== 'undefined') {
			anchors = container.querySelectorAll('[id]');
			lastId = window.location.hash.slice(1);
			activeSection = lastId || 'axis';

			onresize();
			onscroll();

			window.addEventListener('scroll', onscroll, true);
			window.addEventListener('resize', onresize, true);

			// wait for fonts to load...
			const timeouts = [setTimeout(onresize, 1000), setTimeout(onresize, 5000)];
		}
	});

	function onresize() {
		if (container) {
			const { top } = container.getBoundingClientRect();
			positions = [].map.call(anchors, anchor => {
				return anchor.getBoundingClientRect().top - top;
			});
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
					activeSection = id;
					// this.fire('scroll', id);
					lastId = id;
				}
				return;
			}
		}
	}
</script>

<svelte:head>
	<title>LayerCake - Component gallery</title>
	<meta name="og:title" content="Layer Cake — Component gallery" />
	<meta name="twitter:title" content="Layer Cake — Component gallery" />
</svelte:head>

<sidebar>
	<ul>
		{#each componentGroups as componentGroup}
			<li>
				<!-- {console.log(activeSection, slugify(componentGroup.name))} -->
				<a
					class="section {activeSection === slugify(componentGroup.name) ? 'active' : ''}"
					href="/components#{slugify(componentGroup.name)}">{componentGroup.name}</a
				>
			</li>
		{/each}
	</ul>
</sidebar>

<div id="container" bind:this={container}>
	<h2>Components</h2>

	<div id="dek">
		<p>
			Because Layer Cake doesn't come with any pre-built components, here are a few options to get
			you started. These are meant to serve as starting points for many common chart types. They
			have a few built-in options to be flexible for handling different scenarios so they can be
			reused as much as possible. For example, the <a
				href="/components/Scatter.svg.svelte"
				target="_blank">Scatter</a
			>
			components support both linear and ordinal scales so you can use them in configurations like a
			regular <a href="/example/Scatter" target="_blank">Scatter plot</a> but also charts like the
			<a href="/example/Timeplot" target="_blank">Time of Day</a> plot where the y-scale is made up of
			groups.
		</p>

		<p>
			Some componens have HTML, SVG and Canvas versions and those marked as <span
				class="label percent-range">%-range</span
			>
			are optimized to be used server-side with the
			<a href="/guide#percentrange"><code>percentRange={true}</code></a> prop.
		</p>
	</div>

	{#each componentGroups as componentGroup}
		<h3 id={slugify(componentGroup.name)}>{componentGroup.name}</h3>
		<div class="component-blocks">
			{#each Object.entries(groupBy(componentGroup.components, d => d.group)) as [subgroup, items]}
				<h4>{formatSubgroup(subgroup)}</h4>
				<div class="subgroup-blocks">
					{#each items as item}
						<div class="component-block">
							<div class="component-name">
								<span
									><a href="/components/{item.slug}">{item.name || formatName(item.slug)}</a></span
								>
								{@html item.classes
									.map(d => `<span class="label ${d}">${d.replace('percent-', '%-')}</span>`)
									.join('')}
							</div>
							<div class="block-container">
								{#if item.component}
									<svelte:component this={item.component} />
								{:else}
									{item.slug}
								{/if}
							</div>
						</div>
					{/each}
				</div>
			{/each}
		</div>
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
		padding: 7em 0 2em 2em;
		box-sizing: border-box;
	}

	#dek a code,
	#dek a {
		color: #ff3e00;
		text-decoration: none;
	}
	#dek a:hover {
		text-decoration: underline;
	}

	#dek {
		width: 80%;
	}

	sidebar ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	a.section {
		text-decoration: none;
		display: block;
		color: #727272;
		font-size: 1em;
		margin: 0;
		padding-top: 0.075em;
		padding-bottom: 0.4em;
		line-height: 1.25em;
	}

	.section.active {
		color: #ff3e00;
	}

	a.section.active:hover {
		cursor: default;
		text-decoration: none;
	}

	.section:hover {
		text-decoration: underline;
	}

	.block-container {
		display: flex;
		flex-direction: column;
	}

	h2 {
		padding: 4rem 0 0 0;
		margin: -3rem 0 1.05rem 0;
		font-size: 2.3em;
		font-weight: bold;
		pointer-events: none;
	}

	h3 {
		font-weight: bold;
		padding-top: 3.5em;
	}

	/* h3#axis {
		padding-top: 4.5em;
		top: -1em;
	} */

	h4 {
		display: block;
		padding: 7px 0;
		margin-top: 16px;
	}

	.subgroup-blocks {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 20px;
	}
	.component-block {
		flex-basis: 41%;
		height: 225px;
		background-color: #fff;
		box-shadow: 0 0 12px #ccc;
		border: 1px solid #ccc;
		padding: 14px;
		display: inline-block;
		vertical-align: top;
		border-radius: 5px;
	}

	/* .component-block:nth-child(3),
	.component-block:nth-child(6),
	.component-block:nth-child(9),
	.component-block:nth-child(12),
	.component-block:nth-child(15),
	.component-block:nth-child(18),
	.component-block:nth-child(21) {
		margin-right: 0;
	} */

	@media (max-width: 1150px) {
		#dek {
			width: 95%;
		}
		/* .component-block {
			width: 43%;
		} */
		/* .component-block:nth-child(3),
		.component-block:nth-child(6),
		.component-block:nth-child(9),
		.component-block:nth-child(12),
		.component-block:nth-child(15),
		.component-block:nth-child(18),
		.component-block:nth-child(21) {
			margin-right: 21px;
		}
		.component-block:nth-child(even) {
			margin-right: 0 !important;
		} */
	}

	/* @media (max-width: 860px) {
		.component-block {
			width: 40%;
		}
	} */

	@media (max-width: 800px) {
		.component-block {
			flex-basis: 85%;
		}
		#container {
			padding-right: 1em;
		}
	}

	.component-block a:hover {
		color: underline;
		color: #ff3e00;
	}

	.component-name {
		white-space: nowrap;
	}

	span.label,
	.component-blocks :global(.label) {
		padding: 0 4px;
		display: inline-block;
		border-radius: 2px;
		font-size: 0.9em;
		margin-left: 3px;
	}

	.component-blocks :global(.label.svg) {
		background-color: #f0c;
		color: #fff;
	}

	.component-blocks :global(.label.html) {
		background-color: #fc0;
		color: #000;
	}

	.component-blocks :global(.label.webgl) {
		background-color: #0cf;
		color: #fff;
	}

	span.label.percent-range,
	.component-blocks :global(.label.percent-range) {
		background-color: #c0f;
		color: #fff;
	}

	.component-blocks :global(.label.canvas) {
		background-color: #cf0;
		color: #000;
	}

	.block-container {
		position: relative;
		width: 100%;
		height: calc(100% - 24px);
	}

	@media (min-width: 768px) {
		sidebar {
			display: block;
		}

		#container {
			padding-left: 15em;
			/* padding-right: 8em; */
		}
	}
</style>
