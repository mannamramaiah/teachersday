import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { EVENT_DATE } from "@/lib/event";
import { Reveal, SectionHeading } from "@/components/Section";

function diff() {
  const ms = EVENT_DATE.getTime() - Date.now();
  if (ms <= 0) return null;
  return {
    Days: Math.floor(ms / 86400000),
    Hours: Math.floor((ms / 3600000) % 24),
    Minutes: Math.floor((ms / 60000) % 60),
    Seconds: Math.floor((ms / 1000) % 60),
  };
}

export function Countdown() {
  const [time, setTime] = useState<ReturnType<typeof diff>>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setTime(diff());
    setReady(true);
    const t = setInterval(() => setTime(diff()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="section-pad relative">
      <SectionHeading title="THE CELEBRATION BEGINS IN…" />

      <Reveal className="mx-auto max-w-4xl">
        {!ready ? (
          <div className="h-32" aria-hidden="true" />
        ) : time ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {Object.entries(time).map(([label, value]) => (
              <div key={label} className="glass rounded-3xl p-6 text-center">
                <motion.p
                  key={`${label}-${value}`}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="gold-text font-display text-4xl font-semibold tabular-nums sm:text-5xl"
                >
                  {String(value).padStart(2, "0")}
                </motion.p>
                <p className="mt-2 text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
                  {label}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="gold-text text-center font-display text-3xl font-semibold sm:text-4xl">
            🎉 THE CELEBRATION HAS BEGUN!
          </p>
        )}
      </Reveal>
    </section>
  );
}
