"use client";

import { useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Dot = {
  bx: number;
  by: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  a: number;
  phase: number;
  speed: number;
};

const stats = [
  { value: "120", label: "Agents / simulation" },
  { value: "30+", label: "Simulation rounds" },
  { value: "#1", label: "GitHub Global Trending" },
];

const bigNum: React.CSSProperties = {
  fontFamily: "var(--font-newsreader), serif",
  fontSize: "clamp(1.6rem,3vw,2.2rem)",
  lineHeight: 1,
};

const meterLabel: React.CSSProperties = {
  fontSize: "0.6rem",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "#9aa4b6",
  marginTop: "0.4rem",
};

/**
 * Grouped explicitly rather than via the viewer's locale, which would restyle
 * the figures and risk a server/client hydration mismatch.
 */
const group = (n: number) => n.toLocaleString("en-US");

/** Everything the dial drives, derived from a single 0–1 scrub position. */
function meterValues(p: number) {
  const tokens = p * 143;
  return {
    agents: group(Math.round(p * 45)),
    inter: group(Math.round(p * 1965)),
    tokens: (tokens < 1 ? "0" : Math.round(tokens)) + "M",
    acc: p < 0.02 ? "—" : "±" + (21 - p * 20).toFixed(1) + "pp",
    cost: "$" + (p * 7.95).toFixed(2),
  };
}

export default function MarketSimCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const costRef = useRef<HTMLDivElement>(null);
  const scrubbing = useRef(false);
  const reduced = useReducedMotion();
  const [auto, setAuto] = useState(0);
  const [scrubbed, setScrubbed] = useState<number | null>(null);

  // Once the dial is grabbed it owns the value; until then it auto-runs, or
  // sits at the finished figure when motion is reduced.
  const p = scrubbed ?? (reduced ? 1 : auto);

  // ---- swarm of agent dots behind the card ----
  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

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

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let W = 0;
    let H = 0;
    let dots: Dot[] = [];

    const seed = () => {
      const count = Math.round((W * H) / 9000);
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
          r: 0.8 + Math.random() * 1.8,
          a: 0.1 + Math.random() * 0.4,
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

    let t = 0;
    let raf = 0;
    const FR = 150;
    const FR2 = FR * FR;
    const smooth = { x: -9999, y: -9999 };

    const tick = () => {
      t += 0.016;
      const rect = canvas.getBoundingClientRect();
      const mx = pointer.active ? pointer.x - rect.left : -9999;
      const my = pointer.active ? pointer.y - rect.top : -9999;
      if (pointer.active && my >= 0 && my <= rect.height) {
        smooth.x += (mx - smooth.x) * 0.18;
        smooth.y += (my - smooth.y) * 0.18;
      } else {
        smooth.x = -9999;
        smooth.y = -9999;
      }
      ctx.clearRect(0, 0, W, H);
      for (const d of dots) {
        const hx = d.bx * W + Math.sin(t * d.speed + d.phase) * 14;
        const hy = d.by * H + Math.cos(t * d.speed * 0.8 + d.phase) * 12;
        d.vx += (hx - d.x) * 0.012;
        d.vy += (hy - d.y) * 0.012;
        const dx = d.x - smooth.x;
        const dy = d.y - smooth.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < FR2) {
          const dist = Math.sqrt(d2) + 0.001;
          const f = (1 - dist / FR) * 2.6;
          d.vx += (dx / dist) * f;
          d.vy += (dy / dist) * f;
        }
        d.vx *= 0.9;
        d.vy *= 0.9;
        d.x += d.vx;
        d.y += d.vy;
        const ag = Math.min(1, (Math.abs(d.vx) + Math.abs(d.vy)) * 0.25);
        const al = Math.min(0.85, d.a + ag * 0.5);
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r + ag * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(150,180,245,${al})`;
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
  }, [reduced]);

  // ---- cost meter auto-run, abandoned as soon as the user grabs the dial ----
  useEffect(() => {
    if (reduced) return;
    const el = costRef.current;
    if (!el) return;

    let raf = 0;
    const run = () => {
      const dur = 2400;
      const start = performance.now();
      const step = (now: number) => {
        if (scrubbing.current) return;
        const prog = Math.min(1, (now - start) / dur);
        setAuto(1 - Math.pow(1 - prog, 3));
        if (prog < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            run();
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  const v = meterValues(p);

  return (
    <div
      style={{
        position: "relative",
        maxWidth: 1200,
        margin: "0 auto",
        background: "#0b1230",
        borderRadius: 28,
        padding: "clamp(1.75rem,4vw,3.75rem)",
        overflow: "hidden",
        boxShadow:
          "0 40px 90px -40px rgba(11,18,48,0.9), 0 0 0 1px rgba(111,160,255,0.16)",
      }}
    >
      <canvas
        ref={canvasRef}
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
          gap: "clamp(2rem,4vw,4rem)",
          alignItems: "center",
        }}
      >
        <div>
          <span
            style={{
              display: "inline-block",
              fontSize: "0.625rem",
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#c79bf5",
              background: "rgba(181,101,240,0.16)",
              padding: "0.35rem 0.7rem",
              borderRadius: 999,
            }}
          >
            03 &middot; Market Simulations
          </span>
          <p
            style={{
              fontSize: "0.6875rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#7fa8e6",
              margin: "1.1rem 0 0",
            }}
          >
            MiroFish — Swarm Intelligence &middot; Prediction Engine
          </p>
          <h3
            style={{
              fontFamily: "var(--font-newsreader), serif",
              fontWeight: 400,
              fontStyle: "italic",
              fontSize: "clamp(1.9rem,3.6vw,3rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1.12,
              margin: "0.8rem 0 0",
              color: "#f3f1ec",
            }}
          >
            Instead of training a model on data, you simulate a society.
          </h3>
          <p
            style={{
              fontSize: "0.98rem",
              lineHeight: 1.65,
              color: "#9db0d0",
              maxWidth: "46ch",
              margin: "1.2rem 0 0",
            }}
          >
            MiroFish builds a living digital world of AI agents — each with its
            own personality, memory, and biases. They post, debate, form
            factions, shift opinions. The forecast emerges from their collective
            behaviour. Elections, sports,{" "}
            <strong style={{ color: "#f3f1ec", fontWeight: 600 }}>markets</strong>
            , and policy.
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "2rem",
              marginTop: "1.8rem",
            }}
          >
            {stats.map((s) => (
              <div key={s.label}>
                <div style={{ ...bigNum, color: "#8fb2f2" }}>{s.value}</div>
                <div
                  style={{
                    fontSize: "0.6rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#7386a8",
                    marginTop: "0.4rem",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              marginTop: "1.6rem",
            }}
          >
            {["Neo4j", "OpenRouter", "OASIS", "Nemotron 120B"].map((t) => (
              <span
                key={t}
                style={{
                  fontSize: "0.7rem",
                  padding: "0.4rem 0.7rem",
                  borderRadius: 8,
                  border: "1px solid rgba(127,168,230,0.4)",
                  color: "#9db8ea",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div>
          <div
            style={{
              fontSize: "0.625rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#9aa4b6",
              marginBottom: "0.5rem",
            }}
          >
            Case study &middot; Hungary 2026 — total API cost
          </div>
          <div
            ref={costRef}
            style={{
              fontFamily: "var(--font-newsreader), serif",
              fontWeight: 400,
              fontSize: "clamp(3.6rem,10vw,7rem)",
              lineHeight: 0.86,
              letterSpacing: "-0.03em",
              color: "#fff",
              textShadow: "0 0 60px rgba(181,101,240,0.5)",
            }}
          >
            {v.cost}
          </div>
          <p
            style={{
              fontSize: "0.9rem",
              lineHeight: 1.6,
              color: "#9aa4b6",
              maxWidth: "40ch",
              margin: "1.1rem 0 1.6rem",
            }}
          >
            Not per agent. Not per run —{" "}
            <span style={{ color: "#f3f1ec" }}>
              everything below, start to finish.
            </span>{" "}
            Drag the dial and watch what $7.95 actually bought.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1.1rem 2rem",
            }}
          >
            <div>
              <div
                style={{
                  ...bigNum,
                  color: "#f3f1ec",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {v.agents}
              </div>
              <div style={meterLabel}>Autonomous agents</div>
            </div>
            <div>
              <div
                style={{
                  ...bigNum,
                  color: "#f3f1ec",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {v.inter}
              </div>
              <div style={meterLabel}>Social interactions</div>
            </div>
            <div>
              <div
                style={{
                  ...bigNum,
                  color: "#f3f1ec",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {v.tokens}
              </div>
              <div style={meterLabel}>Tokens processed</div>
            </div>
            <div>
              <div style={{ ...bigNum, color: "#c79bf5" }}>{v.acc}</div>
              <div style={meterLabel}>Off final polling</div>
            </div>
          </div>
          <div style={{ marginTop: "1.8rem" }}>
            <input
              className="svc-range"
              type="range"
              min={0}
              max={100}
              step={1}
              value={Math.round(p * 100)}
              aria-label="Scrub the simulation scale"
              onChange={(e) => {
                scrubbing.current = true;
                setScrubbed(Number(e.target.value) / 100);
              }}
              style={{ width: "100%" }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "0.6rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#6b7688",
                marginTop: "0.7rem",
              }}
            >
              <span>Empty room</span>
              <span>Full run — 45 agents</span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "1.5rem",
              marginTop: "1.8rem",
            }}
          >
            <a
              className="svc-btn"
              href="#svc-contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "#b565f0",
                color: "#0b1230",
                fontSize: "0.85rem",
                fontWeight: 600,
                padding: "0.75rem 1.3rem",
                borderRadius: 10,
                boxShadow: "0 12px 30px -12px rgba(181,101,240,0.8)",
              }}
            >
              Start a build <span>&rarr;</span>
            </a>
            <Link
              className="svc-seclink"
              href="/projects/hungary-2026"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                fontSize: "0.85rem",
                color: "#c79bf5",
              }}
            >
              Read the research &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
