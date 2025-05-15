<script>
	import { getContext } from 'svelte';

	const { height, data, xGet, yGet } = getContext('LayerCake');

	/**
	 * @typedef {Object} Props
	 * @property {string} [fill]
	 * @property {string} [stroke]
	 * @property {number} [strokeWidth]
	 */

	/** @type {Props} */
	let { fill = '#000;', stroke = '', strokeWidth = 0 } = $props();

	let x0 = $derived(d => $xGet(d)[0]);

	let columnWidth = $derived(d => {
		const vals = $xGet(d);
		return Math.max(0, vals[1] - vals[0]);
	});

	let columnHeight = $derived(d => {
		return $height - $yGet(d);
	});
</script>

{#each $data as d, i}
	<rect
		class="group-rect"
		data-id={i}
		x={x0(d)}
		y={$yGet(d)}
		width={columnWidth(d)}
		height={columnHeight(d)}
		{fill}
		{stroke}
		stroke-width={strokeWidth}
	/>
{/each}
