"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { AmbientEffects } from "@/components/ambient-effects";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/departments", label: "Departments" },
  { href: "/events", label: "Events" },
  { href: "/aurathon", label: "AURATHON" },
  { href: "/gallery", label: "Gallery" },
  { href: "/team", label: "Team" },
];

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduceMotion = useReducedMotion();
  const activeCardRef = useRef<HTMLElement | null>(null);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch" || !(event.target instanceof Element)) return;

    const nextCard = event.target.closest<HTMLElement>(
      "[class*='rounded-'][class*='border']:not(.absolute):not(.pointer-events-none)",
    );

    if (activeCardRef.current && activeCardRef.current !== nextCard) {
      activeCardRef.current.dataset.pointerActive = "false";
    }
    activeCardRef.current = nextCard;

    if (!nextCard) return;
    const bounds = nextCard.getBoundingClientRect();
    nextCard.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`);
    nextCard.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
    nextCard.dataset.interactiveCard = "true";
    nextCard.dataset.pointerActive = "true";
  };

  const handlePointerLeave = () => {
    if (activeCardRef.current) {
      activeCardRef.current.dataset.pointerActive = "false";
    }
    activeCardRef.current = null;
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <AmbientEffects />
      <div
        className="relative z-10 min-h-screen text-foreground"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-ember focus:px-4 focus:py-2 focus:text-background"
      >
        Skip to content
      </a>

      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6">
        <nav
          aria-label="Main"
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-4 transition-all duration-500 ${
            scrolled ? "glass py-2 shadow-[0_30px_60px_-30px_rgb(0_0_0_/_70%)]" : "py-3"
          }`}
        >
          <Link href="/" aria-label="AURA home" className="flex shrink-0 items-center gap-2">
            <Image
              src="/aura-logo.png"
              alt=""
              width={38}
              height={38}
              className="h-9 w-9 object-contain"
              priority
            />
            <span className="font-display text-lg font-semibold tracking-tight">AURA</span>
          </Link>

          <ul className="hidden items-center gap-1 xl:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="relative block rounded-full px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {isActive(item.href) ? (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-secondary"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  ) : null}
                  <span className="relative">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-2 xl:flex">
            <Link
              href="/login"
              className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Member Login
            </Link>
            <Link
              href="/join"
              className="rounded-full bg-ember px-5 py-2 text-sm font-semibold text-background shadow-ember transition-transform hover:-translate-y-0.5"
            >
              Join AURA
            </Link>
          </div>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="grid h-11 w-11 place-items-center rounded-full glass xl:hidden"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        <AnimatePresence>
          {menuOpen ? (
            <motion.div
              id="mobile-navigation"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="glass mx-auto mt-2 max-w-7xl rounded-2xl p-4 xl:hidden"
            >
              <nav aria-label="Mobile">
                <ul className="flex flex-col">
                  {[...navItems, { href: "/login", label: "Member Login" }, { href: "/join", label: "Join AURA" }].map(
                    (item, index) => (
                      <motion.li
                        key={item.href}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.04 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setMenuOpen(false)}
                          aria-current={isActive(item.href) ? "page" : undefined}
                          className={`block rounded-xl px-4 py-3 font-display text-lg ${
                            isActive(item.href)
                              ? "bg-secondary text-foreground"
                              : "text-muted-foreground"
                          }`}
                        >
                          {item.label}
                        </Link>
                      </motion.li>
                    ),
                  )}
                </ul>
              </nav>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          id="main"
          key={pathname}
          className="route-content"
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
          transition={{
            duration: reduceMotion ? 0 : 0.42,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      <footer className="relative mt-24 border-t border-border">
        <div className="absolute inset-x-0 top-0 h-px bg-aura opacity-60" />
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image src="/aura-logo.png" alt="" width={44} height={44} className="h-11 w-11 object-contain" />
              <span className="font-display text-xl font-semibold">AURA</span>
            </Link>
            <p className="max-w-sm text-sm leading-7 text-muted-foreground">
              Association for Unleashing Research and Advancement — the technical society of Guru Tegh Bahadur Institute of Technology (GTBIT).
            </p>
          </div>

          <div>
            <p className="eyebrow mb-4">Explore</p>
            <ul className="space-y-2 text-sm">
              {navItems.slice(1).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-4">Get involved</p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/join" className="text-muted-foreground hover:text-foreground">
                  Join AURA
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-muted-foreground hover:text-foreground">
                  Member Login
                </Link>
              </li>
              <li>
                <Link href="/member/dashboard" className="text-muted-foreground hover:text-foreground">
                  Member dashboard
                </Link>
              </li>
              <li>
                <Link href="/admin/dashboard" className="text-muted-foreground hover:text-foreground">
                  Leadership hub
                </Link>
              </li>
              <li className="pt-2 text-muted-foreground">GTBIT, Rajouri Garden, New Delhi</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border py-6 text-center font-mono text-xs text-muted-foreground">
          © 2026 AURA · GTBIT
        </div>
      </footer>
      </div>
    </>
  );
}
