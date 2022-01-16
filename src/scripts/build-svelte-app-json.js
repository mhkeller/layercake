import * as fs from 'fs';

const files = [];

for (const path of process.argv.slice(2)) {
	if (!path.includes('/.')) {
		files.push({ path: path.split('svelte-app/')[1], data: fs.readFileSync(path).toString() });
	}
}

const templatePkg = JSON.parse(fs.readFileSync('src/scripts/svelte-app/package.json', 'utf-8'));

fs.writeFileSync(`static/svelte-app.json`, JSON.stringify(files));

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
const allDeps = { ...pkg.dependencies, ...pkg.devDependencies, layercake: templatePkg.dependencies.layercake };
fs.writeFileSync('static/deps.json', JSON.stringify(allDeps));
