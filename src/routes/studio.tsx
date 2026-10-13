import { createFileRoute } from "@tanstack/react-router";

import { ServicePageLayout } from "@/components/frames/ServicePageLayout";
import { getService } from "@/content/frames";

export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [
      { title: "Frames Studio — Frames" },
      {
        name: "description",
        content: "Photo and video works, including events, by Frames Studio.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { property: "og:title", content: "Frames Studio — Frames" },
      {
        property: "og:description",
        content: "Photo and video works, including events, by Frames Studio.",
      },
    ],
  }),
  component: () => (
    <main>
      <ServicePageLayout service={getService("studio")} />
    </main>
  ),
});
