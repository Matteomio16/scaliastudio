"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  a: number;
  drift: number;
  phase: number;
  fall: number;
};

/**
 * Full-viewport drift of particles that fall, part around the cursor, and
 * take their colour from whichever section is currently on screen. Sections
 * opt in by carrying `data-accent="r,g,b"` and `data-theme="cream|dark"`;
 * the dark theme doubles particle alpha so they stay visible on #080a10.
 */
export default function FlowField({
  enabled = true,
  grain = true,
}: {
  enabled?: boolean;
  grain?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const active = enabled && reduced !== true;

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cleanups: Array<() => void> = [];

    // Current vs target accent — lerped every frame so section changes ease in.
    const flow = { r: 45, g: 108, b: 255, tr: 45, tg: 108, tb: 255, theme: "cream" };

    const sections = Array.from(document.querySelectorAll("[data-accent]"));
    if ("IntersectionObserver" in window) {
      const so = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting && e.intersectionRatio > 0.4) {
              const accent = e.target.getAttribute("data-accent");
              if (!accent) return;
              const [r, g, b] = accent.split(",").map(Number);
              flow.tr = r;
              flow.tg = g;
              flow.tb = b;
              flow.theme = e.target.getAttribute("data-theme") || "cream";
            }
          });
        },
        { threshold: [0.4, 0.6] },
      );
      sections.forEach((s) => so.observe(s));
      cleanups.push(() => so.disconnect());
    }

    const pointer = { x: -9999, y: -9999, active: false };
    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    cleanups.push(() => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    });

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let W = 0;
    let H = 0;
    let parts: Particle[] = [];

    const seed = () => {
      const count = Math.round((W * H) / 15000);
      parts = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: 0,
        vy: 0,
        r: 0.7 + Math.random() * 1.7,
        a: 0.1 + Math.random() * 0.4,
        drift: 0.15 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2,
        fall: 0.15 + Math.random() * 0.45,
      }));
    };

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };
    resize();
    window.addEventListener("resize", resize);
    cleanups.push(() => window.removeEventListener("resize", resize));

    let t = 0;
    let raf = 0;
    const FR = 150;
    const FR2 = FR * FR;

    const tick = () => {
      t += 0.016;
      flow.r += (flow.tr - flow.r) * 0.04;
      flow.g += (flow.tg - flow.g) * 0.04;
      flow.b += (flow.tb - flow.b) * 0.04;
      const alphaMul = flow.theme === "dark" ? 1.0 : 0.5;
      ctx.clearRect(0, 0, W, H);
      const cr = Math.round(flow.r);
      const cg = Math.round(flow.g);
      const cb = Math.round(flow.b);

      for (const p of parts) {
        p.y += p.fall;
        p.x += Math.sin(t * p.drift + p.phase) * 0.35;

        if (pointer.active) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < FR2) {
            const dist = Math.sqrt(d2) + 0.001;
            const f = (1 - dist / FR) * 2.4;
            p.vx += (dx / dist) * f;
            p.vy += (dy / dist) * f;
          }
        }

        p.vx *= 0.9;
        p.vy *= 0.9;
        p.x += p.vx;
        p.y += p.vy;

        if (p.y > H + 6) {
          p.y = -6;
          p.x = Math.random() * W;
        }
        if (p.x < -6) p.x = W + 6;
        if (p.x > W + 6) p.x = -6;

        const ag = Math.min(1, (Math.abs(p.vx) + Math.abs(p.vy)) * 0.22);
        const al = Math.min(0.85, (p.a + ag * 0.5) * alphaMul);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r + ag * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${cr},${cg},${cb},${al})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    cleanups.push(() => cancelAnimationFrame(raf));

    return () => cleanups.forEach((fn) => fn());
  }, [active]);

  return (
    <>
      {active && (
        <canvas
          ref={canvasRef}
          aria-hidden
          style={{
            position: "fixed",
            inset: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />
      )}
      {grain && (
        <div
          aria-hidden
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 2,
            pointerEvents: "none",
            opacity: 0.5,
            mixBlendMode: "overlay",
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/></svg>\")",
          }}
        />
      )}
    </>
  );
}
