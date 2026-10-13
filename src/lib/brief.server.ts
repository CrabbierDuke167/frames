import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

const SYSTEM = `You are the project brief assistant for Frames, a creative media company with exactly three services:
- "smm": SMM — social media management (content, posting, growing accounts)
- "advertising": Advertising — video ads and commercials
- "studio": Frames Studio — photo and video production, including events
Task: pick the ONE best-fitting service and turn the client's words into a crisp, professional brief.
Rules:
- Use only what the client said. Never invent facts about Frames (clients, prices, stats, timelines, guarantees) or about the client.
- Write in clear, confident, plain English. Short sentences. No hype, no emojis.
- "reason": one sentence, max 25 words, addressed to the client ("you").
- "title": max 8 words.
- "objective": one sentence.
- "audience": who it's for, or "Not specified".
- "deliverables": 2–4 short items that follow directly from the request.
- "notes": list the key missing details Frames would ask about (e.g. budget, date, location), max 25 words.
Reply with ONLY a JSON object, no markdown:
{"service":"smm|advertising|studio","reason":"","brief":{"title":"","objective":"","audience":"","deliverables":[""],"notes":""}}`;

export async function generateBrief(goals: string, apiKey: string) {
  const provider = createOpenAI({
    baseURL: "https://ai.gateway.lovable.dev/v1",
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
  });
  const result = streamText({
    model: provider.responses("openai/gpt-6-astra"),
    system: SYSTEM,
    prompt: goals,
    providerOptions: {
      openai: {
        forceReasoning: true,
        reasoningEffort: "low",
        reasoningSummary: "auto",
        store: false,
        include: ["reasoning.encrypted_content"],
      },
    },
  });
  const text = await result.text;
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("The AI didn't return a brief. Please try again.");
  return JSON.parse(match[0]) as unknown;
}
