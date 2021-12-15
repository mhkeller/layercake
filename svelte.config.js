import { normalizePath } from 'vite';
import path from 'path';
import adapter from '@sveltejs/adapter-auto';

const internalDirs = [
	'helpers',
	'settings',
	'utils'
]

/** @type {import('@sveltejs/kit').Config} */
const config = {
	root: normalizePath(path.resolve('./')),
	kit: {
		adapter: adapter(),

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		package: {
			exports: (filepath) => {
				return filepath.endsWith('index.js')
			}
		}
	}
};

export default config;
