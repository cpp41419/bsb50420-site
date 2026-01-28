import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
    test('FAQ page loads', async ({ page }) => {
        await page.goto('/faq');
        await expect(page).toHaveURL('/faq');
        await expect(page.locator('body')).toBeVisible();
    });

    test('About page loads', async ({ page }) => {
        await page.goto('/about');
        await expect(page).toHaveURL('/about');
        await expect(page.locator('body')).toBeVisible();
    });

    test('Contact page loads', async ({ page }) => {
        await page.goto('/contact');
        await expect(page).toHaveURL('/contact');
        await expect(page.locator('body')).toBeVisible();
    });

    test('Units page loads', async ({ page }) => {
        await page.goto('/units');
        await expect(page).toHaveURL('/units');
        await expect(page.locator('body')).toBeVisible();
    });

    test('Quiz page loads', async ({ page }) => {
        await page.goto('/quiz');
        await expect(page).toHaveURL('/quiz');
        await expect(page.locator('body')).toBeVisible();
    });
});
