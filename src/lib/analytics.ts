type EventName = "generate_lead" | "feedback_submit" | "whatsapp_click" | "phone_call_click";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

// gtag-compatible event push. A no-op unless GA4 is configured.
export function track(event: EventName, params: Record<string, string | number> = {}) {
  if (typeof window === "undefined" || !process.env.NEXT_PUBLIC_GA_ID) return;
  window.dataLayer = window.dataLayer || [];
  // gtag reads an Arguments object, not an array.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function gtag(..._args: unknown[]) {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  }
  gtag("event", event, params);
}
