# Avaliação da coleção de aplicações

Data: 5 de novembro de 2026. Avaliação técnica e visual realizada sobre os arquivos renderizados e as 20 páginas locais.

## Critérios e evidências

- 20 composições com conteúdo próprio: 10 claras e 10 escuras. Cada tela contém a logo vetorial aprovada, sem redesenho dos glifos.
- Revisão visual das 20 telas rasterizadas, agrupadas em cinco pranchas com quatro telas. Composições incluem calendário, editor de sites, configuração de ERP, operação, funil comercial, relacionamento, conversas, fluxos, previsão, processos, pessoas, financeiro, executivo, cronograma, logística, monitoramento, documentos e portal.
- Verificação geométrica dos textos no navegador: nenhum texto fora do quadro 1600×1100, nenhuma interseção entre textos maior que 2 pixels nos dois eixos.
- Contraste dos textos medido em relação à superfície sólida de fundo na composição: mínimo 4,53:1. Verificação focada na arte; as descrições completas também ficam no HTML.
- 20 páginas abertas no navegador a 390×844: todas carregaram imagem 1600×1100 e três recursos descritivos, sem largura de documento superior à viewport.
- Galeria categorizada, links de detalhes, abertura da imagem em tamanho integral e download de PNG. Menu compacto no celular, alvos de toque e navegação sem JavaScript adicional.
- Descrições, texto alternativo, ImageObject, breadcrumbs, imagem social individual e sitemaps verificados no HTML de produção gerado.
- Dados fictícios e contexto de conceito de interface visíveis nas páginas. Nenhum nome de cliente, dado privado ou resultado real foi usado.
- Referências consultadas via MCP 21st registradas em referencias-aplicacoes-21st.md; refinamento seguindo a skill apple-design (hierarquia, legibilidade, consistência, controle do usuário e contenção visual).

## Coleção aprovada na revisão local

| Tela | Tema | Logo, composição, descrição e página |
| --- | --- | --- |
| 01 · Publicações no LinkedIn | Claro | Verificado |
| 02 · Sites e experiências digitais | Escuro | Verificado |
| 03 · Seu ERP, conectado à operação | Claro | Verificado |
| 04 · ERP desenvolvido sob medida | Escuro | Verificado |
| 05 · CRM para seu processo comercial | Claro | Verificado |
| 06 · Relacionamento com contexto | Escuro | Verificado |
| 07 · Atendimento no WhatsApp | Claro | Verificado |
| 08 · Fluxos personalizados no WhatsApp | Escuro | Verificado |
| 09 · Processos e aprovações | Claro | Verificado |
| 10 · IA integrada aos seus fluxos | Escuro | Verificado |
| 11 · Modelos preditivos personalizados | Claro | Verificado |
| 12 · Desempenho dos processos | Escuro | Verificado |
| 13 · Gestão de pessoas e equipes | Claro | Verificado |
| 14 · Faturamento e recebimentos | Escuro | Verificado |
| 15 · Visão executiva do negócio | Claro | Verificado |
| 16 · Projetos e entregas | Escuro | Verificado |
| 17 · Logística e acompanhamento | Claro | Verificado |
| 18 · Monitoramento de sistemas | Escuro | Verificado |
| 19 · Assistente conectado a documentos | Claro | Verificado |
| 20 · Portal de acompanhamento do cliente | Escuro | Verificado |

## Reprodução

```sh
npm run generate:screens
npm run check
npm run build
npm run verify:site
```

A verificação executável confere logo, quantidade, unicidade dos rasters, dimensões, conteúdo, vínculos e sitemaps. A avaliação de composição foi feita inspecionando as imagens. Evidência de geometria, contraste e páginas móveis em avaliacao-aplicacoes.json.

## Descoberta de imagens

O sitemap de imagens tem 20 entradas, uma por página de solução, com o PNG principal no mesmo domínio. Está incluído no sitemap-index.xml e no robots.txt. A documentação oficial do Google recomenda imagens em elementos img e contexto útil na página: https://developers.google.com/search/docs/appearance/google-images.

Publicação e indexação são etapas diferentes. O rastreamento e a seleção dos resultados dependem do Google.

## Ampliação para 26 interfaces: engenharia e operação

Seis novas composições originais: desenho técnico 2D com planta e cotas, conjunto mecânico em vista explodida, revisão espacial de edificação, diagrama industrial, mapa territorial esquemático e planta operacional com manutenção de ativos. Três temas claros e três escuros.

Revisão visual dos seis rasters, verificação da geometria dos textos e medição de contraste. Foi corrigida uma interseção entre o indicador de eixo Y e um status de revisão no modelo da edificação. Verificação final: nenhum texto fora do quadro ou sobreposto; contraste mínimo medido 4,53:1.

As seis páginas foram abertas a 390×844: imagens 1600×1100 carregadas, três recursos por solução e sem rolagem horizontal excedente. O verificador confere as 26 páginas, os sitemaps, as 26 imagens distintas e todos os caminhos da logo aprovada.

A galeria identifica esses materiais como conceitos, com dados fictícios. Não há marcas, interfaces copiadas ou declarações de integração, certificação ou compatibilidade com aplicativos de terceiros. Os projetos usam geometria desenhada diretamente no gerador.

## Ampliação para 36 interfaces: dez operações especializadas

Seleção para ampliar as situações de uso apresentadas: produção e instalações industriais, armazém, campo, qualidade, obras, energia, compras B2B, serviços e integrações. São conceitos originais com dados fictícios. Não representam resultados medidos em clientes nem integração validada com programas de terceiros.

| Aplicação | Oportunidade representada |
| --- | --- |
| Produção industrial e ordens | Coordenar ordens, células e apontamentos da produção |
| Supervisão de instalações | Contextualizar equipamentos, leituras e ocorrências |
| Armazém e separação de pedidos | Organizar endereços, ondas de coleta e conferência |
| Planejamento e operação agrícola | Planejar áreas, atividades e responsáveis em campo |
| Inspeção visual com IA | Apoiar revisão humana de regiões de interesse na inspeção |
| Orçamento e quantitativos de obras | Relacionar elementos de projeto, quantidades e composições |
| Gestão de energia e consumo | Acompanhar fontes, cargas e consumo por área |
| Portal comercial B2B | Facilitar catálogo e montagem de pedidos entre empresas |
| Agenda de equipes de campo | Organizar disponibilidade e preparação das visitas técnicas |
| Central de integrações e dados | Mapear, transformar e validar dados entre sistemas |

Avaliação: revisão dos dez rasters em três pranchas; nenhum texto fora do quadro ou sobreposto; contraste mínimo medido de 4,53:1. Foi reforçado o contraste dos horários na agenda. Valores do balanço de potência e quantidade de visitas foram conferidos.

As dez páginas foram abertas a 390×844, com imagem 1600×1100 e três recursos descritivos, sem rolagem horizontal excedente. Check, build e verificação do site passaram: 59 páginas, 36 interfaces e 36 imagens distintas com logo aprovada. Cinco novas interfaces claras e cinco escuras, totalizando 18 de cada tema. Evidências em avaliacao-aplicacoes.json.

## Apresentação da experiência da empresa

Em 6 de novembro de 2026, a pedido do fundador, a página passou a apresentar o repertório técnico, a experiência e as capacidades da empresa. Menu, home, rodapé, breadcrumbs, metadados, introdução e páginas de detalhe foram alinhados com essa direção. Título principal: Nossa experiência, aplicada ao seu negócio.

As interfaces são exemplos visuais das capacidades da equipe. A redação trata de competências e forma de trabalho, sem atribuir as 36 interfaces a um número de contratos, clientes ou resultados. Foram retiradas da apresentação as chamadas centradas em projetos futuros e a distinção editorial entre tipos de interface. Imagens e rotas foram preservadas.
