import { test, expect } from '@playwright/test';
import { readdirSync } from 'fs';

// <Canvas> covers the whole chart container and paints with its origin moved to
// the chart area. These tests read the real element and its pixels instead of
// comparing screenshots.

const canvasPages = readdirSync('./docs/components')
	.filter(f => f.endsWith('.canvas.svelte.html'))
	.map(f => f.replace('.html', ''));

canvasPages.forEach(slug => {
	test(`<Canvas> covers the container and paints on /components/${slug}`, async ({ page }) => {
		await page.goto(`/components/${slug}`);

		const measure = () =>
			page.evaluate(() => {
				const container = document.querySelector('.chart-hero .layercake-container');
				const canvas = container?.querySelector('canvas.layercake-layout-canvas');
				if (!container || !canvas) return null;
				const c = container.getBoundingClientRect();
				const r = canvas.getBoundingClientRect();
				const dpr = window.devicePixelRatio || 1;
				const data = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height).data;
				let painted = false;
				for (let i = 3; i < data.length; i += 4) {
					if (data[i] > 0) {
						painted = true;
						break;
					}
				}
				return {
					painted,
					sameBox:
						Math.abs(c.x - r.x) < 1 &&
						Math.abs(c.y - r.y) < 1 &&
						Math.abs(c.width - r.width) < 1 &&
						Math.abs(c.height - r.height) < 1,
					bufferMatchesBox:
						Math.abs(canvas.width - r.width * dpr) < 2 &&
						Math.abs(canvas.height - r.height * dpr) < 2
				};
			});

		// The first paint lands after the container is measured, so poll for it
		await expect
			.poll(measure)
			.toMatchObject({ painted: true, sameBox: true, bufferMatchesBox: true });
	});
});

// The Scatter example draws the same points on an Svg layer and on a Canvas
// layer. When the canvas origin is moved by the padding correctly, the canvas
// is painted under the centre of every <circle> the Svg drew.
test('canvas points line up with the svg points on /example/Scatter', async ({ page }) => {
	await page.goto('/example/Scatter');

	const compare = () =>
		page.evaluate(() => {
			const container = document.querySelector('.chart-hero .layercake-container');
			const canvas = container?.querySelector('canvas.layercake-layout-canvas');
			const circles = container
				? [...container.querySelectorAll('.layercake-layout-svg circle')]
				: [];
			if (!canvas || circles.length === 0) return null;
			const ctx = canvas.getContext('2d');
			const box = canvas.getBoundingClientRect();
			const dpr = window.devicePixelRatio || 1;
			let hits = 0;
			for (const circle of circles) {
				const b = circle.getBoundingClientRect();
				const x = Math.round((b.x + b.width / 2 - box.x) * dpr);
				const y = Math.round((b.y + b.height / 2 - box.y) * dpr);
				if (ctx.getImageData(x, y, 1, 1).data[3] > 0) hits++;
			}
			return { circles: circles.length, hits };
		});

	await expect
		.poll(async () => {
			const r = await compare();
			return r ? r.hits === r.circles && r.circles > 0 : false;
		})
		.toBe(true);
});

// MapLayered puts two components on one <Canvas>: white state shapes, then a
// dark dot for each state too small to label. The dots sit inside states, so
// dark pixels only show up if both layers painted and the dots came out on top.
test('two components share one canvas, painted in order, on /example/MapLayered', async ({
	page
}) => {
	await page.goto('/example/MapLayered');

	const count = () =>
		page.evaluate(() => {
			const canvas = document.querySelector('.chart-hero canvas.layercake-layout-canvas');
			if (!canvas) return null;
			const data = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height).data;
			let white = 0;
			let dark = 0;
			for (let i = 0; i < data.length; i += 4) {
				if (data[i + 3] < 200) continue;
				if (data[i] > 240 && data[i + 1] > 240 && data[i + 2] > 240) white++;
				else if (data[i] < 70 && data[i + 1] < 70 && data[i + 2] < 70) dark++;
			}
			return { white, dark };
		});

	await expect
		.poll(async () => {
			const r = await count();
			return r ? r.white > 1000 && r.dark > 20 : false;
		})
		.toBe(true);
});
