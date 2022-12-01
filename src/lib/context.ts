import type { Readable as SvelteStore } from "svelte/store";
import type { LayerCakeConfig } from "./config";
import type { Axis } from "./helpers/axes";
import type createGetter from "./helpers/createGetter";
import type makeAccessor from "./utils/makeAccessor";


export type LayerCakeContext<Datum, Config extends LayerCakeConfig<Datum> = LayerCakeConfig<Datum>> =
	{
		/**
			 * This will always be a function regardless of whether you passed in a string or an array as a prop.
			 * If you passed in an array, it will return an array of equal length.
			 */
		[axis in Axis]: SvelteStore<Accessors<Datum, Config>[axis]>;
	} & {
		/**
			 * Often you want to get the value of a row in your data and scale it like so: `$xScale($x(d))`.
			 * Avoid that confusing syntax with this function like so `$xGet(d)`.
			 */
		[axis in Axis as `${axis}Get`]: SvelteStore<ReturnType<typeof createGetter<Datum, Accessors<Datum, Config>[axis]>>>
	} & {
		/**
			 * The calculated scale for the given axis.
			 */
		[axis in Axis as `${axis}Scale`]: SvelteStore<(<T>(v: T) => T)>
	} & {
		/** This is the data you should loop on.
		 *
		 * @example Looping on data in a Svelte component
		 * ```svelte
		 * <g>
		 *	{#each $data as d}
		 *		<circle cx={ $xScale($x(d)) } cy={ $yScale($y(d)) } />
		 *	{/each}
		 * </g>
		 * ```
		 */
		data: SvelteStore<readonly Datum[] | readonly never[]>;

		/**
		 * The calculated extent of the x-dimension of the data.
		 * This is the extent of the data taking into account any manual settings passed in for `xDomain`.
		 *
		 * For example, if the extent of the data is [10, 100] and you set the `xDomain` prop
		 * to [0, null], the xDomain on the context value is [0, 100].
		 *
		 * It's equivalent to calling `$xScale.domain()`.
		 */
		xDomain: SvelteStore<[min: number, max: number]>;
		/**
		 * The calculated extent of the y-dimension of the data.
		 * This is the extent of the data taking into account any manual settings passed in for `yDomain`.
		 * It's equivalent to calling `$yScale.domain()`.
		 * @see {@link xDomain} for more information.
		 */
		yDomain: SvelteStore<[min: number, max: number]>;
		/**
		 * The calculated extent of the z-dimension of the data.
		 * This is the extent of the data taking into account any manual settings passed in for `zDomain`.
		 * It's equivalent to calling `$zScale.domain()`.
		 * @see {@link xDomain} for more information.
		 */
		zDomain: SvelteStore<[min: number, max: number]>;
		/**
		 * The calculated extent of the r-dimension of the data.
		 * This is the extent of the data taking into account any manual settings passed in for `rDomain`.
		 * It's equivalent to calling `$rScale.domain()`.
		 * @see {@link xDomain} for more information.
		 */
		rDomain: SvelteStore<[min: number, max: number]>;
	}

/** Helper type that generates accessors from a Config */
type Accessors<Datum, Config extends LayerCakeConfig<Datum>> = { [axis in Axis]: ReturnType<typeof makeAccessor<Datum, Config[axis]>>; }
