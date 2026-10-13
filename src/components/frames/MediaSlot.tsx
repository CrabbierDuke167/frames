import { cn } from "@/lib/utils";

/**
 * Renders real media when supplied, otherwise a clean, obviously-empty frame.
 * No fake imagery is ever generated here.
 */
export function MediaSlot({
  src,
  type = "image",
  label,
  className,
  alt,
}: {
  src?: string | undefined;
  type?: "image" | "video" | undefined;
  label?: string | undefined;
  className?: string | undefined;
  alt?: string | undefined;
}) {
  if (src && type === "video") {
    return (
      <video
        className={cn("h-full w-full object-cover", className)}
        src={src}
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
      />
    );
  }

  if (src) {
    return (
      <img
        src={src}
        alt={alt ?? label ?? ""}
        loading="lazy"
        decoding="async"
        className={cn("h-full w-full object-cover", className)}
      />
    );
  }

  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center overflow-hidden border border-hairline",
        "bg-[radial-gradient(120%_80%_at_30%_10%,var(--bloom-1),transparent_60%),radial-gradient(100%_80%_at_90%_100%,var(--bloom-2),transparent_60%)] bg-secondary/60",
        className,
      )}
    >
      {/* viewfinder corners */}
      <span aria-hidden className="absolute top-4 left-4 size-4 border-t border-l border-foreground/30" />
      <span aria-hidden className="absolute top-4 right-4 size-4 border-t border-r border-foreground/30" />
      <span aria-hidden className="absolute bottom-4 left-4 size-4 border-b border-l border-foreground/30" />
      <span aria-hidden className="absolute right-4 bottom-4 size-4 border-r border-b border-foreground/30" />
      <span aria-hidden className="absolute top-1/2 left-1/2 size-6 -translate-1/2 opacity-30">
        <span className="absolute top-1/2 left-0 h-px w-full bg-foreground" />
        <span className="absolute top-0 left-1/2 h-full w-px bg-foreground" />
      </span>
      <span className="eyebrow absolute bottom-5 left-1/2 -translate-x-1/2 px-6 text-center whitespace-nowrap">
        {label ?? "Media"}
      </span>
    </div>
  );
}
