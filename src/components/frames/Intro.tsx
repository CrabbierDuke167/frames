import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";

import { brand } from "@/content/frames";

/**
 * Silent, Apple-like homepage intro: logo fades in, holds, fades out,
 * tagline fades in, then the overlay dissolves into the page.
 */
const INTRO_KEY = "frames-intro-seen";
export const INTRO_REPLAY_EVENT = "frames:replay-intro";

function introSeen(): boolean {
  try {
    return sessionStorage.getItem(INTRO_KEY) === "1";
  } catch {
    return true;
  }
}

function markIntroSeen() {
  try {
    sessionStorage.setItem(INTRO_KEY, "1");
  } catch {
    // ignore
  }
}

export function requestIntroReplay() {
  try {
    sessionStorage.removeItem(INTRO_KEY);
  } catch {
    // The event still replays the animation on the current page.
  }
  window.dispatchEvent(new Event(INTRO_REPLAY_EVENT));
}

export function Intro({ onDone }: { onDone: () => void }) {
  const [stage, setStage] = useState<"logo" | "tagline" | "done">("logo");
  const [replayId, setReplayId] = useState(0);

  const replay = useCallback(() => {
    setStage("logo");
    setReplayId((value) => value + 1);
  }, []);

  useEffect(() => {
    window.addEventListener(INTRO_REPLAY_EVENT, replay);
    return () => window.removeEventListener(INTRO_REPLAY_EVENT, replay);
  }, [replay]);

  useEffect(() => {
    if (replayId === 0 && introSeen()) {
      setStage("done");
      onDone();
      return;
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      markIntroSeen();
      setStage("done");
      onDone();
      return;
    }
    const t1 = setTimeout(() => setStage("tagline"), 2200);
    const t2 = setTimeout(() => {
      markIntroSeen();
      setStage("done");
      onDone();
    }, 4600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
    // onDone is intentionally omitted so a parent render cannot restart the sequence.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [replayId]);

  return (
    <AnimatePresence>
      {stage !== "done" && (
        <motion.div
          key={`intro-${replayId}`}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <AnimatePresence mode="wait">
            {stage === "logo" ? (
              <motion.span
                key="logo"
                initial={{ opacity: 0, scale: 1.04, letterSpacing: "0.02em" }}
                animate={{ opacity: 1, scale: 1, letterSpacing: "-0.04em" }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="display-lg"
              >
                {brand.name}
              </motion.span>
            ) : (
              <motion.span
                key="tagline"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                className="text-sm tracking-[-0.01em] text-muted-foreground sm:text-base"
              >
                {brand.tagline}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
