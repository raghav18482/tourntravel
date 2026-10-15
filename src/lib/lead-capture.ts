// Backup copy of every form submission, sent before WhatsApp opens so the
// enquiry isn't lost if the visitor never taps Send. Works with a Google Apps
// Script web app or Formspree (both accept form-encoded POSTs). Does nothing
// when NEXT_PUBLIC_LEAD_ENDPOINT is not set.
export function captureLead(kind: "enquiry" | "feedback", data: Record<string, string>) {
  const endpoint = process.env.NEXT_PUBLIC_LEAD_ENDPOINT;
  if (!endpoint) return;

  const body = new URLSearchParams({
    kind,
    ...data,
    page: window.location.pathname,
    submittedAt: new Date().toISOString(),
  });

  // sendBeacon is queued by the browser and survives the page navigating to WhatsApp.
  try {
    if (navigator.sendBeacon?.(endpoint, body)) return;
  } catch {
    // fall through to fetch
  }
  fetch(endpoint, { method: "POST", body, mode: "no-cors", keepalive: true }).catch(() => {});
}
