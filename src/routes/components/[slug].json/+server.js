import { error, json } from '@sveltejs/kit';
import { readFileSync, existsSync } from 'fs';
import { readdirFilterSync } from 'indian-ocean';
import parseJsdoc from '$lib/helpers/parseJsdoc.js';

function cleanMain(str) {
	const cleaned = str
		.replace(/\t/g, '  ')
		.replace(/\.\.\/\.\.\//g, './')
		.trim();

	return cleaned;
}

function cleanContents(str) {
	return str.replace(/\t/g, '  ').trim();
}

function getJsPaths(example) {
	const match = example.match(/\.\/.+\.js('|")/gm);
	if (match) {
		return match.map(d => d.replace('../../', '').replace(/('|")/g, ''));
	}
	return [];
}

export async function GET({ params }) {
	// the `slug` parameter is available because
	// this file is called [slug].json.js
	const { slug } = params;

	const componentPath = `src/_components/${slug}`;

	if (!existsSync(componentPath)) {
		error(404, `Not found: ${slug}`);
	}

	const component = readFileSync(componentPath, 'utf-8');

	const fromMain = cleanMain(component);

	const modules = getJsPaths(component).map(d => {
		return {
			slug: d.replace('../', ''),
			contents: cleanContents(readFileSync(d.replace('./', 'src/'), 'utf-8'))
		};
	});

	const main = {
		slug,
		contents: fromMain
	};

	const dekPath = `src/content/components/${slug}.md`;
	const dek = existsSync(dekPath) ? readFileSync(dekPath, 'utf-8') : '';

	const examplePaths = ['src/routes/_examples', 'src/routes/_examples_ssr'];
	const usedIn = examplePaths.map((d, i) => {
		return {
			group: i === 0 ? 'Regular' : 'SSR',
			matches: readdirFilterSync(d, { fullPath: true })
				.map(q => {
					return {
						path: q,
						contents: readFileSync(q, 'utf-8')
					};
				})
				.filter(q => {
					return q.contents.includes(slug);
				})
				.map(q => {
					const name = q.path.split('/').pop().replace('.svelte', '');
					return `/example${i === 1 ? '-ssr' : ''}/${name}`;
				})
		};
	});

	const componentDescription = fromMain
		.split('<script>')[0]
		.replace('<!--', '')
		.replace('-->', '')
		.split('@component')[1];
	const jsdocPropertyMatches = fromMain.matchAll(/(@property [^\n]*)/gm);
	const propertiesDefaultValues = fromMain.match(/let\s+\{([\s\S]*?)\} = \$props/m);
	let defaultValues = {};
	if (propertiesDefaultValues) {
		// split at comma, but not in parens of function parameters
		defaultValues = propertiesDefaultValues[1]
			.split(/,(?![^(]*\))/g)
			.map(i => i.trim())
			.filter(i => i !== 'children')
			.reduce((acc, item) => {
				const [key, value] = item.split(' = ');
				acc[key] = value;
				return acc;
			}, {});
	}

	const jsdocParsed = [...jsdocPropertyMatches]
		.map(match => {
			const [, jsdocComment] = match;
			let parsed = parseJsdoc(jsdocComment);
			if (parsed && parsed['name'] in defaultValues)
				parsed['defaultValue'] = defaultValues[parsed['name']]?.replace('$bindable()', '');
			return parsed;
		})
		.filter(i => i !== null);

	const response = {
		main,
		dek,
		usedIn,
		hasjsDoctable: jsdocParsed.length > 0,
		jsdocParsed,
		componentDescription,
		modules
	};

	return json(response);
}
