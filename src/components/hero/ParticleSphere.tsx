"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { createNoise3D } from "simplex-noise";
import * as THREE from "three";

const COUNT = 2800;
const RADIUS = 1.42;

function makeSprite() {
  const s = 64;
  const c = document.createElement("canvas");
  c.width = s;
  c.height = s;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.35, "rgba(255,255,255,0.8)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  return new THREE.CanvasTexture(c);
}

export default function ParticleSphere() {
  const pointsRef = useRef<THREE.Points>(null);
  const noise3D = useMemo(() => createNoise3D(), []);
  const sprite = useMemo(() => makeSprite(), []);
  const mouse3D = useRef(new THREE.Vector3(999, 999, 999));
  const smoothMouse = useRef(new THREE.Vector3(999, 999, 999));
  const localMouse = useRef(new THREE.Vector3(999, 999, 999));

  const { positions, colors, base } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const base = new Float32Array(COUNT * 3);

    const cDeep = new THREE.Color("#1f4fd6");
    const cMid = new THREE.Color("#2d6cff");
    const cBright = new THREE.Color("#aecbff");

    for (let i = 0; i < COUNT; i++) {
      const theta = Math.acos(1 - 2 * ((i + 0.5) / COUNT));
      const phi = Math.PI * (1 + Math.sqrt(5)) * i;
      const x = Math.sin(theta) * Math.cos(phi) * RADIUS;
      const y = Math.sin(theta) * Math.sin(phi) * RADIUS;
      const z = Math.cos(theta) * RADIUS;
      base[i * 3] = x;
      base[i * 3 + 1] = y;
      base[i * 3 + 2] = z;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const t = (y / RADIUS + 1) / 2;
      const col =
        t < 0.5
          ? cDeep.clone().lerp(cMid, t * 2)
          : cMid.clone().lerp(cBright, (t - 0.5) * 2);
      const boost = 2.1;
      colors[i * 3] = col.r * boost;
      colors[i * 3 + 1] = col.g * boost;
      colors[i * 3 + 2] = col.b * boost;
    }
    return { positions, colors, base };
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const { pointer, camera } = state;

    const pts = pointsRef.current;
    if (!pts) return;
    const posAttr = pts.geometry.attributes.position as THREE.BufferAttribute;

    // apply this frame's rotation FIRST so the cursor math matches
    // exactly what ends up on screen
    pts.rotation.y = t * 0.06;
    pts.rotation.x = Math.sin(t * 0.14) * 0.1;
    pts.updateMatrixWorld();

    // project the cursor onto the sphere's world plane (z = 0)
    const v = new THREE.Vector3(pointer.x, pointer.y, 0.5);
    v.unproject(camera);
    const dir = v.sub(camera.position).normalize();
    const dist = -camera.position.z / dir.z;
    mouse3D.current.copy(camera.position).add(dir.multiplyScalar(dist));

    // smooth the cursor for fluid, consistent motion (no jitter)
    if (smoothMouse.current.x > 500) {
      smoothMouse.current.copy(mouse3D.current);
    } else {
      smoothMouse.current.lerp(mouse3D.current, 0.22);
    }

    // exact local-space transform — handles BOTH x and y rotation,
    // so the dodge direction is always true to the cursor
    localMouse.current.copy(smoothMouse.current);
    pts.worldToLocal(localMouse.current);
    const mx = localMouse.current.x;
    const my = localMouse.current.y;
    const mz = localMouse.current.z;

    for (let i = 0; i < COUNT; i++) {
      const bx = base[i * 3];
      const by = base[i * 3 + 1];
      const bz = base[i * 3 + 2];

      const n = noise3D(bx * 1.1 + t * 0.18, by * 1.1, bz * 1.1 - t * 0.12);
      const breathe = 1 + n * 0.07;

      let x = bx * breathe;
      let y = by * breathe;
      let z = bz * breathe;

      const dx = x - mx;
      const dy = y - my;
      const dz = z - mz;
      const d2 = dx * dx + dy * dy + dz * dz;
      // wider influence radius + stronger, distance-graded push
      const push = Math.exp(-d2 * 1.8) * 1.0;
      if (push > 0.001) {
        const inv2 = 1 / (Math.sqrt(d2) + 0.001);
        x += dx * inv2 * push;
        y += dy * inv2 * push;
        z += dz * inv2 * push;
      }

      posAttr.setXYZ(i, x, y, z);
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.075}
        map={sprite}
        sizeAttenuation
        vertexColors
        transparent
        opacity={1}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </points>
  );
}
