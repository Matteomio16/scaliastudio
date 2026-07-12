"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Canvas, useThree, type RootState } from "@react-three/fiber";
import * as THREE from "three";
import CardRing from "./CardRing";
import ParticleSphere from "./ParticleSphere";
import GlowPocket from "./GlowPocket";

// Bloom is split into its own chunk so the base sphere + ring render from a
// smaller critical bundle; the glow is added a frame later (identical once set).
const Effects = dynamic(() => import("./Effects"), { ssr: false });

// Camera framing: pulled back + aimed low into the ring so the front cards and
// their captions sit high enough to leave cream room below before the section's
// bottom edge (and the melt into the dark zone). Set in onCreated so it always
// runs after R3F has initialized the camera — no mount-order race.
const CAM_POS: [number, number, number] = [0, 3.4, 11.2];
const CAM_TARGET: [number, number, number] = [0, -1.1, 0];

function aimCamera(camera: THREE.Camera) {
  camera.position.set(...CAM_POS);
  camera.lookAt(...CAM_TARGET);
}

/** Scales the scene to fit the viewport width. */
function SceneContent() {
  const groupRef = useRef<THREE.Group>(null);
  const { size } = useThree();

  useEffect(() => {
    // cap at 0.85 so the ring + captions always clear the section's bottom edge
    // (a larger scale pushes the front captions below the fold on wide screens)
    const s = Math.min(0.85, Math.max(0.62, size.width / 1500));
    groupRef.current?.scale.setScalar(s);
  }, [size.width]);

  return (
    <group ref={groupRef} position={[0, -1.25, 0]}>
      <GlowPocket />
      <CardRing />
      <ParticleSphere />
    </group>
  );
}

export default function HeroScene({ onReady }: { onReady?: () => void }) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Reduced motion: skip the WebGL entirely and leave the static poster in place.
  if (reducedMotion) return null;

  const handleCreated = ({ camera, gl }: RootState) => {
    aimCamera(camera);
    // Signal "ready" only after a couple of real frames have painted (sphere,
    // ring + preloaded textures), so the poster crossfades to a complete scene.
    if (onReady) {
      gl.domElement.getContext("webgl2"); // ensure context is live
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setTimeout(onReady, 350)),
      );
    }
  };

  return (
    <div className="absolute inset-0 hero-scene-in">
      <Canvas
        camera={{ position: CAM_POS, fov: 44 }}
        onCreated={handleCreated}
        dpr={[1, 1.8]}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          // keep the canvas background EXACTLY the page cream — default ACES
          // tone mapping shifts #faf9f5 darker and causes a visible seam
          toneMapping: THREE.NoToneMapping,
        }}
      >
        <color attach="background" args={["#faf9f5"]} />
        <SceneContent />
        <Effects />
      </Canvas>
    </div>
  );
}
