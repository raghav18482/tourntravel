import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8", className)}>{children}</div>;
}

type Tone = "sand" | "cream" | "white" | "dark";

const tones: Record<Tone, string> = {
  sand: "bg-sand-50",
  cream: "bg-sand-100",
  white: "bg-white",
  dark: "on-dark bg-pine-900 text-sand-50",
};

export function Section({
  children,
  tone = "sand",
  className,
  id,
  labelledBy,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  id?: string;
  labelledBy?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("py-16 sm:py-20 lg:py-24", tones[tone], className)}>
      {children}
    </section>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  align = "left",
  dark = false,
  className,
}: {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p
          className={cn(
            "mb-3 text-xs font-bold uppercase tracking-[0.18em]",
            dark ? "text-saffron-300" : "text-terracotta-700",
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className={cn(
          "text-[2rem] leading-[1.1] font-semibold sm:text-4xl lg:text-[2.85rem]",
          dark ? "text-sand-50" : "text-ink-900",
        )}
      >
        {title}
      </h2>
      {intro && (
        <p className={cn("mt-4 text-lg leading-relaxed", dark ? "text-sand-100/85" : "text-ink-600")}>{intro}</p>
      )}
    </div>
  );
}

export function Badge({ children, tone = "saffron" }: { children: ReactNode; tone?: "saffron" | "light" | "pine" }) {
  const styles = {
    saffron: "bg-saffron-500 text-ink-900",
    light: "bg-white/90 text-pine-900",
    pine: "bg-pine-100 text-pine-900",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.12em]",
        styles[tone],
      )}
    >
      {children}
    </span>
  );
}
