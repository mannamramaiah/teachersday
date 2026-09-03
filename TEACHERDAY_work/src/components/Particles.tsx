import { useMemo } from "react";
import { motion, useReducedMotion } from "motion/react";

type Props = { count?: number; className?: string };

/** Lightweight gold particle field (CSS-transform only). */
export function Particles({ count = 24, className = "" }: Props) {
  const reduced = useReducedMotion();
  const dots = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: (i * 37) % 100,
        top: (i * 53) % 100,
        size: 2 + ((i * 7) % 4),
        delay: (i % 10) * 0.6,
        duration: 7 + ((i * 3) % 7),
      })),
    [count],
  );

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {dots.map((d) => (
        <motion.span
          key={d.id}
          className="absolute rounded-full bg-gold/70"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            boxShadow: "0 0 10px var(--gold)",
          }}
          animate={
            reduced
              ? { opacity: 0.5 }
              : { y: [0, -40, 0], opacity: [0, 0.9, 0] }
          }
          transition={{
            duration: d.duration,
            delay: d.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export function LightRays({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div className="absolute -top-1/2 left-1/4 h-[160%] w-40 rotate-12 bg-gold/10 blur-3xl" />
      <div className="absolute -top-1/2 right-1/4 h-[160%] w-24 -rotate-12 bg-gold-soft/10 blur-3xl" />
    </div>
  );
}
