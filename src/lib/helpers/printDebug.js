import findScaleName from './findScaleName.js';
import isCSSColor from 'is-css-color';
import Color from 'color';

/* --------------------------------------------
 *
 * Print out the values of an object
 * --------------------------------------------
 */
export default function printDebug(obj) {
	console.log('/********* LayerCake Debug ************/');
	console.log('Bounding box:');
	printObject(obj.boundingBox)
	console.log('Scales:\n');
	Object.keys(obj.activeGetters).forEach(g => {
		printScale(g, obj[g]);
	});
	console.log('/************ End Debug ***************/\n');
}

function printObject(obj) {
	Object.entries(obj).forEach(([key, value]) => {
		console.log(`\t${key}:`, value);
	})
}

function printScale(s, scale) {
	const scaleName = findScaleName(scale);
	console.log(`\t${s}:`, scaleName);
	printValues(scale, 'domain');
	printValues(scale, 'range');
}

function printValues(scale, method) {
	const values = scale[method]();
	const colorValues = colorizeArray(values);
	if (colorValues) {
		printColorArray(colorValues, method, values);
	} else {
		console.log(`\t\t${t(method)}:`, values);
	}
}

function printColorArray(colorValues, method, values) {
	console.log(
		`\t\t${t(method)}:    %cArray%c(${values.length}) ` + colorValues[0] + '%c ]',
		'color: #1377e4',
		'color: #737373',
		'color: #1478e4',
		...colorValues[1],
		'color: #1478e4'
	);
}

/**
 * To Titlecase
 */
function t(str) {
	return str.replace(/^\w/, d => d.toUpperCase())
}

function colorizeArray(arr) {
	const colors = [];
	const a = arr.map((d, i) => {
		if (isCSSColor(d)) {
			colors.push(d);
			// Add a space to the last item
			const space = i === arr.length - 1 ? ' ' : '';
			return `%c ${d}${space}`;
		}
		return d;
	});
	if (colors.length) {
		// TODO, set contrast color
		return [
			`%c[ ${a.join(', ')}`,
			colors.map(
				d => `background-color: ${d}; color:${contrast(d)};`
			)
		];
	}
	return null;
}

function contrast(color) {
	return Color(color).isLight() ? '#000' : '#fff';
}
