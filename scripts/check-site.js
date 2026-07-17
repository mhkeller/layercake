#!/usr/bin/env node
/**
 * Run svelte-check for internal site code only, ignoring:
 * - src/lib (published library)
 * - chart demos under src/_components and src/routes/_components*
 * - example charts under src/routes/_examples*
 */
import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const svelteCheckBin = require.resolve('svelte-check/bin/svelte-check');

/** Paths deferred to a later pass — not part of this site-only check. */
const ignoredPathParts = [
	'src/lib/',
	'src/_components/',
	'src/routes/_components/',
	'src/routes/_components_ssr/',
	'src/routes/_examples/',
	'src/routes/_examples_ssr/'
];

/**
 * @param {string} file
 */
function isIgnored(file) {
	const normalized = file.replaceAll('\\', '/').replace(/^[A-Za-z]:/, '');
	return ignoredPathParts.some(part => normalized.includes(`/${part}`) || normalized.startsWith(part));
}

const result = spawnSync(
	process.execPath,
	[svelteCheckBin, '--tsconfig', './jsconfig.site.json'],
	{ encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 }
);

const output = result.stdout || '';
process.stdout.write(output);
if (result.stderr) process.stderr.write(result.stderr);

const lines = output.split('\n');
/** @type {{ file: string, line: number, col: number, msg: string }[]} */
const siteErrors = [];
/** @type {string | null} */
let currentFile = null;
let currentLine = 0;
let currentCol = 0;
/** @type {string | null} */
let currentKind = null;
/** @type {string[]} */
let currentMsg = [];

function flush() {
	if (!currentFile || currentKind !== 'Error') return;
	if (isIgnored(currentFile)) return;
	siteErrors.push({
		file: currentFile,
		line: currentLine,
		col: currentCol,
		msg: currentMsg.join('\n').trim()
	});
}

for (const line of lines) {
	const locParts = line.match(/^(.+):(\d+):(\d+)$/);
	if (locParts) {
		flush();
		currentFile = locParts[1];
		currentLine = Number(locParts[2]);
		currentCol = Number(locParts[3]);
		currentKind = null;
		currentMsg = [];
		continue;
	}
	const kind = line.match(/^(Error|Warn|Hint):\s*(.*)$/);
	if (kind && currentFile) {
		flush();
		currentKind = kind[1];
		currentMsg = [kind[2]];
		continue;
	}
	if (currentKind && currentFile && line && !line.startsWith('=====')) {
		currentMsg.push(line);
	}
}
flush();

if (siteErrors.length) {
	console.error(`\ncheck:site found ${siteErrors.length} internal-site error(s) (lib/charts ignored).`);
	process.exit(1);
}

console.log('\ncheck:site passed (no internal-site errors; lib/charts ignored).');
process.exit(0);
