import { test, expect } from '@playwright/test';

import { readdirSync } from 'fs';

const componentFilenames = readdirSync('./docs/components').filter(i => i.endsWith('svelte.html'));
componentFilenames.forEach(filename => {
	const url = `/components/${filename.replace('.svelte.html', '.svelte')}`;

	test(`Snapshot for ${url}`, async ({ page }) => {
		let options = {};
		if (
			url.endsWith('CirclePack.html.svelte') ||
			url.endsWith('CirclePackForce.svelte') ||
			url.endsWith('BeeswarmForce.svelte')
		) {
			options['maxDiffPixelRatio'] = 0.01;
			options['timeout'] = 10000;
		}

		await page.goto(url);
		await expect(page.locator('.chart-hero')).toHaveScreenshot(options);
	});
});

const exampleFilenames = readdirSync('./docs/example').filter(i => i.endsWith('.html'));
exampleFilenames.forEach(filename => {
	const url = `/example/${filename.replace('.html', '')}`;

	test(`Snapshot for ${url}`, async ({ page }) => {
		let options = {};
		if (url.endsWith('CirclePackForce')) {
			options['maxDiffPixelRatio'] = 0.01;
			options['timeout'] = 10000;
		}
		await page.goto(url);
		await expect(page.locator('.chart-hero')).toHaveScreenshot(options);
	});
});

const exampleSsrFilenames = readdirSync('./docs/example-ssr').filter(i => i.endsWith('.html'));
exampleSsrFilenames.forEach(filename => {
	const url = `/example-ssr/${filename.replace('.html', '')}`;

	test(`Snapshot for ${url}`, async ({ page }) => {
		let options = {};
		await page.goto(url);
		await expect(page.locator('.chart-hero')).toHaveScreenshot(options);
	});
});
