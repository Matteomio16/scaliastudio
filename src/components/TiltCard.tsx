"use client";

import { ReactNode, useRef } from "react";

export default function TiltCard({
  children,
  className = "",
  max = 9,
  onClick,
  ariaLabel,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  onClick?: () => void;
  ariaLabel?: string;
}) {
  // The OUTER element is never transformed, so its bounding rect is stable and
  // the tilt is a pure function of the cursor position. The INNER element carries
  // the tilt — measuring it would feed its own transform back into the math and
  // make the angle drift / snap as the cursor left the tilted hit-area.
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;
    const r = outer.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (0.5 - py) * max;
    const ry = (px - 0.5) * max * 1.2;
    inner.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(380px circle at ${
        px * 100
      }% ${py * 100}%, rgba(111,160,255,0.16), transparent 62%)`;
    }
  };

  const reset = () => {
    if (innerRef.current)
      innerRef.current.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    if (glowRef.current) glowRef.current.style.background = "transparent";
  };

  return (
    <div
      ref={outerRef}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={onClick}
      aria-label={ariaLabel}
      className={`relative ${className}`}
    >
      <div
        ref={innerRef}
        className="relative rounded-[inherit]"
        style={{
          transformStyle: "preserve-3d",
          transition:
            "transform 260ms cubic-bezier(0.16,1,0.3,1), box-shadow 260ms cubic-bezier(0.16,1,0.3,1)",
          willChange: "transform",
        }}
      >
        {children}
        <div
          ref={glowRef}
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{ background: "transparent", zIndex: 2, transition: "background 200ms" }}
        />
      </div>
    </div>
  );
}
