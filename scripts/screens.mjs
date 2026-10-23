import puppeteer from 'puppeteer-core';

const [base, outDir, pathsCsv, widthsCsv = '1440,390'] = process.argv.slice(2);
const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
    executablePath: process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
});

for (const width of widthsCsv.split(',').map(Number)) {
    const page = await browser.newPage();
    await page.setViewport({ width, height: 900, deviceScaleFactor: 1 });

    for (const path of pathsCsv.split(',')) {
        await page.goto(`${base}/${path}`, { waitUntil: 'networkidle0' });
        await page.evaluate(() => document.fonts.ready);
        await page.evaluate(async () => {
            const step = window.innerHeight;
            const pause = () => new Promise((resolve) => setTimeout(resolve, 150));
            for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
                window.scrollTo(0, y);
                await pause();
            }
            await Promise.all([...document.images].filter((image) => !image.complete).map((image) => new Promise((resolve) => { image.onload = image.onerror = resolve; })));
            window.scrollTo(0, 0);
            await pause();
        });
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
        const name = (path.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '') || 'home') + `-${width}.png`;
        await page.screenshot({ path: `${outDir}/${name}`, fullPage: true });
        console.log(name, overflow > 0 ? `OVERFLOW ${overflow}px` : 'ok');
    }

    await page.close();
}

await browser.close();
