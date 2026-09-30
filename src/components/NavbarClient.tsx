"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { localePath, type Lang } from "@/lib/i18n";
import type { NavItem } from "@/lib/nav";

type Props = {
  lang: Lang;
  items: NavItem[];
  labels: { menu: string; close: string; language: string };
  logo: ReactNode;
  switcher: ReactNode;
  mobileSwitcher: ReactNode;
};

const CLOSE_DELAY = 140;

export function NavbarClient({ lang, items, labels, logo, switcher, mobileSwitcher }: Props) {
  const pathname = usePathname() ?? "";
  const [open, setOpen] = useState<string | null>(null);
  const [drawer, setDrawer] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isActive = useCallback(
    (item: NavItem) => {
      const paths = item.href ? [item.href] : (item.children ?? []).map((c) => c.href);
      return paths.some((href) => {
        const target = localePath(lang, href.split("#")[0]);
        return href === "/" ? pathname === target : pathname.startsWith(target);
      });
    },
    [lang, pathname],
  );

  const cancelClose = () => {
    if (timer.current) clearTimeout(timer.current);
  };
  const scheduleClose = () => {
    cancelClose();
    timer.current = setTimeout(() => setOpen(null), CLOSE_DELAY);
  };

  const closeAll = () => {
    setOpen(null);
    setDrawer(false);
  };

  // Compact the header once the page has scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes menus; body scroll is locked while the drawer is open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setDrawer(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawer]);

  return (
    <LazyMotion features={domAnimation}>
      <header
        data-scrolled={scrolled}
        className={`group/header sticky top-0 z-50 border-b border-line bg-white transition-shadow duration-300 ${
          scrolled ? "shadow-[0_10px_30px_-18px_rgba(24,20,18,0.35)]" : ""
        }`}
      >
        <div className="shell flex h-[4.5rem] items-center justify-between gap-6 transition-[height] duration-300 lg:h-[5rem] lg:group-data-[scrolled=true]/header:h-[4.25rem]">
          {logo}

          {/* Desktop navigation */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1 xl:gap-2">
              {items.map((item) => {
                const active = isActive(item);
                const base =
                  "relative flex items-center gap-1 px-2.5 py-2 text-[1.05rem] tracking-[0.005em] transition-colors xl:px-3.5";
                const state = active ? "text-saffron-deep" : "text-ink hover:text-saffron-deep";
                const underline = (
                  <>
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-2.5 -bottom-0.5 h-[2px] origin-left bg-saffron transition-transform duration-200 xl:inset-x-3.5 ${
                        active ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                    {!active && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-2.5 -bottom-0.5 h-px origin-left scale-x-0 bg-ink/50 transition-transform duration-200 group-hover/item:scale-x-100 group-focus-within/item:scale-x-100 xl:inset-x-3.5"
                      />
                    )}
                  </>
                );

                if (!item.children) {
                  return (
                    <li key={item.id} className="group/item">
                      <Link
                        href={localePath(lang, item.href)}
                        onClick={closeAll}
                        aria-current={active ? "page" : undefined}
                        className={`${base} ${state}`}
                      >
                        {item.label}
                        {underline}
                      </Link>
                    </li>
                  );
                }

                const isOpen = open === item.id;
                return (
                  <li
                    key={item.id}
                    className="group/item relative"
                    onMouseEnter={() => {
                      cancelClose();
                      setOpen(item.id);
                    }}
                    onMouseLeave={scheduleClose}
                    onBlur={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(null);
                    }}
                  >
                    <div className="flex items-center">
                      <Link
                        href={localePath(lang, item.href)}
                        onClick={closeAll}
                        aria-current={active ? "page" : undefined}
                        className={`${base.replace("px-2.5", "pl-2.5 pr-0.5").replace("xl:px-3.5", "xl:pl-3.5 xl:pr-0.5")} ${state}`}
                      >
                        {item.label}
                        {underline}
                      </Link>
                      <button
                        type="button"
                        aria-haspopup="true"
                        aria-expanded={isOpen}
                        aria-controls={`menu-${item.id}`}
                        aria-label={`${item.label}: ${labels.menu}`}
                        onClick={() => setOpen(isOpen ? null : item.id)}
                        className="flex h-9 items-center px-1.5 text-muted transition-colors hover:text-saffron-deep xl:pr-2"
                      >
                        <ChevronDown
                          aria-hidden="true"
                          strokeWidth={1.75}
                          className={`h-3 w-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                    </div>

                    <div
                      id={`menu-${item.id}`}
                      className={`absolute left-1/2 top-full z-50 w-[16rem] -translate-x-1/2 pt-2 transition duration-200 ${
                        isOpen
                          ? "visible translate-y-0 opacity-100"
                          : "invisible translate-y-1 opacity-0"
                      }`}
                    >
                      <div className="border-t-2 border-saffron bg-white shadow-[0_20px_40px_-20px_rgba(28,26,23,0.4)]">
                        <ul className="py-2">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={localePath(lang, child.href)}
                                onClick={closeAll}
                                className="block border-l-2 border-transparent px-5 py-2.5 text-[1.02rem] transition-colors hover:border-saffron hover:bg-paper hover:text-saffron-deep focus-visible:border-saffron focus-visible:bg-paper"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden lg:block">{switcher}</div>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center border border-line lg:hidden"
              aria-label={drawer ? labels.close : labels.menu}
              aria-expanded={drawer}
              aria-controls="mobile-menu"
              onClick={() => setDrawer((v) => !v)}
            >
              {drawer ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {drawer && (
            <m.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-x-0 bottom-0 top-[4.5rem] z-40 overflow-y-auto bg-paper lg:hidden"
            >
              <nav aria-label="Mobile" className="shell py-4">
                <ul className="divide-y divide-line border-b border-line">
                  {items.map((item) => {
                    const active = isActive(item);
                    if (!item.children) {
                      return (
                        <li key={item.id}>
                          <Link
                            href={localePath(lang, item.href)}
                            onClick={closeAll}
                            aria-current={active ? "page" : undefined}
                            className={`flex min-h-14 items-center text-xl font-bold ${
                              active ? "text-saffron-deep" : ""
                            }`}
                          >
                            {item.label}
                          </Link>
                        </li>
                      );
                    }
                    const isOpen = expanded === item.id;
                    return (
                      <li key={item.id}>
                        <div className="flex items-stretch">
                          <Link
                            href={localePath(lang, item.href)}
                            onClick={closeAll}
                            aria-current={active ? "page" : undefined}
                            className={`flex min-h-14 flex-1 items-center text-xl font-bold ${
                              active ? "text-saffron-deep" : ""
                            }`}
                          >
                            {item.label}
                          </Link>
                          <button
                            type="button"
                            aria-expanded={isOpen}
                            aria-controls={`m-${item.id}`}
                            aria-label={`${item.label}: ${labels.menu}`}
                            onClick={() => setExpanded(isOpen ? null : item.id)}
                            className="flex w-14 items-center justify-center border-l border-line text-ink-2"
                          >
                            <ChevronDown
                              aria-hidden="true"
                              className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
                            />
                          </button>
                        </div>
                        {isOpen && (
                          <ul id={`m-${item.id}`} className="mb-3 border-l-2 border-saffron pl-4">
                            {item.children.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={localePath(lang, child.href)}
                                  onClick={closeAll}
                                  className="flex min-h-12 items-center text-base font-semibold text-ink-2 hover:text-saffron-deep"
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
                <div className="flex items-center justify-between pt-5">
                  <span className="label">{labels.language}</span>
                  {mobileSwitcher}
                </div>
              </nav>
            </m.div>
          )}
        </AnimatePresence>
      </header>
    </LazyMotion>
  );
}
