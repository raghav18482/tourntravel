"""Hand-drawn lettering for the Deepak Tour N Travel logo.

No fonts are used: every letter is drawn here as vector paths, so the logo
renders identically everywhere (Canva, print shops, vinyl cutters, browsers).
Units: cap height = 100, baseline at y = 100.
"""

# ---- Didone display capitals (filled) ---------------------------------------
# Thick stems / hairline joins, flat hairline serifs: the luxury-house look.


def _poly(*pts):
    return "M" + " L".join(f"{x:g} {y:g}" for x, y in pts) + " Z"


DIDONE = {
    "D": (110, [
        _poly((0, 0), (25, 0), (25, 100), (0, 100), (0, 95), (8, 95), (8, 5), (0, 5)),
        "M20 0H50C82 0 104 22 104 50C104 78 82 100 50 100H20Z"
        "M25 5H48C74 5 87 25 87 50C87 75 74 95 48 95H25Z",
    ]),
    "E": (82, [
        _poly((0, 0), (74, 0), (74, 24), (69, 24), (69, 5), (25, 5), (25, 47.5), (55, 47.5),
              (55, 38), (60, 38), (60, 62), (55, 62), (55, 52.5), (25, 52.5), (25, 95),
              (71, 95), (71, 74), (76, 74), (76, 100), (0, 100), (0, 95), (8, 95), (8, 5), (0, 5)),
    ]),
    "P": (96, [
        _poly((0, 0), (25, 0), (25, 95), (35, 95), (35, 100), (0, 100), (0, 95), (8, 95), (8, 5), (0, 5)),
        "M20 0H55C79 0 94 13 94 29C94 45 79 58 55 58H20Z"
        "M25 5H52C69 5 77 16 77 29C77 42 69 53 52 53H25Z",
    ]),
    "A": (100, [
        _poly((42, 0), (55, 0), (88, 95), (71, 95)),
        _poly((42, 0), (47, 0), (14.5, 95), (9.5, 95)),
        _poly((24, 62), (62, 62), (63.5, 67), (22.5, 67)),
        _poly((0, 95), (26, 95), (26, 100), (0, 100)),
        _poly((62, 95), (98, 95), (98, 100), (62, 100)),
    ]),
    "K": (104, [
        _poly((0, 0), (33, 0), (33, 5), (25, 5), (25, 95), (33, 95), (33, 100), (0, 100),
              (0, 95), (8, 95), (8, 5), (0, 5)),
        _poly((25, 56.5), (68, 5), (74.5, 5), (25, 63.5)),
        _poly((58, 0), (86, 0), (86, 5), (58, 5)),
        _poly((35, 46), (47, 37), (94, 95), (76, 95)),
        _poly((70, 95), (102, 95), (102, 100), (70, 100)),
    ]),
}


def didone(text, tracking=30):
    """Return (svg_paths, width) for text in Didone caps, origin top-left."""
    out, x = [], 0.0
    for i, ch in enumerate(text):
        if ch == " ":
            x += 50
            continue
        adv, paths = DIDONE[ch]
        out += [f'<path transform="translate({x:g} 0)" fill-rule="evenodd" d="{d}"/>' for d in paths]
        x += adv + (tracking if i < len(text) - 1 else 0)
    return "\n".join(out), x


# ---- Monoline sans capitals (stroked) ----------------------------------------
# Used small and widely tracked under the wordmark. Stroke width is set by the
# caller; geometry assumes a 9-unit stroke.

SANS = {
    "T": (70, "M0 4.5H70M35 4.5V100"),
    "O": (96, "M48 4.5A43.5 45.5 0 1 1 47.99 4.5Z"),
    "U": (76, "M4.5 0V60C4.5 82 18 95.5 38 95.5C58 95.5 71.5 82 71.5 60V0"),
    "R": (72, "M4.5 100V4.5H40C56 4.5 65 14 65 28C65 42 56 51.5 40 51.5H4.5M36 51.5L70 100"),
    "N": (78, "M4.5 100V4.5L73.5 95.5V0"),
    "A": (80, "M0 100L40 12.7L80 100M16 70H64"),
    "V": (80, "M0 0L40 87.3L80 0"),
    "E": (64, "M64 4.5H4.5V95.5H64M4.5 50H56"),
    "L": (62, "M4.5 0V95.5H62"),
    "D": (82, "M4.5 4.5H36C62 4.5 78 24 78 50C78 76 62 95.5 36 95.5H4.5Z"),
    "P": (68, "M4.5 100V4.5H40C56 4.5 65 14 65 28C65 42 56 51.5 40 51.5H4.5"),
    "K": (72, "M4.5 0V100M68 0L4.5 62M27 40L72 100"),
}


def sans(text, tracking=46, word_space=70):
    out, x = [], 0.0
    for i, ch in enumerate(text):
        if ch == " ":
            x += word_space - tracking
            continue
        adv, d = SANS[ch]
        out.append(f'<path transform="translate({x:g} 0)" d="{d}"/>')
        x += adv + (tracking if i < len(text) - 1 else 0)
    return "\n".join(out), x
