import { Link } from "@tanstack/react-router";

import { MediaSlot } from "./MediaSlot";
import { Reveal } from "./Reveal";
import { ReelCards } from "./ReelCards";
import { projectsFor, type Service } from "@/content/frames";

export function ServiceSection({ service, index }: { service: Service; index: number }) {
  const work = projectsFor(service.id);
  const alt = index % 2 === 1;

  return (
    <section id={service.id} className="px-6 py-28 sm:px-10 sm:py-40">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="eyebrow">{service.kind}</p>
          <h2 className="display-xl text-sheen mt-5 max-w-4xl pb-2">{service.name}</h2>
          {service.description ? (
            <p className="body-lg mt-8 max-w-2xl">{service.description}</p>
          ) : (
            <p className="mt-8 max-w-2xl text-sm text-muted-foreground italic">
              Service description to be added.
            </p>
          )}
          <Link
            to={service.path}
            className="glass specular mt-10 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-transform duration-500 hover:-translate-y-0.5"
          >
            Open {service.name}
            <span aria-hidden>→</span>
          </Link>
        </Reveal>

        <Reveal delay={0.08} className="mt-16">
          <div
            className={`grid gap-4 ${alt ? "md:grid-cols-[1fr_1.4fr]" : "md:grid-cols-[1.4fr_1fr]"}`}
          >
            <div className="aspect-[16/10] overflow-hidden rounded-3xl shadow-[var(--shadow-float)] md:row-span-2 md:aspect-auto">
              <MediaSlot
                src={work[0]?.media}
                type={work[0]?.mediaType}
                label={`${service.name} visual`}
              />
            </div>
            <div className="grid gap-4">
              <div className="aspect-[4/3] overflow-hidden rounded-3xl">
                <MediaSlot src={work[1]?.media} type={work[1]?.mediaType} label="Visual" />
              </div>
              <div className="aspect-[4/3] overflow-hidden rounded-3xl">
                <MediaSlot src={work[2]?.media} type={work[2]?.mediaType} label="Visual" />
              </div>
            </div>
          </div>
        </Reveal>

        {service.id === "advertising" ? (
          <div className="mt-16">
            <ReelCards service="advertising" />
          </div>
        ) : null}
      </div>
    </section>
  );
}
