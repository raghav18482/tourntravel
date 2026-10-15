import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { PageIntro } from "@/components/sections/Hero";
import { CtaBand } from "@/components/sections/shared";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Container, Section } from "@/components/ui/layout";
import { getContent, getTripOptions } from "@/content";
import { images } from "@/content/images";
import { localeFrom } from "@/i18n/locale";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[locale]/gallery">): Promise<Metadata> {
  const locale = await localeFrom(params);
  return buildMetadata(locale, "/gallery", getContent(locale).gallery.seo);
}

export default async function GalleryPage({ params }: PageProps<"/[locale]/gallery">) {
  const locale = await localeFrom(params);
  const { gallery, home } = getContent(locale);
  const t = await getTranslations("Gallery");
  const tn = await getTranslations("Nav");

  const usedTags = new Set(gallery.items.flatMap((i) => i.tags));
  const filters = getTripOptions(locale)
    .filter((o) => usedTags.has(o.value as never))
    .map((o) => ({ value: o.value, label: o.value === "rishikesh-6-day-tour" ? t("rishikesh") : o.label }));

  return (
    <>
      <PageIntro breadcrumbs={<Breadcrumbs items={[{ name: tn("gallery"), href: "/gallery" }]} />} title={gallery.h1} intro={gallery.intro} />
      <Section tone="sand">
        <Container>
          <GalleryGrid
            items={gallery.items.map((item) => ({ id: item.image, tags: item.tags, ...images[item.image] }))}
            filters={filters}
            labels={{
              all: t("all"),
              filterBy: t("filterBy"),
              showing: t.raw("showing"),
              open: t.raw("open"),
              close: t("close"),
              previous: t("previous"),
              next: t("next"),
              position: t.raw("position"),
            }}
          />
        </Container>
      </Section>
      <CtaBand heading={home.cta.heading} body={home.cta.body} trackLocation="gallery_cta" />
    </>
  );
}
