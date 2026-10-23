import pathlib
import re
import sys

import yaml

from sync_static import check as static_drift

ROOT = pathlib.Path(__file__).resolve().parent.parent
COMPONENTS = ROOT / 'drupal' / 'web' / 'themes' / 'custom' / 'meridian' / 'components'

HEX_IN_TWIG = re.compile(r'(?<![\w"#:(])#[0-9a-fA-F]{3,8}\b')
HEX_IN_TWIG_ALLOWED = re.compile(r'(href|url\(|xlink:href|id|aria-\w+|for|headers|aria-describedby)=?"?#')
ALLOWED_PROP_TYPES = {'string', 'integer', 'number', 'boolean'}


def check_twig(component):
    problems = []
    for path in component.rglob('*.twig'):
        for number, line in enumerate(path.read_text().splitlines(), 1):
            if '{#' in line or '<!--' in line:
                problems.append(f'{path.relative_to(ROOT)}:{number}: comment')
            for match in HEX_IN_TWIG.finditer(line):
                before = line[max(0, match.start() - 24):match.start() + 1]
                if not HEX_IN_TWIG_ALLOWED.search(before):
                    problems.append(f'{path.relative_to(ROOT)}:{number}: raw hex {match.group(0)}')
    return problems


def check_metadata(component):
    problems = []
    for path in component.glob('*.component.yml'):
        for number, line in enumerate(path.read_text().splitlines(), 1):
            if line.lstrip().startswith('#'):
                problems.append(f'{path.relative_to(ROOT)}:{number}: comment')
        data = yaml.safe_load(path.read_text())
        if not data.get('name') or data.get('status') != 'stable':
            problems.append(f'{path.relative_to(ROOT)}: name or status missing')
        for name, prop in (data.get('props') or {}).get('properties', {}).items():
            if '$ref' in prop:
                continue
            if 'title' not in prop or 'examples' not in prop:
                problems.append(f'{path.relative_to(ROOT)}: prop {name} needs title and examples')
            if prop.get('type') not in ALLOWED_PROP_TYPES:
                problems.append(f'{path.relative_to(ROOT)}: prop {name} type {prop.get("type")} not allowed')
    if not (component / 'README.md').exists():
        problems.append(f'{component.relative_to(ROOT)}: README.md missing')
    return problems


def main():
    problems = static_drift()
    for component in sorted(p for p in COMPONENTS.iterdir() if p.is_dir()):
        problems += check_twig(component)
        problems += check_metadata(component)
    print('\n'.join(problems) or f'design battery ok: {sum(1 for p in COMPONENTS.iterdir() if p.is_dir())} components')
    sys.exit(1 if problems else 0)


if __name__ == '__main__':
    main()
