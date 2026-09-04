export const ORG = "A.M Reddy Group of Educational Institutions";
export const COLLEGE_NAME = "A.M. Reddy Memorial College of Pharmacy";
export const EVENT_TITLE = "Teacher's Day Celebration 2026";
export const EVENT_DATE_LABEL = "September 5, 2026";
export const EVENT_TIME_LABEL = "01:30 PM IST";
export const VENUE_PLACE = "Seminar Hall";
export const VENUE = "Seminar Hall, A.M. Reddy Memorial College of Pharmacy";
export const LOCATION = "Narasaraopet, Palnadu, AP";

/** Sept 5 2026, 13:30 IST => 08:00 UTC */
export const EVENT_DATE = new Date(Date.UTC(2026, 8, 5, 8, 0, 0));
const EVENT_END = new Date(Date.UTC(2026, 8, 5, 10, 0, 0));

function icsStamp(d: Date) {
  return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

export function buildIcs(personalizedFor?: string) {
  const summary = personalizedFor
    ? `${EVENT_TITLE} — Invitation for ${personalizedFor}`
    : EVENT_TITLE;
  const description = personalizedFor
    ? `Dear ${personalizedFor}, you are cordially invited to the ${EVENT_TITLE} at ${COLLEGE_NAME}.`
    : `You are cordially invited to the ${EVENT_TITLE} at ${COLLEGE_NAME}.`;

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//A.M Reddy Group of Educational Institutions//Teachers Day 2026//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:teachers-day-2026-${Date.now()}@amreddy`,
    `DTSTAMP:${icsStamp(new Date())}`,
    `DTSTART:${icsStamp(EVENT_DATE)}`,
    `DTEND:${icsStamp(EVENT_END)}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${VENUE}, ${ORG}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export function downloadFile(content: BlobPart, filename: string, type: string) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function downloadIcs(personalizedFor?: string) {
  downloadFile(
    buildIcs(personalizedFor),
    personalizedFor
      ? `teachers-day-2026-${personalizedFor.replace(/\s+/g, "-").toLowerCase()}.ics`
      : "teachers-day-2026.ics",
    "text/calendar;charset=utf-8",
  );
}
