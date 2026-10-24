import { createElement } from 'react';
import {
  normalizeCanvasComponentTreeSlot,
  type CanvasComponentTreeSlot,
} from '@drupal-canvas/headless';

const ROOT_ELEMENT = /^\s*<([a-z][\w-]*)([^>]*)>([\s\S]*)<\/\1>\s*$/i;
const ATTRIBUTE = /([^\s=]+)(?:="([^"]*)")?/g;
const ENTITY = /&(amp|quot|lt|gt|#0?39);/g;
const ENTITIES: Record<string, string> = { amp: '&', quot: '"', lt: '<', gt: '>', '#039': "'", '#39': "'" };
const REACT_NAMES: Record<string, string> = { class: 'className', tabindex: 'tabIndex', for: 'htmlFor' };

const BEFORE_MAIN = new Set(['meridian:notice-bar', 'meridian:site-header']);
const AFTER_MAIN = new Set(['meridian:site-footer']);

interface Block {
  tag: string;
  props: Record<string, string | boolean>;
  inner: string;
}

function decode(value: string) {
  return value.replace(ENTITY, (_, name: string) => ENTITIES[name]);
}

function reactProps(source: string) {
  return Object.fromEntries(
    [...source.matchAll(ATTRIBUTE)].map(([, name, value]) => [
      REACT_NAMES[name] ?? name,
      value === undefined ? true : decode(value),
    ]),
  );
}

function markupStrings(slot: CanvasComponentTreeSlot): string[] {
  return normalizeCanvasComponentTreeSlot(slot).flatMap((child) =>
    typeof child === 'string'
      ? [child]
      : Object.values(child.slots ?? {}).flatMap(markupStrings),
  );
}

function toBlock(html: string): Block {
  const match = html.match(ROOT_ELEMENT);
  if (!match) {
    throw new Error(`Canvas markup has no single root element: ${html.slice(0, 80)}`);
  }

  const [, tag, attributes, inner] = match;
  return { tag, props: reactProps(attributes), inner };
}

function render(blocks: Block[]) {
  return blocks.map(({ tag, props, inner }, index) =>
    createElement(tag, {
      ...props,
      key: index,
      suppressHydrationWarning: true,
      dangerouslySetInnerHTML: { __html: inner },
    }),
  );
}

export function PageMarkup({ tree }: { tree: CanvasComponentTreeSlot }) {
  const blocks = markupStrings(tree).filter((html) => html.trim()).map(toBlock);
  const componentOf = (block: Block) => String(block.props['data-component-id']);

  const before = blocks.filter((block) => BEFORE_MAIN.has(componentOf(block)));
  const after = blocks.filter((block) => AFTER_MAIN.has(componentOf(block)));
  const content = blocks.filter((block) => !BEFORE_MAIN.has(componentOf(block)) && !AFTER_MAIN.has(componentOf(block)));

  return (
    <>
      {render(before)}
      <main id="main" tabIndex={-1}>
        {render(content)}
      </main>
      {render(after)}
    </>
  );
}
