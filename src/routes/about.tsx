import { createFileRoute } from "@tanstack/react-router";

import { ContactCTA } from "@/components/frames/ContactCTA";
import { TeamSection } from "@/components/frames/TeamSection";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Frames" },
      { name: "description", content: "About Frames and the team behind the work." },
      { property: "og:title", content: "About — Frames" },
      { property: "og:description", content: "About Frames and the team behind the work." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="pt-24">
      <TeamSection />
      <ContactCTA />
    </main>
  );
}
