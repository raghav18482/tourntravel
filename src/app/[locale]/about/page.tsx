import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { PageIntro } from "@/components/sections/Hero";
import { CtaBand, FeatureGrid } from "@/components/sections/shared";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Icon } from "@/components/ui/Icon";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { site } from "@/config/site";
import { getContent } from "@/content";
import { images } from "@/content/images";
import { localeFrom } from "@/i18n/locale";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[locale]/about">): Promise<Metadata> {
  const locale = await localeFrom(params);
  return buildMetadata(locale, "/about", getContent(locale).about.seo);
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const locale = await localeFrom(params);
  const { about } = getContent(locale);
  const t = await getTranslations("About");
  const tn = await getTranslations("Nav");
  const portrait = images[about.owner.image];

  return (
    <>
      <PageIntro
        breadcrumbs={<Breadcrumbs items={[{ name: tn("about"), href: "/about" }]} />}
        title={about.h1}
        intro={about.intro}
      />

      <Section tone="sand" labelledBy="story-heading">
        <Container className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <div>
            <SectionHeading id="story-heading" title={about.story.heading} />
            <div className="prose-copy mt-6">
              {about.story.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <figure className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-lift">
              <Image
                src={portrait.src}
                alt={portrait.alt}
                fill
                sizes="(min-width: 1024px) 440px, 100vw"
                placeholder="blur"
                className="object-cover"
              />
            </div>
            <figcaption className="absolute -bottom-6 left-6 right-6 rounded-2xl bg-white p-5 shadow-soft ring-1 ring-ink-900/5 sm:left-auto sm:right-[-1.5rem] sm:w-72">
              <span className="block font-display text-xl font-semibold">{about.owner.name}</span>
              <span className="text-sm text-ink-600">{about.owner.role}</span>
              {site.stats.yearsExperience && (
                <span className="mt-3 flex items-center gap-2 text-sm font-semibold text-terracotta-700">
                  <Icon name="calendar" size={16} />
                  {t("experience", { years: site.stats.yearsExperience })}
                </span>
              )}
            </figcaption>
          </figure>
        </Container>
      </Section>

      <Section tone="white" labelledBy="founder-heading">
        <Container className="max-w-4xl">
          <SectionHeading id="founder-heading" title={about.owner.heading} />
          <div className="prose-copy mt-6">
            {about.owner.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="sand" labelledBy="vehicle-heading">
        <Container className="grid items-center gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <div>
            <SectionHeading id="vehicle-heading" title={about.vehicle.heading} />
            <div className="prose-copy mt-6">
              {about.vehicle.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <ul className="grid grid-cols-2 gap-3 sm:gap-5">
            {about.vehicle.photos.map((key) => (
              <li key={key} className="relative aspect-[3/4] overflow-hidden rounded-3xl shadow-soft">
                <Image
                  src={images[key].src}
                  alt={images[key].alt}
                  fill
                  sizes="(min-width: 1024px) 340px, 45vw"
                  placeholder="blur"
                  className="object-cover"
                />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="cream" labelledBy="values-heading">
        <Container>
          <SectionHeading id="values-heading" title={about.values.heading} />
          <div className="mt-12">
            <FeatureGrid points={about.values.points} />
          </div>
        </Container>
      </Section>

      <CtaBand heading={t("ctaHeading")} body={t("ctaBody")} trackLocation="about_cta" />
    </>
  );
}
