import { fileURLToPath } from 'node:url';

import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import dsv from '@rollup/plugin-dsv';

/** @param {string} relativePath */
const resolvePath = relativePath => fileURLToPath(new URL(relativePath, import.meta.url));

/**
 * Convert numerical values from a CSV file with `plugin-dsv`
 * @param {string} value
 * @returns {string|number}
 */
const processCsvValue = value => {
	// Examples:
	// '' => ''
	// 'foo' => 'foo'
	// '2018-07-22T22:25:55Z' => '2018-07-22T22:25:55Z'
	// '1.23' => 1.23
	// '42' => 42
	const number = Number(value);
	if (value !== '' && !isNaN(number)) {
		return number;
	} else {
		return value;
	}
};

/** @type {import('vite').UserConfig} */
const config = {
	// The site imports the library the way users do, from 'layercake'. Keep the
	// bare name first so `layercake/foo` doesn't match it.
	resolve: {
		alias: [
			{ find: /^layercake$/, replacement: resolvePath('./src/lib/index.js') },
			{ find: /^layercake\//, replacement: resolvePath('./src/lib/') }
		]
	},

	plugins: [
		sveltekit({
			adapter: adapter({ pages: 'docs' }),
			prerender: {
				handleHttpError: 'warn',
				// The Download button fetches these two on click, so the crawler never
				// sees a link to them
				entries: ['*', '/svelte-app.json', '/deps.json']
			}
		}),

		dsv({
			processRow: row => {
				Object.keys(row).forEach(key => {
					row[key] = processCsvValue(row[key]);
				});
			}
		})
	]
};

export default config;
