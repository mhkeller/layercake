/**
	Calculate the extents of desired fields
	For example, data like this:
	[{ x: 0, y: -10 }, { x: 10, y: 0 }, { x: 5, y: 10 }]
	and a fields object like this:
	`{'x': d => d.x, 'y': d => d.y}`
	returns an object like this:
	`{ x: [0, 10], y: [-10, 10] }`
	@param {Array} data A flat array of objects.
	@param {{x?: Function, y?: Function, z?: Function, r?: Function}} fields An object containing `x`, `y`, `r` or `z` keys that equal an accessor function.
	@returns {{x?: [min: Number, max: Number]|[min: String, max: String], y?: [min: Number, max: Number]|[min: String, max: String], z?: [min: Number, max: Number]|[min: String, max: String], r?: [min: Number, max: Number]|[min: String, max: String]}} An object with the same structure as `fields` but instead of an accessor, each key contains an array of a min and a max.
*/
export default function calcExtents (data, fields) {
	if (!Array.isArray(data)) {
		throw new TypeError('The first argument of calcExtents() must be an array. If you got this error using the <LayerCake> component, consider passing a flat array to the `flatData` prop. More info: https://layercake.graphics/guide/#flatdata');
	}

	if (
		Array.isArray(fields)
		|| fields === undefined
		|| fields === null
	) {
		throw new TypeError('The second argument of calcExtents() must be an '
		+ 'object with field names as keys as accessor functions as values.');
	}

	const extents = {};

	const keys = Object.keys(fields);
	const kl = keys.length;
	let i;
	let j;
	let k;
	let s;
	let min;
	let max;
	let acc;
	let val;

	const dl = data.length;
	for (i = 0; i < kl; i += 1) {
		s = keys[i];
		acc = fields[s];
		min = null;
		max = null;
		for (j = 0; j < dl; j += 1) {
			val = acc(data[j]);
			if (Array.isArray(val)) {
				const vl = val.length;
				for (k = 0; k < vl; k += 1) {
					if (val[k] !== undefined && val[k] !== null && Number.isNaN(val[k]) === false) {
						if (min === null || val[k] < min) {
							min = val[k];
						}
						if (max === null || val[k] > max) {
							max = val[k];
						}
					}
				}
			} else if (val !== undefined && val !== null && Number.isNaN(val) === false) {
				if (min === null || val < min) {
					min = val;
				}
				if (max === null || val > max) {
					max = val;
				}
			}
		}
		extents[s] = [min, max];
	}

	return extents;
}
