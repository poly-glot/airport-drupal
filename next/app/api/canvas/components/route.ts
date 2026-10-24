import { createComponentMetadataHandler } from '@drupal-canvas/headless-next';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const { GET, OPTIONS } = createComponentMetadataHandler();
