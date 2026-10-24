import { expect, test } from '@playwright/test';

const API_ONLY = 'One viewport is enough for an API check';

test('revalidation refuses a request without the secret', async ({ request }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop', API_ONLY);

    const response = await request.post('/api/revalidate');
    expect(response.status()).toBe(401);
});

test('revalidation refuses a request with the wrong secret', async ({ request }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop', API_ONLY);

    const response = await request.post('/api/revalidate', { headers: { authorization: 'Bearer not-the-secret' } });
    expect(response.status()).toBe(401);
});
