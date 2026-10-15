import { site } from "@/config/site";
import { destinationSlugs, getDestination } from "@/content";
import { routing, type Locale } from "@/i18n/routing";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = site.name;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => destinationSlugs.map((slug) => ({ locale, slug })));
}

export default async function Image({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const destination = getDestination(locale as Locale, slug);
  if (!destination) return new Response(null, { status: 404 });
  return renderOg({ eyebrow: destination.state, title: destination.h1, subtitle: destination.cardSummary });
}
