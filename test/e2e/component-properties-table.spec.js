import { test, expect } from '@playwright/test';
import { readdirSync } from 'fs';

const componentFilenames = readdirSync('./docs/components').filter(i => i.endsWith('svelte.html'));

componentFilenames.forEach(filename => {
	const url = `/components/${filename.replace('.svelte.html', '.svelte')}`;

	test(`Property table content for ${url}`, async ({ page }) => {
		await page.goto(url);

		const locator = page.locator('div#params-table table');
		test.skip((await locator.count()) === 0, `No properties table in '${url}'`);

		await expect(locator).toMatchAriaSnapshot();
	});
});
