"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useThree, type RootState } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import CardRing from "./CardRing";
import ParticleSphere from "./ParticleSphere";
import GlowPocket from "./GlowPocket";

function StaticFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-64 h-64 rounded-full bg-[radial-gradient(circle,rgba(45,108,255,0.25),transparent_70%)]" />
    </div>
  );
}

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

export default function HeroScene() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (reducedMotion) return <StaticFallback />;

  return (
    <div className="absolute inset-0 hero-scene-in">
      <Canvas
        camera={{ position: CAM_POS, fov: 44 }}
        onCreated={({ camera }: RootState) => aimCamera(camera)}
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
        <EffectComposer>
          <Bloom
            intensity={1.5}
            luminanceThreshold={1.0}
            luminanceSmoothing={0.5}
            mipmapBlur
            radius={0.85}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
