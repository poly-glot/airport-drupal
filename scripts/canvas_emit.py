import json
import re
import shutil

from bs4 import BeautifulSoup

from build_seed import (
    ROOT, STATIC, classes, drupal_url, element_children, inner_html, node_key, outer_html, page_paths, rewrite_links,
)

SEED = ROOT / 'drupal' / 'seed'
HOME_ALIAS = '/home'
TEMPLATE_ID = 'meridian'
HOME_TEMPLATE_ID = 'meridian_home'

GROUP_LAYOUTS = {
    'stack': 'stack', 'stack stack--lg': 'stack-lg', 'grid grid--2': 'grid-2', 'grid grid--3': 'grid-3',
    'split': 'split', 'split split--main-aside': 'split-main-aside',
}
FORM_KINDS = {
    'set-up-alerts': 'alerts', 'feedback': 'feedback', 'request': 'assistance',
    'report-lost-item': 'lost-property', 'quote': 'parking',
}
HELP_ICONS = {
    '/help/special-assistance': 'assistance', '/help/travelling-with-children': 'children',
    '/help/first-time-flying': 'first-flight', '/flights/alerts': 'alerts',
    '/help/baggage-and-lost-property': 'lost-property', '/help': 'contact',
    '/at-the-airport/security': 'security', '/at-the-airport/eat-and-drink': 'eat-and-drink',
    '/at-the-airport/shopping': 'shopping', '/at-the-airport/lounges': 'lounges',
}
TOWER_ICONS = {
    '/at-the-airport/security': 'security', '/at-the-airport/eat-and-drink': 'eat-and-drink',
    '/help/baggage-and-lost-property': 'baggage', '/at-the-airport#maps': 'maps',
}
SIGN_ICONS = {'/at-the-airport/shopping': 'shop', '/parking': 'parking', '/at-the-airport/lounges': 'fast-track'}
ROW_LINK_ICONS = {'train': 'train', 'car': 'car', 'bus': 'bus'}
PARAGRAPH_VARIANTS = (
    ({'card__text', 'u-tabular'}, 'card-text-tabular'), ({'card__text'}, 'card-text'),
    ({'package__note'}, 'package-note'), ({'form__small'}, 'form-small'),
)
STATUS_BY_WORD = {
    'On time': 'on-time', 'Boarding': 'boarding', 'Gate open': 'gate-open', 'Delayed': 'delayed',
    'Cancelled': 'cancelled', 'Landed': 'landed', 'Expected': 'expected',
}


def load_soup(page):
    soup = BeautifulSoup((STATIC / page).read_text(), 'html.parser')
    rewrite_links(soup, drupal_url)
    return soup


def plain(tag):
    return tag.get_text().strip()


def pick(tag, selector):
    found = tag.select_one(selector)
    return plain(found) if found else None


def pick_html(tag, selector):
    found = tag.select_one(selector)
    return inner_html(found) if found else None


def image_inputs(img, prefix='image'):
    return {
        f'{prefix}_src': re.sub(r'\.jpg$', '', img['src']),
        f'{prefix}_alt': img.get('alt') or None,
        f'{prefix}_width': int(img['width']) if img.get('width') else None,
        f'{prefix}_height': int(img['height']) if img.get('height') else None,
    }


def lookup_by_href(table, href):
    url = drupal_url(href)
    return table.get(url) or table.get(url.split('#')[0])


class Tree:
    def __init__(self, scope):
        self.scope = scope
        self.nodes = []
        self.gaps = []

    def add(self, component, inputs, parent=None, slot=None):
        uuid = node_key(f'{self.scope}#{len(self.nodes) + 1}')
        node = {'uuid': uuid, 'component_id': component if '.' in component else f'sdc.meridian.{component}'}
        if parent:
            node['parent_uuid'] = parent
            node['slot'] = slot
        node['inputs'] = {key: value for key, value in inputs.items() if value is not None and value is not False}
        self.nodes.append(node)
        return uuid


def gap(tree, tag, parent, slot, reason):
    label = f'{tag.name}.{".".join(classes(tag))}'
    tree.gaps.append(f'{tree.scope}: {reason}: {label}')
    tree.add('prose', {'body': outer_html(tag)}, parent, slot)


def breadcrumb(tree, nav, parent, slot):
    crumbs = tree.add('breadcrumb', {'on_dark': 'breadcrumb--on-dark' in classes(nav)}, parent, slot)
    for item in nav.select('li.breadcrumb__item'):
        link = item.find('a')
        tree.add('breadcrumb-item', {
            'label': plain(item), 'href': link['href'] if link else None, 'current': link is None,
        }, crumbs, 'items')


def form(tree, tag, parent, slot, kind, compact=False):
    tree.add('form', {'kind': kind, 'compact': compact}, parent, slot)


def emit_prose(tree, tag, parent, slot):
    tree.add('prose', {'body': inner_html(tag)}, parent, slot)


def emit_group(tree, tag, parent, slot):
    layout = GROUP_LAYOUTS.get(' '.join(classes(tag)))
    if layout is None:
        return gap(tree, tag, parent, slot, 'group layout')
    group = tree.add('group', {'layout': layout}, parent, slot)
    emit_children(tree, tag, group, 'parts')


def emit_facts(tree, tag, parent, slot):
    facts = tree.add('facts', {'variant': 'legend' if 'facts--legend' in classes(tag) else 'default'}, parent, slot)
    for item in element_children(tag):
        value = item.find('dd')
        tree.add('fact', {
            'term': inner_html(item.find('dt')), 'value': inner_html(value), 'id': value.get('id'),
        }, facts, 'items')


def emit_table(tree, tag, parent, slot):
    table = tag.find('table')
    caption = table.find('caption')
    table_copy = BeautifulSoup(str(table), 'html.parser').table
    if caption:
        table_copy.caption.extract()
    tree.add('data-table', {
        'caption': plain(caption) if caption else None,
        'caption_hidden': 'visually-hidden' in classes(caption) if caption else None,
        'body': inner_html(table_copy),
    }, parent, slot)


def emit_callout(tree, tag, parent, slot):
    copy = BeautifulSoup(str(tag), 'html.parser').div
    title = copy.find(class_='callout__title')
    if title:
        title.extract()
    tree.add('callout', {'title': plain(title) if title else None, 'body': inner_html(copy)}, parent, slot)


def emit_testimonial(tree, tag, parent, slot):
    tree.add('testimonial', {
        'quote': inner_html(tag.select_one('.testimonial__quote')),
        'name': plain(tag.select_one('.testimonial__name')),
        'meta': plain(tag.select_one('.testimonial__meta')),
    }, parent, slot)


def emit_package(tree, tag, parent, slot):
    amount = tag.select_one('.package__price')
    units = amount.select('.package__unit')
    best = tag.select_one('.package__best')
    cta = tag.select_one('.package__cta a')
    badge = tag.select_one('.package__badge')
    node = tree.add('package', {
        'tier': pick(tag, '.package__tier'),
        'price_prefix': plain(units[0]) if len(units) > 1 else None,
        'price': pick(amount, '.package__amount'),
        'unit': plain(units[-1]) if units else None,
        'badge': plain(badge) if badge else None,
        'meta': pick(tag, '.package__meta'),
        'best_label': pick(best, '.package__best-label'),
        'note': plain(best).removeprefix(pick(best, '.package__best-label') or '').strip(),
        'recommended': 'button--secondary' not in classes(cta),
        'cta_label': plain(cta),
        'href': cta['href'],
    }, parent, slot)
    for item in tag.select('li.package__item'):
        tree.add('package-feature', {'text': plain(item)}, node, 'features')


def emit_accordion(tree, tag, parent, slot):
    accordion = tree.add('accordion', {}, parent, slot)
    for item in tag.select('details.accordion__item'):
        tree.add('accordion-item', {
            'summary': plain(item.find('summary')), 'body': pick_html(item, '.accordion__body'),
        }, accordion, 'items')


def emit_row_links(tree, tag, parent, slot):
    emit_row_link_items(tree, tag, tree.add('ruled-list', {}, parent, slot), 'items')


def emit_row_link_items(tree, tag, parent, slot):
    for link in tag.select('a.row-link'):
        fragment = link['href'].split('#')[1] if '#' in link['href'] else None
        tree.add('row-link', {
            'icon': ROW_LINK_ICONS.get(fragment),
            'title': pick(link, '.row-link__title'), 'meta': pick(link, '.row-link__meta'), 'href': link['href'],
        }, parent, slot)


def emit_help_items(tree, tag, parent, slot):
    for link in tag.select('a.help-item'):
        tree.add('help-item', {
            'icon': lookup_by_href(HELP_ICONS, link['href']),
            'title': pick(link, '.help-item__title'), 'body': pick(link, '.help-item__body'), 'href': link['href'],
        }, parent, slot)


def emit_plain_help_list(tree, tag, parent, slot):
    node = tree.add('help-list', {'variant': 'plain'}, parent, slot)
    emit_help_items(tree, tag, node, 'items')


def emit_guide_card(tree, tag, parent, slot):
    tree.add('city-card', {
        'city': pick(tag, '.city-card__name'), 'meta': pick(tag, '.city-card__meta'),
        'body': pick(tag, '.city-card__body'), 'href': tag['href'], 'variant': 'guide',
        **image_inputs(tag.find('img')),
    }, parent, slot)


def emit_terminal_map(tree, tag, parent, slot):
    label = tag.find('svg')['aria-label']
    tree.add('terminal-map', {'terminal': 'terminal-1' if 'Terminal 1' in label else 'terminal-2'}, parent, slot)


def emit_form(tree, tag, parent, slot):
    kind = FORM_KINDS.get(tag.get('id'))
    if kind is None:
        return gap(tree, tag, parent, slot, 'form kind')
    form(tree, tag, parent, slot, kind)


def is_section_title(tag):
    return tag.name in ('h2', 'h3') and 'section-title--sm' in classes(tag)


def emit_section(tree, tag, parent, slot):
    children = element_children(tag)
    title = children[0] if children and is_section_title(children[0]) else None
    section = tree.add('section', {
        'anchor': tag.get('id'), 'last': 'section--last' in classes(tag), 'tone': 'light',
        'tag': tag.name, 'labelled_by': tag.get('aria-labelledby'),
        'heading': plain(title) if title else None, 'heading_level': title.name if title else 'h2',
    }, parent, slot)
    for child in children[1 if title else 0:]:
        emit(tree, child, section, 'parts')


def emit_card(tree, tag, parent, slot):
    children = element_children(tag)
    title = children[0] if children and 'card__title' in classes(children[0]) else None
    card = tree.add('card', {
        'tag': tag.name, 'heading': plain(title) if title else None,
        'heading_level': title.name if title else None, 'heading_id': title.get('id') if title else None,
        'padded': 'card--padded' in classes(tag),
    }, parent, slot)
    for child in children[1 if title else 0:]:
        emit(tree, child, card, 'parts')


def emit_heading(tree, tag, parent, slot):
    tree.add('heading', {
        'text': plain(tag), 'level': tag.name, 'id': tag.get('id'),
        'size': 'sm' if 'section-title--sm' in classes(tag) else 'default',
    }, parent, slot)


def emit_paragraph(tree, tag, parent, slot):
    names = classes(tag)
    variant = next((name for key, name in PARAGRAPH_VARIANTS if key <= set(names)), 'plain')
    tree.add('paragraph', {'body': inner_html(tag), 'variant': variant}, parent, slot)


def emit(tree, tag, parent, slot):
    names = classes(tag)
    if 'card' in names and tag.name in ('div', 'section') and 'card--padded' in names and not tag.find('form'):
        return emit_card(tree, tag, parent, slot)
    if tag.name in ('h2', 'h3') and 'section-title' in names:
        return emit_heading(tree, tag, parent, slot)
    if tag.name == 'h3' and names == ['card__title']:
        return tree.add('heading', {'text': plain(tag), 'level': 'h3', 'size': 'card'}, parent, slot)
    if tag.name == 'p':
        return emit_paragraph(tree, tag, parent, slot)
    if tag.name == 'div' and names == ['prose']:
        return emit_prose(tree, tag, parent, slot)
    if tag.name == 'div' and names and names[0] in ('stack', 'grid', 'split'):
        return emit_group(tree, tag, parent, slot)
    if tag.name == 'div' and names == ['package']:
        return emit_package(tree, tag, parent, slot)
    if tag.name == 'a' and 'city-card--guide' in names:
        return emit_guide_card(tree, tag, parent, slot)
    if tag.name == 'dl' and 'facts' in names:
        return emit_facts(tree, tag, parent, slot)
    if tag.name == 'div' and 'table-wrap' in names:
        return emit_table(tree, tag, parent, slot)
    if tag.name == 'figure' and 'testimonial' in names:
        return emit_testimonial(tree, tag, parent, slot)
    if tag.name == 'div' and 'callout' in names:
        return emit_callout(tree, tag, parent, slot)
    if tag.name == 'ul' and names == ['help-list']:
        return emit_plain_help_list(tree, tag, parent, slot)
    if tag.name == 'ul' and names == ['row-links']:
        return emit_row_links(tree, tag, parent, slot)
    if tag.name == 'div' and names == ['accordion']:
        return emit_accordion(tree, tag, parent, slot)
    if tag.name == 'form':
        return emit_form(tree, tag, parent, slot)
    if tag.name == 'div' and names == ['card'] and tag.find('svg', class_='map'):
        return emit_terminal_map(tree, tag, parent, slot)
    return gap(tree, tag, parent, slot, 'no component')


def emit_children(tree, tag, parent, slot):
    for child in element_children(tag):
        emit(tree, child, parent, slot)


def emit_page_hero(tree, tag):
    picture = tag.find('picture')
    img = picture.find('img') if picture else None
    widths = ','.join(re.findall(r'-(\d+)\.jpg', img['srcset'])) if img else None
    node = tree.add('page-hero', {
        'eyebrow': pick(tag, '.page-hero__eyebrow'), 'title': pick(tag, '.page-hero__title'),
        'intro': pick(tag, '.page-hero__intro'),
        'variant': 'art' if 'page-hero--with-art' in classes(tag) else 'sky',
        'widths': widths if widths and ',' in widths else None, 'sizes': img['sizes'].rsplit(', ', 1)[1] if img else None,
        **(image_inputs(img) if img else {}),
    })
    nav = tag.find('nav', class_='breadcrumb')
    if nav:
        breadcrumb(tree, nav, node, 'breadcrumb')


def emit_board(tree, tag):
    clock = pick(tag, '.board__updated')
    meta_span = tag.select_one('.board__meta > span:last-child')
    scope = {}
    for direction in ('departures', 'arrivals'):
        panel = tag.find(id=direction)
        foot = panel.select_one('.board__foot a.button')
        label = panel.select_one('.board__search label')
        scope[direction] = {
            'panel': panel, 'search_label': plain(label) if label else None,
            'caption': pick(panel, 'caption'), 'link': foot,
        }
    node = tree.add('flight-board', {
        'title': pick(tag, '.board__title'), 'title_id': tag.select_one('.board__title')['id'],
        'meta': plain(meta_span).removeprefix(f'Updated {clock} · '), 'clock_time': clock,
        'overlapped': 'board--overlapped' in classes(tag), 'show_search': tag.select_one('.board__search') is not None,
        'departures_search_label': scope['departures']['search_label'],
        'arrivals_search_label': scope['arrivals']['search_label'],
        'departures_caption': scope['departures']['caption'], 'arrivals_caption': scope['arrivals']['caption'],
        'all_departures_label': plain(scope['departures']['link']) if scope['departures']['link'] else None,
        'all_departures_href': scope['departures']['link']['href'] if scope['departures']['link'] else None,
        'all_arrivals_label': plain(scope['arrivals']['link']) if scope['arrivals']['link'] else None,
        'all_arrivals_href': scope['arrivals']['link']['href'] if scope['arrivals']['link'] else None,
    })
    for direction, details in scope.items():
        for row in details['panel'].select('tr.board__row'):
            emit_flight_row(tree, row, node, direction)


def emit_flight_row(tree, row, parent, slot):
    state = row.select_one('.board__state')
    gate = row.select_one('.board__gate')
    tree.add('flight-row', {
        'time': pick(row, '.board__time [data-flap]'), 'place': pick(row, '.board__place'),
        'flight': pick(row, '.board__flight'), 'terminal': pick(row, '.board__terminal'),
        'gate': plain(gate), 'gate_label': gate.get('data-flap-label'),
        'status': STATUS_BY_WORD[plain(state)], 'note': pick(row, '.board__info'),
        'tip': state.get('data-tip'), 'tip_id': state.get('aria-describedby'),
    }, parent, slot)


def emit_photo_band(tree, tag):
    title = tag.select_one('.photo-band__title')
    link = tag.select_one('.photo-band__content > a.text-link')
    hero = 'photo-band--hero' in classes(tag)
    node = tree.add('photo-band', {
        'title': plain(title), 'intro': pick(tag, '.photo-band__lede'),
        'variant': 'hero' if hero else 'band', 'heading_level': title.name,
        'anchor': tag.get('id'), 'title_id': title['id'],
        'link_label': plain(link), 'link_href': link['href'],
        **image_inputs(tag.find('img', class_='photo-band__img')),
    })
    nav = tag.find('nav', class_='breadcrumb')
    if nav:
        breadcrumb(tree, nav, node, 'breadcrumb')
    for item in tag.select('.stats__item'):
        tree.add('stat', {'label': plain(item.dt), 'value': plain(item.dd)}, node, 'facts')
    aside = tag.find('form')
    if aside:
        kind = 'parking'
        form(tree, aside, node, 'aside', kind, compact=aside.get('id') != 'quote')


def emit_home_hero(tree, tag):
    node = tree.add('hero', {
        'title': pick(tag, '.hero__title'), 'intro': pick(tag, '.hero__lede'), 'default_weather': tag['data-weather'],
    })
    for link in tag.select('a.sign'):
        tree.add('hero-sign', {
            'icon': lookup_by_href(SIGN_ICONS, link['href']), 'title': pick(link, '.sign__title'),
            'meta': pick(link, '.sign__sub'), 'href': link['href'],
        }, node, 'signs')
    form(tree, tag.find('form'), node, 'aside', 'flight-search')
    panel = tag.select_one('.wait-panel')
    wait = tree.add('wait-panel', {
        'updated': pick(panel, '.wait-panel__updated').split('updated')[1].strip(),
        'road_status': pick(panel, '.wait-panel__item--divided .wait-panel__value'),
    }, node, 'wait')
    for item in panel.select('.wait-panel__item'):
        chip = item.find('dd', class_='wait-chip')
        if chip:
            tone = next(name.split('--')[1] for name in classes(chip) if name.startswith('wait-chip--'))
            tree.add('wait-chip', {
                'label': pick(item, 'dt'), 'minutes': int(re.search(r'\d+', plain(chip))[0]), 'tone': tone,
            }, wait, 'chips')


def link_of(tag):
    link = tag.select_one('a.text-link')
    return (plain(link), link['href']) if link else (None, None)


def emit_city_rail(tree, tag):
    heading = BeautifulSoup(str(tag.find('h2')), 'html.parser').h2
    sub = heading.find(class_='section-title__sub')
    subtitle = plain(sub)
    sub.extract()
    label, href = link_of(tag.find(class_='city-rail__titles'))
    node = tree.add('city-rail', {
        'title': plain(heading), 'subtitle': subtitle, 'link_label': label, 'link_href': href,
        'anchor': tag.get('id'), 'title_id': tag.find('h2')['id'],
    })
    for card in tag.select('a.city-card'):
        tree.add('city-card', {
            'city': pick(card, '.city-card__name'), 'meta': pick(card, '.city-card__meta'), 'href': card['href'],
            'variant': 'rail', **image_inputs(card.find('img')),
        }, node, 'cards')


def emit_help_band(tree, tag):
    label, href = link_of(tag.find(class_='section-head'))
    node = tree.add('help-list', {
        'title': pick(tag, 'h2'), 'link_label': label, 'link_href': href, 'variant': 'band',
        'anchor': tag.get('id'), 'title_id': tag.find('h2')['id'],
    })
    emit_help_items(tree, tag, node, 'items')


def emit_tower_grid(tree, tag):
    label, href = link_of(tag.find(class_='section-head'))
    node = tree.add('tower-grid', {
        'title': pick(tag, 'h2'), 'intro': pick(tag, '.section-head__intro'), 'link_label': label, 'link_href': href,
        'anchor': tag.get('id'), 'title_id': tag.find('h2')['id'],
    })
    for tower in tag.select('a.tower'):
        tree.add('tower', {
            'number': pick(tower, '.tower__number'), 'icon': lookup_by_href(TOWER_ICONS, tower['href']),
            'title': pick(tower, '.tower__title'), 'body': pick(tower, '.tower__body'),
            'cta_label': pick(tower, '.tower__cta'), 'href': tower['href'], **image_inputs(tower.find('img')),
        }, node, 'towers')


def emit_getting_here(tree, tag):
    note = tag.select_one('.getting-here__note')
    lead = note.find(class_='getting-here__note-lead')
    note_text = plain(note.find('span'))
    node = tree.add('getting-here', {
        'title': pick(tag, 'h2'), 'intro': pick(tag, '.getting-here__intro'),
        'note_lead': plain(lead) if lead else None,
        'note': note_text.removeprefix(plain(lead)).strip() if lead else note_text,
        'note_icon': 'step-free', 'anchor': tag.get('id'), 'title_id': tag.find('h2')['id'],
    })
    emit_row_link_items(tree, tag.select_one('.row-links'), node, 'rows')
    actions = tag.select('.map-pane__actions a')
    tree.add('map-pane', {
        'name': pick(tag, '.map-pane__name'), 'address': pick(tag, '.map-pane__address'),
        'directions_href': actions[0]['href'], 'larger_href': actions[1]['href'],
    }, node, 'map')


def emit_top(tree, tag):
    names = classes(tag)
    if 'hero' in names:
        return emit_home_hero(tree, tag)
    if 'page-hero' in names:
        return emit_page_hero(tree, tag)
    if 'board' in names:
        return emit_board(tree, tag)
    if 'photo-band' in names:
        return emit_photo_band(tree, tag)
    if 'city-rail' in names:
        return emit_city_rail(tree, tag)
    if 'band--panel' in names:
        return emit_help_band(tree, tag)
    if 'getting-here' in names:
        return emit_getting_here(tree, tag)
    if 'band' in names and tag.find(class_='towers'):
        return emit_tower_grid(tree, tag)
    if 'section' in names:
        return emit_section(tree, tag, None, None)
    return gap(tree, tag, None, None, 'top-level')


def page_slug(page):
    stem = page.removesuffix('.html').removesuffix('/index')
    return 'home' if stem == 'index' else stem.replace('/', '-')


def page_seed(page, tree_gaps):
    soup = load_soup(page)
    tree = Tree(page_slug(page))
    for tag in element_children(soup.main):
        emit_top(tree, tag)
    tree_gaps.extend(tree.gaps)
    home = page == 'index.html'
    return {
        'uuid': node_key('/' if home else drupal_url('/' + page)),
        'title': soup.title.string,
        'description': soup.find('meta', attrs={'name': 'description'})['content'],
        'status': True,
        'path': HOME_ALIAS if home else drupal_url('/' + page),
        'front': home,
        'pageVariant': nav_state(page)[0],
        'components': tree.nodes,
    }


def notice_text(item):
    copy = BeautifulSoup(str(item.select_one('.notice-bar__text')), 'html.parser').p
    for part in copy.select('.notice-bar__kind, .notice-bar__separator, .notice-bar__action'):
        part.extract()
    return plain(copy)


def emit_chrome(tree, home, current):
    soup = load_soup('index.html')
    root = tree.add('theme_page_template.meridian', {})
    footer = BeautifulSoup((STATIC / 'partials' / 'footer.html').read_text(), 'html.parser')
    rewrite_links(footer, drupal_url)
    if home:
        bar = soup.find(class_='notice-bar')
        items = bar.select('li.notice-bar__item')
        notices = tree.add('notice-bar', {'label': bar['aria-label']}, root, 'notice')
        for position, item in enumerate(items, 1):
            link = item.select_one('a.notice-bar__link')
            tree.add('notice', {
                'kind': pick(item, '.notice-bar__kind'), 'text': notice_text(item),
                'action': pick(item, '.notice-bar__action'), 'position': position, 'total': len(items),
                'link_label': plain(link), 'link_href': link['href'],
            }, notices, 'notices')
    header = soup.find('header', class_='header')
    cta = header.select_one('a.header__cta')
    basket = [link for link in header.select('.header__actions a.icon-button') if link.get('aria-label', '').startswith('Basket')][0]
    head = tree.add('site-header', {
        'cta_label': plain(cta), 'cta_href': cta['href'], 'basket_href': basket['href'],
        'basket_label': basket['aria-label'], 'brand_current': home,
    }, root, 'header')
    for link in header.select('a.header__link'):
        state = current[1] if current and current[0] == link['href'] else 'none'
        tree.add('nav-link', {'label': plain(link), 'href': link['href'], 'current': state}, head, 'nav')
    tree.add('marker.page_content', {}, root, 'content')
    emit_footer(tree, footer.find('footer'), root)


def emit_footer(tree, footer, root):
    contact = footer.select_one('.footer__contact')
    phone = contact.find('a')
    lead = plain(contact).split(plain(phone))[0].strip()
    suffix = plain(contact).split(plain(phone), 1)[1]
    legal = footer.select_one('.footer__legal-inner')
    node = tree.add('site-footer', {
        'enquiries': lead, 'phone': plain(phone), 'phone_href': phone['href'], 'enquiries_suffix': suffix,
        'legal_line': pick(legal, 'p'),
    }, root, 'footer')
    for column, slot in zip(footer.select('nav.footer__col'), ('col_flights', 'col_shop', 'col_plan', 'col_company')):
        for link in column.select('a.footer__link'):
            tree.add('footer-link', {'label': plain(link), 'href': link['href']}, node, slot)
    for link in legal.select('a.footer__link'):
        tree.add('footer-link', {'label': plain(link), 'href': link['href']}, node, 'legal')


def nav_state(page):
    header = load_soup(page).find('header', class_='header')
    if header.select_one('a.header__brand[aria-current]'):
        return HOME_TEMPLATE_ID, True, None
    link = header.select_one('a.header__link[aria-current]')
    if link is None:
        return TEMPLATE_ID, False, None
    state = 'page' if link['aria-current'] == 'page' else 'section'
    slug = link['href'].strip('/').replace('/', '_').replace('-', '_')
    return f'meridian_nav_{slug}_{state}', False, (link['href'], state)


def template_seed(template_id, home, current):
    tree = Tree(f'template:{template_id}')
    emit_chrome(tree, home, current)
    return {
        'id': template_id, 'label': template_id.replace('_', ' '), 'description': None, 'status': True,
        'component_tree': tree.nodes,
    }


def write_json(path, data):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, ensure_ascii=False, indent=1) + '\n')


def write_canvas():
    shutil.rmtree(SEED / 'pages', ignore_errors=True)
    shutil.rmtree(SEED / 'page-templates', ignore_errors=True)
    gaps = []
    pages = ['index.html'] + page_paths()
    for page in pages:
        write_json(SEED / 'pages' / f'{page_slug(page)}.json', page_seed(page, gaps))
    templates = {nav_state(page)[0]: nav_state(page) for page in pages}
    templates[TEMPLATE_ID] = (TEMPLATE_ID, False, None)
    for template_id, home, current in templates.values():
        write_json(SEED / 'page-templates' / f'{template_id}.json', template_seed(template_id, home, current))
    print('\n'.join(gaps))
    print(f'{len(gaps)} elements without a component (emitted as prose)')
    print(f'wrote {len(pages)} pages and {len(templates)} page templates to {SEED.relative_to(ROOT)}')
