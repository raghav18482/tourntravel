"""Emblem concepts. Each returns SVG markup in a 240x240 box.
`ink` = main colour (gold), `bg` = background colour (used for knock-outs),
`hi` = secondary colour (ivory or black)."""


def road_d(ink, bg, x=0, y=0, s=1, lane=True):
    """Didone 'D' whose bowl is a road: a lane line runs through the curve."""
    return f'''<g transform="translate({x} {y}) scale({s})">
  <path fill="{ink}" d="M50 40H88V200H50V194H64V46H50Z"/>
  <path fill="{ink}" fill-rule="evenodd" d="M80 40H118C160 40 190 75 190 120C190 165 160 200 118 200H80Z M88 46H115C148 46 164 80 164 120C164 160 148 194 115 194H88Z"/>
  {_lane(bg, x, y) if lane else ""}
</g>'''


def _bez(p, t):
    a = 1 - t
    return tuple(a**3 * p[0][i] + 3 * a * a * t * p[1][i] + 3 * a * t * t * p[2][i] + t**3 * p[3][i] for i in (0, 1))


def _lane(bg, x, y, dash=9.0, gap=6.0, min_x=158.0):
    """Whole lane dashes along the middle of the bowl, only where the road is wide."""
    top = [(116.5, 43), (154, 43), (177, 77.5), (177, 120)]
    pts = [_bez(top, i / 400) for i in range(401)]
    pts.reverse()  # walk from the widest point (y=120) upwards
    acc, path = 0.0, [(pts[0], 0.0)]
    for a, b in zip(pts, pts[1:]):
        acc += ((b[0] - a[0]) ** 2 + (b[1] - a[1]) ** 2) ** 0.5
        path.append((b, acc))
    usable = max(L for (px, _), L in path if px >= min_x)

    def seg(s0, s1):
        return [pt for pt, L in path if s0 <= L <= s1]

    dashes, s0 = [], dash / 2  # one dash centred on the widest point
    halves = [seg(0, dash / 2)]
    while s0 + gap + dash <= usable:
        halves.append(seg(s0 + gap, s0 + gap + dash))
        s0 += gap + dash
    d = ""
    for i, h in enumerate(halves):
        for sign in (1, -1):
            if i == 0 and sign == -1:
                continue
            q = [(px, 120 + sign * (py - 120)) for px, py in h]
            if i == 0:  # centre dash spans both halves
                q = [(px, 240 - py) for px, py in reversed(h)] + q
            d += "M" + " L".join(f"{px:.2f} {py:.2f}" for px, py in q)
    return f'<path fill="none" stroke="{bg}" stroke-width="3.4" d="{d}"/>'


def mughal_arch(ink, sw=2.4, inner=True):
    """Fine double-line pointed (Mughal) arch with a bindu finial."""
    outer = "M22 232V104C22 64 70 30 120 8C170 30 218 64 218 104V232"
    inn = "M31 232V106C31 70 75 40 120 19C165 40 209 70 209 106V232"
    return f'''<g fill="none" stroke="{ink}">
  <path d="{outer}" stroke-width="{sw}"/>
  {f'<path d="{inn}" stroke-width="{sw*0.4}"/>' if inner else ''}
  <path d="M12 232H228" stroke-width="{sw}"/>
  <path d="M120 8V-4" stroke-width="{sw*0.6}"/>
</g>
<path fill="{ink}" d="M120 -16L125 -9L120 -2L115 -9Z"/>'''


def concept_rajpath(ink, bg, hi):
    return mughal_arch(ink) + road_d(ink, bg, x=31.2, y=66, s=0.74)


def concept_coach(ink, bg, hi):
    """'Palace on Wheels': a coach front whose windscreen is a Mughal arch."""
    sw = 3
    return f'''<g fill="none" stroke="{ink}" stroke-width="{sw}" stroke-linejoin="round">
  <path d="M58 206V64C58 42 72 30 94 28H146C168 30 182 42 182 64V206Z"/>
  <path d="M70 132V90C70 72 92 56 120 42C148 56 170 72 170 90V132Z"/>
  <path d="M58 52C42 48 34 58 34 76V92" stroke-width="{sw*0.8}"/>
  <path d="M182 52C198 48 206 58 206 76V92" stroke-width="{sw*0.8}"/>
  <path d="M102 19H138" stroke-width="{sw*0.5}"/>
  <path d="M70 171H98V179H70ZM142 171H170V179H142Z" stroke-width="{sw*0.6}"/>
  <path d="M58 194H182" stroke-width="{sw*0.5}"/>
</g>
<rect x="30" y="90" width="8" height="18" rx="1.5" fill="{ink}"/>
<rect x="202" y="90" width="8" height="18" rx="1.5" fill="{ink}"/>
<rect x="70" y="206" width="20" height="10" rx="1.5" fill="{ink}"/>
<rect x="150" y="206" width="20" height="10" rx="1.5" fill="{ink}"/>
<path fill="{ink}" d="M120 3L124.5 8.5L120 14L115.5 8.5Z"/>
<path fill="{ink}" d="M120 170L125 175L120 180L115 175Z"/>
{road_d(ink, bg, x=82.8, y=62, s=0.31, lane=False)}'''


def concept_seal(ink, bg, hi, arc_text=""):
    return f'''<g fill="none" stroke="{ink}">
  <circle cx="120" cy="120" r="116" stroke-width="2.4"/>
  <circle cx="120" cy="120" r="109" stroke-width="0.9"/>
  <circle cx="120" cy="120" r="78" stroke-width="0.9"/>
</g>
{arc_text}
<path fill="{ink}" d="M17 120L21 116L25 120L21 124ZM215 120L219 116L223 120L219 124Z"/>
{road_d(ink, bg, x=55.5, y=56, s=0.54)}'''


def icon(ink, bg):
    """App/favicon mark: the road-D alone, sized for tiny squares."""
    return road_d(ink, bg, x=2, y=-6, s=1.0)
