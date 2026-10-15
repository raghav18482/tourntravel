import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { DestinationCard } from "@/components/cards/DestinationCard";
import { PhotoTrio, PlacesGrid, SeasonGuide, TripDurations } from "@/components/sections/destination";
import { Hero } from "@/components/sections/Hero";
import { CtaBand, FaqSection } from "@/components/sections/shared";
import { Breadcrumbs, type Crumb } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Badge, Container, Section, SectionHeading } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/Reveal";
import { whatsappLink } from "@/config/site";
import { destinationSlugs, getDestination, getPackage } from "@/content";
import { images } from "@/content/images";
import { Link } from "@/i18n/navigation";
import { localeFrom } from "@/i18n/locale";
import { buildMetadata, localizedUrl } from "@/lib/metadata";
import { touristDestinationSchema } from "@/lib/schema";

// Every slug is prerendered with its full content inline (best for SEO), so
// navigations wait for that static page instead of streaming into an App Shell.
export const instant = false;

export function generateStaticParams() {
  return destinationSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/destinations/[slug]">): Promise<Metadata> {
  const [locale, { slug }] = await Promise.all([localeFrom(params), params]);
  const destination = getDestination(locale, slug);
  if (!destination) return {};
  return buildMetadata(locale, `/destinations/${slug}`, destination.seo);
}

export default async function DestinationPage({ params }: PageProps<"/[locale]/destinations/[slug]">) {
  const [locale, { slug }] = await Promise.all([localeFrom(params), params]);
  const destination = getDestination(locale, slug);
  if (!destination) notFound();

  const t = await getTranslations("Destination");
  const tc = await getTranslations("Common");
  const tn = await getTranslations("Nav");
  const parent = destination.parent ? getDestination(locale, destination.parent) : undefined;
  const pkg = destination.relatedPackage ? getPackage(locale, destination.relatedPackage) : undefined;
  const related = destination.related.map((s) => getDestination(locale, s)).filter((d) => d !== undefined);
  const enquiryText = tc("cardEnquiry", { trip: destination.name });
  const subSectionTarget = destination.subSection ? getDestination(locale, destination.subSection.linkSlug) : undefined;
  const subSectionImage = subSectionTarget ? images[subSectionTarget.images.hero] : undefined;

  const crumbs: Crumb[] = [
    { name: tn("destinations"), href: "/destinations" },
    ...(parent ? [{ name: parent.name, href: `/destinations/${parent.slug}` }] : []),
    { name: destination.name, href: `/destinations/${destination.slug}` },
  ];

  return (
    <>
      <Hero
        image={destination.images.hero}
        breadcrumbs={<Breadcrumbs items={crumbs} light />}
        eyebrow={<Badge tone="light">{destination.state}</Badge>}
        title={destination.h1}
        subtitle={destination.heroTagline}
        actions={
          <>
            <ButtonLink href={whatsappLink(enquiryText)} variant="whatsapp" size="lg" icon="whatsapp" trackLocation={`hero_${slug}`}>
              {tc("enquireOnWhatsApp")}
            </ButtonLink>
            <ButtonLink href={`/contact?trip=${destination.slug}`} variant="outlineLight" size="lg" icon="route">
              {tc("planCustomTrip")}
            </ButtonLink>
          </>
        }
        footer={
          <ul aria-label={t("highlightsLabel")} className="flex flex-wrap gap-2">
            {destination.highlights.map((h) => (
              <li key={h} className="rounded-full border border-white/30 bg-white/10 px-3.5 py-1.5 text-sm font-semibold text-white">
                {h}
              </li>
            ))}
          </ul>
        }
      />

      <Section tone="sand" labelledBy="intro-heading">
        <Container className="grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          <div>
            <SectionHeading id="intro-heading" eyebrow={t("introEyebrow")} title={t("aboutHeading", { name: destination.name })} />
            <div className="prose-copy mt-6">
              {destination.intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <div className="lg:sticky lg:top-28 lg:self-start">
            <PhotoTrio keys={destination.images.gallery} label={t("galleryLabel", { name: destination.name })} />
          </div>
        </Container>

        {destination.subSection && subSectionImage && (
          <Container className="mt-14">
            <Reveal>
              <aside className="grid overflow-hidden rounded-3xl bg-pine-900 text-sand-50 on-dark sm:grid-cols-[1fr_1.4fr]">
                <div className="relative aspect-[16/10] sm:aspect-auto">
                  <Image
                    src={subSectionImage.src}
                    alt={subSectionImage.alt}
                    fill
                    sizes="(min-width: 640px) 40vw, 100vw"
                    placeholder="blur"
                    className="object-cover"
                  />
                </div>
                <div className="p-7 sm:p-10">
                  <h2 className="text-3xl font-semibold">{destination.subSection.heading}</h2>
                  <div className="mt-4 space-y-3 leading-relaxed text-sand-100/85">
                    {destination.subSection.body.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                  <Link
                    href={`/destinations/${destination.subSection.linkSlug}`}
                    className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-saffron-300 hover:text-saffron-100"
                  >
                    {destination.subSection.linkLabel}
                    <Icon name="arrowRight" size={18} />
                  </Link>
                </div>
              </aside>
            </Reveal>
          </Container>
        )}

        {pkg && (
          <Container className="mt-14">
            <Reveal>
              <aside className="flex flex-col gap-6 rounded-3xl bg-saffron-100 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-10">
                <div className="max-w-2xl">
                  <Badge>{t("packageEyebrow")}</Badge>
                  <h2 className="mt-4 text-3xl font-semibold">{t("packageHeading")}</h2>
                  <p className="mt-3 text-lg leading-relaxed text-ink-700">{t("packageBody")}</p>
                </div>
                <ButtonLink href={`/packages/${pkg.slug}`} variant="primary" size="lg" icon="arrowRight" iconPosition="end" className="shrink-0">
                  {tc("viewPackage")}
                </ButtonLink>
              </aside>
            </Reveal>
          </Container>
        )}
      </Section>

      <PlacesGrid destination={destination} />
      <SeasonGuide destination={destination} />
      <TripDurations destination={destination} />
      <FaqSection title={t("faqHeading", { name: destination.name })} faqs={destination.faqs} tone="white" />

      <Section tone="cream" labelledBy="related-heading">
        <Container>
          <SectionHeading id="related-heading" eyebrow={t("relatedEyebrow")} title={t("relatedHeading")} />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((d) => (
              <li key={d.slug}>
                <DestinationCard destination={d} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaBand
        heading={t("ctaHeading", { name: destination.name })}
        body={t("ctaBody", { name: destination.name })}
        whatsappText={enquiryText}
        trackLocation={`cta_${slug}`}
      />
      <JsonLd data={touristDestinationSchema(destination, localizedUrl(locale, `/destinations/${slug}`))} />
    </>
  );
}
