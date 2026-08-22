import { test, expect } from '@playwright/test';

// The clipboard is one shared thing on the machine, so these tests have to take
// turns. Run in parallel they overwrite each other's text in between the copy and
// the read. CI already runs one worker at a time – this makes local runs match.
test.describe.configure({ mode: 'default' });

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
		await page.waitForTimeout(1000);
		const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
		expect(clipboardText).toBe(contentsText);
	});
});
