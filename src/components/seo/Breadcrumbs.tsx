import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { localizedUrl } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";
import { Icon } from "../ui/Icon";
import { JsonLd } from "./JsonLd";

export type Crumb = { name: string; href: string };

// Renders the visible trail plus BreadcrumbList JSON-LD. "Home" is added automatically.
export async function Breadcrumbs({ items, light = false }: { items: Crumb[]; light?: boolean }) {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("Common");
  const trail: Crumb[] = [{ name: t("home"), href: "/" }, ...items];

  return (
    <>
      <nav aria-label={t("breadcrumb")} className="text-sm">
        <ol className={cn("flex flex-wrap items-center gap-x-1.5 gap-y-1", light ? "text-white/80" : "text-ink-600")}>
          {trail.map((crumb, i) => {
            const last = i === trail.length - 1;
            return (
              <li key={crumb.href} className="flex items-center gap-1.5">
                {i > 0 && <Icon name="chevronRight" size={14} className="opacity-60" />}
                {last ? (
                  <span aria-current="page" className={cn("font-semibold", light ? "text-white" : "text-ink-900")}>
                    {crumb.name}
                  </span>
                ) : (
                  <Link
                    href={crumb.href}
                    className={cn(
                      "inline-flex min-h-6 items-center underline-offset-4 hover:underline",
                      light ? "hover:text-white" : "hover:text-ink-900",
                    )}
                  >
                    {crumb.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(trail.map((c) => ({ name: c.name, url: localizedUrl(locale, c.href) })))} />
    </>
  );
}
