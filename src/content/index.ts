import type { Locale } from "@/i18n/routing";
import { himachalPradesh } from "./en/destinations/himachal-pradesh";
import { jammuKashmir } from "./en/destinations/jammu-kashmir";
import { manali } from "./en/destinations/manali";
import { mathuraVrindavan } from "./en/destinations/mathura-vrindavan";
import { rajasthan } from "./en/destinations/rajasthan";
import { uttarakhand } from "./en/destinations/uttarakhand";
import { rishikesh6DayTour } from "./en/packages/rishikesh-6-day-tour";
import { about, contact, destinationsPage, feedback, gallery, home, privacy } from "./en/pages";
import { DESTINATION_SLUGS, PACKAGE_SLUGS } from "./slugs";
import testimonialsJson from "./testimonials.json";
import type { DestinationSlug, PackageSlug, SiteContent, Testimonial, TripSlug } from "./types";

const en: SiteContent = {
  home,
  destinationsPage,
  // Order here is the order on the site.
  destinations: [uttarakhand, himachalPradesh, manali, jammuKashmir, rajasthan, mathuraVrindavan],
  packages: [rishikesh6DayTour],
  about,
  gallery,
  contact,
  feedback,
  privacy,
};

// Hindi: import a `hi` content object with the same shape and add it here.
const contentByLocale: Record<Locale, SiteContent> = { en };

export function getContent(locale: Locale): SiteContent {
  return contentByLocale[locale];
}

export function getDestination(locale: Locale, slug: string) {
  return getContent(locale).destinations.find((d) => d.slug === slug);
}

export function getPackage(locale: Locale, slug: string) {
  return getContent(locale).packages.find((p) => p.slug === slug);
}

export const destinationSlugs: readonly DestinationSlug[] = DESTINATION_SLUGS;
export const packageSlugs: readonly PackageSlug[] = PACKAGE_SLUGS;

export type TripOption = { value: TripSlug | "custom"; label: string };

// Options for the enquiry dropdown and gallery filters: packages first.
export function getTripOptions(locale: Locale): TripOption[] {
  const c = getContent(locale);
  return [
    ...c.packages.map((p) => ({ value: p.slug, label: p.name })),
    ...c.destinations.map((d) => ({ value: d.slug, label: d.name })),
  ];
}

export function getTripName(locale: Locale, slug: TripSlug) {
  return getTripOptions(locale).find((o) => o.value === slug)?.label ?? slug;
}

// Placeholder reviews are only shown in development, clearly labelled.
export function getTestimonials(): Testimonial[] {
  const all = testimonialsJson as Testimonial[];
  return process.env.NODE_ENV === "production" ? all.filter((t) => !t.placeholder) : all;
}
