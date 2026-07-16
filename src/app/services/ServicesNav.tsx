"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * The services page runs cream at the top and melts to dark partway down, so
 * the nav swaps its whole treatment once the melt strip reaches it rather than
 * at a fixed scroll offset.
 */
export default function ServicesNav() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const darkZone = document.getElementById("svc-darkzone");
      const d = darkZone
        ? window.scrollY + 70 > darkZone.offsetTop
        : window.scrollY > window.innerHeight * 2;
      setDark(d);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const linkStyle: React.CSSProperties = {
    fontSize: "0.8125rem",
    color: dark ? "#9aa4b6" : "#44483f",
    transition: "color 220ms ease",
  };

  return (
    <nav
      aria-label="Services"
      className="page-pad"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: 56,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backdropFilter: "blur(16px)",
        background: dark ? "rgba(8,10,16,0.72)" : "rgba(250,249,245,0.72)",
        borderBottom: `1px solid ${dark ? "#232a38" : "transparent"}`,
        transition:
          "background 300ms var(--ease), border-color 300ms var(--ease)",
      }}
    >
      <Link href="/" style={{ display: "flex", alignItems: "center" }}>
        <Image
          src="/SCALIA_logo.png"
          alt="Scalia Studio"
          width={140}
          height={38}
          priority
          style={{
            height: 34,
            width: "auto",
            filter: dark ? "invert(1) brightness(2)" : "none",
            transition: "filter 300ms ease",
          }}
        />
      </Link>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "clamp(1.25rem,3vw,2.5rem)",
        }}
      >
        <a href="#svc-build" style={linkStyle}>
          Services
        </a>
        <a href="#svc-ai" style={linkStyle}>
          Proof
        </a>
        <a
          href="#svc-contact"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            fontSize: "0.8125rem",
            fontWeight: 500,
            color: dark ? "#fff" : "#faf9f5",
            background: dark ? "#2d6cff" : "#1b1c1a",
            padding: "0.45rem 0.9rem",
            borderRadius: 999,
            transition: "background 220ms ease, color 220ms ease",
          }}
        >
          Start a build <span style={{ fontSize: "0.9rem" }}>&rarr;</span>
        </a>
      </div>
    </nav>
  );
}
