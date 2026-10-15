"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const noopSubscribe = () => () => {};

// Today's date (YYYY-MM-DD, local time), only known in the browser.
export function useToday() {
  return useSyncExternalStore(noopSubscribe, () => new Date().toLocaleDateString("en-CA"), () => undefined);
}

export function useSearchParam(name: string) {
  return useSyncExternalStore(
    noopSubscribe,
    () => new URLSearchParams(window.location.search).get(name),
    () => null,
  );
}

// Mobile opens the WhatsApp app in place; desktop opens WhatsApp Web in a new tab.
// Must run synchronously inside the submit handler, or browsers block the new tab.
export function openWhatsApp(url: string): boolean {
  const mobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
  if (mobile) {
    window.location.href = url;
    return true;
  }
  // Not using the "noopener" feature: with it, window.open always returns null and
  // a blocked tab can't be detected. The opener is cleared by hand instead.
  const win = window.open(url, "_blank");
  if (!win) return false;
  win.opener = null;
  return true;
}

export const inputClass = (invalid?: boolean) =>
  cn(
    "block w-full rounded-2xl border bg-white px-4 py-3 text-base text-ink-900 shadow-[inset_0_1px_2px_rgb(29_26_22/0.04)] transition placeholder:text-ink-600/60 focus:outline-none focus:ring-4",
    invalid
      ? "border-terracotta-600 focus:border-terracotta-600 focus:ring-terracotta-600/15"
      : "border-ink-900/15 focus:border-pine-700 focus:ring-pine-700/15",
  );

export function Field({
  id,
  label,
  required,
  requiredLabel,
  optionalLabel,
  error,
  hint,
  children,
  className,
}: {
  id: string;
  label: string;
  required?: boolean;
  requiredLabel: string;
  optionalLabel?: string;
  error?: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 flex items-baseline gap-1.5 text-[0.95rem] font-semibold text-ink-900">
        {label}
        {required ? (
          <span className="text-terracotta-700">
            <span aria-hidden="true">*</span>
            <span className="sr-only">{requiredLabel}</span>
          </span>
        ) : (
          optionalLabel && <span className="text-sm font-normal text-ink-600">{optionalLabel}</span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-ink-600">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-sm font-semibold text-terracotta-700">
          {error}
        </p>
      )}
    </div>
  );
}

export function describedBy(id: string, error?: string, hint?: string) {
  if (error) return `${id}-error`;
  if (hint) return `${id}-hint`;
  return undefined;
}

// Visually hidden field that real people never fill in.
export function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Company
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
    </div>
  );
}
