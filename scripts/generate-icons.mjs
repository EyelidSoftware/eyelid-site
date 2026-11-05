import sharp from "sharp";
import { readFile, writeFile } from "node:fs/promises";

// Export the approved symbol without changing its path geometry.
const source = await readFile(
  new URL("../public/brand/eyelid-mark.svg", import.meta.url),
  "utf8",
);
const inner = source.replace(/<\/?svg[^>]*>/g, "");
const svg =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="16 16 224 224" width="512" height="512"><rect x="16" y="16" width="224" height="224" fill="#ffffff"/>' +
  inner +
  "</svg>";
const destination = new URL("../public/", import.meta.url);
await writeFile(new URL("favicon.svg", destination), svg);
for (const [name, size] of [
  ["favicon.png", 96],
  ["apple-touch-icon.png", 180],
  ["brand/logo-square.png", 512],
]) {
  await sharp(Buffer.from(svg))
    .resize(size, size)
    .png()
    .toFile(new URL(name, destination).pathname);
}
const sizes = [16, 32, 48, 64, 128, 256];
const frames = await Promise.all(
  sizes.map((size) =>
    sharp(Buffer.from(svg)).resize(size, size).png().toBuffer(),
  ),
);
const header = Buffer.alloc(6 + frames.length * 16);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(frames.length, 4);
let offset = header.length;
frames.forEach((frame, i) => {
  const pos = 6 + i * 16;
  header[pos] = sizes[i] === 256 ? 0 : sizes[i];
  header[pos + 1] = header[pos];
  header.writeUInt16LE(1, pos + 4);
  header.writeUInt16LE(32, pos + 6);
  header.writeUInt32LE(frame.length, pos + 8);
  header.writeUInt32LE(offset, pos + 12);
  offset += frame.length;
});
await writeFile(
  new URL("favicon.ico", destination),
  Buffer.concat([header, ...frames]),
);
console.log("Ícones PNG, SVG e ICO exportados a partir do símbolo aprovado.");
