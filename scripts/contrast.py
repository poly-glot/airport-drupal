import sys


def luminance(hex_colour):
    channels = [int(hex_colour.lstrip('#')[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    linear = [c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4 for c in channels]
    return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2]


def ratio(a, b):
    high, low = sorted([luminance(a), luminance(b)], reverse=True)
    return (high + 0.05) / (low + 0.05)


pairs = [line.split() for line in sys.stdin if line.strip() and not line.startswith('#')]
for label, foreground, background in pairs:
    value = ratio(foreground, background)
    grade = 'AAA' if value >= 7 else 'AA' if value >= 4.5 else 'AA-large' if value >= 3 else 'FAIL'
    print(f'{value:5.2f} {grade:9} {label} {foreground} on {background}')
