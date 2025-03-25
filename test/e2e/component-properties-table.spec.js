import { test, expect } from '@playwright/test';

import { readdirSync } from 'fs';

const componentFilenames = readdirSync('./docs/components')
	.filter(i => i.endsWith('svelte.html'))
	.filter(
		i =>
			![
				'AreaStacked.svelte.html',
				'BarStacked.svelte.html',
				'ColumnStacked.svelte.html',
				'GroupLabels.html.svelte.html'
			].includes(i)
	);
componentFilenames.forEach(filename => {
	const url = `/components/${filename.replace('.svelte.html', '.svelte')}`;

	test(`Property table content for ${url}`, async ({ page }) => {
		await page.goto(url);
		await expect(page.locator('div#params-table table')).toMatchAriaSnapshot();
	});
});

['AreaStacked.svelte', 'BarStacked.svelte', 'ColumnStacked.svelte', 'GroupLabels.html.svelte'];
