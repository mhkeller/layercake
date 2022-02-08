// import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import dsv from '@rollup/plugin-dsv';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		// base: dev ? '' : '/your-repo-name', // If building for GitHub pages
		adapter: adapter({
			// default options are shown
			pages: 'build',
			assets: 'build',
			fallback: null,
			precompress: false
		}),

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',

		vite: {
			plugins: [
				dsv()
			]
		}
	}
};

export default config;
