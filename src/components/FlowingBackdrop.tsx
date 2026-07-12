"use client";

import { motion } from "framer-motion";
import SwarmField from "./SwarmField";

/**
 * Smooth, slowly-drifting mesh-gradient backdrop for the dark zone.
 * Framer-Motion-driven (not raw CSS keyframes) so it doesn't depend on
 * custom @keyframes surviving the Tailwind v4 / Lightning CSS pipeline.
 */
function DriftBlob({
  style,
  range = 60,
  duration = 26,
  delay = 0,
}: {
  style: React.CSSProperties;
  range?: number;
  duration?: number;
  delay?: number;
}) {
  return (
    <motion.div
      style={{
        position: "absolute",
        borderRadius: "9999px",
        filter: "blur(110px)",
        pointerEvents: "none",
        ...style,
      }}
      animate={{
        x: [0, range, -range * 0.6, 0],
        y: [0, -range * 0.7, range * 0.5, 0],
        scale: [1, 1.12, 0.94, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

export default function FlowingBackdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* base smooth vertical gradient, no hard grid lines */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, var(--dark-bg) 0%, #0b0e16 35%, #0d1220 65%, #0a0c12 100%)",
        }}
      />
      <DriftBlob
        style={{
          width: 640,
          height: 640,
          top: 60,
          left: "-12%",
          background:
            "radial-gradient(circle, rgba(45,108,255,0.30), transparent 68%)",
        }}
        duration={30}
      />
      <DriftBlob
        style={{
          width: 560,
          height: 560,
          top: "38%",
          right: "-14%",
          background:
            "radial-gradient(circle, rgba(1,105,111,0.34), transparent 68%)",
        }}
        duration={34}
        delay={4}
      />
      <DriftBlob
        style={{
          width: 620,
          height: 620,
          bottom: "8%",
          left: "18%",
          background:
            "radial-gradient(circle, rgba(111,160,255,0.22), transparent 70%)",
        }}
        duration={38}
        delay={8}
      />
      <DriftBlob
        style={{
          width: 460,
          height: 460,
          top: "72%",
          right: "12%",
          background:
            "radial-gradient(circle, rgba(180,120,255,0.16), transparent 70%)",
        }}
        duration={30}
        delay={12}
      />
      {/* soft grain-free vignette for depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 60% at 50% 0%, transparent 40%, rgba(0,0,0,0.35) 100%)",
        }}
      />
      {/* interactive swarm of light dots fleeing the cursor */}
      <SwarmField />
    </div>
  );
}
