import { error, json } from '@sveltejs/kit';
import * as fs from 'fs';

function getComponentJsPaths(example) {
	return example.match(/\.\.\/.+\.js/gm);
}

function cleanContents(str) {
	return str.replace(/\t/g, '  ').trim();
}

function getJsonPaths(example) {
	const match = example.match(/\.\/.+\.json/gm);
	if (match) {
		return match.map((d) => d.replace('../../', ''));
	}
	return [];
}

function getJsPaths(example) {
	const match = example.match(/\.\/.+\.js('|")/gm);
	if (match) {
		return match.map((d) => d.replace('../../', '').replace(/('|")/g, ''));
	}
	return [];
}

function getCsvPaths(example) {
	const match = example.match(/\.\/.+\.csv/gm);
	if (match) {
		return match.map((d) => d.replace('../../', ''));
	}
	return [];
}

function cleanMain(example) {
	const cleaned = example
		.replace(/\t/g, '  ')
		.replace(/\.\.\/\.\.\//g, './')
		.trim();

	return cleaned;
}

function getComponentPaths(example) {
	const match = example.match(/\.?\.\/.+svelte/gm);
	if (match) {
		return match.map((d) => d.replace('../../', ''));
	}
	return [];
}

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET({ params }) {
	// the `slug` parameter is available because
	// this file is called [slug].json.js
	const { slug } = params;

	const examplePath = `src/routes/_examples/${slug}.svelte`;

	if (!fs.existsSync(examplePath)) {
		error(404, `Not found: ${slug}`);
	}

	const example = fs.readFileSync(examplePath, 'utf-8');

	const fromMain = cleanMain(example);

	const main = {
		title: '+page.svelte',
		contents: fromMain
	};

	const dekPath = `src/content/examples/${slug}.md`;
	const dek = fs.existsSync(dekPath) ? fs.readFileSync(dekPath, 'utf-8') : '';

	const components = getComponentPaths(example).map((d) => {
		return {
			title: `./${d}`,
			contents: cleanContents(fs.readFileSync(`src/${d}`, 'utf-8'))
		};
	});

	const modules = getJsPaths(example).map((d) => {
		return {
			title: d.replace('../', ''),
			contents: cleanContents(fs.readFileSync(d.replace('../', 'src/'), 'utf-8'))
		};
	});

	const jsons = getJsonPaths(example).map((d) => {
		return {
			title: d.replace('../', ''),
			contents: cleanContents(fs.readFileSync(d.replace('../', 'src/'), 'utf-8'))
		};
	});

	const csvs = getCsvPaths(example).map((d) => {
		return {
			title: d.replace('../', ''),
			contents: cleanContents(fs.readFileSync(d.replace('./../', 'src/'), 'utf-8'))
		};
	});

	const componentModulesMatches = getComponentJsPaths(components.map((d) => d.contents).join(''));
	const componentModules =
		componentModulesMatches === null
			? []
			: componentModulesMatches.map((d) => {
					return {
						title: d.replace('../', './'),
						contents: cleanContents(fs.readFileSync(d.replace('../', 'src/'), 'utf-8'))
					};
				});

	const componentComponentMatches = getComponentPaths(components.map((d) => d.contents).join(''));
	const componentComponents =
		componentComponentMatches === null
			? []
			: componentComponentMatches.map((d) => {
					// console.log('d', d, d.replace('./', './_components/'));
					return {
						title: d.replace('./', './_components/'),
						contents: cleanContents(fs.readFileSync(d.replace('./', 'src/_components/'), 'utf-8'))
					};
				});

	// console.log(componentComponents);

	const response = {
		main,
		dek,
		components,
		modules,
		componentModules,
		componentComponents,
		csvs,
		jsons
	};

	return json(response);
}
