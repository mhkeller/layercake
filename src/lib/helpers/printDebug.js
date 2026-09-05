import { rgb } from 'd3-color';

import findScaleName from './findScaleName.js';
import t from './toTitleCase.js';

const indent = '    ';

/** @typedef {{ r: number, g: number, b: number, o: number }} Rgb */

/**
 * Parse a value as a color.
 * @param {any} clr The value to try.
 * @returns {Rgb|false} The color's channels, or `false` if it isn't a color.
 */
function getRgb(clr) {
	const { r, g, b, opacity: o } = rgb(clr);
	if (![r, g, b].every(c => c >= 0 && c <= 255)) {
		return false;
	}
	return { r, g, b, o };
}

/**
 * Calculate human-perceived lightness from RGB
 * This doesn't take opacity into account
 * https://stackoverflow.com/a/596243
 * @param {Rgb} color The background color.
 * @returns {'black'|'white'} The text color to print on top of it.
 */
function contrast({ r, g, b }) {
	const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
	return luminance > 0.6 ? 'black' : 'white';
}

/**
 * Print out the values of an object
 * @param {Object.<string, any>} obj The debug info assembled in LayerCake.svelte.
 */
export default function printDebug(obj) {
	console.log('/********* LayerCake Debug ************/');
	console.log('Bounding box:');
	printObject(obj.boundingBox);
	console.log('Data:');
	console.log(indent, obj.data);
	if (obj.flatData) {
		console.log('flatData:');
		console.log(indent, obj.flatData);
	}
	console.log('Scales:');
	// Print every dimension with a scale, not just the ones with an
	// accessor – a dimension set up via `yScale`/`yDomain` alone has one too
	obj.activeDimensions.forEach((/** @type {string} */ g) => {
		printScale(g, obj[`${g}Scale`], obj[g]);
	});
	console.log('/************ End LayerCake Debug ***************/\n');
}

/**
 * @param {Object.<string, any>} obj
 */
function printObject(obj) {
	Object.entries(obj).forEach(([key, value]) => {
		console.log(`${indent}${key}:`, value);
	});
}

/**
 * @param {string} s The dimension name, e.g. `'x'`.
 * @param {any} scale The dimension's computed scale.
 * @param {Function|null|undefined} acc The dimension's accessor prop, unset when the dimension was configured by scale or domain alone.
 */
function printScale(s, scale, acc) {
	const scaleName = findScaleName(scale);
	console.log(`${indent}${s}:`);
	// An accessor-less dimension prints "none" instead of crashing on .toString()
	const accessorText = acc === null || acc === undefined ? 'none' : `"${acc.toString()}"`;
	console.log(`${indent}${indent}Accessor: ${accessorText}`);
	console.log(`${indent}${indent}Type: ${scaleName}`);
	printValues(scale, 'domain');
	printValues(scale, 'range', ' ');
}

/**
 * @param {any} scale
 * @param {'domain'|'range'} method Which list to print.
 * @param {string} [extraSpace] Padding to line the label up with the others.
 */
function printValues(scale, method, extraSpace = '') {
	const values = scale[method]();
	const colorValues = colorizeArray(values);
	if (colorValues) {
		printColorArray(colorValues, method, values);
	} else {
		console.log(`${indent}${indent}${t(method)}:${extraSpace}`, values);
	}
}

/**
 * @param {[string, Array<string>]} colorValues The format string and its CSS styles.
 * @param {string} method
 * @param {Array<any>} values
 */
function printColorArray(colorValues, method, values) {
	console.log(
		`${indent}${indent}${t(method)}:    %cArray%c(${values.length}) ` + colorValues[0] + '%c ]',
		'color: #1377e4',
		'color: #737373',
		'color: #1478e4',
		...colorValues[1],
		'color: #1478e4'
	);
}

/**
 * Build a `console.log` format string that prints any colors in the list as
 * swatches.
 * @param {Array<any>} arr
 * @returns {[string, Array<string>]|null} The format string and its CSS styles, or `null` if the list has no colors.
 */
function colorizeArray(arr) {
	/** @type {Array<Rgb>} */
	const colors = [];
	const a = arr.map((d, i) => {
		const rgbo = getRgb(d);
		if (rgbo !== false) {
			colors.push(rgbo);
			// Add a space to the last item
			const space = i === arr.length - 1 ? ' ' : '';
			return `%c ${d}${space}`;
		}
		return d;
	});
	if (colors.length) {
		return [
			`%c[ ${a.join(', ')}`,
			colors.map(
				d => `background-color: rgba(${d.r}, ${d.g}, ${d.b}, ${d.o}); color:${contrast(d)};`
			)
		];
	}
	return null;
}
