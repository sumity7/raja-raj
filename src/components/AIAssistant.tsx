"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
import { ArrowUpRight, SendHorizontal, X } from "lucide-react";
import { ChatIcon } from "./icons";
import { answerQuestion } from "@/content/assistant";
import { getDict } from "@/content/ui";
import { localePath, tr, type Lang } from "@/lib/i18n";

type Message = {
  id: number;
  from: "user" | "bot";
  text: string;
  link?: { href: string; label: string };
  /** Offer the suggested questions again after an unanswered question. */
  suggest?: boolean;
};

/**
 * A small, deliberately limited assistant. It does not call a language model:
 * every reply is an approved passage from content/assistant.ts, so it cannot
 * produce claims that are not already published on the site.
 */
export default function AIAssistant({ lang }: { lang: Lang }) {
  const d = getDict(lang);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [thinking, setThinking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(1);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [messages, thinking]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  function ask(question: string) {
    const text = question.trim();
    if (!text || thinking) return;
    const id = nextId.current++;
    setMessages((prev) => [...prev, { id, from: "user", text }]);
    setDraft("");
    setThinking(true);

    const entry = answerQuestion(text);
    window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: nextId.current++,
          from: "bot",
          text: entry ? tr(entry.answer, lang) : d.assistant.unavailable,
          link: entry?.link
            ? { href: localePath(lang, entry.link.href), label: tr(entry.link.label, lang) }
            : undefined,
          suggest: !entry,
        },
      ]);
      setThinking(false);
    }, 350);
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    ask(draft);
  };

  return (
    <LazyMotion features={domAnimation}>
      <div className="fixed bottom-4 right-4 z-[60] sm:bottom-6 sm:right-6 xl:right-16">
        <AnimatePresence>
          {open && (
            <m.div
              role="dialog"
              aria-label={d.assistant.title}
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-16 right-0 flex max-h-[min(34rem,calc(100dvh-7rem))] w-[calc(100vw-2rem)] flex-col border border-line bg-white shadow-[0_24px_60px_-20px_rgba(28,26,23,0.45)] sm:w-[24rem]"
            >
              <div className="flex items-center justify-between bg-ink px-5 py-4 text-white">
                <div>
                  <p className="font-display text-lg font-bold leading-tight">
                    {d.assistant.title}
                  </p>
                  <p className="mt-0.5 text-[0.8125rem] leading-snug text-white/70">{d.assistant.note}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label={d.assistant.close}
                  className="flex h-9 w-9 shrink-0 items-center justify-center hover:bg-white/10"
                >
                  <X aria-hidden="true" className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5" aria-live="polite">
                <p className="max-w-[85%] bg-sand px-4 py-3 text-[0.95rem]">{d.assistant.hello}</p>

                {messages.length === 0 && (
                  <div>
                    <p className="label mb-3">
                      {d.assistant.suggested}
                    </p>
                    <ul className="flex flex-col items-start gap-2">
                      {d.assistant.questions.map((q) => (
                        <li key={q}>
                          <button
                            type="button"
                            onClick={() => ask(q)}
                            className="border border-line px-3.5 py-2 text-left text-sm transition-colors hover:border-saffron-deep hover:text-saffron-deep"
                          >
                            {q}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {messages.map((msg) =>
                  msg.from === "user" ? (
                    <p
                      key={msg.id}
                      className="ml-auto max-w-[85%] bg-ink px-4 py-3 text-[0.95rem] text-white"
                    >
                      {msg.text}
                    </p>
                  ) : (
                    <div key={msg.id} className="max-w-[92%] bg-sand px-4 py-3 text-[0.95rem]">
                      <p>{msg.text}</p>
                      {msg.suggest && (
                        <ul className="mt-3 flex flex-col items-start gap-2">
                          {d.assistant.questions.slice(0, 4).map((q) => (
                            <li key={q}>
                              <button
                                type="button"
                                onClick={() => ask(q)}
                                className="border border-line bg-white px-3 py-1.5 text-left text-sm transition-colors hover:border-saffron-deep hover:text-saffron-deep"
                              >
                                {q}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                      {msg.link && (
                        <Link
                          href={msg.link.href}
                          onClick={() => setOpen(false)}
                          className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-saffron-deep hover:underline"
                        >
                          {msg.link.label}
                          <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                        </Link>
                      )}
                    </div>
                  ),
                )}
                {thinking && (
                  <p className="text-sm text-muted" aria-hidden="true">
                    …
                  </p>
                )}
                <div ref={endRef} />
              </div>

              <form onSubmit={onSubmit} className="flex border-t border-line">
                <label htmlFor="assistant-input" className="sr-only">
                  {d.assistant.placeholder}
                </label>
                <input
                  ref={inputRef}
                  id="assistant-input"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  maxLength={200}
                  placeholder={d.assistant.placeholder}
                  autoComplete="off"
                  className="min-w-0 flex-1 px-5 py-4 text-[0.95rem] placeholder:text-muted/70 focus:outline-none focus-visible:bg-saffron-tint"
                />
                <button
                  type="submit"
                  aria-label={d.assistant.send}
                  disabled={!draft.trim()}
                  className="flex w-14 items-center justify-center text-saffron-deep transition-colors hover:bg-saffron-tint disabled:text-muted/40"
                >
                  <SendHorizontal aria-hidden="true" className="h-5 w-5" />
                </button>
              </form>
            </m.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? d.assistant.close : d.assistant.open}
          className="flex min-h-12 min-w-12 items-center justify-center gap-2.5 bg-ink px-3.5 text-sm font-semibold text-white shadow-[0_10px_24px_-10px_rgba(28,26,23,0.6)] ring-1 ring-white/25 transition-colors hover:bg-saffron-deep sm:px-5"
        >
          <ChatIcon className="h-[1.15rem] w-[1.15rem] text-saffron" />
          <span className="hidden sm:inline">{d.assistant.button}</span>
        </button>
      </div>
    </LazyMotion>
  );
}
