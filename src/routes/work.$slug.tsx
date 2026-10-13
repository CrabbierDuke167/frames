import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "motion/react";

import { ContactCTA } from "@/components/frames/ContactCTA";
import { MediaSlot } from "@/components/frames/MediaSlot";
import { Reveal } from "@/components/frames/Reveal";
import { projects } from "@/content/frames";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [
        { title: "Unavailable — Frames" },
        { name: "robots", content: "noindex" },
        { name: "description", content: "This Frames project is unavailable." },
        { property: "og:title", content: "Unavailable — Frames" },
        { property: "og:description", content: "This Frames project is unavailable." },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary" },
      ] };
    }
    const { project } = loaderData;
    return {
      meta: [
        { title: `${project.name} — Frames` },
        { name: "description", content: project.description ?? `${project.name} by Frames.` },
        { property: "og:title", content: `${project.name} — Frames` },
        {
          property: "og:description",
          content: project.description ?? `${project.name} by Frames.`,
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary" },
        ...(project.mediaType !== "video" && project.media?.startsWith("https://")
          ? [
              { property: "og:image", content: project.media },
              { name: "twitter:image", content: project.media },
            ]
          : []),
      ],
    };
  },
  component: ProjectPage,
});

function ProjectPage() {
  const { project } = Route.useLoaderData();

  return (
    <main>
      <motion.section
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="px-6 pt-32 sm:px-10 sm:pt-40"
      >
        <div className="mx-auto max-w-6xl">
          <div className="aspect-[16/9] overflow-hidden rounded-[2rem]">
            <MediaSlot
              src={project.media}
              type={project.mediaType}
              label={project.name}
              alt={project.name}
            />
          </div>
          <h1 className="display-lg mt-12">{project.name}</h1>
        </div>
      </motion.section>

      <section className="px-6 py-20 sm:px-10 sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-[1.6fr_1fr]">
          <Reveal>
            {project.description ? (
              <p className="body-lg max-w-2xl">{project.description}</p>
            ) : (
              <p className="text-sm text-muted-foreground italic">
                Project description to be added.
              </p>
            )}
          </Reveal>
          <Reveal delay={0.06}>
            <p className="eyebrow">Credits</p>
            {project.credits?.length ? (
              <ul className="mt-5 space-y-2 text-sm">
                {project.credits.map((c) => (
                  <li key={`${c.role}-${c.name}`} className="flex justify-between gap-6">
                    <span className="text-muted-foreground">{c.role}</span>
                    <span>{c.name}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-5 text-sm text-muted-foreground italic">Credits to be added.</p>
            )}
            <Link
              to="/work"
              className="mt-10 inline-block text-[0.78rem] font-medium tracking-[0.16em] text-muted-foreground uppercase transition-colors hover:text-foreground"
            >
              ← All work
            </Link>
          </Reveal>
        </div>
      </section>

      <ContactCTA />
    </main>
  );
}
