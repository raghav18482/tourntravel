import { getTranslations } from "next-intl/server";
import { site, whatsappLink } from "@/config/site";
import type { TourPackage } from "@/content/types";
import { cn } from "@/lib/utils";
import { ButtonLink } from "../ui/Button";
import { Icon, type IconKey } from "../ui/Icon";

export function Checklist({
  title,
  items,
  icon = "checkCircle",
  tone = "positive",
}: {
  title: string;
  items: string[];
  icon?: IconKey;
  tone?: "positive" | "negative" | "neutral";
}) {
  const iconColor = { positive: "text-wa-600", negative: "text-terracotta-600", neutral: "text-pine-700" }[tone];
  return (
    <div className="rounded-3xl bg-white p-7 shadow-soft ring-1 ring-ink-900/5 sm:p-8">
      <h3 className="text-2xl font-semibold">{title}</h3>
      <ul className="mt-5 space-y-3.5">
        {items.map((item) => (
          <li key={item} className="flex gap-3 leading-relaxed text-ink-800">
            <Icon name={icon} size={22} className={cn("mt-0.5 shrink-0", iconColor)} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Price + key facts + CTAs. Sticky beside the itinerary on large screens.
export async function PackageFacts({ pkg }: { pkg: TourPackage }) {
  const t = await getTranslations("Package");
  const tc = await getTranslations("Common");
  const price = pkg.price.amount
    ? new Intl.NumberFormat("en-IN", { style: "currency", currency: pkg.price.currency, maximumFractionDigits: 0 }).format(pkg.price.amount)
    : null;

  return (
    <aside aria-labelledby="facts-heading" className="rounded-3xl bg-white p-7 shadow-lift ring-1 ring-ink-900/5 sm:p-8">
      <h2 id="facts-heading" className="sr-only">
        {t("factsHeading")}
      </h2>
      <p className="text-sm font-semibold text-ink-600">{price ? t("startingFrom") : t("priceLabel")}</p>
      <p className="mt-1 font-display text-4xl font-semibold text-ink-900">
        {price ?? pkg.price.onRequestLabel}
        {price && <span className="ml-1 font-sans text-base font-medium text-ink-600">/ {pkg.price.unit}</span>}
      </p>
      <dl className="mt-6 divide-y divide-ink-900/8 border-y border-ink-900/8">
        {pkg.facts.map((fact) => (
          <div key={fact.label} className="flex items-start justify-between gap-4 py-3">
            <dt className="text-ink-600">{fact.label}</dt>
            <dd className={cn("text-right font-semibold", fact.value ? "text-ink-900" : "text-ink-600")}>
              {fact.value ?? fact.fallback}
            </dd>
          </div>
        ))}
      </dl>
      <div className="mt-6 grid gap-3">
        <ButtonLink
          href={whatsappLink(tc("cardEnquiry", { trip: pkg.name }))}
          variant="whatsapp"
          size="lg"
          icon="whatsapp"
          trackLocation="package_sidebar"
        >
          {tc("enquireOnWhatsApp")}
        </ButtonLink>
        <ButtonLink href={site.phone.href} variant="outline" size="lg" icon="phone" trackLocation="package_sidebar">
          {tc("callNumber", { phone: site.phone.display })}
        </ButtonLink>
      </div>
      <p className="mt-4 text-center text-sm text-ink-600">{t("noPayment")}</p>
    </aside>
  );
}
