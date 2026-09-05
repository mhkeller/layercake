<!--
	@component
	Generates an SVG beeswarm chart. Each circle sits as low as it can without overlapping its neighbours.
 -->
<script>
	import { getLayerCakeContext } from 'layercake';

	const k = getLayerCakeContext();

	/**
	 * @typedef {Object} Props
	 * @property {number} [r=3] - The circle radius in pixels.
	 * @property {number} [strokeWidth=0] - The circle's stroke width in pixels.
	 * @property {string} [stroke='#fff'] - The circle's stroke color.
	 * @property {number} [spacing=1.5] - Whitespace between circles in pixels.
	 * @property {(d: any) => string} [getTitle] - Returns hover text for a row, shown in a `<title>` tag.
	 */

	/** @type {Props} */
	let { r = 3, strokeWidth = 0, stroke = '#fff', spacing = 1.5, getTitle } = $props();

	/**
	 * Place the circles left to right, pushing each one up only as far as it
	 * needs to clear the circles already placed. Adapted from Mike Bostock's
	 * beeswarm notebook: https://observablehq.com/@d3/beeswarm
	 * @param {Array<any>} data The rows to place.
	 * @param {{ minDistance?: number, x?: (d: any) => number }} [options] `minDistance` is the smallest centre-to-centre gap two circles may have. `x` gives a row its x position.
	 */
	function dodge(data, { minDistance = 1, x = d => d } = {}) {
		const minDistanceSquared = minDistance ** 2;
		// Each circle keeps its original row on `data`. Read any field you need
		// from there. Copying fields onto the circle would only work when the
		// accessor is a string, not a function.
		/** @type {Array<any>} */
		const circles = data.map(d => ({ x: x(d), data: d })).sort((a, b) => a.x - b.x);
		const epsilon = 1e-3;
		/** @type {any} */
		let head = null;
		/** @type {any} */
		let tail = null;

		// Returns true if a circle at (x, y) overlaps any circle in the queue.
		/** @param {number} x @param {number} y */
		function intersects(x, y) {
			let a = head;
			while (a) {
				if (minDistanceSquared - epsilon > (a.x - x) ** 2 + (a.y - y) ** 2) {
					return true;
				}
				a = a.next;
			}
			return false;
		}

		// Place each circle sequentially.
		for (const b of circles) {
			// Remove circles from the queue that can't overlap the new circle b.
			while (head && head.x < b.x - minDistanceSquared) head = head.next;

			// Find the lowest spot where b touches a circle in the queue without overlapping any.
			if (intersects(b.x, (b.y = 0))) {
				let a = head;
				b.y = Infinity;
				do {
					let y = a.y + Math.sqrt(minDistanceSquared - (a.x - b.x) ** 2);
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
	let circles = $derived(dodge(k.data, { minDistance: r * 2 + spacing + strokeWidth, x: k.xGet }));
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
