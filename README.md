# Deepak Tour & Travel — website

A fast, SEO-first, fully static website for **Deepak Tour & Travel** (owner: Deepak Swami). Every page pushes visitors toward one action: sending an enquiry on WhatsApp.

- **Next.js 16** (App Router, Cache Components, Turbopack) · **React 19** · **TypeScript** · **Tailwind CSS 4**
- Every page is prerendered to static HTML at build time. The build fails if a page stops being static (`ensureStatic` in `src/app/[locale]/layout.tsx`).
- Lighthouse (mobile, production build, placeholder photos): **Performance 95–98, Accessibility 100, Best Practices 100, SEO 100**, CLS 0, Total Blocking Time ≤ 20 ms.

---

## Quick start

Requires Node.js 20.9 or newer (developed on Node 24).

```bash
npm install
cp .env.example .env.local   # then fill in the values you have
npm run dev                  # http://localhost:3000
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Local development server |
| `npm run build` | Production build (all pages prerendered) |
| `npm start` | Serve the production build locally |
| `npm run lint` / `npm run typecheck` | ESLint / TypeScript checks |
| `npm run launch-check` | Pre-launch audit (see [Launch checklist](#launch-checklist)) |
| `npm run images:placeholders` | Recreate any missing placeholder photos (never overwrites real photos) |

## Environment variables

Set these in `.env.local` for local work and in your hosting dashboard for production. All are optional locally; `NEXT_PUBLIC_SITE_URL` is required in production.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Live domain, e.g. `https://www.example.com`. Used for canonical URLs, the sitemap and Open Graph links. On Vercel it falls back to the production domain automatically. |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 measurement ID (`G-…`). Analytics is not loaded when empty. |
| `GOOGLE_SITE_VERIFICATION` | Google Search Console "HTML tag" verification code. |
| `NEXT_PUBLIC_LEAD_ENDPOINT` | Backup capture for form submissions (Google Apps Script or Formspree URL). Skipped when empty. |

---

## Editing content

All copy lives in data files. Components contain no hard-coded text.

| What | File |
| --- | --- |
| Business details: phone, WhatsApp, address, email, socials, opening hours, trust numbers | `src/config/site.ts` |
| Destination guides (one file each) | `src/content/en/destinations/*.ts` |
| Rishikesh 6-day package (itinerary, inclusions, price, FAQs) | `src/content/en/packages/rishikesh-6-day-tour.ts` |
| Home, About, Gallery, Contact, Feedback, Privacy, Destinations overview | `src/content/en/pages.ts` |
| Buttons, labels, form messages and other UI text | `src/messages/en.json` |
| Testimonials | `src/content/testimonials.json` |
| Every image and its alt text | `src/content/images.ts` |
| Which URLs exist (used by the 404 handling and the sitemap) | `src/content/slugs.ts` |

**Things to know**

- Lines marked `// TO CONFIRM` or `// VERIFY` are details only Deepak can supply or check. `npm run launch-check` lists every one.
- Trust numbers (happy travellers, years in business, Justdial rating) stay **hidden** until you set real values in `site.ts`. Never enter estimates.
- **Testimonials:** entries with `"placeholder": true` show only in development, labelled "Placeholder", and are never published. Add real reviews (with the traveller's permission) and remove the flag. With no real reviews, the section links to Justdial instead.
- **Package price:** set `price.amount` (₹ per person) in the package file. While it is `null` the site shows "Price on request". The pickup, stay, meals, group size and cancellation facts work the same way.
- After changing content, bump `contentUpdated` in `site.ts` (used for the sitemap's last-modified date).

### Adding a new destination

1. Add its slug to `DESTINATION_SLUGS` in `src/content/slugs.ts`.
2. Copy one of the files in `src/content/en/destinations/`, rename it and rewrite the content (TypeScript will show any missing fields).
3. Register it in the `destinations` array in `src/content/index.ts` (array order = order on the site).
4. Add its photos to `public/images/` and register them in `src/content/images.ts`.

The page, card, menu link, sitemap entry, Open Graph image and structured data are all generated automatically.

---

## Images

Every photo is currently a **labelled placeholder** in `public/images/` at its exact target size. To replace one:

1. Export your photo as a JPG at the size below (sRGB, quality ~80, ideally under 400 KB; the site serves resized AVIF/WebP automatically).
2. Save it over the placeholder **with exactly the same file name**.
3. Update its `alt` text in `src/content/images.ts` so it describes the new photo.
4. Rebuild. Width, height and the blur placeholder are picked up automatically.

`npm run launch-check` lists every photo that is still a placeholder.

| File | Size (px) | Ratio | Used on |
| --- | --- | --- | --- |
| `home-hero-himalayan-valley.jpg` | 2400 × 1350 | 16:9 | Home page hero |
| `rishikesh-ganga-aarti.jpg` | 2400 × 1350 | 16:9 | Rishikesh package hero + featured card |
| `rishikesh-morning-yoga-ganga.jpg` | 1200 × 1500 | 4:5 | Home featured package, gallery |
| `rishikesh-triveni-ghat-evening.jpg` | 1200 × 900 | 4:3 | Rishikesh itinerary, Day 1 |
| `rishikesh-kunjapuri-sunrise.jpg` | 1200 × 900 | 4:3 | Rishikesh itinerary, Day 2 |
| `rishikesh-neer-garh-waterfall.jpg` | 1200 × 900 | 4:3 | Rishikesh itinerary, Day 3 |
| `rishikesh-camping-bonfire.jpg` | 1200 × 900 | 4:3 | Rishikesh itinerary, Day 4 |
| `rishikesh-ancient-temple-tapkeshwar.jpg` | 1200 × 900 | 4:3 | Rishikesh itinerary, Day 5 |
| `rishikesh-riverside-scooty-ride.jpg` | 1200 × 900 | 4:3 | Rishikesh itinerary, Day 6 |
| `rajasthan-jaisalmer-dunes.jpg` | 2400 × 1350 | 16:9 | Rajasthan hero + card |
| `rajasthan-amer-fort-jaipur.jpg` | 1500 × 1000 | 3:2 | Rajasthan page, gallery |
| `rajasthan-udaipur-lake-pichola.jpg` | 1200 × 1500 | 4:5 | Rajasthan page, gallery |
| `rajasthan-jodhpur-blue-city.jpg` | 1500 × 1000 | 3:2 | Rajasthan page, gallery |
| `uttarakhand-himalayan-peaks.jpg` | 2400 × 1350 | 16:9 | Uttarakhand hero + card |
| `uttarakhand-mussoorie-hills.jpg` | 1500 × 1000 | 3:2 | Uttarakhand page, gallery |
| `uttarakhand-rishikesh-laxman-jhula.jpg` | 1200 × 1500 | 4:5 | Uttarakhand page, gallery |
| `uttarakhand-nainital-lake.jpg` | 1500 × 1000 | 3:2 | Uttarakhand page, gallery |
| `himachal-kullu-valley.jpg` | 2400 × 1350 | 16:9 | Himachal Pradesh hero + card |
| `himachal-shimla-ridge.jpg` | 1500 × 1000 | 3:2 | Himachal page, gallery |
| `himachal-dharamshala-mcleodganj.jpg` | 1200 × 1500 | 4:5 | Himachal page, gallery |
| `himachal-spiti-key-monastery.jpg` | 1500 × 1000 | 3:2 | Himachal page, gallery |
| `manali-solang-valley.jpg` | 2400 × 1350 | 16:9 | Manali hero + card |
| `manali-atal-tunnel-sissu.jpg` | 1500 × 1000 | 3:2 | Manali page, gallery |
| `manali-old-manali-cafes.jpg` | 1200 × 1500 | 4:5 | Manali page, gallery |
| `manali-hadimba-temple.jpg` | 1500 × 1000 | 3:2 | Manali page, gallery |
| `jammu-kashmir-dal-lake-shikara.jpg` | 2400 × 1350 | 16:9 | Jammu & Kashmir hero + card |
| `jammu-kashmir-gulmarg-gondola.jpg` | 1500 × 1000 | 3:2 | Jammu & Kashmir page, gallery |
| `jammu-kashmir-pahalgam-betaab-valley.jpg` | 1200 × 1500 | 4:5 | Jammu & Kashmir page, gallery |
| `jammu-kashmir-vaishno-devi-katra.jpg` | 1500 × 1000 | 3:2 | Jammu & Kashmir page, gallery |
| `mathura-vrindavan-prem-mandir.jpg` | 2400 × 1350 | 16:9 | Mathura Vrindavan hero + card |
| `vrindavan-banke-bihari-temple.jpg` | 1200 × 1500 | 4:5 | Mathura Vrindavan page, gallery |
| `mathura-vishram-ghat-aarti.jpg` | 1500 × 1000 | 3:2 | Mathura Vrindavan page, gallery |
| `mathura-vrindavan-holi-celebration.jpg` | 1500 × 1000 | 3:2 | Mathura Vrindavan page, gallery |
| `deepak-swami-owner-portrait.jpg` | 800 × 1000 | 4:5 | About page owner photo |

The Open Graph images (link previews on WhatsApp, Facebook, X) are generated automatically per page as branded cards, so they don't need photos. They are kept small because WhatsApp drops large preview images.

---

## How enquiries reach WhatsApp

Both forms (Trip enquiry on `/contact` and the package page, Feedback on `/feedback`) work the same way:

1. Fields are validated in the browser (Indian mobile numbers: 10 digits starting 6–9, with or without `+91`/`0`).
2. A neatly formatted message is built, e.g.

   ```
   🙏 New Trip Enquiry – Deepak Tour & Travel

   Name: Priya Sharma
   Phone: +91 98765 43210
   Package: Manali
   Travel date: 20 Dec 2026
   Travellers: 4
   Message: …
   ```

3. A backup copy is sent to `NEXT_PUBLIC_LEAD_ENDPOINT` (if set) **before** WhatsApp opens, so the enquiry isn't lost if the visitor never taps Send.
4. WhatsApp opens: the app on phones, WhatsApp Web in a new tab on desktop. The visitor sees "Almost done: tap Send in WhatsApp", with a fallback button if the browser blocked the new tab.

"Enquire" buttons on destination and package cards open WhatsApp directly with the trip name pre-filled. "Plan a custom trip" links to `/contact?trip=<slug>`, which pre-selects the dropdown.

### Backup capture with Google Sheets (free)

1. Create a Google Sheet, then **Extensions → Apps Script**, and paste:

   ```js
   function doPost(e) {
     const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
     const p = e.parameter;
     sheet.appendRow([
       new Date(), p.kind, p.name, p.phone, p.email, p.trip, p.date,
       p.travellers, p.budget, p.message, p.rating, p.feedback, p.publish, p.page,
     ]);
     return ContentService.createTextOutput("ok");
   }
   ```

2. **Deploy → New deployment → Web app**, with *Execute as: Me* and *Who has access: Anyone*.
3. Put the web-app URL in `NEXT_PUBLIC_LEAD_ENDPOINT`.

**Formspree** also works: create a form and use its endpoint (`https://formspree.io/f/…`) as the value.

The endpoint URL is visible in the browser (as with any form backend). A hidden honeypot field filters most spam bots.

---

## SEO

- One H1 per page, unique titles (≤ 60 characters) and descriptions (≤ 155), canonical URLs, Open Graph and Twitter tags. `launch-check` verifies all of these on every built page.
- Structured data (JSON-LD):
  - **TravelAgency** on every page.
  - **TouristDestination** on destination pages.
  - **TouristTrip + Offer** (with the itinerary) on the package page.
  - **FAQPage** wherever FAQs appear.
  - **BreadcrumbList** on inner pages.
  - Details marked TO CONFIRM (address, geo, hours) are left out rather than faked.
- `sitemap.xml` (with image entries) and `robots.txt` are generated. Vercel preview and Netlify deploy-preview builds automatically send `Disallow: /` so they never compete with the live site.
- Unknown URLs return a real **404** status with the branded "page not found" page (handled in `src/proxy.ts`).
- Google only shows FAQ rich results for government and health sites today, but the FAQ markup and content still help rankings and AI search answers.

**Analytics events** (GA4, when `NEXT_PUBLIC_GA_ID` is set): `generate_lead` (enquiry form), `feedback_submit`, `whatsapp_click` and `phone_call_click`. The last two fire for every WhatsApp and phone link, with a `location` parameter such as `hero`, `mobile_bar` or `card_manali`.

---

## Launch checklist

Run `npm run build && npm run launch-check`. It prints:

1. SEO checks for every built page (fails the run if any page breaks a rule)
2. Every `TO CONFIRM` / `VERIFY` item in the config and content
3. Placeholder photos still to replace
4. Whether real testimonials exist
5. Missing production environment variables

`npm run launch-check -- --strict` also fails while anything is still pending, which is useful as a final gate.

Then, after going live:

- [ ] Set `NEXT_PUBLIC_SITE_URL` to the real domain and redeploy.
- [ ] Add the site to **Google Search Console**, verify it (`GOOGLE_SITE_VERIFICATION`) and submit `https://<domain>/sitemap.xml`.
- [ ] Link the website from the **Google Business Profile**, and keep name, address and phone identical everywhere (site, Google, Justdial, social profiles).
- [ ] Have the privacy policy reviewed.
- [ ] Replace placeholder photos, then re-run Lighthouse (see below). Large photos are the most common reason scores drop.

### Checking performance

```bash
npm run build && npm start
npx lighthouse http://localhost:3000 --form-factor=mobile --view
```

Or use PageSpeed Insights on the live URL.

---

## Deploying

### Vercel

1. Push this folder to a GitHub/GitLab/Bitbucket repository.
2. On vercel.com: **Add New → Project**, import the repository (Next.js is detected automatically).
3. Add the environment variables, then **Deploy**.
4. Add your domain under **Settings → Domains**, and set `NEXT_PUBLIC_SITE_URL` to it.

Vercel's free **Hobby** plan is for **non-commercial** use only, so a business website should use **Vercel Pro**. Alternatively, Netlify's free tier allows commercial sites.

### Netlify

Import the repository at app.netlify.com. Netlify detects Next.js and configures the build automatically. Add the same environment variables and your domain.

---

## Adding Hindi later

Routing is already locale-aware: English is served without a prefix, and Hindi would live at `/hi/…`.

1. Add `"hi"` to `locales` in `src/i18n/routing.ts`, plus entries in `htmlLang` / `ogLocale` in `src/lib/metadata.ts`.
2. Create `src/messages/hi.json` (same keys as `en.json`) and a `src/content/hi/` copy of the content, then register it in `src/content/index.ts`.
3. Add a Devanagari font pairing in `src/app/fonts.ts`, a language toggle in the header, and `hreflang` alternates in `buildMetadata` / the sitemap.

---

## Technical notes

- **Animations** use native CSS scroll-driven animations (`[data-reveal]` in `globals.css`) instead of Framer Motion. They look the same, ship zero JavaScript (Framer Motion added ~44 KB), and visitors who prefer reduced motion, or whose browsers lack support, simply see the content.
- **Translations** are resolved on the server and passed down as props, so no i18n runtime is shipped to the browser.
- **Embeds** are performance-safe: the Instagram strip is static images linking to the profile, and Google Maps loads only when the visitor taps "Show map".
- **Fonts** are Fraunces (headings) and Manrope (body), self-hosted via `next/font`. The brand-card OG images use vendored TTF copies in `src/assets/fonts/` (SIL Open Font License).

## Logo

The logo comes from one source file, `scripts/brand-src/logo-original.webp`. To change it, replace that file and run `node scripts/process-logo.mjs`. This regenerates the transparent header and footer versions in `src/assets/brand/`, the favicon and app icon in `src/app/`, and `public/logo.png`, which the JSON-LD uses.
