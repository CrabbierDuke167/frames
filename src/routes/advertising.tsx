import { createFileRoute } from "@tanstack/react-router";

import { ServicePageLayout } from "@/components/frames/ServicePageLayout";
import { getService } from "@/content/frames";

export const Route = createFileRoute("/advertising")({
  head: () => ({
    meta: [
      { title: "Advertising — Frames" },
      { name: "description", content: "Advertising video work by Frames." },
      { property: "og:title", content: "Advertising — Frames" },
      { property: "og:description", content: "Advertising video work by Frames." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => (
    <main>
      <ServicePageLayout service={getService("advertising")} />
    </main>
  ),
});
