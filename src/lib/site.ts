/**
 * Configuração central do site.
 *
 * Nome de empresa, URLs e contatos vivem só aqui. Se um desses valores
 * aparecer escrito à mão em qualquer página, é bug: quando mudar, vai mudar
 * pela metade.
 */

export const site = {
  /** Empresa. O site é da Eyelid; AutoFeedr é um dos produtos. */
  company: "eyelid",
  publicName: "Eyelid Software",
  alternateNames: ["eyelid", "EyelidSoftware"],
  foundingDate: "2024-02-05",
  foundingDateLabel: "5 de fevereiro de 2024",
  homeTitle: "Experiência em software, automação e IA",
  presentation:
    "A Eyelid Software reúne experiência em desenvolvimento de software, automação, integrações e IA para empresas. Atuamos da arquitetura à implantação e evolução em produção, com atenção à qualidade e à experiência de uso. Sua equipe participa das decisões, testa as entregas e acompanha o desenvolvimento semanalmente.",
  legalName: "eyelid",
  tagline: "Software para o seu jeito de trabalhar.",
  description:
    "Experiência em software sob medida, automação e IA para empresas. A Eyelid Software atua da arquitetura à produção, com qualidade e desenvolvimento próximo do cliente.",
  url: "https://eyelid.com.br",
  locale: "pt-BR",
  email: "contato@eyelid.com.br",
  social: {
    linkedin: "",
    github: "https://github.com/EyelidSoftware",
    instagram: "",
  },
} as const;

/** Produtos da Eyelid. Cada um ganha uma página em /<slug>. */
export const products = [
  {
    slug: "autofeedr",
    name: "AutoFeedr",
    tagline: "Presença no LinkedIn no piloto automático",
    summary:
      "Gera, revisa e publica conteúdo técnico no LinkedIn, e resolve desafios de " +
      "LeetCode com commit automático no seu GitHub.",
    /** Onde o cliente entra depois de assinar. */
    appUrl: "https://autofeedr.eyelid.com.br",
    /** API pública usada para montar a tabela de preços no build. */
    apiUrl: "https://autofeedr.eyelid.com.br/api",
    status: "live",
  },
] as const;

export type Product = (typeof products)[number];

export function productBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

/** URL absoluta a partir de um caminho relativo — usada em canonical e OG. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, site.url).href;
}

export function breadcrumbSchema(
  section: { name: string; path: string },
  page: { name: string; path: string },
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Início", path: "/" }, section, page].map(
      ({ name, path }, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name,
        item: absoluteUrl(path),
      }),
    ),
  };
}
