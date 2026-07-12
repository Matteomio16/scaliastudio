import * as THREE from "three";

// 5:4 landscape card
const W = 660;
const H = 528;

function roundRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function hexToRgb(hex: string) {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}
function rgba(hex: string, a: number) {
  const c = hexToRgb(hex);
  return `rgba(${c.r},${c.g},${c.b},${a})`;
}

/**
 * Builds a 5:4 landscape card texture. Draws a branded fallback immediately,
 * then loads `imgSrc` (a case-study screenshot) and covers the card with it.
 * If the image is missing/fails, the fallback stays — nothing breaks.
 */
export function makeImageCardTexture(opts: {
  imgSrc?: string;
  name: string;
  accent: string;
}): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;
  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  texture.colorSpace = THREE.SRGBColorSpace;

  const pad = 8;
  const radius = 34;

  const drawFrame = () => {
    roundRectPath(ctx, pad, pad, W - pad * 2, H - pad * 2, radius);
    ctx.strokeStyle = rgba(opts.accent, 0.55);
    ctx.lineWidth = 3;
    ctx.stroke();
  };

  const drawFallback = () => {
    ctx.save();
    roundRectPath(ctx, pad, pad, W - pad * 2, H - pad * 2, radius);
    ctx.clip();
    const g = ctx.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, opts.accent);
    g.addColorStop(1, "#0d0f13");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "#ffffff";
    ctx.font = "600 44px Inter, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(opts.name, W / 2, H / 2);
    ctx.restore();
    drawFrame();
    texture.needsUpdate = true;
  };

  drawFallback();

  if (opts.imgSrc) {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.save();
      roundRectPath(ctx, pad, pad, W - pad * 2, H - pad * 2, radius);
      ctx.clip();
      // cover fit
      const iw = img.width;
      const ih = img.height;
      const scale = Math.max(W / iw, H / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      ctx.drawImage(img, (W - dw) / 2, (H - dh) / 2, dw, dh);
      ctx.restore();
      drawFrame();
      texture.needsUpdate = true;
    };
    img.src = opts.imgSrc;
  }

  return texture;
}

/**
 * Caption texture (transparent) rendered on a small plane below each ring card:
 * bold dark label + a short muted description. Dark text reads on the cream hero.
 */
export function makeCaptionTexture(opts: {
  label: string;
  desc: string;
}): THREE.CanvasTexture {
  const cw = 560;
  const ch = 170;
  const canvas = document.createElement("canvas");
  canvas.width = cw;
  canvas.height = ch;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, cw, ch);
  ctx.textAlign = "center";

  ctx.fillStyle = "#1b1c1a";
  ctx.font = "600 52px Newsreader, Georgia, serif";
  ctx.textBaseline = "alphabetic";
  ctx.fillText(opts.label, cw / 2, 66);

  ctx.fillStyle = "#5a5f52";
  ctx.font = "400 34px Inter, system-ui, sans-serif";
  ctx.fillText(opts.desc, cw / 2, 120);

  const tex = new THREE.CanvasTexture(canvas);
  tex.anisotropy = 8;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export const CARD_W_UNITS = 2.05;
export const CARD_H_UNITS = 1.64;
export const CAPTION_W_UNITS = 1.74;
export const CAPTION_H_UNITS = 0.53;
