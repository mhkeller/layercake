import { Parser } from 'tar';

/**
 * Downloads the starter template that the example pages' Download button
 * builds its zip from. The template lives in its own repo. GitHub serves the
 * main branch as a gzipped tar, which is read here in memory, so nothing from
 * the template is checked in to this one.
 */
const TEMPLATE_TARBALL = 'https://codeload.github.com/mhkeller/layercake-template/tar.gz/main';

/**
 * A file from the template. Text files carry their contents as is. Binary
 * files, like the favicon, are base64 so they survive the trip through JSON.
 * @typedef {{ path: string, data: string, encoding?: 'base64' }} TemplateFile
 */

/**
 * @typedef {{ files: TemplateFile[], packageJson: Record<string, any> }} Template
 */

/**
 * The Download button adds the example's own page, components and data to the
 * zip, so the template's placeholders for those stay out.
 * @param {string} path
 */
function isKept(path) {
	if (path === 'src/routes/+page.svelte') return false;
	if (path.startsWith('src/routes/_components/')) return false;
	if (path.startsWith('src/routes/_data/')) return false;
	return true;
}

const utf8 = new TextDecoder('utf-8', { fatal: true });

/**
 * Text comes through as a string. Anything that isn't valid UTF-8 is binary
 * and is base64-encoded instead.
 * @param {string} path
 * @param {Buffer} body
 * @returns {TemplateFile}
 */
function toTemplateFile(path, body) {
	try {
		return { path, data: utf8.decode(body) };
	} catch {
		return { path, data: body.toString('base64'), encoding: 'base64' };
	}
}

/**
 * The files in a tar archive. The parser gunzips on its own when the archive
 * is gzipped.
 * @param {Buffer} archive
 * @returns {Promise<{ path: string, body: Buffer }[]>}
 */
function readTar(archive) {
	return new Promise((resolve, reject) => {
		/** @type {{ path: string, body: Buffer }[]} */
		const files = [];
		const parser = new Parser({
			onReadEntry: entry => {
				if (entry.type !== 'File') {
					// Directories and the like have nothing to collect. They still have
					// to be read through so the parser moves on.
					entry.resume();
					return;
				}
				/** @type {Buffer[]} */
				const chunks = [];
				entry.on('data', chunk => chunks.push(chunk));
				entry.on('end', () => files.push({ path: entry.path, body: Buffer.concat(chunks) }));
			}
		});
		parser.on('error', reject);
		parser.on('end', () => resolve(files));
		parser.end(archive);
	});
}

/** @returns {Promise<Template>} */
async function download() {
	const res = await fetch(TEMPLATE_TARBALL);
	if (!res.ok) {
		throw new Error(`Could not download the starter template: ${res.status} ${res.statusText}`);
	}
	const entries = await readTar(Buffer.from(await res.arrayBuffer()));

	/** @type {TemplateFile[]} */
	const files = [];
	for (const entry of entries) {
		// GitHub wraps the repo in a `layercake-template-main/` folder
		const path = entry.path.slice(entry.path.indexOf('/') + 1);
		if (path && isKept(path)) files.push(toTemplateFile(path, entry.body));
	}

	const packageFile = files.find(file => file.path === 'package.json');
	if (!packageFile) throw new Error('The starter template has no package.json');

	return { files, packageJson: JSON.parse(packageFile.data) };
}

/** @type {Promise<Template> | undefined} */
let template;

/**
 * The template, downloaded once per process. The two endpoints that use it are
 * prerendered in the same build, so the tarball is fetched a single time.
 * @returns {Promise<Template>}
 */
export default function getTemplateFiles() {
	template ??= download().catch(error => {
		// Let the next request try again instead of caching the failure
		template = undefined;
		throw error;
	});
	return template;
}
