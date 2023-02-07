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
	console.log(`\t\tDomain:`, scale.domain());
	console.log(`\t\tRange:`, scale.range());
}
