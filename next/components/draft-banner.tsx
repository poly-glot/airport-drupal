'use client';

import { DraftSession } from '@drupal-canvas/headless-next/client';

export function DraftBanner(props: {
    tokenExpiresAt: number | null;
    initialExpired: boolean;
    renewUrl: string | null;
    editorOrigin: string | null;
}) {
    return (
        <DraftSession {...props}>
            {({ embedded, expired, path, renewUrl }) => {
                if (expired) {
                    return (
                        <div role="status">
                            <strong>Draft preview session expired.</strong> Showing only content visible to anonymous
                            visitors.
                            {!embedded && renewUrl && (
                                <a href={`${renewUrl}?path=${encodeURIComponent(path)}`}>Renew session</a>
                            )}
                            <ExitDraftModeButton />
                        </div>
                    );
                }

                if (embedded) {
                    return null;
                }

                return (
                    <div role="status">
                        <strong>Draft mode is active.</strong> You may be seeing unpublished content.
                        <ExitDraftModeButton />
                    </div>
                );
            }}
        </DraftSession>
    );
}

function ExitDraftModeButton() {
    return (
        <form method="POST" action="/api/disable-draft">
            <button type="submit">Exit draft mode</button>
        </form>
    );
}
