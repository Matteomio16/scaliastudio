"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const days = [
  { d: "MON", label: "Brief" },
  { d: "TUE", label: "Scoped" },
  { d: "WED", label: "Building" },
  { d: "THU", label: "Building" },
  { d: "FRI", label: "Building" },
  { d: "SAT", label: "Live" },
  { d: "SUN", label: "Yours" },
];

/** Index at which the week turns into a shipped product — SAT onward is lit. */
const LIVE_FROM = 5;

export default function WeekStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [inView, setInView] = useState(false);

  // Reduced motion shows the finished week rather than staggering it in.
  const shown = reduced ? true : inView;

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0.5rem",
        marginTop: "2.5rem",
      }}
    >
      {days.map((day, i) => {
        const live = shown && i >= LIVE_FROM;
        return (
          <div
            key={day.d}
            style={{
              flex: 1,
              minWidth: 74,
              padding: "0.9rem 0.6rem",
              borderRadius: 10,
              border: `1px solid ${live ? "rgba(111,160,255,0.6)" : "#232a38"}`,
              background: live ? "rgba(45,108,255,0.12)" : "rgba(23,28,40,0.5)",
              opacity: shown ? 1 : 0,
              transform: shown ? "none" : "translateY(10px)",
              transition:
                "opacity 500ms ease, transform 500ms ease, border-color 500ms ease, background 500ms ease",
              transitionDelay: `${i * 90}ms`,
            }}
          >
            <div
              style={{
                fontSize: "0.6875rem",
                letterSpacing: "0.1em",
                color: "#6b7688",
              }}
            >
              {day.d}
            </div>
            <div
              style={{
                fontFamily: "var(--font-newsreader), serif",
                fontSize: "1.15rem",
                marginTop: "0.35rem",
                color: "#f3f1ec",
              }}
            >
              {day.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}
