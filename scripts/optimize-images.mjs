// One-shot asset optimizer. Backs up originals to /originals-backup (gitignored),
// then rewrites the heavy files in /public at the sizes the site actually uses.
// Run: node scripts/optimize-images.mjs
import sharp from "sharp";
import { copyFileSync, mkdirSync, statSync, unlinkSync } from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const pub = path.join(root, "public");
const backup = path.join(root, "originals-backup");
mkdirSync(backup, { recursive: true });

const kb = (f) => Math.round(statSync(f).size / 1024);

async function run() {
  // Nav logo: rendered at 140x38 CSS px — 560w is 4x, plenty for retina.
  {
    const src = path.join(pub, "SCALIA_logo.png");
    const bak = path.join(backup, "SCALIA_logo.png");
    copyFileSync(src, bak);
    const before = kb(src);
    await sharp(bak).resize({ width: 560 }).png({ palette: true }).toFile(src);
    console.log(`SCALIA_logo.png  ${before} KB -> ${kb(src)} KB`);
  }

  // Hero ring textures: drawn onto a 660x528 canvas, so 1280w WebP is 2x quality.
  for (const name of ["case-lespot", "case-meetball", "case-tracker", "case-mirofish"]) {
    const src = path.join(pub, `${name}.png`);
    const out = path.join(pub, `${name}.webp`);
    const bak = path.join(backup, `${name}.png`);
    copyFileSync(src, bak);
    const before = kb(src);
    await sharp(src).webp({ quality: 82 }).toFile(out);
    unlinkSync(src);
    console.log(`${name}.png ${before} KB -> ${name}.webp ${kb(out)} KB`);
  }

  // About founder photo: rendered at 80x80 — 320w covers 4x displays.
  {
    const src = path.join(pub, "1774863493730.png");
    const bak = path.join(backup, "1774863493730.png");
    copyFileSync(src, bak);
    const before = kb(src);
    await sharp(bak).resize({ width: 320 }).png({ palette: true }).toFile(src);
    console.log(`1774863493730.png  ${before} KB -> ${kb(src)} KB`);
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
