import { getTranslations } from "next-intl/server";
import { site, whatsappLink } from "@/config/site";
import { Icon } from "../ui/Icon";

// Below md: a sticky Call / WhatsApp bar. From md up: a floating WhatsApp button.
// They are never shown at the same time, so they can't overlap.
export async function MobileActionBar() {
  const t = await getTranslations("Common");
  return (
    <div className="pb-safe fixed inset-x-0 bottom-0 z-30 border-t border-ink-900/10 bg-white/95 shadow-[0_-8px_24px_-12px_rgb(29_26_22/0.25)] md:hidden">
      <div className="grid grid-cols-2 gap-2 p-2">
        <a
          href={site.phone.href}
          data-track="mobile_bar"
          className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-terracotta-600 font-semibold text-white active:bg-terracotta-700"
        >
          <Icon name="phone" size={18} />
          {t("call")}
        </a>
        <a
          href={whatsappLink(t("generalEnquiry"))}
          target="_blank"
          rel="noopener noreferrer"
          data-track="mobile_bar"
          className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-wa-600 font-semibold text-white active:bg-wa-700"
        >
          <Icon name="whatsapp" size={20} />
          {t("whatsApp")}
        </a>
      </div>
    </div>
  );
}

export async function WhatsAppFloat() {
  const t = await getTranslations("Common");
  return (
    <a
      href={whatsappLink(t("generalEnquiry"))}
      target="_blank"
      rel="noopener noreferrer"
      data-track="float"
      aria-label={t("chatOnWhatsApp")}
      className="group fixed bottom-6 right-6 z-30 hidden items-center gap-3 md:flex"
    >
      <span className="pointer-events-none translate-x-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink-900 opacity-0 shadow-soft transition duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100">
        {t("chatOnWhatsApp")}
      </span>
      <span className="flex size-15 items-center justify-center rounded-full bg-wa-600 text-white shadow-lift transition group-hover:scale-105 group-hover:bg-wa-700">
        <Icon name="whatsapp" size={30} />
      </span>
    </a>
  );
}
