import { getTranslations } from "next-intl/server";
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
  const t = await getTranslations({ locale, namespace: "Nav" });
  const { about } = getContent(locale);
  return renderOg({ eyebrow: t("about"), title: about.h1, subtitle: about.intro });
}
