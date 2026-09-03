import { motion } from "motion/react";
import { Camera, BookOpen, Users, PartyPopper, Handshake, Trophy, Sparkles } from "lucide-react";
import campus from "@/assets/campus.jpeg";
import texture from "@/assets/texture.jpg";
import { Reveal, SectionHeading } from "@/components/Section";

const ITEMS = [
  { title: "Campus Memories", icon: Camera, image: campus },
  { title: "Classroom Moments", icon: BookOpen, image: null },
  { title: "Teacher-Student Interactions", icon: Users, image: null },
  { title: "College Events", icon: PartyPopper, image: texture },
  { title: "Mentoring Sessions", icon: Handshake, image: null },
  { title: "Student Achievements", icon: Trophy, image: null },
  { title: "Previous Teacher's Day Celebrations", icon: Sparkles, image: texture },
];

export function Gallery() {
  return (
    <section id="gallery" className="section-pad relative">
      <SectionHeading
        eyebrow="Memory Gallery"
        title="MEMORIES THAT INSPIRE"
        subtitle="Moments from our campus life that our teachers made possible."
      />

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ITEMS.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.06}>
            <motion.figure
              whileHover={{ y: -6 }}
              className="glass group relative h-64 overflow-hidden rounded-3xl"
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt={`${item.title} at AM Reddy Group of Institutions`}
                  loading="lazy"
                  className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              ) : (
                <div
                  className="absolute inset-0"
                  aria-hidden="true"
                  style={{ background: "var(--gradient-navy)" }}
                />
              )}
              <div className="absolute inset-0 bg-navy-deep/65 transition-colors duration-500 group-hover:bg-navy-deep/45" />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-center gap-3 p-6">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-gold/40 bg-card/60">
                  <item.icon className="size-5 text-gold" aria-hidden="true" />
                </span>
                <span className="font-display text-lg font-semibold text-foreground">
                  {item.title}
                </span>
              </figcaption>
            </motion.figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
