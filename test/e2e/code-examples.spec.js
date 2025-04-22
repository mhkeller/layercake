import { test, expect } from '@playwright/test';

import { existsSync, statSync } from 'fs';

['example', 'example-ssr'].forEach(path => {
	test(`Navigate between code samples for "${path}/Bar"`, async ({ page }) => {
		await page.goto(`${path}/Bar`);
		await page.getByText('./_components/Bar.svelte', { exact: true }).click();
		await expect(page.locator('#contents-container')).toContainText(`Generates an SVG bar chart.`);

		await page.getByText('+page.svelte', { exact: true }).click();
		await expect(page.locator('#contents-container')).toContainText(
			`import Bar from './_components/Bar.svelte';`
		);
	});
});

test(`Download zip file`, async ({ page }) => {
	await page.goto(`example/Bar`);

	const downloadPromise = page.waitForEvent('download');
	await page.getByTitle('download zip file').click();
	const download = await downloadPromise;

	const suggestedFileName = download.suggestedFilename();
	const filePath = 'download/' + suggestedFileName;
	await download.saveAs(filePath);
	expect(existsSync(filePath)).toBeTruthy();

	// check that the zip file size is not zero
	const fileStats = statSync(filePath);
	expect(fileStats.size).toBeGreaterThan(65 * 1024);
});
