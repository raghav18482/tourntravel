import { getLocale, getTranslations } from "next-intl/server";
import { whatsappLink } from "@/config/site";
import { getContent } from "@/content";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { ButtonLink } from "../ui/Button";
import { Container } from "../ui/layout";

export async function NotFoundContent() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("NotFound");
  const tc = await getTranslations("Common");
  const { destinations, packages } = getContent(locale);

  return (
    <section className="bg-sand-100">
      <Container className="py-20 text-center sm:py-28">
        <p className="font-display text-7xl font-semibold text-terracotta-600 sm:text-8xl">404</p>
        <h1 className="mx-auto mt-6 max-w-2xl text-4xl font-semibold sm:text-5xl">{t("title")}</h1>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-ink-600">{t("body")}</p>
        <ul className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-3">
          {[...packages.map((p) => ({ href: `/packages/${p.slug}`, label: p.name })), ...destinations.map((d) => ({ href: `/destinations/${d.slug}`, label: d.name }))].map(
            (link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-11 items-center rounded-full bg-white px-5 font-semibold text-ink-800 ring-1 ring-ink-900/10 hover:ring-ink-900/30"
                >
                  {link.label}
                </Link>
              </li>
            ),
          )}
        </ul>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/" variant="primary" size="lg">
            {t("home")}
          </ButtonLink>
          <ButtonLink href={whatsappLink(tc("generalEnquiry"))} variant="whatsapp" size="lg" icon="whatsapp" trackLocation="404">
            {tc("chatOnWhatsApp")}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
