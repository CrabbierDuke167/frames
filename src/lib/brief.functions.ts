import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const briefSchema = z.object({
  service: z.enum(["smm", "advertising", "studio"]),
  reason: z.string(),
  brief: z.object({
    title: z.string(),
    objective: z.string(),
    audience: z.string(),
    deliverables: z.array(z.string()),
    notes: z.string(),
  }),
});

export type ProjectBrief = z.infer<typeof briefSchema>;

export const createBrief = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    z.object({ goals: z.string().trim().min(15).max(1500) }).parse(data),
  )
  .handler(async ({ data }) => {
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) throw new Error("AI is not configured yet.");
    const { generateBrief } = await import("./brief.server");
    try {
      return briefSchema.parse(await generateBrief(data.goals, key));
    } catch (err) {
      const status = (err as { statusCode?: number })?.statusCode;
      if (status === 429) throw new Error("Too many requests right now. Please try again shortly.");
      if (status === 402) throw new Error("AI credits are exhausted. Please try again later.");
      console.error("brief error", err);
      throw new Error("We couldn't create a brief. Please try again.");
    }
  });
