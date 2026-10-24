import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { shippedPages } from './pages';

for (const { path: pagePath } of shippedPages) {
    test(`${pagePath} has no axe violations`, async ({ page }) => {
        await page.goto(pagePath, { waitUntil: 'networkidle' });

        const results = await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
            .analyze();

        expect(
            results.violations.map(
                ({ id, nodes }) => `${id}: ${nodes.map((node) => node.target.join(' ')).join(', ')}`,
            ),
        ).toEqual([]);
    });
}
