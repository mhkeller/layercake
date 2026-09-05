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
			handleHttpError: 'warn'
		}
	}
};

export default config;
