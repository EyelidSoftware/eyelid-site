import entries from "./screens.json";
import { absoluteUrl, site } from "./site";

export const screens = entries;
export const screenImage = (slug: string, extension = "png") =>
  `/solucoes/eyelid-${slug}.${extension}`;
export const screenSchema = (screen: (typeof screens)[number]) => ({
  "@context": "https://schema.org",
  "@type": "ImageObject",
  "@id": absoluteUrl(`/solucoes/${screen.slug}#imagem`),
  name: `${screen.title} | ${site.publicName}`,
  description: screen.description,
  caption: screen.description,
  contentUrl: absoluteUrl(screenImage(screen.slug)),
  thumbnailUrl: absoluteUrl(screenImage(screen.slug, "webp")),
  url: absoluteUrl(`/solucoes/${screen.slug}`),
  width: 1600,
  height: 1100,
  encodingFormat: "image/png",
  inLanguage: site.locale,
  creator: {
    "@type": "Organization",
    name: site.publicName,
    url: absoluteUrl(),
  },
  creditText: site.publicName,
  copyrightNotice: `${site.publicName}. Todos os direitos reservados.`,
});
