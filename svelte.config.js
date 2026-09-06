import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: 'docs'
		}),

		// The site imports the library the way users do, from 'layercake'
		alias: {
			layercake: './src/lib/index.js',
			'layercake/*': './src/lib/*'
		},

		prerender: {
			handleHttpError: 'warn',
			// The Download button fetches these two on click, so the crawler never
			// sees a link to them
			entries: ['*', '/svelte-app.json', '/deps.json']
		}
	}
};

export default config;
