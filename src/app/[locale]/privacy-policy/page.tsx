import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageIntro } from "@/components/sections/Hero";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Container, Section } from "@/components/ui/layout";
import { getContent } from "@/content";
import { localeFrom } from "@/i18n/locale";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[locale]/privacy-policy">): Promise<Metadata> {
  const locale = await localeFrom(params);
  return buildMetadata(locale, "/privacy-policy", getContent(locale).privacy.seo);
}

export default async function PrivacyPage({ params }: PageProps<"/[locale]/privacy-policy">) {
  const locale = await localeFrom(params);
  const { privacy } = getContent(locale);
  const tf = await getTranslations("Footer");
  const t = await getTranslations("Privacy");

  return (
    <>
      <PageIntro
        breadcrumbs={<Breadcrumbs items={[{ name: tf("privacy"), href: "/privacy-policy" }]} />}
        title={privacy.h1}
        intro={t("updated", { date: privacy.updated })}
      />
      <Section tone="white">
        <Container className="max-w-3xl">
          <div className="space-y-10">
            {privacy.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl font-semibold">{section.heading}</h2>
                <div className="prose-copy mt-3">
                  {section.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
