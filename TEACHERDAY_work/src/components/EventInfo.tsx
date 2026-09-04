import { motion } from "motion/react";
import { CalendarDays, Clock, MapPin, Landmark, Lightbulb, Compass, Rocket } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/Section";
import { EVENT_DATE_LABEL, EVENT_TIME_LABEL, ORG, VENUE } from "@/lib/event";

const DETAILS = [
  { icon: CalendarDays, label: "Date", value: EVENT_DATE_LABEL },
  { icon: Clock, label: "Time", value: EVENT_TIME_LABEL },
  { icon: MapPin, label: "Location", value: VENUE },
  { icon: Landmark, label: "Hosted By", value: ORG },
];

const REASONS = [
  {
    icon: Lightbulb,
    title: "INSPIRE",
    text: "Teachers inspire students to dream bigger and believe in themselves.",
  },
  {
    icon: Compass,
    title: "GUIDE",
    text: "Teachers guide students through challenges and help them find the right path.",
  },
  {
    icon: Rocket,
    title: "EMPOWER",
    text: "Teachers empower students with knowledge, confidence and courage to build their future.",
  },
];

export function EventInfo() {
  return (
    <section id="event" className="section-pad relative">
      <SectionHeading
        eyebrow="Save the Date"
        title="HAPPY TEACHER'S DAY 2026"
        subtitle="Join us as we honour the mentors who shape every journey on our campus."
      />

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {DETAILS.map((d, i) => (
          <Reveal key={d.label} delay={i * 0.08}>
            <motion.div
              whileHover={{ y: -5 }}
              className="glass h-full rounded-2xl p-6 text-center"
            >
              <d.icon className="mx-auto size-7 text-gold" aria-hidden="true" />
              <p className="mt-4 text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
                {d.label}
              </p>
              <p className="mt-2 text-sm font-medium text-foreground">{d.value}</p>
            </motion.div>
          </Reveal>
        ))}
      </div>

      <div className="mt-24">
        <SectionHeading title="WHY WE CELEBRATE" />
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
          {REASONS.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.1}>
              <motion.article
                whileHover={{ y: -6 }}
                className="glass h-full rounded-3xl p-8 text-center transition-shadow hover:shadow-[var(--shadow-gold)]"
              >
                <span
                  className="mx-auto grid size-14 place-items-center rounded-2xl"
                  style={{ backgroundImage: "var(--gradient-gold)" }}
                >
                  <r.icon className="size-7 text-primary-foreground" aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-2xl font-semibold tracking-[0.15em] text-gold">
                  {r.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{r.text}</p>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
