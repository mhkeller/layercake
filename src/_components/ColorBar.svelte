<script lang="ts">
	import * as d3sc from 'd3-scale-chromatic';

	export let text: string | null = null;
	export let colorScale: ((x: number) => string) | string | null = null;
	export let textSide: 'left' | 'right' | 'top' | 'bottom' = `left`;
	export let style: string | null = null;
	export let textStyle: string | null = null;
	export let wrapperStyle: string | null = null;
	export let tickLabels: (string | number)[] | number = 0;
	export let range: [number, number] = [];
	export let tickSide: 'top' | 'bottom' | 'center' = `bottom`;
	// TODO vertical not fully implemented yet
	export let orientation: 'horizontal' | 'vertical' = `horizontal`;
	export let precision: number = 1;

	$: if (tickLabels?.length == 0 || typeof tickLabels == `number` || range?.length > 0) {
		const n_ticks = Array.isArray(tickLabels) ? 5 : tickLabels;
		tickLabels = [...Array(n_ticks).keys()].map((idx) => {
			const x = idx / (n_ticks - 1);
			return range[0] + x * (range[1] - range[0]);
		});
	}

	$: if (colorScale === null || typeof colorScale == `string`) {
		colorScale = d3sc[`interpolate${colorScale ?? text}`];
		if (colorScale === undefined) {
			const list_valid = `supported color scale names are ${Object.keys(d3sc).join(`, `)}`;
			console.error(`Color scale '${colorScale ?? text}' not found, ${list_valid}`);
		}
	}

	$: grad_dir = {
		horizontal: `to right`,
		vertical: `to bottom`
	}[orientation];

	$: ramped = [...Array(10).keys()].map((idx) => colorScale?.(idx / 10));
	$: flex_dir = {
		left: `row`,
		right: `row-reverse`,
		top: `column`,
		bottom: `column-reverse`
	}[textSide];
	$: tick_pos = {
		bottom: `top: 100%`,
		top: `bottom: 100%`,
		center: `top: 50%; transform: translateY(-50%)`
	}[tickSide];
</script>

<div style:flex-direction={flex_dir} style={wrapperStyle} class="colorbar">
	{#if text}<span style={textStyle}>{text}</span>{/if}
	<div style:background="linear-gradient({grad_dir}, {ramped})" {style}>
		{#each tickLabels || [] as tick_label, idx}
			<span style="left: calc(100% * {idx} / {tickLabels?.length - 1}); {tick_pos}">
				{tick_label.toFixed(precision)}
			</span>
		{/each}
	</div>
</div>

<style>
	div.colorbar {
		display: flex;
		box-sizing: border-box;
		place-items: center;
		gap: var(--cbar-gap, 5pt);
		margin: var(--cbar-margin);
		padding: var(--cbar-padding);
		width: var(--cbar-wrapper-width);
	}
	div.colorbar > div {
		position: relative;
		height: var(--cbar-height, 1em);
		width: var(--cbar-width, 10em);
		border-radius: var(--cbar-border-radius, 2pt);
	}
	div.colorbar > div > span {
		position: absolute;
		transform: translate(-50%);
		font-weight: var(--cbar-tick-label-font-weight, lighter);
		font-size: var(--cbar-tick-label-font-size, 10pt);
		color: var(--cbar-tick-label-color);
		background: var(--cbar-tick-label-bg);
	}
</style>
