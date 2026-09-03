import { useMemo } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Heart } from "lucide-react";
import { Particles, LightRays } from "@/components/Particles";
import { ORG } from "@/lib/event";
import { scrollToId } from "@/components/Navbar";

function Confetti() {
  const reduced = useReducedMotion();
  const pieces = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: (i * 61) % 100,
        delay: (i % 6) * 0.8,
        duration: 6 + (i % 5),
        rotate: (i % 2 ? 1 : -1) * 220,
      })),
    [],
  );
  if (reduced) return null;
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className="absolute top-[-10%] h-3 w-1.5 rounded-sm bg-gold/80"
          style={{ left: `${p.left}%` }}
          animate={{ y: ["0%", "900%"], rotate: [0, p.rotate], opacity: [0, 1, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </div>
  );
}

export function FinalCTA() {
  const reduced = useReducedMotion();
  return (
    <section className="relative flex min-h-[80svh] items-center justify-center overflow-hidden px-5 py-24">
      {/* Decorative background in place of removed campus photo */}
      <div className="absolute inset-0" aria-hidden="true" style={{ background: "var(--gradient-navy)" }} />
      <div className="absolute inset-0 bg-navy-deep/85" aria-hidden="true" />
      <div
        className="absolute inset-0 opacity-70"
        aria-hidden="true"
        style={{ background: "var(--gradient-navy)" }}
      />
      <LightRays />
      <Particles count={26} />
      <Confetti />
      <div
        className="absolute top-1/4 left-1/2 size-72 -translate-x-1/2 rounded-full bg-gold/20 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-display text-2xl leading-snug font-medium text-foreground sm:text-4xl"
        >
          Thank You for Inspiring, Guiding, and Shaping Our Future.
        </motion.h2>
        <p className="gold-text mt-8 font-display text-3xl font-semibold tracking-wide sm:text-5xl">
          HAPPY TEACHER&rsquo;S DAY 2026
        </p>
        <p className="mt-5 text-xs tracking-[0.3em] text-foreground/80 uppercase">{ORG}</p>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => scrollToId("my-invitation")}
          className="mt-10 inline-flex items-center gap-2 rounded-full px-8 py-4 text-xs font-semibold tracking-[0.2em] text-primary-foreground uppercase"
          style={{ backgroundImage: "var(--gradient-gold)", boxShadow: "var(--shadow-gold)" }}
        >
          <Heart className="size-4" aria-hidden="true" /> 💛 Celebrate Our Mentors
        </motion.button>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative border-t border-gold/20 px-5 py-12 text-center">
      <p className="font-display text-lg font-semibold tracking-[0.18em] text-gold">{ORG}</p>
      <p className="mt-2 text-sm text-foreground/85">Teacher&rsquo;s Day Celebration 2026</p>
      <p className="mt-1 text-sm text-muted-foreground">
        Celebrating the mentors who shape tomorrow.
      </p>
      <p className="mt-6 text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
        Credits: AM Reddy Group of Institutions
      </p>
    </footer>
  );
}
