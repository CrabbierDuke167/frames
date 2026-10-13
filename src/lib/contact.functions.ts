import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const enquirySchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(60).optional().default(""),
  service: z.string().trim().min(1).max(80),
  message: z.string().trim().min(1).max(4000),
});

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] ?? c,
  );

export const sendEnquiry = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => enquirySchema.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env["RESEND_API_KEY"];
    const lovableKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey || !lovableKey) {
      throw new Error("Email delivery is not configured yet.");
    }

    const rows = [
      ["Name", data.name],
      ["Email", data.email],
      ["Phone", data.phone || "—"],
      ["Service", data.service],
    ]
      .map(
        ([k, v]) =>
          `<p style="margin:0 0 6px"><strong>${k}:</strong> ${escapeHtml(String(v))}</p>`,
      )
      .join("");

    const html = `<div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.6">
          ${rows}
          <p style="margin:18px 0 6px"><strong>Message</strong></p>
          <p style="white-space:pre-wrap;margin:0">${escapeHtml(data.message)}</p>
        </div>`;

    const send = (to: string) =>
      fetch("https://connector-gateway.lovable.dev/resend/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${lovableKey}`,
          "X-Connection-Api-Key": apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env["CONTACT_FROM_EMAIL"] || "Frames <onboarding@resend.dev>",
          to: [to],
          reply_to: data.email,
          subject: `New enquiry — ${data.service} — ${data.name}`,
          html,
        }),
      });

    let res = await send("framess.co@gmail.com");
    // Until a sending domain is verified in Resend, test mode only delivers to the
    // Resend account owner — fall back there so no enquiry is lost.
    if (res.status === 403) {
      console.error("Resend 403 to primary inbox:", await res.text());
      res = await send(process.env["CONTACT_FALLBACK_EMAIL"] || "zakiabdulrahimi870@gmail.com");
    }

    if (!res.ok) {
      console.error(`Resend failed [${res.status}]:`, await res.text());
      throw new Error("We couldn't send your message. Please try again.");
    }

    return { ok: true as const };
  });
