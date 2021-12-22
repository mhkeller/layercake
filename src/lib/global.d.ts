import { Writable, Readable } from 'svelte/store';
// https://medium.com/jspoint/typescript-type-declaration-files-4b29077c43

declare module 'layercake' {
	export interface LayerCakeContext {
		data?: Writable<Array<T>>;

		x?: Writable<(d: Data) => number>;
		y?: Writable<(d: Data) => number>;
		y?: Writable<(d: Data) => number>;
		r?: Writable<(d: Data) => number>;

		/**
		 * Determines how the warning will be displayed.
		 *
		 * @remarks
		 * See  for more details.
		 *
		 */
		xGet?: Readable<(d: Data) => number>;

		/**
		 * @remarks
		 * hihi hi
		*/
		yGet?: Readable<(d: Data) => number>;

		/** @type {Readable} zGet hihi hi */
		zGet?: Readable<(d: Data) => number>;

		/** @example hello */
		rGet?: Readable<(d: Data) => number>;
		extents?: Readable<{ x?: [min: Number, max: Number], y?: [min: Number, max: Number], r?: [min: Number, max: Number], z?: [min: Number, max: Number] }>;
	}
}
