import { normalizePath } from 'vite';
import path from 'path';
import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';


/** @type {import('@sveltejs/kit').Config} */
const config = {
	root: normalizePath(path.resolve('./')),

	preprocess: preprocess(),

	kit: {
		adapter: adapter({
			// default options are shown
			pages: 'docs',
			// fallback: null,
		}),

		alias: {
			"$lib": "./src/lib",
			"$lib/*":"./src/lib/*",
			"layercake": "./src/lib/index.js",
			"layercake/*": "./src/lib/*"
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
