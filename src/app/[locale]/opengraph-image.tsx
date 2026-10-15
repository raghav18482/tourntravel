import { site } from "@/config/site";
import { getContent } from "@/content";
import { routing, type Locale } from "@/i18n/routing";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = site.name;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  const { home, destinations } = getContent(locale);
  return renderOg({
    eyebrow: home.hero.eyebrow,
    title: home.hero.h1,
    subtitle: destinations.map((d) => d.name).join(" · "),
  });
}
