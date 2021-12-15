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
		// vite: {
  	// 	optimizeDeps: {
  	// 	  include: [
		// 			'd3-scale',
		// 			'd3-array',
		// 			'd3-format',
		// 			'd3-interpolate',
		// 			'd3-time',
		// 			'd3-time-format'
		// 		]
		//   }
		// }
	}
};

export default config;
