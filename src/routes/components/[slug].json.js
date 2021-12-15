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

export function get(req, res, next) {
	// the `slug` parameter is available because
	// this file is called [slug].json.js
	const { slug } = req.params;

	const componentPath = `src/components/${slug}`;

	if (!existsSync(componentPath)) {
		res.writeHead(404, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify({
			message: `Not found: ${slug}`
		}));
		return;
	}

	const component = readFileSync(componentPath, 'utf-8');

	const fromMain = cleanMain(component);

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

	const jsdocString = fromMain.replace('<script>', '')
		.split('</script>')[0]
		.split('*/')[0]
		.replace('/**', '')
		.replace(/@type/g, '@param')
		.trim();

	const jsdocParsed = doctrine.parse(jsdocString, { unwrap: true, sloppy: true });

	// console.log(JSON.stringify(jsdocParsed, null, 2));
	const response = {
		main,
		dek,
		usedIn,
		jsdocParsed
	};

	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(JSON.stringify(response));
}
