#!/usr/bin/env node
/**
 * Type-check the website code only.
 *
 * svelte-check has no option to skip files, so it runs over the whole project
 * and this script drops the diagnostics from the parts that get their own pass:
 * - src/lib, the published library
 * - the chart components under src/_components and their demos under
 *   src/routes/_components*
 * - the example charts under src/routes/_examples*
 *
 * What's left is the website: routes, site components, _modules and scripts.
 * Any error there fails the run.
 */
import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const svelteCheckBin = require.resolve('svelte-check/bin/svelte-check');

/** Paths that are checked elsewhere, so their diagnostics are dropped here. */
const ignoredPathParts = [
	'src/lib/',
	'src/_components/',
	'src/routes/_components/',
	'src/routes/_components_ssr/',
	'src/routes/_examples/',
	'src/routes/_examples_ssr/'
];

/** @param {string} file */
function isIgnored(file) {
	const normalized = file.replaceAll('\\', '/');
	return ignoredPathParts.some(
		part => normalized.startsWith(part) || normalized.includes(`/${part}`)
	);
}

// `machine-verbose` prints one JSON object per diagnostic, so the output can be
// parsed instead of scraped
const result = spawnSync(
	process.execPath,
	[svelteCheckBin, '--tsconfig', './jsconfig.json', '--output', 'machine-verbose'],
	{ encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 }
);

if (result.error) {
	console.error(result.error);
	process.exit(1);
}
// svelte-check loads vite.config.js with its own `root`, which makes SvelteKit
// warn that it will override `root`. That's about svelte-check's setup, not
// this project's, so that one message is dropped. Anything else passes through.
const viteRootNoise =
	/^The following Vite config options will be overridden by SvelteKit:\n\s+- root\n?/;
const stderr = (result.stderr || '').replace(viteRootNoise, '');
if (stderr) process.stderr.write(stderr);

/**
 * @typedef {{
 *   type: 'ERROR' | 'WARNING',
 *   filename: string,
 *   start: { line: number, character: number },
 *   message: string
 * }} Diagnostic
 */

/** @type {Diagnostic[]} */
const siteDiagnostics = [];
let completed = false;

for (const line of (result.stdout || '').split('\n')) {
	// Every line is `<timestamp> <payload>`. Diagnostics are JSON payloads.
	// The START and COMPLETED lines are not.
	const payload = line.slice(line.indexOf(' ') + 1);
	if (payload.startsWith('COMPLETED')) completed = true;
	if (!payload.startsWith('{')) continue;
	/** @type {Diagnostic} */
	const diagnostic = JSON.parse(payload);
	if (!isIgnored(diagnostic.filename)) siteDiagnostics.push(diagnostic);
}

if (!completed) {
	console.error('check:site: svelte-check did not finish. Its output was:\n');
	process.stdout.write(result.stdout || '');
	process.exit(1);
}

for (const { type, filename, start, message } of siteDiagnostics) {
	const label = type === 'ERROR' ? 'Error' : 'Warn';
	console.log(`${filename}:${start.line + 1}:${start.character + 1}\n${label}: ${message}\n`);
}

const errors = siteDiagnostics.filter(d => d.type === 'ERROR').length;
const warnings = siteDiagnostics.length - errors;
const summary = `${errors} error(s), ${warnings} warning(s) in website code (lib and charts skipped)`;

if (errors > 0) {
	console.error(`check:site failed: ${summary}`);
	process.exit(1);
}
console.log(`check:site passed: ${summary}`);
