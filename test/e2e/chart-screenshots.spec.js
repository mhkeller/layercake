import { test, expect } from '@playwright/test';

import { readdirSync } from 'fs';

const options = {
	threshold: 0.2
};

const componentFilenames = readdirSync('./docs/components').filter(i => i.endsWith('svelte.html'));
componentFilenames.forEach(filename => {
	const url = `/components/${filename.replace('.svelte.html', '.svelte')}`;

	test(`Snapshot for ${url}`, async ({ page }) => {
		const timeout =
			url.endsWith('CirclePack.html.svelte') ||
			url.endsWith('CirclePackForce.svelte') ||
			url.endsWith('BeeswarmForce.svelte')
				? 10_000
				: undefined; // use default

		await page.goto(url);
		await expect(page.locator('.chart-hero')).toHaveScreenshot({ ...options, timeout });
	});
});

const exampleFilenames = readdirSync('./docs/example').filter(i => i.endsWith('.html'));
exampleFilenames.forEach(filename => {
	const url = `/example/${filename.replace('.html', '')}`;
	test(`Snapshot for ${url}`, async ({ page }) => {
		const timeout = url.endsWith('CirclePackForce') ? 10_000 : undefined;

		await page.goto(url);
		await expect(page.locator('.chart-hero')).toHaveScreenshot({ ...options, timeout });
	});
});

const exampleSsrFilenames = readdirSync('./docs/example-ssr').filter(i => i.endsWith('.html'));
exampleSsrFilenames.forEach(filename => {
	const url = `/example-ssr/${filename.replace('.html', '')}`;

	test(`Snapshot for ${url}`, async ({ page }) => {
		const maxDiffPixels = url.endsWith('AreaStacked')
			? 520
			: url.endsWith('MultiLine')
				? 15
				: undefined;

		await page.goto(url);
		await expect(page.locator('.chart-hero')).toHaveScreenshot({ ...options, maxDiffPixels });
	});
});
