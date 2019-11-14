import { readable, derived } from 'svelte/store';

export function createStore (ctn) {
	console.log('here');
	const container = readable(ctn, function start (set) {
		set(ctn);
		return function stop () { };
	});
	const width = derived(container, ($a, set) => {
		set($a.clientWidth);
		return function stop () { };
	}, 0);
	const height = derived(container, ($a, set) => {
		set($a.clientHeight);
		return function stop () { };
	}, 0);

	return { container, width, height };
}
