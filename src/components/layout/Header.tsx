import { getLocale, getTranslations } from "next-intl/server";
import { site, whatsappLink } from "@/config/site";
import { getContent } from "@/content";
import { getPathname, Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { HeaderNav, type NavItem } from "./HeaderNav";
import { Logo } from "./Logo";

export async function Header() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("Nav");
  const tc = await getTranslations("Common");
  const content = getContent(locale);
  const pkg = content.packages[0];

  const localize = (href: string) => getPathname({ locale, href });
  const items: NavItem[] = [
    { href: localize("/"), label: t("home") },
    {
      href: localize("/destinations"),
      label: t("destinations"),
      children: [
        ...content.destinations.map((d) => ({ href: localize(`/destinations/${d.slug}`), label: d.name })),
        { href: localize("/destinations"), label: t("allDestinations") },
      ],
    },
    { href: localize(`/packages/${pkg.slug}`), label: t("rishikesh"), badge: t("new") },
    { href: localize("/gallery"), label: t("gallery") },
    { href: localize("/about"), label: t("about") },
    { href: localize("/contact"), label: t("contact") },
  ];

  return (
    // No backdrop-filter here: it would trap the fixed mobile menu inside the header box.
    <header className="sticky top-0 z-40 border-b border-ink-900/8 bg-sand-50/95">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-6 lg:h-20 lg:px-8">
        <Link href="/" className="-m-1 shrink-0 rounded-lg p-1" aria-label={`${site.name} – ${t("home")}`}>
          <Logo />
        </Link>
        <HeaderNav
          items={items}
          homeHref={localize("/")}
          labels={{ openMenu: t("openMenu"), closeMenu: t("closeMenu"), mainNav: t("mainNav"), whatsapp: tc("chatOnWhatsApp"), whatsappShort: tc("whatsApp"), call: tc("callNow") }}
          whatsappHref={whatsappLink(tc("generalEnquiry"))}
          phoneHref={site.phone.href}
          phoneDisplay={site.phone.display}
        />
      </div>
    </header>
  );
}
