import { NextResponse } from "next/server";
import { enquiryTypes, validateEnquiry, type Enquiry } from "@/lib/contact";
import { mailConfig, sendEnquiry } from "@/lib/mail";

export const runtime = "nodejs";

/**
 * Receives an enquiry and emails it (Gmail + App Password, see lib/mail.ts).
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

  if (!mailConfig()) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] email not configured; enquiry logged only:", enquiry);
      return NextResponse.json({ ok: true, dev: true });
    }
    console.error("[contact] GMAIL_USER, GMAIL_APP_PASSWORD or CONTACT_TO_EMAIL is missing");
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  try {
    await sendEnquiry(enquiry);
  } catch (error) {
    // Log the reason for the owner; never send details back to the visitor.
    console.error("[contact] send failed:", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
