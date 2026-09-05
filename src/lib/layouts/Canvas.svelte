<!--
	@component
	Canvas layout component
 -->
<script>
	import { onMount, onDestroy, setContext, untrack } from 'svelte';
	import { getLayerCakeContext } from '../context.js';
	import paintLayers from '../helpers/paintLayers.js';

	const k = getLayerCakeContext();

	/**
	 * @typedef {Object} Props
	 * @property {HTMLCanvasElement|undefined} [element] The `<canvas>` element. A useful prop to bind to.
	 * @property {CanvasRenderingContext2D|null} [context] The 2D rendering context for the canvas. A useful prop to bind to.
	 * @property {number|undefined} [zIndex] Set the layout's z-index.
	 * @property {boolean|undefined} [pointerEvents] Set this to `false` to set `pointer-events: none;` on all of this layout's layers.
	 * @property {'visible'|'hidden'} [overflow='visible'] Whether drawings can run past the edge of the chart area into the padding. Set to `'hidden'` to clip them there. Defaults to `'visible'`.
	 * @property {string} [fallback] Fallback text to display when the canvas is not supported.
	 * @property {string|undefined} [label] A string passed to the `aria-label` on the `<canvas>` element.
	 * @property {string|undefined} [labelledBy] A string passed to the `aria-labelledby` on the `<canvas>` element.
	 * @property {string|undefined} [describedBy] A string passed to `aria-describedby` property on the `<canvas>` element.
	 * @property {import('svelte').Snippet<[{ element: HTMLCanvasElement | undefined, context: CanvasRenderingContext2D | null }]>} [children]
	 */

	/** @type {Props} */
	let {
		element = $bindable(undefined),
		context = $bindable(null),
		zIndex = undefined,
		pointerEvents = undefined,
		overflow = 'visible',
		fallback = '',
		label = undefined,
		labelledBy = undefined,
		describedBy = undefined,
		children
	} = $props();

	// Children don't touch the canvas themselves. Each hands us a draw function
	// and this layout paints them, so they can share one canvas without
	// one child's clearing wiping out the others.
	// A regular `$state` array gets wrapped in a proxy so Svelte can see pushes
	// and splices. `$state.raw` skips the proxy: the array stays a plain array
	// and Svelte only notices when a whole new one is assigned. That is all we
	// need, since this code always assigns a fresh copy instead of pushing.
	// Each registration gets its own entry object so that removing one layer
	// can't remove another that happens to use the same function (two instances
	// of a component sharing a module-level draw function, say).
	/** @type {Array<{ fn: import('../context.js').CanvasDrawFn }>} */
	let layers = $state.raw([]);

	/** @type {import('../context.js').CanvasContext} */
	const canvasContext = {
		get ctx() {
			return context;
		},
		draw(fn) {
			const layer = { fn };
			const remove = () =>
				untrack(() => {
					layers = layers.filter(l => l !== layer);
				});
			// A layer gets destroyed when its component is destroyed. Svelte only
			// lets us hook into a component's destruction while it is setting up.
			// So in order to ride that lifecycle, we have to require canvas.draw()
			// to be called from inside an effect.
			let inSetup = !$effect.tracking();
			if (inSetup) {
				try {
					onDestroy(remove);
				} catch {
					inSetup = false;
				}
			}
			if (!inSetup) {
				throw new Error(
					'[LayerCake] canvas.draw() has to be called while your component is setting up, not inside an effect, an event handler or a timer. To change what you draw later, read a reactive value in your draw function or call canvas.redraw().'
				);
			}
			layers = [...layers, layer];
			return remove;
		},
		redraw() {
			// A fresh array is what the paint effect listens for, so copying the list
			// makes it run again: clear the canvas, call every draw function. Untracked
			// so that calling this from inside an effect doesn't make that effect
			// depend on the list and rerun itself.
			untrack(() => {
				layers = [...layers];
			});
		}
	};
	setContext('canvas', canvasContext);

	onMount(() => {
		if (element) {
			context = element.getContext('2d');
		}
	});

	// Where the canvas gets painted. Whatever a draw function reads
	// (k.width, k.data, its own props) is read inside this effect, so any change
	// to it runs the whole thing again and every layer is repainted together.
	let sizeWeSet = '';
	let warnedAboutResize = false;
	$effect(() => {
		if (!context) return;
		const canvas = context.canvas;

		// We size the element on every paint. If the size has changed since, some
		// other code resized the canvas in between: almost always a component
		// still calling scaleCanvas() itself the way v10 components did, which
		// leaves its drawing blank or shifted by the padding. Say so once.
		const sizeNow = canvas.style.width + ' ' + canvas.style.height;
		if (sizeWeSet && sizeNow !== sizeWeSet && !warnedAboutResize) {
			warnedAboutResize = true;
			console.warn(
				'[LayerCake] Something resized this <Canvas> between repaints, most likely a component calling scaleCanvas() itself. <Canvas> sizes and clears the canvas for you: draw through getCanvasContext().draw() and remove your scaleCanvas and clearRect calls. https://layercake.graphics/guide#canvas'
			);
		}

		paintLayers(context, layers, {
			containerWidth: k.containerWidth,
			containerHeight: k.containerHeight,
			width: k.width,
			height: k.height,
			padding: k.padding,
			overflow
		});
		sizeWeSet = canvas.style.width + ' ' + canvas.style.height;
	});
</script>

<canvas
	bind:this={element}
	class="layercake-layout-canvas"
	style:z-index={zIndex}
	style:pointer-events={pointerEvents === false ? 'none' : null}
	style="position:absolute;inset:0;width:100%;height:100%;"
	aria-label={label}
	aria-labelledby={labelledBy}
	aria-describedby={describedBy}
>
	{#if fallback}{fallback}{/if}
</canvas>
{@render children?.({ element, context })}
