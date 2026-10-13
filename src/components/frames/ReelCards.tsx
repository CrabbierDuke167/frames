import { useState } from "react";

import { Reveal } from "./Reveal";
import { reelsFor, type Reel, type ServiceId } from "@/content/frames";

function ReelCard({ reel, i }: { reel: Reel; i: number }) {
  const [broken, setBroken] = useState(false);
  const showImg = reel.cover && !broken;
  return (
    <Reveal delay={i * 0.06}>
      <a
        href={reel.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Watch ${reel.label} on Instagram (opens in a new tab)`}
        className="group relative block aspect-[9/16] overflow-hidden rounded-3xl border border-hairline shadow-[var(--shadow-float)] outline-none focus-visible:ring-2 focus-visible:ring-foreground/60"
      >
        {showImg ? (
          <img
            src={reel.cover}
            alt={reel.label}
            loading="lazy"
            decoding="async"
            onError={() => setBroken(true)}
            className="h-full w-full object-cover transition-transform duration-700 ease-frames group-hover:scale-[1.04] motion-reduce:transition-none"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(120%_80%_at_30%_10%,var(--bloom-1),transparent_60%),radial-gradient(100%_80%_at_90%_100%,var(--bloom-2),transparent_60%)] bg-secondary/60">
            <span className="eyebrow">Cover coming soon</span>
          </div>
        )}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100"
        />
        <span
          aria-hidden
          className="glass absolute top-4 left-4 rounded-full px-3 py-1 text-[0.65rem] font-medium tracking-[0.16em] uppercase"
        >
          Reel
        </span>
        <span
          aria-hidden
          className="glass specular absolute right-4 bottom-4 flex size-11 items-center justify-center rounded-full transition-transform duration-500 group-hover:scale-110"
        >
          <svg viewBox="0 0 24 24" className="ml-0.5 size-4 fill-current">
            <path d="M8 5.5v13l10.5-6.5z" />
          </svg>
        </span>
      </a>
    </Reveal>
  );
}

export function ReelCards({ service }: { service: ServiceId }) {
  const list = reelsFor(service);
  if (!list.length) return null;
  return (
    <div className="grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 lg:grid-cols-3">
      {list.map((r, i) => (
        <ReelCard key={r.url} reel={r} i={i} />
      ))}
    </div>
  );
}
