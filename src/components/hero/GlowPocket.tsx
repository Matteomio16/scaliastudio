"use client";

import { useMemo } from "react";
import * as THREE from "three";

/**
 * A soft dark radial disc placed behind the particle sphere so that additive
 * particles read as "glowing" and bloom has something dark to bloom against,
 * while fading into the cream page background at its edges.
 */
export default function GlowPocket() {
  const texture = useMemo(() => {
    const size = 512;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const g = ctx.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2,
    );
    g.addColorStop(0, "rgba(8,13,30,0.92)");
    g.addColorStop(0.45, "rgba(10,16,38,0.55)");
    g.addColorStop(0.75, "rgba(18,24,46,0.18)");
    g.addColorStop(1, "rgba(18,24,46,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  return (
    <mesh position={[0, 0, -0.6]}>
      <planeGeometry args={[6, 6]} />
      <meshBasicMaterial
        map={texture}
        transparent
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
}
