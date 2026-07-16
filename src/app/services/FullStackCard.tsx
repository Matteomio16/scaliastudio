"use client";

import { useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const CELLS = 20;
const EVENTS = 1500;

/**
 * Grouped explicitly rather than via the viewer's locale: the page is written
 * around "1,500", and an unpinned locale would both restyle the number and
 * risk a server/client hydration mismatch.
 */
const group = (n: number) => n.toLocaleString("en-US");

/**
 * Card 02. The event counter and the arrondissement grid animate off one
 * shared progress value, so the cells light up in step with the number.
 */
export default function FullStackCard() {
  const countRef = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const [auto, setAuto] = useState(0);

  // Reduced motion skips straight to the finished figure.
  const progress = reduced ? 1 : auto;

  useEffect(() => {
    if (reduced) return;
    const el = countRef.current;
    if (!el) return;

    let raf = 0;
    const run = () => {
      const dur = 1600;
      const start = performance.now();
      const step = (now: number) => {
        const p = Math.min(1, (now - start) / dur);
        setAuto(1 - Math.pow(1 - p, 3));
        if (p < 1) raf = requestAnimationFrame(step);
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
      { threshold: 0.5 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  const lit = Math.floor(progress * CELLS);

  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        background: "#eef5ec",
        borderRadius: 28,
        padding: "clamp(1.75rem,4vw,3.5rem)",
        boxShadow: "0 30px 70px -40px rgba(34,150,80,0.32)",
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
            color: "#158043",
            background: "rgba(34,197,94,0.14)",
            padding: "0.35rem 0.7rem",
            borderRadius: 999,
          }}
        >
          02 &middot; Full-Stack Apps
        </span>
        <h3
          style={{
            fontFamily: "var(--font-newsreader), serif",
            fontWeight: 400,
            fontSize: "clamp(2rem,3.8vw,3.2rem)",
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
            margin: "1.2rem 0 0",
          }}
        >
          <span ref={countRef} style={{ fontVariantNumeric: "tabular-nums" }}>
            {group(Math.round(progress * EVENTS))}
          </span>
          <span style={{ color: "#22c55e" }}>+</span> events.
          <br />
          <span style={{ fontStyle: "italic", color: "#159048" }}>
            One search bar.
          </span>
        </h3>
        <p
          style={{
            fontSize: "1rem",
            lineHeight: 1.65,
            color: "#3a4a3c",
            maxWidth: "44ch",
            margin: "1.2rem 0 0",
          }}
        >
          <strong style={{ fontWeight: 600, color: "#1b1c1a" }}>LeSpot</strong> —
          real auth, a 9-table database, and a Gemini recommendation engine,
          curating free culture across all 20 arrondissements of Paris. Built with
          Open Data University and the Minist&egrave;re de la Culture. Marketing
          sites, product apps, payments — deployed end-to-end.
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            marginTop: "1.6rem",
          }}
        >
          {["React", "Supabase", "PostgreSQL · RLS", "Gemini AI"].map((t) => (
            <span
              key={t}
              style={{
                fontSize: "0.7rem",
                padding: "0.4rem 0.7rem",
                borderRadius: 8,
                border: "1px solid rgba(34,150,80,0.3)",
                color: "#1a6b3a",
              }}
            >
              {t}
            </span>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "1.5rem",
            marginTop: "1.9rem",
          }}
        >
          <a
            className="svc-btn"
            href="#svc-contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "#14532d",
              color: "#fff",
              fontSize: "0.85rem",
              fontWeight: 500,
              padding: "0.75rem 1.3rem",
              borderRadius: 10,
              boxShadow: "0 12px 28px -14px rgba(20,83,45,0.8)",
            }}
          >
            Start a build <span>&rarr;</span>
          </a>
          <a
            className="svc-seclink"
            href="https://web-lespot.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem",
              fontSize: "0.85rem",
              color: "#159048",
            }}
          >
            Open LeSpot &rarr;
          </a>
        </div>
      </div>

      <div>
        <div
          style={{
            position: "relative",
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: "0 30px 70px -32px rgba(27,28,26,0.4)",
            border: "1px solid rgba(255,255,255,0.85)",
          }}
        >
          <Image
            src="/case-lespot.webp"
            alt="LeSpot cultural-discovery app"
            width={1280}
            height={1031}
            sizes="(max-width: 1280px) 45vw, 520px"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
        <div
          aria-hidden
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(10,1fr)",
            gap: 6,
            marginTop: "0.9rem",
          }}
        >
          {Array.from({ length: CELLS }, (_, i) => (
            <div
              key={i}
              style={{
                aspectRatio: "1",
                borderRadius: 5,
                border: "1px solid rgba(34,197,94,0.24)",
                background:
                  i < lit ? "rgba(34,197,94,0.85)" : "rgba(34,197,94,0.12)",
                boxShadow: i < lit ? "0 0 12px rgba(34,197,94,0.5)" : "none",
                transition: "background 500ms ease, box-shadow 500ms ease",
              }}
            />
          ))}
        </div>
        <p
          style={{
            fontSize: "0.65rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#6f7a6b",
            margin: "0.75rem 0 0",
          }}
        >
          Live event coverage — one cell per arrondissement
        </p>
      </div>
    </div>
  );
}
