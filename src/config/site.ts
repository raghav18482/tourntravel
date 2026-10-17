// Every business detail lives here. Change it once and the site, footer and
// structured data all update. Lines marked "TO CONFIRM" are listed by
// `npm run launch-check` until they are filled in.

const phoneDigits = "919928545048";

type Weekday = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";

export const site = {
  name: "Deepak Tour & Travel",
  shortName: "Deepak Travel",
  owner: "Deepak Swami",
  description:
    "Custom tour packages for Rishikesh, Uttarakhand, Himachal, Manali, Kashmir, Rajasthan and Mathura Vrindavan, planned personally by Deepak Swami. Enquire on WhatsApp.",

  phone: {
    display: "+91 99285 45048",
    e164: `+${phoneDigits}`,
    href: `tel:+${phoneDigits}`,
  },
  whatsapp: {
    number: phoneDigits,
    url: `https://wa.me/${phoneDigits}`,
  },

  email: null as string | null, // TO CONFIRM: business email

  address: {
    streetAddress: "Gali No 1, Hanuman Hatha, Gavra Devi Floor Mill, Government Press Road, Civil Lines" as string | null, // from Justdial listing
    locality: "Bikaner" as string | null,
    region: "Rajasthan" as string | null,
    postalCode: "334001" as string | null,
    country: "IN",
  },
  geo: null as { latitude: number; longitude: number } | null, // TO CONFIRM: office coordinates
  mapsUrl: null as string | null, // TO CONFIRM: Google Maps link to the office
  mapsEmbedUrl: null as string | null, // TO CONFIRM: Google Maps "Embed a map" src URL

  // Leave empty until confirmed; schema.org openingHours is omitted while empty.
  // Example: [{ days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "09:00", closes: "20:00" }]
  openingHours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], opens: "00:00", closes: "23:59" }, // open 24 hours per Justdial
  ] as { days: Weekday[]; opens: string; closes: string }[],

  social: {
    instagram: "https://www.instagram.com/deepakswamitourand/", // TO CONFIRM: verify Instagram handle
    facebook: "https://www.facebook.com/people/Deepak-Swami/100022941488310/",
    justdial: "https://jsdl.in/DT-99KOA68TLEA",
    googleBusiness: null as string | null, // TO CONFIRM: Google Business Profile link
  },

  // Trust numbers are hidden on the site until set. Never fill these with estimates.
  // Years and trips are stated by the owner and shown as "15+" and "2,000+" (also mentioned in the About copy).
  stats: {
    happyTravellers: null as number | null, // TO CONFIRM: number of happy travellers
    yearsExperience: 15 as number | null,
    tripsCompleted: 2000 as number | null,
    justdialRating: null as number | null, // TO CONFIRM: current Justdial rating, e.g. 4.8
    justdialReviewCount: null as number | null, // TO CONFIRM: Justdial review count
  },

  brand: {
    themeColor: "#0E3B3A",
    backgroundColor: "#FCFAF6",
  },

  // Bump when content changes; used for sitemap lastModified.
  contentUpdated: "2026-10-15",
} as const;

export type Site = typeof site;

export function whatsappLink(text?: string) {
  return text ? `${site.whatsapp.url}?text=${encodeURIComponent(text)}` : site.whatsapp.url;
}

export function hasAddress() {
  return Boolean(site.address.streetAddress && site.address.locality);
}

export function formattedAddress() {
  const a = site.address;
  return [a.streetAddress, a.locality, a.region, a.postalCode].filter(Boolean).join(", ");
}

export function siteUrl(path = "/") {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000");
  return new URL(path, base.endsWith("/") ? base : `${base}/`).toString();
}
