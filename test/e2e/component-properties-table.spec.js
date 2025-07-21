import { test, expect } from '@playwright/test';
import { readdirSync } from 'fs';

// For each component page it is checked whether the table is matching the stored ARIA snapshot.
// Compoonent pages with no properties are skipped.

const componentFilenames = readdirSync('./docs/components').filter(i => i.endsWith('svelte.html'));

componentFilenames.forEach(filename => {
	const url = `/components/${filename.replace('.svelte.html', '.svelte')}`;

	test(`Property table content for ${url}`, async ({ page }) => {
		await page.goto(url);

		const codeContent = await page.textContent('div.contents pre');
		test.skip(!codeContent.includes('export let'), `No properties table in '${url}'`);

		await expect(page.locator('div#params-table table')).toMatchAriaSnapshot();
	});
});
