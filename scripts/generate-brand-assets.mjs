import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const colors = {
  ink: "#23354a",
  rose: "#d97878",
  paper: "#fffdf9",
  blush: "#f1ddd0"
};

const monogram = `
  <path d="M49 10h2l-.5 82-1.5 10-1.5-10-.5-82Z" fill="${colors.ink}"/>
  <ellipse cx="49" cy="22" rx="2" ry="6" fill="${colors.paper}" stroke="${colors.ink}" stroke-width="1"/>
  <path d="M50 22
    C84 14 111 27 111 56
    C111 82 86 96 50 94
    C68 96 79 108 96 106
    C113 104 111 86 100 87
    C89 89 96 103 116 99
    C130 97 139 86 152 80"
    fill="none" stroke="${colors.rose}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.4"/>
  <g transform="translate(143 66)">
    <path d="M5 5h23v25H5Z" fill="${colors.rose}"/>
    <path d="M2 3h29M2 32h29" stroke="${colors.ink}" stroke-linecap="round" stroke-width="5"/>
    <path d="M7 10h19M7 16h19M7 22h19M7 28h19" stroke="${colors.paper}" stroke-width="2"/>
  </g>
`;

const brandMark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 112" role="img" aria-label="A letter D formed by a sewing needle and thread leading to a spool">
  <g>${monogram}</g>
</svg>`;

const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="16" fill="${colors.paper}"/>
  <g transform="translate(-18 5) scale(.45)">${monogram}</g>
</svg>`;

const socialCardSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${colors.paper}"/>
  <rect x="38" y="38" width="1124" height="554" rx="42" fill="none" stroke="${colors.blush}" stroke-width="4"/>
  <g transform="translate(40 160) scale(2.75)">${monogram}</g>
  <text x="790" y="270" fill="${colors.rose}" font-family="Georgia, serif" font-size="70" font-style="italic" text-anchor="middle">That's Sew</text>
  <text x="790" y="410" fill="${colors.ink}" font-family="Georgia, serif" font-size="132" text-anchor="middle">Donna</text>
</svg>`;

await Promise.all([
  writeFile(new URL("../public/brand-mark.svg", import.meta.url), brandMark),
  writeFile(new URL("../public/favicon.svg", import.meta.url), faviconSvg),
  writeFile(new URL("../public/social-card.svg", import.meta.url), socialCardSvg),
  sharp(Buffer.from(socialCardSvg))
    .png()
    .toFile(fileURLToPath(new URL("../public/social-card.png", import.meta.url)))
]);
