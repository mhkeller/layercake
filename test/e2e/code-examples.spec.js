import { test, expect } from '@playwright/test';
import { existsSync, statSync } from 'fs';

const groups = ['example', 'example-ssr'];

groups.forEach(path => {
	test(`Navigate between code samples for "${path}/Bar"`, async ({ page }) => {
		await page.goto(`${path}/Bar`);

		// Wait for the page to be fully loaded
		await page.waitForLoadState('networkidle');
		// Using has-text here to avoid the ul intercepting the click
		// https://github.com/microsoft/playwright/issues/12821#issuecomment-1069630780
		await page.click(`li:has-text('./_components/Bar.svelte')`);
		await expect(page.locator('#contents-container')).toContainText(`Generates an SVG bar chart.`);

		await page.click(`li:has-text('+page.svelte')`);
		await expect(page.locator('#contents-container')).toContainText(
			`import Bar from './_components/Bar.svelte';`
		);
	});
});

test(`Download zip file`, async ({ page }) => {
	await page.goto(`example/Bar`);

	// Wait for the page to be fully loaded
	await page.waitForLoadState('networkidle');

	// Start waiting for download before clicking
	const downloadPromise = page.waitForEvent('download');
	await page.getByRole('button', { name: 'Download' }).click();
	const download = await downloadPromise;

	const suggestedFileName = download.suggestedFilename();
	const filePath = 'test/tmp/download/' + suggestedFileName;
	await download.saveAs(filePath);
	expect(existsSync(filePath)).toBeTruthy();

	// check that the zip file size is not zero
	const fileStats = statSync(filePath);
	expect(fileStats.size).toBeGreaterThan(65 * 1024);
});
