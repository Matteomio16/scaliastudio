"use client";

import { EffectComposer, Bloom } from "@react-three/postprocessing";

/**
 * Postprocessing (bloom) split into its own chunk so it loads AFTER the base
 * sphere + ring. The scene renders from a smaller critical bundle and the bloom
 * is added a frame later — visually identical once settled.
 */
export default function Effects() {
  return (
    <EffectComposer>
      <Bloom
        intensity={1.5}
        luminanceThreshold={1.0}
        luminanceSmoothing={0.5}
        mipmapBlur
        radius={0.85}
      />
    </EffectComposer>
  );
}
