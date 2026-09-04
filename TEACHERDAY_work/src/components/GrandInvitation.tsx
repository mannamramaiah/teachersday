import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CalendarPlus, MapPin, X, Heart } from "lucide-react";
import { Reveal } from "@/components/Section";
import { Particles } from "@/components/Particles";
import { downloadIcs, EVENT_DATE_LABEL, EVENT_TIME_LABEL, ORG, VENUE, LOCATION } from "@/lib/event";
import { scrollToId } from "@/components/Navbar";

import invitationBg from "@/assets/image_2.jpeg";

export function GrandInvitation() {
  const [venueOpen, setVenueOpen] = useState(false);

  return (
    <section id="invitation" className="section-pad relative overflow-hidden">
      <Particles count={18} />

      {/* full-bleed invitation background image */}
      <img
        src={invitationBg}
        alt="Invitation background"
        className="absolute inset-0 h-full w-full object-cover opacity-95"
        aria-hidden="true"
      />

      {/* subtle overlay so card remains legible */}
      <div className="absolute inset-0 bg-navy-deep/70" aria-hidden="true" />

      <Reveal className="relative mx-auto max-w-3xl">
        <div className="glass rounded-[2rem] border border-gold/40 p-8 text-center sm:p-14 invitation-card-contents">
          <p className="text-[11px] tracking-[0.35em] text-gold uppercase">You are cordially invited</p>

          <h2 className="mt-5 font-display text-4xl font-semibold sm:text-6xl">
            <span className="gold-text">Teacher&rsquo;s Day Celebration 2026</span>
          </h2>

          <div className="gold-rule mx-auto mt-6 w-48" />

          <dl className="mt-8 space-y-3 text-base text-foreground/95">
            <div>
              <dt className="text-xs tracking-[0.25em] text-muted-foreground uppercase">Date</dt>
              <dd className="text-lg font-medium mt-1">{EVENT_DATE_LABEL}</dd>
            </div>
            <div>
              <dt className="text-xs tracking-[0.25em] text-muted-foreground uppercase">Time</dt>
              <dd className="text-lg font-medium mt-1">{EVENT_TIME_LABEL}</dd>
            </div>
            <div>
              <dt className="text-xs tracking-[0.25em] text-muted-foreground uppercase">Venue</dt>
              <dd className="text-lg font-medium mt-1">{VENUE}</dd>
            </div>
            <div>
              <dt className="text-xs tracking-[0.25em] text-muted-foreground uppercase">Location</dt>
              <dd className="pt-2 text-sm tracking-[0.22em] text-gold uppercase">{LOCATION}</dd>
            </div>
          </dl>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => downloadIcs()}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-[0.12em] text-primary-foreground uppercase"
              style={{ backgroundImage: "var(--gradient-gold)", boxShadow: "var(--shadow-gold)" }}
            >
              <CalendarPlus className="size-4" aria-hidden="true" /> Add to Calendar
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setVenueOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-gold/50 px-6 py-3 text-sm font-semibold tracking-[0.12em] text-gold uppercase hover:bg-gold/10 transition-colors"
            >
              <MapPin className="size-4" aria-hidden="true" /> Venue
            </motion.button>
          </div>
        </div>
      </Reveal>

      <AnimatePresence>
        {venueOpen ? (
          <motion.div
            className="fixed inset-0 z-60 grid place-items-center bg-navy-deep/80 p-5 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Venue details"
            onClick={() => setVenueOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass relative w-full max-w-md rounded-3xl border border-gold/30 p-8 text-center"
            >
              <button
                onClick={() => setVenueOpen(false)}
                aria-label="Close venue details"
                className="absolute top-4 right-4 rounded-md p-1 text-gold hover:bg-gold/10 transition-colors"
              >
                <X className="size-5" />
              </button>

              {/* Decorative Header */}
              <p className="text-xs tracking-[0.3em] text-gold uppercase font-semibold">📍 Venue & Location</p>

              <div className="gold-rule mx-auto my-4 w-12" />

              {/* Venue Icon */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="inline-block"
              >
                <MapPin className="mx-auto size-10 text-gold" aria-hidden="true" />
              </motion.div>

              {/* Venue Name */}
              <h3 className="mt-6 font-display text-2xl font-semibold text-foreground sm:text-3xl">
                {VENUE}
              </h3>

              {/* Organization */}
              <p className="mt-3 text-xs tracking-[0.22em] text-gold uppercase font-medium">{ORG}</p>

              {/* Location */}
              <p className="mt-4 text-sm text-foreground/85">
                {LOCATION}
              </p>

              {/* Description */}
              <p className="mt-6 text-sm text-muted-foreground leading-relaxed">
                Join us for a magnificent celebration of our mentors on <span className="text-gold font-medium">{EVENT_DATE_LABEL}</span> at <span className="text-gold font-medium">{EVENT_TIME_LABEL}</span>.
              </p>

              {/* Heart Animation */}
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mt-6 inline-block"
              >
                <Heart className="size-6 text-gold fill-gold" aria-hidden="true" />
              </motion.div>

              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setVenueOpen(false)}
                className="mt-8 w-full rounded-full px-6 py-2 text-xs font-semibold tracking-[0.15em] text-primary-foreground uppercase"
                style={{ backgroundImage: "var(--gradient-gold)" }}
              >
                Got It
              </motion.button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
