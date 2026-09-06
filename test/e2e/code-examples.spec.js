import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';

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

	const filePath = 'test/tmp/download/' + download.suggestedFilename();
	await download.saveAs(filePath);

	// The zip holds the starter template plus the example's own files. do-not-zip
	// stores files without compression, so names and contents can be read
	// straight out of the archive.
	const zip = readFileSync(filePath);
	for (const name of [
		'package.json',
		'static/favicon.png',
		'src/routes/+page.svelte',
		'src/routes/_components/Bar.svelte',
		'src/routes/_data/groups.csv'
	]) {
		expect(zip.includes(name), `${name} is in the zip`).toBe(true);
	}
	// The example page is in there as written, and the favicon is still a PNG
	expect(zip.includes(`import Bar from './_components/Bar.svelte'`)).toBe(true);
	expect(zip.includes(Buffer.from([0x89, 0x50, 0x4e, 0x47]))).toBe(true);
	// The template's package.json pins layercake
	expect(zip.includes('"layercake": "')).toBe(true);
});
