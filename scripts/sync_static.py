import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
STATIC_CSS = ROOT / 'static' / 'assets' / 'css'
STATIC_JS = ROOT / 'static' / 'assets' / 'js' / 'site.js'
THEME = ROOT / 'drupal' / 'web' / 'themes' / 'custom' / 'meridian'
COMPONENTS = THEME / 'components'
INDENT = '    '

CSS_OWNERS = {
    'base/tokens.css': {'': 'css/base/tokens.css'},
    'base/base.css': {'': 'css/base/base.css'},
    'base/layout.css': {'': 'css/base/layout.css'},
    'components/utilities.css': {'': 'css/base/utilities.css'},
    'components/button.css': {'': 'button'},
    'components/form.css': {'': 'form'},
    'components/notice-bar.css': {'': 'notice-bar'},
    'components/header.css': {'': 'site-header'},
    'components/hero.css': {'': 'hero'},
    'components/page-hero.css': {'': 'page-hero', 'breadcrumb': 'breadcrumb'},
    'components/section-head.css': {'': 'section-head'},
    'components/card.css': {'': 'card'},
    'components/testimonial.css': {'': 'testimonial'},
    'components/tabs.css': {'': 'components/flight-board/tabs.css'},
    'components/board.css': {'': 'flight-board'},
    'components/photo-band.css': {'': 'photo-band', 'stats': 'stat'},
    'components/package.css': {'': 'package'},
    'components/city-rail.css': {'': 'city-rail', 'city-card': 'city-card'},
    'components/help-list.css': {'': 'help-list', 'help-item': 'help-item'},
    'components/tower.css': {'': 'tower', 'towers': 'tower-grid'},
    'components/row-link.css': {'': 'row-link'},
    'components/map.css': {'': 'map-pane', 'getting-here': 'getting-here'},
    'components/content.css': {
        'prose': 'prose', 'media': 'page-hero', 'table': 'data-table', 'accordion': 'accordion',
        'callout': 'callout', 'facts': 'facts', 'facts__': 'fact', 'status': 'status',
    },
    'components/footer.css': {'': 'site-footer'},
}

JS_OWNERS = {
    'site-header': ['enhanceMenu'],
    'notice-bar': ['enhanceNotices'],
    'flight-board': ['enhanceTabs', 'enhanceBoardSearch', 'enhanceSplitFlap', 'enhanceStatusTips'],
    'city-rail': ['enhanceCityRail'],
    'hero': ['enhanceHeroSky'],
}

BLOCK = re.compile(r'(?P<head>[^{}]+)\{(?P<body>(?:[^{}]|\{[^{}]*\})*)\}\n?', re.S)
FIRST_CLASS = re.compile(r'\s*\.([\w-]+)')
DECLARATION_START = re.compile(r'^((async )?function |const |let |document\.|[A-Za-z_]\w*\(.*\);$)')
INIT_LINE = re.compile(r"^(?:document\.querySelectorAll\('(?P<selector>[^']+)'\)\.forEach\((?P<fn>\w+)\)|(?P<call>\w+)\(\));$")


def theme_path(target):
    return THEME / (target if '/' in target else f'components/{target}/{target}.css')


def owner_of(selector, owners):
    match = FIRST_CLASS.match(selector.split(',')[0])
    token = match.group(1) if match else ''
    prefixes = sorted((prefix for prefix in owners if token.startswith(prefix)), key=len)
    return owners[prefixes[-1]] if prefixes else None


def import_order():
    return re.findall(r'@import url\("([^"]+)"\)', (STATIC_CSS / 'site.css').read_text())


def css_outputs():
    outputs = {}
    for static_name in import_order():
        owners = CSS_OWNERS[static_name]
        text = re.sub(r'/\*.*?\*/\n?', '', (STATIC_CSS / static_name).read_text(), flags=re.S)
        for block in BLOCK.finditer(text):
            head = block.group('head').strip()
            if head.startswith('@media'):
                per_owner = {}
                for inner in BLOCK.finditer(block.group('body')):
                    target = owner_of(inner.group('head').strip(), owners)
                    if target:
                        per_owner.setdefault(target, []).append(inner.group(0).strip('\n'))
                for target, rules in per_owner.items():
                    outputs.setdefault(target, []).append(f'{head} {{\n' + '\n\n'.join(rules) + '\n}')
            else:
                target = owner_of(head, owners)
                if target:
                    outputs.setdefault(target, []).append(block.group(0).strip('\n'))
    return {theme_path(target): '\n\n'.join(blocks) + '\n' for target, blocks in outputs.items()}


def declarations():
    lines = STATIC_JS.read_text().splitlines()
    starts = [index for index, line in enumerate(lines) if DECLARATION_START.match(line)]
    chunks = []
    for start, end in zip(starts, starts[1:] + [len(lines)]):
        text = '\n'.join(lines[start:end]).rstrip('\n')
        name_match = re.match(r'(?:async function |function |const |let )(\w+)', text)
        chunks.append((name_match.group(1) if name_match else None, text))
    return chunks


def closure(entry_names, chunks):
    named = {name: text for name, text in chunks if name}
    wanted = set(entry_names)
    grown = True
    while grown:
        grown = False
        for name in list(wanted):
            for other in named:
                if other not in wanted and re.search(rf'\b{other}\b', named[name]):
                    wanted.add(other)
                    grown = True
    return [text for name, text in chunks if name in wanted]


def behaviour(component, entry_names, chunks):
    camel = ''.join(part.capitalize() for part in component.split('-'))
    calls = []
    for _, text in chunks:
        match = INIT_LINE.match(text)
        if not match:
            continue
        if match.group('fn') in entry_names:
            calls.append(f"once('meridian-{component}-{match.group('fn')}', '{match.group('selector')}', context).forEach({match.group('fn')});")
        elif match.group('call') in entry_names:
            calls.append(f"once('meridian-{component}-{match.group('call')}', 'body', context).forEach({match.group('call')});")
    body = '\n'.join(INDENT * 3 + call for call in calls)
    return f'{INDENT}Drupal.behaviors.meridian{camel} = {{\n{INDENT * 2}attach(context) {{\n{body}\n{INDENT * 2}}},\n{INDENT}}};'


def indent(text):
    return '\n'.join(INDENT + line if line else line for line in text.splitlines())


def js_outputs():
    chunks = declarations()
    outputs = {}
    for component, entry_names in JS_OWNERS.items():
        parts = [indent(text) for text in closure(entry_names, chunks)] + [behaviour(component, entry_names, chunks)]
        outputs[COMPONENTS / component / f'{component}.js'] = '(function (Drupal, once) {\n' + '\n\n'.join(parts) + '\n})(Drupal, once);\n'
    return outputs


def generated():
    return {**css_outputs(), **js_outputs()}


def present():
    return set(COMPONENTS.glob('*/*.css')) | set(COMPONENTS.glob('*/*.js')) | set((THEME / 'css').glob('**/*.css'))


def check():
    files = generated()
    problems = [f'{path.relative_to(ROOT)}: differs from static' for path, text in files.items() if not path.exists() or path.read_text() != text]
    problems += [f'{path.relative_to(ROOT)}: not generated from static' for path in sorted(present() - set(files))]
    return problems


def write():
    files = generated()
    for path, text in files.items():
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(text)
    stray = sorted(present() - set(files))
    print(f'wrote {len(files)} files from static' + (f'; not generated: {", ".join(str(p.relative_to(ROOT)) for p in stray)}' if stray else ''))


if __name__ == '__main__':
    if '--check' in sys.argv:
        problems = check()
        print('\n'.join(problems) or 'theme css and js match static')
        sys.exit(1 if problems else 0)
    write()
