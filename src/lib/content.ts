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
    sections: [
      { title: "Comece pela decisão que precisa tomar", text: "Uma boa demanda descreve o que acontece, quem sente o problema e qual decisão está travada. Imagine pedidos que passam por planilha, e-mail e ERP. O atraso pode vir da digitação duplicada, de uma regra de aprovação ou de dados incompletos. Cada causa pede uma intervenção diferente. Leve três exemplos recentes, incluindo um que saiu errado." },
      { title: "Peça um diagnóstico com evidências", text: "O diagnóstico deve mostrar o fluxo atual, quem responde por cada etapa e onde aparecem as exceções. Combine quais dados podem ser consultados e trabalhe com amostras anonimizadas quando possível. Separe observações de hipóteses. Uma fila que cresce no fim do mês, por exemplo, pode indicar excesso de demanda ou falta de capacidade em uma única etapa." },
      { title: "Compare opções pelo custo de operar", text: "Para cada alternativa, estime implantação, treinamento, licenças, integração e manutenção. Inclua o caminho de aproveitar as ferramentas atuais. Um teste curto pode responder se a API do ERP cobre a rotina ou se ainda seria necessário conferir dados manualmente. Defina antes qual resultado aprova o teste." },
      { title: "Combine o que ficará com sua equipe", text: "Antes de contratar, peça os entregáveis e o critério de conclusão. Um diagnóstico pode terminar com um mapa do fluxo, comparação de alternativas, recomendação e plano de ação com responsáveis. Deixe explícito se a implantação faz parte do escopo e quais acessos serão devolvidos ao fim." },
    ],
  },
  {
    slug: "como-acompanhar-e-melhorar-processos",
    category: "Melhoria de processos",
    title: "Como acompanhar um processo e medir se ele melhorou?",
    excerpt: "Um roteiro para escolher indicadores, investigar atrasos e testar melhorias sem perder de vista o trabalho da equipe.",
    sections: [
      { title: "Escolha uma rotina que tenha início e fim", text: "Em vez de medir o departamento inteiro, escolha uma rotina como cadastrar um pedido ou aprovar uma solicitação. Registre o que conta como entrada, o que significa conclusão e em quais casos o processo é interrompido. Defina um responsável e separe casos comuns de exceções, como solicitações que chegam sem documentação." },
      { title: "Meça tempo e qualidade juntos", text: "Use o tempo entre entrada e conclusão, a proporção de casos reabertos e o número de intervenções manuais. Registre também volume e período. A mediana indica o tempo típico. Para enxergar atrasos que afetam uma parte menor dos casos, olhe os mais lentos ou um percentil alto, se houver amostra suficiente." },
      { title: "Teste uma mudança que você consiga observar", text: "Se as solicitações voltam por falta de informação, teste uma validação na entrada para um grupo ou tipo de solicitação. Combine antes o que espera mudar e monitore possíveis efeitos colaterais, como abandono do formulário ou aumento de chamados. Compare com um período de volume e perfil de casos semelhantes." },
      { title: "Crie uma revisão com dono e decisão", text: "Em cada revisão, escolha uma ocorrência para investigar e uma melhoria para testar. Registre quem responde, quando o grupo volta a olhar o indicador e o que faria a equipe manter, ajustar ou reverter a mudança. Dê acesso ao histórico para quem opera o processo poder explicar o que os números não mostram." },
    ],
  },
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
