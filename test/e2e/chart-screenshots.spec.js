import { test, expect } from '@playwright/test';

import { readdirSync } from 'fs';

const componentFilenames = readdirSync('./docs/components').filter(i => i.endsWith('svelte.html'));

componentFilenames.forEach(filename => {
	const url = `/components/${filename.replace('.svelte.html', '.svelte')}`;

	test(`Chart Snapshot for ${url}`, async ({ page }) => {
		// Skip non-deterministic and slow charts
		test.skip(url === '/components/CirclePack.html.svelte', `Chart Snapshot for ${url} skipped.`);
		test.skip(url === '/components/CirclePackForce.svelte', `Chart Snapshot for ${url} skipped.`);

		await page.goto(url);
		await expect(page.locator('.chart-hero')).toHaveScreenshot();
	});
});
