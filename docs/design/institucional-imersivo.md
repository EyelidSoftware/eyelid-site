# Direção visual institucional: tecnologia em uso

Direção visual institucional e critérios de publicação.

A página inicial apresenta a Eyelid como software house que acompanha a operação, identifica oportunidades, desenvolve e evolui soluções com o cliente. Mantém marca vetorial aprovada, fontes locais e identidade monocromática.

## Referências consultadas

Via MCP autenticado do 21st.dev, em 05/11/2026:

- Tilted Grid Hero, ruixen.ui, demo 36749: https://21st.dev/@ruixen.ui/components/tilted-grid-hero
- Perspective Tunnel Hero, daiwiikharihar, demo 39043: https://21st.dev/@daiwiikharihar/components/perspective-tunnel-hero

Ambos estavam nos favoritos do fundador. A consulta e a recuperação dos códigos usaram a cota gratuita. A implementação adapta em Astro/CSS/JavaScript nativo a geometria cilíndrica com 16 fatias por painel do Tilted Grid Hero e o deslocamento no eixo Z do Perspective Tunnel Hero. Não instala React nem captura eventos de roda para impedir a rolagem da página.

Referências de apresentação e conteúdo: https://www.work.co/company/ e https://www.thoughtworks.com/about-us. São referências de mercado, não uma classificação confirmada de concorrentes diretos.

## Conteúdo

- Abertura escura com interfaces em perspectiva e profundidade.
- Exemplos de software sob medida, assistentes de IA e integrações.
- Acompanhamento de processos e tratamento de falhas.
- Etapas de trabalho e participação semanal do cliente.
- Soluções modulares conectadas e artigos recentes.

As interfaces são ilustrações com dados fictícios, não telas de clientes nem métricas da empresa. Não há envio de dados, inferência de IA ou execução real de automações na página.

## Implementação

O conteúdo permanece estático e indexável. Um módulo JavaScript inline, restrito à home, mede a faixa curva com ResizeObserver e anima a profundidade do túnel com requestAnimationFrame. A faixa curva usa transformações CSS. Pausa quando está fora da tela ou a aba fica oculta. Os dois efeitos acompanham a rolagem ou o ponteiro, sem reprodução contínua e sem botão de pausa. Respeitam a preferência de movimento reduzido e mantêm alternativa com imagens para JavaScript desabilitado. As oito telas vetoriais são próprias e locais: operação, automação, assistente e monitoramento, cada uma em tema claro e escuro. Links, artigos, URLs canônicas, verificação Search Console e sitemap são preservados.

## Simplificação de navegação

Home organizada em cinco seções: abertura, soluções, método, artigos e contato. O menu leva diretamente às seções da home e ao blog. Descrições curtas apontam para as páginas completas de cada serviço. As telas curvas aparecem uma única vez, sem painéis estáticos repetidos ou chamadas intermediárias redundantes.

## Continuidade visual e telas

A home usa um fundo escuro contínuo com textura fixa discreta, seções transparentes e separadores finos. Cabeçalho e rodapé compartilham essa composição. Os painéis apresentam navegação, indicadores, gráficos, tabelas, fontes de documentos e histórico de execução. São gerados de forma reproduzível com scripts/generate-visuals.py, sem fontes de dados externas. As telas claras e escuras alternam na composição.

## Refinamento dos painéis

As interfaces têm composições próprias por solução: indicadores e prioridades na operação, fluxo ramificado na automação, documento de análise no assistente e mapa de atividade no monitoramento. A faixa curva usa um limite de pintura com folga vertical para conter a projeção 3D sem cortar os painéis visíveis. Elementos fora do arco são retirados da renderização. A entrada e saída são suavizadas por opacidade calculada pelo ângulo, sem máscara retangular no palco.


## Navegação dos painéis e limites de rolagem

A faixa aceita rolagem horizontal nativa por trackpad ou toque, arraste do mouse e setas do teclado. Home e End chegam aos limites internos. O eixo vertical continua rolando a página; não há interceptação da roda vertical. Após a primeira interação horizontal, a seleção fica sob controle do visitante.

O documento tem contenção horizontal e overscroll desativado. A faixa tem uma área de pintura delimitada e acolchoada, impedindo que a projeção 3D aumente a altura da página.

Validação local em 05/11/2026: no desktop, altura estável de 4038 px, igual ao fim do rodapé; novas tentativas de rolagem mantiveram scrollY em 3168 no fim e 0 no topo. Na largura de celular, altura estável de 5144 px e fim em scrollY 4300. Largura do documento de 990 px e 375 px respectivamente, sem deslocamento horizontal da página. Confirmados scroll horizontal nativo, arraste do mouse, setas e preservação da rolagem vertical sobre a faixa.
