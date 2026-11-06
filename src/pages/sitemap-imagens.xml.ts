import type { APIRoute } from "astro";
import { screens, screenImage } from "../lib/screens";
import { absoluteUrl } from "../lib/site";
const escape = (s: string) =>
  s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
export const GET: APIRoute = () =>
  new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${screens.map((s) => `<url><loc>${escape(absoluteUrl(`/solucoes/${s.slug}`))}</loc><image:image><image:loc>${escape(absoluteUrl(screenImage(s.slug)))}</image:loc></image:image></url>`).join("\n")}
</urlset>`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  );
