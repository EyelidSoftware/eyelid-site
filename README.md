# eyelid / Site institucional

Site estático em Astro, com identidade aprovada, páginas de serviços, contato e blog. A hospedagem de destino é Cloudflare Workers Static Assets, na conta da empresa.

## Desenvolvimento

Requer Node.js 22.12 ou superior.

```sh
npm ci
npm run dev
```

## Validar antes de publicar

```sh
npm run check
npm run build
npm run verify:site
npm run preview
```

O build gera `dist/`, sem backend ou banco de dados. A home tem um módulo JavaScript local para profundidade e navegação horizontal dos painéis; o restante do conteúdo é estático e indexável. O contato usa `mailto:`, não um formulário de envio. O endereço atualmente configurado é `contato@eyelid.com.br`; confirme a existência e o atendimento da caixa no serviço de e-mail.

## Conteúdo e identidade

- `src/lib/site.ts`: marca, domínio e contatos.
- `src/lib/content.ts`: serviços e artigos iniciais. Adicione artigos ao array para gerar novas páginas em `/blog`.
- `src/styles/tokens.css`: cores, fontes, espaçamento e tipografia.
- `public/brand`: vetores aprovados, símbolo 02 e escrita 13B.
- `public/fonts`: fontes hospedadas localmente e respectivas licenças.
- `public/og/default.png`: imagem de compartilhamento.
- `public/visuals`: telas vetoriais próprias em temas claro e escuro, geradas com `python3 scripts/generate-visuals.py`.
- `src/components/CurvedPanels.astro`: faixa de painéis com scroll horizontal nativo, arraste e teclado.

Não publicar nomes de clientes, métricas internas, depoimentos ou cases sem autorização. Os artigos iniciais são conteúdo editorial geral; não descrevem resultados medidos em clientes.

A rota `/autofeedr` permanece disponível e direciona à aplicação existente. Não exibe preços de fallback nem depende de uma API externa para construir o site.

## Cloudflare

O arquivo `wrangler.jsonc` configura exclusivamente arquivos estáticos, com página 404 própria. Na integração Git da Cloudflare:

- Repositório: `EyelidSoftware/eyelid-site`.
- Branch de produção: `main`.
- Build: `npm ci && npm run check && npm run build && npm run verify:site`.
- Deploy: `npx wrangler deploy`.
- Preview de branch, se habilitado: `npx wrangler versions upload`.

Use somente recursos gratuitos. Não habilite banco, armazenamento ou processamento dinâmico sem necessidade. Nunca inclua credenciais no código. A conexão entre Cloudflare e GitHub deve ficar limitada a este repositório.

## Domínio, e-mail e rollback

Preserve os registros Zoho de MX, SPF, verificação e DKIM e o A de `autofeedr` durante mudanças de DNS. A migração de DNSSEC requer coordenação entre Registro.br e Cloudflare para evitar assinaturas inválidas. Nunca copie uma chave DS de outro provedor.

Cada publicação deve ser verificada no domínio real: HTTPS, páginas internas, 404, metadados, imagem social e DNS de e-mail. Para reverter conteúdo, restaure uma versão anterior na Cloudflare ou reverta o commit no GitHub e publique novamente. Inventários operacionais com registros e evidências ficam fora deste repositório.
