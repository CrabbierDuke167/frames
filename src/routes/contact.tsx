import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { BriefAssistant } from "@/components/frames/BriefAssistant";
import { ContactForm } from "@/components/frames/ContactForm";
import { Reveal } from "@/components/frames/Reveal";
import { brand } from "@/content/frames";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Frames" },
      { name: "description", content: "Start a project with Frames." },
      { property: "og:title", content: "Contact Frames" },
      { property: "og:description", content: "Start a project with Frames." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [prefill, setPrefill] = useState<{ service: string; message: string; n: number }>();
  return (
    <main className="px-6 pt-40 pb-28 sm:px-10 sm:pt-56">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h1 className="display-xl mt-6">Contact Frames</h1>
          <p className="body-lg mt-8">{brand.tagline}</p>
        </Reveal>
        <Reveal delay={0.08} className="mt-14">
          <BriefAssistant
            onUse={(service, message) => {
              setPrefill((p) => ({ service, message, n: (p?.n ?? 0) + 1 }));
              setTimeout(() => document.getElementById("enquiry")?.scrollIntoView({ behavior: "smooth" }), 50);
            }}
          />
        </Reveal>
        <Reveal delay={0.12} className="mt-10">
          <div id="enquiry">
            <ContactForm key={prefill?.n ?? 0} prefill={prefill} />
          </div>
        </Reveal>
      </div>
    </main>
  );
}
