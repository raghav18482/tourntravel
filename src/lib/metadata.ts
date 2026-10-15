import type { Metadata } from "next";
import { site, siteUrl } from "@/config/site";
import type { Seo } from "@/content/types";
import { getPathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

export const ogLocale: Record<Locale, string> = { en: "en_IN" };
export const htmlLang: Record<Locale, string> = { en: "en-IN" };

export function localizedPath(locale: Locale, href: string) {
  return getPathname({ locale, href });
}

export function localizedUrl(locale: Locale, href: string) {
  return siteUrl(localizedPath(locale, href));
}

// Titles are absolute (no template) so each stays within 60 characters.
export function buildMetadata(locale: Locale, href: string, seo: Seo): Metadata {
  const url = localizedUrl(locale, href);
  return {
    title: { absolute: seo.title },
    description: seo.description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: ogLocale[locale],
      url,
      title: seo.title,
      description: seo.description,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
    },
  };
}
