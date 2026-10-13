import { createFileRoute } from "@tanstack/react-router";

import { ContactCTA } from "@/components/frames/ContactCTA";
import { Reveal } from "@/components/frames/Reveal";
import { WorkGallery } from "@/components/frames/WorkGallery";
import { projects } from "@/content/frames";

export const Route = createFileRoute("/work/")({
  head: () => ({
    meta: [
      { title: "Work — Frames" },
      { name: "description", content: "Selected photo, video and social media work by Frames." },
      { property: "og:title", content: "Work — Frames" },
      {
        property: "og:description",
        content: "Selected photo, video and social media work by Frames.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: WorkPage,
});

function WorkPage() {
  return (
    <main>
      <section className="px-6 pt-40 pb-16 sm:px-10 sm:pt-56">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="eyebrow">Portfolio</p>
            <h1 className="display-xl mt-6">Work</h1>
          </Reveal>
        </div>
      </section>
      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-6 sm:px-10">
          <WorkGallery projects={projects} />
        </div>
      </section>
      <ContactCTA />
    </main>
  );
}
