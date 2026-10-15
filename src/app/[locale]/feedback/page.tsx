import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { FeedbackForm } from "@/components/forms/FeedbackForm";
import { getFormLabels } from "@/components/forms/labels";
import { PageIntro } from "@/components/sections/Hero";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Container, Section } from "@/components/ui/layout";
import { site } from "@/config/site";
import { getContent, getTripOptions } from "@/content";
import { localeFrom } from "@/i18n/locale";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[locale]/feedback">): Promise<Metadata> {
  const locale = await localeFrom(params);
  return buildMetadata(locale, "/feedback", getContent(locale).feedback.seo);
}

export default async function FeedbackPage({ params }: PageProps<"/[locale]/feedback">) {
  const locale = await localeFrom(params);
  const formLabels = await getFormLabels();
  const { feedback } = getContent(locale);
  const t = await getTranslations("Feedback");
  const tn = await getTranslations("Nav");

  return (
    <>
      <PageIntro breadcrumbs={<Breadcrumbs items={[{ name: tn("feedback"), href: "/feedback" }]} />} title={feedback.h1} intro={feedback.intro} />
      <Section tone="sand">
        <Container className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
          <section aria-labelledby="feedback-heading" className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-ink-900/5 sm:p-9">
            <h2 id="feedback-heading" className="mb-8 text-3xl font-semibold">
              {feedback.formHeading}
            </h2>
            <FeedbackForm options={getTripOptions(locale)} labels={formLabels} />
          </section>
          <aside aria-labelledby="review-heading" className="h-fit rounded-3xl bg-pine-900 p-7 text-sand-50 on-dark sm:p-9">
            <span className="flex text-saffron-400" aria-hidden="true">
              {Array.from({ length: 5 }, (_, i) => (
                <Icon key={i} name="star" size={24} />
              ))}
            </span>
            <h2 id="review-heading" className="mt-4 text-2xl font-semibold">
              {t("reviewHeading")}
            </h2>
            <p className="mt-3 leading-relaxed text-sand-100/85">{feedback.reviewPrompt}</p>
            <ButtonLink href={site.social.justdial} variant="light" icon="star" className="mt-6">
              {t("reviewButton")}
            </ButtonLink>
          </aside>
        </Container>
      </Section>
    </>
  );
}
