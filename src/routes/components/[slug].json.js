import { resolve } from 'path';
import { readFileSync, existsSync } from 'fs';
import { readdirFilterSync } from 'indian-ocean';
import doctrine from 'doctrine';

function cleanMain (str) {
	const cleaned = str
		.replace(/\t/g, '  ')
		.replace(/\.\.\/\.\.\//g, './')
		.trim();

	return cleaned;
}

function cleanContents (str) {
	return str.replace(/\t/g, '  ').trim();
}

function getJsPaths (example) {
	const match = example.match(/\.\/.+\.js('|")/gm);
	if (match) {
		return match.map(d => d.replace('../../', '').replace(/('|")/g, ''));
	}
	return [];
}

export async function get({ params }) {
	// the `slug` parameter is available because
	// this file is called [slug].json.js
	const { slug } = params;

	const componentPath = `src/components/${slug}`;

	if (!existsSync(componentPath)) {
		return {
			status: 404,
			headers: {
				'Content-Type': 'application/json'
			},
			body: {
				message: `Not found: ${slug}`
			}
		};
	}

	const component = readFileSync(componentPath, 'utf-8');

	const fromMain = cleanMain(component);

	const modules = getJsPaths(component)
		.map(d => {
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

	const componentDescription = doctrine.parse(fromMain.split('<script>')[0]
		.replace('<!--', '')
		.replace('-->', '')).tags[0].description;

	const jsdocString = fromMain.replace('<script>', '')
		.split('</script>')[0]
		.match(/\/\*\*.*/gm)
		.join('\n')
		.replaceAll('@type', '@param')
		.replaceAll('/**', '')
		.replaceAll('*/', '')
		.trim();

	const jsdocParsed = doctrine.parse(jsdocString, { unwrap: true, sloppy: true });

	const response = {
		main,
		dek,
		usedIn,
		jsdocParsed,
		componentDescription,
		modules
	};

	return {
		status: 200,
		headers: {
			'Content-Type': 'application/json'
		},
		body: response
	};
}
