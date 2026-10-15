import { site } from "@/config/site";
import { getPackage, packageSlugs } from "@/content";
import { routing, type Locale } from "@/i18n/routing";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = site.name;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => packageSlugs.map((slug) => ({ locale, slug })));
}

export default async function Image({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const pkg = getPackage(locale as Locale, slug);
  if (!pkg) return new Response(null, { status: 404 });
  return renderOg({ eyebrow: `${pkg.badge} · ${pkg.location}`, title: pkg.h1, subtitle: pkg.tagline });
}
