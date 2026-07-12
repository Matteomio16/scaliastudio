"use client";

import dynamic from "next/dynamic";
import { preload } from "react-dom";
import { projects } from "@/lib/projects";

// Soft glow where the sphere will appear, so the scene doesn't pop in from nothing.
function ScenePlaceholder() {
  return (
    <div className="absolute inset-0 flex items-end justify-center pb-[10vh]">
      <div className="w-[420px] h-[300px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(45,108,255,0.14),transparent_70%)] blur-2xl" />
    </div>
  );
}

const HeroScene = dynamic(() => import("./hero/HeroScene"), {
  ssr: false,
  loading: () => <ScenePlaceholder />,
});

export default function Hero() {
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
        <HeroScene />
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
