import { motion } from "motion/react";
import { Camera, BookOpen, Users, PartyPopper, Handshake, Trophy, Sparkles } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/Section";

const ITEMS = [
  {
    title: "College Events at AM Reddy Group of Institutions",
  },
  { title: "College Events" },
  { title: "Mentoring Sessions" },
  { title: "Student Achievements" },
  { title: "Previous Teacher's Day Celebrations at AM Reddy Group of Institutions" },
  { title: "Last Class" },
];

export function Gallery() {
  return (
    <section id="gallery" className="section-pad relative">
      <SectionHeading
        eyebrow="Memory Gallery"
        title="MEMORIES THAT INSPIRE"
        subtitle="Moments from our campus life that our teachers made possible."
      />

      <div className="mx-auto max-w-4xl">
        <motion.ul
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          {ITEMS.map((item, i) => (
            <li key={item.title} className="glass group flex items-start gap-4 rounded-2xl p-4">
              <span className="grid size-12 place-items-center rounded-full border border-gold/40 bg-card/60 text-gold">
                {/* choose an icon by index for variety */}
                {i % 6 === 0 ? <Camera className="size-5" /> : null}
                {i % 6 === 1 ? <PartyPopper className="size-5" /> : null}
                {i % 6 === 2 ? <Handshake className="size-5" /> : null}
                {i % 6 === 3 ? <Trophy className="size-5" /> : null}
                {i % 6 === 4 ? <Sparkles className="size-5" /> : null}
                {i % 6 === 5 ? <BookOpen className="size-5" /> : null}
              </span>

              <div>
                <h4 className="text-lg font-semibold text-foreground">{item.title}</h4>
              </div>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
