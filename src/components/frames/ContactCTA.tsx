import { Link } from "@tanstack/react-router";

import { Reveal } from "./Reveal";
import { brand } from "@/content/frames";

export function ContactCTA() {
  return (
    <section className="overflow-hidden px-6 py-32 sm:px-10 sm:py-48">
      <Reveal className="mx-auto max-w-5xl text-center">
        <p className="eyebrow">{brand.tagline}</p>
        <h2 className="display-xl text-sheen mt-8 pb-2">Contact Frames</h2>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/contact"
            className="rounded-full bg-foreground px-8 py-4 text-sm font-medium text-background transition-opacity hover:opacity-85"
          >
            Start a project
          </Link>
          <a
            href={`mailto:${brand.email}`}
            className="glass specular rounded-full px-8 py-4 text-sm font-medium transition-opacity hover:opacity-85"
          >
            {brand.email}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
