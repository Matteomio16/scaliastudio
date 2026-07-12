"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { projects } from "@/lib/projects";
import {
  makeImageCardTexture,
  makeCaptionTexture,
  CARD_W_UNITS,
  CARD_H_UNITS,
  CAPTION_W_UNITS,
  CAPTION_H_UNITS,
} from "./cardTexture";

const RADIUS = 4.7;
const SLOTS = 12;

// Only the projects that have a landscape case image, cycled around the ring.
const RING_PROJECTS = [
  projects.mirofish,
  projects.meetball,
  projects.tracker,
  projects.lespot,
];

function Card({
  cardTex,
  captionTex,
  angle,
  accent,
}: {
  cardTex: THREE.CanvasTexture;
  captionTex: THREE.CanvasTexture;
  angle: number;
  accent: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const capRef = useRef<THREE.Mesh>(null);
  const hovered = useRef(false);
  const pop = useRef(0);

  useFrame(() => {
    const target = hovered.current ? 1 : 0;
    pop.current += (target - pop.current) * 0.12;
    if (meshRef.current) {
      meshRef.current.position.z = pop.current * 0.6;
      const s = 1 + pop.current * 0.1;
      meshRef.current.scale.set(s, s, s);
      const mat = meshRef.current.material as THREE.MeshBasicMaterial;
      mat.color.setScalar(1 + pop.current * 0.25);
    }
    if (capRef.current) {
      capRef.current.position.z = pop.current * 0.6;
    }
  });

  const capY = -(CARD_H_UNITS / 2 + 0.12 + CAPTION_H_UNITS / 2);

  return (
    <group
      rotation={[0, angle, 0]}
      position={[Math.sin(angle) * RADIUS, 0, Math.cos(angle) * RADIUS]}
    >
      <mesh
        ref={meshRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          hovered.current = true;
          document.body.style.cursor = "grab";
        }}
        onPointerOut={() => {
          hovered.current = false;
          document.body.style.cursor = "";
        }}
      >
        <planeGeometry args={[CARD_W_UNITS, CARD_H_UNITS]} />
        <meshBasicMaterial
          map={cardTex}
          transparent
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>

      {/* accent glow behind the card */}
      <mesh position={[0, 0, -0.02]} scale={[1.14, 1.16, 1]}>
        <planeGeometry args={[CARD_W_UNITS, CARD_H_UNITS]} />
        <meshBasicMaterial
          color={accent}
          transparent
          opacity={0.13}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* caption below the card */}
      <mesh ref={capRef} position={[0, capY, 0]}>
        <planeGeometry args={[CAPTION_W_UNITS, CAPTION_H_UNITS]} />
        <meshBasicMaterial map={captionTex} transparent toneMapped={false} />
      </mesh>
    </group>
  );
}

export default function CardRing() {
  const spinRef = useRef<THREE.Group>(null);
  const { gl } = useThree();
  const velocity = useRef(0);
  const dragging = useRef(false);
  const lastX = useRef(0);

  const cards = useMemo(() => {
    // one texture per unique project, reused across repeated slots
    const cache = new Map<
      string,
      { card: THREE.CanvasTexture; caption: THREE.CanvasTexture }
    >();
    for (const p of RING_PROJECTS) {
      cache.set(p.id, {
        card: makeImageCardTexture({
          imgSrc: p.caseImage,
          name: p.ringLabel ?? p.name,
          accent: p.accent,
        }),
        caption: makeCaptionTexture({
          label: p.ringLabel ?? p.name,
          desc: p.ringDesc ?? "",
        }),
      });
    }
    return Array.from({ length: SLOTS }, (_, i) => {
      const p = RING_PROJECTS[i % RING_PROJECTS.length];
      const tex = cache.get(p.id)!;
      return {
        key: i,
        angle: (i / SLOTS) * Math.PI * 2,
        accent: p.accent,
        cardTex: tex.card,
        captionTex: tex.caption,
      };
    });
  }, []);

  useEffect(() => {
    const el = gl.domElement;
    const onDown = (e: PointerEvent) => {
      dragging.current = true;
      lastX.current = e.clientX;
      document.body.style.cursor = "grabbing";
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging.current || !spinRef.current) return;
      const dx = e.clientX - lastX.current;
      lastX.current = e.clientX;
      const delta = dx * 0.006;
      spinRef.current.rotation.y += delta;
      velocity.current = delta;
    };
    const onUp = () => {
      dragging.current = false;
      document.body.style.cursor = "";
    };
    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [gl]);

  useFrame((_, dt) => {
    if (!spinRef.current) return;
    if (dragging.current) return;
    spinRef.current.rotation.y += 0.12 * dt + velocity.current;
    velocity.current *= 0.93;
    if (Math.abs(velocity.current) < 0.00001) velocity.current = 0;
  });

  return (
    <group ref={spinRef}>
      {cards.map((c) => (
        <Card
          key={c.key}
          cardTex={c.cardTex}
          captionTex={c.captionTex}
          angle={c.angle}
          accent={c.accent}
        />
      ))}
    </group>
  );
}
