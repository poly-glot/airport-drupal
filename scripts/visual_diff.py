import shutil
import subprocess
import sys
from pathlib import Path

PAGES = [
    ('index.html', 'home'), ('about/index.html', 'about'), ('about/careers.html', 'about/careers'),
    ('about/media-centre.html', 'about/media-centre'), ('about/sustainability.html', 'about/sustainability'),
    ('accessibility.html', 'accessibility'), ('at-the-airport/index.html', 'at-the-airport'),
    ('at-the-airport/eat-and-drink.html', 'at-the-airport/eat-and-drink'), ('at-the-airport/lounges.html', 'at-the-airport/lounges'),
    ('at-the-airport/security.html', 'at-the-airport/security'), ('at-the-airport/shopping.html', 'at-the-airport/shopping'),
    ('cookies.html', 'cookies'), ('destinations/index.html', 'destinations'), ('destinations/lisbon.html', 'destinations/lisbon'),
    ('destinations/marrakech.html', 'destinations/marrakech'), ('destinations/reykjavik.html', 'destinations/reykjavik'),
    ('flights/index.html', 'flights'), ('flights/airlines.html', 'flights/airlines'), ('flights/alerts.html', 'flights/alerts'),
    ('getting-here/index.html', 'getting-here'), ('help/index.html', 'help'),
    ('help/baggage-and-lost-property.html', 'help/baggage-and-lost-property'), ('help/first-time-flying.html', 'help/first-time-flying'),
    ('help/special-assistance.html', 'help/special-assistance'), ('help/travelling-with-children.html', 'help/travelling-with-children'),
    ('parking/index.html', 'parking'), ('privacy.html', 'privacy'), ('sitemap.html', 'sitemap'), ('terms.html', 'terms'),
]
WIDTHS = (1440, 390)
FUZZ = '8%'
NOISE_CEILING_PERCENT = 1.0
SCRIPT = Path(__file__).with_name('screens.mjs')
MAGICK = ['magick'] if shutil.which('magick') else []
CONVERT = MAGICK or ['convert']


def shot_name(path, width):
    stem = path.strip('/').replace('/', '-').replace('.', '-') or 'home'
    return f'{stem}-{width}.png'


def shoot(base, out_dir, paths):
    out_dir.mkdir(parents=True, exist_ok=True)
    subprocess.run(['node', str(SCRIPT), base, str(out_dir), ','.join(paths), ','.join(map(str, WIDTHS))], check=True)


def size(path):
    width, height = subprocess.check_output([*MAGICK, 'identify', '-format', '%w %h', str(path)]).split()
    return int(width), int(height)


def padded(src, dst, width, height):
    subprocess.run([*CONVERT, str(src), '-background', 'white', '-extent', f'{width}x{height}', str(dst)], check=True)


def differing_percent(a, b, out):
    (width, height_a), (_, height_b) = size(a), size(b)
    height = max(height_a, height_b)
    pad_a, pad_b = out.with_suffix('.a.png'), out.with_suffix('.b.png')
    padded(a, pad_a, width, height)
    padded(b, pad_b, width, height)
    result = subprocess.run([*MAGICK, 'compare', '-metric', 'AE', '-fuzz', FUZZ, str(pad_a), str(pad_b), str(out)], capture_output=True, text=True)
    pixels = float(result.stderr.split()[0])
    return pixels / (width * height) * 100, height_a, height_b


def main(static_base, drupal_base, work):
    work = Path(work)
    shoot(static_base, work / 'static', [s for s, _ in PAGES])
    shoot(drupal_base, work / 'drupal', [d for _, d in PAGES])
    (work / 'diff').mkdir(exist_ok=True)

    rows = []
    for width in WIDTHS:
        for static_path, drupal_path in PAGES:
            a = work / 'static' / shot_name(static_path, width)
            b = work / 'drupal' / shot_name(drupal_path, width)
            percent, height_a, height_b = differing_percent(a, b, work / 'diff' / shot_name(drupal_path, width))
            rows.append((percent, drupal_path, width, height_a, height_b))

    failures = 0
    for percent, path, width, height_a, height_b in sorted(rows, reverse=True):
        flag = '' if height_a == height_b and percent <= NOISE_CEILING_PERCENT else 'DIFFERS'
        failures += bool(flag)
        print(f'{percent:5.1f}%  {path:40s} {width:4d}  static {height_a:5d}  drupal {height_b:5d}  {flag}')
    print(f'{failures} render(s) differ beyond the flap-animation noise ceiling')
    return 1 if failures else 0


if __name__ == '__main__':
    static_base, drupal_base, work = (sys.argv[1:] + ['http://127.0.0.1:8765', 'http://airport-drupal.ddev.site', '/tmp/meridian-shots'][len(sys.argv) - 1:])[:3]
    sys.exit(main(static_base, drupal_base, work))
