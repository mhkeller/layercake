import { error, json } from '@sveltejs/kit';
import { readFileSync, existsSync, readdirSync } from 'fs';
// parseJsdoc lives with the site modules so it doesn't ship in the npm package
import parseJsdoc from '../../../_modules/parseJsdoc.js';

/**
 * @typedef {{
 *   kind: string,
 *   type: string,
 *   name: string,
 *   required: boolean,
 *   defaultValue: string | null,
 *   description: string
 * }} JsdocProp
 */

/** @param {string} str */
function cleanMain(str) {
	const cleaned = str
		.replace(/\t/g, '  ')
		.replace(/\.\.\/\.\.\//g, './')
		.trim();

	return cleaned;
}

/** @param {string} str */
function cleanContents(str) {
	return str.replace(/\t/g, '  ').trim();
}

/** @param {string} example */
function getJsPaths(example) {
	const match = example.match(/\.\/.+\.js('|")/gm);
	if (match) {
		return match.map(/** @param {string} d */ d => d.replace('../../', '').replace(/('|")/g, ''));
	}
	return [];
}

/**
 * @param {string} dir
 * @returns {string[]}
 */
function readdirFilterSync(dir) {
	return readdirSync(dir)
		.filter(/** @param {string} name */ name => name.endsWith('.svelte'))
		.map(/** @param {string} name */ name => `${dir}/${name}`);
}

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET({ params }) {
	// SvelteKit fills in `slug` from the [slug] folder name
	const { slug } = params;

	const componentPath = `src/_components/${slug}`;

	if (!existsSync(componentPath)) {
		error(404, `Not found: ${slug}`);
	}

	const component = readFileSync(componentPath, 'utf-8');

	const fromMain = cleanMain(component);

	const modules = getJsPaths(component).map(
		/** @param {string} d */ d => {
			return {
				slug: d.replace('../', ''),
				contents: cleanContents(readFileSync(d.replace('./', 'src/'), 'utf-8'))
			};
		}
	);

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
			matches: readdirFilterSync(d)
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
					const name = q.path.split('/').pop()?.replace('.svelte', '') ?? '';
					return `/example${i === 1 ? '-ssr' : ''}/${name}`;
				})
		};
	});

	// Wrapper components like SmallMultipleWrapper have no @component comment.
	// They get an empty description.
	const componentDescription =
		fromMain.split('<script>')[0].replace('<!--', '').replace('-->', '').split('@component')[1] ||
		'';
	// Only read `@property` lines from the `Props` typedef block, so fields of
	// other typedefs (annotation configs, arrow configs and so on) don't show up
	// as component props
	const commentBlocks = fromMain.match(/\/\*\*[^]*?\*\//g) || [];
	const propsBlock =
		commentBlocks.find(
			/** @param {string} block */ block => block.includes('@typedef {Object} Props')
		) || '';
	const jsdocPropertyMatches = propsBlock.matchAll(/(@property [^\n]*)/gm);
	const propertiesDefaultValues = fromMain.match(/let\s+\{([\s\S]*?)\} = \$props/m);
	/** @type {Record<string, string>} */
	let defaultValues = {};
	if (propertiesDefaultValues) {
		// split at comma, but not in parens of function parameters
		defaultValues = propertiesDefaultValues[1]
			.split(/,(?![^(]*\))/g)
			.map(/** @param {string} i */ i => i.trim())
			.filter(/** @param {string} i */ i => i !== 'children')
			.reduce((acc, item) => {
				const [key, value] = item.split(' = ');
				acc[key] = value;
				return acc;
			}, /** @type {Record<string, string>} */ ({}));
	}

	const jsdocParsed = [...jsdocPropertyMatches]
		.map(match => {
			const [, jsdocComment] = match;
			let parsed = parseJsdoc(jsdocComment);
			if (parsed) {
				// Prefer the default written in the code. A prop can have no default in
				// the destructure and still document one that it applies further down.
				// In that case keep the default from the JSDoc.
				const codeDefault = defaultValues[parsed['name']];
				if (codeDefault !== undefined)
					parsed['defaultValue'] = codeDefault.replace('$bindable()', '');
			}
			return /** @type {JsdocProp | null} */ (parsed);
		})
		.filter(
			/**
			 * @param {JsdocProp | null} i
			 * @returns {i is JsdocProp}
			 */
			i => i !== null
		);

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
