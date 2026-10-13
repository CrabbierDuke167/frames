import { createFileRoute } from "@tanstack/react-router";

import { ServicePageLayout } from "@/components/frames/ServicePageLayout";
import { getService } from "@/content/frames";

export const Route = createFileRoute("/smm")({
  head: () => ({
    meta: [
      { title: "SMM — Frames" },
      { name: "description", content: "Social media work by Frames." },
      { property: "og:title", content: "SMM — Frames" },
      { property: "og:description", content: "Social media work by Frames." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <main><ServicePageLayout service={getService("smm")} /></main>,
});
