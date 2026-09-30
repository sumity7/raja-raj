"use client";

import { useRef, useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, Loader2, TriangleAlert } from "lucide-react";
import { enquiryTypes, validateEnquiry, type Enquiry, type EnquiryErrors } from "@/lib/contact";
import type { Dict } from "@/content/ui";

type Status = "idle" | "sending" | "success" | "error";

const empty: Enquiry = {
  name: "",
  mobile: "",
  email: "",
  subject: "",
  type: "general",
  message: "",
};

const fieldClass =
  "mt-2 block w-full border border-ink/30 bg-white px-4 py-3 text-base text-ink placeholder:text-muted/60 focus:border-saffron-deep aria-[invalid=true]:border-red-700";

export function ContactForm({ copy }: { copy: Dict["contact"]["form"] }) {
  const [values, setValues] = useState<Enquiry>(empty);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const set = <K extends keyof Enquiry>(key: K, value: Enquiry[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validateEnquiry(values);
    setErrors(found);
    const firstBad = (Object.keys(found) as (keyof Enquiry)[])[0];
    if (firstBad) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstBad}"]`)?.focus();
      return;
    }

    setStatus("sending");
    const honeypot = new FormData(event.currentTarget).get("website");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: honeypot }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
      setValues(empty);
    } catch {
      setStatus("error");
    }
  }

  const err = (key: keyof Enquiry, text: string) =>
    errors[key] ? (
      <p id={`${key}-error`} className="mt-1.5 text-sm font-semibold text-red-700">
        {text}
      </p>
    ) : null;

  const a11y = (key: keyof Enquiry) => ({
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `${key}-error` : undefined,
  });

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex items-start gap-4 border border-saffron-deep/40 bg-saffron-tint p-6"
      >
        <CheckCircle2 aria-hidden="true" className="mt-0.5 h-6 w-6 shrink-0 text-saffron-deep" />
        <p className="text-xl leading-snug">{copy.success}</p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-6 sm:grid-cols-2">
      {/* Honeypot: hidden from people and assistive tech. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <label htmlFor="name" className="text-sm font-bold">
          {copy.name} <span className="text-saffron-deep" aria-label={copy.required}>*</span>
        </label>
        <input
          id="name"
          name="name"
          autoComplete="name"
          required
          value={values.name}
          onChange={(e) => set("name", e.target.value)}
          className={fieldClass}
          {...a11y("name")}
        />
        {err("name", copy.errors.name)}
      </div>

      <div>
        <label htmlFor="mobile" className="text-sm font-bold">
          {copy.mobile} <span className="text-saffron-deep" aria-label={copy.required}>*</span>
        </label>
        <input
          id="mobile"
          name="mobile"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          value={values.mobile}
          onChange={(e) => set("mobile", e.target.value)}
          className={fieldClass}
          {...a11y("mobile")}
        />
        {err("mobile", copy.errors.mobile)}
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-bold">
          {copy.email}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={(e) => set("email", e.target.value)}
          className={fieldClass}
          {...a11y("email")}
        />
        {err("email", copy.errors.email)}
      </div>

      <div>
        <label htmlFor="type" className="text-sm font-bold">
          {copy.type}
        </label>
        <select
          id="type"
          name="type"
          value={values.type}
          onChange={(e) => set("type", e.target.value as Enquiry["type"])}
          className={fieldClass}
        >
          {enquiryTypes.map((t) => (
            <option key={t} value={t}>
              {copy.types[t]}
            </option>
          ))}
        </select>
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="subject" className="text-sm font-bold">
          {copy.subject} <span className="text-saffron-deep" aria-label={copy.required}>*</span>
        </label>
        <input
          id="subject"
          name="subject"
          required
          value={values.subject}
          onChange={(e) => set("subject", e.target.value)}
          className={fieldClass}
          {...a11y("subject")}
        />
        {err("subject", copy.errors.subject)}
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="message" className="text-sm font-bold">
          {copy.message} <span className="text-saffron-deep" aria-label={copy.required}>*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          value={values.message}
          onChange={(e) => set("message", e.target.value)}
          className={`${fieldClass} resize-y`}
          {...a11y("message")}
        />
        {err("message", copy.errors.message)}
      </div>

      <div className="sm:col-span-2">
        <button type="submit" disabled={status === "sending"} className="btn btn-primary disabled:opacity-70">
          {status === "sending" ? (
            <>
              <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
              {copy.sending}
            </>
          ) : (
            <>
              {copy.submit}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </>
          )}
        </button>

        <div aria-live="polite">
          {status === "error" && (
            <p role="alert" className="mt-5 flex items-start gap-3 text-sm font-semibold text-red-700">
              <TriangleAlert aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" />
              {copy.failure}
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
