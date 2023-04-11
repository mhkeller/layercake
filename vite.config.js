import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';
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
	},
	test: {
		globals: true,
		environment: 'jsdom',
	}
};

export default config;
