import { site, whatsappLink } from "@/config/site";
import { formatIndianMobile, normalizeIndianMobile } from "./validation";

// These messages go to Deepak, so they stay in English whatever the site language.

type Line = [label: string, value: string | undefined];

function compose(title: string, lines: Line[]) {
  const body = lines
    .filter(([, value]) => value && value.trim())
    .map(([label, value]) => `${label}: ${value!.trim()}`)
    .join("\n");
  return `${title}\n\n${body}`;
}

export function formatTravelDate(isoDate: string) {
  if (!isoDate) return undefined;
  const date = new Date(`${isoDate}T00:00:00Z`);
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(date);
}

export type EnquiryMessageInput = {
  name: string;
  phone: string;
  email?: string;
  tripLabel: string;
  date?: string;
  travellers?: string;
  budget?: string;
  message?: string;
};

export function buildEnquiryMessage(d: EnquiryMessageInput) {
  const phone = normalizeIndianMobile(d.phone);
  return compose(`🙏 New Trip Enquiry – ${site.name}`, [
    ["Name", d.name],
    ["Phone", phone ? formatIndianMobile(phone) : d.phone],
    ["Email", d.email],
    ["Package", d.tripLabel],
    ["Travel date", d.date ? formatTravelDate(d.date) : undefined],
    ["Travellers", d.travellers],
    ["Budget", d.budget],
    ["Message", d.message],
  ]);
}

export type FeedbackMessageInput = {
  name: string;
  tripLabel: string;
  rating: number;
  feedback: string;
  publish: boolean;
};

export function buildFeedbackMessage(d: FeedbackMessageInput) {
  const stars = "★".repeat(d.rating) + "☆".repeat(5 - d.rating);
  return compose(`⭐ New Feedback – ${site.name}`, [
    ["Name", d.name],
    ["Trip", d.tripLabel],
    ["Rating", `${stars} (${d.rating}/5)`],
    ["Feedback", d.feedback],
    ["Publish on website", d.publish ? "Yes" : "No"],
  ]);
}

export { whatsappLink };
