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
  legalName: "eyelid",
  tagline: "Software para o seu jeito de trabalhar.",
  description:
    "Desenvolvimento de software sob medida, consultoria tecnológica e acompanhamento de processos para empresas.",
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
