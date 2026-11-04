export const services = [
  {
    slug: "software-sob-medida",
    num: "01",
    title: "Software sob medida",
    short: "Aplicações que acompanham a forma como sua empresa trabalha.",
    description:
      "Desenvolvimento de sistemas web, portais e ferramentas internas, com atenção à arquitetura, à interface e à evolução do produto.",
    examples: [
      "Sistemas para organizar operações e informações",
      "Portais e áreas de trabalho para equipes",
      "Interfaces para fluxos específicos do negócio",
    ],
    questions: [
      "Quem vai usar a solução e qual tarefa precisa realizar?",
      "Quais regras e sistemas já fazem parte da operação?",
      "Como validar a primeira entrega com quem vai usá-la?",
    ],
  },
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
    questions: [
      "Onde a equipe repete a mesma tarefa?",
      "Qual é a fonte de verdade de cada informação?",
      "O que deve acontecer quando uma etapa falhar?",
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
    questions: [
      "Que decisão ou tarefa a IA vai apoiar?",
      "Quais informações podem ser utilizadas?",
      "Como avaliar respostas e manter supervisão humana?",
    ],
  },
] as const;
export const articles = [
  {
    slug: "quando-desenvolver-software-sob-medida",
    category: "Produto & engenharia",
    title: "Quando faz sentido desenvolver software sob medida?",
    excerpt:
      "Comece pelo processo, pelas pessoas e pelos limites das ferramentas que você já usa.",
    sections: [
      {
        title: "O ponto de partida é o trabalho",
        text: "Antes de escolher uma tecnologia, descreva a atividade que precisa melhorar. Quem a executa? O que dispara o processo? Onde surgem retrabalho e dúvidas? Uma conversa com quem vive a operação costuma revelar necessidades que uma lista de funcionalidades não mostra.",
      },
      {
        title: "Compare adaptação e desenvolvimento",
        text: "Uma ferramenta pronta pode atender bem quando o processo é comum e há pouca necessidade de integração. O desenvolvimento sob medida merece consideração quando regras específicas, múltiplos sistemas ou uma experiência própria são centrais para o negócio. Compare o custo total: implantação, treinamento, integração, manutenção e evolução.",
      },
      {
        title: "Defina uma primeira entrega verificável",
        text: "Evite começar tentando reproduzir toda a operação. Escolha um fluxo relevante e delimite o que estará pronto na primeira versão. Defina quem irá testar, quais situações precisam funcionar e o que comprova que a solução ajudou. O aprendizado desse ciclo orienta as próximas decisões.",
      },
      {
        title: "Considere a vida depois da entrega",
        text: "Um sistema precisa de manutenção, responsáveis, documentação e um caminho de evolução. Antes de contratar, alinhe como serão tratados acessos, dados, implantação, correções e suporte. A qualidade da solução inclui a capacidade de continuar funcionando e de ser compreendida por outras pessoas.",
      },
    ],
  },
  {
    slug: "automatizar-processos-com-seguranca",
    category: "Automação",
    title: "Antes de automatizar, entenda as exceções.",
    excerpt:
      "Um fluxo confiável precisa saber o que fazer quando o caminho esperado não acontece.",
    sections: [
      {
        title: "Mapeie o caminho real",
        text: "Documente a entrada, as regras, a saída e as pessoas responsáveis por cada etapa. Observe casos reais, incluindo aqueles que fogem do padrão. Automatizar um processo pouco compreendido pode apenas fazer os mesmos erros acontecerem mais rápido.",
      },
      {
        title: "Projete para entradas repetidas e falhas",
        text: "Um arquivo pode chegar duas vezes. Uma API pode ficar indisponível. Um dado obrigatório pode estar ausente. Decida quais situações permitem nova tentativa, quais precisam de revisão humana e como evitar operações duplicadas. O comportamento de falha deve fazer parte do desenho inicial.",
      },
      {
        title: "Torne a execução observável",
        text: "Registre início, fim, resultado e motivo de interrupção. Use identificadores para acompanhar uma execução entre etapas, sem registrar credenciais ou conteúdo sensível desnecessário. Defina quem será avisado e quais informações essa pessoa precisa para agir.",
      },
      {
        title: "Valide com um piloto",
        text: "Comece com um conjunto controlado de operações e compare os resultados com a rotina existente. Meça tempo de processamento, intervenções manuais e erros antes e depois. Esses dados permitem avaliar o impacto real, em vez de assumir que toda automação gera economia automaticamente.",
      },
    ],
  },
  {
    slug: "ia-empresarial-com-contexto-e-limites",
    category: "Inteligência artificial",
    title: "Uma IA útil começa com contexto e limites claros.",
    excerpt:
      "Escolher o modelo é uma parte do trabalho. Definir dados, permissões e avaliação é outra igualmente importante.",
    sections: [
      {
        title: "Escolha uma tarefa concreta",
        text: "Consultar uma informação, apoiar uma análise ou preparar um documento são objetivos mais verificáveis do que simplesmente adicionar IA ao negócio. Descreva a tarefa, o público e as situações em que a ferramenta deve pedir ajuda ou declarar que não possui informação suficiente.",
      },
      {
        title: "Organize as fontes e os acessos",
        text: "Defina quais documentos e sistemas podem ser consultados e quais permissões se aplicam a cada pessoa. A conexão técnica com uma fonte não significa que todo usuário deva acessar seu conteúdo. Considere atualização, qualidade e contexto dos dados ao desenhar a solução.",
      },
      {
        title: "Avalie além de uma demonstração",
        text: "Uma boa resposta isolada não demonstra confiabilidade. Monte exemplos representativos, incluindo perguntas ambíguas, ausência de dados e pedidos fora do escopo. Verifique a consistência das respostas e a capacidade de explicar limitações. O nível de supervisão deve acompanhar o risco da tarefa.",
      },
      {
        title: "Planeje operação e melhoria",
        text: "Estabeleça como acompanhar falhas, consumo e retorno dos usuários. Revise instruções e integrações a partir de problemas observados. Preserve a rastreabilidade necessária sem acumular conteúdo sensível sem finalidade. Uma aplicação de IA exige cuidado contínuo com a experiência e com os limites definidos.",
      },
    ],
  },
] as const;
