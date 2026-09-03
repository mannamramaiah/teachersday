import { motion, useReducedMotion } from "motion/react";
import { Sparkles, CalendarDays } from "lucide-react";
import campus from "@/assets/campus.jpeg";
import { Particles, LightRays } from "@/components/Particles";
import { scrollToId } from "@/components/Navbar";

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 pt-24 pb-16"
    >
      <motion.img
        src={campus}
        alt="Evening view of the campus of AM Reddy Group of Institutions"
        width={1920}
        height={1088}
        className="absolute inset-0 size-full object-cover"
        initial={{ scale: 1.12, opacity: 0 }}
        animate={{ scale: reduced ? 1.05 : 1, opacity: 1 }}
        transition={{ duration: 2.4, ease: "easeOut" }}
      />
      <div className="absolute inset-0 bg-navy-deep/80" aria-hidden="true" />
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{ background: "radial-gradient(circle at 50% 45%, transparent, var(--navy-deep) 78%)" }}
      />
      <LightRays />
      <Particles count={30} />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] tracking-[0.3em] text-gold uppercase"
        >
          <CalendarDays className="size-4" aria-hidden="true" />
          September 5 • 2026
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-4xl leading-[1.05] font-semibold tracking-wide sm:text-6xl md:text-7xl"
        >
          <span className="gold-text">TEACHER&rsquo;S DAY 2026</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-4 font-display text-xl tracking-[0.2em] text-foreground/90 sm:text-2xl"
        >
          A Tribute to Our Mentors
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="gold-rule mx-auto mt-8 w-56"
        />

        <motion.blockquote
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mx-auto mt-8 max-w-2xl font-display text-lg text-muted-foreground italic sm:text-xl"
        >
          &ldquo;Behind every successful student stands a teacher who believed in them.&rdquo;
        </motion.blockquote>

        <motion.button
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.7 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => scrollToId("appreciation")}
          className="mt-10 inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold tracking-[0.2em] text-primary-foreground uppercase"
          style={{ backgroundImage: "var(--gradient-gold)", boxShadow: "var(--shadow-gold)" }}
        >
          <Sparkles className="size-4" aria-hidden="true" />
          Enter the Celebration
        </motion.button>

        <p className="mt-10 text-[11px] tracking-[0.3em] text-foreground/70 uppercase">
          AM Reddy Group of Institutions
        </p>
      </div>
    </section>
  );
}
