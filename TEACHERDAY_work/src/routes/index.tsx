import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Leadership } from "@/components/Leadership";
import { EventInfo } from "@/components/EventInfo";
import { Appreciation } from "@/components/Appreciation";
import { VenueCard } from "@/components/VenueCard";
import { Gallery } from "@/components/Gallery";
import { Countdown } from "@/components/Countdown";
import { GrandInvitation } from "@/components/GrandInvitation";
import { PersonalInvitation } from "@/components/PersonalInvitation";
import { FinalCTA, Footer } from "@/components/FinalCTA";

const TITLE = "Teacher's Day 2026 | AM Reddy Group of Institutions";
const DESC =
  "Teacher's Day Celebration 2026 at AM Reddy Group of Institutions — September 5, 2026, 1:30 PM IST, Seminar Hall. A tribute to our mentors.";

export const Route = createFileRoute("/")(
  {
    head: () => ({
      meta: [
        { title: TITLE },
        { name: "description", content: DESC },
        { property: "og:title", content: TITLE },
        { property: "og:description", content: DESC },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    }),
    component: Index,
  }
);

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Leadership />
        <EventInfo />
        <Countdown />
        <Appreciation />
        <VenueCard />
        <Gallery />
        <GrandInvitation />
        <PersonalInvitation />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
