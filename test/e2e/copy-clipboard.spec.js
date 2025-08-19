import { test, expect } from '@playwright/test';

const urls = ['/components/AxisRadial.svelte', '/example/Bar', '/example-ssr/ScatterWebgl'];

urls.forEach(url => {
	test(`Clicking copy on "${url}" copies code to clipboard`, async ({ browser }) => {
		const context = await browser.newContext({
			permissions: ['clipboard-read', 'clipboard-write']
		});
		const page = await context.newPage();

		await page.goto(url);
		const contentsText = await page.locator('#contents-container').innerText();
		await page.click('.copy');
		const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
		expect(clipboardText).toBe(contentsText);
	});
});
