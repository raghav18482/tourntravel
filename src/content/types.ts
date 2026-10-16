import type { ImageKey } from "./images";
import type { DESTINATION_SLUGS, PACKAGE_SLUGS } from "./slugs";

export type Seo = { title: string; description: string };

export type Faq = { question: string; answer: string };

export type DestinationSlug = (typeof DESTINATION_SLUGS)[number];

export type PackageSlug = (typeof PACKAGE_SLUGS)[number];

export type TripSlug = DestinationSlug | PackageSlug;

export type Place = { name: string; description: string };

export type Season = {
  name: string;
  months: string;
  description: string;
  recommended?: boolean;
};

export type TripLength = { days: string; title: string; route: string; summary: string; packageSlug?: PackageSlug };

export type Destination = {
  slug: DestinationSlug;
  name: string;
  state: string;
  parent?: DestinationSlug;
  seo: Seo;
  h1: string;
  heroTagline: string;
  cardSummary: string;
  highlights: string[];
  intro: string[];
  places: Place[];
  bestTime: { summary: string; seasons: Season[] };
  durations: TripLength[];
  subSection?: { heading: string; body: string[]; linkLabel: string; linkSlug: DestinationSlug };
  faqs: Faq[];
  related: DestinationSlug[];
  relatedPackage?: PackageSlug;
  geo?: { latitude: number; longitude: number };
  images: { hero: ImageKey; gallery: ImageKey[] };
};

export type PackageFact = {
  label: string;
  value: string | null; // null shows the fallback text until confirmed
  fallback: string;
};

export type ItineraryDay = {
  day: number;
  title: string;
  summary: string;
  activities: string[];
  image: ImageKey;
};

export type TourPackage = {
  slug: PackageSlug;
  name: string;
  shortName: string;
  badge: string;
  destination: DestinationSlug;
  location: string;
  seo: Seo;
  h1: string;
  tagline: string;
  heroHighlights: string[];
  cardSummary: string;
  overview: string[];
  durationDays: number;
  durationNights: number;
  price: { amount: number | null; currency: "INR"; unit: string; onRequestLabel: string };
  facts: PackageFact[];
  days: ItineraryDay[];
  inclusions: string[];
  addOns: { title: string; description: string; note: string }[];
  exclusions: string[];
  thingsToCarry: string[];
  faqs: Faq[];
  images: { hero: ImageKey; card: ImageKey };
};

export type TrustPoint = { icon: IconName; title: string; body: string };

export type IconName =
  | "compass"
  | "route"
  | "rupee"
  | "chat"
  | "shield"
  | "heart"
  | "mountain"
  | "sun"
  | "users"
  | "calendar";

export type HomeContent = {
  seo: Seo;
  hero: { eyebrow: string; h1: string; subheading: string; image: ImageKey; points: string[] };
  featured: { eyebrow: string; heading: string; body: string; bullets: string[]; image: ImageKey };
  destinations: { eyebrow: string; heading: string; intro: string };
  whyUs: { eyebrow: string; heading: string; intro: string; points: TrustPoint[] };
  testimonials: { eyebrow: string; heading: string; intro: string };
  gallery: { eyebrow: string; heading: string; intro: string; images: ImageKey[] };
  faqs: { heading: string; items: Faq[] };
  cta: { heading: string; body: string };
};

export type DestinationsPageContent = {
  seo: Seo;
  h1: string;
  intro: string;
  regionsHeading: string;
  howItWorks: { heading: string; steps: { title: string; body: string }[] };
  faqs: Faq[];
};

export type AboutContent = {
  seo: Seo;
  h1: string;
  intro: string;
  story: { heading: string; paragraphs: string[] };
  owner: { heading: string; name: string; role: string; paragraphs: string[]; image: ImageKey };
  // Experience stats that are not numbers in site config (the years and trips come from config).
  highlights: { icon: IconName; value: string; label: string }[];
  vehicle: { heading: string; paragraphs: string[]; photos: ImageKey[] };
  values: { heading: string; points: TrustPoint[] };
};

export type GalleryContent = {
  seo: Seo;
  h1: string;
  intro: string;
  items: { image: ImageKey; tags: TripSlug[] }[];
};

export type ContactContent = {
  seo: Seo;
  h1: string;
  intro: string;
  formHeading: string;
  formIntro: string;
  directHeading: string;
  responseNote: string;
  mapHeading: string;
};

export type FeedbackContent = {
  seo: Seo;
  h1: string;
  intro: string;
  formHeading: string;
  reviewPrompt: string;
};

export type LegalContent = {
  seo: Seo;
  h1: string;
  updated: string;
  sections: { heading: string; paragraphs: string[] }[];
};

export type Testimonial = {
  name: string;
  location?: string;
  trip: string;
  rating: 1 | 2 | 3 | 4 | 5;
  quote: string;
  date?: string;
  placeholder?: boolean;
};

export type SiteContent = {
  home: HomeContent;
  destinationsPage: DestinationsPageContent;
  destinations: Destination[];
  packages: TourPackage[];
  about: AboutContent;
  gallery: GalleryContent;
  contact: ContactContent;
  feedback: FeedbackContent;
  privacy: LegalContent;
};
