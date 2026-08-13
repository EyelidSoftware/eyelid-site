/**
 * Preços do AutoFeedr, buscados da API pública **durante o build**.
 *
 * Por que no build e não no navegador:
 *  - o preço entra no HTML servido, então o Google e os robôs sociais leem;
 *  - não há requisição no cliente, nem CORS, nem tela piscando;
 *  - a tabela nunca desencontra do que está configurado no admin — mudou o
 *    preço lá, o próximo build do site reflete.
 *
 * Se a API estiver fora no momento do build, usamos o fallback abaixo em vez
 * de derrubar o build inteiro. Um site no ar com preço levemente velho é
 * melhor que nenhum site no ar — mas o aviso aparece no log para percebermos.
 */
import { products } from "./site";

export interface MonthOption {
  months: number;
  percent_off: number;
  subtotal_cents: number;
  discount_cents: number;
  total_cents: number;
}

export interface Plan {
  plan_type: string;
  weekly_credits: number;
  price_cents: number;
  is_available: boolean;
  month_options: MonthOption[];
}

/** Rótulos e posicionamento — isto é conteúdo de marketing, não vem da API. */
export const planCopy: Record<string, { name: string; pitch: string; highlight?: boolean }> = {
  lite: { name: "Lite", pitch: "Para começar com consistência." },
  plus: { name: "Plus", pitch: "Para quem já tem ritmo de publicação." },
  pro: { name: "Pro", pitch: "Volume máximo para crescer rápido.", highlight: true },
};

/** Usado só quando a API não responde no build. Mantenha plausível. */
const FALLBACK: Plan[] = [
  { plan_type: "lite", weekly_credits: 12, price_cents: 2000, is_available: true, month_options: [] },
  { plan_type: "plus", weekly_credits: 24, price_cents: 4000, is_available: true, month_options: [] },
  { plan_type: "pro", weekly_credits: 50, price_cents: 8000, is_available: true, month_options: [] },
];

export async function fetchPlans(): Promise<{ plans: Plan[]; live: boolean }> {
  const endpoint = `${products[0].apiUrl}/plans`;

  try {
    const response = await fetch(endpoint, { signal: AbortSignal.timeout(10_000) });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = (await response.json()) as Plan[];
    const available = data.filter((plan) => plan.is_available);
    if (available.length === 0) throw new Error("nenhum plano disponível na resposta");

    return { plans: available, live: true };
  } catch (error) {
    console.warn(
      `[plans] Não foi possível buscar ${endpoint} (${error instanceof Error ? error.message : error}). ` +
        "Usando preços de fallback — confira antes de publicar.",
    );
    return { plans: FALLBACK, live: false };
  }
}

export function formatBRL(cents: number): string {
  return (cents / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

/** Maior desconto oferecido no plano — vira selo de "economize até X%". */
export function bestDiscount(plan: Plan): number {
  return plan.month_options.reduce((max, option) => Math.max(max, option.percent_off), 0);
}
