import isCSSColor from 'is-css-color';

import findScaleType from './findScaleType.js';

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
	const scaleType = findScaleType(scale);
	console.log(`\t${s}:`, `scale${scaleType.replace(/^\w/, d => d.toUpperCase())}`);
	const d = colorizeArray(scale.domain())
	if (d.color === true) {
		console.log(`\t\tDomain: %cArray%c(${scale.domain().length}) ` + d.vals[0], 'color: #1377e4', 'color: #737373', ...d.vals[1], ']');
	} else {
		console.log(`\t\tDomain:`, scale.domain());
	}
	const r = colorizeArray(scale.range())
	if (r.color === true) {
		console.log(`\t\tRange:    %cArray%c(${scale.range().length}) ` + r.vals[0] + '%c ]', 'color: #1377e4', 'color: #737373', 'color: #1478e4', ...r.vals[1], 'color: #1478e4');
	} else {
		console.log(`\t\tRange:`, scale.range());
	}
}

function colorizeArray(arr) {
	const colors = [];
	const a = arr.map(d => {
		if (isCSSColor(d)) {
			colors.push(d);
			return `%c ${d}`;
		}
		return d;
	});
	if (colors.length) {
		return {
			color: true,
			vals: [`%c[ ${a.join(', ')}`, colors.map(d => `background-color: ${d}`)]
		};
	}
	return a;
}
