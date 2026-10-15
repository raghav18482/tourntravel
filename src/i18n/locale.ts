import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { routing, type Locale } from "./routing";

// Validates the [locale] segment. Requests like /favicon.ico reach [locale]
// too, and generateMetadata runs before the layout can 404 them.
export async function localeFrom(params: Promise<{ locale: string }>): Promise<Locale> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  return locale;
}
