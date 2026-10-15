"use client";

import Image, { type StaticImageData } from "next/image";
import { useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "../ui/Icon";

export type TimelineDay = {
  day: number;
  title: string;
  summary: string;
  activities: string[];
  image: { src: StaticImageData; alt: string };
};

const DESKTOP = "(min-width: 1024px)";

function useIsDesktop() {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(DESKTOP);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(DESKTOP).matches,
    () => false,
  );
}

// Accordion on mobile, full timeline on desktop. Every day's text is in the
// server HTML either way; collapsed panels are only visually hidden on mobile.
export function PackageTimeline({
  days,
  labels,
}: {
  days: TimelineDay[];
  labels: { day: string; expandAll: string; collapseAll: string };
}) {
  const isDesktop = useIsDesktop();
  const [open, setOpen] = useState<number[]>([days[0]?.day]);
  const allOpen = open.length === days.length;

  const toggle = (day: number) =>
    setOpen((current) => (current.includes(day) ? current.filter((d) => d !== day) : [...current, day]));

  return (
    <div>
      <div className="mb-4 flex justify-end lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(allOpen ? [] : days.map((d) => d.day))}
          className="inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold text-terracotta-700 hover:bg-saffron-100"
        >
          {allOpen ? labels.collapseAll : labels.expandAll}
        </button>
      </div>
      <ol className="space-y-4 lg:space-y-0">
        {days.map((day, index) => {
          const expanded = isDesktop || open.includes(day.day);
          const panelId = `itinerary-day-${day.day}`;
          const last = index === days.length - 1;
          const heading = (
            <>
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-saffron-500 font-display text-lg font-semibold text-ink-900 lg:hidden">
                {day.day}
              </span>
              <span className="flex flex-col">
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-terracotta-700">
                  {labels.day.replace("{day}", String(day.day))}
                </span>
                <span className="font-display text-xl font-semibold text-ink-900 sm:text-2xl">{day.title}</span>
              </span>
            </>
          );

          return (
            <li key={day.day} className="lg:grid lg:grid-cols-[3.5rem_1fr] lg:gap-6">
              <div aria-hidden="true" className="hidden flex-col items-center lg:flex">
                <span className="flex size-14 items-center justify-center rounded-full bg-saffron-500 font-display text-xl font-semibold text-ink-900 shadow-soft">
                  {day.day}
                </span>
                {!last && <span className="w-0.5 flex-1 bg-gradient-to-b from-saffron-300 to-sand-300" />}
              </div>
              <div className={cn("overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-ink-900/5", !last && "lg:mb-8")}>
                <h3 className="font-sans">
                  {isDesktop ? (
                    <span className="flex items-center gap-4 px-7 pt-7">{heading}</span>
                  ) : (
                    <button
                      type="button"
                      aria-expanded={expanded}
                      aria-controls={panelId}
                      onClick={() => toggle(day.day)}
                      className="flex min-h-16 w-full items-center gap-4 p-5 text-left lg:px-7 lg:pt-7 lg:pb-0"
                    >
                      {heading}
                      <Icon
                        name="chevronDown"
                        size={22}
                        className={cn("ml-auto shrink-0 text-ink-600 transition-transform lg:hidden", expanded && "rotate-180")}
                      />
                    </button>
                  )}
                </h3>
                <div id={panelId} className={cn(expanded ? "block" : "hidden", "lg:block")}>
                  <div className="grid gap-6 px-5 pb-6 pt-1 lg:grid-cols-[1fr_17rem] lg:px-7 lg:pb-7 lg:pt-4">
                    <div>
                      <p className="leading-relaxed text-ink-700">{day.summary}</p>
                      <ul className="mt-4 space-y-2.5">
                        {day.activities.map((activity) => (
                          <li key={activity} className="flex gap-3 text-ink-800">
                            <Icon name="check" size={20} className="mt-0.5 shrink-0 text-wa-600" />
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                      <Image
                        src={day.image.src}
                        alt={day.image.alt}
                        fill
                        sizes="(min-width: 1024px) 272px, 100vw"
                        placeholder="blur"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
