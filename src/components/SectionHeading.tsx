import type { ReactNode } from "react";

/**
 * Section heading. A small label above and a lead paragraph below are both optional,
 * so sections can look different from one another without extra decoration.
 * Width is set in rem rather than characters, so Hindi phrases wrap naturally.
 */
export function SectionHeading({
  id,
  label,
  title,
  lead,
  leadClassName = "text-ink-2",
  className = "",
  children,
}: {
  id?: string;
  label?: string;
  title: string;
  lead?: string;
  leadClassName?: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={className}>
      {label && <p className="label">{label}</p>}
      <h2 id={id} className={`h-section max-w-3xl ${label ? "mt-2" : ""}`}>
        {title}
      </h2>
      {lead && <p className={`lead mt-5 max-w-2xl ${leadClassName}`}>{lead}</p>}
      {children}
    </div>
  );
}
