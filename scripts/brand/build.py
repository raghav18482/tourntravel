"""Builds the Deepak Tour N Travel logo kit into public/brand/.

    python3 scripts/brand/build.py        # SVGs
    node scripts/brand/export-png.mjs     # PNGs from those SVGs
"""
import math, os, sys
sys.path.insert(0, os.path.dirname(__file__))
from glyphs import didone, sans, SANS
from emblems import concept_rajpath, concept_coach, concept_seal, icon

BLACK, IVORY = "#14120F", "#F3ECDD"
GOLD = "#B4945C"            # antique gold on black
GOLD_DEEP = "#9C7B42"       # same gold, darkened for contrast on ivory
OUT = os.path.join(os.path.dirname(__file__), "..", "..", "public", "brand")

THEMES = {
    "black": dict(bg=BLACK, ink=GOLD, sub=IVORY),
    "ivory": dict(bg=IVORY, ink=GOLD_DEEP, sub=BLACK),
}


def svg(w, h, body, bg, title="Deepak Tour N Travel"):
    fill = f'<rect width="{w}" height="{h}" fill="{bg}"/>' if bg else ""
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w:g} {h:g}" role="img" aria-label="{title}">\n'
            f"<title>{title}</title>\n{fill}\n{body}\n</svg>\n")


def wordmark(x, y, cap, ink, sub_ink, sub_cap, sub_gap, centered_w=None):
    """DEEPAK + hairline rule with diamond + TOUR N TRAVEL, sub-line justified to the wordmark width."""
    word, ww = didone("DEEPAK", tracking=34)
    s = cap / 100
    word_w = ww * s
    text = "TOUR N TRAVEL"
    _, bare = sans(text, tracking=0, word_space=0)
    letters = sum(1 for c in text if c != " ")
    tr = (word_w / (sub_cap / 100) - bare) / ((letters - 3) + 2 * 2.1)
    sub, sub_w = sans(text, tracking=tr, word_space=tr * 2.1)
    ry = y + cap + sub_gap
    sy = ry + sub_gap * 0.85
    mid = x + word_w / 2
    out = f'''<g transform="translate({x:g} {y:g}) scale({s:g})" fill="{ink}">{word}</g>
<path d="M{x:g} {ry:g}H{mid-12:g}M{mid+12:g} {ry:g}H{x+word_w:g}" stroke="{ink}" stroke-width="1" fill="none"/>
<path fill="{ink}" d="M{mid:g} {ry-4:g}L{mid+4:g} {ry:g}L{mid:g} {ry+4:g}L{mid-4:g} {ry:g}Z"/>
<g transform="translate({x + (word_w - sub_w * sub_cap / 100) / 2:g} {sy:g}) scale({sub_cap / 100:g})" fill="none" stroke="{sub_ink}" stroke-width="10.5">{sub}</g>'''
    return out, word_w, sy + sub_cap - y


def stacked(emblem_fn, t, em_w=190):
    W, cap = 520, 46
    word_w = didone("DEEPAK", tracking=34)[1] * cap / 100
    em_s = em_w / 240
    ey = 56
    wy = ey + 240 * em_s + 46
    text, _, th = wordmark((W - word_w) / 2, wy, cap, t["ink"], t["sub"], 12, 26)
    H = round(wy + th + 56)
    body = f'<g transform="translate({(W - em_w) / 2:g} {ey:g}) scale({em_s:g})">{emblem_fn(t["ink"], t["bg"], t["sub"])}</g>\n{text}'
    return svg(W, H, body, t["bg"])


def horizontal(emblem_fn, t):
    H, em_h, cap = 220, 150, 50
    em_s = em_h / 240
    ex, ey = 44, (H - em_h) / 2 + 4
    rule_x = ex + em_h + 34
    tx = rule_x + 36
    word_w = didone("DEEPAK", tracking=34)[1] * cap / 100
    block_h = cap + 22 * 1.85 + 12
    text, _, _ = wordmark(tx, (H - block_h) / 2, cap, t["ink"], t["sub"], 12, 22)
    W = round(tx + word_w + 48)
    body = (f'<g transform="translate({ex:g} {ey:g}) scale({em_s:g})">{emblem_fn(t["ink"], t["bg"], t["sub"])}</g>\n'
            f'<path d="M{rule_x:g} {H/2-52:g}V{H/2+52:g}" stroke="{t["ink"]}" stroke-width="1"/>\n{text}')
    return svg(W, H, body, t["bg"])


def arc_text(text, r, centre_deg, cap, ink, tracking, bottom=False):
    """Monoline caps set around a circle centred on (120,120)."""
    s = cap / 100
    widths = [(SANS[c][0] if c != " " else 40) * s for c in text]
    total = sum(widths) + tracking * s * (len(text) - 1)
    sign = -1 if bottom else 1
    a = math.radians(centre_deg) - sign * total / r / 2
    out = []
    for ch, w in zip(text, widths):
        if ch != " ":
            mid = a + sign * w / 2 / r
            px, py = 120 + r * math.sin(mid), 120 - r * math.cos(mid)
            rot = math.degrees(mid) + (180 if bottom else 0)
            out.append(f'<g transform="translate({px:.2f} {py:.2f}) rotate({rot:.2f}) scale({s:g}) '
                       f'translate({-SANS[ch][0] / 2:g} -50)"><path d="{SANS[ch][1]}"/></g>')
        a += sign * (w + tracking * s) / r
    return f'<g fill="none" stroke="{ink}" stroke-width="10">{"".join(out)}</g>'


def seal(t):
    top = arc_text("DEEPAK", 94, 0, 15, t["ink"], 70)
    bot = arc_text("TOUR N TRAVEL", 94, 180, 11, t["ink"], 50, bottom=True)
    body = f'<g transform="translate(20 20)">{concept_seal(t["ink"], t["bg"], None, top + bot)}</g>'
    return svg(280, 280, body, t["bg"])


def app_icon(t, radius=0):
    body = (f'<rect width="240" height="240" rx="{radius}" fill="{t["bg"]}"/>\n'
            f'<g transform="translate(120 120) scale(.82) translate(-120 -120)">{icon(t["ink"], t["bg"])}</g>')
    return svg(240, 240, body, None, "Deepak Tour N Travel monogram")


if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    for name, t in THEMES.items():
        files = {
            f"deepak-logo-{name}.svg": stacked(concept_coach, t),
            f"deepak-logo-horizontal-{name}.svg": horizontal(concept_coach, t),
            f"deepak-logo-rajpath-{name}.svg": stacked(concept_rajpath, t),
            f"deepak-seal-{name}.svg": seal(t),
            f"deepak-monogram-{name}.svg": app_icon(t, radius=0),
        }
        for fn, content in files.items():
            open(os.path.join(OUT, fn), "w").write(content)
    print(sorted(os.listdir(OUT)))
