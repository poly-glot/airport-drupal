import hashlib
import json
import re
import sys
import uuid
from pathlib import Path

from bs4 import BeautifulSoup, Tag
from bs4.formatter import HTMLFormatter

ROOT = Path(__file__).resolve().parent.parent
STATIC = ROOT / 'static'
DATA = ROOT / 'docs' / 'copy' / 'data.md'
OUTPUT = ROOT / 'umbraco' / 'Meridian.Web' / 'Seed' / 'seed.json'

HERO_WIDTHS = '960,1440'

ENTITY_ELEMENTS = {
    ('about/careers.html', '#current-roles .grid'): 'roles',
    ('about/media-centre.html', '#latest-news .grid'): 'releases',
    ('flights/airlines.html', '#airlines .grid'): 'airlines',
    ('flights/airlines.html', '#destinations .table-wrap'): 'routes',
    ('at-the-airport/shopping.html', '#offers .grid'): 'offers',
    ('destinations/index.html', '.grid:has(> .city-card--guide)'): 'destinations',
    ('parking/index.html', '#compare .grid'): 'carParks',
}

FACILITY_PAGES = {'at-the-airport/eat-and-drink.html': 'eat', 'at-the-airport/shopping.html': 'shop'}
FACILITY_CAPTION = re.compile(r'Terminal (\d), (before|after) security')
FAQ_GROUPS = ('help/index.html', '#faqs .stack .stack')


MONTHS = {name: index for index, name in enumerate(
    ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], 1)}

STATUS_KEYS = {
    ('departures', 'On time'): 'on-time', ('departures', 'Boarding'): 'boarding', ('departures', 'Gate open'): 'gate-open',
    ('departures', 'Delayed'): 'delayed-departure', ('departures', 'Cancelled'): 'cancelled',
    ('arrivals', 'Landed'): 'landed', ('arrivals', 'Delayed'): 'delayed-arrival', ('arrivals', 'Expected'): 'expected',
}


def iso_date(text):
    day, month, year = text.split()
    return f'{year}-{MONTHS[month]:02d}-{int(day):02d}'


def data_sections():
    sections, current = {}, None
    for line in DATA.read_text().splitlines():
        if line.startswith('## '):
            current = line[3:].strip()
            sections[current] = []
        elif current:
            sections[current].append(line)
    return sections


def table_rows(lines):
    rows = [line for line in lines if line.startswith('|')]
    header = [cell.strip() for cell in rows[0].strip('|').split('|')]
    return [dict(zip(header, (cell.strip() for cell in row.strip('|').split('|')))) for row in rows[2:]]


def bullet_blocks(lines):
    blocks, current = {}, None
    for line in lines:
        if line.startswith('### '):
            current = line[4:].strip()
            blocks[current] = {}
        elif current and line.startswith('- ') and ':' in line:
            key, _, value = line[2:].partition(':')
            blocks[current][key.strip()] = value.strip()
    return blocks


def flight_rows(lines, board):
    return [block('flightRow',
                  time=row['time'], place=row['place'], flight=row['flightNo'], terminal=row['terminal'],
                  gate='' if row['gate'] == '—' else row['gate'].removeprefix('Belt '),
                  status=STATUS_KEYS[(board, row['status'])], note=row['note'], onHomepage=row['home'] == 'home')
            for row in table_rows(lines)]


def faq_blocks(lines):
    faqs, category, question = [], None, None
    for line in lines:
        if line.startswith('### '):
            category = line[4:].strip()
        elif line.startswith('**') and line.endswith('**'):
            question = line.strip('*')
        elif question and line.strip():
            faqs.append(block('faq', category=category, question=question, answer=line.strip()))
            question = None
    return faqs


def settings_node():
    data = data_sections()
    car_parks = bullet_blocks(data['Car parks'])
    airlines = bullet_blocks(data['Airlines'])
    roles = bullet_blocks(data['Roles'])
    releases = bullet_blocks(data['Releases'])
    values = {
        'phone': '0121 496 0123',
        'phoneHref': '+441214960123',
        'email': 'hello@meridianairport.example',
        'address': 'Meridian Airport, Skyline Way, Birmingham B99 1MA',
        'notices': [block('notice', kind=row['kind'], text=row['text'], action=row['action']) for row in table_rows(data['Notices'])],
        'departures': flight_rows(data['Departures'], 'departures'),
        'arrivals': flight_rows(data['Arrivals'], 'arrivals'),
        'carParks': [block('carPark', name=name, walk=fields['walk/transfer'],
                           priceFrom=fields['price from'].split(' per ')[0], priceUnit='per ' + fields['price from'].split(' per ')[1],
                           features='\n'.join(feature.strip() for feature in fields['features'].split(';')),
                           bestFor=fields['bestFor'], recommended=name == 'P2 Long-stay')
                     for name, fields in car_parks.items()],
        'airlines': [block('airline', name=name.split(' (')[0], code=name.split('(')[1].rstrip(')'),
                           terminal=fields['terminal'].split(',')[0], checkIn='Zone ' + fields['terminal'].split('zone ')[1],
                           summary=fields['summary'], destinations=fields['destinations'])
                     for name, fields in airlines.items() if fields],
        'routes': [block('route', destination=row['Destination'], country=row['Country'], airline=row['Airline'],
                         terminal=row['Terminal'], flightTime=row['Flight time'], frequency=row['How often'])
                   for row in table_rows(data['Airlines'])],
        'destinations': [block('destination', city=row['city'], country=row['country'], flightTime=row['flightTime'],
                               airlines=row['airline(s)'], title=row['title'], teaser=row['teaser'], image=row['heroImage'],
                               url=f"/destinations/{slug(row['city'])}/")
                         for row in table_rows(data['Destinations'])],
        'whereWeFly': [block('cityCard', city=row['city'], priceFrom=row['priceFrom'], duration=row['duration'],
                             frequency=row['frequency'], image=row['image'])
                       for row in table_rows(data['Where we fly'])],
        'offers': [block('offer', title=row['title'], venue=row['venue'], terminal=row['terminal'], detail=row['detail'], ends=row['ends'])
                   for row in table_rows(data['Offers'])],
        'facilities': [block('terminalFacility', venue=row['venue'], terminal=row['terminal'], zone=row['zone'],
                             hours=row['hours'], category=row['category'], description=row['description'])
                       for row in table_rows(data['Terminal facilities'])],
        'faqs': faq_blocks(data['FAQs']),
        'roles': [block('role', title=title, team=fields['team'], hours=fields['hours'], salary=fields['salary'],
                        closingDate=iso_date(fields['closing date']), summary=fields['summary'])
                  for title, fields in roles.items()],
        'releases': [block('release', date=iso_date(heading.split(':')[0]), title=heading.split(': ', 1)[1], summary=fields['summary'])
                     for heading, fields in releases.items()],
    }
    values['statuses'] = status_lines()
    values['helpItems'], values['towers'] = home_entities()
    return {'key': node_key('settings'), 'type': 'siteSettings', 'name': 'Site settings', 'parent': None, 'values': values}


def status_lines():
    lines = []
    for legend in page_soup('flights/index.html').select('dl.facts--legend'):
        board = legend.find_previous_sibling('h3').get_text().lower()
        for item in legend.select('.facts__item'):
            chip = item.find('span', class_='status')
            tone = next((name.split('--')[1] for name in classes(chip) if name.startswith('status--')), 'ok')
            value = item.find('dd')
            lines.append(f"{value['id'].removeprefix('status-')} | {chip.get_text().strip()} | {tone} | {board} | {inner_html(value)}")
    return '\n'.join(lines)


def slug(text):
    return re.sub(r'[^a-z0-9]+', '-', text.lower().replace('í', 'i')).strip('-')


class UnknownElement(Exception):
    pass


def node_key(path):
    return str(uuid.UUID(bytes=hashlib.md5(f'meridian:{path}'.encode()).digest(), version=4))


def umbraco_url(href):
    if not href or href.startswith(('mailto:', 'tel:', 'http', '#')):
        return href
    path, _, fragment = href.partition('#')
    if path.endswith('index.html'):
        path = path[: -len('index.html')]
    elif path.endswith('.html'):
        path = path[: -len('.html')] + '/'
    return path + ('#' + fragment if fragment else '')


def drupal_url(href):
    clean = umbraco_url(href)
    if clean == href or clean in ('/', ''):
        return clean
    path, _, fragment = clean.partition('#')
    path = path.rstrip('/') or '/'
    return path + ('#' + fragment if fragment else '')


URL_STYLES = {'umbraco': umbraco_url, 'drupal': drupal_url}


def rewrite_links(fragment, to_url=umbraco_url):
    for tag in fragment.find_all(['a', 'form']):
        attribute = 'href' if tag.name == 'a' else 'action'
        if tag.has_attr(attribute):
            tag[attribute] = to_url(tag[attribute])


class SourceOrder(HTMLFormatter):
    def attributes(self, tag):
        return tag.attrs.items()


SOURCE_ORDER = SourceOrder(void_element_close_prefix=None)
SVG_CASE = {' viewbox=': ' viewBox=', ' preserveaspectratio=': ' preserveAspectRatio='}


def restore_svg_case(html):
    for lower, camel in SVG_CASE.items():
        html = html.replace(lower, camel)
    return html


def outer_html(tag):
    return restore_svg_case(tag.decode(formatter=SOURCE_ORDER))


def inner_html(tag):
    return restore_svg_case(tag.decode_contents(formatter=SOURCE_ORDER)).strip()


def element_children(tag):
    return [child for child in tag.children if isinstance(child, Tag)]


def classes(tag):
    return tag.get('class', [])


def block(block_type, /, **values):
    return {'type': block_type, 'values': {key: value for key, value in values.items() if value not in (None, '')}}


def convert_prose(tag):
    children = element_children(tag)
    heading = children[0] if children and children[0].name == 'h2' else None
    if heading:
        heading.extract()
    return block('richText',
                 heading=inner_html(heading) if heading else None,
                 headingId=heading.get('id') if heading else None,
                 html=inner_html(tag))


def convert_facts(tag):
    lines = []
    for item in element_children(tag):
        term, value = item.find('dt'), item.find('dd')
        if 'facts__item' not in classes(item) or term is None or value is None:
            raise UnknownElement(f'facts item {item}')
        line = f'{inner_html(term)} | {inner_html(value)}'
        lines.append(line + (f' | {value["id"]}' if value.get('id') else ''))
    return block('facts', cssClass=' '.join(classes(tag)), items='\n'.join(lines))


def convert_table(tag):
    table = tag.find('table')
    caption = table.find('caption')
    head = [inner_html(cell) for cell in table.thead.find_all('th')]
    rows, numeric, row_headers = [], set(), False
    for row in table.tbody.find_all('tr'):
        cells = element_children(row)
        if cells[0].name == 'th':
            row_headers = True
        for index, cell in enumerate(cells):
            if 'table__num' in classes(cell):
                numeric.add(index)
        rows.append(' | '.join(inner_html(cell) for cell in cells))
    if table.tfoot:
        raise UnknownElement('table with tfoot')
    return block('table',
                 caption=inner_html(caption) if caption else None,
                 captionHidden='visually-hidden' in classes(caption) if caption else False,
                 head=' | '.join(head),
                 rows='\n'.join(rows),
                 rowHeaders=row_headers,
                 numericColumns=','.join(str(index) for index in sorted(numeric)))


def convert_text_link(paragraph):
    link = paragraph.find('a')
    link.find('svg').extract()
    return block('textLink', cssClass=' '.join(classes(link)), url=link['href'], text=inner_html(link))


def convert_help_list(tag):
    items = []
    for item in tag.find_all('li', recursive=False):
        link = item.find('a', class_='help-item')
        title = link.find(class_='help-item__title')
        items.append(block('helpItem',
                           url=link['href'],
                           title=inner_html(title),
                           body=inner_html(link.find(class_='help-item__body')),
                           icon=outer_html(link.find('svg', class_='help-item__icon'))))
    return block('helpList', items=items)


def entity_block(tag, page):
    for (entity_page, selector), source in ENTITY_ELEMENTS.items():
        if entity_page == page and tag in page_soup(page).select(selector):
            return block('entityList', source=source)
    if page in FACILITY_PAGES and 'table-wrap' in classes(tag):
        match = FACILITY_CAPTION.fullmatch(tag.caption.get_text())
        if match:
            return block('entityList', source='facilities', filter=f'{FACILITY_PAGES[page]}|T{match[1]}|{match[2]}')
    if 'facts--legend' in classes(tag):
        board = tag.find_previous_sibling('h3').get_text().lower()
        return block('entityList', source='statuses', filter=board)
    if page == FAQ_GROUPS[0]:
        groups = page_soup(page).select(FAQ_GROUPS[1])
        if tag in groups:
            return block('entityList', source='faqs') if tag is groups[0] else SKIP
    return None


SKIP = object()


def convert(tag, page):
    names = classes(tag)
    entity = entity_block(tag, page)
    if entity is not None:
        return entity

    if tag.name == 'div' and 'prose' in names:
        return convert_prose(tag)
    if tag.name == 'div' and names and names[0] in ('stack', 'grid', 'split'):
        return block('group', cssClass=' '.join(names), parts=convert_all(tag, page))
    if tag.name in ('div', 'section') and 'card' in names:
        return block('card', cssClass=' '.join(names), tag=tag.name if tag.name != 'div' else None,
                     labelledBy=tag.get('aria-labelledby'), parts=convert_all(tag, page))
    if tag.name in ('h2', 'h3'):
        return block('heading', tag=tag.name, cssClass=' '.join(names), headingId=tag.get('id'), text=inner_html(tag))
    if tag.name == 'p':
        links = tag.find_all('a', class_='text-link')
        if len(links) == 1 and len(element_children(tag)) == 1:
            return convert_text_link(tag)
        return block('paragraph', cssClass=' '.join(names), html=inner_html(tag))
    if tag.name == 'dl' and 'facts' in names:
        return convert_facts(tag)
    if tag.name == 'div' and 'table-wrap' in names:
        return convert_table(tag)
    if tag.name == 'div' and 'callout' in names:
        title = tag.find(class_='callout__title')
        if title:
            title.extract()
        return block('callout', title=inner_html(title) if title else None, html=inner_html(tag))
    if tag.name == 'ul' and 'help-list' in names:
        return convert_help_list(tag)
    if tag.name == 'form':
        return block('form', name=tag.get('id'))
    if tag.name == 'svg' and 'map' in names:
        return block('map', name=map_name(tag))
    raise UnknownElement(f'{tag.name}.{".".join(names)}')


def map_name(svg):
    label = svg.get('aria-label', '')
    for name, needle in (('terminal-1', 'Terminal 1'), ('terminal-2', 'Terminal 2')):
        if needle in label:
            return name
    raise UnknownElement(f'map {label[:40]}')


def convert_all(tag, page):
    return [part for part in (convert(child, page) for child in element_children(tag)) if part is not SKIP]


ROW_LINK_ICONS = {'#train': 'train', '#car': 'car', '#bus': 'bus'}


def convert_photo_band(tag):
    title = tag.find(class_='photo-band__title')
    image = tag.find('img', class_='photo-band__img')
    link = tag.select_one('.photo-band__content > a.text-link')
    link.find('svg').extract()
    form = tag.find('form')
    return block('photoBand',
                 variant='hero' if 'photo-band--hero' in classes(tag) else 'band',
                 anchor=tag.get('id'), title=inner_html(title), titleId=title['id'],
                 lede=inner_html(tag.find(class_='photo-band__lede')),
                 image=re.sub(r'-\d+\.jpg$', '', image['src']),
                 widths=','.join(re.findall(r'-(\d+)\.jpg', image['srcset'])),
                 stats='\n'.join(f"{inner_html(item.dt)} | {inner_html(item.dd)}" for item in tag.select('.stats__item')),
                 linkText=inner_html(link), linkUrl=link['href'],
                 form='quote' if form.get('id') == 'quote' else 'book-parking')


def convert_getting_here(tag):
    title = tag.find('h2')
    rows = []
    for link in tag.select('a.row-link'):
        rows.append(' | '.join([link['href'], inner_html(link.find(class_='row-link__title')),
                                inner_html(link.find(class_='row-link__meta')),
                                ROW_LINK_ICONS['#' + link['href'].split('#')[1]]]))
    return block('gettingHere',
                 anchor=tag.get('id'), title=inner_html(title), titleId=title['id'],
                 intro=inner_html(tag.find(class_='getting-here__intro')),
                 rowLinks='\n'.join(rows),
                 note=inner_html(tag.select_one('.getting-here__note > span')),
                 directionsUrl=tag.select_one('.map-pane__actions a.button')['href'])


def convert_section(tag, page):
    names = classes(tag)
    if tag.name == 'section' and 'photo-band' in names:
        return convert_photo_band(tag)
    if tag.name == 'section' and 'getting-here' in names:
        return convert_getting_here(tag)
    if tag.name == 'section' and 'board' in names:
        title = tag.find('h2', class_='board__title')
        return block('flightBoard', variant='home' if 'board--overlapped' in names else 'page', title=inner_html(title), titleId=title['id'])
    if tag.name == 'div' and names[:2] == ['section', 'container']:
        callout = element_children(tag)
        if len(callout) == 1 and 'callout' in classes(callout[0]):
            return convert(callout[0], page)
    if tag.name in ('section', 'div') and 'section' in names and 'container' in names:
        return block('section', anchor=tag.get('id'), labelledBy=tag.get('aria-labelledby'),
                     tag=tag.name if tag.name != 'section' else None, parts=convert_all(tag, page))
    raise UnknownElement(f'top-level {tag.name}.{".".join(names)}')


SOUPS = {}


def page_soup(page):
    if page not in SOUPS:
        soup = BeautifulSoup((STATIC / page).read_text(), 'html.parser')
        rewrite_links(soup)
        SOUPS[page] = soup
    return SOUPS[page]


def convert_hero(hero, values):
    if 'page-hero' not in classes(hero):
        values['heroVariant'] = 'none'
        return False
    values['heroVariant'] = 'standard'
    values['hideBreadcrumb'] = hero.find('nav', class_='breadcrumb') is None
    for key, selector in (('eyebrow', '.page-hero__eyebrow'), ('heroTitle', '.page-hero__title'), ('intro', '.page-hero__intro')):
        found = hero.select_one(selector)
        if found:
            values[key] = inner_html(found)
    image = hero.select_one('img.media')
    if image:
        values['heroImage'] = re.sub(r'-\d+\.jpg$', '', image['src'])
        values['heroAlt'] = image['alt']
        values['heroSizes'] = image['sizes']
        if (image['width'], image['height']) != ('1440', '960') or HERO_WIDTHS not in ','.join(re.findall(r'-(\d+)\.jpg', image['srcset'])):
            raise UnknownElement(f'hero image shape {image["width"]}x{image["height"]} {image["srcset"]}')
    return True


def extract_page(page, report):
    soup = page_soup(page)
    values = {
        'metaTitle': soup.title.string,
        'metaDescription': soup.find('meta', attrs={'name': 'description'})['content'],
    }
    main = soup.main
    top = element_children(main)
    if convert_hero(top[0], values):
        top = top[1:]
    sections = []
    for tag in top:
        try:
            sections.append(convert_section(tag, page))
        except UnknownElement as error:
            report.append(f'{page}: {error}')
    values['sections'] = sections
    return values


def text_link(tag):
    link = tag.find('a', class_='text-link', recursive=False) or tag.select_one('a.text-link')
    copy = BeautifulSoup(outer_html(link), 'html.parser').a
    copy.find('svg').extract()
    return inner_html(copy), link['href']


def convert_home_hero(tag):
    image = tag.find('img', class_='hero__img')
    waits = []
    for item in tag.select('.wait-panel__item'):
        value = item.dd
        tone = next((name.split('--')[1] for name in classes(value) if name.startswith('wait-chip--')), 'text')
        waits.append(f"{inner_html(item.dt)} | {value.get_text().strip()} | {tone}")
    signs = [block('sign', url=link['href'], title=inner_html(link.find(class_='sign__title')),
                   sub=inner_html(link.find(class_='sign__sub')), icon=outer_html(link.find('svg')))
             for link in tag.select('a.sign')]
    return block('homeHero',
                 title=inner_html(tag.find(class_='hero__title')),
                 lede=inner_html(tag.find(class_='hero__lede')),
                 image=re.sub(r'-\d+\.jpg$', '', image['src']),
                 weather=tag['data-weather'],
                 temperature=inner_html(tag.find(class_='hero__temp-value')),
                 condition=inner_html(tag.find(class_='hero__condition')),
                 dateLine=inner_html(tag.find(class_='hero__date')),
                 signs=signs,
                 waitUpdated=tag.find(class_='wait-panel__updated').get_text().split('updated')[1].strip(),
                 waits='\n'.join(waits))


def convert_city_rail(tag):
    title = BeautifulSoup(outer_html(tag.find('h2')), 'html.parser').h2
    subtitle = title.find(class_='section-title__sub').extract()
    link_text, link_url = text_link(tag.find(class_='city-rail__titles'))
    return block('cityRail', anchor=tag.get('id'), title=inner_html(title), subtitle=inner_html(subtitle),
                 linkText=link_text, linkUrl=link_url)


def convert_help_band(tag):
    link_text, link_url = text_link(tag.find(class_='section-head'))
    return block('helpBand', anchor=tag.get('id'), title=inner_html(tag.find('h2')), linkText=link_text, linkUrl=link_url)


def convert_towers_band(tag):
    link_text, link_url = text_link(tag.find(class_='section-head'))
    return block('towersBand', anchor=tag.get('id'), title=inner_html(tag.find('h2')),
                 intro=inner_html(tag.find(class_='section-head__intro')), linkText=link_text, linkUrl=link_url)


def home_values():
    soup = page_soup('index.html')
    sections = []
    for tag in element_children(soup.main):
        names = classes(tag)
        if 'hero' in names:
            sections.append(convert_home_hero(tag))
        elif 'board' in names or 'photo-band' in names or 'getting-here' in names:
            sections.append(convert_section(tag, 'index.html'))
        elif 'city-rail' in names:
            sections.append(convert_city_rail(tag))
        elif 'band--panel' in names:
            sections.append(convert_help_band(tag))
        elif tag.find(class_='towers'):
            sections.append(convert_towers_band(tag))
        else:
            raise UnknownElement(f'home {tag.name}.{".".join(names)}')
    return {
        'metaTitle': soup.title.string,
        'metaDescription': soup.find('meta', attrs={'name': 'description'})['content'],
        'umbracoUrlName': '',
        'sections': sections,
    }


def home_entities():
    soup = page_soup('index.html')
    help_items = [block('helpItem', url=link['href'], title=inner_html(link.find(class_='help-item__title')),
                        body=inner_html(link.find(class_='help-item__body')), icon=outer_html(link.find('svg')))
                  for link in soup.select('#help a.help-item')]
    towers = []
    for link in soup.select('a.tower'):
        cta = BeautifulSoup(outer_html(link.find(class_='tower__cta')), 'html.parser').span
        cta.find('svg').extract()
        towers.append(block('tower', number=inner_html(link.find(class_='tower__number')),
                            title=inner_html(link.find(class_='tower__title')), body=inner_html(link.find(class_='tower__body')),
                            cta=inner_html(cta), url=link['href'],
                            image=re.sub(r'-\d+\.jpg$', '', link.find('img')['src']),
                            icon=outer_html(link.find('svg', class_='tower__icon'))))
    return help_items, towers


def breadcrumb_labels():
    ancestor_labels, own_labels = {'/': 'Home'}, {}
    for path in STATIC.rglob('*.html'):
        soup = page_soup(str(path.relative_to(STATIC)))
        for item in soup.select('.breadcrumb__item'):
            link = item.find('a')
            if link:
                ancestor_labels[link['href']] = inner_html(link)
            else:
                own_labels[umbraco_url('/' + str(path.relative_to(STATIC)))] = inner_html(item)
    return ancestor_labels, own_labels


def page_paths():
    paths = [str(path.relative_to(STATIC)) for path in STATIC.rglob('*.html') if 'partials' not in path.parts and path != STATIC / 'index.html']
    return sorted(paths, key=lambda page: (umbraco_url('/' + page).count('/'), umbraco_url('/' + page)))


def build(report):
    ancestor_labels, own_labels = breadcrumb_labels()
    home_key = node_key('/')
    nodes = [{'key': home_key, 'type': 'home', 'name': 'Home', 'parent': None, 'values': home_values()}]
    keys = {'/': home_key}
    for page in page_paths():
        url = umbraco_url('/' + page)
        parent_url = url.rstrip('/').rsplit('/', 1)[0] + '/'
        segment = url.rstrip('/').rsplit('/', 1)[1]
        values = extract_page(page, report)
        values['umbracoUrlName'] = segment
        name = ancestor_labels.get(url) or own_labels.get(url) or BeautifulSoup(values.get('heroTitle', segment), 'html.parser').get_text()
        if own_labels.get(url, name) != name:
            values['breadcrumbLabel'] = own_labels[url]
        keys[url] = node_key(url)
        nodes.append({'key': keys[url], 'type': 'page', 'name': name, 'parent': keys[parent_url], 'values': values})
    nodes.append(settings_node())
    return nodes


def main():
    if '--target' in sys.argv and sys.argv[sys.argv.index('--target') + 1] == 'canvas':
        from canvas_emit import write_canvas
        write_canvas()
        return
    report = []
    nodes = build(report)
    if report:
        print('\n'.join(report))
        print(f'\n{len(report)} unconverted elements')
    if '--write' in sys.argv:
        OUTPUT.write_text(json.dumps({'nodes': nodes}, ensure_ascii=False, indent=1) + '\n')
        print(f'wrote {len(nodes)} nodes to {OUTPUT.relative_to(ROOT)}')


if __name__ == '__main__':
    main()
