import { existsSync, readFileSync } from 'fs';
import { error } from '@sveltejs/kit';

/**
 * @typedef {{ title: string, contents: string }} CodeFile
 * @typedef {{
 *   main: CodeFile,
 *   dek: string,
 *   components: CodeFile[],
 *   componentModules: CodeFile[],
 *   modules: CodeFile[],
 *   componentComponents: CodeFile[],
 *   jsons: CodeFile[],
 *   csvs: CodeFile[]
 * }} ExampleContent
 */

/** @param {string} example */
function getComponentJsPaths(example) {
	return example.match(/\.\.\/.+\.js/gm);
}

/** @param {string} str */
function cleanContents(str) {
	return str.replace(/\t/g, '  ').trim();
}

/** @param {string} example */
function getJsonPaths(example) {
	const match = example.match(/\.\/.+\.json/gm);
	if (match) {
		return match.map(/** @param {string} d */ d => d.replace('../../', ''));
	}
	return [];
}

/** @param {string} example */
function getJsPaths(example) {
	const match = example.match(/\.\/.+\.js('|")/gm);
	if (match) {
		return match.map(/** @param {string} d */ d => d.replace('../../', '').replace(/('|")/g, ''));
	}
	return [];
}

/** @param {string} example */
function getCsvPaths(example) {
	const match = example.match(/\.\/.+\.csv/gm);
	if (match) {
		return match.map(/** @param {string} d */ d => d.replace('../../', ''));
	}
	return [];
}

/** @param {string} example */
function cleanMain(example) {
	const cleaned = example
		.replace(/\t/g, '  ')
		.replace(/\.\.\/\.\.\//g, './')
		.trim();

	return cleaned;
}

/** @param {string} example */
function getComponentPaths(example) {
	const match = example.match(/\.?\.\/.+svelte/gm);
	if (match) {
		return match.map(/** @param {string} d */ d => d.replace('../../', ''));
	}
	return [];
}

/**
 * Read an example page and every file it imports, so the site can show them
 * as code tabs, zip them up and send them to the Svelte Playground.
 * @param {string} slug The example's file name without `.svelte`
 * @param {{ examplesDir: string, contentDir: string }} dirs Where the example
 *   pages and their markdown descriptions live
 * @returns {ExampleContent}
 */
export default function getExampleContent(slug, { examplesDir, contentDir }) {
	const examplePath = `${examplesDir}/${slug}.svelte`;

	if (!existsSync(examplePath)) {
		error(404, `Not found: ${slug}`);
	}

	const example = readFileSync(examplePath, 'utf-8');

	const main = {
		title: '+page.svelte',
		contents: cleanMain(example)
	};

	const dekPath = `${contentDir}/${slug}.md`;
	const dek = existsSync(dekPath) ? readFileSync(dekPath, 'utf-8') : '';

	const components = getComponentPaths(example).map(
		/** @param {string} d */ d => {
			return {
				title: `./${d}`,
				contents: cleanContents(readFileSync(`src/${d}`, 'utf-8'))
			};
		}
	);

	const modules = getJsPaths(example).map(
		/** @param {string} d */ d => {
			return {
				title: d.replace('../', ''),
				contents: cleanContents(readFileSync(d.replace('../', 'src/'), 'utf-8'))
			};
		}
	);

	const jsons = getJsonPaths(example).map(
		/** @param {string} d */ d => {
			return {
				title: d.replace('../', ''),
				contents: cleanContents(readFileSync(d.replace('../', 'src/'), 'utf-8'))
			};
		}
	);

	const csvs = getCsvPaths(example).map(
		/** @param {string} d */ d => {
			return {
				title: d.replace('../', ''),
				contents: cleanContents(readFileSync(d.replace('../', 'src/'), 'utf-8'))
			};
		}
	);

	const componentSources = components.map(d => d.contents).join('');

	const componentModulesMatches = getComponentJsPaths(componentSources);
	const componentModules =
		componentModulesMatches === null
			? []
			: componentModulesMatches.map(
					/** @param {string} d */ d => {
						return {
							title: d.replace('../', './'),
							contents: cleanContents(readFileSync(d.replace('../', 'src/'), 'utf-8'))
						};
					}
				);

	const componentComponentMatches = getComponentPaths(componentSources);
	const componentComponents =
		componentComponentMatches === null
			? []
			: componentComponentMatches.map(
					/** @param {string} d */ d => {
						return {
							title: d.replace('./', './_components/'),
							contents: cleanContents(readFileSync(d.replace('./', 'src/_components/'), 'utf-8'))
						};
					}
				);

	return {
		main,
		dek,
		components,
		modules,
		componentModules,
		componentComponents,
		csvs,
		jsons
	};
}
