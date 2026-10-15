import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { DestinationCard } from "@/components/cards/DestinationCard";
import { PackageCard } from "@/components/cards/PackageCard";
import { PageIntro } from "@/components/sections/Hero";
import { CtaBand, FaqSection } from "@/components/sections/shared";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/Reveal";
import { getContent } from "@/content";
import { localeFrom } from "@/i18n/locale";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[locale]/destinations">): Promise<Metadata> {
  const locale = await localeFrom(params);
  return buildMetadata(locale, "/destinations", getContent(locale).destinationsPage.seo);
}

export default async function DestinationsPage({ params }: PageProps<"/[locale]/destinations">) {
  const locale = await localeFrom(params);
  const { destinationsPage: page, destinations, packages, home } = getContent(locale);
  const tn = await getTranslations("Nav");
  const t = await getTranslations("Destinations");

  return (
    <>
      <PageIntro
        breadcrumbs={<Breadcrumbs items={[{ name: tn("destinations"), href: "/destinations" }]} />}
        title={page.h1}
        intro={page.intro}
      />

      <Section tone="sand" labelledBy="regions-heading">
        <Container>
          <SectionHeading id="regions-heading" title={page.regionsHeading} />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((d, i) => (
              <li key={d.slug}>
                <Reveal delay={(i % 3) * 0.08} className="h-full">
                  <DestinationCard destination={d} />
                </Reveal>
              </li>
            ))}
            {packages.map((p) => (
              <li key={p.slug}>
                <Reveal delay={0.16} className="h-full">
                  <PackageCard pkg={p} />
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="white" labelledBy="how-heading">
        <Container>
          <SectionHeading id="how-heading" eyebrow={t("eyebrow")} title={page.howItWorks.heading} />
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {page.howItWorks.steps.map((step, i) => (
              <li key={step.title} className="relative rounded-3xl bg-sand-50 p-7 ring-1 ring-ink-900/5">
                <span className="flex size-12 items-center justify-center rounded-full bg-pine-900 font-display text-xl font-semibold text-sand-50">
                  {i + 1}
                </span>
                <h3 className="mt-5 text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-600">{step.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <FaqSection title={home.faqs.heading} faqs={page.faqs} tone="cream" />
      <CtaBand heading={home.cta.heading} body={home.cta.body} trackLocation="destinations_cta" />
    </>
  );
}
