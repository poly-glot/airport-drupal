import { expect, test } from '@playwright/test';
import { shippedPages } from './pages';

for (const { path, title, description } of shippedPages) {
    test(`${path} renders cleanly`, async ({ page }) => {
        const consoleErrors: string[] = [];
        const failedRequests: string[] = [];
        page.on('console', (message) => message.type() === 'error' && consoleErrors.push(message.text()));
        page.on('pageerror', (error) => consoleErrors.push(error.message));
        page.on(
            'response',
            (response) => response.status() >= 400 && failedRequests.push(`${response.status()} ${response.url()}`),
        );

        const response = await page.goto(path, { waitUntil: 'networkidle' });

        expect(response?.status()).toBe(200);
        await expect(page.locator('main#main')).toHaveCount(1);
        await expect(page).toHaveTitle(title);
        await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', description);
        expect(failedRequests).toEqual([]);
        expect(consoleErrors).toEqual([]);
    });
}
