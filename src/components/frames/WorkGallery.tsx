import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";

import { MediaSlot } from "./MediaSlot";
import type { Project } from "@/content/frames";

const EMPTY_SLOTS = 5;

export function WorkGallery({ projects }: { projects: Project[] }) {
  const isEmpty = projects.length === 0;

  return (
    <div className="no-scrollbar -mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 sm:-mx-10 sm:px-10">
      {isEmpty
        ? Array.from({ length: EMPTY_SLOTS }).map((_, i) => (
            <div
              key={i}
              className="w-[78vw] shrink-0 snap-start sm:w-[46vw] lg:w-[32vw] xl:w-[26vw]"
            >
              <div className="aspect-[4/5] overflow-hidden rounded-2xl transition-transform duration-700 hover:-translate-y-1">
                <MediaSlot label={`Project ${String(i + 1).padStart(2, "0")}`} />
              </div>
              <p className="mt-4 text-sm text-muted-foreground">Awaiting project</p>
            </div>
          ))
        : projects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
              className="w-[78vw] shrink-0 snap-start sm:w-[46vw] lg:w-[32vw] xl:w-[26vw]"
            >
              <Link
                to="/work/$slug"
                params={{ slug: project.slug }}
                className="group block"
                viewTransition
              >
                <div className="aspect-[4/5] overflow-hidden rounded-2xl shadow-[var(--shadow-float)]">
                  <MediaSlot
                    src={project.media}
                    type={project.mediaType}
                    label={project.name}
                    alt={project.name}
                    className="transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  />
                </div>
                <p className="mt-4 text-base tracking-[-0.02em]">{project.name}</p>
              </Link>
            </motion.div>
          ))}
    </div>
  );
}
