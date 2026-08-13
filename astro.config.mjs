// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// `site` é obrigatório: o sitemap e as URLs canônicas saem daqui.
// Mantenha igual ao `site.url` em src/lib/site.ts.
export default defineConfig({
  site: "https://eyelid.com.br",
  integrations: [sitemap()],
  build: {
    // URLs sem barra no final: /autofeedr em vez de /autofeedr/
    format: "file",
  },
  compressHTML: true,
});
