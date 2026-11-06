/** Ten original industry concepts; all operational records are fictional. */
function top(u, nav, label) {
  u.shell(nav);
  u.rect(272, 215, 1288, 58);
  u.text(295, 251, label, 16, "text", 600);
  u.pill(1317, 230, "Cenário de projeto", "accent", 220);
}
function panel(u, title, subtitle) {
  u.rect(1224, 296, 336, 714);
  u.heading(1247, 338, title, subtitle);
}
function properties(u, rows, start = 411) {
  rows.forEach(([a, b], i) => {
    const y = start + i * 79;
    u.text(1248, y, a, 12);
    u.text(1248, y + 27, b, 16, "text", 500);
    u.line(1248, y + 47, 1535, y + 47);
  });
}
function status(u, x, y, label, color = "good") {
  u.dot(x, y - 4, 4, color);
  u.text(x + 13, y, label, 12, color, 500);
}
function machine(u, x, y, label, n) {
  u.rect(x, y, 177, 133);
  u.rect(x + 18, y + 20, 141, 65, "inset", 7);
  u.rect(x + 33, y + 33, 39, 33, "tint", 4, "accent");
  u.icon(x + 43, y + 40, n, "accent");
  for (let i = 0; i < 4; i++)
    u.line(x + 88, y + 34 + i * 9, x + 140, y + 34 + i * 9, "soft");
  u.text(x + 18, y + 112, label, 14, "text", 600);
}
function product(u, x, y, kind, scale = 1) {
  u.add(`<g transform="translate(${x} ${y}) scale(${scale})">`);
  if (kind % 3 === 0) {
    u.add(
      `<ellipse cx="0" cy="0" rx="47" ry="24" fill="${u.c("tint")}" stroke="${u.c("accent")}" stroke-width="2"/><ellipse cx="0" cy="0" rx="22" ry="11" fill="${u.c("panel")}" stroke="${u.c("accent")}"/>`,
    );
    for (let i = 0; i < 8; i++) {
      const a = (i * Math.PI) / 4;
      u.dot(Math.cos(a) * 35, Math.sin(a) * 16, 3, "accent");
    }
  } else if (kind % 3 === 1) {
    u.rect(-43, -25, 86, 51, "tint", 8, "accent");
    for (let i = 0; i < 5; i++)
      u.line(-31 + i * 15, -19, -31 + i * 15, 19, "accent");
    u.rect(43, -7, 28, 14, "inset", 3, "soft");
    u.rect(-52, -30, 12, 60, "inset", 3, "soft");
  } else {
    u.path(
      "M-43 22V-22H-12V-42H12V-22H43V22H12V42H-12V22Z",
      "accent",
      2,
      "tint",
    );
    u.dot(0, 0, 17, "panel");
    u.path("M-12 0H12 M0 -12V12", "accent", 2);
  }
  u.add("</g>");
}

function production(u) {
  top(
    u,
    [
      "Ordens e células",
      "Planejamento",
      "Apontamentos",
      "Ocorrências",
      "Qualidade",
    ],
    "Linha de montagem  /  Turno A",
  );
  u.rect(272, 296, 928, 714);
  u.heading(
    296,
    338,
    "Um fluxo. Cada etapa visível.",
    "Ordens de fabricação · Cenário de demonstração",
  );
  u.pill(978, 318, "Linha 01", "accent", 197);
  u.line(390, 492, 1078, 492, "accent", 3);
  ["Preparação", "Usinagem", "Montagem", "Inspeção"].forEach((s, i) => {
    let x = 299 + i * 222;
    machine(u, x, 416, s, i);
    status(
      u,
      x + 14,
      582,
      ["Lote preparado", "Em execução", "Aguardando lote", "Em conferência"][i],
      i === 2 ? "warn" : "good",
    );
    u.text(x + 14, 611, "OF-20" + (41 + i), 12);
  });
  u.line(296, 641, 1175, 641);
  u.heading(
    296,
    681,
    "Ordens para acompanhar",
    "Planejamento e apontamentos da equipe",
  );
  u.table(
    295,
    734,
    880,
    ["ORDEM", "PRODUTO / LOTE", "AVANÇO", "PRÓXIMA ETAPA"],
    [
      ["OF-2041", "Conjunto A · 120 peças", "72 / 120", "Montagem"],
      ["OF-2042", "Conjunto B · 80 peças", "24 / 80", "Usinagem"],
      ["OF-2043", "Conjunto C · 60 peças", "0 / 60", "Preparação"],
    ],
    [0, 0.18, 0.55, 0.74],
  );
  panel(u, "Ordem em foco", "OF-2041 · Conjunto A");
  properties(u, [
    ["Quantidade planejada", "120 peças"],
    ["Apontadas pela equipe", "72 peças"],
    ["Célula atual", "Montagem · C-03"],
    ["Próxima revisão", "Hoje, 14:00"],
  ]);
  u.ring(1387, 832, 60, 0.6, "do lote");
  u.pill(1247, 952, "Abrir apontamentos  ↗", "accent", 289);
}
function supervision(u) {
  top(
    u,
    [
      "Visão da instalação",
      "Equipamentos",
      "Tendências",
      "Ocorrências",
      "Histórico",
    ],
    "Circuito de utilidades  /  Visão operacional",
  );
  u.rect(272, 296, 928, 446, "inset");
  u.heading(
    296,
    338,
    "Circuito de água de processo",
    "Leituras ilustrativas · Instalação de demonstração",
  );
  u.rect(324, 418, 144, 171, "panel", 20, "accent");
  u.rect(331, 483, 130, 99, "tint", 12, "tint");
  u.line(335, 483, 458, 483, "accent", 2);
  u.text(347, 455, "RES-01", 17, "text", 600);
  u.text(352, 535, "64%", 29, "accent", 600);
  u.text(342, 611, "Reservatório", 13);
  u.path("M468 520H568 M640 520H773 M857 520H1107", "accent", 5);
  u.dot(604, 520, 35, "panel");
  u.add(
    `<circle cx="604" cy="520" r="35" fill="none" stroke="${u.c("accent")}" stroke-width="2"/>`,
  );
  u.path("M587 501L625 520L587 539Z", "accent", 2, "tint");
  u.rect(773, 469, 84, 101, "panel", 10, "accent");
  for (let i = 0; i < 5; i++)
    u.line(786, 483 + i * 17, 842, 483 + i * 17, "accent");
  u.text(566, 589, "BOM-02", 14, "text", 600);
  u.text(765, 600, "Filtro · FL-01", 14, "text", 600);
  u.text(1011, 561, "Saída do circuito", 13);
  u.pill(984, 475, "18,4 m³/h", "accent", 155);
  u.pill(548, 418, "2,8 bar", "accent", 139);
  u.pill(755, 418, "26,4 °C", "accent", 149);
  status(u, 326, 685, "Circuito selecionado");
  u.text(789, 685, "Leituras do cenário  /  Atualização visual", 12);
  u.rect(272, 766, 928, 244);
  u.heading(296, 805, "Tendência da pressão", "bar · Recorte de demonstração");
  u.chart(295, 843, 877, 151, [2.4, 2.6, 2.5, 2.8, 2.7, 2.8], {
    max: 4,
    labels: ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00"],
  });
  panel(u, "Ocorrências", "Contexto para a equipe");
  properties(u, [
    ["Equipamento", "Filtro · FL-01"],
    ["Observação", "Revisar próxima inspeção"],
    ["Responsável", "Equipe de manutenção"],
    ["Situação", "Planejada"],
  ]);
  u.rect(1247, 773, 289, 132, "tint", 12, "tint");
  u.text(1264, 806, "Próxima ação", 15, "accent", 600);
  u.text(1264, 839, "Conferir checklist do filtro", 13);
  u.text(1264, 865, "e registrar a inspeção.", 13);
  u.pill(1247, 952, "Ver histórico  ↗", "accent", 289);
}
function warehouse(u) {
  top(
    u,
    ["Armazém", "Ondas de coleta", "Pedidos", "Conferência", "Expedição"],
    "Centro de distribuição  /  Endereçamento",
  );
  u.rect(272, 296, 928, 714, "inset");
  u.heading(
    296,
    338,
    "Cada item tem um endereço.",
    "Planta esquemática · Onda de separação W-024",
  );
  ["A", "B", "C", "D", "E", "F", "G"].forEach((s, c) => {
    const x = 322 + c * 119;
    u.text(x + 19, 411, s, 14, "text", 600);
    for (let r = 0; r < 6; r++) {
      const y = 432 + r * 51;
      u.rect(
        x,
        y,
        57,
        35,
        (c + r) % 6 === 0 ? "tint" : "panel",
        4,
        (c + r) % 6 === 0 ? "accent" : "soft",
      );
      u.text(
        x + 8,
        y + 23,
        s + "-" + String(r + 1).padStart(2, "0"),
        11,
        (c + r) % 6 === 0 ? "accent" : "muted",
      );
    }
  });
  u.path(
    "M299 789H411V471H530V676H768V522H1006V789H1156",
    "accent",
    3,
    "none",
    "7 6",
  );
  [
    [411, 471, "01"],
    [530, 676, "02"],
    [768, 522, "03"],
    [1006, 789, "04"],
  ].forEach(([x, y, n]) => {
    u.dot(x, y, 14, "accent");
    u.text(x - 7, y + 5, n, 11, "bg", 600);
  });
  u.rect(295, 827, 880, 156, "panel");
  u.text(316, 860, "PRÓXIMOS ITENS DA ONDA", 11, "soft", 600);
  [
    ["A-01", "Componente de montagem", "8 unidades"],
    ["C-05", "Elemento de fixação", "24 unidades"],
    ["E-02", "Kit de manutenção", "2 unidades"],
  ].forEach(([a, b, c], i) => {
    let y = 891 + i * 30;
    u.text(316, y, a, 13, "accent", 600);
    u.text(429, y, b, 13, "text");
    u.text(1020, y, c, 12);
  });
  panel(u, "Onda de separação", "W-024 · Expedição de hoje");
  properties(u, [
    ["Pedidos agrupados", "06 pedidos"],
    ["Linhas para separar", "18 itens"],
    ["Coletas registradas", "7 de 18"],
    ["Responsável", "Equipe de armazém"],
  ]);
  u.text(1248, 784, "Andamento da separação", 13);
  u.progress(1248, 809, 286, 7 / 18);
  status(u, 1248, 852, "Conferência antes da expedição");
  u.pill(1247, 952, "Abrir sequência  ↗", "accent", 289);
}
function agriculture(u) {
  top(
    u,
    [
      "Áreas e atividades",
      "Calendário",
      "Equipe de campo",
      "Observações",
      "Planejamento",
    ],
    "Unidade de manejo  /  Planejamento da semana",
  );
  u.rect(272, 296, 928, 446, "inset");
  u.heading(
    296,
    338,
    "Áreas que fazem parte do plano",
    "Território esquemático · Sem dados de propriedade real",
  );
  const plots = [
    [
      [320, 409],
      [596, 392],
      [624, 539],
      [348, 566],
    ],
    [
      [364, 589],
      [633, 561],
      [663, 687],
      [340, 711],
    ],
    [
      [667, 405],
      [955, 425],
      [1013, 557],
      [710, 563],
    ],
    [
      [711, 589],
      [1018, 581],
      [1094, 704],
      [755, 710],
    ],
  ];
  const colors = ["#d5e6d8", "#e3e7ca", "#c6ddd3", "#d3e1d2"];
  plots.forEach((pts, i) => {
    u.path(
      pts.map(([x, y], j) => (j ? "L" : "M") + x + " " + y).join(" ") + "Z",
      "accent",
      i === 2 ? 3 : 1,
      colors[i],
    );
    const cx = i < 2 ? 430 : 806,
      cy = i % 2 ? 642 : 474;
    u.text(cx, cy, "Área 0" + (i + 1), 17, "text", 600);
    u.text(
      cx,
      cy + 25,
      [
        "Vistoria de campo",
        "Equipe programada",
        "Atividade em revisão",
        "Planejamento inicial",
      ][i],
      12,
      "text",
    );
  });
  u.rect(272, 766, 928, 244);
  u.heading(
    296,
    805,
    "Calendário de atividades",
    "Responsáveis e etapas visíveis",
  );
  ["Seg · 09", "Ter · 10", "Qua · 11", "Qui · 12", "Sex · 13"].forEach(
    (s, i) => {
      let x = 295 + i * 178;
      u.text(x + 10, 852, s, 12, "soft", 600);
      u.rect(x, 869, 165, 113, "panel", 9);
      u.pill(
        x + 9,
        881,
        ["Vistoria", "Revisão", "Coleta", "Planejar", "Retorno"][i],
        "accent",
        146,
      );
      u.text(x + 13, 935, "Área 0" + ((i % 4) + 1), 13, "text", 500);
      u.text(x + 13, 960, "Equipe de campo", 11);
    },
  );
  panel(u, "Atividade selecionada", "Área 03 · Vistoria de campo");
  properties(u, [
    ["Etapa", "Programação da equipe"],
    ["Data planejada", "Quarta-feira · 11 nov"],
    ["Responsável", "Equipe de campo"],
    ["Observações registradas", "02 apontamentos"],
  ]);
  u.rect(1247, 773, 289, 132, "tint", 12, "tint");
  u.text(1264, 807, "Preparar a visita", 15, "accent", 600);
  u.text(1264, 839, "Revisar apontamentos da área", 13);
  u.text(1264, 865, "e alinhar o roteiro da equipe.", 13);
  u.pill(1247, 952, "Ver atividade  ↗", "accent", 289);
}
function vision(u) {
  top(
    u,
    ["Inspeções", "Fila de revisão", "Referências", "Critérios", "Histórico"],
    "Inspeção visual  /  Peça de demonstração",
  );
  u.rect(272, 296, 928, 540, "inset");
  u.heading(
    296,
    338,
    "Uma imagem, contexto para revisar.",
    "Regiões ilustrativas · Avaliação humana da análise",
  );
  u.rect(296, 380, 880, 429, "#202a36", 12, "line");
  // Original metal-plate illustration, not a claimed photograph or model output.
  u.path(
    "M420 453L958 453L1018 681L905 749L448 713L393 522Z",
    "#8b9baa",
    2,
    "#677685",
  );
  u.path("M420 453L448 713L905 749L958 453", "soft", 1.5);
  [
    [487, 502],
    [887, 506],
    [493, 673],
    [913, 676],
  ].forEach(([x, y]) => {
    u.add(
      `<ellipse cx="${x}" cy="${y}" rx="27" ry="19" fill="#27323f" stroke="#b1bdca" stroke-width="3"/>`,
    );
  });
  u.path("M633 511L642 541L624 566L648 593L638 619", "warn", 3);
  u.rect(598, 486, 81, 153, "none", 3, "warn");
  u.pill(567, 441, "Região 01", "warn", 149);
  u.rect(855, 643, 115, 75, "none", 4, "accent");
  u.pill(854, 741, "Região 02", "accent", 145);
  u.line(705, 406, 705, 779, "line", 1, "5 7");
  u.line(319, 599, 1148, 599, "line", 1, "5 7");
  u.text(
    319,
    789,
    "Imagem ilustrativa da peça · Seleção de regiões",
    12,
    "muted",
  );
  u.rect(272, 860, 928, 150);
  u.text(295, 897, "FILA PARA REVISÃO", 11, "soft", 600);
  [0, 1, 2, 3].forEach((i) => {
    let x = 295 + i * 220;
    u.rect(x, 916, 202, 71, i ? "panel" : "tint", 9);
    product(u, x + 36, 951, i, 0.45);
    u.text(x + 76, 945, "INS-10" + (i + 1), 13, "text", 600);
    u.text(
      x + 76,
      969,
      i ? "Aguardando" : "Em revisão",
      11,
      i ? "muted" : "accent",
    );
  });
  panel(u, "Revisão humana", "INS-101 · Regiões de interesse");
  properties(u, [
    ["Região selecionada", "01 · Superfície"],
    ["Observação do cenário", "Verificar descontinuidade"],
    ["Decisão registrada", "Ainda não avaliada"],
    ["Responsável", "Equipe de qualidade"],
  ]);
  u.rect(1247, 773, 289, 132, "tint", 12, "tint");
  u.text(1264, 806, "Avaliação necessária", 15, "accent", 600);
  u.text(1264, 839, "Conferir a imagem e o critério", 13);
  u.text(1264, 865, "antes de registrar a decisão.", 13);
  u.pill(1247, 952, "Abrir avaliação  ↗", "accent", 289);
}
function construction(u) {
  top(
    u,
    ["Quantitativos", "Composições", "Etapas da obra", "Premissas", "Revisões"],
    "Projeto de referência  /  Quantitativos por ambiente",
  );
  u.rect(272, 296, 928, 403, "inset");
  u.heading(
    296,
    338,
    "Selecione o elemento. Confira a composição.",
    "Desenho esquemático · Ambientes de demonstração",
  );
  u.path("M369 411H1080V640H369Z M678 411V640 M889 411V640", "soft", 5);
  u.line(369, 411, 1080, 411, "accent", 8);
  u.line(369, 433, 1080, 433, "accent", 1, "5 5");
  u.text(442, 491, "Ambiente 01", 17, "text", 600);
  u.text(452, 520, "48,00 m²", 13);
  u.text(710, 491, "Ambiente 02", 17, "text", 600);
  u.text(733, 520, "32,00 m²", 13);
  u.text(922, 491, "Ambiente 03", 17, "text", 600);
  u.text(946, 520, "28,00 m²", 13);
  u.pill(614, 571, "Parede selecionada · 18,00 m", "accent", 333);
  u.heading(
    272,
    747,
    "Composição do orçamento",
    "Quantidades e valores ilustrativos para revisão",
  );
  u.table(
    272,
    795,
    928,
    ["ELEMENTO", "QUANTIDADE", "CUSTO UNIT.", "SUBTOTAL"],
    [
      ["Alvenaria de vedação", "54,00 m²", "R$ 98,00", "R$ 5.292,00"],
      ["Revestimento", "108,00 m²", "R$ 42,00", "R$ 4.536,00"],
      ["Pintura", "108,00 m²", "R$ 19,00", "R$ 2.052,00"],
    ],
    [0, 0.4, 0.63, 0.81],
  );
  panel(u, "Elemento selecionado", "Parede de referência");
  properties(u, [
    ["Comprimento", "18,00 m"],
    ["Altura de estudo", "3,00 m"],
    ["Área calculada", "54,00 m²"],
    ["Composição", "Alvenaria de vedação"],
  ]);
  u.text(1248, 787, "Subtotal da composição", 13);
  u.text(1248, 826, "R$ 5.292,00", 27, "text", 600);
  u.text(1248, 865, "Conferir premissas do projeto.", 12);
  u.pill(1247, 952, "Revisar composição  ↗", "accent", 289);
}
function energy(u) {
  top(
    u,
    [
      "Fluxo de energia",
      "Consumo por área",
      "Perfis",
      "Fontes",
      "Acompanhamento",
    ],
    "Instalação de referência  /  Balanço de energia",
  );
  u.rect(272, 296, 928, 714, "inset");
  u.heading(
    296,
    338,
    "Fontes e cargas no mesmo contexto.",
    "Fluxo esquemático · Valores de demonstração",
  );
  [
    ["Rede", 388, "34 kW"],
    ["Geração local", 568, "26 kW"],
    ["Armazenamento", 748, "8 kW"],
  ].forEach(([s, y, value], i) => {
    u.rect(302, y, 211, 104);
    u.icon(321, y + 18, i + 1, "accent");
    u.text(353, y + 33, s, 15, "text", 500);
    u.text(321, y + 78, value, 25, "accent", 600);
  });
  u.path("M513 440H610V623H670 M513 620H670 M513 800H610V623", "accent", 4);
  u.dot(710, 623, 40, "panel");
  u.icon(701, 613, 5, "accent");
  u.text(672, 698, "Distribuição", 14, "text", 600);
  [
    ["Produção", 401, "38 kW"],
    ["Utilidades", 581, "20 kW"],
    ["Administrativo", 761, "10 kW"],
  ].forEach(([s, y, value], i) => {
    u.rect(922, y, 248, 104);
    u.text(942, y + 34, s, 15, "text", 500);
    u.text(942, y + 79, value, 25, "text", 600);
    u.path(`M750 623H833V${y + 52}H922`, "good", i === 0 ? 5 : 3);
  });
  u.rect(296, 894, 879, 89, "panel");
  u.text(
    316,
    926,
    "Potência e consumo têm leituras diferentes.",
    15,
    "text",
    600,
  );
  u.text(
    316,
    957,
    "Compare os períodos e as fontes antes de avaliar o perfil da instalação.",
    13,
  );
  panel(u, "Perfil de consumo", "kWh · Recorte de demonstração");
  u.chart(1248, 397, 286, 220, [18, 24, 41, 48, 46, 32, 21], {
    max: 60,
    labels: ["06h", "09h", "12h", "15h", "18h"],
  });
  properties(
    u,
    [
      ["Consumo do período", "1.284 kWh"],
      ["Área em acompanhamento", "Produção"],
      ["Próxima ação", "Revisar perfil por turno"],
    ],
    687,
  );
  u.pill(1247, 952, "Explorar leituras  ↗", "accent", 289);
}
function commerce(u) {
  top(
    u,
    ["Catálogo", "Meus pedidos", "Condições", "Documentos", "Atendimento"],
    "Portal de compras  /  Catálogo de materiais",
  );
  const products = [
    ["Flange de conexão", "R$ 128,00", "MAT-104"],
    ["Motor de referência", "R$ 640,00", "MAT-208"],
    ["Válvula de controle", "R$ 85,00", "MAT-312"],
    ["Anel de montagem", "R$ 42,00", "MAT-416"],
    ["Conjunto de acionamento", "R$ 384,00", "MAT-520"],
    ["Kit de manutenção", "R$ 156,00", "MAT-624"],
  ];
  products.forEach(([s, price, sku], i) => {
    let x = 272 + (i % 3) * 314,
      y = 296 + Math.floor(i / 3) * 365;
    u.rect(x, y, 299, 341);
    u.rect(x + 14, y + 14, 271, 140, "inset", 10, "inset");
    product(u, x + 144, y + 84, i, 1.15);
    u.text(x + 20, y + 183, sku, 11, "soft", 600);
    u.text(x + 20, y + 212, s, 16, "text", 600);
    u.text(x + 20, y + 248, price, 23, "text", 600);
    u.text(x + 20, y + 275, "Valor unitário de demonstração", 11);
    u.pill(x + 20, y + 295, "Adicionar ao pedido  +", "accent", 259);
  });
  panel(u, "Seu pedido", "Revisão antes de enviar");
  properties(
    u,
    [
      ["Flange de conexão", "2 un. · R$ 256,00"],
      ["Válvula de controle", "4 un. · R$ 340,00"],
      ["Itens selecionados", "6 unidades"],
    ],
    414,
  );
  u.text(1248, 725, "TOTAL DO PEDIDO", 11, "soft", 600);
  u.text(1248, 769, "R$ 596,00", 32, "text", 600);
  u.text(1248, 821, "Condições e disponibilidade", 13);
  u.text(1248, 846, "sujeitas à revisão comercial.", 13);
  u.pill(1247, 952, "Revisar pedido  ↗", "accent", 289);
}
function fieldService(u) {
  top(
    u,
    [
      "Agenda da equipe",
      "Ordens de serviço",
      "Disponibilidade",
      "Unidades",
      "Histórico",
    ],
    "Planejamento de campo  /  Semana de 09 a 13 nov",
  );
  u.rect(272, 296, 928, 714);
  u.heading(
    296,
    338,
    "Uma agenda para coordenar o trabalho.",
    "Visitas planejadas · Equipes de demonstração",
  );
  const start = 445,
    step = 145;
  ["Seg · 09", "Ter · 10", "Qua · 11", "Qui · 12", "Sex · 13"].forEach(
    (s, i) => {
      u.text(start + i * step + 13, 403, s, 12, "soft", 600);
      u.line(start + i * step - 7, 426, start + i * step - 7, 858, "line");
    },
  );
  const names = ["Equipe A", "Equipe B", "Equipe C", "Equipe D"];
  names.forEach((s, r) => {
    let y = 439 + r * 104;
    u.avatar(319, y + 30, "E" + String(r + 1));
    u.text(350, y + 34, s, 13, "text", 500);
    u.line(295, y + 83, 1175, y + 83);
    for (let c = 0; c < 5; c++) {
      if ((r + c) % 3 === 1) continue;
      let x = start + c * step;
      u.rect(x, y, 130, 76, (r + c) % 2 ? "inset" : "tint", 8);
      u.text(x + 10, y + 24, "OS-" + (148 + r * 5 + c), 13, "text", 600);
      u.text(
        x + 10,
        y + 46,
        ["Inspeção", "Instalação", "Manutenção"][(r + c) % 3],
        11,
      );
      u.text(
        x + 10,
        y + 65,
        c % 2 ? "14:00 · Unidade B" : "09:00 · Unidade A",
        10,
        "muted",
      );
    }
  });
  u.rect(295, 903, 880, 79, "inset");
  u.text(
    316,
    936,
    "13 visitas no plano  ·  4 equipes  ·  Janelas de atendimento definidas",
    15,
    "text",
    500,
  );
  u.text(
    316,
    962,
    "Prepare materiais, responsáveis e contexto antes de cada saída.",
    12,
  );
  panel(u, "Próxima visita", "OS-148 · Inspeção da unidade");
  properties(u, [
    ["Equipe responsável", "Equipe A"],
    ["Janela de atendimento", "Segunda · 09:00 a 11:00"],
    ["Local do cenário", "Unidade A · Demonstração"],
    ["Situação", "Confirmar preparação"],
  ]);
  u.rect(1247, 773, 289, 132, "tint", 12, "tint");
  u.text(1264, 806, "Antes de sair", 15, "accent", 600);
  u.text(1264, 839, "Conferir materiais e histórico", 13);
  u.text(1264, 865, "da última visita à unidade.", 13);
  u.pill(1247, 952, "Abrir ordem  ↗", "accent", 289);
}
function dataHub(u) {
  top(
    u,
    ["Mapeamento", "Prévia dos dados", "Validações", "Execuções", "Conexões"],
    "Sincronização de pedidos  /  Mapeamento de campos",
  );
  u.rect(272, 296, 1288, 380);
  u.heading(
    296,
    338,
    "Conecte informações com regras claras.",
    "Origem → transformação → destino · Cenário de demonstração",
  );
  u.text(315, 391, "ORIGEM · PEDIDOS", 11, "soft", 600);
  u.text(1111, 391, "DESTINO · OPERAÇÃO", 11, "soft", 600);
  const pairs = [
    ["order_id", "Identificador", "pedido.codigo"],
    ["customer_ref", "Relacionar conta", "pedido.conta"],
    ["placed_at", "Normalizar data", "pedido.criado_em"],
    ["total_amount", "Valor decimal", "pedido.valor"],
    ["order_status", "Mapear situação", "pedido.situacao"],
  ];
  pairs.forEach(([a, b, c], i) => {
    let y = 409 + i * 46;
    u.rect(296, y, 352, 35, "inset", 7);
    u.text(312, y + 23, a, 13, "text", 500);
    u.line(648, y + 18, 778, y + 18, "accent", 1.5);
    u.pill(778, y + 3, b, "accent", 240);
    u.line(1018, y + 18, 1152, y + 18, "accent", 1.5);
    u.rect(1152, y, 383, 35, "inset", 7);
    u.text(1168, y + 23, c, 13, "text", 500);
  });
  u.heading(
    272,
    723,
    "Prévia dos registros",
    "Exemplo de transformação antes de sincronizar",
  );
  u.table(
    272,
    765,
    865,
    ["PEDIDO", "CONTA", "VALOR", "SITUAÇÃO"],
    [
      ["PED-1048", "Conta demonstração A", "R$ 1.280,00", "Em análise"],
      ["PED-1049", "Conta demonstração B", "R$ 860,00", "Aprovado"],
      ["PED-1050", "Conta demonstração C", "R$ 2.140,00", "Em análise"],
    ],
    [0, 0.18, 0.58, 0.78],
  );
  u.rect(1161, 705, 399, 305);
  u.heading(1185, 746, "Validações do mapeamento");
  [
    ["Identificadores presentes", "good"],
    ["Formato de data reconhecido", "good"],
    ["Valores numéricos válidos", "good"],
    ["Regra de situação em revisão", "warn"],
  ].forEach(([s, c], i) => status(u, 1185, 799 + i * 39, s, c));
  u.pill(1185, 952, "Revisar antes de executar", "accent", 350);
}

export const strategicRenderers = [
  production,
  supervision,
  warehouse,
  agriculture,
  vision,
  construction,
  energy,
  commerce,
  fieldService,
  dataHub,
];
