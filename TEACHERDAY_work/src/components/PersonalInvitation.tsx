import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Sparkles, Share2, Download, CalendarPlus, Check } from "lucide-react";
import campus from "@/assets/campus.jpeg";
import { Reveal, SectionHeading } from "@/components/Section";
import { Particles } from "@/components/Particles";
import {
  downloadIcs,
  EVENT_DATE_LABEL,
  EVENT_TIME_LABEL,
  ORG,
  VENUE,
} from "@/lib/event";

const GREETINGS = [
  "Your dedication, guidance and encouragement have shaped countless dreams and inspired students to become better versions of themselves.",
  "Your wisdom has guided us, your kindness has encouraged us, and your dedication has inspired us to dream bigger and achieve more.",
  "Your guidance has been a guiding light in our journey, shaping our thoughts, strengthening our confidence, and inspiring us to reach our highest potential.",
  "Behind every confident student is a teacher who believed, encouraged, and inspired. Your support has touched many lives and created memories that will always be cherished.",
  "You have not only taught lessons from books, but also lessons for life. Your encouragement continues to inspire us to learn, grow, and become the best version of ourselves.",
  "With immense respect and gratitude, we acknowledge the invaluable role you have played in guiding and inspiring generations of students.",
  "Your guidance shapes minds, your encouragement builds confidence, and your dedication inspires futures.",
  "You planted the seeds of knowledge, nurtured them with patience, and helped them grow into dreams of tomorrow.",
  "Every achievement carries the imprint of a teacher who guided us along the way. Your encouragement, patience, and valuable guidance have helped students discover their potential and pursue their dreams.",
  "A teacher's influence reaches far beyond the classroom—it shapes character, inspires dreams, and builds the future. Your dedication and guidance have touched countless lives.",
];

function getRandomGreeting(): string {
  return GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
}

function drawInvitation(name: string, greeting: string): Promise<Blob | null> {
  const W = 1080;
  const H = 1350;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return Promise.resolve(null);

  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, "#0a1024");
  bg.addColorStop(0.5, "#131c3a");
  bg.addColorStop(1, "#0a1024");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = "#d8b45c";
  ctx.lineWidth = 4;
  ctx.strokeRect(48, 48, W - 96, H - 96);
  ctx.lineWidth = 1;
  ctx.strokeRect(70, 70, W - 140, H - 140);

  // gold corners
  ctx.lineWidth = 6;
  const c = 70;
  const corners: [number, number, number, number][] = [
    [70, 70, 1, 1],
    [W - 70, 70, -1, 1],
    [70, H - 70, 1, -1],
    [W - 70, H - 70, -1, -1],
  ];
  for (const [x, y, dx, dy] of corners) {
    ctx.beginPath();
    ctx.moveTo(x + dx * c, y);
    ctx.lineTo(x, y);
    ctx.lineTo(x, y + dy * c);
    ctx.stroke();
  }

  const center = (text: string, y: number, font: string, color: string) => {
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.fillText(text, W / 2, y);
  };

  const wrap = (text: string, y: number, font: string, color: string, max: number, lh: number) => {
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    const words = text.split(" ");
    let line = "";
    let yy = y;
    for (const w of words) {
      const test = line ? `${line} ${w}` : w;
      if (ctx.measureText(test).width > max && line) {
        ctx.fillText(line, W / 2, yy);
        line = w;
        yy += lh;
      } else line = test;
    }
    ctx.fillText(line, W / 2, yy);
    return yy;
  };

  center("WITH GREAT RESPECT AND GRATITUDE", 200, "28px Georgia", "#d8b45c");
  center("YOU ARE CORDIALLY INVITED", 265, "bold 40px Georgia", "#ffffff");
  center("TEACHER'S DAY CELEBRATION 2026", 335, "bold 46px Georgia", "#e8c877");
  wrap(
    "Celebrating the mentors who inspire, guide and shape our future.",
    400,
    "26px Georgia",
    "#c9cee0",
    760,
    38,
  );

  ctx.strokeStyle = "#d8b45c";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(340, 460);
  ctx.lineTo(740, 460);
  ctx.stroke();

  center(`Dear ${name},`, 540, "italic 42px Georgia", "#ffffff");
  const end = wrap(greeting, 610, "28px Georgia", "#d8dbe8", 780, 44);

  center("September 5, 2026", end + 100, "bold 34px Georgia", "#e8c877");
  center("1:30 PM IST", end + 150, "32px Georgia", "#ffffff");
  center(VENUE, end + 200, "32px Georgia", "#ffffff");
  center(ORG, end + 255, "bold 30px Georgia", "#e8c877");

  wrap(
    "Your presence will make this celebration truly special.",
    end + 340,
    "italic 28px Georgia",
    "#c9cee0",
    760,
    38,
  );

  return new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
}

export function PersonalInvitation() {
  const [input, setInput] = useState("");
  const [name, setName] = useState("");
  const [greeting, setGreeting] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  const generate = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) {
      setError("Please enter the teacher's name.");
      return;
    }
    setError("");
    const randomGreeting = getRandomGreeting();
    setName(input.trim());
    setGreeting(randomGreeting);
    setStatus("✨ INVITATION READY");
  };

  const share = async () => {
    const text = `WITH GREAT RESPECT AND GRATITUDE\n\nDear ${name},\nYou are cordially invited to the Teacher's Day Celebration 2026.\n${EVENT_DATE_LABEL} • ${EVENT_TIME_LABEL}\n${VENUE}, ${ORG}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "Teacher's Day Celebration 2026", text });
        setStatus("Invitation shared 💌");
      } else {
        await navigator.clipboard.writeText(text);
        setStatus("Invitation copied to clipboard 💌");
      }
    } catch {
      setStatus("Sharing was cancelled.");
    }
  };

  const download = async () => {
    const blob = await drawInvitation(name, greeting);
    if (!blob) {
      setStatus("Download is not supported on this device.");
      return;
    }
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `teachers-day-2026-invitation-${name.replace(/\s+/g, "-").toLowerCase()}.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    setStatus("Invitation downloaded 📥");
  };

  return (
    <section id="my-invitation" className="section-pad relative overflow-hidden">
      <SectionHeading
        eyebrow="Personalized Invitation"
        title="A SPECIAL INVITATION FOR A SPECIAL MENTOR"
        subtitle="Enter a teacher's name to create an elegant invitation you can share or download."
      />

      <Reveal className="mx-auto max-w-2xl">
        <form onSubmit={generate} className="glass rounded-3xl p-6 sm:p-8" noValidate>
          <label htmlFor="teacher-name" className="text-xs tracking-[0.25em] text-gold uppercase">
            Teacher&rsquo;s Name
          </label>
          <input
            id="teacher-name"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter Teacher's Name"
            className="mt-2 w-full rounded-xl border border-input bg-secondary/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground"
          />
          {error ? (
            <p role="alert" className="mt-3 text-sm text-destructive">
              {error}
            </p>
          ) : null}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-xs font-semibold tracking-[0.2em] text-primary-foreground uppercase"
            style={{ backgroundImage: "var(--gradient-gold)", boxShadow: "var(--shadow-gold)" }}
          >
            <Sparkles className="size-4" aria-hidden="true" /> Generate Invitation ✨
          </motion.button>
        </form>
      </Reveal>

      <AnimatePresence>
        {name ? (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-12 max-w-2xl"
          >
            <div className="relative overflow-hidden rounded-[2rem] border-2 border-gold/60 p-1">
              <img
                src={campus}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="absolute inset-0 size-full object-cover opacity-25"
              />
              <div className="absolute inset-0 bg-navy-deep/80" aria-hidden="true" />
              <Particles count={14} />
              <div className="relative rounded-[1.8rem] border border-gold/30 px-6 py-12 text-center sm:px-12">
                <p className="text-[10px] tracking-[0.3em] text-gold uppercase">
                  With Great Respect and Gratitude
                </p>
                <h3 className="mt-4 font-display text-2xl font-semibold text-foreground sm:text-3xl">
                  YOU ARE CORDIALLY INVITED
                </h3>
                <p className="gold-text mt-3 font-display text-xl font-semibold sm:text-2xl">
                  TEACHER&rsquo;S DAY CELEBRATION 2026
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  Celebrating the mentors who inspire, guide and shape our future.
                </p>
                <div className="gold-rule mx-auto my-8 w-40" />
                <p className="font-display text-xl text-foreground italic sm:text-2xl">
                  Dear {name},
                </p>
                <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-foreground/85">
                  {greeting}
                </p>
                <div className="mt-8 space-y-1 text-sm text-foreground/90">
                  <p>{EVENT_DATE_LABEL}</p>
                  <p>{EVENT_TIME_LABEL}</p>
                  <p>{VENUE}</p>
                  <p className="pt-2 text-xs tracking-[0.22em] text-gold uppercase">{ORG}</p>
                </div>
                <p className="mt-8 text-sm text-muted-foreground italic">
                  Your presence will make this celebration truly special.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button
                onClick={share}
                className="inline-flex items-center gap-2 rounded-full border border-gold/50 px-5 py-3 text-xs font-semibold tracking-[0.18em] text-gold uppercase transition-colors hover:bg-accent"
              >
                <Share2 className="size-4" aria-hidden="true" /> 💌 Share Invitation
              </button>
              <button
                onClick={download}
                className="inline-flex items-center gap-2 rounded-full border border-gold/50 px-5 py-3 text-xs font-semibold tracking-[0.18em] text-gold uppercase transition-colors hover:bg-accent"
              >
                <Download className="size-4" aria-hidden="true" /> 📥 Download Invitation
              </button>
              <button
                onClick={() => {
                  downloadIcs(name);
                  setStatus("Calendar event downloaded 📅");
                }}
                className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-xs font-semibold tracking-[0.18em] text-primary-foreground uppercase"
                style={{ backgroundImage: "var(--gradient-gold)" }}
              >
                <CalendarPlus className="size-4" aria-hidden="true" /> 📅 Add to Calendar
              </button>
            </div>

            {status ? (
              <p
                role="status"
                className="mt-6 flex items-center justify-center gap-2 text-sm tracking-[0.2em] text-gold uppercase"
              >
                <Check className="size-4" aria-hidden="true" />
                {status}
              </p>
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
