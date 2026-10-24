import CanvasComponentTree from '@drupal-canvas/headless-next/CanvasComponentTree';
import { fetchPage, isPageRedirect, toNextMetadata } from '@drupal-canvas/headless-next';
import { fetchPage as fetchPublishedPage } from '@drupal-canvas/headless/server';
import type { Metadata } from 'next';
import { unstable_cache } from 'next/cache';
import { draftMode } from 'next/headers';
import { notFound, permanentRedirect, redirect } from 'next/navigation';
import { cache } from 'react';
import { pageRegions } from '../../lib/page-regions';

export const dynamic = 'force-dynamic';

interface CatchAllPageProps {
    params: Promise<{ slug?: string[] }>;
}

const PUBLISHED_PAGE_SECONDS = 60;

const getPublishedPage = unstable_cache(
    (path: string) => fetchPublishedPage(path, { baseUrl: process.env.CANVAS_SITE_URL ?? '' }),
    ['canvas-published-page'],
    { revalidate: PUBLISHED_PAGE_SECONDS },
);

const getPage = cache(async (path: string) =>
    (await draftMode()).isEnabled ? fetchPage(path) : getPublishedPage(path),
);

async function getPath(params: CatchAllPageProps['params']) {
    const { slug } = await params;
    return `/${(slug ?? []).map(encodeURIComponent).join('/')}`;
}

export async function generateMetadata({ params }: CatchAllPageProps): Promise<Metadata> {
    const page = await getPage(await getPath(params));
    return page && !isPageRedirect(page) ? toNextMetadata(page.head) : {};
}

export default async function CatchAllPage({ params }: CatchAllPageProps) {
    const page = await getPage(await getPath(params));

    if (!page) {
        notFound();
    }

    if (isPageRedirect(page)) {
        const { statusCode, url } = page.redirect;
        if (statusCode === 301 || statusCode === 308) {
            permanentRedirect(url);
        }
        redirect(url);
    }

    if (!page.content) {
        notFound();
    }

    const draft = await draftMode();
    if (draft.isEnabled) {
        return <CanvasComponentTree tree={page.content} context={page.context} />;
    }

    const { before, main, after } = pageRegions(page.content);

    return (
        <>
            <CanvasComponentTree tree={before} context={page.context} />
            <main id="main" tabIndex={-1}>
                <CanvasComponentTree tree={main} context={page.context} />
            </main>
            <CanvasComponentTree tree={after} context={page.context} />
        </>
    );
}
