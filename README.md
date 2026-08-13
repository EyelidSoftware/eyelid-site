# eyelid-site

Site institucional da **Eyelid** e das páginas de produto — hoje, o AutoFeedr.

Publicado em `https://eyelid.com.br`. O painel do AutoFeedr (área logada) vive
em outro lugar, `https://autofeedr.eyelid.com.br`, e tem
[repositório próprio](https://github.com/LuigiNeto01/AutoFeedr).

---

## Por que Astro

O site existe para ser **encontrado e compartilhado**. Isso descarta uma SPA:

- Os robôs do **LinkedIn, WhatsApp e Slack não executam JavaScript**. Eles leem
  o HTML servido. Se as tags Open Graph fossem montadas no navegador, o card de
  compartilhamento sairia vazio — justamente no LinkedIn, onde divulgamos um
  produto de LinkedIn.
- O Googlebot até executa JS, mas numa segunda passada, com atraso. Não vale
  apostar a página de preços nisso.

O Astro entrega HTML puro e **zero JavaScript por padrão**. Quando um trecho
precisa de interatividade, marcamos só ele (`client:visible`), e ele pode ser um
componente React. O build sai como arquivos estáticos, servidos pelo nginx.

## Rodando

```bash
npm install
npm run dev      # http://localhost:4321
```

| Comando | O que faz |
|---|---|
| `npm run dev` | servidor de desenvolvimento |
| `npm run check` | valida tipos e referências dos componentes |
| `npm run build` | gera o site estático em `dist/` |
| `npm run preview` | serve o `dist/` para conferir o resultado final |

> `npm run check` não pega tudo. Erros de sintaxe dentro de expressões `{}`
> só aparecem no `build` — rode os dois antes de abrir PR.

## Estrutura

```
src/
├── components/
│   ├── Seo.astro          # todo o <head> de SEO: OG, canonical, JSON-LD
│   ├── Header.astro
│   ├── Footer.astro
│   └── PricingTable.astro
├── layouts/
│   └── BaseLayout.astro   # casca de toda página
├── lib/
│   ├── site.ts            # nome, URLs, contatos, produtos — fonte única
│   └── plans.ts           # busca os preços da API no build
├── pages/                 # cada arquivo vira uma rota
│   ├── index.astro        # /           Eyelid (empresa)
│   ├── autofeedr/         # /autofeedr  produto
│   ├── sobre.astro
│   ├── contato.astro
│   └── 404.astro
└── styles/
    ├── tokens.css         # paleta e escalas (espelha o painel do AutoFeedr)
    └── base.css           # reset e primitivos (.container, .btn, .card)
```

### Convenções

**Nada de marca escrito à mão.** Nome de empresa, URL, e-mail e lista de
produtos ficam em `src/lib/site.ts`. Se aparecer `"Eyelid"` fora de lá, é bug —
quando mudar, vai mudar pela metade.

**Nada de cor solta.** Use os tokens de `tokens.css`. A paleta é a mesma do
painel do AutoFeedr para site e produto parecerem a mesma empresa; se um valor
mudar lá, espelhe aqui.

**Toda página usa `BaseLayout` e informa `title` + `description`.** São eles que
alimentam o `<title>`, a meta description e as tags Open Graph.

## Preços vêm da API, no build

`src/lib/plans.ts` busca `https://autofeedr.eyelid.com.br/api/plans` **durante o
build**. Essa rota é pública.

Ou seja: o preço entra no HTML servido (bom para SEO e para os cards sociais),
não há requisição no navegador nem CORS, e a tabela **nunca desencontra do que
está configurado no admin**. Mudou o preço lá, o próximo build reflete aqui.

Se a API estiver fora na hora do build, entra um fallback e o site continua
subindo — mas aparece um aviso no log e uma nota discreta na página. Um site no
ar com preço velho é melhor que nenhum site no ar; o aviso existe para
percebermos.

## Deploy

O `Dockerfile` espelha o padrão do frontend do AutoFeedr: build em Node, serve
em nginx.

```bash
docker build -t eyelid-site .
docker run -p 8080:80 eyelid-site
```

Em produção ele entra como mais um serviço no mesmo servidor.

## Pendências

Coisas que faltam antes de publicar:

- [ ] **Logo da Eyelid.** `public/brand/eyelid-mark.svg` é um marcador
      provisório que eu desenhei para destravar a estrutura — não é a marca
      oficial. Substituir pelo vetor real.
- [ ] **Imagem de compartilhamento.** `Seo.astro` aponta para
      `/og/default.png` (1200x630), que ainda não existe. Sem ela, o card do
      LinkedIn sai sem imagem.
- [ ] **Conteúdo.** As páginas `/sobre` e `/contato` estão com texto de
      espaço reservado. A landing do AutoFeedr tem só herói e preços — faltam
      as seções que realmente convertem.
- [ ] **Definir o deploy.** O nginx que faz TLS hoje vive no repositório do
      AutoFeedr e só conhece o domínio do painel. Para servir `eyelid.com.br`
      é preciso decidir: estender aquele nginx (acopla os dois repositórios) ou
      dar ao site o seu próprio proxy com certbot.
- [ ] **DNS.** Apontar `eyelid.com.br` para o servidor.
- [ ] **Blog.** Quando existir, usar coleções de conteúdo do Astro — é o que
      move SEO a médio prazo.
