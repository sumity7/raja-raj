"use client";

import dynamic from "next/dynamic";
import type { Lang } from "@/lib/i18n";

// Loaded after hydration so the assistant never competes with the page itself.
const AIAssistant = dynamic(() => import("./AIAssistant"), { ssr: false });

export function AssistantLoader({ lang }: { lang: Lang }) {
  return <AIAssistant lang={lang} />;
}
