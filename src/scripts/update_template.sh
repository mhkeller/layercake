# fetch svelte-app
rm -rf src/scripts/svelte-app
node_modules/.bin/degit mhkeller/layercake-template#main src/scripts/svelte-app

# remove App.svelte (will be recreated client-side) and node_modules
rm -rf src/scripts/svelte-app/src/routes/+page.svelte
rm -rf src/scripts/svelte-app/node_modules
rm -rf src/scripts/svelte-app/src/routes/_data
# mkdir src/scripts/svelte-app/src/routes/data
rm -rf src/scripts/svelte-app/src/routes/_components
# mkdir src/scripts/svelte-app/src/routes/components

# `svelte-check` gets confused by having another `svelte.config.js`,
# so it's renamed and manually added in `build-svelte-app-json.js`
mv src/scripts/svelte-app/svelte.config.js src/scripts/svelte-app/svelte.config.js.template

# build svelte-app.json
node src/scripts/build-svelte-app-json.js `find src/scripts/svelte-app -type f`
