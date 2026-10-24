import { expect, test } from '@playwright/test';

test.describe('homepage behaviours', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/', { waitUntil: 'networkidle' });
    });

    test('notice bar steps between notices', async ({ page }) => {
        const bar = page.getByRole('region', { name: 'Travel notices' });
        await expect(bar).toHaveAttribute('data-enhanced', '');

        const notices = page.locator('[data-notice-bar-item]');
        await expect(notices.nth(0)).toBeVisible();
        await expect(notices.nth(1)).toBeHidden();

        await notices.nth(0).locator('[data-notice-bar-step="next"]').click();
        await expect(notices.nth(1)).toBeVisible();
        await expect(notices.nth(0)).toBeHidden();
    });

    test('flight board tabs and search', async ({ page }) => {
        const board = page.locator('[data-board-enhanced]');
        await expect(board).toHaveAttribute('data-tabs-enhanced', '');

        const tabs = board.locator('[data-tabs-tab]');
        await tabs.nth(1).click();
        await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');
        await tabs.nth(0).click();

        const search = board.locator('[data-board-search] input').first();
        await search.fill('zzzz');
        await expect(board.locator('[data-board-row]:visible')).toHaveCount(0);
        await expect(board.getByText('No flights match "zzzz"', { exact: false }).first()).toBeVisible();
    });

    test('city rail scrolls and counts', async ({ page }) => {
        await expect(page.locator('[data-enhanced]:has([data-city-rail-track])')).toHaveCount(1);
        await expect(page.locator('[data-city-rail-count]')).toHaveText(/\d/);
    });

    test('hero sky picks a variant', async ({ page }) => {
        await page.goto('/?sky=evening-cloudy', { waitUntil: 'networkidle' });
        const hero = page.locator('[data-weather]');
        await expect(hero).toHaveAttribute('data-sky', 'evening-cloudy');
        await expect(page.locator('[data-hero-condition]')).toHaveText('cloudy');
        await expect(page.locator('[data-hero-weather-icon="evening"]')).toBeVisible();
    });
});

test('menu opens and closes on a phone', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'phone', 'The menu toggle only shows at phone width');
    await page.goto('/', { waitUntil: 'networkidle' });

    const header = page.getByRole('banner');
    const toggle = page.locator('[data-header-menu-toggle]');
    await expect(header).toHaveAttribute('data-enhanced', '');

    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Escape');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
});
