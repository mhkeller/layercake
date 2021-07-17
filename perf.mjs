import calcExtentsOriginal from './src/lib/calcExtents-original.js';
import calcExtentsJtrim from './src/lib/calcExtents-jtrim.js';
import calcExtents from './src/lib/calcExtents.js';
import calcExtents1 from './src/lib/calcExtents-1.js';

const data = [];

for (let i = 0; i < 1000000; i += 1) {
	data.push({ x: i });
}

console.time('original');
calcExtentsOriginal(data, { x: d => d.x });
console.timeEnd('original');

console.time('jtrim');
calcExtentsJtrim(data, { x: d => d.x });
console.timeEnd('jtrim');

console.time('new');
calcExtents(data, { x: d => d.x });
console.timeEnd('new');

console.time('new-1');
calcExtents1(data, { x: d => d.x });
console.timeEnd('new-1');
