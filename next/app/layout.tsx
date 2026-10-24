import { CanvasRuntime } from '@drupal-canvas/headless-next/CanvasRuntime';
import type { ReactNode } from 'react';
import { DraftIndicator } from '../components/draft-indicator';
import './globals.css';

const FONTS =
    'https://fonts.googleapis.com/css2?family=Oswald:wght@500&family=Source+Serif+4:opsz,wght@8..60,600&family=Plus+Jakarta+Sans:wght@600;700;800&family=Public+Sans:wght@400;500;600;700&display=swap';

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en-GB">
            <head>
                <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                <link rel="stylesheet" href={FONTS} />
            </head>
            <body>
                <a className="skip-link" href="#main">
                    Skip to main content
                </a>
                <CanvasRuntime>
                    <DraftIndicator />
                    {children}
                </CanvasRuntime>
            </body>
        </html>
    );
}
