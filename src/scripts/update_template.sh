# fetch svelte-app
rm -rf src/scripts/svelte-app
node_modules/.bin/degit mhkeller/layercake-template#main src/scripts/svelte-app

# remove App.svelte (will be recreated client-side) and node_modules
rm -rf src/scripts/svelte-app/src/routes/index.svelte
rm -rf src/scripts/svelte-app/node_modules
rm -rf src/scripts/svelte-app/src/routes/_data
# mkdir src/scripts/svelte-app/src/routes/data
rm -rf src/scripts/svelte-app/src/routes/_components
# mkdir src/scripts/svelte-app/src/routes/components

# build svelte-app.json
node src/scripts/build-svelte-app-json.js `find src/scripts/svelte-app -type f`
