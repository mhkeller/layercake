<!--
	@component
	Adds an HTML brush for picking a range from 0 to 1. Drag on the track to draw one, or focus a handle and use the arrow keys. Bind `min` and `max` to read the range elsewhere. See the [brush example](https://layercake.graphics/example/Brush).
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

	// Arrow keys nudge by a hundredth, or a tenth with shift. Home and End go to
	// the edges. Escape clears the range. With no range yet, the handles sit at
	// the edges, so the first key press draws one.
	/** @param {KeyboardEvent} e @param {'min'|'max'|'both'} part Which part of the range the key moves. */
	function handleKeydown(e, part) {
		const step = e.shiftKey ? 0.1 : 0.01;
		const start = { min: min ?? 0, max: max ?? 1 };
		let delta;
		if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') delta = -step;
		else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') delta = step;
		else if (e.key === 'Home') delta = -1;
		else if (e.key === 'End') delta = 1;
		else if (e.key === 'Escape') {
			clear();
			return;
		} else return;
		e.preventDefault();

		if (part === 'both') {
			const d = clamp(delta, -start.min, 1 - start.max);
			min = start.min + d;
			max = start.max + d;
		} else if (part === 'min') {
			const p = clamp(start.min + delta, 0, 1);
			min = Math.min(p, start.max);
			max = Math.max(p, start.max);
		} else {
			const p = clamp(start.max + delta, 0, 1);
			min = Math.min(p, start.min);
			max = Math.max(p, start.min);
		}
	}

	let left = $derived(100 * (min ?? 0));
	let right = $derived(100 * (1 - (max ?? 1)));

	/** @param {number} value */
	const percent = value => `${Math.round(value * 100)}%`;
</script>

<!-- The track itself is mouse and touch only. Keyboard users work the range and its two handles, which are sliders. -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div bind:this={brush} class="brush-outer" onmousedown={reset} ontouchstart={reset}>
	{#if min !== null && max !== null}
		<div
			class="brush-inner"
			role="slider"
			tabindex="0"
			aria-label="Selected range"
			aria-valuemin="0"
			aria-valuemax="100"
			aria-valuenow={Math.round(min * 100)}
			aria-valuetext="{percent(min)} to {percent(max)}"
			draggable="false"
			onmousedown={move}
			ontouchstart={move}
			onkeydown={e => handleKeydown(e, 'both')}
			style="left: {left}%; right: {right}%"
		></div>
	{/if}
	<!-- The handles stay in the DOM with no range so they can be focused, but the mouse then goes to the track -->
	<div
		class="brush-handle"
		class:idle={min === null}
		role="slider"
		tabindex="0"
		aria-label="Start of range"
		aria-valuemin="0"
		aria-valuemax="100"
		aria-valuenow={Math.round((min ?? 0) * 100)}
		aria-valuetext={percent(min ?? 0)}
		draggable="false"
		onmousedown={adjustMin}
		ontouchstart={adjustMin}
		onkeydown={e => handleKeydown(e, 'min')}
		style="left: {left}%"
	></div>
	<div
		class="brush-handle"
		class:idle={max === null}
		role="slider"
		tabindex="0"
		aria-label="End of range"
		aria-valuemin="0"
		aria-valuemax="100"
		aria-valuenow={Math.round((max ?? 1) * 100)}
		aria-valuetext={percent(max ?? 1)}
		draggable="false"
		onmousedown={adjustMax}
		ontouchstart={adjustMax}
		onkeydown={e => handleKeydown(e, 'max')}
		style="right: {right}%"
	></div>
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
	.brush-handle.idle {
		pointer-events: none;
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
