import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
    test('should load successfully', async ({ page }) => {
        await page.goto('/');
        await expect(page).toHaveTitle(/./); // Has some title
        await expect(page.locator('body')).toBeVisible();
    });

    test('should have navigation elements', async ({ page }) => {
        await page.goto('/');
        // Check for common navigation elements
        const header = page.locator('header');
        await expect(header).toBeVisible();
    });

    test('should be responsive on mobile', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto('/');
        await expect(page.locator('body')).toBeVisible();
        // Content should not overflow horizontally
        const body = page.locator('body');
        const boundingBox = await body.boundingBox();
        expect(boundingBox?.width).toBeLessThanOrEqual(375);
    });
});
