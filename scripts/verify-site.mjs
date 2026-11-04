import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import assert from "node:assert/strict";
const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)],
  );
const files = walk("dist").filter((p) => p.endsWith(".html"));
for (const file of files) {
  const html = readFileSync(file, "utf8");
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1, `${file}: h1`);
  assert.match(html, /<title>[^<]+<\/title>/, `${file}: title`);
  assert.match(
    html,
    /<meta name="description" content="[^"]+"/,
    `${file}: description`,
  );
  assert.match(
    html,
    /<link rel="canonical" href="https:\/\/eyelid\.com\.br/,
    `${file}: canonical`,
  );
  assert(!html.includes("—"), `${file}: travessão`);
  for (const [, url] of html.matchAll(/(?:href|src)="(\/[^"#]*)"/g)) {
    const clean = decodeURIComponent(url.split("?")[0]);
    assert(
      [`dist${clean}`, `dist${clean}.html`, `dist${clean}/index.html`].some(
        existsSync,
      ),
      `${file}: broken ${url}`,
    );
  }
  for (const [, json] of html.matchAll(
    /<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/g,
  ))
    JSON.parse(json);
  assert(!/<script[^>]+src=/.test(html), `${file}: unexpected client JS`);
}
assert(files.length >= 14);
assert(existsSync("dist/og/default.png"));
assert(existsSync("dist/sitemap-index.xml"));
console.log(
  `${files.length} páginas verificadas: SEO, links locais, JSON-LD e ausência de JS de aplicação.`,
);
