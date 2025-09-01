import { sveltekit } from '@sveltejs/kit/vite';
import dsv from '@rollup/plugin-dsv';
import path from 'path';
import processCsvValue from './src/lib/utils/processCsvValue.js'

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		sveltekit(),
		dsv({
			processRow: (row) => {
			  Object.keys(row).forEach((key) => {
				row[key] = processCsvValue(row[key])
			  });
			}
		  })
	],
	resolve: {
		alias: {
			layercake: [path.resolve('src/lib')]
		}
	}
};

export default config;
