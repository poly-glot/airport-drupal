import {
  normalizeCanvasComponentTreeSlot,
  type CanvasComponentTreeElement,
  type CanvasComponentTreeSlot,
} from '@drupal-canvas/headless';

const BEFORE_MAIN = new Set(['js-notice-bar', 'js-site-header']);
const AFTER_MAIN = new Set(['js-site-footer']);

type Region = 'before' | 'main' | 'after';

function roots(content: CanvasComponentTreeElement) {
  return content.element === 'renderless-container'
    ? normalizeCanvasComponentTreeSlot(content.slots?.default ?? [])
    : [content];
}

function container(nodes: CanvasComponentTreeSlot[]): CanvasComponentTreeElement {
  return { element: 'renderless-container', slots: { default: nodes } };
}

export function pageRegions(content: CanvasComponentTreeElement): Record<Region, CanvasComponentTreeElement> {
  const regions: Record<Region, CanvasComponentTreeSlot[]> = { before: [], main: [], after: [] };

  for (const node of roots(content)) {
    const element = typeof node === 'string' ? '' : node.element;
    const region = BEFORE_MAIN.has(element) ? 'before' : AFTER_MAIN.has(element) ? 'after' : 'main';
    regions[region].push(node);
  }

  return { before: container(regions.before), main: container(regions.main), after: container(regions.after) };
}
