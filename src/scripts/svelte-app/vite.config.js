import { sveltekit } from '@sveltejs/kit/vite';
import dsv from '@rollup/plugin-dsv';

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
	plugins: [
		sveltekit(),
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
