import { cacheLife } from "next/cache";
import { getLocale, getTranslations } from "next-intl/server";
import { formattedAddress, hasAddress, site, whatsappLink } from "@/config/site";
import { getContent } from "@/content";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { Icon } from "../ui/Icon";
import { Container } from "../ui/layout";
import { Logo } from "./Logo";

async function getYear() {
  "use cache";
  cacheLife("max");
  return new Date().getFullYear();
}

const linkClass = "inline-flex min-h-11 items-center text-sand-100/80 transition-colors hover:text-white";

export async function Footer() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("Footer");
  const tn = await getTranslations("Nav");
  const tc = await getTranslations("Common");
  const content = getContent(locale);
  const pkg = content.packages[0];
  const year = await getYear();

  return (
    <footer className="on-dark bg-pine-950 pb-24 text-sand-50 md:pb-0">
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:py-20">
        <div>
          <Logo light full />
          <p className="mt-5 max-w-sm leading-relaxed text-sand-100/80">{t("about")}</p>
          <ul className="mt-6 flex items-center gap-2" aria-label={t("social")}>
            <li>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("instagram")}
                className="inline-flex size-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
              >
                <Icon name="instagram" size={20} />
              </a>
            </li>
            <li>
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("facebook")}
                className="inline-flex size-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
              >
                <Icon name="facebook" size={20} />
              </a>
            </li>
            <li>
              <a
                href={site.social.justdial}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white/10 px-4 text-sm font-semibold hover:bg-white/20"
              >
                <Icon name="star" size={16} className="text-saffron-400" />
                {t("justdial")}
              </a>
            </li>
          </ul>
        </div>

        <nav aria-labelledby="footer-destinations">
          <h2 id="footer-destinations" className="font-sans text-sm font-bold uppercase tracking-[0.16em] text-saffron-300">
            {tn("destinations")}
          </h2>
          <ul className="mt-4 space-y-1">
            {content.destinations.map((d) => (
              <li key={d.slug}>
                <Link href={`/destinations/${d.slug}`} className={linkClass}>
                  {d.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href={`/packages/${pkg.slug}`} className={linkClass}>
                {pkg.name}
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-labelledby="footer-company">
          <h2 id="footer-company" className="font-sans text-sm font-bold uppercase tracking-[0.16em] text-saffron-300">
            {t("company")}
          </h2>
          <ul className="mt-4 space-y-1">
            <li><Link href="/about" className={linkClass}>{tn("about")}</Link></li>
            <li><Link href="/gallery" className={linkClass}>{tn("gallery")}</Link></li>
            <li><Link href="/contact" className={linkClass}>{tn("contact")}</Link></li>
            <li><Link href="/feedback" className={linkClass}>{tn("feedback")}</Link></li>
            <li><Link href="/privacy-policy" className={linkClass}>{t("privacy")}</Link></li>
          </ul>
        </nav>

        <div>
          <h2 className="font-sans text-sm font-bold uppercase tracking-[0.16em] text-saffron-300">{t("contact")}</h2>
          <address className="mt-4 space-y-3 not-italic">
            <a href={site.phone.href} data-track="footer" className="flex min-h-11 items-center gap-3 font-semibold text-white hover:text-saffron-300">
              <Icon name="phone" size={18} className="text-saffron-400" />
              {site.phone.display}
            </a>
            <a
              href={whatsappLink(tc("generalEnquiry"))}
              target="_blank"
              rel="noopener noreferrer"
              data-track="footer"
              className="flex min-h-11 items-center gap-3 font-semibold text-white hover:text-saffron-300"
            >
              <Icon name="whatsapp" size={18} className="text-saffron-400" />
              {tc("chatOnWhatsApp")}
            </a>
            {site.email && (
              <a href={`mailto:${site.email}`} className="flex min-h-11 items-center gap-3 text-sand-100/85 hover:text-white">
                <Icon name="mail" size={18} className="text-saffron-400" />
                {site.email}
              </a>
            )}
            {hasAddress() && (
              <p className="flex gap-3 text-sand-100/85">
                <Icon name="mapPin" size={18} className="mt-1 shrink-0 text-saffron-400" />
                <span>{formattedAddress()}</span>
              </p>
            )}
          </address>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-6 text-sm text-sand-100/70 sm:flex-row sm:items-center sm:justify-between">
          <p>{t("copyright", { year, name: site.name })}</p>
          <p>{t("owner", { owner: site.owner })}</p>
        </Container>
      </div>
    </footer>
  );
}
