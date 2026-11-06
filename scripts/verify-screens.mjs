import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { createHash } from "node:crypto";
import sharp from "sharp";

const screens = JSON.parse(await readFile("src/lib/screens.json", "utf8"));
assert(screens.length >= 26, "coleção com pelo menos 26 soluções");
assert.equal(
  new Set(screens.map((s) => s.slug)).size,
  screens.length,
  "slugs únicos",
);
assert.equal(screens.filter((s) => s.theme === "light").length, 13);
assert.equal(screens.filter((s) => s.theme === "dark").length, 13);
const gallery = await readFile("dist/solucoes.html", "utf8");
const sitemap = await readFile("dist/sitemap-imagens.xml", "utf8");
const index = await readFile("dist/sitemap-index.xml", "utf8");
const pages = await readFile("dist/sitemap-0.xml", "utf8");
assert(index.includes("/sitemap-imagens.xml"), "sitemap de imagens no índice");
assert.equal((sitemap.match(/<image:loc>/g) || []).length, screens.length);
const approvedLogo = await readFile("public/brand/logo.svg", "utf8");
const logoPaths = [...approvedLogo.matchAll(/\sd="([^"]+)"/g)].map((m) => m[1]);
assert(logoPaths.length > 0);
const hashes = new Set(),
  results = [];
for (const s of screens) {
  const base = `solucoes/eyelid-${s.slug}`;
  const svg = await readFile(`public/${base}.svg`, "utf8");
  assert(
    logoPaths.every((d) => svg.includes(`d="${d}"`)),
    `${s.slug}: logo aprovada completa`,
  );
  assert(
    svg.includes(s.title) && svg.includes(s.description),
    `${s.slug}: título e descrição acessível`,
  );
  assert(
    !/(?:href|src)="https?:/.test(svg),
    `${s.slug}: vetor independente de recursos remotos`,
  );
  assert(
    (svg.match(/<text /g) || []).length >= 45,
    `${s.slug}: interface com conteúdo completo`,
  );
  const png = await readFile(`public/${base}.png`);
  hashes.add(createHash("sha256").update(png).digest("hex"));
  const meta = await sharp(png).metadata();
  assert.equal(meta.width, 1600);
  assert.equal(meta.height, 1100);
  assert(
    (await sharp(png).stats()).channels.slice(0, 3).every((c) => c.stdev > 15),
    `${s.slug}: raster não vazio`,
  );
  for (const [ext, w, h] of [
    ["webp", 800, 550],
    ["-social.png", 1200, 630],
  ]) {
    const file = ext.startsWith("-")
      ? `public/${base}${ext}`
      : `public/${base}.${ext}`;
    const m = await sharp(file).metadata();
    assert.equal(m.width, w);
    assert.equal(m.height, h);
  }
  const html = await readFile(`dist/solucoes/${s.slug}.html`, "utf8");
  assert(html.includes(`src="/${base}.png"`), `${s.slug}: imagem no HTML`);
  assert(
    gallery.includes(`/solucoes/${s.slug}`) &&
      gallery.includes(`/${base}.webp`),
    `${s.slug}: presente na galeria`,
  );
  assert(
    pages.includes(`/solucoes/${s.slug}</loc>`),
    `${s.slug}: página no sitemap`,
  );
  assert(
    sitemap.includes(`/${base}.png</image:loc>`),
    `${s.slug}: imagem no sitemap`,
  );
  assert(
    html.includes("dados fictícios"),
    `${s.slug}: contexto público honesto`,
  );
  assert(!html.includes("noindex"), `${s.slug}: indexação permitida`);
  const ld = [
    ...html.matchAll(
      /<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/g,
    ),
  ].map((m) => JSON.parse(m[1]));
  const image = ld.find((s) => s["@type"] === "ImageObject");
  assert(
    image && image.contentUrl.endsWith(`/${base}.png`),
    `${s.slug}: ImageObject correto`,
  );
  assert.equal(image.width, 1600);
  assert.equal(image.height, 1100);
  assert(
    html.includes(`content="https://eyelid.com.br/${base}-social.png"`),
    `${s.slug}: imagem social específica`,
  );
  results.push({
    slug: s.slug,
    title: s.title,
    theme: s.theme,
    width: meta.width,
    height: meta.height,
    pngBytes: (await stat(`public/${base}.png`)).size,
    approvedLogo: true,
    landingPage: true,
    imageSitemap: true,
  });
}
assert.equal(hashes.size, screens.length, "imagens visualmente distintas");
console.log(
  JSON.stringify(
    {
      screens: results.length,
      uniqueRasters: hashes.size,
      light: screens.filter((s) => s.theme === "light").length,
      dark: screens.filter((s) => s.theme === "dark").length,
      results,
    },
    null,
    2,
  ),
);
