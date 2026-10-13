import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";

import { ContactCTA } from "@/components/frames/ContactCTA";
import { ContactForm } from "@/components/frames/ContactForm";
import { Intro } from "@/components/frames/Intro";
import { Reveal } from "@/components/frames/Reveal";
import { ServiceSection } from "@/components/frames/ServiceSection";
import { WorkGallery } from "@/components/frames/WorkGallery";
import { brand, projects, services } from "@/content/frames";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Frames — your vision, our craft." },
      {
        name: "description",
        content:
          "Frames is a creative media company working across social media, advertising video and studio photo and video production.",
      },
      { property: "og:title", content: "Frames — your vision, our craft." },
      { property: "og:type", content: "website" },
      {
        property: "og:description",
        content:
          "Social media, advertising video and studio photo and video work by Frames.",
      },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

function Index() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      <Intro onDone={() => setIntroDone(true)} />

      <main>
        <section className="relative flex min-h-[100svh] w-full max-w-full items-center overflow-hidden px-5 pt-28 sm:px-10 sm:pt-32">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={introDone ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto min-w-0 w-full max-w-6xl text-center"
          >
            <p className="eyebrow">Social media · Advertising · Studio</p>
            <h1 className="text-sheen mt-6 max-w-full pb-4 font-display text-[clamp(3.75rem,min(17vw,24vh),15rem)] leading-[0.9] font-medium">
              {brand.name}
            </h1>
            <p className="body-lg mt-4">{brand.tagline}</p>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/contact"
                className="rounded-full bg-foreground px-8 py-4 text-sm font-medium text-background transition-opacity hover:opacity-85"
              >
                Contact Frames
              </Link>
              <Link
                to="/about"
                hash="founders"
                className="glass specular rounded-full px-8 py-4 text-sm font-medium transition-transform duration-500 hover:-translate-y-0.5"
              >
                Meet the People Behind Frames
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
              {services.map((s) => (
                <Link
                  key={s.id}
                  to={s.path}
                  className="text-[0.7rem] font-medium tracking-[0.18em] text-muted-foreground uppercase transition-colors hover:text-foreground"
                >
                  {s.name}
                </Link>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={introDone ? { opacity: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="pointer-events-none absolute inset-x-0 bottom-10 flex justify-center"
          >
            <span className="h-12 w-px animate-pulse bg-gradient-to-b from-foreground/40 to-transparent" />
          </motion.div>
        </section>

        <section className="px-6 py-28 sm:px-10 sm:py-40">
          <Reveal className="mx-auto max-w-6xl">
            <p className="eyebrow">About Frames</p>
            {brand.about ? (
              <p className="display-md text-sheen mt-8 max-w-4xl">{brand.about}</p>
            ) : (
              <p className="mt-8 max-w-2xl text-base text-muted-foreground italic">
                Frames is a creative media studio specializing in cinematic video production, advertising, social media management, and event coverage. We bring ideas to life through compelling visual storytelling, creative strategy, and professional production.
              </p>
            )}
          </Reveal>
        </section>

        <section id="work" className="py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-6 sm:px-10">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <h2 className="display-lg">Work</h2>
                <Link
                  to="/work"
                  className="text-[0.78rem] font-medium tracking-[0.16em] text-muted-foreground uppercase transition-colors hover:text-foreground"
                >
                  All work →
                </Link>
              </div>
            </Reveal>
          </div>
          <div className="mx-auto mt-12 max-w-6xl px-6 sm:px-10">
            <WorkGallery projects={projects} />
          </div>
        </section>

        {services.map((service, i) => (
          <ServiceSection key={service.id} service={service} index={i} />
        ))}

        <section id="contact" className="px-6 py-28 sm:px-10 sm:py-40">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <p className="eyebrow">Contact</p>
              <h2 className="display-lg mt-5">Contact Frames</h2>
            </Reveal>
            <Reveal delay={0.08} className="mt-12">
              <ContactForm />
            </Reveal>
          </div>
        </section>

        <ContactCTA />
      </main>
    </>
  );
}
