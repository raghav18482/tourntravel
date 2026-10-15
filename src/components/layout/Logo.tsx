import Image from "next/image";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";
import fullDark from "@/assets/brand/logo.png";
import fullLight from "@/assets/brand/logo-light.png";
import markDark from "@/assets/brand/mark.png";

// Artwork is built from scripts/brand-src/logo-original.webp by scripts/process-logo.mjs.
// The header uses the D-and-bus mark beside live text, because the stacked logo's
// "Tour N Travel" line is too small to read at header height. The footer shows the full logo.
export function Logo({ light = false, full = false, className }: { light?: boolean; full?: boolean; className?: string }) {
  if (full) {
    return (
      <Image
        src={light ? fullLight : fullDark}
        alt={site.name}
        width={220}
        sizes="220px"
        className={cn("h-auto w-[220px]", className)}
      />
    );
  }

  return (
    <span className={cn("flex items-center gap-2", className)}>
      <Image src={markDark} alt="" width={64} sizes="64px" priority className="h-auto w-12 shrink-0 lg:w-14" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.35rem] font-semibold uppercase tracking-wide text-ink-900">Deepak</span>{" "}
        <span className="mt-1 text-[0.62rem] font-bold uppercase tracking-[0.22em] text-[#7A5C1E]">Tour &amp; Travel</span>
      </span>
    </span>
  );
}
