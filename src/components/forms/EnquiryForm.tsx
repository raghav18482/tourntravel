"use client";

import { useRef, useState, type FormEvent } from "react";
import { site, whatsappLink } from "@/config/site";
import type { TripOption } from "@/content";
import { track } from "@/lib/analytics";
import { captureLead } from "@/lib/lead-capture";
import { normalizeIndianMobile, validateEnquiry, type EnquiryValues } from "@/lib/validation";
import { buildEnquiryMessage } from "@/lib/whatsapp";
import { buttonClasses } from "../ui/Button";
import type { FormLabels } from "./labels";
import { Icon } from "../ui/Icon";
import { describedBy, Field, Honeypot, inputClass, openWhatsApp, useSearchParam, useToday } from "./fields";

type Errors = Partial<Record<keyof EnquiryValues, string>>;

const FIELD_ORDER: (keyof EnquiryValues)[] = ["name", "phone", "email", "trip", "date", "travellers", "budget", "message"];

export function EnquiryForm({
  options,
  labels,
  defaultTrip,
  idPrefix = "enquiry",
}: {
  options: TripOption[];
  labels: FormLabels;
  defaultTrip?: string;
  idPrefix?: string;
}) {
  const today = useToday();
  const urlTrip = useSearchParam("trip");
  const validUrlTrip = options.some((o) => o.value === urlTrip) ? urlTrip : null;

  const [values, setValues] = useState<Omit<EnquiryValues, "trip">>({
    name: "",
    phone: "",
    email: "",
    date: "",
    travellers: "",
    budget: "",
    message: "",
  });
  // null = untouched, so a ?trip= link or the page default can pre-select it.
  const [trip, setTrip] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [attempted, setAttempted] = useState(false);
  const [sent, setSent] = useState<{ url: string; blocked: boolean } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const thanksRef = useRef<HTMLHeadingElement>(null);

  const selectedTrip = trip ?? validUrlTrip ?? defaultTrip ?? "";
  const id = (name: string) => `${idPrefix}-${name}`;

  const toMessages = (raw: ReturnType<typeof validateEnquiry>): Errors =>
    Object.fromEntries(Object.entries(raw).map(([k, v]) => [k, labels.errors[v]]));

  const update = (name: keyof EnquiryValues, value: string) => {
    if (name === "trip") setTrip(value);
    else setValues((v) => ({ ...v, [name]: value }));
    if (attempted) {
      const next = { ...values, trip: selectedTrip, [name]: value };
      setErrors(toMessages(validateEnquiry(next, today ?? "")));
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAttempted(true);
    const all: EnquiryValues = { ...values, trip: selectedTrip };
    const found = toMessages(validateEnquiry(all, today ?? ""));
    setErrors(found);

    const firstInvalid = FIELD_ORDER.find((f) => found[f]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`#${id(firstInvalid)}`)?.focus();
      return;
    }
    if (honeypot) {
      setSent({ url: site.whatsapp.url, blocked: false });
      return;
    }

    const tripLabel = options.find((o) => o.value === all.trip)?.label ?? labels.customTrip;
    const message = buildEnquiryMessage({ ...all, tripLabel });
    const url = whatsappLink(message);

    captureLead("enquiry", {
      name: all.name.trim(),
      phone: normalizeIndianMobile(all.phone) ?? all.phone,
      email: all.email.trim(),
      trip: tripLabel,
      date: all.date,
      travellers: all.travellers,
      budget: all.budget,
      message: all.message.trim(),
    });
    track("generate_lead", { trip: all.trip, form: idPrefix });

    const opened = openWhatsApp(url);
    setSent({ url, blocked: !opened });
    requestAnimationFrame(() => thanksRef.current?.focus());
  };

  if (sent) {
    return (
      <div role="status" className="rounded-3xl bg-pine-50 p-7 text-center ring-1 ring-pine-700/15 sm:p-10">
        <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-wa-600 text-white">
          <Icon name="whatsapp" size={32} />
        </span>
        <h3 ref={thanksRef} tabIndex={-1} className="mt-5 text-2xl font-semibold focus:outline-none sm:text-3xl">
          {labels.thanks.title}
        </h3>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-ink-700">
          {labels.thanks.body}
        </p>
        {sent.blocked && <p className="mt-3 font-semibold text-terracotta-700">{labels.thanks.blocked}</p>}
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <a href={sent.url} target="_blank" rel="noopener noreferrer" className={buttonClasses("whatsapp", "lg")}>
            <Icon name="whatsapp" size={22} />
            <span>{labels.thanks.openWhatsApp}</span>
          </a>
          <a href={site.phone.href} data-track="form_thanks" className={buttonClasses("outline", "lg")}>
            <Icon name="phone" size={20} />
            <span>{labels.thanks.call}</span>
          </a>
        </div>
        <button
          type="button"
          onClick={() => setSent(null)}
          className="mt-6 min-h-11 text-sm font-semibold text-ink-700 underline underline-offset-4 hover:text-ink-900"
        >
          {labels.thanks.again}
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="relative grid gap-5 sm:grid-cols-2">
      <Honeypot value={honeypot} onChange={setHoneypot} />
      <Field id={id("name")} label={labels.name} required requiredLabel={labels.required} error={errors.name}>
        <input
          id={id("name")}
          name="name"
          type="text"
          autoComplete="name"
          aria-required="true"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={describedBy(id("name"), errors.name)}
          value={values.name}
          onChange={(e) => update("name", e.target.value)}
          className={inputClass(Boolean(errors.name))}
        />
      </Field>
      <Field id={id("phone")} label={labels.phone} required requiredLabel={labels.required} error={errors.phone} hint={labels.phoneHint}>
        <input
          id={id("phone")}
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="98765 43210"
          aria-required="true"
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={describedBy(id("phone"), errors.phone, labels.phoneHint)}
          value={values.phone}
          onChange={(e) => update("phone", e.target.value)}
          className={inputClass(Boolean(errors.phone))}
        />
      </Field>
      <Field id={id("trip")} label={labels.trip} required requiredLabel={labels.required} error={errors.trip} className="sm:col-span-2">
        <select
          id={id("trip")}
          name="trip"
          aria-required="true"
          aria-invalid={Boolean(errors.trip)}
          aria-describedby={describedBy(id("trip"), errors.trip)}
          value={selectedTrip}
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
      <Field id={id("date")} label={labels.date} optionalLabel={labels.optional} requiredLabel={labels.required} error={errors.date}>
        <input
          id={id("date")}
          name="date"
          type="date"
          min={today}
          aria-invalid={Boolean(errors.date)}
          aria-describedby={describedBy(id("date"), errors.date)}
          value={values.date}
          onChange={(e) => update("date", e.target.value)}
          className={inputClass(Boolean(errors.date))}
        />
      </Field>
      <Field id={id("travellers")} label={labels.travellers} optionalLabel={labels.optional} requiredLabel={labels.required} error={errors.travellers}>
        <input
          id={id("travellers")}
          name="travellers"
          type="number"
          inputMode="numeric"
          min={1}
          max={99}
          placeholder="2"
          aria-invalid={Boolean(errors.travellers)}
          aria-describedby={describedBy(id("travellers"), errors.travellers)}
          value={values.travellers}
          onChange={(e) => update("travellers", e.target.value)}
          className={inputClass(Boolean(errors.travellers))}
        />
      </Field>
      <Field id={id("email")} label={labels.email} optionalLabel={labels.optional} requiredLabel={labels.required} error={errors.email}>
        <input
          id={id("email")}
          name="email"
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={describedBy(id("email"), errors.email)}
          value={values.email}
          onChange={(e) => update("email", e.target.value)}
          className={inputClass(Boolean(errors.email))}
        />
      </Field>
      <Field id={id("budget")} label={labels.budget} optionalLabel={labels.optional} requiredLabel={labels.required}>
        <select
          id={id("budget")}
          name="budget"
          value={values.budget}
          onChange={(e) => update("budget", e.target.value)}
          className={inputClass()}
        >
          <option value="">{labels.budgetPlaceholder}</option>
          {labels.budgets.map((budget) => (
            <option key={budget} value={budget}>
              {budget}
            </option>
          ))}
        </select>
      </Field>
      <Field id={id("message")} label={labels.message} optionalLabel={labels.optional} requiredLabel={labels.required} className="sm:col-span-2">
        <textarea
          id={id("message")}
          name="message"
          rows={4}
          placeholder={labels.messagePlaceholder}
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          className={inputClass()}
        />
      </Field>
      <div className="sm:col-span-2">
        <button type="submit" className={buttonClasses("whatsapp", "lg", "w-full")}>
          <Icon name="whatsapp" size={22} />
          <span>{labels.submitEnquiry}</span>
        </button>
        <p className="mt-3 text-center text-sm text-ink-600">{labels.submitNote}</p>
      </div>
    </form>
  );
}
