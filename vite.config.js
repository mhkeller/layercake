import { sveltekit } from '@sveltejs/kit/vite';
import dsv from '@rollup/plugin-dsv';
import path from 'path';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		sveltekit(),
		dsv({
			processRow: row => {
				Object.keys(row).forEach(key => {
					var value = row[key];
					if (value !== '' && !isNaN(value)) {
						row[key] = Number(value);
					} else {
						row[key] = value;
					}
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
