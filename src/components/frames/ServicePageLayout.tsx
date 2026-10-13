import { motion } from "motion/react";

import { ContactCTA } from "./ContactCTA";
import { MediaSlot } from "./MediaSlot";
import { Reveal } from "./Reveal";
import { ReelCards } from "./ReelCards";
import { WorkGallery } from "./WorkGallery";
import { projectsFor, type Service } from "@/content/frames";

/** Each service gets a subtly different hero motion inside one language. */
const heroMotion = {
  smm: { initial: { opacity: 0, y: 36 }, animate: { opacity: 1, y: 0 } },
  advertising: { initial: { opacity: 0, scale: 1.03 }, animate: { opacity: 1, scale: 1 } },
  studio: { initial: { opacity: 0, filter: "blur(14px)" }, animate: { opacity: 1, filter: "blur(0px)" } },
} as const;

export function ServicePageLayout({ service }: { service: Service }) {
  const work = projectsFor(service.id);
  const m = heroMotion[service.id];

  return (
    <div>
      <section className="bloom overflow-hidden px-6 pt-40 pb-20 sm:px-10 sm:pt-56 sm:pb-28">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={m.initial}
            animate={m.animate}
            transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="eyebrow">{service.kind}</p>
            <h1 className="display-xl text-sheen mt-6 pb-8">{service.name}</h1>
            {service.description ? (
              <p className="body-lg text-base mt-10 max-w-2xl">{service.description}</p>
            ) : (
              <p className="mt-10 max-w-2xl text-sm text-muted-foreground italic">
                Service description to be added.
              </p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-16 aspect-[16/9] overflow-hidden rounded-[2rem]"
          >
            <MediaSlot
              src={work[0]?.media}
              type={work[0]?.mediaType}
              label={`${service.name} hero visual`}
            />
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-10 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="eyebrow">Selected work</p>
          </Reveal>
          <div className="mt-10">
            <ReelCards service={service.id} />
          </div>
          <div className="mt-10">
            <WorkGallery projects={work} />
          </div>
        </div>
      </section>

      <ContactCTA />
    </div>
  );
}
