// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
	// Rows parsed by @rollup/plugin-dsv, which also attaches d3-dsv's `columns`
	module '*.csv' {
		const rows: Array<Record<string, any>> & { columns: string[] };
		export default rows;
	}
}

export {};
