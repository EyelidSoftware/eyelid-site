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
