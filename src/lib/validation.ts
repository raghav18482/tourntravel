// Returns the 10-digit Indian mobile number, or null if it isn't valid.
// Accepts spaces, dashes, brackets and a +91 / 91 / 0 prefix.
export function normalizeIndianMobile(input: string): string | null {
  let digits = input.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  else if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  return /^[6-9]\d{9}$/.test(digits) ? digits : null;
}

export function formatIndianMobile(tenDigits: string) {
  return `+91 ${tenDigits.slice(0, 5)} ${tenDigits.slice(5)}`;
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

export type FieldError =
  | "required"
  | "nameTooShort"
  | "invalidPhone"
  | "invalidEmail"
  | "pastDate"
  | "invalidTravellers"
  | "ratingRequired"
  | "messageTooShort";

export type EnquiryValues = {
  name: string;
  phone: string;
  email: string;
  trip: string;
  date: string;
  travellers: string;
  budget: string;
  message: string;
};

export type FeedbackValues = {
  name: string;
  trip: string;
  rating: string;
  feedback: string;
  publish: boolean;
};

function validateName(name: string): FieldError | undefined {
  const trimmed = name.trim();
  if (!trimmed) return "required";
  if (trimmed.length < 2) return "nameTooShort";
}

export function validateEnquiry(v: EnquiryValues, today: string) {
  const errors: Partial<Record<keyof EnquiryValues, FieldError>> = {};
  const name = validateName(v.name);
  if (name) errors.name = name;

  if (!v.phone.trim()) errors.phone = "required";
  else if (!normalizeIndianMobile(v.phone)) errors.phone = "invalidPhone";

  if (v.email.trim() && !isValidEmail(v.email.trim())) errors.email = "invalidEmail";
  if (!v.trip) errors.trip = "required";
  if (v.date && v.date < today) errors.date = "pastDate";

  if (v.travellers) {
    const n = Number(v.travellers);
    if (!Number.isInteger(n) || n < 1 || n > 99) errors.travellers = "invalidTravellers";
  }
  return errors;
}

export function validateFeedback(v: FeedbackValues) {
  const errors: Partial<Record<keyof FeedbackValues, FieldError>> = {};
  const name = validateName(v.name);
  if (name) errors.name = name;
  if (!v.trip) errors.trip = "required";
  if (!v.rating) errors.rating = "ratingRequired";
  if (!v.feedback.trim()) errors.feedback = "required";
  else if (v.feedback.trim().length < 10) errors.feedback = "messageTooShort";
  return errors;
}
