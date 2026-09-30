import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found | पृष्ठ नहीं मिला",
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <main className="shell flex min-h-screen flex-col items-start justify-center py-24">
          <p className="label">404</p>
          <h1 className="display mt-6 text-5xl sm:text-6xl">Page not found</h1>
          <p className="mt-3 font-display text-3xl text-saffron-deep">पृष्ठ नहीं मिला</p>
          <p className="mt-6 max-w-md text-ink-2">
            The page you are looking for does not exist. / आप जो पृष्ठ खोज रहे हैं वह मौजूद नहीं है।
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/en" className="btn btn-primary">
              English home
            </Link>
            <Link href="/hi" className="btn btn-ghost">
              हिन्दी मुख्य पृष्ठ
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
