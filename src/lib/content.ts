const capabilities = [
  {
    slug: "automacao-e-integracoes",
    num: "02",
    title: "Automação e integrações",
    short: "Menos etapas manuais. Mais continuidade entre seus sistemas.",
    description:
      "Integramos APIs, dados e processos para reduzir tarefas repetitivas e dar visibilidade ao que acontece em cada execução.",
    examples: [
      "Conexão entre sistemas e fontes de dados",
      "Automação de rotinas operacionais",
      "Monitoramento e tratamento de falhas",
    ],
  },
  {
    slug: "inteligencia-artificial",
    num: "03",
    title: "Inteligência artificial",
    short: "IA aplicada a problemas que merecem uma solução.",
    description:
      "Construímos assistentes e fluxos com IA conectados ao contexto do negócio, com permissões, limites e critérios de validação.",
    examples: [
      "Assistentes para consultar informações autorizadas",
      "Fluxos de apoio à análise e produção de documentos",
      "Integração de modelos de IA a aplicações",
    ],
  },
] as const;
export const services = [
  {
    slug: "software-sob-medida",
    num: "01",
    examples: ["Sistemas para organizar operações e informações", "Portais e áreas de trabalho para equipes", "Interfaces para fluxos específicos do negócio"],
    title: "Desenvolvimento sob medida",
    short: "Quando sua equipe precisa de um sistema que acompanhe as regras da operação.",
    description: "Criamos sistemas, portais e ferramentas internas sob medida. Da primeira tela à implantação, trabalhamos com quem usa o sistema para validar as rotinas que ele precisa atender.",
    steps: [
      ["Recortamos a primeira entrega", "Mapeamos usuários, regras e integrações. Escolhemos um fluxo completo para validar cedo, com exemplos de uso e critérios de aceite."],
      ["Construímos e testamos com a equipe", "Desenhamos a interface, implementamos o fluxo e testamos permissões, integrações e cenários de falha antes de implantar."],
      ["Preparamos a entrada em operação", "Combinamos a migração, documentamos os acessos e registramos quem cuida da operação após a entrega."],
    ],
    guide: "quando-desenvolver-software-sob-medida",
  },
  {
    slug: "consultoria-tecnologica",
    num: "02",
    title: "Consultoria tecnológica",
    short: "Quando existe um problema claro e ainda é preciso escolher como resolvê-lo.",
    description: "Investigamos gargalos, avaliamos ferramentas e comparamos caminhos para uma decisão técnica. A consultoria pode ser contratada como uma etapa independente.",
    examples: ["Escolher entre integrar, comprar ou construir", "Investigar atrasos e retrabalho em uma operação", "Avaliar a viabilidade de automação ou IA"],
    steps: [
      ["Investigamos com quem executa o processo", "Acompanhamos casos reais, levantamos os sistemas envolvidos e registramos onde há espera, duplicidade ou risco."],
      ["Comparamos opções com critérios explícitos", "Consideramos esforço, custo de operação, dependências e riscos. Quando há incerteza técnica relevante, delimitamos o que um teste precisa responder."],
      ["Entregamos um plano de decisão", "Documentamos a recomendação, suas premissas e uma sequência de ações. Sua equipe pode executar o plano internamente ou nos contratar para implementar."],
    ],
    guide: "consultoria-tecnologica-quando-contratar",
  },
  {
    slug: "acompanhamento-de-processos",
    num: "03",
    title: "Acompanhamento de processos",
    short: "Quando a operação já roda e sua equipe quer melhorar com base no que acontece no dia a dia.",
    description: "Acompanhamos processos e sistemas em uso. Definimos indicadores, investigamos desvios com a equipe e priorizamos melhorias em ciclos.",
    examples: ["Investigar falhas recorrentes em uma integração", "Reduzir conferências e lançamentos manuais", "Evoluir um sistema a partir de dificuldades observadas em uso"],
    steps: [
      ["Definimos o ponto de partida", "Escolhemos um fluxo, registramos como ele funciona hoje e combinamos quais dados e indicadores dão visibilidade ao problema."],
      ["Revisamos evidências em uma cadência acordada", "Olhamos ocorrências, tempo de execução e exceções com quem opera o fluxo. Cada melhoria entra em uma fila com responsável e critério de validação."],
      ["Medimos o efeito de cada mudança", "Comparamos períodos equivalentes e registramos o que funcionou. As descobertas guiam o próximo ciclo."],
    ],
    guide: "como-acompanhar-e-melhorar-processos",
  },
] as const;

export const servicePages = [
  ...services,
  {
    ...capabilities[0],
    steps: [
      ["Mapeamos entradas e exceções", "Identificamos a fonte de cada dado, a regra de processamento e quem decide em casos fora do padrão."],
      ["Validamos um piloto", "Testamos duplicidades, indisponibilidade e retomada do fluxo antes de ampliar o volume."],
    ],
    guide: "automatizar-processos-com-seguranca",
  },
  {
    ...capabilities[1],
    steps: [
      ["Delimitamos a tarefa e as fontes", "Definimos a finalidade do assistente, quais dados podem ser consultados e as permissões de cada usuário."],
      ["Avaliamos antes de ampliar o uso", "Testamos respostas com casos reais autorizados, incluindo perguntas sem resposta e pedidos fora do escopo."],
    ],
    guide: "ia-empresarial-com-contexto-e-limites",
  },
] as const;

export const articles = [
  {
    slug: "consultoria-tecnologica-quando-contratar",
    category: "Consultoria tecnológica",
    title: "O que uma consultoria tecnológica entrega e quando contratar?",
    excerpt: "Veja como transformar um gargalo operacional em uma decisão entre ajustar o processo, integrar ferramentas ou desenvolver um sistema.",
  },
  {
    slug: "como-acompanhar-e-melhorar-processos",
    category: "Melhoria de processos",
    title: "Como acompanhar um processo e medir se ele melhorou?",
    excerpt: "Um roteiro para escolher indicadores, investigar atrasos e testar melhorias sem perder de vista o trabalho da equipe.",
  },
  {
    slug: "quando-desenvolver-software-sob-medida",
    category: "Produto & engenharia",
    title: "Quando faz sentido desenvolver software sob medida?",
    excerpt:
      "Comece pelo processo, pelas pessoas e pelos limites das ferramentas que você já usa.",
  },
  {
    slug: "automatizar-processos-com-seguranca",
    category: "Automação",
    title: "Antes de automatizar, entenda as exceções.",
    excerpt:
      "Um fluxo confiável precisa saber o que fazer quando o caminho esperado não acontece.",
  },
  {
    slug: "ia-empresarial-com-contexto-e-limites",
    category: "Inteligência artificial",
    title: "Uma IA útil começa com contexto e limites claros.",
    excerpt:
      "Escolher o modelo é uma parte do trabalho. Definir dados, permissões e avaliação é outra igualmente importante.",
  },
] as const;
