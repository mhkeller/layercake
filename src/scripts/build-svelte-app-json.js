import * as fs from 'fs';

const files = [];

for (const path of process.argv.slice(2)) {
	if (!path.includes('/.')) {
		files.push({ path: path.split('svelte-app/')[1], data: fs.readFileSync(path).toString() });
	}
}

fs.writeFileSync(`static/svelte-app.json`, JSON.stringify(files));

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };
fs.writeFileSync('static/deps.json', JSON.stringify(allDeps));
