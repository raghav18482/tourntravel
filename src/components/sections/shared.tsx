import { getTranslations } from "next-intl/server";
import { site, whatsappLink } from "@/config/site";
import type { Faq, TrustPoint } from "@/content/types";
import { faqSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";
import { JsonLd } from "../seo/JsonLd";
import { ButtonLink } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { Container, Section, SectionHeading } from "../ui/layout";
import { Reveal } from "../ui/Reveal";

// Native <details> keeps answers in the HTML for search engines and needs no JS.
export function FaqSection({
  id = "faq",
  title,
  intro,
  faqs,
  tone = "sand",
}: {
  id?: string;
  title: string;
  intro?: string;
  faqs: Faq[];
  tone?: "sand" | "cream" | "white";
}) {
  return (
    <Section tone={tone} labelledBy={`${id}-heading`}>
      <Container className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <SectionHeading id={`${id}-heading`} title={title} intro={intro} />
        <div className="divide-y divide-ink-900/10 border-y border-ink-900/10">
          {faqs.map((faq) => (
            <details key={faq.question} className="group py-1">
              <summary className="flex min-h-16 cursor-pointer items-center justify-between gap-6 py-4">
                <h3 className="font-sans text-lg font-semibold leading-snug text-ink-900">{faq.question}</h3>
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-sand-200 text-ink-900 transition-transform duration-300 group-open:rotate-45">
                  <Icon name="plus" size={18} />
                </span>
              </summary>
              <p className="pb-6 pr-12 leading-relaxed text-ink-700">{faq.answer}</p>
            </details>
          ))}
        </div>
      </Container>
      <JsonLd data={faqSchema(faqs)} />
    </Section>
  );
}

export async function CtaBand({
  heading,
  body,
  whatsappText,
  trackLocation = "cta_band",
}: {
  heading: string;
  body: string;
  whatsappText?: string;
  trackLocation?: string;
}) {
  const t = await getTranslations("Common");
  return (
    <section className="on-dark relative overflow-clip bg-pine-900 text-sand-50" aria-labelledby="cta-heading">
      <svg
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-40 w-full text-pine-800"
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        fill="currentColor"
      >
        <path d="M0 160V96l160-56 140 44 200-84 180 72 150-48 210 68 170-56 230 60v64z" />
      </svg>
      <Container className="relative py-16 text-center sm:py-24">
        <Reveal>
          <h2 id="cta-heading" className="mx-auto max-w-3xl text-[2rem] leading-[1.1] font-semibold sm:text-5xl">
            {heading}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-sand-100/85">{body}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink
              href={whatsappLink(whatsappText ?? t("generalEnquiry"))}
              variant="whatsapp"
              size="lg"
              icon="whatsapp"
              trackLocation={trackLocation}
            >
              {t("planOnWhatsApp")}
            </ButtonLink>
            <ButtonLink href={site.phone.href} variant="outlineLight" size="lg" icon="phone" trackLocation={trackLocation}>
              {t("callNumber", { phone: site.phone.display })}
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export function FeatureGrid({ points, columns = 3 }: { points: TrustPoint[]; columns?: 3 | 2 }) {
  return (
    <ul className={cn("grid gap-5 sm:grid-cols-2", columns === 3 && "lg:grid-cols-3")}>
      {points.map((point, i) => (
        <li key={point.title}>
          <Reveal delay={(i % 3) * 0.08} className="h-full">
            <div className="h-full rounded-3xl bg-white p-7 shadow-soft ring-1 ring-ink-900/5">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-saffron-100 text-terracotta-700">
                <Icon name={point.icon} size={24} />
              </span>
              <h3 className="mt-5 text-xl font-semibold">{point.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-600">{point.body}</p>
            </div>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
