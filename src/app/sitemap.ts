import type { MetadataRoute } from "next";
import { site, siteUrl } from "@/config/site";
import { getContent } from "@/content";
import { images } from "@/content/images";
import { routing } from "@/i18n/routing";
import { STATIC_PATHS } from "@/content/slugs";
import { localizedUrl } from "@/lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(site.contentUpdated);

  return routing.locales.flatMap((locale) => {
    const content = getContent(locale);
    const entry = (href: string, imageKeys: (keyof typeof images)[] = []) => ({
      url: localizedUrl(locale, href),
      lastModified,
      ...(imageKeys.length ? { images: imageKeys.map((k) => siteUrl(images[k].src.src)) } : {}),
    });

    return [
      ...STATIC_PATHS.map((href) => entry(href, href === "/" ? [content.home.hero.image] : [])),
      ...content.packages.map((p) => entry(`/packages/${p.slug}`, [p.images.hero, ...p.days.map((d) => d.image)])),
      ...content.destinations.map((d) => entry(`/destinations/${d.slug}`, [d.images.hero, ...d.images.gallery])),
    ];
  });
}
