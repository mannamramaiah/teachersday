import { motion } from "motion/react";
import { Reveal, SectionHeading } from "@/components/Section";
import chairmanPhoto from "@/assets/image_2.jpeg";
import secretaryPhoto from "@/assets/imag1.jpeg";
import manasPhoto from "@/assets/manas.png";
import mallikarjunPhoto from "@/assets/mallikarjun.webp";
import krishnaReddyPhoto from "@/assets/krishna_reddy.jpeg";
import bhargavBhushanPhoto from "@/assets/bhargav_bhushan.jpeg";

const LEADERS = [
  { name: "Sri A. Srinivas Reddy", role: "Chairman of A M REDDY GROUP OF INSTITUTIONS", photo: chairmanPhoto },
  { name: "Dr Santhi Atluri", role: "Secretary of A M REDDY GROUP OF INSTITUTIONS", photo: secretaryPhoto },
  { name: "Mr. Atluri Manas Reddy", role: "Global Secretary, AMR Group", photo: manasPhoto },
  {
    name: "Dr. Ch. Mallikarjun",
    role: "B.Tech Principal",
    photo: mallikarjunPhoto,
  },
  { name: "Dr. K. Krishna Reddy", role: "Diploma Principal", photo: krishnaReddyPhoto },
  {
    name: "Dr. P. Bhargava Bhushan Rao",
    role: "Pharmacy Principal",
    photo: bhargavBhushanPhoto,
  },
];

function initials(name: string) {
  const clean = name.replace(/(Sri|Smt\.|Dr\.|M\.Tech\.,|Ph\.D\.)/g, "").trim();
  return clean
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

export function Leadership() {
  return (
    <section id="leadership" className="section-pad relative">
      <SectionHeading eyebrow="With Gratitude" title="OUR LEADERSHIP" />

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {LEADERS.map((l, i) => (
          <Reveal key={l.name} delay={i * 0.08}>
            <motion.article
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              className="glass group h-full rounded-3xl p-7 text-center transition-shadow hover:shadow-[var(--shadow-gold)]"
            >
              <div className="relative mx-auto grid size-24 place-items-center overflow-hidden rounded-full border border-gold/40 transition-transform duration-500 group-hover:scale-105">
                <span className="gold-ring" aria-hidden="true" />
                {l.photo ? (
                  <img
                    src={l.photo}
                    alt={l.name}
                    loading="lazy"
                    className="size-full object-cover"
                  />
                ) : (
                  <span
                    className="grid size-full place-items-center font-display text-2xl font-semibold text-primary-foreground"
                    style={{ backgroundImage: "var(--gradient-gold)" }}
                    aria-hidden="true"
                  >
                    {initials(l.name)}
                  </span>
                )}
              </div>
              <h3 className="mt-6 text-xl font-semibold text-foreground">{l.name}</h3>
              <div className="gold-rule mx-auto mt-3 w-16" />
              <p className="mt-2 text-sm text-gold/80">{l.role}</p>
            </motion.article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
