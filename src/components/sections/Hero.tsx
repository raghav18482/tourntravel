import Image from "next/image";
import type { ReactNode } from "react";
import { images, type ImageKey } from "@/content/images";
import { cn } from "@/lib/utils";
import { Container } from "../ui/layout";

// The hero image is the LCP element: fetched eagerly at high priority and never animated.
export function Hero({
  image,
  eyebrow,
  title,
  subtitle,
  actions,
  footer,
  breadcrumbs,
  size = "page",
  pinned = size === "home",
}: {
  image: ImageKey;
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
  footer?: ReactNode;
  breadcrumbs?: ReactNode;
  size?: "home" | "page";
  /** Pins the photo to the viewport so the page scrolls over it. Defaults to on for the home hero. */
  pinned?: boolean;
}) {
  const img = images[image];
  return (
    <section className="on-dark relative isolate overflow-hidden bg-pine-950 text-white">
      {/* Pinned heroes: the photo is pinned to the viewport and clipped to the hero, so it stays
          still while the page scrolls over it. Reduced-motion visitors get a normal image. */}
      <div className={cn("absolute inset-0 -z-20", pinned && "[clip-path:inset(0)]")}>
        <div
          className={cn(
            !pinned && "absolute inset-0",
            // Home: the photo fills the viewport. Inner pages: starts under the header, and on large screens is
            // only as tall as the hero, so the subject near the bottom of the photo stays in view.
            pinned && size === "home" && "fixed inset-x-0 top-0 h-lvh",
            pinned && size === "page" && "fixed inset-x-0 top-16 h-[calc(100lvh-4rem)] lg:top-20 lg:h-[min(calc(100lvh-5rem),34rem)]",
            pinned && "motion-reduce:absolute motion-reduce:inset-0 motion-reduce:h-full",
          )}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            loading="eager"
            fetchPriority="high"
            sizes="100vw"
            quality={60}
            placeholder="blur"
            className={cn("object-cover", pinned && size === "page" && "object-[50%_88%]")}
          />
        </div>
      </div>
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 -z-10 bg-gradient-to-t",
          pinned && size === "page" ? "from-pine-950/85" : "from-pine-950/95",
          // The home photo is bright and slides under the text as you scroll, so its overlay is darker.
          pinned && size === "home" ? "via-pine-950/65 to-pine-950/45" : "via-pine-950/55 to-pine-950/25",
        )}
      />
      <Container
        className={cn(
          "flex flex-col justify-end",
          size === "home"
            ? "min-h-[clamp(560px,calc(100svh-4rem),860px)] pb-10 pt-16 sm:pb-20 sm:pt-24"
            : "min-h-[440px] pb-12 pt-20 sm:min-h-[500px] sm:pb-16",
        )}
      >
        {breadcrumbs && <div className="mb-6">{breadcrumbs}</div>}
        {eyebrow && <div className="mb-4">{eyebrow}</div>}
        <h1
          className={cn(
            "max-w-4xl font-semibold text-white",
            size === "home"
              ? "text-[2.2rem] leading-[1.05] sm:text-6xl lg:text-7xl"
              : "text-[2.1rem] leading-[1.06] sm:text-5xl lg:text-6xl",
          )}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-[1.05rem] leading-relaxed text-white/90 sm:mt-5 sm:text-xl">{subtitle}</p>
        )}
        {actions && <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">{actions}</div>}
        {footer && <div className="mt-8">{footer}</div>}
      </Container>
    </section>
  );
}

export function PageIntro({
  title,
  intro,
  breadcrumbs,
}: {
  title: ReactNode;
  intro?: ReactNode;
  breadcrumbs?: ReactNode;
}) {
  return (
    <section className="border-b border-ink-900/8 bg-sand-100">
      <Container className="py-12 sm:py-16 lg:py-20">
        {breadcrumbs && <div className="mb-6">{breadcrumbs}</div>}
        <h1 className="max-w-4xl text-[2.1rem] leading-[1.06] font-semibold sm:text-5xl lg:text-6xl">{title}</h1>
        {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-600 sm:text-xl">{intro}</p>}
      </Container>
    </section>
  );
}
