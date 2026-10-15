import type { ComponentProps, ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Icon, type IconKey } from "./Icon";

export type ButtonVariant = "whatsapp" | "call" | "primary" | "outline" | "outlineLight" | "light";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2.5 rounded-full font-semibold tracking-[0.01em] transition duration-200 ease-out-soft active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  whatsapp: "bg-wa-600 text-white shadow-soft hover:bg-wa-700 hover:shadow-lift",
  call: "bg-terracotta-600 text-white shadow-soft hover:bg-terracotta-700 hover:shadow-lift",
  primary: "bg-pine-900 text-sand-50 shadow-soft hover:bg-pine-800",
  outline: "border border-ink-900/15 bg-white/80 text-ink-900 hover:border-ink-900/30 hover:bg-white",
  outlineLight: "border border-white/45 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20",
  light: "bg-sand-50 text-pine-900 shadow-soft hover:bg-white",
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-11 px-4 text-sm",
  md: "min-h-12 px-6 text-[0.95rem]",
  lg: "min-h-14 px-7 text-base",
};

export function buttonClasses(variant: ButtonVariant = "primary", size: ButtonSize = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: IconKey;
  iconPosition?: "start" | "end";
  className?: string;
  // Where on the page this CTA sits; sent with analytics click events.
  trackLocation?: string;
} & Omit<ComponentProps<"a">, "href" | "children">;

const isExternal = (href: string) => /^(https?:|tel:|mailto:)/.test(href);

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "start",
  className,
  trackLocation,
  ...rest
}: ButtonLinkProps) {
  const content = (
    <>
      {icon && iconPosition === "start" && <Icon name={icon} size={size === "lg" ? 22 : 20} />}
      <span>{children}</span>
      {icon && iconPosition === "end" && <Icon name={icon} size={18} />}
    </>
  );
  const classes = buttonClasses(variant, size, className);

  if (isExternal(href)) {
    const newTab = href.startsWith("http");
    return (
      <a
        href={href}
        className={classes}
        data-track={trackLocation}
        {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} data-track={trackLocation} {...rest}>
      {content}
    </Link>
  );
}
