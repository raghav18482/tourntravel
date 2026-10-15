import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { MapEmbed } from "@/components/MapEmbed";
import { getFormLabels } from "@/components/forms/labels";
import { PageIntro } from "@/components/sections/Hero";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { Icon, type IconKey } from "@/components/ui/Icon";
import { Container, Section } from "@/components/ui/layout";
import { formattedAddress, hasAddress, site, whatsappLink } from "@/config/site";
import { getContent, getTripOptions } from "@/content";
import { localeFrom } from "@/i18n/locale";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const locale = await localeFrom(params);
  return buildMetadata(locale, "/contact", getContent(locale).contact.seo);
}

function ContactRow({ icon, label, children }: { icon: IconKey; label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-saffron-100 text-terracotta-700">
        <Icon name={icon} size={22} />
      </span>
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-ink-600">{label}</p>
        <div className="mt-0.5 text-lg font-semibold text-ink-900">{children}</div>
      </div>
    </div>
  );
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const locale = await localeFrom(params);
  const formLabels = await getFormLabels();
  const { contact } = getContent(locale);
  const t = await getTranslations("Contact");
  const tc = await getTranslations("Common");
  const tn = await getTranslations("Nav");
  const tf = await getTranslations("Footer");

  return (
    <>
      <PageIntro breadcrumbs={<Breadcrumbs items={[{ name: tn("contact"), href: "/contact" }]} />} title={contact.h1} intro={contact.intro} />

      <Section tone="sand">
        <Container className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
          <section aria-labelledby="form-heading" className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-ink-900/5 sm:p-9">
            <h2 id="form-heading" className="text-3xl font-semibold">
              {contact.formHeading}
            </h2>
            <p className="mt-2 text-ink-600">{contact.formIntro}</p>
            <div className="mt-8">
              <EnquiryForm options={getTripOptions(locale)} labels={formLabels} />
            </div>
          </section>

          <div className="space-y-8">
            <section aria-labelledby="direct-heading" className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-ink-900/5 sm:p-8">
              <h2 id="direct-heading" className="text-2xl font-semibold">
                {contact.directHeading}
              </h2>
              <div className="mt-6 space-y-6">
                <ContactRow icon="phone" label={t("phone")}>
                  <a href={site.phone.href} data-track="contact_page" className="inline-flex min-h-11 items-center hover:text-terracotta-700">
                    {site.phone.display}
                  </a>
                </ContactRow>
                <ContactRow icon="whatsapp" label={t("whatsapp")}>
                  <a
                    href={whatsappLink(tc("generalEnquiry"))}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-track="contact_page"
                    className="inline-flex min-h-11 items-center hover:text-terracotta-700"
                  >
                    {site.phone.display}
                  </a>
                </ContactRow>
                {site.email && (
                  <ContactRow icon="mail" label={t("email")}>
                    <a href={`mailto:${site.email}`} className="inline-flex min-h-11 items-center break-all hover:text-terracotta-700">
                      {site.email}
                    </a>
                  </ContactRow>
                )}
                <ContactRow icon="mapPin" label={t("address")}>
                  {hasAddress() ? (
                    <address className="not-italic">{formattedAddress()}</address>
                  ) : (
                    <span className="text-base font-medium text-ink-600">{t("addressPending")}</span>
                  )}
                </ContactRow>
              </div>
              <p className="mt-6 flex items-center gap-2 rounded-2xl bg-pine-50 px-4 py-3 text-sm font-semibold text-pine-900">
                <Icon name="clock" size={18} />
                {contact.responseNote}
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <ButtonLink href={whatsappLink(tc("generalEnquiry"))} variant="whatsapp" icon="whatsapp" trackLocation="contact_page">
                  {tc("whatsApp")}
                </ButtonLink>
                <ButtonLink href={site.phone.href} variant="call" icon="phone" trackLocation="contact_page">
                  {tc("callNow")}
                </ButtonLink>
              </div>
            </section>

            <section aria-labelledby="map-heading">
              <h2 id="map-heading" className="mb-4 text-2xl font-semibold">
                {contact.mapHeading}
              </h2>
              {site.mapsEmbedUrl ? (
                <MapEmbed src={site.mapsEmbedUrl} title={t("mapTitle")} loadLabel={t("mapLoad")} note={t("mapNote")} />
              ) : (
                <div className="flex aspect-[4/3] flex-col items-center justify-center gap-3 rounded-3xl bg-pine-100 p-6 text-center ring-1 ring-ink-900/5">
                  <Icon name="mapPin" size={36} className="text-pine-800" />
                  <p className="max-w-xs text-ink-700">{t("addressPending")}</p>
                </div>
              )}
              {site.mapsUrl && (
                <a
                  href={site.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex min-h-11 items-center gap-2 font-semibold text-terracotta-700 hover:underline"
                >
                  {t("mapOpen")}
                  <Icon name="external" size={16} />
                </a>
              )}
            </section>

            <section aria-labelledby="social-heading">
              <h2 id="social-heading" className="mb-4 text-2xl font-semibold">
                {t("social")}
              </h2>
              <div className="flex flex-wrap gap-3">
                <ButtonLink href={site.social.instagram} variant="outline" icon="instagram">
                  {t("instagram")}
                </ButtonLink>
                <ButtonLink href={site.social.facebook} variant="outline" icon="facebook">
                  {t("facebook")}
                </ButtonLink>
                <ButtonLink href={site.social.justdial} variant="outline" icon="star">
                  {tf("justdial")}
                </ButtonLink>
              </div>
            </section>
          </div>
        </Container>
      </Section>
    </>
  );
}
