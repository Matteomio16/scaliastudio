"use client";

import { useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";

type HeroCard = {
  src: string;
  alt: string;
  label: string;
  w: number;
  h: number;
  /** Parallax weight against the cursor. Negative pushes the card the other way. */
  depth: number;
  /** How far the card fans outward as the hero scrolls away. */
  spread: number;
  rot: number;
  style: React.CSSProperties;
};

/** Cards occupy ~31–32% of a 1120px-max rail, so they never need a big source. */
const CARD_SIZES = "(max-width: 1160px) 32vw, 360px";

const cards: HeroCard[] = [
  {
    src: "/proj-lalo.png",
    alt: "Lalo",
    label: "Lalo — language-learning web app.",
    w: 1058,
    h: 936,
    depth: -120,
    spread: -1,
    rot: -8,
    style: {
      left: "0%",
      top: "15%",
      width: "31%",
      background: "#fff",
      boxShadow: "0 36px 72px -34px rgba(27,28,26,0.38)",
    },
  },
  {
    src: "/proj-marina.png",
    alt: "Marina San Carlos",
    label: "Marina San Carlos — full-service marina website.",
    w: 1282,
    h: 909,
    depth: 55,
    spread: -0.42,
    rot: -3,
    style: {
      left: "21%",
      top: "2%",
      width: "32%",
      zIndex: 2,
      background: "#fff",
      boxShadow: "0 44px 84px -36px rgba(27,28,26,0.42)",
    },
  },
  {
    src: "/proj-scalia.png",
    alt: "Scalia Studio",
    label: "Scalia Studio — this site, live 3D.",
    w: 1029,
    h: 896,
    depth: 55,
    spread: 0.42,
    rot: 3,
    style: {
      left: "47%",
      top: "2%",
      width: "32%",
      zIndex: 2,
      background: "#fff",
      boxShadow: "0 44px 84px -36px rgba(27,28,26,0.42)",
    },
  },
  {
    src: "/case-mirofish.webp",
    alt: "MiroFish",
    label: "MiroFish — swarm-intelligence prediction engine.",
    w: 1280,
    h: 1031,
    depth: -120,
    spread: 1,
    rot: 8,
    style: {
      left: "69%",
      top: "15%",
      width: "31%",
      background: "#0a1a3a",
      boxShadow: "0 40px 80px -36px rgba(11,25,60,0.48)",
    },
  },
];

export default function HeroCards({ heroId }: { heroId: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const wrap = wrapRef.current;
    const hero = document.getElementById(heroId);
    if (!wrap || !hero) return;

    const els = cardRefs.current.filter(Boolean) as HTMLAnchorElement[];
    if (!els.length) return;

    let sx = 0;
    let sy = 0;
    let cx = 0;
    let cy = 0;
    let sp = 0;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      sx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      sy = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const onSpread = () => {
      const top = hero.getBoundingClientRect().top;
      sp = Math.min(1, Math.max(0, -top / (window.innerHeight * 0.85)));
    };
    window.addEventListener("scroll", onSpread, { passive: true });
    window.addEventListener("resize", onSpread);
    onSpread();

    const anim = () => {
      cx += (sx - cx) * 0.06;
      cy += (sy - cy) * 0.06;
      // easeInOutQuad on the scroll progress so the fan-out settles gently
      const ep = sp < 0.5 ? 2 * sp * sp : 1 - Math.pow(-2 * sp + 2, 2) / 2;
      const scale = 1 + ep * 0.14;
      els.forEach((el, i) => {
        const c = cards[i];
        const tx = cx * (c.depth * 0.12) + c.spread * ep * 80;
        const ty = cy * (c.depth * 0.08) - ep * 14;
        el.style.transform = `translate3d(${tx}px,${ty}px,0) rotate(${
          c.rot + cx * 1.6
        }deg) scale(${scale})`;
      });
      raf = requestAnimationFrame(anim);
    };
    raf = requestAnimationFrame(anim);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onSpread);
      window.removeEventListener("resize", onSpread);
    };
  }, [heroId, reduced]);

  return (
    <div
      ref={wrapRef}
      style={{
        position: "relative",
        width: "min(1120px,96vw)",
        height: "clamp(300px,44vh,460px)",
        marginTop: "clamp(2rem,5vh,4rem)",
        perspective: "1200px",
      }}
    >
      {cards.map((c, i) => (
        <a
          key={c.src}
          ref={(el) => {
            cardRefs.current[i] = el;
          }}
          href="#svc-web"
          aria-label={c.label}
          style={{
            position: "absolute",
            borderRadius: 12,
            overflow: "hidden",
            display: "block",
            transform: `rotate(${c.rot}deg)`,
            transition: "transform 400ms var(--ease)",
            ...c.style,
          }}
        >
          <Image
            src={c.src}
            alt={c.alt}
            width={c.w}
            height={c.h}
            sizes={CARD_SIZES}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </a>
      ))}
    </div>
  );
}
