import { useState } from "react";
import { Reveal } from "./Reveal";
import { brand, founders, team, type TeamMember } from "@/content/frames";
import { cn } from "@/lib/utils";

// Local images
import amalPhoto from "@/assets/amal.png";
import luqmanPhoto from "@/assets/luqman.png";
import manasaPhoto from "@/assets/manasa.png";
import zakiPhoto from "@/assets/zaki.png";
import noyalPhoto from "@/assets/noyal.png";
import sreehariPhoto from "@/assets/sreehari.png";
import diyonPhoto from "@/assets/diyon.png";
import alwinPhoto from "@/assets/alwin.png";
import emptyPhoto from "@/assets/empty.png";

// Fallback if a photo fails to load
const fallbackPhoto = emptyPhoto;

// Images in card display order
const founderPhotos = [
  zakiPhoto,
  amalPhoto,
  manasaPhoto,
  luqmanPhoto,
  noyalPhoto,
];

const teamPhotos = [
  alwinPhoto,
  sreehariPhoto,
  diyonPhoto,
  // Add more team photos here in display order
];

function CirclePhoto({
  member,
  size,
  photo,
}: {
  member: TeamMember;
  size: "lg" | "md";
  photo?: string | undefined;
}) {
  const [imageSrc, setImageSrc] = useState(
    photo || member.photo || fallbackPhoto,
  );

  return (
    <div
      className={cn(
        "glass specular group/circle relative mx-auto aspect-square w-full rounded-full p-[9%] transition-all duration-700 ease-frames",
        "hover:-translate-y-1 hover:shadow-[var(--shadow-float)] motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        size === "lg" ? "max-w-[15rem]" : "max-w-[11rem]",
      )}
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-full border border-hairline bg-[radial-gradient(120%_90%_at_30%_15%,var(--bloom-1),transparent_65%),radial-gradient(100%_90%_at_85%_100%,var(--bloom-2),transparent_65%)] bg-secondary/60">
        <img
          src={imageSrc}
          alt={`Portrait of ${member.name}`}
          loading="lazy"
          decoding="async"
          onError={() => {
            if (imageSrc !== fallbackPhoto) {
              setImageSrc(fallbackPhoto);
            }
          }}
          className="h-full w-full object-cover object-top transition-transform duration-700 ease-frames group-hover/circle:scale-[1.04]"
        />
      </div>
    </div>
  );
}

function PersonCard({
  member,
  size,
  i,
  photo,
}: {
  member: TeamMember;
  size: "lg" | "md";
  i: number;
  photo?: string | undefined;
}) {
  return (
    <Reveal delay={i * 0.06} className="min-w-0 text-center">
      <CirclePhoto member={member} size={size} photo={photo} />

      <p
        className={cn(
          "mt-6 tracking-[-0.02em]",
          size === "lg" ? "text-lg" : "text-base",
        )}
      >
        {member.name}
      </p>

      {member.role ? (
        <p className="mt-1 text-sm text-muted-foreground">{member.role}</p>
      ) : null}

      {member.instagram ? (
        <a
          href={`https://instagram.com/${member.instagram}`}
          target="_blank"
          rel="noreferrer"
          className="mt-1 inline-block break-all text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          @{member.instagram}
        </a>
      ) : null}
    </Reveal>
  );
}

export function TeamSection() {
  return (
    <>
      <section id="about" className="px-6 py-28 sm:px-10 sm:py-40">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="eyebrow">About</p>
            <h2 className="display-lg mt-5">{brand.name}</h2>

            {brand.about ? (
              <p className="body-lg mt-8 max-w-3xl">{brand.about}</p>
            ) : (
              <p className="mt-8 max-w-2xl text-sm text-muted-foreground italic">
                The team behind Frames brings together creative minds
                passionate about storytelling, filmmaking, and visual
                communication. With collaboration, fresh ideas, and a shared
                commitment to quality, we work together to turn concepts into
                compelling visual experiences and bring every project to life.
              </p>
            )}
          </Reveal>
        </div>
      </section>

      <section id="founders" className="px-6 pb-28 sm:px-10 sm:pb-36">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="eyebrow">Founders</p>
            <h2 className="display-md mt-4">Founders</h2>
          </Reveal>

          <div className="mt-16 grid grid-cols-2 gap-x-5 gap-y-14 sm:gap-x-10 lg:grid-cols-4">
            {founders.map((m, i) => (
              <PersonCard
                key={m.name}
                member={m}
                size="lg"
                i={i}
                photo={founderPhotos[i]}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="team" className="px-6 py-24 sm:px-10 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="eyebrow">Team</p>
            <h2 className="display-md mt-4">Team</h2>
          </Reveal>

          {team.length ? (
            <div className="mt-14 grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3 sm:gap-x-8 lg:grid-cols-5">
              {team.map((m, i) => (
                <PersonCard
                  key={m.name}
                  member={m}
                  size="md"
                  i={i}
                  photo={teamPhotos[i]}
                />
              ))}
            </div>
          ) : (
            <Reveal delay={0.08}>
              <p className="mt-8 max-w-2xl text-sm text-muted-foreground italic">
                Team members to be added.
              </p>
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}