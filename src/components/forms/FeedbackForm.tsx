"use client";

import { useRef, useState, type FormEvent } from "react";
import { site, whatsappLink } from "@/config/site";
import type { TripOption } from "@/content";
import { track } from "@/lib/analytics";
import { captureLead } from "@/lib/lead-capture";
import { cn } from "@/lib/utils";
import { validateFeedback, type FeedbackValues } from "@/lib/validation";
import { buildFeedbackMessage } from "@/lib/whatsapp";
import { buttonClasses } from "../ui/Button";
import type { FormLabels } from "./labels";
import { Icon } from "../ui/Icon";
import { describedBy, Field, Honeypot, inputClass, openWhatsApp } from "./fields";

type Errors = Partial<Record<keyof FeedbackValues, string>>;
const FIELD_ORDER: (keyof FeedbackValues)[] = ["name", "trip", "rating", "feedback"];

export function FeedbackForm({ options, labels }: { options: TripOption[]; labels: FormLabels }) {
  const [values, setValues] = useState<FeedbackValues>({ name: "", trip: "", rating: "", feedback: "", publish: false });
  const [hoverRating, setHoverRating] = useState(0);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [attempted, setAttempted] = useState(false);
  const [sent, setSent] = useState<{ url: string; blocked: boolean } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const thanksRef = useRef<HTMLHeadingElement>(null);

  const toMessages = (raw: ReturnType<typeof validateFeedback>): Errors =>
    Object.fromEntries(Object.entries(raw).map(([k, v]) => [k, labels.errors[v]]));

  const update = <K extends keyof FeedbackValues>(name: K, value: FeedbackValues[K]) => {
    const next = { ...values, [name]: value };
    setValues(next);
    if (attempted) setErrors(toMessages(validateFeedback(next)));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAttempted(true);
    const found = toMessages(validateFeedback(values));
    setErrors(found);
    const firstInvalid = FIELD_ORDER.find((f) => found[f]);
    if (firstInvalid) {
      const target = firstInvalid === "rating" ? "feedback-rating-1" : `feedback-${firstInvalid}`;
      formRef.current?.querySelector<HTMLElement>(`#${target}`)?.focus();
      return;
    }
    if (honeypot) {
      setSent({ url: site.whatsapp.url, blocked: false });
      return;
    }

    const tripLabel = options.find((o) => o.value === values.trip)?.label ?? labels.customTrip;
    const rating = Number(values.rating);
    const message = buildFeedbackMessage({ name: values.name.trim(), tripLabel, rating, feedback: values.feedback.trim(), publish: values.publish });
    const url = whatsappLink(message);

    captureLead("feedback", {
      name: values.name.trim(),
      trip: tripLabel,
      rating: String(rating),
      feedback: values.feedback.trim(),
      publish: values.publish ? "yes" : "no",
    });
    track("feedback_submit", { rating, trip: values.trip });

    const opened = openWhatsApp(url);
    setSent({ url, blocked: !opened });
    requestAnimationFrame(() => thanksRef.current?.focus());
  };

  if (sent) {
    return (
      <div role="status" className="rounded-3xl bg-pine-50 p-7 text-center ring-1 ring-pine-700/15 sm:p-10">
        <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-wa-600 text-white">
          <Icon name="heart" size={30} />
        </span>
        <h3 ref={thanksRef} tabIndex={-1} className="mt-5 text-2xl font-semibold focus:outline-none sm:text-3xl">
          {labels.feedbackThanks.title}
        </h3>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-ink-700">
          {labels.feedbackThanks.body}
        </p>
        {sent.blocked && <p className="mt-3 font-semibold text-terracotta-700">{labels.thanks.blocked}</p>}
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <a href={sent.url} target="_blank" rel="noopener noreferrer" className={buttonClasses("whatsapp", "lg")}>
            <Icon name="whatsapp" size={22} />
            <span>{labels.thanks.openWhatsApp}</span>
          </a>
          <a href={site.social.justdial} target="_blank" rel="noopener noreferrer" className={buttonClasses("outline", "lg")}>
            <Icon name="star" size={20} className="text-saffron-500" />
            <span>{labels.feedbackThanks.review}</span>
          </a>
        </div>
      </div>
    );
  }

  const shownRating = hoverRating || Number(values.rating);

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="relative grid gap-5">
      <Honeypot value={honeypot} onChange={setHoneypot} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="feedback-name" label={labels.name} required requiredLabel={labels.required} error={errors.name}>
          <input
            id="feedback-name"
            name="name"
            type="text"
            autoComplete="name"
            aria-required="true"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy("feedback-name", errors.name)}
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            className={inputClass(Boolean(errors.name))}
          />
        </Field>
        <Field id="feedback-trip" label={labels.tripTaken} required requiredLabel={labels.required} error={errors.trip}>
          <select
            id="feedback-trip"
            name="trip"
            aria-required="true"
            aria-invalid={Boolean(errors.trip)}
            aria-describedby={describedBy("feedback-trip", errors.trip)}
            value={values.trip}
            onChange={(e) => update("trip", e.target.value)}
            className={inputClass(Boolean(errors.trip))}
          >
            <option value="">{labels.tripPlaceholder}</option>
            {options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
            <option value="custom">{labels.customTrip}</option>
          </select>
        </Field>
      </div>

      <fieldset aria-describedby={errors.rating ? "feedback-rating-error" : undefined}>
        <legend className="mb-2 text-[0.95rem] font-semibold text-ink-900">
          {labels.rating}
          <span className="text-terracotta-700">
            <span aria-hidden="true"> *</span>
            <span className="sr-only">{labels.required}</span>
          </span>
        </legend>
        <div className="flex gap-1" onMouseLeave={() => setHoverRating(0)}>
          {[1, 2, 3, 4, 5].map((n) => (
            <label
              key={n}
              onMouseEnter={() => setHoverRating(n)}
              className="relative flex size-12 cursor-pointer items-center justify-center rounded-xl has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-terracotta-600"
            >
              <input
                id={`feedback-rating-${n}`}
                type="radio"
                name="rating"
                value={n}
                checked={values.rating === String(n)}
                onChange={(e) => update("rating", e.target.value)}
                className="sr-only"
              />
              <Icon
                name="star"
                size={36}
                className={cn("transition", n <= shownRating ? "text-saffron-500" : "text-sand-300")}
              />
              <span className="sr-only">{labels.stars[n - 1]}</span>
            </label>
          ))}
        </div>
        {errors.rating && (
          <p id="feedback-rating-error" className="mt-1.5 text-sm font-semibold text-terracotta-700">
            {errors.rating}
          </p>
        )}
      </fieldset>

      <Field id="feedback-feedback" label={labels.feedback} required requiredLabel={labels.required} error={errors.feedback}>
        <textarea
          id="feedback-feedback"
          name="feedback"
          rows={5}
          aria-required="true"
          aria-invalid={Boolean(errors.feedback)}
          aria-describedby={describedBy("feedback-feedback", errors.feedback)}
          placeholder={labels.feedbackPlaceholder}
          value={values.feedback}
          onChange={(e) => update("feedback", e.target.value)}
          className={inputClass(Boolean(errors.feedback))}
        />
      </Field>

      <label className="flex min-h-11 cursor-pointer items-start gap-3 text-ink-800">
        <input
          type="checkbox"
          name="publish"
          checked={values.publish}
          onChange={(e) => update("publish", e.target.checked)}
          className="mt-1 size-5 shrink-0 cursor-pointer rounded accent-pine-800"
        />
        <span>{labels.publish}</span>
      </label>

      <div>
        <button type="submit" className={buttonClasses("whatsapp", "lg", "w-full")}>
          <Icon name="whatsapp" size={22} />
          <span>{labels.submitFeedback}</span>
        </button>
        <p className="mt-3 text-center text-sm text-ink-600">{labels.submitNote}</p>
      </div>
    </form>
  );
}
