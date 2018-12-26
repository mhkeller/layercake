// Support for ESM
require = require('esm')(module);

// Svelte SSR require register
require('svelte/ssr/register');

// Get app
const App = require('./svelte-ssr/App.html');

// Render
let { html, css, head } = App.render({});

// Output
console.log(`<!doctype html>
<html lang="en">
	<head>
    ${head}

		<style>
			${css ? css.code : ''}
		</style>
  </head>

	<body>
		${html}
	</body>
</html>
`);
