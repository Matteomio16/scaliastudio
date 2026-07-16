"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const nodes = [
  { x: 70, y: 120, label: "Webhook", c: "#ef8354" },
  { x: 300, y: 120, label: "Router", c: "#ef8354" },
  { x: 560, y: 55, label: "Resend", c: "#22c55e" },
  { x: 560, y: 185, label: "Dedup store", c: "#9aa4b6" },
  { x: 820, y: 120, label: "Delivered", c: "#22c55e" },
];

const edges: Array<[number, number]> = [
  [0, 1],
  [1, 2],
  [1, 3],
  [2, 4],
];

const edgePath = (a: number, b: number) => {
  const n1 = nodes[a];
  const n2 = nodes[b];
  const mx = (n1.x + n2.x) / 2;
  return `M ${n1.x} ${n1.y} C ${mx} ${n1.y}, ${mx} ${n2.y}, ${n2.x} ${n2.y}`;
};

/** Point along an edge's cubic curve at t. */
const bez = (t: number, a: number, b: number) => {
  const n1 = nodes[a];
  const n2 = nodes[b];
  const mx = (n1.x + n2.x) / 2;
  const q = 1 - t;
  return {
    x: q * q * q * n1.x + 3 * q * q * t * mx + 3 * q * t * t * mx + t * t * t * n2.x,
    y:
      q * q * q * n1.y +
      3 * q * q * t * n1.y +
      3 * q * t * t * n2.y +
      t * t * t * n2.y,
  };
};

type Pulse = {
  el: SVGCircleElement;
  seg: number;
  p: number;
  dup: boolean;
  path: Array<[number, number]>;
};

/**
 * Card 04's right column. Events stream in from the webhook; roughly a quarter
 * are duplicates that get shunted into the dedup store and fade out, so only
 * genuine deliveries reach the counter.
 */
export default function Pipeline() {
  const layerRef = useRef<SVGGElement>(null);
  const reduced = useReducedMotion();
  const [delivered, setDelivered] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const layer = layerRef.current;
    if (!layer) return;

    const NS = "http://www.w3.org/2000/svg";
    let pulses: Pulse[] = [];
    let spawnT = 0;
    let raf = 0;
    let count = 0;

    const spawn = () => {
      const dup = Math.random() < 0.28;
      const c = document.createElementNS(NS, "circle");
      c.setAttribute("r", "5");
      c.setAttribute("fill", dup ? "#9aa4b6" : "#ef8354");
      layer.appendChild(c);
      pulses.push({
        el: c,
        seg: 0,
        p: 0,
        dup,
        path: dup
          ? [
              [0, 1],
              [1, 3],
            ]
          : [
              [0, 1],
              [1, 2],
              [2, 4],
            ],
      });
    };

    const step = () => {
      spawnT += 1;
      if (spawnT > 42) {
        spawnT = 0;
        spawn();
      }
      pulses = pulses.filter((pu) => {
        pu.p += 0.02;
        if (pu.p >= 1) {
          pu.seg++;
          pu.p = 0;
        }
        if (pu.seg >= pu.path.length) {
          pu.el.remove();
          if (!pu.dup) {
            count++;
            setDelivered(count);
          }
          return false;
        }
        const [a, b] = pu.path[pu.seg];
        const pt = bez(pu.p, a, b);
        pu.el.setAttribute("cx", String(pt.x));
        pu.el.setAttribute("cy", String(pt.y));
        if (pu.dup && pu.seg === pu.path.length - 1) {
          pu.el.setAttribute("opacity", String(1 - pu.p));
        }
        return true;
      });
      raf = requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            raf = requestAnimationFrame(step);
            io.disconnect();
          }
        });
      },
      { threshold: 0.35 },
    );
    io.observe(layer);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      pulses.forEach((pu) => pu.el.remove());
    };
  }, [reduced]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "0.9rem",
        }}
      >
        <span
          style={{
            fontSize: "0.625rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#8a6a52",
          }}
        >
          Webhook &rarr; Router &rarr; Resend
        </span>
        <span
          style={{
            fontSize: "0.625rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#cf6329",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {reduced
            ? "6 workflows live"
            : `${delivered.toLocaleString("en-US")} delivered`}
        </span>
      </div>
      <div
        style={{
          borderRadius: 16,
          background: "rgba(255,255,255,0.55)",
          border: "1px solid rgba(207,99,41,0.2)",
          padding: "0.5rem",
        }}
      >
        <svg
          viewBox="0 0 900 240"
          aria-hidden
          style={{ width: "100%", height: "auto", display: "block" }}
        >
          {edges.map(([a, b]) => (
            <path
              key={`${a}-${b}`}
              d={edgePath(a, b)}
              fill="none"
              stroke="rgba(160,110,70,0.3)"
              strokeWidth={1.5}
            />
          ))}
          {nodes.map((n) => (
            <g key={n.label}>
              <rect
                x={n.x - 52}
                y={n.y - 20}
                width={104}
                height={40}
                rx={10}
                fill="rgba(255,255,255,0.85)"
                stroke={n.c}
                strokeWidth={1.4}
              />
              <text
                x={n.x}
                y={n.y + 4}
                textAnchor="middle"
                fontFamily="var(--font-inter), sans-serif"
                fontSize={13}
                fontWeight={500}
                fill="#1b1c1a"
              >
                {n.label}
              </text>
            </g>
          ))}
          <g ref={layerRef} />
        </svg>
      </div>
    </div>
  );
}
