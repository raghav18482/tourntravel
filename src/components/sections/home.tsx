import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { site, whatsappLink } from "@/config/site";
import { getContent, getTestimonials } from "@/content";
import { images } from "@/content/images";
import type { HomeContent } from "@/content/types";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { ButtonLink } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { Badge, Container, Section, SectionHeading } from "../ui/layout";
import { Reveal } from "../ui/Reveal";

// Only real numbers from config are shown; unset stats are hidden.
export async function TrustStrip() {
  const t = await getTranslations("Trust");
  const { stats } = site;
  return (
    <div className="border-b border-ink-900/8 bg-white">
      <Container className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-5 text-sm font-semibold text-ink-700 sm:justify-between">
        <a
          href={site.social.justdial}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-2 hover:text-terracotta-700"
        >
          <span className="flex text-saffron-500" aria-hidden="true">
            {Array.from({ length: 5 }, (_, i) => (
              <Icon key={i} name="star" size={16} />
            ))}
          </span>
          {stats.justdialRating
            ? t("justdialRated", { rating: stats.justdialRating, count: stats.justdialReviewCount ?? 0 })
            : t("justdialReviews")}
        </a>
        {stats.happyTravellers && (
          <span className="inline-flex items-center gap-2">
            <Icon name="users" size={18} className="text-terracotta-600" />
            {t("happyTravellers", { count: stats.happyTravellers })}
          </span>
        )}
        {stats.yearsExperience && (
          <span className="inline-flex items-center gap-2">
            <Icon name="calendar" size={18} className="text-terracotta-600" />
            {t("yearsExperience", { years: stats.yearsExperience })}
          </span>
        )}
        <a
          href={site.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-2 hover:text-terracotta-700"
        >
          <Icon name="instagram" size={18} className="text-terracotta-600" />
          {t("followInstagram")}
        </a>
        <a href={site.phone.href} data-track="trust_strip" className="inline-flex min-h-11 items-center gap-2 hover:text-terracotta-700">
          <Icon name="phone" size={18} className="text-terracotta-600" />
          {site.phone.display}
        </a>
      </Container>
    </div>
  );
}

export async function FeaturedPackage({ featured }: { featured: HomeContent["featured"] }) {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("Common");
  const pkg = getContent(locale).packages[0];
  const img = images[featured.image];

  return (
    <Section tone="cream" labelledBy="featured-heading">
      <Container>
        <div className="grid items-center gap-10 overflow-clip rounded-[2rem] bg-white shadow-soft ring-1 ring-ink-900/5 lg:grid-cols-[1fr_1.1fr] lg:gap-0">
          <div className="relative aspect-[4/5] max-h-[560px] w-full sm:aspect-[16/10] lg:aspect-auto lg:h-full lg:max-h-none lg:min-h-[600px]">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(min-width: 1024px) 600px, 100vw"
              placeholder="blur"
              className="object-cover"
            />
            <div className="absolute left-5 top-5">
              <Badge>
                <Icon name="sparkle" size={14} />
                {featured.eyebrow}
              </Badge>
            </div>
          </div>
          <Reveal className="px-6 pb-10 sm:px-10 lg:py-14 lg:pl-14 lg:pr-16">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-terracotta-700">{pkg.location}</p>
            <h2 id="featured-heading" className="mt-3 text-[2rem] leading-[1.1] font-semibold sm:text-4xl">
              {featured.heading}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-600">{featured.body}</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {featured.bullets.map((b) => (
                <li key={b} className="flex gap-3 font-medium text-ink-800">
                  <Icon name="checkCircle" size={22} className="shrink-0 text-wa-600" />
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={`/packages/${pkg.slug}`} variant="primary" size="lg" icon="arrowRight" iconPosition="end">
                {t("viewPackage")}
              </ButtonLink>
              <ButtonLink
                href={whatsappLink(t("cardEnquiry", { trip: pkg.name }))}
                variant="whatsapp"
                size="lg"
                icon="whatsapp"
                trackLocation="home_featured"
              >
                {t("enquireOnWhatsApp")}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

export async function Testimonials({ content }: { content: HomeContent["testimonials"] }) {
  const t = await getTranslations("Testimonials");
  const items = getTestimonials();

  return (
    <Section tone="sand" labelledBy="testimonials-heading">
      <Container>
        <SectionHeading id="testimonials-heading" eyebrow={content.eyebrow} title={content.heading} intro={items.length ? content.intro : undefined} />
        {items.length > 0 ? (
          <>
            {/* Columns follow the number of reviews so one or two real reviews don't sit in a mostly empty row. */}
            <ul
              className={cn(
                "mt-12 grid gap-5",
                items.length === 1 && "max-w-2xl",
                items.length === 2 && "md:grid-cols-2",
                items.length >= 3 && "md:grid-cols-3",
              )}
            >
              {items.map((item, i) => (
                <li key={i}>
                  <Reveal delay={i * 0.08} className="h-full">
                    <figure className="relative flex h-full flex-col rounded-3xl bg-white p-7 shadow-soft ring-1 ring-ink-900/5">
                      {item.placeholder && (
                        <span className="absolute right-5 top-5 rounded-full bg-terracotta-600 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-white">
                          {t("placeholder")}
                        </span>
                      )}
                      <div className="flex text-saffron-500" role="img" aria-label={t("rating", { rating: item.rating })}>
                        {Array.from({ length: 5 }, (_, s) => (
                          <Icon key={s} name="star" size={18} className={s < item.rating ? "" : "opacity-25"} />
                        ))}
                      </div>
                      <blockquote className="mt-4 flex-1 text-lg leading-relaxed text-ink-800">“{item.quote}”</blockquote>
                      <figcaption className="mt-6 border-t border-ink-900/8 pt-4">
                        <span className="block font-semibold text-ink-900">{item.name}</span>
                        <span className="text-sm text-ink-600">
                          {[item.trip, item.location].filter(Boolean).join(" · ")}
                        </span>
                      </figcaption>
                    </figure>
                  </Reveal>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex">
              <ButtonLink href={site.social.justdial} variant="outline" icon="star">
                {t("readJustdial")}
              </ButtonLink>
            </div>
          </>
        ) : (
          <div className="mt-10 flex flex-col items-start gap-6 rounded-3xl bg-white p-8 shadow-soft ring-1 ring-ink-900/5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-lg leading-relaxed text-ink-700">{t("empty")}</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={site.social.justdial} variant="outline" icon="star">
                {t("readJustdial")}
              </ButtonLink>
              <ButtonLink href="/feedback" variant="primary">
                {t("shareFeedback")}
              </ButtonLink>
            </div>
          </div>
        )}
      </Container>
    </Section>
  );
}

export async function InstagramStrip({ content }: { content: HomeContent["gallery"] }) {
  const t = await getTranslations("Common");
  return (
    <Section tone="white" labelledBy="gallery-strip-heading">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading id="gallery-strip-heading" eyebrow={content.eyebrow} title={content.heading} intro={content.intro} />
          <div className="flex gap-3">
            <ButtonLink href={site.social.instagram} variant="outline" icon="instagram">
              {t("followInstagram")}
            </ButtonLink>
            <ButtonLink href="/gallery" variant="primary" icon="arrowRight" iconPosition="end">
              {t("viewGallery")}
            </ButtonLink>
          </div>
        </div>
      </Container>
      <ul className="mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 sm:px-6 lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-6 lg:overflow-visible lg:px-8">
        {content.images.map((key) => {
          const img = images[key];
          return (
            <li key={key} className="w-[42vw] max-w-[220px] shrink-0 snap-start lg:w-auto lg:max-w-none">
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square overflow-hidden rounded-2xl"
                aria-label={t("viewOnInstagram", { photo: img.alt })}
              >
                <Image
                  src={img.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 200px, 42vw"
                  placeholder="blur"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-pine-950/0 text-white opacity-0 transition group-hover:bg-pine-950/40 group-hover:opacity-100">
                  <Icon name="instagram" size={28} />
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
