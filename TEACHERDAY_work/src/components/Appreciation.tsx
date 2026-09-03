import { motion } from "motion/react";
import { Quote, Heart } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/Section";

const CARDS = [
  {
    name: "Our Engineering Faculty",
    dept: "B.Tech Departments",
    message:
      "Thank you for turning complex ideas into clear understanding and for building confidence in every classroom.",
  },
  {
    name: "Our Diploma Faculty",
    dept: "Polytechnic Departments",
    message:
      "Your patience and practical guidance help students learn by doing and grow with every attempt.",
  },
  {
    name: "Our Pharmacy Faculty",
    dept: "Pharmacy Departments",
    message:
      "Thank you for teaching precision, care and responsibility along with the syllabus.",
  },
  {
    name: "Our Science & Humanities Faculty",
    dept: "Foundation Departments",
    message:
      "You lay the foundation on which every future achievement of ours is built.",
  },
  {
    name: "Our Lab Mentors",
    dept: "Laboratories & Workshops",
    message:
      "Thank you for the extra hours, the patient corrections and the encouragement to try again.",
  },
  {
    name: "Our Physical Education & Arts Mentors",
    dept: "Sports & Cultural",
    message:
      "You teach teamwork, discipline and joy — lessons that stay with us far beyond campus.",
  },
];

export function Appreciation() {
  return (
    <section id="appreciation" className="section-pad relative">
      <SectionHeading
        eyebrow="Teacher Appreciation"
        title="CELEBRATING OUR MENTORS"
        subtitle="A few words of gratitude from the students of AM Reddy Group of Institutions."
      />

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((c, i) => (
          <Reveal key={c.name} delay={i * 0.07}>
            <motion.article
              whileHover={{ y: -6 }}
              className="glass relative h-full overflow-hidden rounded-3xl p-7 transition-shadow hover:shadow-[var(--shadow-gold)]"
            >
              <Quote className="size-8 text-gold/60" aria-hidden="true" />
              <p className="mt-4 text-sm leading-relaxed text-foreground/85">{c.message}</p>
              <div className="gold-rule mt-6 w-full" />
              <h3 className="mt-5 text-lg font-semibold text-foreground">{c.name}</h3>
              <p className="mt-1 text-[11px] tracking-[0.22em] text-gold uppercase">{c.dept}</p>
              <Heart
                className="absolute top-6 right-6 size-5 text-gold/40"
                aria-hidden="true"
              />
            </motion.article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
