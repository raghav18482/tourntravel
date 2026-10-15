// Builds every logo asset from the one supplied artwork (scripts/brand-src/logo-original.webp).
//   node scripts/process-logo.mjs
// Outputs: src/assets/brand/{logo,logo-light,mark,mark-light}.png (transparent),
//          src/app/{icon,apple-icon}.png, public/logo.png (square, for JSON-LD).
import sharp from "sharp";
import { join } from "node:path";

const root = process.cwd();
const src = join(root, "scripts/brand-src/logo-original.webp");
const CREAM = [252, 250, 246];

const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H } = info;
const bg = [data[0], data[1], data[2]];

// Knock the cream background out, keep original ink/gold colours. `light` recolours ink to cream.
function build(light) {
  const out = Buffer.alloc(W * H * 4);
  for (let i = 0; i < W * H; i++) {
    const r = data[i * 4], g = data[i * 4 + 1], b = data[i * 4 + 2];
    const dist = Math.hypot(r - bg[0], g - bg[1], b - bg[2]);
    const a = Math.max(0, Math.min(1, (dist - 10) / 70));
    const isGold = r - b > 45;
    const [R, G, B] = light && !isGold ? CREAM : [r, g, b];
    out.set([R, G, B, Math.round(a * 255)], i * 4);
  }
  return out;
}

function bbox(buf, y0 = 0, y1 = H) {
  let x0 = W, x1 = 0, ya = H, yb = 0;
  for (let y = y0; y < y1; y++)
    for (let x = 0; x < W; x++)
      if (buf[(y * W + x) * 4 + 3] > 40) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); ya = Math.min(ya, y); yb = Math.max(yb, y); }
  return { left: x0, top: ya, width: x1 - x0 + 1, height: yb - ya + 1 };
}

const dark = build(false);
const light = build(true);
const full = bbox(dark);
// The mark (D + bus + road) ends above the DEEPAK wordmark; find the gap row.
let gapY = 0;
for (let y = full.top + 100; y < full.top + full.height; y++) {
  let any = false;
  for (let x = 0; x < W && !any; x++) any = dark[(y * W + x) * 4 + 3] > 40;
  if (!any) { gapY = y; break; }
}
const markBox = bbox(dark, 0, gapY);
const pad = 12;
const grow = (b) => ({ left: Math.max(0, b.left - pad), top: Math.max(0, b.top - pad), width: Math.min(W - b.left + pad, b.width + pad * 2), height: Math.min(H - b.top + pad, b.height + pad * 2) });

const raw = { raw: { width: W, height: H, channels: 4 } };
const crop = (buf, box) => sharp(buf, raw).extract(grow(box));
const assets = join(root, "src/assets/brand");

await crop(dark, full).png({ compressionLevel: 9 }).toFile(join(assets, "logo.png"));
await crop(light, full).png({ compressionLevel: 9 }).toFile(join(assets, "logo-light.png"));
await crop(dark, markBox).png({ compressionLevel: 9 }).toFile(join(assets, "mark.png"));
await crop(light, markBox).png({ compressionLevel: 9 }).toFile(join(assets, "mark-light.png"));

// Square icons: the mark centred on cream.
async function square(size, file, inset = 0.14) {
  const inner = Math.round(size * (1 - inset * 2));
  const mark = await crop(dark, markBox).resize({ width: inner, height: inner, fit: "inside" }).png().toBuffer();
  await sharp({ create: { width: size, height: size, channels: 3, background: { r: CREAM[0], g: CREAM[1], b: CREAM[2] } } })
    .composite([{ input: mark, gravity: "center" }]).png({ compressionLevel: 9 }).toFile(file);
}
await square(512, join(root, "src/app/icon.png"));
await square(180, join(root, "src/app/apple-icon.png"), 0.1);
await square(512, join(root, "public/logo.png"), 0.1);
console.log("full", full, "mark", markBox, "gapY", gapY);
