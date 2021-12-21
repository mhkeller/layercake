/** @type {import('svelte').Writable} */

declare module 'layercake' {
	export interface LayerCakeContext {
		data?: Writable<array|object>,
		xGet?: Writable<function>
	}
}
