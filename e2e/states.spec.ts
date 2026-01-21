import { test, expect } from '@playwright/test';

const states = ['nsw', 'vic', 'qld', 'wa', 'sa', 'tas', 'nt', 'act'];

test.describe('State Pages', () => {
    test('States index page loads', async ({ page }) => {
        await page.goto('/states');
        await expect(page).toHaveURL('/states');
        await expect(page.locator('body')).toBeVisible();
    });

    for (const state of states) {
        test(`${state.toUpperCase()} state page loads`, async ({ page }) => {
            await page.goto(`/states/${state}`);
            await expect(page).toHaveURL(`/states/${state}`);
            await expect(page.locator('body')).toBeVisible();
        });
    }
});
