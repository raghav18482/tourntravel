import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import type { FieldError } from "@/lib/validation";

// All form copy is resolved on the server and passed to the client forms as
// props, so no translation runtime is shipped to the browser.
export type FormLabels = {
  required: string;
  optional: string;
  name: string;
  phone: string;
  phoneHint: string;
  email: string;
  trip: string;
  tripTaken: string;
  tripPlaceholder: string;
  customTrip: string;
  date: string;
  travellers: string;
  budget: string;
  budgetPlaceholder: string;
  budgets: string[];
  message: string;
  messagePlaceholder: string;
  submitEnquiry: string;
  submitFeedback: string;
  submitNote: string;
  rating: string;
  stars: string[];
  feedback: string;
  feedbackPlaceholder: string;
  publish: string;
  errors: Record<FieldError, string>;
  thanks: { title: string; body: ReactNode; blocked: string; openWhatsApp: string; call: string; again: string };
  feedbackThanks: { title: string; body: ReactNode; review: string };
};

const ERROR_KEYS: FieldError[] = [
  "required",
  "nameTooShort",
  "invalidPhone",
  "invalidEmail",
  "pastDate",
  "invalidTravellers",
  "ratingRequired",
  "messageTooShort",
];

export async function getFormLabels(): Promise<FormLabels> {
  const t = await getTranslations("Forms");
  const strong = (chunks: ReactNode) => <strong className="text-ink-900">{chunks}</strong>;
  const plain = [
    "required", "optional", "name", "phone", "phoneHint", "email", "trip", "tripTaken", "tripPlaceholder",
    "customTrip", "date", "travellers", "budget", "budgetPlaceholder", "message", "messagePlaceholder",
    "submitEnquiry", "submitFeedback", "submitNote", "rating", "feedback", "feedbackPlaceholder", "publish",
  ] as const;

  return {
    ...(Object.fromEntries(plain.map((key) => [key, t(key)])) as Record<(typeof plain)[number], string>),
    budgets: (["b1", "b2", "b3", "b4"] as const).map((key) => t(`budgets.${key}`)),
    stars: [1, 2, 3, 4, 5].map((count) => t("stars", { count })),
    errors: Object.fromEntries(ERROR_KEYS.map((key) => [key, t(`errors.${key}`)])) as Record<FieldError, string>,
    thanks: {
      title: t("thanks.title"),
      body: t.rich("thanks.body", { strong }),
      blocked: t("thanks.blocked"),
      openWhatsApp: t("thanks.openWhatsApp"),
      call: t("thanks.call"),
      again: t("thanks.again"),
    },
    feedbackThanks: {
      title: t("feedbackThanks.title"),
      body: t.rich("feedbackThanks.body", { strong }),
      review: t("feedbackThanks.review"),
    },
  };
}
