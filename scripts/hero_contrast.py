import glob
import os
import sys

from PIL import Image

NAVY = (10, 21, 41)
DESKTOP_STOPS = [(0.0, 0.88), (0.45, 0.62), (1.0, 0.3)]
NARROW_STOPS = [(0.0, 0.66), (0.55, 0.78), (1.0, 0.92)]
DESKTOP_ZONE = (0.055, 0.14, 0.47, 0.78)
NARROW_ZONE = (0.05, 0.08, 0.95, 0.60)
WINDOW = 32
THRESHOLD = 4.5


def alpha_at(position, stops):
    for (p0, a0), (p1, a1) in zip(stops, stops[1:]):
        if position <= p1:
            t = (position - p0) / (p1 - p0)
            return a0 + (a1 - a0) * t
    return stops[-1][1]


def srgb_to_linear(channel):
    c = channel / 255
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4


def luminance(rgb):
    r, g, b = (srgb_to_linear(v) for v in rgb)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def composite(pixel, alpha):
    return tuple(round(alpha * n + (1 - alpha) * p) for n, p in zip(NAVY, pixel))


def worst_window(image, stops, zone, horizontal):
    width, height = image.size
    x0, y0, x1, y1 = (round(f * s) for f, s in zip(zone, (width, height, width, height)))
    pixels = image.load()
    worst = 0.0
    location = None

    for wy in range(y0, y1 - WINDOW + 1, WINDOW):
        for wx in range(x0, x1 - WINDOW + 1, WINDOW):
            total = 0.0
            for dy in range(0, WINDOW, 4):
                for dx in range(0, WINDOW, 4):
                    x, y = wx + dx, wy + dy
                    position = x / width if horizontal else y / height
                    total += luminance(composite(pixels[x, y][:3], alpha_at(position, stops)))
            mean = total / 64
            if mean > worst:
                worst, location = mean, (wx, wy)

    contrast = 1.05 / (worst + 0.05)
    return contrast, location


def check(path):
    image = Image.open(path).convert('RGB')
    desktop, d_loc = worst_window(image, DESKTOP_STOPS, DESKTOP_ZONE, True)
    narrow, n_loc = worst_window(image, NARROW_STOPS, NARROW_ZONE, False)
    ok = desktop >= THRESHOLD and narrow >= THRESHOLD
    flag = 'PASS' if ok else 'FAIL'
    print(f'{flag}  {os.path.basename(path):30} desktop {desktop:5.2f}:1 at {d_loc}   narrow {narrow:5.2f}:1 at {n_loc}')
    return ok


def main():
    target = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'next', 'public', 'assets', 'img', 'home', 'hero')
    paths = [target] if target.endswith('.jpg') else sorted(glob.glob(os.path.join(target, '*-1440.jpg')))
    if not paths:
        print(f'no hero jpgs found under {target}')
        sys.exit(2)
    results = [check(path) for path in paths]
    print(f'{sum(results)}/{len(results)} pass (threshold {THRESHOLD}:1 for white text, both gradients)')
    sys.exit(0 if all(results) else 1)


main()
