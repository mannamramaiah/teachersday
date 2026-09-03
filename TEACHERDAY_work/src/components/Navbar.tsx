import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, GraduationCap } from "lucide-react";
import { ORG } from "@/lib/event";

const LINKS = [
  { id: "home", label: "Home" },
  { id: "leadership", label: "Leadership" },
  { id: "event", label: "Event" },
  { id: "appreciation", label: "Appreciation" },
  
  { id: "gallery", label: "Gallery" },
  { id: "invitation", label: "Invitation" },
];

export function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "glass py-2" : "py-4"
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4"
      >
        <button
          onClick={() => go("home")}
          className="flex items-center gap-2 text-left"
          aria-label={`${ORG} — go to top`}
        >
          <GraduationCap className="size-6 shrink-0 text-gold" aria-hidden="true" />
          <span className="font-display text-[11px] leading-tight font-semibold tracking-[0.18em] sm:text-sm">
            {ORG}
          </span>
        </button>

        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => go(l.id)}
                className="rounded-full px-3 py-2 text-sm text-foreground/80 transition-colors hover:bg-accent hover:text-gold"
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        <button
          className="rounded-md p-2 text-gold lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.ul
            key="mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="glass mx-4 mt-2 overflow-hidden rounded-2xl lg:hidden"
          >
            {LINKS.map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => go(l.id)}
                  className="w-full px-5 py-4 text-left text-base text-foreground/90 transition-colors hover:text-gold"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
