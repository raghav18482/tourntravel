"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

// One delegated listener tracks every WhatsApp and phone link on the site,
// so CTA buttons can stay server-rendered. `data-track` names the location.
export function AnalyticsListener() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.("a");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      const params = { location: link.dataset.track ?? "unknown", page: window.location.pathname };
      if (href.startsWith("tel:")) track("phone_call_click", params);
      else if (href.includes("wa.me/")) track("whatsapp_click", params);
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}
