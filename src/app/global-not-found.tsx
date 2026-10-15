import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { MobileActionBar, WhatsAppFloat } from "@/components/layout/ContactBars";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { NotFoundContent } from "@/components/sections/NotFoundContent";
import { routing } from "@/i18n/routing";
import { htmlLang } from "@/lib/metadata";
import { body, display } from "./fonts";
import "./globals.css";

// Served for every URL that matches no route (the proxy rewrites unknown paths
// here). It bypasses the [locale] layout, so it renders its own document.
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: routing.defaultLocale, namespace: "NotFound" });
  return { title: { absolute: t("seoTitle") } };
}

export default async function GlobalNotFound() {
  const t = await getTranslations({ locale: routing.defaultLocale, namespace: "Common" });

  return (
    <html lang={htmlLang[routing.defaultLocale]} className={`${display.variable} ${body.variable}`}>
      <body className="min-h-screen">
        <a href="#main" className="skip-link">
          {t("skipToContent")}
        </a>
        <Header />
        <main id="main" tabIndex={-1} className="focus:outline-none">
          <NotFoundContent />
        </main>
        <Footer />
        <MobileActionBar />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
