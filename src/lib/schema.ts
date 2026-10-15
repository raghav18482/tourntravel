import type {
  BreadcrumbList,
  FAQPage,
  OpeningHoursSpecification,
  TouristDestination,
  TouristTrip,
  TravelAgency,
  WithContext,
} from "schema-dts";
import { hasAddress, site, siteUrl } from "@/config/site";
import { images } from "@/content/images";
import type { Destination, Faq, TourPackage } from "@/content/types";

const ORG_ID = () => siteUrl("/#organization");

function imageUrl(key: keyof typeof images) {
  return siteUrl(images[key].src.src);
}

// Fields still marked TO CONFIRM in config are omitted rather than faked.
export function travelAgencySchema(): WithContext<TravelAgency> {
  const sameAs = [site.social.instagram, site.social.facebook, site.social.justdial, site.social.googleBusiness].filter(
    (url): url is string => Boolean(url),
  );
  const a = site.address;
  const openingHours: OpeningHoursSpecification[] = site.openingHours.map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: h.days,
    opens: h.opens,
    closes: h.closes,
  }));

  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": ORG_ID(),
    name: site.name,
    url: siteUrl("/"),
    description: site.description,
    telephone: site.phone.e164,
    ...(site.email ? { email: site.email } : {}),
    image: imageUrl("homeHero"),
    logo: siteUrl("/logo.png"),
    founder: { "@type": "Person", name: site.owner },
    areaServed: ["Uttarakhand", "Himachal Pradesh", "Rajasthan", "Uttar Pradesh"].map((name) => ({
      "@type": "State",
      name,
    })),
    ...(hasAddress()
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: a.streetAddress ?? undefined,
            addressLocality: a.locality ?? undefined,
            addressRegion: a.region ?? undefined,
            postalCode: a.postalCode ?? undefined,
            addressCountry: a.country,
          },
        }
      : {}),
    ...(site.geo ? { geo: { "@type": "GeoCoordinates", ...site.geo } } : {}),
    ...(site.mapsUrl ? { hasMap: site.mapsUrl } : {}),
    ...(openingHours.length ? { openingHoursSpecification: openingHours } : {}),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: site.phone.e164,
      contactType: "customer service",
      availableLanguage: ["English", "Hindi"],
    },
    sameAs,
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqSchema(faqs: Faq[]): WithContext<FAQPage> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function touristDestinationSchema(d: Destination, url: string): WithContext<TouristDestination> {
  return {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: d.name,
    description: d.seo.description,
    url,
    image: [d.images.hero, ...d.images.gallery].map(imageUrl),
    ...(d.geo ? { geo: { "@type": "GeoCoordinates", ...d.geo } } : {}),
    containedInPlace: { "@type": "State", name: d.state },
    includesAttraction: d.places.map((p) => ({
      "@type": "TouristAttraction",
      name: p.name,
      description: p.description,
    })),
  };
}

export function touristTripSchema(p: TourPackage, url: string): WithContext<TouristTrip> {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: p.name,
    description: p.seo.description,
    url,
    image: imageUrl(p.images.hero),
    touristType: ["Yoga and wellness", "Adventure", "Spiritual"],
    itinerary: {
      "@type": "ItemList",
      numberOfItems: p.days.length,
      itemListElement: p.days.map((day) => ({
        "@type": "ListItem",
        position: day.day,
        item: {
          "@type": "TouristAttraction",
          name: `Day ${day.day}: ${day.title}`,
          description: day.summary,
        },
      })),
    },
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: p.price.currency,
      ...(p.price.amount ? { price: p.price.amount } : {}),
      availability: "https://schema.org/InStock",
      offeredBy: { "@id": ORG_ID() },
    },
    provider: { "@id": ORG_ID() },
  };
}

