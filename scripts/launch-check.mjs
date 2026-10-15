// Pre-launch audit. Run after `npm run build`:
//   npm run launch-check            → SEO checks fail the run; to-do items are listed
//   npm run launch-check -- --strict → also fails while TO CONFIRM items / placeholders remain
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { imageSpecs, PLACEHOLDER_TAG } from "./image-specs.mjs";

const root = process.cwd();
const strict = process.argv.includes("--strict");
const builtDir = join(root, ".next/server/app");
let failures = 0;

const red = (s) => `\x1b[31m${s}\x1b[0m`;
const green = (s) => `\x1b[32m${s}\x1b[0m`;
const yellow = (s) => `\x1b[33m${s}\x1b[0m`;
const bold = (s) => `\x1b[1m${s}\x1b[0m`;

function walk(dir, filter) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full, filter) : filter(full) ? [full] : [];
  });
}

const decode = (s) => s.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");

// 1. SEO checks on every prerendered page
console.log(bold("\n1. SEO checks on built pages"));
const pages = [join(builtDir, "en.html"), ...walk(join(builtDir, "en"), (f) => f.endsWith(".html"))].filter(existsSync);
if (!pages.length) {
  console.log(red("  No built pages found. Run `npm run build` first."));
  process.exit(1);
}
for (const file of pages) {
  const html = readFileSync(file, "utf8");
  const route = "/" + relative(builtDir, file).replace(/\.html$/, "").replace(/^en\/?/, "");
  const is404 = /not-found/.test(route);
  const problems = [];

  const title = decode(html.match(/<title>(.*?)<\/title>/)?.[1] ?? "");
  const description = decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "");
  const h1s = (html.match(/<h1[\s>]/g) ?? []).length;
  if (!title) problems.push("missing <title>");
  else if (title.length > 60) problems.push(`title ${title.length} chars (max 60)`);
  if (h1s !== 1) problems.push(`${h1s} <h1> elements (expected 1)`);

  if (!is404) {
    if (!description) problems.push("missing meta description");
    else if (description.length > 155) problems.push(`description ${description.length} chars (max 155)`);
    if (!/<link rel="canonical"/.test(html)) problems.push("missing canonical");
    if (!/<meta property="og:image"/.test(html)) problems.push("missing og:image");
  }
  const types = [];
  for (const [, json] of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
    try {
      types.push(JSON.parse(json)["@type"]);
    } catch {
      problems.push("invalid JSON-LD");
    }
  }
  if (!is404 && !types.includes("TravelAgency")) problems.push("missing TravelAgency JSON-LD");

  if (problems.length) {
    failures++;
    console.log(`  ${red("✗")} ${route}: ${problems.join("; ")}`);
  } else {
    console.log(`  ${green("✓")} ${route.padEnd(36)} title ${String(title.length).padStart(2)}  desc ${String(description.length).padStart(3)}  ${types.join(", ")}`);
  }
}

// 2. Business details still to confirm
console.log(bold("\n2. Details still marked TO CONFIRM / VERIFY"));
const sourceFiles = [...walk(join(root, "src/config"), (f) => f.endsWith(".ts")), ...walk(join(root, "src/content"), (f) => /\.(ts|json)$/.test(f))];
let todo = 0;
for (const file of sourceFiles) {
  readFileSync(file, "utf8")
    .split("\n")
    .forEach((line, i) => {
      const m = line.match(/\/\/\s*(TO CONFIRM|VERIFY)\b:?\s*(.*)$/);
      if (m) {
        todo++;
        console.log(`  ${yellow(m[1].padEnd(10))} ${relative(root, file)}:${i + 1}  ${m[2] || line.trim().slice(0, 70)}`);
      }
    });
}
if (!todo) console.log(`  ${green("✓")} nothing left to confirm`);

// 3. Placeholder photos
console.log(bold("\n3. Placeholder photos still in public/images"));
const placeholders = imageSpecs.filter((spec) => {
  const path = join(root, "public/images", spec.file);
  return existsSync(path) && readFileSync(path).includes(PLACEHOLDER_TAG);
});
placeholders.forEach((spec) => console.log(`  ${yellow("•")} ${spec.file.padEnd(42)} ${spec.width}×${spec.height} (${spec.ratio})  ${spec.usage}`));
if (!placeholders.length) console.log(`  ${green("✓")} all photos replaced`);

// 4. Testimonials
console.log(bold("\n4. Testimonials"));
const testimonials = JSON.parse(readFileSync(join(root, "src/content/testimonials.json"), "utf8"));
const real = testimonials.filter((t) => !t.placeholder).length;
console.log(
  real
    ? `  ${green("✓")} ${real} real review(s) will be shown`
    : `  ${yellow("•")} no real reviews yet: the site shows a Justdial link instead (placeholders are never published)`,
);

// 5. Environment
console.log(bold("\n5. Environment variables (production)"));
const env = {
  NEXT_PUBLIC_SITE_URL: "canonical URLs, sitemap and Open Graph links",
  NEXT_PUBLIC_GA_ID: "Google Analytics 4",
  GOOGLE_SITE_VERIFICATION: "Google Search Console",
  NEXT_PUBLIC_LEAD_ENDPOINT: "backup copy of form submissions",
};
let missingEnv = 0;
for (const [key, purpose] of Object.entries(env)) {
  const set = Boolean(process.env[key]);
  if (!set) missingEnv++;
  console.log(`  ${set ? green("✓") : yellow("•")} ${key.padEnd(28)} ${set ? "set" : "not set"}  (${purpose})`);
}

const pending = todo + placeholders.length + missingEnv;
console.log(
  bold(
    `\n${failures ? red(`${failures} page(s) failed SEO checks.`) : green("All pages passed SEO checks.")} ${pending ? yellow(`${pending} launch item(s) pending.`) : green("Ready to launch.")}\n`,
  ),
);
process.exit(failures || (strict && pending) ? 1 : 0);
