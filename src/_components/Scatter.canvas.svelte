<!--
	@component
	Generates a canvas scatter plot.
 -->
<script>
	import { getContext, onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { scaleCanvas } from 'layercake';

	const { data, xGet, yGet, width, height } = getContext('LayerCake');

	const { ctx } = getContext('canvas');

	/**
	 * @typedef {Object} Props
	 * @property {number} [r=5] - The circle's radius.
	 * @property {string} [fill='#0cf'] - The circle's fill color.
	 * @property {string} [stroke='#000'] - The circle's stroke color.
	 * @property {number} [strokeWidth=1] - The circle's stroke width.
	 */

	/** @type {Props} */
	let { r = 5, fill = '#0cf', stroke = '#000', strokeWidth = 1 } = $props();

	onMount(() => {
		function draw() {
			const w = get(width);
			const h = get(height);
			const context = get(ctx);
			if (!w || !h || !context) return;

			scaleCanvas(context, w, h);
			context.clearRect(0, 0, w, h);

			get(data).forEach((/** @type {any} d */ d) => {
				context.beginPath();
				context.arc(get(xGet)(d), get(yGet)(d), r, 0, 2 * Math.PI, false);
				context.lineWidth = strokeWidth;
				context.strokeStyle = stroke;
				context.stroke();
				context.fillStyle = fill;
				context.fill();
			});
		}

		const unsubs = [width, height, ctx, xGet, yGet, data].map(store =>
			store.subscribe(draw)
		);
		return () => unsubs.forEach(unsub => unsub());
	});
</script>
