import { useServerFn } from "@tanstack/react-start";
import { motion } from "motion/react";
import { useState, type FormEvent } from "react";

import { sendEnquiry } from "@/lib/contact.functions";
import { services } from "@/content/frames";

const fieldClass =
  "w-full rounded-xl border border-hairline bg-card/60 px-4 py-3.5 text-[0.95rem] outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-foreground/30";

export function ContactForm({
  prefill,
}: { prefill?: { service: string; message: string } | undefined }) {
  const submit = useServerFn(sendEnquiry);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setStatus("loading");
    setError("");
    try {
      await submit({
        data: {
          name: String(form.get("name") ?? ""),
          email: String(form.get("email") ?? ""),
          phone: String(form.get("phone") ?? ""),
          service: String(form.get("service") ?? ""),
          message: String(form.get("message") ?? ""),
        },
      });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="glass-panel rounded-3xl px-8 py-16 text-center"
      >
        <p className="display-md">Message sent.</p>
        <p className="mt-4 text-sm text-muted-foreground">
          Thank you — Frames will be in touch shortly.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="glass-panel rounded-3xl p-6 sm:p-10">
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="name" required placeholder="Name" className={fieldClass} autoComplete="name" />
        <input
          name="email"
          type="email"
          required
          placeholder="Email"
          className={fieldClass}
          autoComplete="email"
        />
        <input name="phone" placeholder="Phone" className={fieldClass} autoComplete="tel" />
        <select name="service" required defaultValue={prefill?.service ?? ""} className={fieldClass}>
          <option value="" disabled>
            Service
          </option>
          {services.map((s) => (
            <option key={s.id} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>
      </div>
      <textarea
        name="message"
        required
        rows={5}
        defaultValue={prefill?.message ?? ""}
        placeholder="Message"
        className={`${fieldClass} mt-4 resize-none`}
      />

      {status === "error" && <p className="mt-4 text-sm text-destructive">{error}</p>}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-6 w-full rounded-full bg-foreground px-8 py-4 text-sm font-medium text-background transition-opacity hover:opacity-85 disabled:opacity-50 sm:w-auto"
      >
        {status === "loading" ? "Sending…" : "Send enquiry"}
      </button>
    </form>
  );
}
