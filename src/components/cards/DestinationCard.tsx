import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { whatsappLink } from "@/config/site";
import { images } from "@/content/images";
import type { Destination } from "@/content/types";
import { Link } from "@/i18n/navigation";
import { Icon } from "../ui/Icon";

// The title link stretches over the whole card; the WhatsApp button sits above it.
export async function DestinationCard({ destination, headingLevel = "h3" }: { destination: Destination; headingLevel?: "h2" | "h3" }) {
  const t = await getTranslations("Common");
  const img = images[destination.images.hero];
  const Heading = headingLevel;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-ink-900/5 transition duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={img.src}
          alt={img.alt}
          fill
          sizes="(min-width: 1280px) 400px, (min-width: 640px) 50vw, 100vw"
          placeholder="blur"
          className="object-cover transition duration-700 ease-out-soft group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-pine-900">
          {destination.state}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <Heading className="text-2xl font-semibold text-ink-900">
          <Link
            href={`/destinations/${destination.slug}`}
            prefetch
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-3xl focus-visible:after:outline focus-visible:after:outline-3 focus-visible:after:outline-terracotta-600"
          >
            {destination.name}
          </Link>
        </Heading>
        <p className="mt-2 leading-relaxed text-ink-600">{destination.cardSummary}</p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-6">
          <span className="inline-flex items-center gap-1.5 font-semibold text-terracotta-700">
            {t("exploreShort")}
            <Icon name="arrowRight" size={18} className="transition-transform group-hover:translate-x-1" />
          </span>
          <a
            href={whatsappLink(t("cardEnquiry", { trip: destination.name }))}
            target="_blank"
            rel="noopener noreferrer"
            data-track={`card_${destination.slug}`}
            className="relative z-10 inline-flex min-h-11 items-center gap-2 rounded-full bg-wa-600 px-4 text-sm font-semibold text-white hover:bg-wa-700"
            aria-label={t("enquireAbout", { trip: destination.name })}
          >
            <Icon name="whatsapp" size={18} />
            {t("enquire")}
          </a>
        </div>
      </div>
    </article>
  );
}
