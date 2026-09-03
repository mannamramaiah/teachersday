import type { ReactNode } from "react";
import { motion } from "motion/react";

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <Reveal className="mx-auto mb-12 max-w-3xl text-center">
      {eyebrow ? (
        <p className="mb-3 text-xs tracking-[0.35em] text-gold/80 uppercase">{eyebrow}</p>
      ) : null}
      <h2 className="text-3xl leading-tight font-semibold tracking-wide sm:text-4xl md:text-5xl">
        <span className="gold-text">{title}</span>
      </h2>
      <div className="gold-rule mx-auto mt-5 w-40" />
      {subtitle ? (
        <p className="mt-5 text-sm text-muted-foreground sm:text-base">{subtitle}</p>
      ) : null}
    </Reveal>
  );
}
