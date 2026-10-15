import type { CSSProperties, ReactNode } from "react";

// Subtle fade/slide as content scrolls into view, driven by CSS scroll timelines
// (see [data-reveal] in globals.css): no JavaScript, and browsers without support
// or with reduced motion simply show the content. Keep it off the hero/LCP element.
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const style = delay ? ({ "--reveal-offset": `${Math.round(delay * 400)}px` } as CSSProperties) : undefined;
  return (
    <div data-reveal="" className={className} style={style}>
      {children}
    </div>
  );
}
