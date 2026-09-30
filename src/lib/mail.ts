import nodemailer from "nodemailer";
import { normaliseMobile, type Enquiry } from "./contact";

/**
 * Sends enquiries by email through Gmail using an App Password.
 * Nothing secret lives in the code: it is all read from environment variables.
 *
 *   GMAIL_USER          the Gmail address that sends the mail (needs 2-step verification)
 *   GMAIL_APP_PASSWORD  a 16-character Google App Password for that account
 *   CONTACT_TO_EMAIL    where enquiries are delivered
 */

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

export function mailConfig() {
  const user = process.env.GMAIL_USER?.trim();
  // Google shows App Passwords in groups of four; the spaces are not part of the password.
  const pass = process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, "");
  const to = process.env.CONTACT_TO_EMAIL?.trim();
  return user && pass && to ? { user, pass, to } : null;
}

export function buildEnquiryMail(e: Enquiry) {
  const mobile = normaliseMobile(e.mobile);
  const rows: [string, string][] = [
    ["Type", e.type],
    ["Name", oneLine(e.name)],
    ["Mobile", mobile],
    ["Email", e.email.trim() || "-"],
    ["Subject", oneLine(e.subject)],
  ];
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nMessage:\n${e.message.trim()}\n`;
  const html = `
    <h2 style="margin:0 0 12px">New website enquiry</h2>
    <table cellpadding="6" style="border-collapse:collapse">
      ${rows.map(([k, v]) => `<tr><td style="color:#666">${k}</td><td><b>${escapeHtml(v)}</b></td></tr>`).join("")}
    </table>
    <p style="margin:16px 0 4px;color:#666">Message</p>
    <p style="white-space:pre-wrap;margin:0">${escapeHtml(e.message.trim())}</p>`;
  return { subject: `[Website enquiry] ${oneLine(e.subject)}`.slice(0, 200), text, html };
}

export async function sendEnquiry(e: Enquiry) {
  const cfg = mailConfig();
  if (!cfg) throw new Error("not_configured");
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: cfg.user, pass: cfg.pass },
  });
  const mail = buildEnquiryMail(e);
  await transporter.sendMail({
    from: `"Website enquiry" <${cfg.user}>`,
    to: cfg.to,
    // Replying to the email goes straight to the person who wrote in, when they gave an address.
    ...(e.email.trim() ? { replyTo: e.email.trim() } : {}),
    ...mail,
  });
}
