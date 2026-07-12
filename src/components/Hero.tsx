"use client";

import dynamic from "next/dynamic";
import { preload } from "react-dom";
import { useState } from "react";
import { projects } from "@/lib/projects";

// Kick off the (heavy three.js) hero chunk download as soon as this client
// module evaluates, so it overlaps hydration instead of starting on mount.
const loadHeroScene = () => import("./hero/HeroScene");
loadHeroScene();

const HeroScene = dynamic(loadHeroScene, {
  ssr: false,
  loading: () => null,
});

/**
 * Instant CSS poster of the hero: the glowing sphere + a soft ring hint on cream,
 * matching the live composition. Painted immediately (no WebGL), it removes the
 * perceived load gap; the live scene fades in over it and it fades out once ready.
 * Also serves as the static hero for reduced-motion users (it simply never fades).
 */
function HeroPoster() {
  const cards = Array.from({ length: 8 }, (_, i) => {
    const a = (i / 8) * Math.PI * 2;
    const depth = (Math.sin(a) + 1) / 2; // 0 (back) .. 1 (front)
    return {
      x: 50 + Math.cos(a) * 30,
      y: 60 + Math.sin(a) * 15,
      scale: 0.7 + depth * 0.5,
      opacity: 0.1 + depth * 0.35,
    };
  });
  return (
    <div className="absolute inset-0" aria-hidden>
      {/* bloom */}
      <div className="absolute left-1/2 top-[54%] -translate-x-1/2 -translate-y-1/2 w-[42vw] max-w-[560px] aspect-square rounded-full blur-3xl bg-[radial-gradient(circle,rgba(90,140,255,0.42),transparent_68%)]" />
      {/* faint ring of cards */}
      {cards.map((c, i) => (
        <div
          key={i}
          className="absolute w-[7vw] max-w-[92px] aspect-[5/4] rounded-lg blur-[2px] bg-[linear-gradient(160deg,#20304a,#0c1220)]"
          style={{
            left: `${c.x}%`,
            top: `${c.y}%`,
            transform: `translate(-50%,-50%) scale(${c.scale})`,
            opacity: c.opacity,
          }}
        />
      ))}
      {/* sphere */}
      <div
        className="absolute left-1/2 top-[54%] -translate-x-1/2 -translate-y-1/2 w-[15vw] max-w-[190px] aspect-square rounded-full"
        style={{
          background:
            "radial-gradient(circle at 50% 42%, #bcd2ff 0%, #4f80ff 34%, #1f47c8 70%, #122a86 100%)",
        }}
      />
    </div>
  );
}

export default function Hero() {
  const [sceneReady, setSceneReady] = useState(false);

  // Fetch the ring card textures in parallel with the 3D chunk instead of after it.
  for (const p of [projects.mirofish, projects.meetball, projects.tracker, projects.lespot]) {
    if (p.caseImage) preload(p.caseImage, { as: "image" });
  }

  return (
    <section
      className="relative w-full h-[92vh] min-h-[660px] overflow-hidden"
      aria-label="Hero"
    >
      {/* WebGL scene fills the section, sphere centered in the crown */}
      <div className="absolute inset-0">
        <HeroScene onReady={() => setSceneReady(true)} />
      </div>

      {/* Instant poster on top of the canvas; fades out once the live scene is ready. */}
      <div
        className="absolute inset-0 transition-opacity duration-700 ease-out"
        style={{ opacity: sceneReady ? 0 : 1, pointerEvents: "none" }}
      >
        <HeroPoster />
      </div>

      {/* Headline sits above the crown, fully legible on cream */}
      <div className="relative z-10 flex flex-col items-center text-center page-pad pt-[13vh] pointer-events-none">
        <p className="label-sm text-on-surface-variant mb-4">
          Paris, Geneva, Vienna
        </p>
        <h1 className="display-lg max-w-2xl mx-auto">
          Built by students.{" "}
          <span className="italic whitespace-nowrap">
            Powered by AI.<span className="cursor">|</span>
          </span>
        </h1>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 motion-safe:animate-[scroll-cue-bob_1.8s_ease-in-out_infinite]">
        <svg width="18" height="26" viewBox="0 0 18 26" fill="none">
          <line x1="9" y1="1" x2="9" y2="22" stroke="var(--on-surface-variant)" strokeWidth="1" />
          <polyline points="3,16 9,22 15,16" stroke="var(--on-surface-variant)" strokeWidth="1" fill="none" />
        </svg>
      </div>
    </section>
  );
}
