import { sveltekit } from '@sveltejs/kit/vite';
import dsv from '@rollup/plugin-dsv';
import path from 'path';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit(), dsv()],
	resolve: {
		alias: {
			layercake: [path.resolve('src/lib')]
		}
	}
};

export default config;
