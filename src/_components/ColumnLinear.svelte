<script>
	import { getContext } from 'svelte';

	const { height, data, xGet, yGet } = getContext('LayerCake');

	export let fill = '#000;';
	export let stroke = '';
	export let strokeWidth = 0;

	$: x0 = d => $xGet(d)[0];

	$: columnWidth = d => {
		const vals = $xGet(d);
		return Math.max(0, vals[1] - vals[0]);
	};

	$: columnHeight = d => {
		return $height - $yGet(d);
	};
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
