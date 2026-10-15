// Renders every SVG in public/brand to a high-resolution PNG (for Canva,
// WhatsApp, printers and social profiles). Run after build.py.
import { readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const dir = path.resolve(import.meta.dirname, "../../public/brand");
const out = path.join(dir, "png");
const files = (await readdir(dir)).filter((f) => f.endsWith(".svg"));

await import("node:fs/promises").then((fs) => fs.mkdir(out, { recursive: true }));
for (const f of files) {
  const width = f.includes("monogram") || f.includes("seal") ? 1024 : 2400;
  await sharp(path.join(dir, f), { density: 600 })
    .resize({ width })
    .png()
    .toFile(path.join(out, f.replace(/\.svg$/, ".png")));
  console.log("png/" + f.replace(/\.svg$/, ".png"));
}
