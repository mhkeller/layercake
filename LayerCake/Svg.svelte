<script>
import { getContext, onMount } from 'svelte';
import { key } from './key.js';

let myStore;
let container;

let width;
let height;

onMount(() => {
	const context = getContext(key);

	console.log('context', context);
	// container = context.getContainer();
	// width = container.clientWidth;
	// height = container.clientHeight;
	console.log('container', container);
	myStore = context.getStore();
	console.log('my store', myStore);

	width = myStore.width;
	height = myStore.height;
});
</script>

<svg
>
	<slot></slot>
</svg>
