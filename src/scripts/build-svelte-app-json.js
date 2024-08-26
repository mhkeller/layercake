import * as fs from 'fs';

const files = [];

for (const path of process.argv.slice(2)) {
	if (!path.includes('.DS_Store') && !path.includes('svelte.config.js.template')) {
		files.push({ path: path.split('svelte-app/')[1], data: fs.readFileSync(path).toString() });
	}
}

// `svelte-check` gets confused by having another `svelte.config.js` file so it's renamed
// to `svelte.config.js.template` in `update_template.sh` and added manually below
files.push({
	path: 'svelte.config.js',
	data: fs.readFileSync('src/scripts/svelte-app/svelte.config.js.template').toString()
});

const templatePkg = JSON.parse(fs.readFileSync('src/scripts/svelte-app/package.json', 'utf-8'));

fs.writeFileSync(`static/svelte-app.json`, JSON.stringify(files));

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
const allDeps = {
	...pkg.dependencies,
	...pkg.devDependencies,
	layercake: templatePkg.dependencies.layercake
};
fs.writeFileSync('static/deps.json', JSON.stringify(allDeps));
