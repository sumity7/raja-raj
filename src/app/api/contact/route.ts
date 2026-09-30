import { NextResponse } from "next/server";
import {
  enquiryTypes,
  normaliseMobile,
  validateEnquiry,
  type Enquiry,
} from "@/lib/contact";

/**
 * Receives an enquiry and emails it to the configured recipient through Resend's HTTP API.
 * Configure RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL in the environment.
 * In development, when nothing is configured, the enquiry is logged instead of sent.
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  // Honeypot: real visitors never fill this field. Pretend success to bots.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const str = (v: unknown) => (typeof v === "string" ? v : "");
  const enquiry: Enquiry = {
    name: str(body.name),
    mobile: str(body.mobile),
    email: str(body.email),
    subject: str(body.subject),
    type: (enquiryTypes as readonly string[]).includes(str(body.type))
      ? (str(body.type) as Enquiry["type"])
      : "general",
    message: str(body.message),
  };

  if (Object.keys(validateEnquiry(enquiry)).length > 0) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] email not configured; enquiry logged only:", enquiry);
      return NextResponse.json({ ok: true, dev: true });
    }
    console.error("[contact] RESEND_API_KEY, CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL is missing");
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const mobile = normaliseMobile(enquiry.mobile);
  const html = `
    <h2>New website enquiry</h2>
    <table cellpadding="6">
      <tr><td><b>Type</b></td><td>${escapeHtml(enquiry.type)}</td></tr>
      <tr><td><b>Name</b></td><td>${escapeHtml(enquiry.name)}</td></tr>
      <tr><td><b>Mobile</b></td><td>${escapeHtml(mobile)}</td></tr>
      <tr><td><b>Email</b></td><td>${escapeHtml(enquiry.email || "-")}</td></tr>
      <tr><td><b>Subject</b></td><td>${escapeHtml(enquiry.subject)}</td></tr>
    </table>
    <p style="white-space:pre-wrap">${escapeHtml(enquiry.message)}</p>`;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `[Website enquiry] ${enquiry.subject}`,
      html,
      ...(enquiry.email.trim() ? { reply_to: enquiry.email.trim() } : {}),
    }),
  });

  if (!response.ok) {
    console.error("[contact] Resend error", response.status, await response.text());
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
