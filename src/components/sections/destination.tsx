import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { images, type ImageKey } from "@/content/images";
import type { Destination } from "@/content/types";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Icon } from "../ui/Icon";
import { Container, Section, SectionHeading } from "../ui/layout";
import { Reveal } from "../ui/Reveal";

export async function PlacesGrid({ destination }: { destination: Destination }) {
  const t = await getTranslations("Destination");
  return (
    <Section tone="white" labelledBy="places-heading">
      <Container>
        <SectionHeading id="places-heading" eyebrow={t("placesEyebrow")} title={t("topPlaces", { name: destination.name })} />
        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {destination.places.map((place, i) => (
            <li key={place.name}>
              <Reveal delay={(i % 3) * 0.06} className="h-full">
                <div className="h-full rounded-3xl border border-ink-900/8 bg-sand-50 p-7">
                  <span className="font-display text-sm font-semibold text-terracotta-700">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-2 text-xl font-semibold">{place.name}</h3>
                  <p className="mt-2 leading-relaxed text-ink-600">{place.description}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

export async function SeasonGuide({ destination }: { destination: Destination }) {
  const t = await getTranslations("Destination");
  return (
    <Section tone="cream" labelledBy="season-heading">
      <Container>
        <SectionHeading id="season-heading" eyebrow={t("seasonEyebrow")} title={t("bestTime", { name: destination.name })} intro={destination.bestTime.summary} />
        <ul className={cn("mt-12 grid gap-5 sm:grid-cols-2", destination.bestTime.seasons.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3")}>
          {destination.bestTime.seasons.map((season) => (
            <li
              key={season.name}
              className={cn(
                "rounded-3xl p-7",
                season.recommended ? "bg-pine-900 text-sand-50 on-dark" : "bg-white ring-1 ring-ink-900/5",
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <Icon name="sun" size={24} className={season.recommended ? "text-saffron-400" : "text-terracotta-600"} />
                {season.recommended && (
                  <span className="rounded-full bg-saffron-500 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-ink-900">
                    {t("recommended")}
                  </span>
                )}
              </div>
              <h3 className="mt-4 text-xl font-semibold">{season.name}</h3>
              <p className={cn("text-sm font-semibold", season.recommended ? "text-saffron-300" : "text-terracotta-700")}>
                {season.months}
              </p>
              <p className={cn("mt-3 leading-relaxed", season.recommended ? "text-sand-100/85" : "text-ink-600")}>
                {season.description}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

export async function TripDurations({ destination }: { destination: Destination }) {
  const t = await getTranslations("Destination");
  return (
    <Section tone="sand" labelledBy="durations-heading">
      <Container>
        <SectionHeading id="durations-heading" eyebrow={t("durationsEyebrow")} title={t("durations", { name: destination.name })} intro={t("durationsIntro")} />
        <ul className="mt-12 grid gap-5 lg:grid-cols-3">
          {destination.durations.map((trip) => {
            return (
              <li key={trip.title} className="flex flex-col rounded-3xl bg-white p-7 shadow-soft ring-1 ring-ink-900/5">
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-pine-100 px-3 py-1 text-sm font-bold text-pine-900">
                  <Icon name="calendar" size={16} />
                  {trip.days}
                </span>
                <h3 className="mt-4 text-2xl font-semibold">{trip.title}</h3>
                <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-terracotta-700">
                  <Icon name="route" size={16} />
                  {trip.route}
                </p>
                <p className="mt-3 flex-1 leading-relaxed text-ink-600">{trip.summary}</p>
                {trip.packageSlug && (
                  <Link
                    href={`/packages/${trip.packageSlug}`}
                    className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold text-terracotta-700 hover:underline"
                  >
                    {t("seePackage")}
                    <Icon name="arrowRight" size={18} />
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}

// Three photos in an asymmetric grid: landscape, portrait, landscape.
export function PhotoTrio({ keys, label }: { keys: ImageKey[]; label: string }) {
  const [a, b, c] = keys.map((k) => images[k]);
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4" role="group" aria-label={label}>
      <div className="relative col-span-2 aspect-[3/2] overflow-hidden rounded-3xl sm:col-span-1 sm:row-span-1">
        <Image src={a.src} alt={a.alt} fill sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 100vw" placeholder="blur" className="object-cover" />
      </div>
      <div className="relative row-span-2 aspect-[4/5] overflow-hidden rounded-3xl sm:aspect-auto">
        <Image src={b.src} alt={b.alt} fill sizes="(min-width: 1024px) 300px, 50vw" placeholder="blur" className="object-cover" />
      </div>
      <div className="relative aspect-square overflow-hidden rounded-3xl sm:aspect-[3/2]">
        <Image src={c.src} alt={c.alt} fill sizes="(min-width: 1024px) 300px, 50vw" placeholder="blur" className="object-cover" />
      </div>
    </div>
  );
}
