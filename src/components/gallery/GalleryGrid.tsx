"use client";

import Image, { type StaticImageData } from "next/image";
import { useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "../ui/Icon";

export type GalleryItem = { id: string; src: StaticImageData; alt: string; tags: string[] };

type Labels = {
  all: string;
  filterBy: string;
  showing: string;
  open: string;
  close: string;
  previous: string;
  next: string;
  position: string;
};

export function GalleryGrid({
  items,
  filters,
  labels,
}: {
  items: GalleryItem[];
  filters: { value: string; label: string }[];
  labels: Labels;
}) {
  const [filter, setFilter] = useState("all");
  const [index, setIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const visible = filter === "all" ? items : items.filter((item) => item.tags.includes(filter));
  const current = index !== null ? visible[index] : null;
  const fill = (template: string, values: Record<string, string | number>) =>
    template.replace(/\{(\w+)\}/g, (_, k) => String(values[k] ?? ""));

  const open = (i: number, trigger: HTMLElement) => {
    openerRef.current = trigger;
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const onClose = () => {
    setIndex(null);
    openerRef.current?.focus();
  };
  const step = (delta: number) => setIndex((i) => (i === null ? i : (i + delta + visible.length) % visible.length));

  const onKeyDown = (e: KeyboardEvent<HTMLDialogElement>) => {
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
  };
  // Clicking the dark backdrop (the dialog element itself) closes it.
  const onDialogClick = (e: MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) dialogRef.current?.close();
  };

  return (
    <div>
      <div role="group" aria-label={labels.filterBy} className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
        {[{ value: "all", label: labels.all }, ...filters].map((f) => {
          const active = filter === f.value;
          const count = f.value === "all" ? items.length : items.filter((item) => item.tags.includes(f.value)).length;
          return (
            <button
              key={f.value}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(f.value)}
              className={cn(
                "min-h-11 shrink-0 rounded-full px-5 text-sm font-semibold transition",
                active ? "bg-pine-900 text-sand-50" : "bg-white text-ink-800 ring-1 ring-ink-900/10 hover:ring-ink-900/25",
              )}
            >
              {f.label}
              <span className={cn("ml-2 text-xs font-bold", active ? "text-sand-50/70" : "text-ink-600")}>{count}</span>
            </button>
          );
        })}
      </div>
      <p className="mt-5 text-sm text-ink-600" aria-live="polite">
        {fill(labels.showing, { count: visible.length })}
      </p>

      {/* Keyed by filter so the list remounts: every filter change re-renders the photos from scratch. */}
      <ul key={filter} className="mt-4 columns-2 gap-3 sm:gap-4 md:columns-3 lg:columns-4">
        {visible.map((item, i) => (
          <li key={item.id} className="mb-3 break-inside-avoid sm:mb-4">
            <button
              type="button"
              onClick={(e) => open(i, e.currentTarget)}
              className="group relative block w-full overflow-hidden rounded-2xl"
              aria-label={fill(labels.open, { photo: item.alt })}
            >
              <Image
                src={item.src}
                alt={item.alt}
                sizes="(min-width: 1024px) 300px, (min-width: 768px) 33vw, 50vw"
                placeholder="blur"
                className="h-auto w-full transition duration-500 group-hover:scale-[1.03]"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-900/70 to-transparent p-3 text-left text-sm font-medium text-white opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
                {item.alt}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        onClose={onClose}
        onKeyDown={onKeyDown}
        onClick={onDialogClick}
        aria-label={current?.alt}
        className="on-dark m-auto h-[100dvh] max-h-none w-screen max-w-none bg-transparent p-0 text-white backdrop:bg-pine-950/90"
      >
        {current && (
          <div className="flex h-full flex-col items-center justify-center gap-4 p-4 sm:p-10">
            <div className="flex w-full max-w-6xl items-center justify-between">
              <p className="text-sm font-semibold text-white/80">
                {fill(labels.position, { current: (index ?? 0) + 1, total: visible.length })}
              </p>
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                className="inline-flex size-12 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
                aria-label={labels.close}
                autoFocus
              >
                <Icon name="x" size={24} />
              </button>
            </div>
            <div className="relative w-full max-w-6xl flex-1">
              <Image
                key={current.id}
                src={current.src}
                alt={current.alt}
                fill
                sizes="(min-width: 1280px) 1152px, 100vw"
                placeholder="blur"
                // Passed as a style (not a class) so the blur preview is also contained.
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className="flex w-full max-w-6xl items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => step(-1)}
                className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
                aria-label={labels.previous}
              >
                <Icon name="chevronLeft" size={24} />
              </button>
              <p className="text-center text-sm text-white/85 sm:text-base">{current.alt}</p>
              <button
                type="button"
                onClick={() => step(1)}
                className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
                aria-label={labels.next}
              >
                <Icon name="chevronRight" size={24} />
              </button>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
