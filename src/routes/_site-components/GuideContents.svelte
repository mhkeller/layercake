<script>
	// import { afterUpdate } from 'svelte';
	export let open = false;
	export let activeGuideSection = undefined;
	export let sections = [];

	const guideSections = sections.map(section => {
		return {
			metadata: section.metadata,
			subsections: section.subsections,
			slug: section.slug
		};
	});

	function close() {
		open = false;
	}
</script>

<ul class="guide-toc">
	{#each guideSections as section}
		<li>
			<a
				class="section {section.slug === activeGuideSection ? 'active' : ''}"
				href="/guide#{section.slug}"
				on:click={close}>{section.metadata.title}</a
			>
			{#each section.subsections as subsection}
				<a
					class="subsection {subsection.slug === activeGuideSection ? 'active' : ''}"
					href="/guide#{subsection.slug}"
					on:click={close}>{subsection.title}</a
				>
			{/each}
		</li>
	{/each}
</ul>

<style>
	.guide-toc {
		margin: 0;
		padding: 0;
	}

	.guide-toc a {
		text-decoration: none;
	}

	.guide-toc a:hover {
		text-decoration: underline;
	}

	.guide-toc li {
		display: block;
		margin: 0 0 1.5em 0;
	}

	.section {
		display: block;
		font-weight: 700;
		color: #333;
		font-size: 1.2rem;
		margin: 0 0 0.25em 0;
		line-height: 1.25em;
	}

	.subsection {
		display: block;
		/*font-weight: 500;*/
		color: #727272;
		font-size: 1em;
		margin: 0;
		padding-top: 0.075em;
		padding-bottom: 0.4em;
		line-height: 1.25em;
	}

	.section.active,
	.subsection.active {
		color: #ff3e00;
	}
</style>
