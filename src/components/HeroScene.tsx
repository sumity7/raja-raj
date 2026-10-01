import type { HeroSlide } from "@/content/heroSlides";

/**
 * The setting behind each portrait: clean, flat tonal shapes on warm ivory, no texture or noise.
 *  - profile:     nested arches that glow lighter toward the portrait
 *  - journey:     a pale wall panel above a darker floor band, with a thin timeline across
 *  - public-life: layered olive ridges and a soft disc, a wide horizontal composition
 * Nothing here pretends to be a photograph. The right side fades into the ivory on the left so
 * the words stay readable.
 */
export function HeroScene({ slide }: { slide: HeroSlide }) {
  const bg: Record<string, string> = {
    profile: "linear-gradient(170deg,#f6e6c6 0%,#efd6a6 100%)",
    journey: "linear-gradient(180deg,#f3e8d4 0%,#ecdcc0 100%)",
    "public-life": "linear-gradient(180deg,#f0ecd8 0%,#e1ddbd 100%)",
  };
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 bg-[#f7f1e7]" />
      <div className="absolute inset-x-0 bottom-0 h-[66%] [mask-image:linear-gradient(to_bottom,transparent,black_36%)] lg:inset-y-0 lg:left-auto lg:right-0 lg:h-auto lg:w-[74%] lg:[mask-image:linear-gradient(to_right,transparent,black_30%)]">
        <div className="absolute inset-0" style={{ backgroundImage: bg[slide.id] }} />
        {slide.id === "journey" && <Study />}
        {slide.id === "public-life" && <Ridges />}
      </div>
    </div>
  );
}

/**
 * Shapes that stand directly behind a standing portrait and move with it, so they stay centred on
 * him at every width: nested arches (profile) and soft discs (public life). Flat fills only.
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
  if (id === "public-life") {
    return (
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[4%] h-[78%] w-[200%] -translate-x-1/2"
        viewBox="0 0 400 400"
        preserveAspectRatio="xMidYMid meet"
      >
        <circle cx="200" cy="200" r="190" fill="#8c946c" opacity="0.14" />
        <circle cx="200" cy="200" r="140" fill="#f8f5e4" opacity="0.75" />
        <circle cx="200" cy="200" r="140" fill="none" stroke="#596247" strokeWidth="1.2" opacity="0.3" />
      </svg>
    );
  }
  return null;
}

/** Slide 2: a darker floor band under the desk and a thin timeline across the wall. */
function Study() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 800 700"
      preserveAspectRatio="xMaxYMax slice"
    >
      <rect x="0" y="560" width="800" height="140" fill="#d9c29a" opacity="0.55" />
      <path d="M0 215H800" stroke="#8a6a3a" strokeWidth="1.2" opacity="0.4" />
      {[120, 320, 520].map((x) => (
        <circle key={x} cx={x} cy="215" r="6" fill="#f7f1e7" stroke="#8a6a3a" strokeWidth="1.2" opacity="0.9" />
      ))}
      <circle cx="720" cy="215" r="8" fill="#e85a16" />
    </svg>
  );
}

/** Slide 3: layered olive ridges, a horizontal composition. */
function Ridges() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 800 700"
      preserveAspectRatio="xMaxYMax slice"
    >
      <path d="M0 470C180 420 360 430 540 450S760 440 800 430V700H0Z" fill="#8c946c" opacity="0.16" />
      <path d="M0 540C200 490 400 510 600 530S760 520 800 510V700H0Z" fill="#6f7a52" opacity="0.2" />
      <path d="M0 610C220 570 420 590 640 600S760 600 800 595V700H0Z" fill="#596247" opacity="0.26" />
    </svg>
  );
}
