import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { whatsappLink } from "@/config/site";
import { images } from "@/content/images";
import type { TourPackage } from "@/content/types";
import { Link } from "@/i18n/navigation";
import { Icon } from "../ui/Icon";

export async function PackageCard({ pkg }: { pkg: TourPackage }) {
  const t = await getTranslations("Common");
  const img = images[pkg.images.card];

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-pine-900 text-sand-50 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift on-dark">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={img.src}
          alt={img.alt}
          fill
          sizes="(min-width: 1280px) 400px, (min-width: 640px) 50vw, 100vw"
          placeholder="blur"
          className="object-cover transition duration-700 ease-out-soft group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-saffron-500 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-ink-900">
          <Icon name="sparkle" size={14} />
          {pkg.badge}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-2xl font-semibold">
          <Link
            href={`/packages/${pkg.slug}`}
            prefetch
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-3xl focus-visible:after:outline focus-visible:after:outline-3 focus-visible:after:outline-saffron-400"
          >
            {pkg.name}
          </Link>
        </h3>
        <p className="mt-2 leading-relaxed text-sand-100/85">{pkg.cardSummary}</p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-6">
          <span className="inline-flex items-center gap-1.5 font-semibold text-saffron-300">
            {t("viewPackage")}
            <Icon name="arrowRight" size={18} className="transition-transform group-hover:translate-x-1" />
          </span>
          <a
            href={whatsappLink(t("cardEnquiry", { trip: pkg.name }))}
            target="_blank"
            rel="noopener noreferrer"
            data-track={`card_${pkg.slug}`}
            className="relative z-10 inline-flex min-h-11 items-center gap-2 rounded-full bg-wa-600 px-4 text-sm font-semibold text-white hover:bg-wa-700"
            aria-label={t("enquireAbout", { trip: pkg.name })}
          >
            <Icon name="whatsapp" size={18} />
            {t("enquire")}
          </a>
        </div>
      </div>
    </article>
  );
}
