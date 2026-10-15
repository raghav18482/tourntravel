import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { DestinationCard } from "@/components/cards/DestinationCard";
import { PackageCard } from "@/components/cards/PackageCard";
import { Hero } from "@/components/sections/Hero";
import { FeaturedPackage, InstagramStrip, Testimonials, TrustStrip } from "@/components/sections/home";
import { CtaBand, FaqSection, FeatureGrid } from "@/components/sections/shared";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Badge, Container, Section, SectionHeading } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/Reveal";
import { site, whatsappLink } from "@/config/site";
import { getContent } from "@/content";
import { localeFrom } from "@/i18n/locale";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const locale = await localeFrom(params);
  return buildMetadata(locale, "/", getContent(locale).home.seo);
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const locale = await localeFrom(params);
  const { home, destinations, packages } = getContent(locale);
  const t = await getTranslations("Common");
  const th = await getTranslations("Home");

  return (
    <>
      <Hero
        size="home"
        image={home.hero.image}
        eyebrow={<Badge tone="light">{home.hero.eyebrow}</Badge>}
        title={home.hero.h1}
        subtitle={home.hero.subheading}
        actions={
          <>
            <ButtonLink href={whatsappLink(t("generalEnquiry"))} variant="whatsapp" size="lg" icon="whatsapp" trackLocation="hero">
              {t("planOnWhatsApp")}
            </ButtonLink>
            <ButtonLink href={site.phone.href} variant="outlineLight" size="lg" icon="phone" trackLocation="hero">
              {t("callNow")}
            </ButtonLink>
          </>
        }
        footer={
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-white/90">
            {home.hero.points.map((point) => (
              <li key={point} className="flex items-center gap-2">
                <Icon name="checkCircle" size={18} className="text-saffron-400" />
                {point}
              </li>
            ))}
          </ul>
        }
      />
      <TrustStrip />
      <FeaturedPackage featured={home.featured} />

      <Section tone="sand" labelledBy="destinations-heading">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              id="destinations-heading"
              eyebrow={home.destinations.eyebrow}
              title={home.destinations.heading}
              intro={home.destinations.intro}
            />
            <ButtonLink href="/destinations" variant="outline" icon="arrowRight" iconPosition="end" className="shrink-0">
              {th("destinationsCta")}
            </ButtonLink>
          </div>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

      <Section tone="cream" labelledBy="why-heading">
        <Container>
          <SectionHeading id="why-heading" eyebrow={home.whyUs.eyebrow} title={home.whyUs.heading} intro={home.whyUs.intro} />
          <div className="mt-12">
            <FeatureGrid points={home.whyUs.points} />
          </div>
        </Container>
      </Section>

      <Testimonials content={home.testimonials} />
      <InstagramStrip content={home.gallery} />
      <FaqSection title={home.faqs.heading} faqs={home.faqs.items} tone="cream" />
      <CtaBand heading={home.cta.heading} body={home.cta.body} trackLocation="home_cta" />
    </>
  );
}
