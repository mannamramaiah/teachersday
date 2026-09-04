import { motion } from "motion/react";
import { MapPin, Heart } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/Section";
import { ORG, VENUE, LOCATION } from "@/lib/event";

export function VenueCard() {
  return (
    <section id="venue" className="section-pad relative">
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass rounded-3xl border border-gold/30 p-8 sm:p-12"
        >
          {/* Header */}
          <div className="text-center">
            <p className="text-xs tracking-[0.3em] text-gold uppercase font-semibold">
              📍 VENUE & LOCATION
            </p>
          </div>

          {/* Golden Divider */}
          <div className="gold-rule mx-auto my-6 w-16" />

          {/* Venue Details */}
          <div className="space-y-6">
            {/* Venue Name */}
            <motion.div
              whileHover={{ x: 5 }}
              className="flex items-start gap-4"
            >
              <MapPin className="size-6 shrink-0 text-gold mt-1" aria-hidden="true" />
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground sm:text-xl">
                  {VENUE}
                </h3>
                <p className="mt-2 text-sm text-foreground/75">
                  {ORG}
                </p>
              </div>
            </motion.div>

            {/* Location */}
            <motion.div
              whileHover={{ x: 5 }}
              className="flex items-start gap-4"
            >
              <div className="size-6 shrink-0 rounded-full bg-gold/20 flex items-center justify-center mt-1">
                <span className="text-xs font-bold text-gold">📍</span>
              </div>
              <div>
                <h4 className="font-display text-sm font-semibold text-gold uppercase tracking-[0.1em]">
                  Location
                </h4>
                <p className="mt-2 text-sm text-foreground/85">
                  {LOCATION}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Decorative Heart */}
          <div className="mt-8 flex justify-center">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex items-center justify-center"
            >
              <Heart className="size-6 text-gold fill-gold" aria-hidden="true" />
            </motion.div>
          </div>

          {/* Bottom Message */}
          <p className="mt-6 text-center text-xs text-foreground/70 italic">
            Join us to celebrate the mentors who inspire and guide us.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
