import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Not found',
};

export default function NotFound() {
    return (
        <main id="main" tabIndex={-1}>
            <h1>Not found</h1>
        </main>
    );
}
