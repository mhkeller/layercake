<!--
	@component
	Adds an HTML brush for picking a range from 0 to 1 by dragging. Bind `min` and `max` to read the range elsewhere. See the [brush example](https://layercake.graphics/example/Brush).
 -->
<script>
	import { clamp } from 'yootils';

	/**
	 * @typedef {Object} Props
	 * @property {number|null} [min=null] - Where the brush starts, from 0 to 1. Bind to it.
	 * @property {number|null} [max=null] - Where the brush ends, from 0 to 1. Bind to it.
	 */

	/** @type {Props} */
	let { min = $bindable(null), max = $bindable(null) } = $props();

	/** @type {HTMLDivElement|undefined} */
	let brush = $state();

	// A horizontal page position as a share of the brush's width, from 0 to 1
	/** @param {number} clientX */
	function fractionAcross(clientX) {
		if (!brush) return 0;
		const { left, right } = brush.getBoundingClientRect();
		return clamp((clientX - left) / (right - left), 0, 1);
	}

	/** @typedef {{ min: number, max: number, p: number }} DragStart The range and pointer position when a drag began. */

	// Wraps a drag rule so it runs on every mouse or touch move until the pointer lifts.
	// It gets the range as it was when the drag began and the pointer's current position.
	/** @param {(start: DragStart, p: number) => void} fn */
	function handler(fn) {
		/** @param {MouseEvent|TouchEvent} e */
		return e => {
			e.stopPropagation();
			e.preventDefault();

			// Only follow one finger at a time
			/** @type {number|undefined} */
			let touchId;
			/** @type {{ clientX: number }} */
			let point = /** @type {MouseEvent} */ (e);
			if ('touches' in e) {
				if (e.touches.length !== 1) return;
				point = e.touches[0];
				touchId = e.touches[0].identifier;
			}

			const start = { min: min ?? 0, max: max ?? 1, p: fractionAcross(point.clientX) };

			/** @param {MouseEvent|TouchEvent} e */
			const handleMove = e => {
				e.preventDefault();
				/** @type {{ clientX: number }} */
				let moved = /** @type {MouseEvent} */ (e);
				if ('changedTouches' in e) {
					if (e.changedTouches.length !== 1) return;
					if (e.changedTouches[0].identifier !== touchId) return;
					moved = e.changedTouches[0];
				}
				fn(start, fractionAcross(moved.clientX));
			};

			/** @param {MouseEvent|TouchEvent} e */
			const handleEnd = e => {
				if ('changedTouches' in e) {
					if (e.changedTouches.length !== 1) return;
					if (e.changedTouches[0].identifier !== touchId) return;
				} else if (e.target === brush) {
					// A click on the empty track clears the range
					clear();
				}

				window.removeEventListener('mousemove', handleMove);
				window.removeEventListener('mouseup', handleEnd);
				window.removeEventListener('touchmove', handleMove);
				window.removeEventListener('touchend', handleEnd);
			};

			window.addEventListener('mousemove', handleMove);
			window.addEventListener('mouseup', handleEnd);
			window.addEventListener('touchmove', handleMove);
			window.addEventListener('touchend', handleEnd);
		};
	}

	function clear() {
		min = null;
		max = null;
	}

	// Drag on the track to draw a new range
	const reset = handler((start, p) => {
		min = clamp(Math.min(start.p, p), 0, 1);
		max = clamp(Math.max(start.p, p), 0, 1);
	});

	// Drag the range to slide it along, keeping its width
	const move = handler((start, p) => {
		const d = clamp(p - start.p, -start.min, 1 - start.max);
		min = start.min + d;
		max = start.max + d;
	});

	// Drag a handle to move one end, swapping ends if it crosses the other
	const adjustMin = handler((start, p) => {
		min = p > start.max ? start.max : p;
		max = p > start.max ? p : start.max;
	});

	const adjustMax = handler((start, p) => {
		min = p < start.min ? p : start.min;
		max = p < start.min ? start.min : p;
	});

	let left = $derived(min !== null ? 100 * min : null);
	let right = $derived(max !== null ? 100 * (1 - max) : null);
</script>

<!-- The brush is mouse and touch only. There is no keyboard path yet. -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div bind:this={brush} class="brush-outer" onmousedown={reset} ontouchstart={reset}>
	{#if min !== null}
		<div
			class="brush-inner"
			draggable="false"
			onmousedown={move}
			ontouchstart={move}
			style="left: {left}%; right: {right}%"
		></div>
		<div
			class="brush-handle"
			draggable="false"
			onmousedown={adjustMin}
			ontouchstart={adjustMin}
			style="left: {left}%"
		></div>
		<div
			class="brush-handle"
			draggable="false"
			onmousedown={adjustMax}
			ontouchstart={adjustMax}
			style="right: {right}%"
		></div>
	{/if}
</div>

<style>
	.brush-outer {
		position: relative;
		width: 100%;
		height: calc(100% + 5px);
		top: -5px;
	}

	.brush-inner {
		position: absolute;
		height: 100%;
		cursor: move;
		background-color: #cccccc90;
	}

	.brush-handle {
		position: absolute;
		width: 0;
		height: 100%;
		cursor: ew-resize;
	}

	.brush-handle::before {
		position: absolute;
		content: '';
		width: 8px;
		left: -4px;
		height: 100%;
		background: transparent;
	}
</style>
