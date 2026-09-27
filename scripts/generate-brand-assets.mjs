import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import opentype from "opentype.js";
import sharp from "sharp";

async function loadFont(relativePath) {
  const file = await readFile(new URL(relativePath, import.meta.url));
  const data = file.buffer.slice(file.byteOffset, file.byteOffset + file.byteLength);
  return opentype.parse(data);
}

function textPath(font, text, size, x, baseline, anchor = "start") {
  const offset = anchor === "middle" ? font.getAdvanceWidth(text, size) / 2 : 0;
  return font.getPath(text, x - offset, baseline, size).toPathData(1);
}

const [scriptFont, serifFont] = await Promise.all([
  loadFont("../node_modules/@fontsource/sacramento/files/sacramento-latin-400-normal.woff"),
  loadFont("../node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-600-normal.woff")
]);

const colors = {
  ink: "#23354a",
  rose: "#d97878",
  paper: "#fffdf9",
  muted: "#756a63",
  blush: "#f1ddd0"
};

const spool = `
  <path d="M810 274 821 365c23 16 55 16 78 0l11-91Z" fill="${colors.rose}"/>
  <ellipse cx="860" cy="274" rx="53" ry="17" fill="${colors.paper}" stroke="${colors.ink}" stroke-width="7"/>
  <ellipse cx="860" cy="274" rx="13" ry="4" fill="${colors.ink}"/>
  <path d="M821 302h78M824 323h72M827 344h66" stroke="${colors.paper}" stroke-width="5"/>
  <ellipse cx="860" cy="365" rx="48" ry="14" fill="${colors.paper}" stroke="${colors.ink}" stroke-width="7"/>
`;

const needle = `
  <path d="M165 429 306 552l-3 5-140-119Z" fill="${colors.ink}"/>
  <ellipse cx="173" cy="437" rx="10" ry="5" fill="${colors.paper}" stroke="${colors.ink}" stroke-width="4" transform="rotate(42 173 437)"/>
`;

const headerWordmark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 112" role="img" aria-label="That's Sew Donna">
  <path d="${textPath(serifFont, "THAT'S", 27, 19, 32)}" fill="${colors.ink}"/>
  <path d="${textPath(scriptFont, "Sew", 88, 16, 103)}" fill="${colors.rose}"/>
  <path d="${textPath(serifFont, "DONNA", 67, 174, 99)}" fill="${colors.ink}"/>
  <g transform="translate(-394 -228) scale(.54)">${spool}</g>
</svg>`;

const faviconD = textPath(scriptFont, "D", 55, 4, 58);
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="16" fill="${colors.paper}"/>
  <circle cx="32" cy="32" r="27" fill="none" stroke="${colors.rose}" stroke-width="2.5" stroke-dasharray="4 5"/>
  <path d="${faviconD}" fill="${colors.ink}"/>
</svg>`;

const socialCardSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${colors.paper}"/>
  <ellipse cx="600" cy="315" rx="500" ry="270" fill="none" stroke="${colors.rose}" stroke-width="6" stroke-dasharray="20 20"/>
  <path d="${textPath(serifFont, "THAT'S", 76, 600, 155, "middle")}" fill="${colors.ink}"/>
  <path d="${textPath(scriptFont, "Sew", 220, 490, 355, "middle")}" fill="${colors.rose}"/>
  <path d="${textPath(serifFont, "DONNA", 138, 600, 490, "middle")}" fill="${colors.ink}"/>
  ${spool}
  ${needle}
  <path d="M910 302c111 31 126 128 61 172-37 25-81 12-88-21-5-25 21-39 39-20 17-21 44-8 41 18-5 43-61 76-126 91" fill="none" stroke="${colors.rose}" stroke-linecap="round" stroke-linejoin="round" stroke-width="7"/>
  <path d="M600 574c-27-22-42-37-34-53 8-17 28-12 34 5 7-17 27-22 35-5 8 16-8 32-35 53Z" fill="${colors.rose}"/>
  <path d="M535 558c-23-18-45-22-66-15m52 4c-14-5-24-16-27-31m14 24c-15 2-27-2-37-12M665 558c23-18 45-22 66-15m-52 4c14-5 24-16 27-31m-14 24c15 2 27-2 37-12" fill="none" stroke="${colors.ink}" stroke-linecap="round" stroke-linejoin="round" stroke-width="5"/>
</svg>`;

await Promise.all([
  writeFile(new URL("../public/donna-wordmark.svg", import.meta.url), headerWordmark),
  writeFile(new URL("../public/favicon.svg", import.meta.url), faviconSvg),
  writeFile(new URL("../public/social-card.svg", import.meta.url), socialCardSvg),
  sharp(Buffer.from(socialCardSvg))
    .png()
    .toFile(fileURLToPath(new URL("../public/social-card.png", import.meta.url)))
]);
