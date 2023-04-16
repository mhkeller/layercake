<!--
	@component
	Creates a color bar key for chromatic scales on `zScale`.
 -->
<script>
	import { getContext } from 'svelte';

	const { zScale } = getContext('LayerCake');

	/** @type {string | null} [text=null] - Text label to show next to the color bar */
	export let text = null;

	/** @type {('left' | 'right' | 'top' | 'bottom')} [textSide='left'] - Position of the color bar's
	 * text label relative to the gradient bar */
	export let textSide = `left`;

	/** @type {Number|Array|Function} [ticks=4] - If this is a number, it passes that along to the [d3Scale.ticks](https://github.com/d3/d3-scale) function. If this is an array, hardcodes the ticks to those values. If it's a function, passes along the default tick values and expects an array of tick values in return. */
	export let ticks = 3;

	/** @type {Boolean} [snapTicks=true] - Instead of centering the text on the first and the last items, align them to the edges of the chart. */
	export let snapTicks = true;

	/** @type {('top' | 'bottom' | 'center')} [tickSide='bottom'] - Position of tick labels */
	export let tickSide = `bottom`;

	/** @type {('horizontal' | 'vertical')} [orientation='horizontal'] - Orientation of the color bar gradient */
	export let orientation = `horizontal`; // TODO vertical not fully implemented yet

	/** @type {Number} [precision=1] - Number of decimal places to show in tick labels */
	export let precision = 1;

	/** @type {Number} [steps=10] - Number of samples to take of the color ramp */
	export let steps = 10;

	$: tickVals = Array.isArray(ticks) ? ticks :
				typeof ticks === 'function' ?
					ticks($zScale.ticks()) :
						$zScale.ticks(ticks);

	$: grad_dir = {
		horizontal: `to right`,
		vertical: `to bottom`
	}[orientation];

	$: ramped = [...Array(steps).keys()].map(i => $zScale(i / steps));

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

<div style:flex-direction={flex_dir} class="colorbar"  class:snapTicks>
	{#if text}<span>{text}</span>{/if}

	<div style:background="linear-gradient({grad_dir}, {ramped})">
		{#each tickVals as tick_label, i}
			<span class="tick tick-{i}" style="left: calc(100% * {i} / {tickVals?.length - 1}); {tick_pos}">
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
		width: var(--cbar-width);
		font-size: var(--cbar-font-size, 10pt);
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
		font-size: var(--cbar-tick-label-font-size, --cbar-font-size);
		color: var(--cbar-tick-label-color);
		background: var(--cbar-tick-label-bg);
	}

	.colorbar.snapTicks .tick:last-child {
		transform: translateX(-100%);
	}
	.colorbar.snapTicks .tick.tick-0 {
		transform: translateX(0);
	}
</style>
