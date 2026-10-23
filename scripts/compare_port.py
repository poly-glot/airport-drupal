import difflib
import os
import re
import sys
import urllib.request
from pathlib import Path

from bs4 import BeautifulSoup, Comment, NavigableString

sys.path.insert(0, str(Path(__file__).resolve().parent))
from build_seed import STATIC, URL_STYLES, rewrite_links

STYLE = os.environ.get('PORT_URL_STYLE', 'drupal')
TO_URL = URL_STYLES[STYLE]
BASE = os.environ.get('PORT_BASE_URL', 'https://airport-drupal.ddev.site' if STYLE == 'drupal' else 'http://localhost:8831')
WHITESPACE = re.compile(r'\s+')
VOID = {'meta', 'link', 'img', 'source', 'input', 'br', 'hr'}
IGNORED_ATTRIBUTES = {'data-component-id', 'data-component-variant'}
IGNORED_ELEMENTS = {'script'}


def canonical_lines(node, depth=0):
    pad = '  ' * depth
    if isinstance(node, Comment) or getattr(node, 'name', None) in IGNORED_ELEMENTS:
        return []
    if isinstance(node, NavigableString):
        text = WHITESPACE.sub(' ', str(node)).strip()
        return [pad + text] if text else []
    attributes = []
    for name in sorted(set(node.attrs) - IGNORED_ATTRIBUTES):
        value = node.attrs[name]
        if isinstance(value, list):
            value = ' '.join(sorted(value))
        attributes.append(f'{name}="{WHITESPACE.sub(" ", str(value)).strip()}"')
    opening = f'{pad}<{node.name}{" " if attributes else ""}{" ".join(attributes)}>'
    lines = [opening]
    for child in node.children:
        lines.extend(canonical_lines(child, depth + 1))
    if node.name not in VOID:
        lines.append(f'{pad}</{node.name}>')
    return lines


def document_lines(html, from_static):
    soup = BeautifulSoup(html, 'html.parser')
    if from_static:
        rewrite_links(soup, TO_URL)
    return canonical_lines(soup.body)


def fetch(url):
    with urllib.request.urlopen(BASE + url) as response:
        return response.read().decode()


def pages():
    for path in sorted(STATIC.rglob('*.html')):
        if 'partials' in path.parts:
            continue
        yield path.relative_to(STATIC)


def main():
    only = sys.argv[1:]
    failures = 0
    for page in pages():
        if only and not any(str(page).startswith(prefix) for prefix in only):
            continue
        url = TO_URL('/' + str(page))
        expected = document_lines((STATIC / page).read_text(), from_static=True)
        try:
            actual = document_lines(fetch(url), from_static=False)
        except Exception as error:
            print(f'FAIL {url}: {error}')
            failures += 1
            continue
        diff = list(difflib.unified_diff(expected, actual, 'static', STYLE, n=2, lineterm=''))
        if diff:
            failures += 1
            print(f'FAIL {url} ({len(diff)} diff lines)')
            print('\n'.join(diff[:60]))
        else:
            print(f'ok   {url}')
    print(f'\n{failures} page(s) differ')
    sys.exit(1 if failures else 0)


if __name__ == '__main__':
    main()
