import { useServerFn } from "@tanstack/react-start";
import { AnimatePresence, motion } from "motion/react";
import { useState, type FormEvent, type KeyboardEvent } from "react";

import { createBrief, type ProjectBrief } from "@/lib/brief.functions";
import { services } from "@/content/frames";

const MIN = 15;
const MAX = 1500;
const EXAMPLES = [
  "Grow our brand's Instagram presence",
  "A video ad for our product launch",
  "Photo and video coverage of our event",
];

export function BriefAssistant({ onUse }: { onUse?: (service: string, text: string) => void }) {
  const run = useServerFn(createBrief);
  const [goals, setGoals] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");
  const [result, setResult] = useState<ProjectBrief | null>(null);
  const [copied, setCopied] = useState(false);

  const generate = async () => {
    if (status === "loading") return;
    if (goals.trim().length < MIN) {
      setStatus("error");
      setError("Add a little more detail so we can shape a useful brief.");
      return;
    }
    setStatus("loading");
    setError("");
    setCopied(false);
    try {
      setResult(await run({ data: { goals } }));
      setStatus("idle");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void generate();
  };
  const onKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) void generate();
  };

  const service = result ? services.find((s) => s.id === result.service) : undefined;
  const briefText = result
    ? `${result.brief.title}\n\nObjective: ${result.brief.objective}\nAudience: ${result.brief.audience}\nDeliverables:\n${result.brief.deliverables.map((d) => `• ${d}`).join("\n")}\nOpen questions: ${result.brief.notes}`
    : "";

  const copy = async () => {
    await navigator.clipboard.writeText(briefText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-10">
      <p className="eyebrow">Project brief assistant</p>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight">Not sure where to start?</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Describe your goals in a sentence or two. AI suggests the right Frames service and drafts a
        brief you can send us.
      </p>

      <form onSubmit={onSubmit} className="mt-6">
        <textarea
          value={goals}
          onChange={(e) => setGoals(e.target.value)}
          onKeyDown={onKey}
          rows={4}
          maxLength={MAX}
          disabled={status === "loading"}
          aria-label="Your goals"
          placeholder="What do you want to achieve, who is it for, and when?"
          className="w-full resize-none rounded-xl border border-hairline bg-card/60 px-4 py-3.5 text-[0.95rem] outline-none transition-colors focus:border-foreground/30 disabled:opacity-60"
        />
        {!goals && (
          <div className="mt-3 flex flex-wrap gap-2">
            {EXAMPLES.map((ex) => (
              <button
                key={ex}
                type="button"
                onClick={() => setGoals(ex)}
                className="rounded-full border border-hairline px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                {ex}
              </button>
            ))}
          </div>
        )}
        <div className="mt-4 flex items-center justify-between gap-4">
          <p className="text-xs text-destructive" role="alert">
            {status === "error" ? error : ""}
            {status !== "error" && goals && (
              <span className="text-muted-foreground">
                {goals.length}/{MAX}
              </span>
            )}
          </p>
          <button
            type="submit"
            disabled={status === "loading"}
            className="shrink-0 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-85 disabled:opacity-50"
          >
            {status === "loading" ? "Drafting…" : result ? "Regenerate" : "Create brief"}
          </button>
        </div>
      </form>

      <AnimatePresence mode="wait">
        {status === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="hairline-t mt-8 space-y-3 pt-8"
            aria-live="polite"
          >
            {[40, 75, 60, 85].map((w, i) => (
              <div key={i} className="h-3 animate-pulse rounded-full bg-foreground/10" style={{ width: `${w}%` }} />
            ))}
          </motion.div>
        )}
        {status !== "loading" && result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="hairline-t mt-8 pt-8"
          >
            <p className="eyebrow">Recommended</p>
            <p className="display-md mt-2">{service?.name ?? result.service}</p>
            <p className="mt-3 text-sm text-muted-foreground">{result.reason}</p>
            <h3 className="mt-8 text-lg font-semibold">{result.brief.title}</h3>
            <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
              <div><dt className="text-muted-foreground">Objective</dt><dd className="mt-1">{result.brief.objective}</dd></div>
              <div><dt className="text-muted-foreground">Audience</dt><dd className="mt-1">{result.brief.audience}</dd></div>
              <div>
                <dt className="text-muted-foreground">Deliverables</dt>
                <dd className="mt-1"><ul className="list-disc space-y-1 pl-5">{result.brief.deliverables.map((d) => <li key={d}>{d}</li>)}</ul></dd>
              </div>
              <div><dt className="text-muted-foreground">Open questions</dt><dd className="mt-1">{result.brief.notes}</dd></div>
            </dl>
            <div className="mt-8 flex flex-wrap gap-3">
              {onUse && service && (
                <button
                  type="button"
                  onClick={() => onUse(service.name, briefText)}
                  className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-85"
                >
                  Use this brief in my message
                </button>
              )}
              <button
                type="button"
                onClick={() => void copy()}
                className="rounded-full border border-hairline px-6 py-3 text-sm font-medium"
              >
                {copied ? "Copied" : "Copy brief"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
