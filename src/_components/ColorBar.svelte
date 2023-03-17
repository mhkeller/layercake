<script>
	import * as d3sc from 'd3-scale-chromatic';

	/** @type {string | null} [text=null] - Text label to show next to the color bar */
	export let text = null;
	/** @type {((x: number) => string) | string | null} [colorScale=null] - Color scale to use.
	 * If a string, will use a d3-scale-chromatic scale with that name. If a function, expects
	 * one that maps the unit interval [0, 1] to color strings. */
	export let colorScale = null;
	/** @type {('left' | 'right' | 'top' | 'bottom')} [textSide='left'] - Position of the color bar's
	 * text label relative to the gradient bar */
	export let textSide = `left`;
	/** @type {string | null} [style=null] - Style to apply to the color bar's gradient */
	export let style = null;
	/** @type {string | null} [textStyle=null] - Style to apply to the color bar's text label */
	export let textStyle = null;
	/** @type {string | null} [wrapperStyle=null] - Style to apply to the color bar's wrapper div */
	export let wrapperStyle = null;
	/** @type {string | number | [number, number]} [tickLabels=0] - Tick labels to show.
	 * If a number, will generate that many equidistant tick labels. If an array, will
	 * use those labels. If a range, will generate tick labels for that range. */
	export let tickLabels = 0;
	/** @type {[number, number]} [range=[]] - Range of values to show in tick labels. Default is [0, 1]. */
	export let range = [0, 1];
	/** @type {('top' | 'bottom' | 'center')} [tickSide='bottom'] - Position of tick labels */
	export let tickSide = `bottom`;
	/** @type {('horizontal' | 'vertical')} [orientation='horizontal'] - Orientation of the color bar gradient */
	export let orientation = `horizontal`; // TODO vertical not fully implemented yet
	/** @type {Number} [precision=1] - Number of decimal places to show in tick labels */
	export let precision = 1;

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
		width: var(--cbar-width);
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
