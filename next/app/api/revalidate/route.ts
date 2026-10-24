import { timingSafeEqual } from 'node:crypto';
import { revalidateTag } from 'next/cache';
import { PUBLISHED_PAGES_TAG } from '@/lib/page-cache';

export const dynamic = 'force-dynamic';

function isAuthorised(header: string | null) {
    const secret = process.env.REVALIDATE_SECRET;
    if (!secret || !header) {
        return false;
    }

    const expected = Buffer.from(`Bearer ${secret}`);
    const given = Buffer.from(header);

    return expected.length === given.length && timingSafeEqual(expected, given);
}

export function POST(request: Request) {
    if (!isAuthorised(request.headers.get('authorization'))) {
        return new Response(null, { status: 401 });
    }

    revalidateTag(PUBLISHED_PAGES_TAG, { expire: 0 });

    return new Response(null, { status: 204 });
}
