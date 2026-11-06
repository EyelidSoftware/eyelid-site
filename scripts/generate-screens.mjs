/** Original, deterministic UI artwork. All names and values are fictional. */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import sharp from "sharp";
import { site } from "../src/lib/site.ts";
import { engineeringRenderers } from "./engineering-screens.mjs";

const screens = JSON.parse(await readFile("src/lib/screens.json", "utf8"));
const logo = (await readFile("public/brand/logo.svg", "utf8"))
  .replace(/^[\s\S]*?<svg[^>]*>/, "")
  .replace(/<\/svg>\s*$/, "")
  .replace(/<title>.*?<\/title>/, "");
const out = "public/solucoes";
await mkdir(out, { recursive: true });
const esc = (x) =>
  String(x)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
const accent = {
  blue: ["#3458d4", "#9ab5ff"],
  violet: ["#7450bc", "#c1adff"],
  teal: ["#087969", "#7ad7bd"],
  amber: ["#976012", "#efc47f"],
};
class UI {
  constructor(meta, index) {
    this.meta = meta;
    this.parts = [];
    this.index = index;
    this.p =
      meta.theme === "light"
        ? {
            bg: "#f3f5f8",
            side: "#ffffff",
            panel: "#ffffff",
            inset: "#edf0f5",
            line: "#dce2eb",
            text: "#182333",
            muted: "#526174",
            soft: "#616e82",
            accent: accent[meta.accent][0],
            tint: "#edf0fa",
            good: "#08735e",
            warn: "#986015",
          }
        : {
            bg: "#10151e",
            side: "#141b26",
            panel: "#192230",
            inset: "#111a27",
            line: "#303f53",
            text: "#edf2fc",
            muted: "#b3bfd0",
            soft: "#8c9bb0",
            accent: accent[meta.accent][1],
            tint: "#29344c",
            good: "#8cdbbc",
            warn: "#efc47f",
          };
    this.add(
      `<title>${esc(site.publicName + " | " + meta.title)}</title><desc>${esc(meta.description)} Dados fictícios para explorar possibilidades de interface.</desc><defs><linearGradient id="wash" x2="1" y2="1"><stop stop-color="${this.p.accent}" stop-opacity=".18"/><stop offset="1" stop-color="${this.p.accent}" stop-opacity="0"/></linearGradient><pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="${this.p.line}"/></pattern></defs>`,
    );
  }
  c(v) {
    return this.p[v] || v;
  }
  add(s) {
    this.parts.push(s);
  }
  rect(x, y, w, h, c = "panel", r = 14, stroke = "line") {
    this.add(
      `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${this.c(c)}" stroke="${this.c(stroke)}"/>`,
    );
  }
  text(x, y, s, size = 16, c = "muted", weight = 400) {
    this.add(
      `<text x="${x}" y="${y}" font-size="${size}" fill="${this.c(c)}" font-weight="${weight}">${esc(s)}</text>`,
    );
  }
  line(x, y, x2, y2, c = "line", width = 1, dash = "") {
    this.add(
      `<path d="M${x} ${y}L${x2} ${y2}" fill="none" stroke="${this.c(c)}" stroke-width="${width}" stroke-dasharray="${dash}"/>`,
    );
  }
  path(d, c = "accent", width = 2, fill = "none", dash = "") {
    this.add(
      `<path d="${d}" fill="${this.c(fill)}" stroke="${this.c(c)}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="${dash}"/>`,
    );
  }
  dot(x, y, r = 4, c = "accent") {
    this.add(`<circle cx="${x}" cy="${y}" r="${r}" fill="${this.c(c)}"/>`);
  }
  pill(x, y, label, c = "accent", width) {
    const w = width || label.length * 8 + 26;
    this.rect(x, y, w, 29, "tint", 14, "tint");
    this.text(x + 13, y + 20, label, 13, c, 500);
  }
  avatar(x, y, name, c = "accent") {
    this.dot(x, y, 19, "tint");
    this.text(x - 10, y + 5, name, 13, c, 600);
  }
  icon(x, y, n, c = "muted") {
    const paths = [
      "M1 1h6v6H1z M12 1h6v6h-6z M1 12h6v6H1z M12 12h6v6h-6z",
      "M1 18V2 M1 18h18 M5 13l5-6 4 3 5-8",
      "M1 2h18v13H9l-5 4v-4H1z",
      "M9 0v5 M2 5h14v8H2z M9 13v6 M2 19h14",
      "M3 0h10l5 5v15H3z M7 9h7 M7 13h7",
      "M10 0l2 7 7 3-7 2-2 7-3-7-7-2 7-3z",
    ];
    this.add(
      `<path d="${paths[n % paths.length]}" transform="translate(${x} ${y})" fill="none" stroke="${this.c(c)}" stroke-width="1.5" stroke-linejoin="round"/>`,
    );
  }
  heading(x, y, title, sub) {
    this.text(x, y, title, 20, "text", 600);
    if (sub) this.text(x, y + 26, sub, 14);
  }
  shell(nav) {
    this.rect(0, 0, 1600, 1100, "bg", 0, "bg");
    this.rect(0, 0, 232, 1100, "side", 0, "side");
    this.line(232, 0, 232, 1100);
    this.add(
      `<svg x="24" y="27" width="178" height="53" viewBox="-12 -159 724 213">${logo.replaceAll("#151515", this.p.text)}</svg>`,
    );
    this.text(28, 119, "ESPAÇO DE TRABALHO", 11, "soft", 600);
    nav.forEach((label, i) => {
      let y = 144 + i * 50;
      if (i === 0) this.rect(15, y, 201, 39, "tint", 9, "tint");
      this.icon(29, y + 10, i, i === 0 ? "accent" : "muted");
      this.text(
        61,
        y + 25,
        label,
        14,
        i === 0 ? "accent" : "muted",
        i === 0 ? 600 : 400,
      );
    });
    this.text(28, 546, "ORGANIZAÇÃO", 11, "soft", 600);
    ["Documentos", "Integrações", "Permissões"].forEach((s, i) => {
      this.icon(29, 572 + i * 43, 4);
      this.text(61, 589 + i * 43, s, 14);
    });
    this.rect(18, 891, 196, 94, "inset", 12, "line");
    this.dot(36, 916, 4, "good");
    this.text(49, 921, "Ambiente da equipe", 13, "text", 500);
    this.text(34, 949, "Acessos por permissão", 12);
    this.text(34, 970, "Configurar espaço  ↗", 12, "accent");
    this.line(20, 1011, 212, 1011);
    this.avatar(42, 1052, "EC");
    this.text(73, 1047, "Equipe conectada", 13, "text", 500);
    this.text(73, 1068, "Meu perfil  ⌄", 12);
    this.text(272, 48, "Workspace  /  " + this.meta.title, 14);
    this.rect(1141, 24, 278, 37, "inset", 9, "line");
    this.text(1156, 48, "Buscar no espaço de trabalho", 13);
    this.text(1380, 48, "⌘ K", 12, "soft");
    this.avatar(1547, 43, "EC");
    this.icon(1455, 33, 2);
    this.line(232, 82, 1600, 82);
    this.text(272, 144, this.meta.screen, 32, "text", 600);
    this.text(272, 176, this.meta.subtitle, 16);
    this.line(272, 1049, 1560, 1049);
    this.text(272, 1077, this.meta.title, 13, "soft");
    this.text(
      1260,
      1077,
      site.publicName + "  /  " + String(this.index + 1).padStart(2, "0"),
      13,
      "muted",
      500,
    );
  }
  metric(x, y, w, label, value, detail, series = [7, 12, 10, 20, 16, 30, 34]) {
    this.rect(x, y, w, 133);
    this.text(x + 21, y + 30, label, 14);
    this.text(x + 21, y + 79, value, 33, "text", 600);
    this.text(x + 21, y + 111, detail, 12, "good");
    let pts = series
      .map((v, i) => `${i ? "L" : "M"}${x + w - 128 + i * 15},${y + 86 - v}`)
      .join(" ");
    if (value.length <= 6) this.path(pts, "accent", 2.3);
  }
  metrics(items) {
    items.forEach((r, i) => this.metric(272 + i * 329, 215, 310, ...r));
  }
  table(x, y, w, headers, rows, widths) {
    const col = widths || headers.map((_, i) => i / headers.length);
    this.rect(x, y, w, 57 + rows.length * 58);
    this.rect(x + 1, y + 1, w - 2, 42, "inset", 13, "inset");
    headers.forEach((s, i) =>
      this.text(x + 20 + col[i] * w, y + 27, s, 12, "soft", 600),
    );
    rows.forEach((row, i) => {
      let yy = y + 43 + i * 58;
      if (i) this.line(x + 18, yy, x + w - 18, yy);
      row.forEach((s, j) =>
        this.text(
          x + 20 + col[j] * w,
          yy + 34,
          s,
          14,
          j === 0 ? "text" : "muted",
          j === 0 ? 500 : 400,
        ),
      );
    });
  }
  chart(x, y, w, h, values, opts = {}) {
    const max = opts.max || Math.max(...values) * 1.15,
      base = y + h - 36,
      left = x + 48,
      right = x + w - 20,
      top = y + 18;
    [0, 0.25, 0.5, 0.75, 1].forEach((a) => {
      const yy = base - (base - top) * a;
      this.line(left, yy, right, yy);
      this.text(x, yy + 4, String(Math.round(max * a)), 11, "soft");
    });
    const pts = values.map((v, i) => [
      left + (i * (right - left)) / (values.length - 1),
      base - (v / max) * (base - top),
    ]);
    if (opts.bars) {
      const bw = ((right - left) / values.length) * 0.55;
      pts.forEach(([px, py], i) =>
        this.rect(
          px - bw / 2,
          py,
          bw,
          base - py,
          i === values.length - 1 ? "accent" : "tint",
          5,
          i === values.length - 1 ? "accent" : "tint",
        ),
      );
    } else {
      const observed =
        opts.observedUntil === undefined
          ? pts
          : pts.slice(0, opts.observedUntil + 1);
      const d = observed
        .map(
          ([px, py], i) =>
            (i ? "L" : "M") + px.toFixed(1) + " " + py.toFixed(1),
        )
        .join(" ");
      if (!opts.noFill)
        this.path(
          d + ` L${observed.at(-1)[0]} ${base} H${left}Z`,
          "none",
          0,
          "url(#wash)",
        );
      this.path(d, "accent", 2.8, undefined, opts.dash || "");
      observed.forEach(([a, b]) => this.dot(a, b, 3, "accent"));
    }
    const labels = opts.labels || ["Jun", "Jul", "Ago", "Set", "Out", "Nov"];
    labels.forEach((l, i) =>
      this.text(
        left + (i * (right - left)) / (labels.length - 1) - 9,
        base + 24,
        l,
        11,
        "soft",
      ),
    );
    return { pts, base, left, right, top, max };
  }
  ring(x, y, r, value, label) {
    const len = 2 * Math.PI * r;
    this.add(
      `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${this.p.inset}" stroke-width="18"/><circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${this.p.accent}" stroke-width="18" stroke-dasharray="${len * value} ${len}" stroke-linecap="round" transform="rotate(-90 ${x} ${y})"/>`,
    );
    this.text(x - 36, y + 6, Math.round(value * 100) + "%", 30, "text", 600);
    this.text(x - 39, y + 31, label, 12);
  }
  progress(x, y, w, value, c = "accent") {
    this.rect(x, y, w, 6, "inset", 3, "inset");
    this.rect(x, y, w * value, 6, c, 3, c);
  }
  task(x, y, w, title, sub, status = "Em andamento") {
    this.rect(x, y, w, 92);
    this.dot(x + 20, y + 27, 4, "accent");
    this.text(x + 35, y + 32, title, 16, "text", 500);
    this.text(x + 20, y + 59, sub, 13);
    this.text(x + 20, y + 79, status, 12, "accent");
  }
  node(x, y, w, title, sub, n = 3) {
    this.rect(x, y, w, 91);
    this.rect(x + 14, y + 22, 39, 39, "tint", 10, "tint");
    this.icon(x + 24, y + 31, n, "accent");
    this.text(x + 65, y + 37, title, 15, "text", 600);
    this.text(x + 65, y + 63, sub, 12);
    this.dot(x + w / 2, y, 4);
    this.dot(x + w / 2, y + 91, 4);
  }
  finish() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1100" viewBox="0 0 1600 1100" role="img"><g font-family="Inter,Arial,sans-serif">${this.parts.join("")}</g></svg>`;
  }
}

function calendar(u) {
  u.shell([
    "Calendário",
    "Publicações",
    "Biblioteca",
    "Aprovações",
    "Resultados",
  ]);
  u.metric(272, 215, 310, "Publicações agendadas", "12", "Próximos 30 dias");
  u.metric(601, 215, 310, "Em revisão", "04", "Aguardando sua equipe");
  u.metric(930, 215, 310, "Conteúdos publicados", "28", "Neste trimestre");
  u.pill(1282, 228, "+ Criar publicação", "accent", 251);
  u.rect(272, 374, 866, 636);
  u.heading(296, 412, "Novembro 2026", "Calendário editorial · LinkedIn");
  u.pill(973, 393, "Mês  ⌄", "accent", 138);
  const days = ["SEG", "TER", "QUA", "QUI", "SEX"];
  days.forEach((d, i) => u.text(301 + i * 166, 481, d, 12, "soft", 600));
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 5; c++) {
      const x = 286 + c * 168,
        y = 501 + r * 122;
      u.rect(x, y, 163, 117, "panel", 8);
      u.text(x + 12, y + 24, 2 + r * 7 + c, 13, "soft");
      if ((r + c) % 3 !== 2) {
        u.rect(x + 8, y + 37, 146, 59, "tint", 7, "tint");
        u.text(
          x + 17,
          y + 58,
          [
            "IA na operação",
            "Bastidores do time",
            "Guia de automação",
            "Produto em foco",
          ][r],
          12,
          "accent",
          500,
        );
        u.text(
          x + 17,
          y + 80,
          c % 2 ? "14:00 · Revisão" : "09:00 · Agendado",
          11,
        );
      }
    }
  }
  u.rect(1161, 374, 399, 636);
  u.heading(1185, 412, "Prévia da publicação", "Revise antes de agendar");
  u.avatar(1205, 487, "EC");
  u.text(1235, 482, "Equipe de conteúdo", 14, "text", 600);
  u.text(1235, 502, "LinkedIn · Publicação da página", 12);
  u.text(1187, 550, "Tecnologia começa entendendo", 18, "text", 500);
  u.text(1187, 577, "o trabalho das pessoas.", 18, "text", 500);
  u.text(1187, 621, "Quais rotinas da sua empresa ainda", 14);
  u.text(1187, 644, "dependem de copiar e colar dados?", 14);
  u.rect(1185, 674, 351, 186, "tint", 13, "tint");
  u.text(1208, 719, "MENOS REPETIÇÃO.", 23, "accent", 600);
  u.text(1208, 753, "MAIS POSSIBILIDADES.", 23, "accent", 600);
  u.line(1208, 779, 1500, 779, "accent");
  u.text(1208, 823, "Processos conectados. Equipes próximas.", 13, "accent");
  u.pill(1185, 885, "✓ Revisão humana", "good", 188);
  u.text(1185, 956, "Agendada para 06 nov · 09:00", 14, "text");
}
function website(u) {
  u.shell([
    "Páginas",
    "Componentes",
    "Conteúdo",
    "Publicação",
    "Configurações",
  ]);
  u.rect(272, 215, 920, 795);
  u.rect(273, 216, 918, 48, "inset", 14, "inset");
  ["#68788c", "#8d9eb3", "#a9b8cc"].forEach((c, i) =>
    u.dot(294 + i * 16, 240, 4, c),
  );
  u.text(572, 245, "Prévia desktop · Página inicial", 13);
  u.rect(296, 289, 872, 696, "#f6f7fb", 10, "#dce2eb");
  u.text(324, 328, "ATELIÊ DIGITAL", 17, "#24304e", 600);
  u.text(820, 328, "Soluções    Sobre    Contato", 14, "#526174");
  u.text(330, 428, "Ideias merecem", 52, "#182333", 600);
  u.text(330, 489, "ganhar forma.", 52, "#182333", 600);
  u.text(332, 533, "Experiências digitais para conectar", 18, "#526174");
  u.text(332, 561, "pessoas, serviços e possibilidades.", 18, "#526174");
  u.rect(331, 600, 222, 51, "#3458d4", 25, "#3458d4");
  u.text(356, 632, "Conheça as soluções  ↗", 16, "#ffffff", 500);
  u.rect(793, 389, 333, 285, "#e8eaf8", 32, "#e8eaf8");
  for (let i = 0; i < 6; i++) {
    u.add(
      `<ellipse cx="960" cy="530" rx="${60 + i * 15}" ry="${27 + i * 8}" fill="none" stroke="#8573cb" stroke-width="2" transform="rotate(${i * 15} 960 530)"/>`,
    );
  }
  u.text(331, 728, "FEITO PARA PESSOAS", 12, "#526174", 600);
  ["Experiência", "Tecnologia", "Continuidade"].forEach((s, i) => {
    u.rect(324 + i * 275, 756, 254, 178, "#ffffff", 14, "#dce2eb");
    u.text(345 + i * 275, 793, "0" + (i + 1), 13, "#7450bc", 600);
    u.text(345 + i * 275, 832, s, 21, "#182333", 600);
    u.text(
      345 + i * 275,
      867,
      [
        "Clareza em cada escolha.",
        "Ideias em funcionamento.",
        "Evoluir faz parte.",
      ][i],
      14,
      "#526174",
    );
  });
  u.rect(1216, 215, 344, 407);
  u.heading(1240, 254, "Estrutura da página", "Conteúdo e hierarquia");
  ["Cabeçalho", "Apresentação", "Soluções", "Como funciona", "Contato"].forEach(
    (s, i) => {
      u.rect(1238, 307 + i * 54, 300, 41, i === 1 ? "tint" : "inset", 8);
      u.text(1254, 333 + i * 54, "⋮⋮   " + s, 14, i === 1 ? "accent" : "text");
    },
  );
  u.rect(1216, 646, 344, 364);
  u.heading(1240, 685, "Pronto para publicar", "Revisão de qualidade");
  [
    "✓  Contraste e legibilidade",
    "✓  Navegação por teclado",
    "✓  Metadados de busca",
    "✓  Imagens otimizadas",
    "✓  Versão para celular",
  ].forEach((s, i) => u.text(1240, 738 + i * 37, s, 14, "good"));
  u.pill(1240, 950, "Publicar versão  ↗", "accent", 244);
}
function erpConfig(u) {
  u.shell([
    "Personalização",
    "Módulos",
    "Integrações",
    "Validações",
    "Histórico",
  ]);
  u.rect(272, 215, 1288, 62);
  u.text(295, 252, "Pedidos de compra", 16, "text", 600);
  u.text(589, 252, "Campos   /   Regras   /   Integrações", 14);
  u.pill(1313, 232, "Versão em revisão", "warn", 219);
  u.rect(272, 300, 315, 710);
  u.heading(296, 340, "Estrutura do pedido", "Módulo de compras");
  [
    "Identificação",
    "Fornecedor",
    "Centro de custo",
    "Itens do pedido",
    "Aprovação",
    "Integrações",
  ].forEach((s, i) => {
    u.rect(291, 390 + i * 61, 276, 45, i === 2 ? "tint" : "inset", 9);
    u.text(308, 419 + i * 61, s, 14, i === 2 ? "accent" : "text");
  });
  u.text(297, 914, "Última revisão", 12);
  u.text(297, 943, "Hoje, 10:42 · Equipe de ERP", 14, "text");
  u.rect(609, 300, 573, 710);
  u.heading(633, 341, "Configurar campo", "Centro de custo");
  const fields = [
    ["Nome do campo", "Centro de custo"],
    ["Identificador técnico", "cost_center"],
    ["Tipo de entrada", "Lista de seleção  ⌄"],
    ["Origem dos dados", "Cadastro de centros ativos  ⌄"],
  ];
  fields.forEach(([l, v], i) => {
    let y = 395 + i * 100;
    u.text(634, y, l, 13);
    u.rect(633, y + 15, 522, 48, "inset", 9);
    u.text(650, y + 45, v, 15, "text");
  });
  u.rect(633, 802, 521, 116, "tint", 12, "tint");
  u.text(653, 833, "✓  Preenchimento obrigatório", 15, "accent", 600);
  u.text(653, 861, "Exibir antes de enviar para aprovação.", 14);
  u.text(653, 886, "Validar centros de custo por unidade.", 14);
  u.pill(633, 948, "Salvar configuração", "accent", 220);
  u.rect(1204, 300, 356, 335);
  u.heading(1228, 341, "Mapeamento de dados", "Sistema conectado");
  [
    ["Origem", "cost_center"],
    ["Destino no ERP", "COD_CENTRO"],
    ["Regra", "Somente centros ativos"],
  ].forEach(([l, v], i) => {
    u.text(1229, 397 + i * 73, l, 12);
    u.text(1229, 424 + i * 73, v, 15, "text", 500);
  });
  u.rect(1204, 658, 356, 352);
  u.heading(1228, 699, "Validação da mudança", "Antes de disponibilizar");
  [
    "Campo reconhecido",
    "Cadastro conectado",
    "Regra de acesso validada",
    "Revisão da área pendente",
  ].forEach((s, i) => {
    u.dot(1234, 747 + i * 46, 4, i === 3 ? "warn" : "good");
    u.text(1249, 752 + i * 46, s, 13, i === 3 ? "warn" : "text");
  });
}
function erp(u) {
  u.shell(["Visão da operação", "Pedidos", "Estoque", "Compras", "Financeiro"]);
  u.metrics([
    ["Pedidos em aberto", "128", "Visão operacional do período"],
    ["Itens disponíveis", "3.480", "Estoque físico registrado"],
    ["Compras em análise", "16", "Com responsáveis definidos"],
  ]);
  u.rect(1260, 215, 300, 133, "tint");
  u.text(1281, 248, "ATENÇÃO DA OPERAÇÃO", 11, "accent", 600);
  u.text(1281, 285, "8 itens para repor", 22, "text", 600);
  u.text(1281, 318, "Revisar planejamento  ↗", 13, "accent");
  u.rect(272, 374, 785, 302);
  u.heading(296, 415, "Pedidos por semana", "Entradas no período");
  u.chart(296, 451, 735, 204, [18, 32, 27, 44, 38, 53, 48, 62], {
    bars: true,
    max: 80,
    labels: ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8"],
  });
  u.rect(1080, 374, 480, 302);
  u.heading(1104, 415, "Status dos pedidos", "Distribuição atual");
  u.ring(1200, 554, 72, 0.64, "liberados");
  [
    ["Liberados", "82"],
    ["Em separação", "30"],
    ["Em análise", "16"],
  ].forEach(([a, b], i) => {
    u.dot(1320, 504 + i * 43);
    u.text(1334, 509 + i * 43, a, 14);
    u.text(1510, 509 + i * 43, b, 15, "text", 600);
  });
  u.heading(
    272,
    723,
    "Pedidos que precisam de acompanhamento",
    "Contexto, responsável e próxima ação",
  );
  u.table(
    272,
    773,
    1288,
    ["PEDIDO", "OPERAÇÃO", "RESPONSÁVEL", "PRAZO", "SITUAÇÃO"],
    [
      [
        "PC-1048",
        "Reposição de componentes",
        "Equipe de compras",
        "06 nov",
        "Em aprovação",
      ],
      [
        "PC-1049",
        "Materiais de embalagem",
        "Equipe de logística",
        "07 nov",
        "Em separação",
      ],
      [
        "PC-1050",
        "Insumos de manutenção",
        "Equipe de operação",
        "08 nov",
        "Em análise",
      ],
    ],
    [0, 0.13, 0.44, 0.68, 0.81],
  );
}
function kanban(u) {
  u.shell(["Pipeline", "Contatos", "Contas", "Atividades", "Relatórios"]);
  u.metrics([
    ["Pipeline em aberto", "R$ 284 mil", "23 oportunidades acompanhadas"],
    ["Propostas em negociação", "08", "Próximos contatos definidos"],
    ["Reuniões nesta semana", "06", "Organizadas por responsável"],
  ]);
  u.pill(1280, 234, "+ Nova oportunidade", "accent", 251);
  u.text(272, 401, "Negociações em andamento", 20, "text", 600);
  u.text(1274, 401, "Meu time  ⌄    Filtrar  ≡", 14);
  const cols = ["Qualificação", "Diagnóstico", "Proposta", "Negociação"];
  const names = [
    ["Nova operação", "Portal de serviços", "Gestão de pedidos"],
    ["Integração comercial", "Fluxo de compras"],
    ["Central de atendimento", "Painel financeiro", "Portal do cliente"],
    ["ERP personalizado", "Assistente de equipe"],
  ];
  cols.forEach((s, c) => {
    let x = 272 + c * 327;
    u.rect(x, 428, 307, 582, "inset");
    u.dot(x + 21, 458, 4, ["#8293b0", "#ae92e7", "#82b0ef", "#7fc6af"][c]);
    u.text(x + 35, 464, s, 15, "text", 600);
    u.text(x + 267, 464, String(names[c].length), 14);
    names[c].forEach((name, r) => {
      let y = 488 + r * 163;
      u.rect(x + 12, y, 283, 149);
      u.pill(
        x + 26,
        y + 14,
        ["Nova conta", "Em conversa", "Prioridade"][r % 3],
        "accent",
        132,
      );
      u.text(x + 26, y + 66, name, 16, "text", 500);
      u.text(
        x + 26,
        y + 94,
        "R$ " + [24, 42, 18, 36][(r + c) % 4] + ".000",
        14,
      );
      u.line(x + 26, y + 110, x + 267, y + 110);
      u.avatar(x + 42, y + 130, ["AC", "BL", "MP"][r]);
      u.text(
        x + 72,
        y + 135,
        ["Contato hoje", "Reunião · 07 nov", "Revisão · 09 nov"][r],
        12,
      );
    });
  });
}
function relationship(u) {
  u.shell([
    "Conta 360°",
    "Oportunidades",
    "Interações",
    "Documentos",
    "Próximas ações",
  ]);
  u.rect(272, 215, 388, 795);
  u.avatar(323, 267, "VN");
  u.text(355, 262, "Vértice Norte", 23, "text", 600);
  u.text(355, 288, "Conta de demonstração", 13);
  u.pill(296, 329, "Relacionamento ativo", "good", 235);
  [
    ["Segmento", "Serviços empresariais"],
    ["Responsável", "Equipe comercial"],
    ["Contato preferido", "E-mail profissional"],
    ["Próxima conversa", "10 nov · 14:00"],
  ].forEach(([a, b], i) => {
    u.text(298, 412 + i * 101, a, 13);
    u.text(298, 441 + i * 101, b, 16, "text", 500);
    u.line(298, 465 + i * 101, 633, 465 + i * 101);
  });
  u.heading(298, 873, "Oportunidade em foco");
  u.text(298, 911, "Integração da operação", 16, "text");
  u.text(298, 943, "Diagnóstico · Próxima revisão definida", 13);
  u.rect(685, 215, 875, 476);
  u.heading(
    710,
    257,
    "Linha do tempo do relacionamento",
    "Decisões e contexto para toda a equipe",
  );
  let events = [
    [
      "Hoje · 09:30",
      "Revisão do diagnóstico",
      "Escopo inicial compartilhado para avaliação.",
    ],
    [
      "04 nov · 15:00",
      "Conversa com a operação",
      "Prioridades e pontos de atenção registrados.",
    ],
    [
      "02 nov · 10:20",
      "Documentos recebidos",
      "Materiais organizados no espaço da conta.",
    ],
    [
      "30 out · 14:00",
      "Primeiro contato",
      "Desafio e próximos passos alinhados.",
    ],
  ];
  u.line(727, 327, 727, 622, "line", 2);
  events.forEach(([a, b, c], i) => {
    let y = 327 + i * 91;
    u.dot(727, y, 6, "accent");
    u.text(750, y + 4, a, 12, "soft");
    u.text(750, y + 30, b, 16, "text", 500);
    u.text(750, y + 55, c, 14);
  });
  u.heading(685, 739, "Próximos passos", "Responsabilidades compartilhadas");
  u.task(
    685,
    789,
    425,
    "Revisar proposta de diagnóstico",
    "Comercial · Até 08 nov",
    "Aguardando retorno",
  );
  u.task(
    1134,
    789,
    426,
    "Preparar conversa técnica",
    "Engenharia · Até 10 nov",
    "Planejado",
  );
  u.rect(685, 906, 875, 104, "tint");
  u.text(709, 940, "CONTEXTO COMPARTILHADO", 11, "accent", 600);
  u.text(
    709,
    976,
    "Prioridade: reduzir etapas manuais entre atendimento e operação.",
    16,
    "text",
  );
}
function inbox(u) {
  u.shell([
    "Caixa de entrada",
    "Equipe",
    "Respostas",
    "Automações",
    "Indicadores",
  ]);
  u.rect(272, 215, 365, 795);
  u.text(294, 251, "Conversas", 20, "text", 600);
  u.pill(510, 231, "12 abertas", "accent", 106);
  u.rect(291, 279, 327, 41, "inset", 9);
  u.text(306, 306, "⌕  Buscar conversa", 14);
  [
    ["Ana Costa", "Pode confirmar o prazo?", "Agora"],
    ["Bruno Lima", "Obrigada pelo retorno.", "09:42"],
    ["Marina Alves", "Enviei o documento.", "09:35"],
    ["Rafael Souza", "Preciso de ajuda no pedido.", "09:22"],
    ["Carla Dias", "Podemos agendar?", "09:10"],
    ["Paulo Ribeiro", "Tudo certo por aqui.", "Ontem"],
  ].forEach(([a, b, c], i) => {
    let y = 340 + i * 100;
    if (!i) u.rect(282, y, 345, 92, "tint", 9, "tint");
    u.avatar(
      313,
      y + 38,
      a
        .split(" ")
        .map((s) => s[0])
        .join(""),
    );
    u.text(344, y + 30, a, 15, "text", 600);
    u.text(344, y + 53, b, 12);
    u.text(344, y + 74, c, 11, "soft");
  });
  u.rect(659, 215, 582, 795);
  u.avatar(693, 251, "AC");
  u.text(724, 247, "Ana Costa", 17, "text", 600);
  u.text(724, 269, "Atendimento · Equipe comercial", 12);
  u.line(659, 291, 1241, 291);
  u.pill(853, 310, "Hoje · 06 novembro", "accent", 190);
  u.rect(682, 368, 398, 103, "inset", 15);
  u.text(703, 399, "Olá! Gostaria de acompanhar", 16, "text");
  u.text(703, 424, "a entrega do meu pedido.", 16, "text");
  u.text(1022, 451, "09:45", 11, "soft");
  u.rect(797, 493, 422, 126, "tint", 15, "tint");
  u.text(818, 525, "Olá, Ana! Vou verificar o status", 16, "text");
  u.text(818, 552, "do pedido e confirmar o próximo", 16, "text");
  u.text(818, 579, "passo com a equipe responsável.", 16, "text");
  u.text(1151, 603, "09:46 ✓", 11, "accent");
  u.rect(682, 643, 398, 96, "inset", 15);
  u.text(703, 675, "Perfeito, obrigada!", 16, "text");
  u.text(703, 705, "Pode confirmar o prazo?", 16, "text");
  u.rect(681, 788, 538, 91, "tint");
  u.text(701, 817, "✧  Sugestão para revisar", 13, "accent", 600);
  u.text(701, 849, "Consultar pedido e confirmar previsão.", 14);
  u.rect(681, 911, 538, 72, "inset");
  u.text(703, 953, "Escreva uma resposta...", 15);
  u.dot(1185, 947, 18, "accent");
  u.text(1179, 952, "↑", 17, "side", 600);
  u.rect(1263, 215, 297, 795);
  u.heading(1283, 254, "Contexto");
  [
    ["Fila", "Comercial"],
    ["Responsável", "Equipe de atendimento"],
    ["Pedido", "PED-1048"],
    ["Situação", "Em acompanhamento"],
  ].forEach(([a, b], i) => {
    u.text(1283, 314 + i * 85, a, 12);
    u.text(1283, 343 + i * 85, b, 14, "text", 500);
  });
  u.line(1284, 650, 1539, 650);
  u.heading(1283, 690, "Próxima ação");
  u.text(1283, 726, "Confirmar prazo com a", 14);
  u.text(1283, 751, "operação antes de responder.", 14);
  u.pill(1283, 802, "Atribuir à equipe", "accent", 252);
  u.pill(1283, 852, "Ver histórico", "accent", 252);
}
function flow(u, kind) {
  const isWA = kind === "wa",
    isAI = kind === "ai";
  u.shell([
    isWA ? "Jornadas" : isAI ? "Agentes e fluxos" : "Fluxos",
    "Execuções",
    "Conexões",
    "Revisões",
    "Configurações",
  ]);
  u.rect(272, 215, 1288, 58);
  u.text(
    294,
    251,
    isWA
      ? "Jornada de atendimento"
      : isAI
        ? "Análise de solicitação com IA"
        : "Aprovação de compras",
    17,
    "text",
    600,
  );
  u.text(855, 251, "Editor    Execuções    Histórico", 14);
  u.pill(1332, 230, "✓ Revisão salva", "good", 205);
  u.rect(272, 296, 894, 714, "inset");
  u.rect(273, 297, 892, 712, "url(#dots)", 14, "none");
  u.pill(
    294,
    315,
    isWA
      ? "WhatsApp · Jornada"
      : isAI
        ? "Orquestração de agentes"
        : "Processo · Compras",
    "accent",
    246,
  );
  const title = isWA
    ? [
        "Nova mensagem",
        "Identificar intenção",
        "Consultar pedido",
        "Falar com a equipe",
        "Registrar atendimento",
      ]
    : isAI
      ? [
          "Solicitação recebida",
          "Agente de análise",
          "Consultar dados",
          "Revisão humana",
          "Preparar resposta",
        ]
      : [
          "Nova solicitação",
          "Validar alçada",
          "Aprovar compra",
          "Revisar solicitação",
          "Atualizar ERP",
        ];
  u.path(
    "M719 455 V491 M719 582 V612 H502 V656 M719 612 H930 V656 M502 747 V793 H719 V833 M930 747 V793 H719",
    "accent",
    2,
  );
  u.node(
    563,
    364,
    312,
    title[0],
    isWA
      ? "Gatilho · Canal conectado"
      : isAI
        ? "Entrada · Contexto autorizado"
        : "Formulário · Pedido de compra",
    2,
  );
  u.node(
    563,
    491,
    312,
    title[1],
    isWA
      ? "Condição · Tipo de atendimento"
      : isAI
        ? "IA · Ferramentas com permissão"
        : "Regra · Valor e centro de custo",
    5,
  );
  u.pill(419, 613, isAI ? "Com evidências" : "Regra atendida", "good", 174);
  u.pill(
    846,
    613,
    isAI ? "Requer aprovação" : "Precisa de revisão",
    "warn",
    187,
  );
  u.node(
    349,
    656,
    306,
    title[2],
    isAI ? "Ferramenta · Somente leitura" : "Integração · Sistema conectado",
    1,
  );
  u.node(
    777,
    656,
    306,
    title[3],
    isAI ? "Pessoa · Validar decisão" : "Equipe · Responsável definido",
    4,
  );
  u.node(563, 833, 312, title[4], "Saída · Histórico registrado", 3);
  u.pill(295, 955, "−   100%   +", "accent", 154);
  u.text(927, 978, "Ajustar ao fluxo  ⤢", 12);
  u.rect(1188, 296, 372, 714);
  u.heading(
    1212,
    337,
    isAI ? "Permissões do agente" : "Detalhes da etapa",
    "Configuração do fluxo",
  );
  [
    ["Nome da etapa", title[1]],
    ["Responsável", isAI ? "Agente de operações" : "Equipe de operação"],
    ["Modo de execução", isAI ? "Supervisionado" : "Por evento"],
  ].forEach(([a, b], i) => {
    let y = 398 + i * 105;
    u.text(1212, y, a, 13);
    u.rect(1211, y + 15, 324, 48, "inset", 9);
    u.text(1227, y + 45, b, 14, "text");
  });
  u.line(1212, 719, 1535, 719);
  u.heading(1212, 760, "Critérios de continuidade");
  [
    isAI ? "Dados permitidos por usuário" : "Campos obrigatórios validados",
    isAI ? "Fontes registradas no histórico" : "Responsável atribuído",
    isAI ? "Ações sensíveis com aprovação" : "Falhas encaminhadas à equipe",
  ].forEach((s, i) => {
    u.dot(1218, 806 + i * 43, 4, "good");
    u.text(1232, 811 + i * 43, s, 12, "text");
  });
  u.pill(1212, 949, "Testar fluxo  ↗", "accent", 323);
}
function prediction(u) {
  u.shell([
    "Previsão de demanda",
    "Modelos",
    "Fontes de dados",
    "Validação",
    "Cenários",
  ]);
  u.metrics([
    ["Demanda projetada", "1.840 un.", "Horizonte de 30 dias"],
    ["Erro médio absoluto", "42 un.", "Validação temporal"],
    ["Último treinamento", "05 nov", "Janela de 12 meses"],
  ]);
  u.rect(1260, 215, 300, 133);
  u.text(1281, 247, "CENÁRIO ATIVO", 11, "accent", 600);
  u.text(1281, 285, "Planejamento base", 21, "text", 600);
  u.text(1281, 317, "Alterar premissas  ↗", 13, "accent");
  u.rect(272, 374, 1288, 370);
  u.heading(
    296,
    416,
    "Histórico e projeção de demanda",
    "Unidades por semana · Faixa de previsão de 80%",
  );
  let c = u.chart(
    296,
    459,
    1228,
    258,
    [100, 124, 117, 141, 136, 162, 154, 171, 185, 182, 194, 211],
    {
      max: 260,
      observedUntil: 7,
      labels: ["Ago", "Set", "Out", "Nov", "Dez", "Jan"],
    },
  );
  let px = c.pts[7][0];
  u.line(px, c.top, px, c.base, "soft", 1, "5 5");
  u.text(px + 10, c.top + 13, "Projeção →", 12, "accent");
  let pp = c.pts.slice(7),
    band =
      pp
        .map(([x, y], i) => (i ? "L" : "M") + x + " " + (y - 18 - i * 6))
        .join(" ") +
      pp
        .toReversed()
        .map(([x, y], i) => "L" + x + " " + (y + 35 - i * 6))
        .join(" ") +
      "Z";
  u.path(band, "none", 0, "url(#wash)");
  u.path(
    pp.map(([x, y], i) => (i ? "L" : "M") + x + " " + y).join(" "),
    "accent",
    3,
    "none",
    "6 6",
  );
  u.rect(272, 768, 623, 242);
  u.heading(296, 808, "Variáveis consideradas", "Fatores usados no cenário");
  [
    ["Histórico de pedidos", 0.9],
    ["Sazonalidade", 0.68],
    ["Calendário comercial", 0.47],
  ].forEach(([s, v], i) => {
    let y = 855 + i * 44;
    u.text(297, y, s, 13);
    u.progress(545, y - 9, 320, v);
  });
  u.rect(919, 768, 641, 242);
  u.heading(
    943,
    808,
    "Como interpretar",
    "Previsão apoia decisões; não elimina incerteza.",
  );
  u.text(
    944,
    878,
    "Compare cenários e acompanhe o erro ao longo do tempo.",
    15,
    "text",
  );
  u.text(
    944,
    916,
    "Mudanças no processo podem exigir recalibrar o modelo.",
    14,
  );
  u.pill(944, 951, "Ver validação temporal", "accent", 272);
}
function process(u) {
  u.shell(["Desempenho", "Etapas", "Ocorrências", "Melhorias", "Relatórios"]);
  u.metrics([
    ["Tempo mediano de ciclo", "2,4 dias", "Pedidos concluídos no período"],
    ["Casos analisados", "1.284", "Recorte dos últimos 30 dias"],
    [
      "Etapa com maior espera",
      "Aprovação",
      "Revisar distribuição de responsáveis",
    ],
  ]);
  u.rect(1260, 215, 300, 133, "tint");
  u.text(1281, 247, "RECORTE DA ANÁLISE", 11, "accent", 600);
  u.text(1281, 284, "Pedidos de compra", 21, "text", 600);
  u.text(1281, 317, "01 out a 31 out · Todos os times", 12);
  u.rect(272, 374, 781, 360);
  u.heading(
    296,
    414,
    "Onde o processo espera",
    "Tempo mediano por etapa · Horas",
  );
  [
    ["Solicitação", 8],
    ["Validação", 12],
    ["Aprovação", 29],
    ["Conclusão", 9],
  ].forEach(([s, v], i) => {
    let y = 482 + i * 57;
    u.text(297, y, s, 14);
    u.rect(
      445,
      y - 19,
      v * 16,
      27,
      i === 2 ? "accent" : "tint",
      5,
      i === 2 ? "accent" : "tint",
    );
    u.text(461 + v * 16, y, v + " h", 13, i === 2 ? "accent" : "text", 600);
  });
  u.rect(1077, 374, 483, 360);
  u.heading(
    1101,
    414,
    "Distribuição do tempo de ciclo",
    "Casos concluídos · Quantidade",
  );
  u.chart(1100, 457, 435, 251, [24, 80, 125, 91, 52, 30, 11], {
    bars: true,
    max: 150,
    labels: ["<1d", "1d", "2d", "3d", "4d", "5d", "6d+"],
  });
  u.heading(
    272,
    783,
    "Oportunidades para investigar",
    "Defina responsáveis e acompanhe a mudança",
  );
  u.task(
    272,
    833,
    412,
    "Revisar alçadas de aprovação",
    "Operação · Diagnóstico",
    "Prioridade alta",
  );
  u.task(
    708,
    833,
    412,
    "Distribuir solicitações por equipe",
    "Gestão · Validação",
    "Em avaliação",
  );
  u.task(
    1144,
    833,
    416,
    "Medir o tempo após a mudança",
    "Dados · Acompanhamento",
    "Planejado",
  );
  u.text(
    273,
    984,
    "Os indicadores descrevem o recorte analisado. Valide causas com as pessoas que participam do processo.",
    14,
  );
}
function people(u) {
  u.shell([
    "Equipes",
    "Pessoas",
    "Disponibilidade",
    "Desenvolvimento",
    "Calendário",
  ]);
  u.metrics([
    ["Pessoas na organização", "84", "6 equipes conectadas"],
    ["Planos de desenvolvimento", "32", "Acompanhamento em andamento"],
    ["Conversas agendadas", "18", "Próximas duas semanas"],
  ]);
  u.pill(1280, 234, "+ Adicionar pessoa", "accent", 251);
  u.rect(272, 374, 1288, 87);
  u.text(295, 411, "Todas as equipes", 19, "text", 600);
  u.text(295, 438, "Pessoas, especialidades e próximos passos", 14);
  u.pill(1246, 399, "Buscar pessoa  ⌕", "accent", 286);
  const names = [
    "Ana Costa",
    "Bruno Lima",
    "Marina Alves",
    "Rafael Souza",
    "Carla Dias",
    "Paulo Ribeiro",
  ];
  const roles = [
    "Produto e experiência",
    "Engenharia de software",
    "Dados e inteligência",
    "Operação e processos",
    "Relacionamento",
    "Qualidade e entrega",
  ];
  names.forEach((n, i) => {
    let x = 272 + (i % 3) * 437,
      y = 485 + Math.floor(i / 3) * 263;
    u.rect(x, y, 414, 239);
    u.avatar(
      x + 44,
      y + 46,
      n
        .split(" ")
        .map((s) => s[0])
        .join(""),
    );
    u.text(x + 75, y + 42, n, 18, "text", 600);
    u.text(x + 75, y + 66, roles[i], 13);
    u.line(x + 22, y + 90, x + 391, y + 90);
    u.text(x + 22, y + 119, "DESENVOLVIMENTO", 11, "soft", 600);
    u.text(
      x + 22,
      y + 147,
      [
        "Liderança de projetos",
        "Arquitetura de sistemas",
        "Modelos e avaliação",
        "Melhoria contínua",
        "Experiência do cliente",
        "Validação de entregas",
      ][i],
      15,
      "text",
    );
    u.progress(x + 23, y + 167, 366, [0.6, 0.8, 0.45, 0.7, 0.55, 0.9][i]);
    u.dot(x + 27, y + 204, 4, "good");
    u.text(x + 40, y + 209, "Disponível nesta semana", 12);
    u.text(x + 296, y + 209, "Ver perfil ↗", 12, "accent");
  });
}
function finance(u) {
  u.shell([
    "Faturamento",
    "Recebimentos",
    "Contas a pagar",
    "Categorias",
    "Relatórios",
  ]);
  u.metrics([
    ["Faturado no mês", "R$ 248 mil", "Competência: novembro"],
    ["Recebido no mês", "R$ 196 mil", "Entradas efetivamente registradas"],
    ["A receber", "R$ 52 mil", "Vencimentos acompanhados"],
  ]);
  u.rect(1260, 215, 300, 133, "tint");
  u.text(1281, 248, "PERÍODO DE ANÁLISE", 11, "accent", 600);
  u.text(1281, 285, "Novembro 2026", 23, "text", 600);
  u.text(1281, 318, "Selecionar período  ⌄", 13, "accent");
  u.rect(272, 374, 799, 347);
  u.heading(296, 415, "Evolução do faturamento", "R$ mil · Competência mensal");
  u.chart(295, 455, 748, 243, [142, 169, 156, 193, 217, 248], {
    max: 300,
    bars: true,
  });
  u.rect(1095, 374, 465, 347);
  u.heading(1119, 415, "Composição da receita", "Por categoria de serviço");
  u.ring(1220, 568, 75, 0.62, "recorrente");
  [
    ["Recorrente", "62%"],
    ["Projetos", "28%"],
    ["Outros", "10%"],
  ].forEach(([s, v], i) => {
    u.dot(1330, 513 + i * 45);
    u.text(1343, 518 + i * 45, s, 13);
    u.text(1498, 518 + i * 45, v, 14, "text", 600);
  });
  u.heading(272, 767, "Recebimentos para acompanhar");
  u.table(
    272,
    803,
    1288,
    ["DOCUMENTO", "CATEGORIA", "VENCIMENTO", "VALOR", "SITUAÇÃO"],
    [
      ["NF-2084", "Projeto sob medida", "10 nov", "R$ 18.000", "A receber"],
      ["NF-2085", "Serviço recorrente", "12 nov", "R$ 12.000", "A receber"],
      ["NF-2086", "Integração de sistemas", "15 nov", "R$ 22.000", "A receber"],
    ],
    [0, 0.17, 0.45, 0.65, 0.82],
  );
}
function executive(u) {
  u.shell(["Visão executiva", "Indicadores", "Metas", "Áreas", "Prioridades"]);
  u.metrics([
    ["Receita do período", "R$ 248 mil", "Competência mensal"],
    ["Pedidos concluídos", "312", "Operação · Últimos 30 dias"],
    ["Satisfação no atendimento", "4,7 / 5", "Pesquisa de demonstração"],
  ]);
  u.rect(1260, 215, 300, 133, "tint");
  u.text(1281, 248, "VISÃO DA GESTÃO", 11, "accent", 600);
  u.text(1281, 285, "Novembro", 25, "text", 600);
  u.text(1281, 318, "Todas as áreas  ⌄", 14, "accent");
  u.rect(272, 374, 771, 361);
  u.heading(296, 415, "Evolução do negócio", "Receita mensal · R$ mil");
  u.chart(296, 460, 720, 246, [120, 135, 133, 171, 181, 205, 213, 248], {
    max: 300,
  });
  u.rect(1067, 374, 493, 361);
  u.heading(1091, 415, "Metas em acompanhamento", "Avanço registrado por área");
  [
    ["Operação", 0.78, "78%"],
    ["Relacionamento", 0.91, "91%"],
    ["Novos projetos", 0.64, "64%"],
    ["Qualidade", 0.86, "86%"],
  ].forEach(([s, v, l], i) => {
    let y = 482 + i * 57;
    u.text(1092, y, s, 14, "text");
    u.text(1493, y, l, 14, "accent", 600);
    u.progress(1092, y + 14, 435, v);
  });
  u.rect(272, 759, 436, 251, "tint");
  u.text(296, 797, "FOCO DA SEMANA", 11, "accent", 600);
  u.text(296, 837, "Priorizar o que move", 25, "text", 600);
  u.text(296, 871, "a operação.", 25, "text", 600);
  u.text(296, 923, "Revisão de indicadores com cada área.", 14);
  u.text(296, 970, "Abrir pauta da gestão  ↗", 14, "accent");
  u.rect(732, 759, 828, 251);
  u.heading(756, 799, "Decisões e próximos passos");
  [
    ["Revisar capacidade da equipe", "Operação", "08 nov"],
    ["Acompanhar entregas do trimestre", "Projetos", "10 nov"],
    ["Validar nova integração comercial", "Tecnologia", "12 nov"],
  ].forEach(([s, a, b], i) => {
    let y = 848 + i * 52;
    u.dot(761, y, 4);
    u.text(775, y + 5, s, 15, "text");
    u.text(1281, y + 5, a, 13);
    u.text(1485, y + 5, b, 12);
    if (i < 2) u.line(756, y + 23, 1535, y + 23);
  });
}
function projects(u) {
  u.shell(["Cronograma", "Entregas", "Equipe", "Decisões", "Documentos"]);
  u.rect(272, 215, 1288, 118);
  u.heading(
    296,
    253,
    "Portal de operações",
    "Projeto · Visão compartilhada com o cliente",
  );
  u.pill(1160, 239, "Em desenvolvimento", "accent", 253);
  u.text(296, 311, "Visão geral     Cronograma     Revisões     Arquivos", 14);
  u.text(1370, 311, "Equipe  +5", 13);
  u.rect(272, 358, 1288, 408);
  u.heading(
    296,
    398,
    "Cronograma de entregas",
    "Marcos e dependências do projeto",
  );
  const x0 = 639,
    cols = ["02 nov", "09 nov", "16 nov", "23 nov", "30 nov", "07 dez"];
  cols.forEach((s, i) => {
    u.text(x0 + i * 147, 448, s, 12, "soft");
    u.line(x0 + i * 147, 464, x0 + i * 147, 735, "line", 1, "4 6");
  });
  let tasks = [
    ["Descoberta e contexto", 0, 1.2],
    ["Protótipo navegável", 0.6, 1.6],
    ["Desenvolvimento do MVP", 1.5, 2.5],
    ["Validação com a equipe", 3.5, 1.3],
    ["Piloto acompanhado", 4.2, 1.6],
  ];
  tasks.forEach(([s, a, b], i) => {
    let y = 481 + i * 49;
    u.text(296, y + 20, s, 15, "text");
    u.rect(
      x0 + a * 132,
      y,
      b * 132,
      29,
      i < 2 ? "tint" : "accent",
      6,
      i < 2 ? "tint" : "accent",
    );
    u.text(
      x0 + a * 132 + 10,
      y + 20,
      i < 2 ? "Validado" : "Em acompanhamento",
      11,
      i < 2 ? "accent" : "bg",
      500,
    );
  });
  u.line(885, 464, 885, 735, "good", 2);
  u.pill(851, 721, "Hoje", "good", 68);
  u.heading(
    272,
    812,
    "Próxima revisão · Sexta-feira, 14:00",
    "Entregas e decisões para acompanhar de perto",
  );
  u.task(
    272,
    862,
    412,
    "Validar navegação do portal",
    "Cliente e produto",
    "Prévia disponível",
  );
  u.task(
    708,
    862,
    412,
    "Revisar regras de aprovação",
    "Operação e engenharia",
    "Decisão em conjunto",
  );
  u.task(
    1144,
    862,
    416,
    "Preparar cenário do piloto",
    "Qualidade e implantação",
    "Planejado",
  );
}
function logistics(u) {
  u.shell([
    "Rotas e entregas",
    "Pedidos",
    "Ocorrências",
    "Equipe",
    "Relatórios",
  ]);
  u.metric(272, 215, 310, "Entregas do dia", "48", "Rotas planejadas");
  u.metric(601, 215, 310, "Em trânsito", "21", "Acompanhadas pela operação");
  u.metric(930, 215, 310, "Concluídas", "24", "Confirmações registradas");
  u.rect(1260, 215, 300, 133, "tint");
  u.text(1281, 247, "ATENÇÃO DA EQUIPE", 11, "accent", 600);
  u.text(1281, 285, "3 ocorrências", 23, "text", 600);
  u.text(1281, 317, "Verificar contexto  ↗", 13, "accent");
  u.rect(272, 374, 790, 636, "inset");
  u.rect(273, 375, 788, 634, "url(#dots)", 14, "none");
  u.heading(
    297,
    416,
    "Rotas em acompanhamento",
    "Esquema da operação · Pontos de entrega",
  );
  const roads = [
    "M300 606L1009 441",
    "M314 859L1004 667",
    "M401 467L697 983",
    "M714 466L928 980",
    "M295 752L1024 547",
    "M295 943L1019 787",
  ];
  roads.forEach((d) => u.path(d, "line", 16));
  u.path("M372 900 Q402 795 538 755 T685 629 T927 503", "accent", 5);
  const points = [
    [372, 900, "Base"],
    [538, 755, "Ponto 01"],
    [685, 629, "Ponto 02"],
    [927, 503, "Ponto 03"],
  ];
  points.forEach(([x, y, s], i) => {
    u.dot(x, y, 13, "panel");
    u.dot(x, y, 7, i === 3 ? "warn" : "accent");
    u.pill(x - 41, y - 49, s, "accent", 101);
  });
  u.pill(797, 940, "Rota A · 4 paradas", "accent", 226);
  u.rect(1086, 374, 474, 636);
  u.heading(1110, 416, "Entregas da rota", "Acompanhamento por pedido");
  [
    ["PED-1041", "Concluído", "09:30"],
    ["PED-1042", "Concluído", "10:10"],
    ["PED-1043", "Em trânsito", "11:00"],
    ["PED-1044", "Janela prevista", "14:00"],
  ].forEach(([s, a, b], i) => {
    let y = 486 + i * 112;
    u.dot(1120, y, 5, i < 2 ? "good" : "accent");
    u.text(1141, y + 5, s, 16, "text", 600);
    u.text(1141, y + 33, a, 14);
    u.text(1471, y + 5, b, 14, "text");
    if (i < 3) u.line(1120, y + 52, 1528, y + 52);
  });
  u.rect(1108, 929, 430, 58, "tint", 10, "tint");
  u.text(1126, 964, "Ocorrências com responsável definido  ↗", 14, "accent");
}
function monitoring(u) {
  u.shell(["Serviços", "Execuções", "Incidentes", "Alertas", "Conexões"]);
  u.metrics([
    ["Serviços monitorados", "12", "Inventário da operação"],
    ["Latência mediana", "148 ms", "Última hora"],
    ["Incidentes abertos", "01", "Em acompanhamento"],
  ]);
  u.rect(1260, 215, 300, 133, "tint");
  u.dot(1286, 247, 5, "good");
  u.text(1300, 252, "COLETA ATIVA", 11, "good", 600);
  u.text(1281, 288, "Atualizado há 1 min", 20, "text", 600);
  u.text(1281, 318, "Ver fontes conectadas  ↗", 13, "accent");
  u.rect(272, 374, 811, 336);
  u.heading(
    296,
    415,
    "Latência das integrações",
    "Milissegundos · Últimos 60 minutos",
  );
  u.chart(
    296,
    457,
    761,
    230,
    [140, 154, 130, 146, 160, 198, 169, 150, 138, 152, 143, 148],
    { max: 250, labels: ["09:00", "09:15", "09:30", "09:45", "10:00"] },
  );
  u.rect(1107, 374, 453, 336);
  u.heading(1131, 415, "Estado dos serviços");
  [
    ["API de pedidos", "Operacional"],
    ["Fila de mensagens", "Operacional"],
    ["Conector ERP", "Em atenção"],
    ["Portal da equipe", "Operacional"],
  ].forEach(([s, v], i) => {
    let y = 478 + i * 55;
    u.dot(1137, y, 4, i === 2 ? "warn" : "good");
    u.text(1152, y + 5, s, 14, "text");
    u.text(1423, y + 5, v, 12, i === 2 ? "warn" : "good");
  });
  u.heading(
    272,
    757,
    "Execuções recentes",
    "Resultado e contexto para investigar",
  );
  u.table(
    272,
    802,
    1288,
    ["EXECUÇÃO", "INTEGRAÇÃO", "INÍCIO", "DURAÇÃO", "RESULTADO"],
    [
      [
        "RUN-8421",
        "Sincronização de pedidos",
        "10:02:14",
        "1,2 s",
        "Concluída",
      ],
      ["RUN-8420", "Conector de estoque", "10:01:58", "8,4 s", "Em revisão"],
      ["RUN-8419", "Notificações da equipe", "10:01:31", "0,8 s", "Concluída"],
    ],
    [0, 0.16, 0.49, 0.68, 0.81],
  );
}
function documents(u) {
  u.shell(["Assistente", "Documentos", "Coleções", "Fontes", "Permissões"]);
  u.rect(272, 215, 356, 795);
  u.heading(
    296,
    255,
    "Conhecimento da equipe",
    "Fontes disponíveis para sua permissão",
  );
  u.rect(292, 295, 316, 40, "inset", 9);
  u.text(307, 321, "⌕  Buscar documento", 14);
  [
    ["Manual de operação", "PDF · Operações"],
    ["Política de compras", "PDF · Administrativo"],
    ["Guia de atendimento", "DOC · Relacionamento"],
    ["Catálogo de serviços", "PDF · Comercial"],
  ].forEach(([s, t], i) => {
    let y = 359 + i * 114;
    u.rect(290, y, 320, 97, i === 1 ? "tint" : "panel", 10);
    u.icon(305, y + 19, 4, "accent");
    u.text(336, y + 32, s, 15, "text", 500);
    u.text(307, y + 62, t, 13);
    u.text(307, y + 82, "Acesso autorizado", 11, "good");
  });
  u.rect(292, 882, 316, 99, "inset");
  u.text(310, 914, "Suas permissões são respeitadas.", 13, "text", 500);
  u.text(310, 943, "Fontes restritas ficam fora da resposta.", 12);
  u.rect(651, 215, 909, 795);
  u.heading(
    677,
    255,
    "Assistente de documentos",
    "Consulte o contexto. Confira as referências.",
  );
  u.line(652, 290, 1559, 290);
  u.rect(863, 329, 667, 84, "tint");
  u.text(885, 362, "Qual é o fluxo para aprovar uma compra?", 18, "text", 500);
  u.text(885, 389, "Considerando a política disponível para minha equipe.", 14);
  u.icon(682, 448, 5, "accent");
  u.text(
    714,
    465,
    "Veja as etapas previstas na política de compras:",
    18,
    "text",
    500,
  );
  [
    [
      "1",
      "Registrar a solicitação",
      "Informe os itens, a justificativa e o centro de custo.",
    ],
    [
      "2",
      "Validar as informações",
      "A área responsável confere o pedido e a documentação.",
    ],
    [
      "3",
      "Encaminhar para aprovação",
      "O responsável avalia conforme a alçada aplicável.",
    ],
  ].forEach(([n, t, s], i) => {
    let y = 506 + i * 93;
    u.dot(700, y + 14, 16, "tint");
    u.text(696, y + 19, n, 13, "accent", 600);
    u.text(730, y + 13, t, 16, "text", 600);
    u.text(730, y + 40, s, 14);
  });
  u.rect(679, 806, 851, 72, "inset", 11);
  u.icon(695, 829, 4);
  u.text(727, 834, "Política de compras · Seção 3", 14, "text", 500);
  u.text(727, 859, "Referência consultável · Abrir documento  ↗", 12, "accent");
  u.rect(679, 914, 851, 68, "inset");
  u.text(700, 954, "Faça uma pergunta sobre os documentos...", 16);
  u.dot(1496, 948, 18, "accent");
  u.text(1490, 954, "↑", 18, "side", 600);
}
function portal(u) {
  u.shell([
    "Meu projeto",
    "Entregas",
    "Documentos",
    "Solicitações",
    "Decisões",
  ]);
  u.rect(272, 215, 1288, 186, "tint");
  u.text(300, 255, "BEM-VINDO AO SEU ESPAÇO", 11, "accent", 600);
  u.text(300, 302, "Vamos acompanhar a próxima entrega?", 32, "text", 600);
  u.text(
    300,
    337,
    "Portal de operações · Desenvolvimento acompanhado com sua equipe.",
    16,
  );
  u.pill(300, 356, "Revisão semanal · Sex, 14:00", "accent", 323);
  u.ring(1450, 307, 59, 0.68, "do plano");
  u.rect(272, 425, 810, 329);
  u.heading(
    296,
    465,
    "Próximas entregas",
    "Acompanhe, teste e participe das decisões",
  );
  [
    ["Navegação e estrutura", "Prévia disponível", "08 nov"],
    ["Fluxo de aprovações", "Em desenvolvimento", "15 nov"],
    ["Primeiro piloto", "Planejado", "22 nov"],
  ].forEach(([t, s, d], i) => {
    let y = 527 + i * 79;
    u.dot(304, y, 5, i ? "accent" : "good");
    u.text(323, y + 4, t, 17, "text", 500);
    u.text(323, y + 31, s, 13, i ? "muted" : "good");
    u.text(987, y + 4, d, 13);
    if (i < 2) u.line(296, y + 49, 1057, y + 49);
  });
  u.rect(1106, 425, 454, 329);
  u.heading(
    1130,
    465,
    "Precisamos da sua participação",
    "Duas decisões para seguir",
  );
  u.task(
    1126,
    508,
    413,
    "Validar a navegação",
    "Cliente e produto",
    "Prévia para testar",
  );
  u.task(
    1126,
    626,
    413,
    "Confirmar responsáveis",
    "Operação",
    "Revisão em conjunto",
  );
  u.heading(272, 805, "Tudo organizado para o seu projeto");
  [
    ["Documentos", "Escopo e materiais compartilhados", "Abrir documentos  ↗"],
    ["Últimas decisões", "Contexto e acordos registrados", "Ver decisões  ↗"],
    [
      "Fale com a equipe",
      "Converse sobre o próximo passo",
      "Enviar solicitação  ↗",
    ],
  ].forEach(([a, b, c], i) => {
    let x = 272 + i * 437;
    u.rect(x, 842, 414, 168);
    u.icon(x + 22, 864, i + 2, "accent");
    u.text(x + 22, 913, a, 20, "text", 600);
    u.text(x + 22, 940, b, 13);
    u.text(x + 22, 980, c, 13, "accent");
  });
}

const renderers = [
  calendar,
  website,
  erpConfig,
  erp,
  kanban,
  relationship,
  inbox,
  (u) => flow(u, "wa"),
  (u) => flow(u, "process"),
  (u) => flow(u, "ai"),
  prediction,
  process,
  people,
  finance,
  executive,
  projects,
  logistics,
  monitoring,
  documents,
  portal,
  ...engineeringRenderers,
];
const thumbnails = [];
for (let i = 0; i < screens.length; i++) {
  const m = screens[i],
    u = new UI(m, i);
  renderers[i](u);
  const svg = u.finish();
  const base = `${out}/eyelid-${m.slug}`;
  await writeFile(base + ".svg", svg);
  const raster = await sharp(Buffer.from(svg)).png().toBuffer();
  await writeFile(base + ".png", raster);
  await sharp(raster)
    .resize(800, 550)
    .webp({ quality: 88 })
    .toFile(base + ".webp");
  // Letterbox preserves every part of the interface in a 1200x630 sharing card.
  await sharp(raster)
    .resize(1200, 630, { fit: "contain", background: u.p.bg })
    .png()
    .toFile(base + "-social.png");
  const tile = await sharp(raster).resize(800, 550).png().toBuffer();
  thumbnails.push({
    input: tile,
    left: (i % 2) * 800,
    top: Math.floor((i % 4) / 2) * 550,
  });
  console.log(`${String(i + 1).padStart(2, "0")} ${m.title} · ${m.theme}`);
}
await mkdir("/tmp/eyelid-evidence", { recursive: true });
for (let g = 0; g < Math.ceil(screens.length / 4); g++)
  await sharp({
    create: { width: 1600, height: 1100, channels: 3, background: "#10151e" },
  })
    .composite(thumbnails.slice(g * 4, g * 4 + 4))
    .png()
    .toFile(`/tmp/eyelid-evidence/screens-${g + 1}.png`);
