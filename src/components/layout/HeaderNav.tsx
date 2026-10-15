"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { buttonClasses } from "../ui/Button";
import { Icon } from "../ui/Icon";

export type NavItem = {
  href: string;
  label: string;
  badge?: string;
  children?: { href: string; label: string }[];
};

// Hrefs arrive already localized from the server, so plain next/link is enough.
type Props = {
  items: NavItem[];
  homeHref: string;
  labels: { openMenu: string; closeMenu: string; mainNav: string; whatsapp: string; whatsappShort: string; call: string };
  whatsappHref: string;
  phoneHref: string;
  phoneDisplay: string;
};

export function HeaderNav({ items, homeHref, labels, whatsappHref, phoneHref, phoneDisplay }: Props) {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === homeHref ? pathname === homeHref : pathname === href || pathname.startsWith(`${href}/`);
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close the menu after navigating.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <nav aria-label={labels.mainNav} className="hidden lg:block">
        <ul className="flex items-center gap-0.5 xl:gap-1">
          {items.map((item) => {
            const active = isActive(item.href);
            const linkClass = cn(
              "relative inline-flex min-h-11 items-center gap-2 whitespace-nowrap rounded-full px-2.5 text-[0.95rem] font-semibold transition-colors xl:px-3.5",
              active ? "text-terracotta-700" : "text-ink-800 hover:bg-sand-200/60 hover:text-ink-900",
            );
            if (!item.children) {
              return (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass} aria-current={active ? "page" : undefined}>
                    {item.label}
                    {item.badge && (
                      <span className="rounded-full bg-saffron-500 px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-ink-900">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            }
            return (
              <li key={item.href} className="group relative">
                <Link href={item.href} className={linkClass} aria-current={active && pathname === item.href ? "page" : undefined}>
                  {item.label}
                  <Icon name="chevronDown" size={16} className="transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
                </Link>
                <ul className="pointer-events-none invisible absolute left-0 top-full min-w-60 translate-y-1 rounded-2xl border border-ink-900/8 bg-white p-2 opacity-0 shadow-lift transition duration-200 group-hover:pointer-events-auto group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  {item.children.map((child) => (
                    <li key={child.href + child.label}>
                      <Link
                        href={child.href}
                        className={cn(
                          "flex min-h-11 items-center rounded-xl px-3.5 text-[0.95rem] font-medium hover:bg-sand-100",
                          pathname === child.href ? "text-terracotta-700" : "text-ink-800",
                        )}
                        aria-current={pathname === child.href ? "page" : undefined}
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="flex items-center gap-2">
        <a
          href={phoneHref}
          data-track="header"
          className="hidden min-h-11 items-center gap-2 rounded-full px-3 text-[0.95rem] font-semibold text-ink-800 hover:text-terracotta-700 xl:inline-flex"
        >
          <Icon name="phone" size={18} />
          {phoneDisplay}
        </a>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          data-track="header"
          className={buttonClasses("whatsapp", "sm", "whitespace-nowrap max-md:hidden")}
        >
          <Icon name="whatsapp" size={18} />
          <span>{labels.whatsappShort}</span>
        </a>
        <button
          ref={toggleRef}
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-full text-ink-900 hover:bg-sand-200/70 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? labels.closeMenu : labels.openMenu}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? "x" : "menu"} size={24} />
        </button>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-sand-50 px-5 pb-28 pt-4 lg:hidden"
      >
        <nav aria-label={labels.mainNav}>
          <ul className="divide-y divide-ink-900/8">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex min-h-14 items-center gap-2 font-display text-2xl font-semibold",
                    isActive(item.href) ? "text-terracotta-700" : "text-ink-900",
                  )}
                  aria-current={pathname === item.href ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                  {item.badge && (
                    <span className="rounded-full bg-saffron-500 px-2 py-0.5 font-sans text-[0.65rem] font-bold uppercase tracking-wider text-ink-900">
                      {item.badge}
                    </span>
                  )}
                </Link>
                {item.children && (
                  <ul className="grid grid-cols-2 gap-x-3 pb-3">
                    {item.children.slice(0, -1).map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="flex min-h-11 items-center text-[0.95rem] font-medium text-ink-700"
                          onClick={() => setOpen(false)}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-6 grid gap-3">
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" data-track="mobile_menu" className={buttonClasses("whatsapp", "lg")}>
            <Icon name="whatsapp" size={22} />
            <span>{labels.whatsapp}</span>
          </a>
          <a href={phoneHref} data-track="mobile_menu" className={buttonClasses("outline", "lg")}>
            <Icon name="phone" size={20} />
            <span>
              {labels.call} · {phoneDisplay}
            </span>
          </a>
        </div>
      </div>
    </>
  );
}
