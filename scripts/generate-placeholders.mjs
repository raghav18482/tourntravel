// Creates labelled placeholder photos in public/images/ at the exact target size.
// Existing files are never overwritten unless you pass --force, so real photos are safe.
import { existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";
import { imageSpecs, PLACEHOLDER_TAG } from "./image-specs.mjs";

const outDir = join(process.cwd(), "public", "images");
const force = process.argv.includes("--force");

const tones = {
  teal: ["#0E3B3A", "#2E7D72", "#E7D9C3"],
  saffron: ["#8A3A1A", "#E3892B", "#FBEBD3"],
  terracotta: ["#5B2A1A", "#C2562F", "#F3E1CF"],
};

function escapeXml(value) {
  return value.replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[c]);
}

function svgFor({ file, width, height, ratio, usage, tone }) {
  const [dark, mid, light] = tones[tone] ?? tones.teal;
  const base = Math.min(width, height);
  const title = Math.round(base * 0.05);
  const small = Math.round(base * 0.032);
  const ridge = (offset, color, opacity) => {
    const y = height * offset;
    return `<path d="M0 ${y} L${width * 0.18} ${y - height * 0.16} L${width * 0.32} ${y - height * 0.06} L${width * 0.5} ${y - height * 0.24} L${width * 0.68} ${y - height * 0.08} L${width * 0.84} ${y - height * 0.2} L${width} ${y - height * 0.05} L${width} ${height} L0 ${height} Z" fill="${color}" opacity="${opacity}"/>`;
  };
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${light}"/><stop offset="1" stop-color="${mid}"/></linearGradient></defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <circle cx="${width * 0.76}" cy="${height * 0.28}" r="${base * 0.09}" fill="#FFF7E8" opacity="0.7"/>
  ${ridge(0.78, mid, 0.55)}
  ${ridge(0.92, dark, 0.8)}
  <g font-family="Helvetica, Arial, sans-serif" fill="#FFFFFF" text-anchor="middle">
    <text x="50%" y="${height * 0.42}" font-size="${small}" letter-spacing="4" opacity="0.9" fill="${dark}">PLACEHOLDER · REPLACE WITH REAL PHOTO</text>
    <text x="50%" y="${height * 0.42 + title * 1.4}" font-size="${title}" font-weight="700" fill="${dark}">${escapeXml(file)}</text>
    <text x="50%" y="${height * 0.42 + title * 1.4 + small * 1.8}" font-size="${small}" fill="${dark}">${width}×${height} · ${ratio} · ${escapeXml(usage)}</text>
  </g>
</svg>`;
}

mkdirSync(outDir, { recursive: true });
let written = 0;
for (const spec of imageSpecs) {
  const target = join(outDir, spec.file);
  if (existsSync(target) && !force) continue;
  await sharp(Buffer.from(svgFor(spec)))
    .jpeg({ quality: 72, mozjpeg: true })
    .withExif({ IFD0: { ImageDescription: PLACEHOLDER_TAG } })
    .toFile(target);
  written++;
}
console.log(`Placeholders: ${written} written, ${imageSpecs.length - written} kept (${outDir})`);
