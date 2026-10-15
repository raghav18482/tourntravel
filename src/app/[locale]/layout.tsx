import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { AnalyticsListener } from "@/components/layout/AnalyticsListener";
import { MobileActionBar, WhatsAppFloat } from "@/components/layout/ContactBars";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/seo/JsonLd";
import { site, siteUrl } from "@/config/site";
import { routing } from "@/i18n/routing";
import { htmlLang } from "@/lib/metadata";
import { travelAgencySchema } from "@/lib/schema";
import { body, display } from "../fonts";
import "../globals.css";

// Fail the build if any page stops being fully static.
export const ensureStatic = "navigation";


export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: site.brand.themeColor,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl("/")),
  applicationName: site.name,
  authors: [{ name: site.owner }],
  creator: site.name,
  formatDetection: { telephone: false },
  ...(process.env.GOOGLE_SITE_VERIFICATION ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } } : {}),
};

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = await getTranslations("Common");
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang={htmlLang[locale]} className={`${display.variable} ${body.variable}`}>
      <body className="min-h-screen">
        <a href="#main" className="skip-link">
          {t("skipToContent")}
        </a>
        <Header />
        <main id="main" tabIndex={-1} className="focus:outline-none">
          {children}
        </main>
        <Footer />
        <MobileActionBar />
        <WhatsAppFloat />
        <JsonLd data={travelAgencySchema()} />
        {gaId && (
          <>
            <GoogleAnalytics gaId={gaId} />
            <AnalyticsListener />
          </>
        )}
      </body>
    </html>
  );
}
