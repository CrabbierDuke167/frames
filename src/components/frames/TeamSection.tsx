import { Reveal } from "./Reveal";
import { brand, founders, team, type TeamMember } from "@/content/frames";
import { cn } from "@/lib/utils";

function CirclePhoto({ member, size }: { member: TeamMember; size: "lg" | "md" }) {
  return (
    <div
      className={cn(
        "glass specular group/circle relative mx-auto aspect-square w-full rounded-full p-[9%] transition-all duration-700 ease-frames",
        "hover:-translate-y-1 hover:shadow-[var(--shadow-float)] motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        size === "lg" ? "max-w-[15rem]" : "max-w-[11rem]",
      )}
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-full border border-hairline bg-[radial-gradient(120%_90%_at_30%_15%,var(--bloom-1),transparent_65%),radial-gradient(100%_90%_at_85%_100%,var(--bloom-2),transparent_65%)] bg-secondary/60">
        {member.photo ? (
          <img
            src={member.photo}
            alt={`Portrait of ${member.name}`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top transition-transform duration-700 ease-frames group-hover/circle:scale-[1.04]"
          />
        ) : (
          <span className="eyebrow absolute inset-0 flex items-center justify-center text-[0.6rem]">
            Photo
          </span>
        )}
      </div>
    </div>
  );
}

function PersonCard({ member, size, i }: { member: TeamMember; size: "lg" | "md"; i: number }) {
  return (
    <Reveal delay={i * 0.06} className="min-w-0 text-center">
      <CirclePhoto member={member} size={size} />
      <p className={cn("mt-6 tracking-[-0.02em]", size === "lg" ? "text-lg" : "text-base")}>
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
                The team behind Frames brings together creative minds passionate about storytelling, filmmaking, and visual communication. With collaboration, fresh ideas, and a shared commitment to quality, we work together to turn concepts into compelling visual experiences and bring every project to life.
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
              <PersonCard key={m.name} member={m} size="lg" i={i} />
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
                <PersonCard key={m.name} member={m} size="md" i={i} />
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
