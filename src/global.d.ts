/// <reference types="@sveltejs/kit" />

// Rows parsed by @rollup/plugin-dsv, which also attaches d3-dsv's `columns`
declare module '*.csv' {
	const rows: Array<Record<string, any>> & { columns: string[] };
	export default rows;
}
