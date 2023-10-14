/**
	Calculate the unique values of desired fields
	For example, data like this:
	[{ x: 0, y: -10 }, { x: 10, y: 0 }, { x: 5, y: 10 }]
	and a fields object like this:
	`{'x': d => d.x, 'y': d => d.y}`
	returns an object like this:
	`{ x: [0, 10, 5], y: [-10, 0, 10] }`
	@param {Array} data A flat array of objects.
	@param {{x?: Function, y?: Function, z?: Function, r?: Function}} fields An object containing `x`, `y`, `r` or `z` keys that equal an accessor function. If an accessor function returns an array of values, each value will also be evaluated..
	@returns {{x?: [min: Number, max: Number]|[min: String, max: String], y?: [min: Number, max: Number]|[min: String, max: String], z?: [min: Number, max: Number]|[min: String, max: String], r?: [min: Number, max: Number]|[min: String, max: String]}} An object with the same structure as `fields` but instead of an accessor, each key contains an array of unique items.
*/
import sorter from '../utils/sorter.js';
import getTime from '../utils/getTime.js';

export default function calcUniques (data, fields, { sort = false } = {}) {
	if (!Array.isArray(data)) {
		throw new TypeError(`The first argument of calcUniques() must be an array. You passed in a ${typeof data}. If you got this error using the <LayerCake> component, consider passing a flat array to the \`flatData\` prop. More info: https://layercake.graphics/guide/#flatdata`);
	}

	if (
		Array.isArray(fields)
		|| fields === undefined
		|| fields === null
	) {
		throw new TypeError('The second argument of calcUniques() must be an '
		+ 'object with field names as keys as accessor functions as values.');
	}

	const uniques = {};

	const keys = Object.keys(fields);
	const kl = keys.length;
	let i;
	let j;
	let k;
	let s;
	let acc;
	let val;
	let set;
	let results;

	const dl = data.length;
	for (i = 0; i < kl; i += 1) {
		set = new Set();
		results = [];
		s = keys[i];
		acc = fields[s];
		for (j = 0; j < dl; j += 1) {
			val = acc(data[j]);
			if (Array.isArray(val)) {
				const vl = val.length;
				for (k = 0; k < vl; k += 1) {
					/**
					 * If val[k] is a date, return its time. Otherwise, return val[k].
					 * Push val[k] to results, though, so that we aren't converting the users data.
					 */
					if (!set.has(getTime(val[k]))) {
						set.add(getTime(val[k]));
						results.push(val[k]);
					}
					set.add(val[k]);
				}
			} else {
				/**
				 * If val is a date, return its time. Otherwise, return val.
				 * Push val to results, though, so that we aren't converting the users data.
				 */
				if (!set.has(getTime(val)) ){
					set.add(getTime(val));
					results.push(val);
				}
				set.add(val);
			}
		}
		if (sort === true) {
			results.sort(sorter);
		}
		uniques[s] = results;
	}
	return uniques;
}
