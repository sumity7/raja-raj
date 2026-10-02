"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
import { RotateCcw, SendHorizontal, X } from "lucide-react";
import { ChatIcon } from "./icons";
import { answerQuestion } from "@/content/assistant";
import { getDict } from "@/content/ui";
import { tr, type Lang } from "@/lib/i18n";
import { questionLang } from "@/lib/questionLang";

type Message = {
  id: number;
  from: "user" | "bot";
  text: string;
};

/**
 * A small, deliberately limited assistant. When GEMINI_API_KEY is set, /api/assistant answers with
 * Gemini using only the passages in content/assistant.ts; otherwise (or on any failure) the reply
 * is the approved passage itself, so it cannot produce claims that are not published on the site.
 */
export default function AIAssistant({ lang }: { lang: Lang }) {
  const d = getDict(lang);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [thinking, setThinking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const lastBotRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(1);
  const [scrolled, setScrolled] = useState(false);
  const [near, setNear] = useState(false);

  // Past the first screen the button shrinks to its icon so it stops covering the page text.
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 240);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // While waiting, show the question at the bottom; when the answer arrives, show it from its first
  // line (not its last) so the visitor starts reading at the top instead of being thrown past it.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const last = messages[messages.length - 1];
    if (!thinking && last?.from === "bot" && lastBotRef.current) {
      list.scrollTo({ top: Math.max(0, lastBotRef.current.offsetTop - 12), behavior: "smooth" });
    } else {
      list.scrollTo({ top: list.scrollHeight, behavior: "smooth" });
    }
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
    const history = messages.slice(-8).map(({ from, text }) => ({ from, text }));
    setMessages((prev) => [...prev, { id, from: "user", text }]);
    setDraft("");
    setThinking(true);

    // The built-in answer is the fallback when the AI is not set up, is busy or fails.
    // Answers follow the language the question is written in, not the language of the page.
    const fallback = tr(answerQuestion(text).answer, questionLang(text));
    const reply = (answer: string) => {
      // Keep the chat plain: turn any markdown the model slips in into ordinary text.
      const clean = answer
        .replace(/\*\*(.+?)\*\*/g, "$1")
        .replace(/^\s*[*-]\s+/gm, "• ")
        .replace(/^#+\s*/gm, "")
        .trim();
      setMessages((prev) => [...prev, { id: nextId.current++, from: "bot", text: clean }]);
      setThinking(false);
      window.setTimeout(() => inputRef.current?.focus(), 0);
    };

    fetch("/api/assistant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: text, history }),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
      .then((data: { text?: string }) => reply(data.text || fallback))
      .catch(() => reply(fallback));
  }

  const reset = () => {
    setMessages([]);
    setDraft("");
    setThinking(false);
    inputRef.current?.focus();
  };

  // Questions the visitor has not asked yet, offered again after every answer.
  const asked = new Set(messages.filter((m) => m.from === "user").map((m) => m.text));
  const followUps = d.assistant.questions.filter((q) => !asked.has(q)).slice(0, 3);

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
                <div className="flex shrink-0 items-center">
                  {messages.length > 0 && (
                    <button
                      type="button"
                      onClick={reset}
                      aria-label={d.assistant.reset}
                      title={d.assistant.reset}
                      className="flex h-9 w-9 items-center justify-center hover:bg-white/10"
                    >
                      <RotateCcw aria-hidden="true" className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label={d.assistant.close}
                    className="flex h-9 w-9 items-center justify-center hover:bg-white/10"
                  >
                    <X aria-hidden="true" className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div ref={listRef} className="relative flex-1 space-y-4 overflow-y-auto px-5 py-5" aria-live="polite">
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
                    <div
                      key={msg.id}
                      ref={msg.id === messages[messages.length - 1]?.id ? lastBotRef : undefined}
                      className="max-w-[92%] bg-sand px-4 py-3 text-[0.95rem]"
                    >
                      <p className="whitespace-pre-line">{msg.text}</p>
                    </div>
                  ),
                )}
                {thinking && (
                  <p className="text-sm text-muted" aria-hidden="true">
                    …
                  </p>
                )}

                {messages.length > 0 && !thinking && (
                  <div>
                    <p className="label mb-2">{d.assistant.more}</p>
                    <ul className="flex flex-col items-start gap-2">
                      {followUps.map((q) => (
                        <li key={q}>
                          <button
                            type="button"
                            onClick={() => ask(q)}
                            className="border border-line px-3 py-1.5 text-left text-sm transition-colors hover:border-saffron-deep hover:text-saffron-deep"
                          >
                            {q}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
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
          onMouseEnter={() => setNear(true)}
          onMouseLeave={() => setNear(false)}
          onFocus={() => setNear(true)}
          onBlur={() => setNear(false)}
          aria-expanded={open}
          aria-label={open ? d.assistant.close : d.assistant.open}
          className="flex min-h-12 min-w-12 items-center justify-center bg-ink px-3.5 text-sm font-semibold text-white shadow-[0_10px_24px_-10px_rgba(28,26,23,0.6)] ring-1 ring-white/25 transition-colors hover:bg-saffron-deep sm:px-5"
        >
          <ChatIcon className="h-[1.15rem] w-[1.15rem] shrink-0 text-saffron sm:mr-2.5" />
          <span className={`hidden overflow-hidden whitespace-nowrap transition-[max-width,opacity] duration-300 sm:inline ${scrolled && !near && !open ? "max-w-0 opacity-0" : "max-w-[12rem] opacity-100"}`}>{d.assistant.button}</span>
        </button>
      </div>
    </LazyMotion>
  );
}
