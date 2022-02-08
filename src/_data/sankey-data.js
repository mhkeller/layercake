export default {
	nodes: [
		{ id: 'A1' },
		{ id: 'A2' },
		{ id: 'A3' },
		{ id: 'B1' },
		{ id: 'B2' },
		{ id: 'B3' },
		{ id: 'B4' },
		{ id: 'C1' },
		{ id: 'C2' },
		{ id: 'C3' },
		{ id: 'D1' },
		{ id: 'D2' }
	],
	links: [
		{ source: 'A1', target: 'B1', value: 27 },
		{ source: 'A1', target: 'B2', value: 9 },
		{ source: 'A2', target: 'B2', value: 5 },
		{ source: 'A2', target: 'B3', value: 11 },
		{ source: 'A3', target: 'B2', value: 12 },
		{ source: 'A3', target: 'B4', value: 7 },
		{ source: 'B1', target: 'C1', value: 13 },
		{ source: 'B1', target: 'C2', value: 10 },
		{ source: 'B4', target: 'C2', value: 5 },
		{ source: 'B4', target: 'C3', value: 2 },
		{ source: 'B1', target: 'D1', value: 4 },
		{ source: 'C3', target: 'D1', value: 1 },
		{ source: 'C3', target: 'D2', value: 1 }
	]
};
