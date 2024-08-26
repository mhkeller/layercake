import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
	js.configs.recommended,
	...svelte.configs['flat/recommended'],
	prettier,
	...svelte.configs['flat/prettier'],
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		}
	},
	// Keep in some unused variables for examples and components to show defaults
	{
		files: ['**/_examples/*.svelte', '**/_components/*.svelte'],
		rules: {
			'no-unused-vars': 'off'
		}
	},

	{
		ignores: [
			'build/',
			'.svelte-kit/',
			'dist/',
			'.DS_Store',
			'node_modules',
			'/build',
			'**/docs/**',
			'/.svelte-kit',
			'/package',
			'.env',
			'.env.*',
			'!.env.example',
			'pnpm-lock.yaml',
			'package-lock.json',
			'yarn.lock',
			'static/',
			'**/marked.js'
		]
	}
];
