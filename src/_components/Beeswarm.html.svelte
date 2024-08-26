<!--
	@component
	Generates an HTML Beeswarm chart.
 -->
<script>
	import { getContext } from 'svelte';

	const { data, xGet, zGet, height, config } = getContext('LayerCake');

	/** @type {number} [r=3] - The circle radius size in pixels. */
	export let r = 3;

	/** @type {number} [strokeWidth=0] - The circle's stroke width in pixels. */
	export let strokeWidth = 0;

	/** @type {String} [stroke='#fff'] - The circle's stroke color. */
	export let stroke = '#fff';

	/** @type {number} [spacing=1.5] - Spacing, in pixels, between each circle. */
	export let spacing = 1.5;

	/** @type {Function} [getTitle] — An accessor function to get the field on the data element to display as a hover label. Mostly useful for debugging, needs better styling for production. */
	export let getTitle = undefined;

	$: circles = dodge($data, { rds: r * 2 + spacing + strokeWidth, x: $xGet });

	function dodge(data, { rds = 1, x = d => d } = {}) {
		const radius2 = rds ** 2;
		const circles = data
			.map(d => ({ x: x(d), [$config.z]: d[$config.z], data: d }))
			.sort((a, b) => a.x - b.x);
		const epsilon = 1e-3;
		let head = null,
			tail = null;

		// Returns true if circle ⟨x,y⟩ intersects with any circle in the queue.
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
			// Remove circles from the queue that can’t intersect the new circle b.
			while (head && head.x < b.x - radius2) head = head.next;

			// Choose the minimum non-intersecting tangent.
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
			else tail = tail.next = b;
		}

		return circles;
	}
</script>

<div class="bee-group">
	{#each circles as d}
		<div
			class="bee"
			style="
				background:{$zGet(d)};
				border-color:{stroke};
				border-width:{strokeWidth};
				left:{d.x}px;
				top:{$height - r - spacing - strokeWidth / 2 - d.y}px;
				width:{r * 2}px;
				height:{r * 2}px;
			"
		>
			{#if getTitle}
				<div class="title">{getTitle(d)}</div>
			{/if}
		</div>
	{/each}
</div>

<style>
	.bee {
		position: absolute;
		border-style: solid;
		border-radius: 50%;
		transform: translate(-50%, -50%);
	}
	.title {
		display: none;
		white-space: nowrap;
		padding: 0 3px;
		border-radius: 3px;
		font-size: 12px;
		pointer-events: none;
		position: absolute;
		top: -15px;
		left: 5px;
		z-index: 9999;
	}
	.bee:hover .title {
		display: block;
	}
</style>
