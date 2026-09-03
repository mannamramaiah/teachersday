import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CalendarPlus, MapPin, X } from "lucide-react";
import { Reveal } from "@/components/Section";
import { Particles } from "@/components/Particles";
import { downloadIcs, EVENT_DATE_LABEL, EVENT_TIME_LABEL, ORG, VENUE, LOCATION } from "@/lib/event";

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
              <dt className="sr-only">Date</dt>
              <dd className="text-lg font-medium">{EVENT_DATE_LABEL}</dd>
            </div>
            <div>
              <dt className="sr-only">Time</dt>
              <dd className="text-lg font-medium">{EVENT_TIME_LABEL}</dd>
            </div>
            <div>
              <dt className="sr-only">Venue</dt>
              <dd className="text-lg font-medium">{VENUE} at {EVENT_TIME_LABEL}</dd>
            </div>
            <div>
              <dt className="sr-only">Location</dt>
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
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                `${VENUE}, ${LOCATION}`,
              )}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-gold/50 px-6 py-3 text-sm font-semibold tracking-[0.12em] text-gold uppercase"
            >
              <MapPin className="size-4" aria-hidden="true" /> Open in Maps
            </motion.a>
          </div>
        </div>
      </Reveal>

      <AnimatePresence>
        {venueOpen ? (
          <motion.div
            className="fixed inset-0 z-60 grid place-items-center bg-navy-deep/80 p-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Venue details"
            onClick={() => setVenueOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass relative w-full max-w-md rounded-3xl p-8 text-center"
            >
              <button
                onClick={() => setVenueOpen(false)}
                aria-label="Close venue details"
                className="absolute top-4 right-4 rounded-md p-1 text-gold"
              >
                <X className="size-5" />
              </button>
              <MapPin className="mx-auto size-8 text-gold" aria-hidden="true" />
              <h3 className="mt-4 font-display text-2xl font-semibold text-foreground">{VENUE}</h3>
              <p className="mt-2 text-xs tracking-[0.22em] text-gold uppercase">{ORG}</p>
              <p className="mt-5 text-sm text-muted-foreground">
                The celebration will be held in the {VENUE} on campus on {EVENT_DATE_LABEL} at {EVENT_TIME_LABEL}. Please reach the venue 15 minutes early. For directions inside campus, kindly contact the SAC Invitation Team.
              </p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
