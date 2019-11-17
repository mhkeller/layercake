import { setContext, getContext } from 'svelte';
import { writable } from 'svelte/store';
import { key } from '../key.js';

export default function setContextEl (k, v) {
	const toAssign = {};
	toAssign[k] = v;
	// toAssign[k] = writable(v);
	setContext(key, Object.assign({}, getContext(key), toAssign));
}
