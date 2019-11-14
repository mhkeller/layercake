<script>
import { setContext, onMount } from 'svelte';
import { createStore } from './layercake-store.js';
import { key } from './key.js';

let container;
let myStore;
let width;
let height;

onMount(() => {
	myStore = createStore(container);
	console.log('lol', myStore);
});

setContext(key, {
	getStore: () => createStore(container),
	getContainer: () => container
});
</script>

<style>
	:global(.layercake-container),
	:global(.layercake-container *) {
		box-sizing: border-box;
	}
	.layercake-container {
		width: 100%;
		height: 100%;
	}
</style>

<div
	bind:this={container}
	class="layercake-container"
>
	<slot></slot>
</div>
