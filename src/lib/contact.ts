/** Validation shared by the enquiry form (client) and the API route (server). */

export const enquiryTypes = ["general", "media", "programme", "meeting", "other"] as const;
export type EnquiryType = (typeof enquiryTypes)[number];

export type Enquiry = {
  name: string;
  mobile: string;
  email: string;
  subject: string;
  type: EnquiryType;
  message: string;
};

export type EnquiryErrors = Partial<Record<keyof Enquiry, true>>;

const clean = (v: string) => v.replace(/\D/g, "");

export function normaliseMobile(value: string) {
  const digits = clean(value);
  return digits.length === 12 && digits.startsWith("91")
    ? digits.slice(2)
    : digits.length === 11 && digits.startsWith("0")
      ? digits.slice(1)
      : digits;
}

export function validateEnquiry(e: Enquiry): EnquiryErrors {
  const errors: EnquiryErrors = {};
  if (e.name.trim().length < 2 || e.name.length > 100) errors.name = true;
  if (!/^[6-9]\d{9}$/.test(normaliseMobile(e.mobile))) errors.mobile = true;
  if (e.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e.email.trim())) errors.email = true;
  if (e.subject.trim().length < 3 || e.subject.length > 150) errors.subject = true;
  if (!enquiryTypes.includes(e.type)) errors.type = true;
  if (e.message.trim().length < 10 || e.message.length > 3000) errors.message = true;
  return errors;
}
