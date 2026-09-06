import { json } from '@sveltejs/kit';
import getTemplateFiles from '../../_modules/getTemplateFiles.js';
import pkg from '../../../package.json';

// The Download button fetches this on click, so no page links to it.
// svelte.config.js lists it in prerender.entries.
export const prerender = true;

// The version of every package the site has installed. The Download button
// pins the packages an example imports to these, so the zip installs what the
// example was built against. The template decides which layercake to use.
export async function GET() {
	const { packageJson } = await getTemplateFiles();
	return json({
		...pkg.dependencies,
		...pkg.devDependencies,
		layercake: packageJson.dependencies.layercake
	});
}
