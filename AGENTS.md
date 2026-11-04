# Instruções do projeto

Site institucional da Eyelid e páginas de produto. Astro, estático, servido por
nginx. Leia o `README.md` para o contexto completo.

## Regras deste repositório

**Zero JavaScript por padrão.** É o motivo de termos escolhido Astro. Antes de
adicionar uma diretiva `client:*`, pergunte se aquilo realmente precisa rodar no
navegador. Uma landing page raramente precisa.

**Nada de marca escrito à mão.** Nome de empresa, URLs, e-mail e lista de
produtos ficam em `src/lib/site.ts`. Nada de `"Eyelid"` ou
`"https://eyelid.com.br"` solto em página ou componente.

**Nada de cor ou espaçamento solto.** Use os tokens de `src/styles/tokens.css`.
A identidade aprovada é monocromática: Ink, branco e cinzas. Quicksand nos títulos e Inter no corpo. Os SVGs aprovados da marca estão em public/brand.

**Toda página passa por `BaseLayout` com `title` e `description`.** São eles que
alimentam `<title>`, meta description e Open Graph. Página sem isso é página que
compartilha mal.

**Preço nunca é escrito à mão.** Vem de `src/lib/plans.ts`, que busca a API
pública do AutoFeedr no build.

## Antes de abrir PR

```bash
npm run check   # tipos e referências
npm run build   # pega erros que o check não vê
```

`astro check` **não** detecta erro de sintaxe dentro de expressões `{}` — por
exemplo, comentário HTML `<!-- -->` onde deveria ser `{/* */}`. Só o `build`
acusa. Rode os dois.

## Verificação que vale a pena

Depois de mexer em SEO ou em preço, confira o HTML gerado, não o navegador:

```bash
npm run build
grep -o '<meta property="og:[^>]*>' dist/autofeedr.html
grep -c '<script src' dist/autofeedr.html   # esperado: 0
```

## Documentação

https://docs.astro.build

Guias úteis:

- [Rotas e páginas](https://docs.astro.build/en/guides/routing/)
- [Componentes Astro](https://docs.astro.build/en/basics/astro-components/)
- [Componentes React/Vue/Svelte (ilhas)](https://docs.astro.build/en/guides/framework-components/)
- [Coleções de conteúdo (para o blog)](https://docs.astro.build/en/guides/content-collections/)
