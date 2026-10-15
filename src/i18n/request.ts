import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { locale as rootLocale } from "next/root-params";
import { routing } from "./routing";

async function segmentLocale() {
  try {
    return await rootLocale();
  } catch {
    return undefined;
  }
}

export default getRequestConfig(async ({ locale: explicit }) => {
  // An explicit locale (e.g. from OG image routes, where root params aren't
  // available) wins; otherwise read the [locale] segment. Outside [locale]
  // (the global 404) there is no segment, so fall back to the default.
  const requested = explicit ?? (await segmentLocale());
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  return {
    locale,
    timeZone: "Asia/Kolkata",
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
