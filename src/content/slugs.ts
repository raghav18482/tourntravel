// Every page URL on the site. The proxy uses this list to return a real 404 for
// unknown URLs, and the sitemap is built from it, so add new pages here.
export const STATIC_PATHS = ["/", "/destinations", "/about", "/gallery", "/contact", "/feedback", "/privacy-policy"] as const;

export const DESTINATION_SLUGS = ["uttarakhand", "himachal-pradesh", "manali", "jammu-kashmir", "rajasthan", "mathura-vrindavan"] as const;

export const PACKAGE_SLUGS = ["rishikesh-6-day-tour"] as const;

// Internal path that matches no route, so Next serves app/global-not-found.tsx.
export const UNMATCHED_PATH = "/__not-found";
