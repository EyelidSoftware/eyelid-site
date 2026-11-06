/** Original engineering concepts: no third-party UI, marks or integration claims. */
function workspace(u, filename, tools) {
  u.shell([
    "Área de projeto",
    "Arquivos e revisões",
    "Camadas",
    "Apontamentos",
    "Documentação",
  ]);
  u.rect(272, 215, 1288, 58);
  u.text(294, 251, filename, 16, "text", 600);
  u.pill(1318, 230, "Revisão de projeto", "accent", 219);
  u.rect(272, 296, 928, 714, "inset");
  u.add(
    `<defs><pattern id="technical-grid" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M30 0H0V30" stroke="${u.c("line")}" stroke-width=".5" fill="none"/></pattern><clipPath id="drawing"><rect x="273" y="297" width="926" height="712" rx="13"/></clipPath></defs><rect x="273" y="297" width="926" height="712" rx="13" fill="url(#technical-grid)"/>`,
  );
  tools.forEach((s, i) => {
    const x = 291 + i * 145;
    u.rect(x, 313, 132, 34, i === 0 ? "tint" : "panel", 7);
    u.text(x + 12, 335, s, 12, i === 0 ? "accent" : "muted", 500);
  });
  u.rect(290, 955, 891, 37, "panel", 8);
  u.text(307, 979, "Projeto de demonstração", 12);
  u.text(932, 979, "Vista  /  100%  /  Ajustar", 12);
}
function inspector(u, title, subtitle, properties, notes) {
  u.rect(1224, 296, 336, 714);
  u.heading(1246, 337, title, subtitle);
  properties.forEach(([label, value], i) => {
    let y = 407 + i * 83;
    u.text(1247, y, label, 12);
    u.rect(1246, y + 13, 291, 41, "inset", 8);
    u.text(1260, y + 39, value, 14, "text", 500);
  });
  u.line(1247, 833, 1535, 833);
  u.text(1247, 865, "REVISÃO DA EQUIPE", 11, "soft", 600);
  notes.forEach((s, i) => u.text(1247, 897 + i * 25, s, 12));
  u.pill(1247, 955, "Ver histórico  ↗", "accent", 289);
}
function dimension(u, x, y, x2, y2, label, tx, ty) {
  u.line(x, y, x2, y2, "accent");
  u.line(x - 5, y - 5, x + 5, y + 5, "accent");
  u.line(x2 - 5, y2 - 5, x2 + 5, y2 + 5, "accent");
  u.text(tx, ty, label, 13, "accent", 500);
}
function iso(_u, x, y, z) {
  return [723 + (x - y) * 1.04, 756 + (x + y) * 0.43 - z * 1.05];
}
function polygon(u, pts, fill, stroke = "line", width = 1.5) {
  u.path(
    pts.map(([x, y], i) => (i ? "L" : "M") + x + " " + y).join(" ") + "Z",
    stroke,
    width,
    fill,
  );
}
function box(u, x, y, z, w, d, h, selected = false) {
  const a = iso(u, x, y, z + h),
    b = iso(u, x + w, y, z + h),
    c = iso(u, x + w, y + d, z + h),
    e = iso(u, x, y + d, z + h),
    a0 = iso(u, x, y, z),
    b0 = iso(u, x + w, y, z),
    c0 = iso(u, x + w, y + d, z),
    e0 = iso(u, x, y + d, z);
  const light = u.meta.theme === "light";
  polygon(
    u,
    [a, b, b0, a0],
    selected ? "tint" : light ? "#c9d3e2" : "#26384c",
    selected ? "accent" : "line",
  );
  polygon(
    u,
    [b, c, c0, b0],
    selected ? "tint" : light ? "#afbdd1" : "#1b2b3f",
    selected ? "accent" : "line",
  );
  polygon(
    u,
    [c, e, e0, c0],
    selected ? "tint" : light ? "#bbc8da" : "#223449",
    selected ? "accent" : "line",
  );
  polygon(
    u,
    [a, b, c, e],
    selected ? "tint" : light ? "#e4eaf3" : "#32475e",
    selected ? "accent" : "soft",
  );
}
function grid3D(u) {
  u.add('<g clip-path="url(#drawing)">');
  for (let i = -300; i <= 300; i += 50) {
    let a = iso(u, -300, i, 0),
      b = iso(u, 300, i, 0),
      c = iso(u, i, -230, 0),
      d = iso(u, i, 230, 0);
    u.line(...a, ...b, "line");
    u.line(...c, ...d, "line");
  }
  u.add("</g>");
  u.add('<g transform="translate(0 -92)">');
  u.line(1116, 879, 1156, 899, "accent", 2);
  u.line(1116, 879, 1083, 900, "good", 2);
  u.line(1116, 879, 1116, 836, "soft", 2);
  u.text(1160, 905, "X", 11, "accent");
  u.text(1064, 909, "Y", 11, "good");
  u.text(1110, 828, "Z", 11);
  u.add("</g>");
}
export function technicalPlan(u) {
  workspace(u, "Planta operacional  /  Térreo  /  R03", [
    "Selecionar",
    "Linha e arco",
    "Cotar",
    "Camadas",
    "Medir",
  ]);
  inspector(
    u,
    "Propriedades",
    "Ambiente selecionado",
    [
      ["Elemento", "Sala de reunião"],
      ["Camada", "Arquitetura · Ambientes"],
      ["Área desenhada", "42,50 m²"],
      ["Revisão do desenho", "R03 · Em avaliação"],
      ["Responsável", "Equipe de projeto"],
    ],
    ["Conferir circulação e acessos.", "Registrar revisão com a equipe."],
  );
  // Native 2D geometry, with dimension and construction lines.
  u.line(400, 410, 400, 382, "soft");
  u.line(1020, 410, 1020, 382, "soft");
  dimension(u, 400, 390, 1020, 390, "18,00 m", 677, 380);
  u.line(380, 430, 354, 430, "soft");
  u.line(380, 860, 354, 860, "soft");
  dimension(u, 365, 430, 365, 860, "12,50 m", 291, 652);
  u.path("M400 430H1020V860H400Z", "text", 8);
  u.path("M752 430V602 M752 656V860 M752 635H1020", "text", 6);
  u.path("M400 790V860H494 M550 860H1020", "text", 8);
  // Doors, windows and jambs.
  u.path(
    "M752 602H806 A54 54 0 0 1 752 656 M494 860V804 A56 56 0 0 1 550 860",
    "accent",
    1.6,
  );
  [
    [452, 430, 650, 430],
    [809, 430, 964, 430],
    [1020, 477, 1020, 575],
    [400, 482, 400, 704],
    [836, 860, 957, 860],
  ].forEach((p) => {
    u.line(...p, "accent", 5);
  });
  u.rect(770, 449, 231, 167, "tint", 0, "accent");
  u.text(798, 473, "SALA DE REUNIÃO", 12, "accent", 600);
  u.text(845, 495, "42,50 m²", 12);
  u.rect(826, 516, 122, 47, "panel", 14, "accent");
  for (let i = 0; i < 4; i++) {
    u.rect(827 + i * 32, 505, 23, 8, "inset", 3, "soft");
    u.rect(827 + i * 32, 568, 23, 8, "inset", 3, "soft");
  }
  u.rect(809, 525, 9, 27, "inset", 3, "soft");
  u.rect(957, 525, 9, 27, "inset", 3, "soft");
  u.text(457, 475, "ÁREA DE TRABALHO", 13, "text", 600);
  u.text(514, 497, "88,20 m²", 12);
  for (let row = 0; row < 3; row++)
    for (let col = 0; col < 2; col++) {
      let x = 445 + col * 144,
        y = 536 + row * 81;
      u.rect(x, y, 112, 46, "panel", 3, "soft");
      u.rect(x + 10, y + 8, 45, 20, "tint", 2, "accent");
      u.rect(x + 63, y + 10, 30, 15, "inset", 2, "line");
      u.rect(x + 42, y + 51, 31, 16, "inset", 6, "soft");
    }
  u.text(786, 680, "SALA TÉCNICA", 12, "text", 600);
  u.text(814, 702, "35,70 m²", 12);
  for (let i = 0; i < 3; i++) {
    u.rect(787 + i * 67, 728, 51, 85, "panel", 3, "soft");
    for (let j = 0; j < 5; j++)
      u.line(796 + i * 67, 741 + j * 12, 828 + i * 67, 741 + j * 12, "accent");
  }
  u.line(752, 894, 1020, 894, "accent");
  dimension(u, 752, 894, 1020, 894, "7,80 m", 855, 918);
  u.path("M1081 430V504 M1044 467H1118", "soft", 1, "none", "3 4");
  u.dot(1081, 467, 6, "accent");
  u.text(1061, 538, "N", 14, "accent", 600);
  u.path("M1081 516V492 M1076 501L1081 491L1086 501", "accent", 1.5);
  u.pill(423, 891, "Arquitetura  /  Planta baixa", "accent", 293);
}
export function mechanical(u) {
  workspace(u, "Conjunto mecânico  /  Inspeção  /  R02", [
    "Orbitar",
    "Selecionar",
    "Vista explodida",
    "Corte",
    "Medir",
  ]);
  inspector(
    u,
    "Componente",
    "Estrutura do conjunto",
    [
      ["Seleção", "Placa superior"],
      ["Material de estudo", "Alumínio"],
      ["Espessura", "24,00 mm"],
      ["Dimensões de referência", "240 × 160 mm"],
      ["Estado da revisão", "Aguardando conferência"],
    ],
    ["Revisar folgas do conjunto.", "Validar desenho de fabricação."],
  );
  grid3D(u);
  box(u, -185, -110, 0, 370, 220, 24);
  box(u, -140, -90, 70, 280, 180, 58);
  box(u, -120, -80, 216, 240, 160, 24, true);
  // Guide rods connect the exploded layers.
  for (const [x, y] of [
    [-90, -58],
    [-90, 58],
    [90, -58],
    [90, 58],
  ]) {
    const a = iso(u, x, y, 24),
      b = iso(u, x, y, 220);
    u.line(...a, ...b, "soft", 3);
    u.add(
      `<ellipse cx="${b[0]}" cy="${b[1]}" rx="8" ry="4" fill="${u.c("accent")}"/>`,
    );
  }
  const [cx, cy] = iso(u, 0, 0, 175),
    [bx, by] = iso(u, 0, 0, 88);
  u.path(
    `M${cx - 34} ${cy}V${by} A34 14 0 0 0 ${bx + 34} ${by}V${cy}`,
    "soft",
    1.5,
    "panel",
  );
  u.add(
    `<ellipse cx="${cx}" cy="${cy}" rx="34" ry="14" fill="${u.c("tint")}" stroke="${u.c("accent")}" stroke-width="2"/><ellipse cx="${cx}" cy="${cy}" rx="17" ry="7" fill="${u.c("inset")}" stroke="${u.c("accent")}"/>`,
  );
  for (const [x, y] of [
    [-155, -83],
    [-155, 83],
    [155, -83],
    [155, 83],
  ]) {
    const p = iso(u, x, y, 25);
    u.add(
      `<ellipse cx="${p[0]}" cy="${p[1]}" rx="9" ry="4" fill="${u.c("inset")}" stroke="${u.c("soft")}"/>`,
    );
  }
  u.path("M877 526H1015V486", "accent", 1);
  u.dot(877, 526, 4);
  u.text(980, 466, "Placa superior", 14, "accent", 600);
  dimension(u, 485, 880, 840, 1027 - 108, "370,00 mm", 591, 931);
  u.line(485, 844, 485, 880, "soft");
  u.rect(297, 380, 231, 137, "panel", 10);
  u.text(316, 409, "ESTRUTURA DO CONJUNTO", 10, "soft", 600);
  [
    "▾  Conjunto principal",
    "   Base de montagem",
    "   Corpo intermediário",
    "   Placa superior",
  ].forEach((s, i) =>
    u.text(
      316,
      436 + i * 21,
      s,
      12,
      i === 3 ? "accent" : "text",
      i === 3 ? 600 : 400,
    ),
  );
  u.pill(918, 914, "Vista isométrica", "accent", 239);
}
export function building(u) {
  workspace(u, "Edificação  /  Revisão coordenada  /  R04", [
    "Orbitar",
    "Pavimentos",
    "Disciplinas",
    "Apontar",
    "Seção",
  ]);
  inspector(
    u,
    "Compatibilização",
    "Apontamento selecionado",
    [
      ["Referência", "REV-003"],
      ["Pavimento", "02 · Instalações"],
      ["Disciplina", "Estrutura e instalações"],
      ["Responsável", "Equipe de engenharia"],
      ["Situação", "Em avaliação"],
    ],
    ["Conferir passagem de dutos.", "Registrar decisão da revisão."],
  );
  grid3D(u);
  for (let level = 0; level < 5; level++) {
    const z = level * 62;
    box(u, -190, -110, z, 380, 220, 10, level === 2);
    if (level < 4)
      for (const [x, y] of [
        [-172, -92],
        [0, -92],
        [156, -92],
        [-172, 80],
        [0, 80],
        [156, 80],
      ])
        box(u, x, y, z + 10, 14, 14, 52);
    if (level < 4)
      for (let i = 0; i < 6; i++) {
        const a = iso(u, -170 + i * 53, 110, z + 13),
          b = iso(u, -170 + i * 53, 110, z + 54);
        u.line(...a, ...b, "accent", 1);
      }
  }
  // Services coordinated against the structural model.
  const duct = [
    [-150, -40, 143],
    [145, -40, 143],
    [145, 70, 143],
  ].map((p) => iso(u, ...p));
  u.path(
    duct.map(([x, y], i) => (i ? "L" : "M") + x + " " + y).join(" "),
    "good",
    8,
  );
  const tag = iso(u, 112, -40, 143);
  u.path(`M${tag[0]} ${tag[1]}H1085V527`, "warn", 1.5);
  u.dot(tag[0], tag[1], 7, "warn");
  u.pill(1048, 489, "03", "warn", 59);
  u.text(1070, 551, "Ponto de revisão", 12, "warn");
  u.rect(297, 380, 234, 133, "panel");
  u.text(317, 410, "DISCIPLINAS VISÍVEIS", 11, "soft", 600);
  [
    ["Estrutura", "soft"],
    ["Arquitetura", "accent"],
    ["Instalações", "good"],
  ].forEach(([s, c], i) => {
    u.dot(321, 439 + i * 27, 4, c);
    u.text(335, 444 + i * 27, s, 13, "text");
  });
  u.rect(296, 873, 880, 64, "panel", 10);
  u.text(317, 898, "REV-003  ·  Passagem de instalações", 14, "text", 600);
  u.text(317, 922, "Relacionar elemento, responsável e decisão da equipe.", 12);
  u.pill(987, 890, "Em avaliação", "warn", 169);
}
export function piping(u) {
  workspace(u, "Circuito de processo  /  P-01  /  R01", [
    "Selecionar",
    "Equipamento",
    "Linha",
    "Instrumento",
    "Anotar",
  ]);
  inspector(
    u,
    "Propriedades da linha",
    "Circuito de demonstração",
    [
      ["Identificação", "LN-104"],
      ["Circuito", "Alimentação principal"],
      ["Diâmetro de referência", "DN 50"],
      ["Material de estudo", "Aço inoxidável"],
      ["Revisão documental", "R01 · Em revisão"],
    ],
    ["Conferir lista de instrumentos.", "Validar especificação do circuito."],
  );
  u.text(304, 399, "DIAGRAMA DE PROCESSO", 12, "soft", 600);
  u.text(
    304,
    425,
    "Equipamentos e instrumentação · Circuito P-01",
    15,
    "text",
    500,
  );
  // Feed vessel, pump, exchanger and control valve.
  u.rect(352, 493, 150, 180, "panel", 0, "accent");
  u.add(
    `<ellipse cx="427" cy="493" rx="75" ry="22" fill="${u.c("panel")}" stroke="${u.c("accent")}" stroke-width="2"/><path d="M352 673 A75 22 0 0 0 502 673" fill="${u.c("panel")}" stroke="${u.c("accent")}" stroke-width="2"/>`,
  );
  for (let i = 0; i < 4; i++)
    u.path(
      `M364 ${586 + i * 17}Q395 ${577 + i * 17} 427 ${586 + i * 17}T490 ${586 + i * 17}`,
      "line",
    );
  u.path("M502 580H592 M668 580H804 M896 580H1106", "accent", 3);
  u.add(
    `<circle cx="630" cy="580" r="38" fill="${u.c("panel")}" stroke="${u.c("accent")}" stroke-width="2"/><circle cx="850" cy="580" r="46" fill="${u.c("panel")}" stroke="${u.c("accent")}" stroke-width="2"/>`,
  );
  polygon(
    u,
    [
      [610, 600],
      [610, 560],
      [652, 580],
    ],
    "tint",
    "accent",
  );
  u.path("M824 549L876 611 M824 611L876 549", "accent", 2);
  polygon(
    u,
    [
      [1002, 565],
      [1038, 595],
      [1038, 565],
      [1002, 595],
    ],
    "panel",
    "accent",
  );
  u.line(1020, 565, 1020, 532, "accent", 2);
  u.path("M1001 531Q1020 507 1039 531Z", "accent", 1.5, "tint");
  u.path("M850 626V779H427V695", "soft", 2);
  u.path("M550 573L561 580L550 587 M948 573L959 580L948 587", "accent", 2);
  for (const [x, label] of [
    [733, "PI-01"],
    [925, "TI-02"],
  ]) {
    u.line(x, 580, x, 494, "soft");
    u.dot(x, 477, 18, "panel");
    u.add(
      `<circle cx="${x}" cy="477" r="18" fill="none" stroke="${u.c("accent")}"/>`,
    );
    u.text(x - 6, 482, label[0], 13, "accent", 600);
    u.text(x - 23, 449, label, 12, "text");
  }
  [
    ["TK-01", 386, 730],
    ["B-01", 611, 655],
    ["TC-01", 827, 669],
    ["VC-01", 997, 641],
  ].forEach(([s, x, y]) => u.text(x, y, s, 13, "text", 600));
  u.text(1047, 603, "Saída", 12, "accent");
  u.text(584, 804, "Linha de retorno", 12);
  u.pill(681, 608, "LN-104  ·  DN 50", "accent", 175);
  u.line(305, 850, 1165, 850);
  u.text(305, 884, "LEGENDA DO CIRCUITO", 11, "soft", 600);
  u.dot(311, 914, 4, "accent");
  u.text(324, 919, "Linha principal", 12);
  u.dot(507, 914, 4, "soft");
  u.text(520, 919, "Retorno", 12);
  u.dot(673, 914, 4, "good");
  u.text(686, 919, "Instrumentação", 12);
  u.text(1009, 919, "Folha 01 / 03", 12);
}
export function territory(u) {
  workspace(u, "Área de estudo  /  Camadas territoriais  /  R02", [
    "Selecionar",
    "Camadas",
    "Delimitar",
    "Medir área",
    "Anotar",
  ]);
  inspector(
    u,
    "Atributos da área",
    "Parcela selecionada",
    [
      ["Identificação", "Área 03"],
      ["Uso de referência", "Planejamento operacional"],
      ["Área do desenho", "18,40 ha"],
      ["Camada temática", "Uso e ocupação"],
      ["Observações", "2 apontamentos de campo"],
    ],
    ["Geometria esquemática.", "Validação com a equipe de campo."],
  );
  u.add('<g clip-path="url(#drawing)">');
  for (let i = 0; i < 17; i++)
    u.path(
      `M270 ${370 + i * 39}Q520 ${260 + i * 41} 720 ${390 + i * 34}T1220 ${330 + i * 42}`,
      "line",
      0.8,
    );
  u.path("M1094 348Q967 452 1075 560T1008 757T1094 1004", "#355d7c", 30);
  u.path("M1094 348Q967 452 1075 560T1008 757T1094 1004", "#6c97b4", 2);
  const lots = [
    [
      [358, 412],
      [615, 391],
      [676, 532],
      [398, 558],
    ],
    [
      [410, 590],
      [681, 565],
      [723, 724],
      [389, 776],
    ],
    [
      [736, 395],
      [933, 445],
      [971, 598],
      [782, 626],
    ],
    [
      [762, 658],
      [980, 640],
      [1048, 805],
      [834, 858],
    ],
  ];
  lots.forEach((p, i) =>
    polygon(
      u,
      p,
      ["#1c3937", "#333e31", "#344034", "#253e43"][i],
      i === 2 ? "accent" : "soft",
      i === 2 ? 3 : 1.3,
    ),
  );
  [
    ["Área 01", "12,60 ha", 461, 476],
    ["Área 02", "21,30 ha", 470, 660],
    ["Área 03", "18,40 ha", 805, 509],
    ["Área 04", "16,80 ha", 847, 742],
  ].forEach(([s, a, x, y]) => {
    u.text(x, y, s, 17, "text", 600);
    u.text(x, y + 26, a, 13, "muted");
  });
  u.path("M288 867Q458 791 631 797T885 889T1177 937", "inset", 16);
  u.path(
    "M288 867Q458 791 631 797T885 889T1177 937",
    "soft",
    1.5,
    "none",
    "7 9",
  );
  u.dot(907, 558, 8, "warn");
  u.path("M907 558H1106V480", "warn", 1);
  u.pill(1050, 442, "02", "warn", 66);
  u.text(1062, 512, "Observação", 11, "warn");
  u.add("</g>");
  u.rect(296, 380, 207, 61, "panel");
  u.text(312, 404, "CAMADAS DO MAPA", 10, "soft", 600);
  u.text(312, 426, "Áreas  ·  Relevo  ·  Acessos", 11);
  u.path("M1141 386V430 M1134 398L1141 385L1148 398", "accent", 2);
  u.text(1135, 375, "N", 12, "accent", 600);
  u.line(313, 911, 443, 911, "text", 3);
  u.line(313, 906, 313, 917, "text");
  u.line(443, 906, 443, 917, "text");
  u.text(340, 936, "500 m", 12);
  u.text(908, 935, "Mapa esquemático", 12, "soft");
}
export function assets(u) {
  workspace(u, "Unidade operacional  /  Ativos e inspeções  /  R05", [
    "Selecionar",
    "Áreas",
    "Equipamentos",
    "Ordens",
    "Inspeções",
  ]);
  inspector(
    u,
    "Ativo selecionado",
    "Contexto da manutenção",
    [
      ["Identificação", "EQ-004 · Unidade de bombeio"],
      ["Localização", "Setor B · Linha 02"],
      ["Última inspeção", "05 nov · Registro da equipe"],
      ["Ordem de serviço", "OS-148 · Planejada"],
      ["Responsável", "Equipe de manutenção"],
    ],
    ["Conferir checklist de inspeção.", "Programar próxima intervenção."],
  );
  u.text(304, 399, "PLANTA OPERACIONAL", 12, "soft", 600);
  u.text(
    304,
    426,
    "Localização de equipamentos · Setores A e B",
    15,
    "text",
    500,
  );
  u.path("M356 471H1100V822H356Z M356 658H698 M698 471V822", "soft", 3);
  u.rect(374, 492, 304, 144, "panel", 0, "line");
  u.text(392, 521, "SETOR A · ARMAZENAMENTO", 11, "soft", 600);
  for (let c = 0; c < 5; c++)
    for (let r = 0; r < 2; r++) {
      const x = 393 + c * 54,
        y = 541 + r * 39;
      u.rect(x, y, 40, 29, "inset", 3, "soft");
      u.line(x + 20, y, x + 20, y + 29, "line");
    }
  u.text(380, 702, "ÁREA DE PREPARAÇÃO", 11, "soft", 600);
  for (let i = 0; i < 3; i++) {
    u.rect(384 + i * 95, 727, 73, 56, "tint", 5);
    u.text(397 + i * 95, 760, "EST-0" + (i + 1), 10, "accent");
  }
  u.text(723, 506, "SETOR B · LINHA DE PROCESSO", 11, "soft", 600);
  u.path("M754 570H1023V755H753Z", "soft", 5);
  for (let i = 0; i < 3; i++) {
    const x = 771 + i * 111;
    u.rect(
      x,
      541,
      78,
      58,
      i === 1 ? "tint" : "panel",
      8,
      i === 1 ? "accent" : "soft",
    );
    u.add(
      `<circle cx="${x + 39}" cy="570" r="19" fill="${u.c("inset")}" stroke="${u.c(i === 1 ? "accent" : "soft")}" stroke-width="2"/>`,
    );
    u.line(x + 25, 570, x + 53, 570, "soft");
    u.text(x + 8, 624, "EQ-00" + (i + 3), 12, "text", 500);
  }
  u.rect(801, 709, 177, 76, "panel", 9);
  u.text(824, 738, "Painel da operação", 13, "text", 500);
  u.text(824, 763, "Controle local", 12);
  u.dot(921, 528, 8, "warn");
  u.path("M921 528L1011 453H1118", "warn", 1.5);
  u.pill(1049, 417, "OS-148", "warn", 110);
  u.rect(298, 864, 880, 72, "panel");
  u.dot(320, 890, 4, "good");
  u.text(333, 895, "Inspeção registrada", 14, "text", 600);
  u.text(333, 919, "Consultar histórico e planejar a próxima ação.", 12);
  u.pill(960, 885, "Ver ativo  ↗", "accent", 195);
}

export const engineeringRenderers = [
  technicalPlan,
  mechanical,
  building,
  piping,
  territory,
  assets,
];
