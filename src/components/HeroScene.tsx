import type { HeroSlide } from "@/content/heroSlides";

/**
 * The setting behind each portrait: clean, flat tonal shapes on warm ivory, no texture or noise.
 *  - profile:     nested arches that glow lighter toward the portrait
 *  - journey:     a pale wall panel above a darker floor band
 * Nothing here pretends to be a photograph. The right side fades into the ivory on the left so
 * the words stay readable.
 */
export function HeroScene({ slide }: { slide: HeroSlide }) {
  const bg: Record<string, string> = {
    profile: "linear-gradient(170deg,#f6e6c6 0%,#efd6a6 100%)",
    journey: "linear-gradient(180deg,#f3e8d4 0%,#ecdcc0 100%)",
  };
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 bg-[#f7f1e7]" />
      <div className="absolute inset-x-0 bottom-0 h-[66%] [mask-image:linear-gradient(to_bottom,transparent,black_36%)] lg:inset-y-0 lg:left-auto lg:right-0 lg:h-auto lg:w-[74%] lg:[mask-image:linear-gradient(to_right,transparent,black_30%)]">
        <div className="absolute inset-0" style={{ backgroundImage: bg[slide.id] }} />
        {slide.id === "journey" && <Study />}
      </div>
    </div>
  );
}

/**
 * Shapes that stand directly behind the profile portrait and move with it, so they stay centred on
 * him at every width: nested arches. Flat fills only.
 */
export function PersonHalo({ id }: { id: string }) {
  if (id === "profile") {
    return (
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-1/2 h-full w-[160%] -translate-x-1/2"
        viewBox="0 0 600 700"
        preserveAspectRatio="xMidYMax meet"
      >
        <path d="M30 700V330a270 270 0 0 1 540 0V700Z" fill="#e8c88e" opacity="0.55" />
        <path d="M85 700V330a215 215 0 0 1 430 0V700Z" fill="#f0d8a8" opacity="0.8" />
        <path d="M140 700V330a160 160 0 0 1 320 0V700Z" fill="#f8eacb" />
        <path d="M300 34v38" stroke="#e85a16" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }
  return null;
}

/** Slide 2: a darker floor band under the desk. */
function Study() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 800 700"
      preserveAspectRatio="xMaxYMax slice"
    >
      <rect x="0" y="560" width="800" height="140" fill="#d9c29a" opacity="0.55" />
    </svg>
  );
}
