import { normalizePath } from 'vite';
import path from 'path';
import adapter from '@sveltejs/adapter-auto';
import dsv from '@rollup/plugin-dsv';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	root: normalizePath(path.resolve('./')),
	kit: {
		// serviceWorker: {
		// 	register: false
		// },
		adapter: adapter(),

		// hydrate the <div id="svelte"> element in src/app.html
		target: 'body',
		package: {
			exports: (filepath) => {
				return filepath.endsWith('index.js')
			}
		},

		vite: {
			plugins: [
				dsv()
			],
			resolve: {
				alias: {
					'layercake': [path.resolve('src/lib')]
				}
			}
		}
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
