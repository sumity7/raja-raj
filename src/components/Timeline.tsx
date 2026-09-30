import type { ReactNode } from "react";

/**
 * A vertical timeline with one shared axis.
 *
 * Every marker is 1rem wide and sits at the left edge of its item, so its centre is 0.5rem from
 * the list's left edge. Each connector is centred on that same 0.5rem line, starts at the
 * centre of its own marker and runs to the centre of the next one. Marker and line therefore
 * share one coordinate, and nothing depends on the viewport width or on the text beside them.
 */
export function Timeline({ children, label }: { children: ReactNode; label?: string }) {
  return (
    <ol aria-label={label} className="m-0 list-none p-0">
      {children}
    </ol>
  );
}

export function TimelineItem({
  last = false,
  tone = "saffron",
  className = "pb-10",
  children,
}: {
  last?: boolean;
  tone?: "saffron" | "ink";
  /** Bottom spacing between items. Keep it as padding so the connector can reach the next marker. */
  className?: string;
  children: ReactNode;
}) {
  return (
    <li className={`relative pl-9 sm:pl-12 ${last ? "" : className}`}>
      {!last && (
        <span
          aria-hidden="true"
          className="absolute -bottom-3.5 left-2 top-3.5 w-0.5 -translate-x-1/2 bg-line"
        />
      )}
      <span
        aria-hidden="true"
        className={`absolute left-0 top-1.5 z-10 h-4 w-4 rounded-full border-2 bg-paper ${
          tone === "ink" ? "border-ink" : "border-saffron"
        }`}
      />
      {children}
    </li>
  );
}
