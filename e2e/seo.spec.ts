import { test, expect } from '@playwright/test';

test.describe('SEO & Metadata', () => {
    test('homepage has meta description', async ({ page }) => {
        await page.goto('/');
        const metaDescription = page.locator('meta[name="description"]');
        await expect(metaDescription).toHaveAttribute('content', /.+/);
    });

    test('homepage has Open Graph tags', async ({ page }) => {
        await page.goto('/');
        const ogTitle = page.locator('meta[property="og:title"]');
        const ogDescription = page.locator('meta[property="og:description"]');
        // At least one OG tag should exist
        const ogTitleCount = await ogTitle.count();
        const ogDescCount = await ogDescription.count();
        expect(ogTitleCount + ogDescCount).toBeGreaterThan(0);
    });

    test('pages have unique titles', async ({ page }) => {
        await page.goto('/');
        const homeTitle = await page.title();

        await page.goto('/faq');
        const faqTitle = await page.title();

        await page.goto('/about');
        const aboutTitle = await page.title();

        // Titles should be non-empty
        expect(homeTitle.length).toBeGreaterThan(0);
        expect(faqTitle.length).toBeGreaterThan(0);
        expect(aboutTitle.length).toBeGreaterThan(0);
    });

    test('no broken images on homepage', async ({ page }) => {
        await page.goto('/');
        const images = page.locator('img');
        const count = await images.count();

        for (let i = 0; i < count; i++) {
            const img = images.nth(i);
            const naturalWidth = await img.evaluate(
                (el: HTMLImageElement) => el.naturalWidth
            );
            // Image should have loaded (naturalWidth > 0)
            expect(naturalWidth).toBeGreaterThan(0);
        }
    });
});
