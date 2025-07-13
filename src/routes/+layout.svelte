<script>
	import '../app.css';
	import '../hljs.css';

	import Nav from './_site-components/Nav.svelte';

	export let data;
</script>

<svelte:head>
	<meta name="robots" content="noindex, nofollow" />
	<meta name="googlebot" content="noindex, nofollow" />
</svelte:head>

<Nav sections={data.sections} />

<div class="archive-banner">
	<div class="archive-banner-content">
		<strong>📚 ARCHIVED DOCUMENTATION</strong>
		<p>
			This documentation is for pre-Svelte 5 runes and is no longer maintained. For the latest Layer
			Cake documentation, visit
			<a href="https://layercake.graphics" target="_blank" rel="noopener">layercake.graphics</a>
		</p>
	</div>
</div>

<main>
	<slot />
</main>

<style>
	.archive-banner {
		background: linear-gradient(135deg, #ff6b6b, #ee5a52);
		color: white;
		padding: 1rem 0;
		text-align: center;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		position: sticky;
		top: 0;
		z-index: 1000;
	}

	.archive-banner-content {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 1rem;
	}

	.archive-banner strong {
		display: block;
		font-size: 1.1rem;
		margin-bottom: 0.5rem;
	}

	.archive-banner p {
		margin: 0;
		font-size: 0.9rem;
	}

	.archive-banner a {
		color: white;
		text-decoration: underline;
		font-weight: bold;
	}

	.archive-banner a:hover {
		text-decoration: none;
	}
</style>
