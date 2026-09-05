<!--
	@component
	Generates an SVG Beeswarm chart.
 -->
<script>
	import { getLayerCakeContext } from 'layercake';

	const k = getLayerCakeContext();

	/**
	 * @typedef {Object} Props
	 * @property {number} [r=3] - The circle radius size in pixels.
	 * @property {number} [strokeWidth=0] - The circle's stroke width in pixels.
	 * @property {string} [stroke='#fff'] - The circle's stroke color.
	 * @property {number} [spacing=1.5] - Whitespace padding between each circle, in pixels
	 * @property {Function} [getTitle] - An accessor function that receives a row of your data and returns the field to display as a hover label using a `<title>` tag.
	 */

	/** @type {Props} */
	let { r = 3, strokeWidth = 0, stroke = '#fff', spacing = 1.5, getTitle } = $props();

	function dodge(data, { rds = 1, x = d => d } = {}) {
		const radius2 = rds ** 2;
		// Each circle keeps its original row on `data`. Read any field you need
		// from there. Copying fields onto the circle would only work when the
		// accessor is a string, not a function.
		const circles = data.map(d => ({ x: x(d), data: d })).sort((a, b) => a.x - b.x);
		const epsilon = 1e-3;
		let head = null,
			tail = null;

		// Returns true if a circle at (x, y) overlaps any circle in the queue.
		function intersects(x, y) {
			let a = head;
			while (a) {
				if (radius2 - epsilon > (a.x - x) ** 2 + (a.y - y) ** 2) {
					return true;
				}
				a = a.next;
			}
			return false;
		}

		// Place each circle sequentially.
		for (const b of circles) {
			// Remove circles from the queue that can't overlap the new circle b.
			while (head && head.x < b.x - radius2) head = head.next;

			// Find the lowest spot where b touches a circle in the queue without overlapping any.
			if (intersects(b.x, (b.y = 0))) {
				let a = head;
				b.y = Infinity;
				do {
					let y = a.y + Math.sqrt(radius2 - (a.x - b.x) ** 2);
					if (y < b.y && !intersects(b.x, y)) b.y = y;
					a = a.next;
				} while (a);
			}

			// Add b to the queue.
			b.next = null;
			if (head === null) head = tail = b;
			else {
				tail.next = b;
				tail = b;
			}
		}

		return circles;
	}
	let circles = $derived(dodge(k.data, { rds: r * 2 + spacing + strokeWidth, x: k.xGet }));
</script>

<g class="bee-group">
	{#each circles as d}
		<circle
			fill={k.cGet?.(d.data) ?? '#ccc'}
			{stroke}
			stroke-width={strokeWidth}
			cx={d.x}
			cy={k.height - r - spacing - strokeWidth / 2 - d.y}
			{r}
		>
			{#if getTitle}
				<title>{getTitle(d.data)}</title>
			{/if}
		</circle>
	{/each}
</g>
