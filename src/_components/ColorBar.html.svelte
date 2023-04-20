<!--
	@component
	Creates a color bar key for chromatic scales on `zScale`.
 -->
<script>
	import { getContext } from 'svelte';

	const { zScale } = getContext('LayerCake');

	/** @type {string | null} [label=null] - Text label to show next to the color bar */
	export let label = null;

	/** @type {string} [labelSide='left'] - Position of the label. Can be 'top', 'right', 'bottom', or 'left
	 * text label relative to the gradient bar */
	export let labelSide = `left`;

	/** @type {Number|Array|Function} [ticks=4] - If this is a number, it passes that along to the [d3Scale.ticks](https://github.com/d3/d3-scale) function. If this is an array, hardcodes the ticks to those values. If it's a function, passes along the default tick values and expects an array of tick values in return. */
	export let ticks = 3;

  /** @type {Boolean} [tickMarks=false] - Show a vertical mark for each tick. */
  export let tickMarks = false;

	/** @type {Function} [formatTick=d => d] - A function that passes the current tick value and expects a nicely formatted value in return. */
	export let formatTick = d => d;

	/** @type {Boolean} [snapTicks=true] - Instead of centering the text on the first and the last items, align them to the edges of the chart. */
	export let snapTicks = true;

	/** @type {string} [tickSide='bottom'] - Position of tick labels. Can be 'top' or 'bottom' */
	export let tickSide = `bottom`;

	/** @type {Number} [steps=100] - Number of samples to take of the color ramp to create the linear gradient */
	export let steps = 100;

	$: tickVals = Array.isArray(ticks) ? ticks :
				typeof ticks === 'function' ?
					ticks($zScale.ticks()) :
						$zScale.ticks(ticks);

	$: ramped = [...Array(steps).keys()].map(i => $zScale(i / steps));

	$: labelFlexDir = {
		left: `row`,
		right: `row-reverse`,
		'top-left': `column`,
		'top-right': `column`,
		'bottom-left': `column-reverse`,
		'bottom-right': `column-reverse`
	}[labelSide];

	$: tickFlexDir = {
		'top': `column-reverse`,
		'bottom': `column`,
	}[tickSide];

	$: tickPos = {
		'bottom': `top: 0%`,
		'top': `bottom: 0%`,
	}[tickSide];
</script>

<div style:flex-direction={labelFlexDir} class="colorbar" class:snapTicks class:tickMarks>
	{#if label}<span
		class="label"
		data-labelside={labelSide}
		data-tickside={tickSide}
	>{label}</span>{/if}
	<div
		class="bar-container"
		style:flex={labelSide === 'left' || labelSide === 'right' ? '1' : null}
		style:flex-direction={tickFlexDir}
	>
		<div
			class="gradient-bar"
			style:background="linear-gradient(to right, {ramped})"
		></div>
		<div class="tick-container">
			{#each tickVals as tick_label, i}
				{#if tickMarks === true}
					<div class="tick-mark" style="left: calc(100% * {i} / {tickVals?.length - 1});{tickPos}; {i === tickVals?.length - 1 ? 'transform: translateX(-1px)' : i ? 'transform: translateX(-0.5px)' : ''}"></div>
				{/if}
				<span class="tick tick-{i}" style="left: calc(100% * {i} / {tickVals?.length - 1}); {tickPos}">
					{formatTick(tick_label)}
				</span>
			{/each}
		</div>
	</div>
</div>

<style>
	div.colorbar {
		display: flex;
		box-sizing: border-box;
		align-items: baseline;
		position: relative;
		gap: var(--cbar-gap, 5pt);
		margin: var(--cbar-margin);
		padding: var(--cbar-padding);
		width: var(--cbar-width);
		font-size: var(--cbar-font-size, 10pt);
	}
	div.colorbar > div {
		position: relative;
		height: var(--cbar-height, 2em);
		width: var(--cbar-width, 10em);
		border-radius: var(--cbar-border-radius, 0);
	}
	.tick-container > span {
		position: absolute;
		transform: translate(-50%);
		font-weight: var(--cbar-tick-label-font-weight, lighter);
		font-size: var(--cbar-tick-label-font-size, --cbar-font-size);
		color: var(--cbar-tick-label-color);
		background: var(--cbar-tick-label-bg);
	}
	.bar-container,
	.tick-container {
		display: flex;
	}
	.tick-container {
		position: relative;
	}
	.gradient-bar,
	.tick-container {
		flex: 1;
	}

	.label[data-labelside='right'][data-tickside='top'],
	.label[data-labelside='left'][data-tickside='top'] {
		transform: translateY(-1px);
	}
	.label[data-labelside='right'][data-tickside='bottom'],
	.label[data-labelside='left'][data-tickside='bottom'] {
		transform: translateY(-1px);
	}
	.label[data-labelside*='-left'] {
		align-self: flex-start;
	}
	.label[data-labelside*='-right'] {
		align-self: flex-end;
	}

	.colorbar.snapTicks .tick:last-child {
		transform: translateX(-100%);
	}
	.colorbar.snapTicks .tick.tick-0 {
		transform: translateX(0);
	}

	.tickMarks .tick{
		margin-top: 4px;
	}

	.tick-mark {
		position: absolute;
    border-left: 1px solid #aaa;
		--length: 6px;
		height: var(--length);
		bottom: calc(-1 * var(--length));
  }
</style>
