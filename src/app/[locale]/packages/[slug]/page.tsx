import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { DestinationCard } from "@/components/cards/DestinationCard";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { getFormLabels } from "@/components/forms/labels";
import { Hero } from "@/components/sections/Hero";
import { Checklist, PackageFacts } from "@/components/sections/package";
import { PackageTimeline } from "@/components/sections/PackageTimeline";
import { CtaBand, FaqSection } from "@/components/sections/shared";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Badge, Container, Section, SectionHeading } from "@/components/ui/layout";
import { site, whatsappLink } from "@/config/site";
import { getDestination, getPackage, getTripOptions, packageSlugs } from "@/content";
import { images } from "@/content/images";
import { localeFrom } from "@/i18n/locale";
import { buildMetadata, localizedUrl } from "@/lib/metadata";
import { touristTripSchema } from "@/lib/schema";

// Every slug is prerendered with its full content inline (best for SEO), so
// navigations wait for that static page instead of streaming into an App Shell.
export const instant = false;

export function generateStaticParams() {
  return packageSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/packages/[slug]">): Promise<Metadata> {
  const [locale, { slug }] = await Promise.all([localeFrom(params), params]);
  const pkg = getPackage(locale, slug);
  if (!pkg) return {};
  return buildMetadata(locale, `/packages/${slug}`, pkg.seo);
}

export default async function PackagePage({ params }: PageProps<"/[locale]/packages/[slug]">) {
  const [locale, { slug }] = await Promise.all([localeFrom(params), params]);
  const formLabels = await getFormLabels();
  const pkg = getPackage(locale, slug);
  if (!pkg) notFound();

  const t = await getTranslations("Package");
  const tc = await getTranslations("Common");
  const tn = await getTranslations("Nav");
  const destination = getDestination(locale, pkg.destination)!;
  const related = [destination, ...destination.related.map((s) => getDestination(locale, s))]
    .filter((d) => d !== undefined)
    .slice(0, 3);
  const enquiryText = tc("cardEnquiry", { trip: pkg.name });

  return (
    <>
      <Hero
        pinned
        image={pkg.images.hero}
        breadcrumbs={
          <Breadcrumbs
            light
            items={[
              { name: tn("destinations"), href: "/destinations" },
              { name: destination.name, href: `/destinations/${destination.slug}` },
              { name: pkg.name, href: `/packages/${pkg.slug}` },
            ]}
          />
        }
        eyebrow={
          <div className="flex flex-wrap items-center gap-2">
            <Badge>
              <Icon name="sparkle" size={14} />
              {pkg.badge}
            </Badge>
            <Badge tone="light">{pkg.location}</Badge>
          </div>
        }
        title={pkg.h1}
        subtitle={pkg.tagline}
        actions={
          <>
            <ButtonLink href={whatsappLink(enquiryText)} variant="whatsapp" size="lg" icon="whatsapp" trackLocation="package_hero">
              {tc("enquireOnWhatsApp")}
            </ButtonLink>
            <ButtonLink href={site.phone.href} variant="outlineLight" size="lg" icon="phone" trackLocation="package_hero">
              {tc("callNow")}
            </ButtonLink>
          </>
        }
        footer={
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-white/90">
            {pkg.heroHighlights.map((h) => (
              <li key={h} className="flex items-center gap-2">
                <Icon name="checkCircle" size={18} className="text-saffron-400" />
                {h}
              </li>
            ))}
          </ul>
        }
      />

      <div className="bg-sand-50">
        {/* One sidebar instance: after the overview on mobile, sticky in column 2 on desktop. */}
        <Container className="grid gap-y-16 py-16 sm:gap-y-20 sm:py-20 lg:grid-cols-[minmax(0,1fr)_23rem] lg:gap-x-14 lg:py-24">
          <section aria-labelledby="overview-heading" className="min-w-0 lg:col-start-1">
            <SectionHeading id="overview-heading" eyebrow={t("overviewEyebrow")} title={t("overviewHeading")} />
            <div className="prose-copy mt-6">
              {pkg.overview.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>

          <div className="lg:col-start-2 lg:row-span-3 lg:row-start-1">
            <div className="lg:sticky lg:top-28">
              <PackageFacts pkg={pkg} />
            </div>
          </div>

          <section aria-labelledby="itinerary-heading" className="min-w-0 lg:col-start-1">
            <SectionHeading id="itinerary-heading" eyebrow={t("itineraryEyebrow")} title={t("itineraryHeading")} intro={t("itineraryIntro")} />
            <div className="mt-10">
              <PackageTimeline
                days={pkg.days.map((d) => ({ ...d, image: images[d.image] }))}
                labels={{ day: t.raw("day"), expandAll: t("expandAll"), collapseAll: t("collapseAll") }}
              />
            </div>
          </section>

          <section aria-label={t("inclusionsHeading")} className="grid min-w-0 gap-6 lg:col-start-1 xl:grid-cols-2">
            <div className="xl:col-span-2">
              <Checklist title={t("inclusionsHeading")} items={pkg.inclusions} />
            </div>
            {pkg.addOns.map((addOn) => (
              <div key={addOn.title} className="rounded-3xl bg-saffron-100 p-7 sm:p-8">
                <h3 className="flex items-center gap-2 text-2xl font-semibold">
                  <Icon name="plus" size={22} className="text-terracotta-700" />
                  {t("addOnsHeading")}
                </h3>
                <p className="mt-4 text-lg font-semibold text-ink-900">{addOn.title}</p>
                <p className="mt-1 leading-relaxed text-ink-700">{addOn.description}</p>
                <p className="mt-4 inline-flex rounded-full bg-white px-3 py-1 text-sm font-semibold text-terracotta-700">{addOn.note}</p>
              </div>
            ))}
            <Checklist title={t("exclusionsHeading")} items={pkg.exclusions} icon="minusCircle" tone="negative" />
            <div className="xl:col-span-2">
              <Checklist title={t("carryHeading")} items={pkg.thingsToCarry} icon="backpack" tone="neutral" />
            </div>
          </section>
        </Container>
      </div>

      <FaqSection title={t("faqHeading")} faqs={pkg.faqs} tone="white" />

      <Section tone="cream" id="enquire" labelledBy="enquire-heading">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <SectionHeading id="enquire-heading" eyebrow={t("formEyebrow")} title={t("formHeading")} intro={t("formIntro")} />
          <div className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-ink-900/5 sm:p-8">
            <EnquiryForm options={getTripOptions(locale)} defaultTrip={pkg.slug} idPrefix="package-enquiry" labels={formLabels} />
          </div>
        </Container>
      </Section>

      <Section tone="sand" labelledBy="related-heading">
        <Container>
          <SectionHeading id="related-heading" title={t("relatedHeading")} />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((d) => (
              <li key={d.slug}>
                <DestinationCard destination={d} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaBand heading={t("ctaHeading")} body={t("ctaBody")} whatsappText={enquiryText} trackLocation="package_cta" />
      <JsonLd data={touristTripSchema(pkg, localizedUrl(locale, `/packages/${pkg.slug}`))} />
    </>
  );
}
