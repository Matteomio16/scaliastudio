"use client";

import { useEffect, useRef } from "react";

type Dot = {
  bx: number; // base position (0..1 of canvas)
  by: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  a: number; // base alpha
  phase: number;
  speed: number;
};

/**
 * Ambient swarm of small light dots across the dark zone.
 * Dots drift gently and flee from the cursor like a school of fish,
 * then ease back to their home position. Canvas 2D — cheap and robust.
 */
export default function SwarmField({ density = 9000 }: { density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dots: Dot[] = [];
    let raf = 0;
    let W = 0;
    let H = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    // mouse in canvas coords; far away by default
    const mouse = { x: -9999, y: -9999, active: false };
    const smooth = { x: -9999, y: -9999 };

    const seed = () => {
      const count = Math.round((W * H) / density);
      dots = Array.from({ length: count }, () => {
        const bx = Math.random();
        const by = Math.random();
        return {
          bx,
          by,
          x: bx * W,
          y: by * H,
          vx: 0,
          vy: 0,
          r: 0.8 + Math.random() * 1.6,
          a: 0.12 + Math.random() * 0.38,
          phase: Math.random() * Math.PI * 2,
          speed: 0.25 + Math.random() * 0.5,
        };
      });
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = mouse.y >= 0 && mouse.y <= rect.height;
    };
    const onLeave = () => {
      mouse.active = false;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    const FLEE_R = 150; // px radius of influence
    const FLEE_R2 = FLEE_R * FLEE_R;

    let t = 0;
    const tick = () => {
      t += 0.016;
      // smooth the cursor so the swarm reacts fluidly, not jittery
      if (mouse.active) {
        smooth.x += (mouse.x - smooth.x) * 0.18;
        smooth.y += (mouse.y - smooth.y) * 0.18;
      } else {
        smooth.x = -9999;
        smooth.y = -9999;
      }

      ctx.clearRect(0, 0, W, H);

      for (const d of dots) {
        // gentle ambient drift around home
        const hx = d.bx * W + Math.sin(t * d.speed + d.phase) * 14;
        const hy = d.by * H + Math.cos(t * d.speed * 0.8 + d.phase) * 12;

        // spring home
        d.vx += (hx - d.x) * 0.012;
        d.vy += (hy - d.y) * 0.012;

        // flee cursor
        const dx = d.x - smooth.x;
        const dy = d.y - smooth.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < FLEE_R2) {
          const dist = Math.sqrt(d2) + 0.001;
          const force = (1 - dist / FLEE_R) * 2.6;
          d.vx += (dx / dist) * force;
          d.vy += (dy / dist) * force;
        }

        // integrate + damping
        d.vx *= 0.9;
        d.vy *= 0.9;
        d.x += d.vx;
        d.y += d.vy;

        // draw — brighten dots that are fleeing
        const agitation = Math.min(1, (Math.abs(d.vx) + Math.abs(d.vy)) * 0.25);
        const alpha = Math.min(0.85, d.a + agitation * 0.5);
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r + agitation * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(160,195,255,${alpha})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
