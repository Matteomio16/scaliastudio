"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import TiltCard from "./TiltCard";
import ProjectPanel from "./ProjectPanel";
import { Project, projects } from "@/lib/projects";

/* ---------- clickable "keys" (open live projects in new tabs) ---------- */
type Key = { label: string; href: string; icon: string };

function ProjectKeys({ keys, accent }: { keys: Key[]; accent: string }) {
  if (!keys.length) return null;
  return (
    <div className="flex flex-wrap gap-3 mt-5">
      {keys.map((k, i) => {
        const internal = k.href.startsWith("/");
        return (
          <motion.a
            key={k.label}
            href={k.href}
            target={internal ? undefined : "_blank"}
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.25 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -3, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group/key relative inline-flex items-center gap-2.5 rounded-xl px-4 py-2.5 bg-dark-surface-high border"
            style={{ borderColor: `${accent}44` }}
          >
            <span
              className="absolute inset-0 rounded-xl opacity-0 group-hover/key:opacity-100 transition-opacity duration-200"
              style={{ boxShadow: `0 12px 30px -12px ${accent}, inset 0 0 0 1px ${accent}` }}
            />
            <span className="relative text-base leading-none" style={{ color: accent }}>
              {k.icon}
            </span>
            <span className="relative label-sm text-dark-on">{k.label}</span>
            <span className="relative text-dark-on-variant group-hover/key:translate-x-0.5 transition-transform">
              &#8599;
            </span>
          </motion.a>
        );
      })}
    </div>
  );
}

/* ---------- shared bits ---------- */
function Reveal({
  children,
  delay = 0,
  className = "",
  x = 0,
  y = 48,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  x?: number;
  y?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <Reveal className="flex items-center gap-3 mb-8">
      <span className="h-px w-8 bg-accent-blue" />
      <span className="label-sm text-accent-blue-glow">{children}</span>
    </Reveal>
  );
}

/* ---------- modern glass-mock helpers ---------- */
function mockBg(accent: string): React.CSSProperties {
  return {
    background: `radial-gradient(130% 80% at 50% -5%, ${accent}2e, transparent 55%), linear-gradient(165deg, #141821 0%, #0a0c11 70%)`,
  };
}

function GridOverlay() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        maskImage:
          "radial-gradient(ellipse at center, black 35%, transparent 85%)",
        WebkitMaskImage:
          "radial-gradient(ellipse at center, black 35%, transparent 85%)",
      }}
    />
  );
}

function Chip({
  children,
  active,
  accent,
}: {
  children: React.ReactNode;
  active?: boolean;
  accent: string;
}) {
  return (
    <span
      className="rounded-full px-3 py-1 text-[0.66rem] font-medium border whitespace-nowrap"
      style={
        active
          ? {
              background: `${accent}22`,
              borderColor: `${accent}88`,
              color: "#fff",
            }
          : {
              background: "rgba(255,255,255,0.04)",
              borderColor: "rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.65)",
            }
      }
    >
      {children}
    </span>
  );
}

/* ---------- CSS mock visuals ---------- */
function MockLeSpot() {
  const accent = projects.lespot.accent;
  return (
    <div
      className="relative w-full h-full overflow-hidden flex flex-col items-center justify-center gap-4 p-6"
      style={mockBg(accent)}
    >
      <GridOverlay />
      <div className="relative flex flex-col items-center gap-1">
        <span
          style={{
            fontFamily: "var(--font-newsreader), serif",
            fontSize: "clamp(2rem,4vw,3rem)",
            fontWeight: 600,
            lineHeight: 1,
            background: "linear-gradient(92deg,#c17ee0,#e8a000)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          LeSpot.
        </span>
        <span
          className="uppercase font-semibold tracking-[0.18em]"
          style={{ color: "#e8a000", fontSize: "0.6rem" }}
        >
          Cultural Discovery · Made Easy
        </span>
      </div>
      <span className="relative text-white/45 text-[0.7rem] tracking-wide">
        What are you in the mood for?
      </span>
      <div className="relative flex flex-wrap gap-2 justify-center max-w-[88%]">
        {["🎭 Culture", "🌙 Tonight", "🎵 Music", "🎨 Art", "🍷 Food"].map(
          (c, i) => (
            <Chip key={c} active={i === 1} accent={accent}>
              {c}
            </Chip>
          ),
        )}
      </div>
      <div
        className="relative rounded-full px-5 py-2 text-[0.72rem] font-semibold text-white"
        style={{ background: `linear-gradient(90deg,${accent},#ef489a,#e8a000)` }}
      >
        Discover Free Events →
      </div>
      <span className="relative text-white/30 text-[0.58rem] tracking-[0.14em] uppercase">
        1,500+ events · 20 arrondissements · Paris
      </span>
    </div>
  );
}

function TrackerRing({ pct, accent }: { pct: number; accent: string }) {
  const r = 42;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative" style={{ width: "clamp(72px,10vw,104px)", aspectRatio: "1" }}>
      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
        <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke={accent}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - pct / 100)}
          style={{ filter: `drop-shadow(0 0 6px ${accent}aa)` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-bold leading-none" style={{ color: accent, fontSize: "clamp(1rem,1.8vw,1.4rem)" }}>
          {pct}%
        </span>
        <span className="text-white/35 uppercase tracking-wider text-[0.42rem]">
          Reliability
        </span>
      </div>
    </div>
  );
}

function StatBar({ name, pct, color }: { name: string; pct: number; color: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="text-white/40 text-[0.6rem] w-16 text-right">{name}</span>
      <div className="flex-1 h-[3px] rounded-full bg-white/8 overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="text-[0.6rem] font-semibold w-8" style={{ color }}>
        {pct}%
      </span>
    </div>
  );
}

function MockTracker() {
  const accent = projects.tracker.accent;
  return (
    <div
      className="relative w-full h-full overflow-hidden flex flex-col items-center justify-center gap-4 p-6"
      style={mockBg(accent)}
    >
      <GridOverlay />
      <div className="relative flex flex-col items-center gap-1">
        <span
          className="font-bold tracking-tight leading-none text-white"
          style={{ fontSize: "clamp(1.7rem,3.4vw,2.6rem)" }}
        >
          Track<span style={{ color: accent }}>.er</span>
        </span>
        <span
          className="uppercase font-semibold tracking-[0.16em] text-[0.58rem]"
          style={{ color: `${accent}bb` }}
        >
          Reliability · Streaks · Wellness
        </span>
      </div>
      <TrackerRing pct={82} accent={accent} />
      <div className="relative w-[86%] flex flex-col gap-2">
        <StatBar name="Completion" pct={82} color="#4ade80" />
        <StatBar name="Focus" pct={70} color="#ffb300" />
        <StatBar name="Precision" pct={65} color="#facc15" />
      </div>
    </div>
  );
}

function MeetballLogo() {
  return (
    <span
      className="relative inline-block rounded-[42%]"
      style={{
        width: "1.9rem",
        height: "1.9rem",
        background:
          "conic-gradient(from 210deg,#ff5f6d,#ffc371,#3fe7b0,#4d8bff,#b565f0,#ff5f6d)",
        boxShadow: "0 0 18px rgba(120,140,255,0.45)",
      }}
    >
      <span
        className="absolute rounded-full"
        style={{ inset: "32%", background: "#0b0d12" }}
      />
    </span>
  );
}

function PipeNode({
  label,
  active,
  accent,
}: {
  label: string;
  active?: boolean;
  accent: string;
}) {
  return (
    <div
      className="rounded-lg px-2.5 py-1.5 border text-[0.6rem] font-medium whitespace-nowrap"
      style={
        active
          ? { background: `${accent}22`, borderColor: `${accent}99`, color: "#fff" }
          : {
              background: "rgba(255,255,255,0.04)",
              borderColor: "rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.7)",
            }
      }
    >
      {label}
    </div>
  );
}

function MockMeetball() {
  const accent = projects.meetball.accent;
  return (
    <div
      className="relative w-full h-full overflow-hidden flex flex-col items-center justify-center gap-4 p-6"
      style={mockBg(accent)}
    >
      <GridOverlay />
      <div className="relative flex items-center gap-2.5">
        <MeetballLogo />
        <span
          className="font-semibold tracking-tight text-white lowercase"
          style={{ fontSize: "clamp(1.5rem,3vw,2.2rem)" }}
        >
          meetball
        </span>
      </div>
      <span
        className="relative uppercase font-semibold tracking-[0.16em] text-[0.58rem]"
        style={{ color: `${accent}cc` }}
      >
        Automation · Email Engineering
      </span>

      {/* automation pipeline */}
      <div className="relative flex items-center gap-1.5 flex-wrap justify-center">
        <PipeNode label="App event" accent={accent} />
        <span className="text-white/25 text-xs">→</span>
        <PipeNode label="Make.com" active accent={accent} />
        <span className="text-white/25 text-xs">→</span>
        <PipeNode label="Router" accent={accent} />
        <span className="text-white/25 text-xs">→</span>
        <PipeNode label="Resend" accent={accent} />
      </div>

      <div className="relative flex flex-wrap gap-2 justify-center">
        <Chip active accent={accent}>Sustainable workflows</Chip>
        <Chip accent={accent}>Email automation</Chip>
        <Chip accent={accent}>Live matching</Chip>
      </div>
    </div>
  );
}

function MockMirofish() {
  return (
    <div className="mock-mirofish w-full h-full">
      <div className="mf-orb mf-orb-blue" />
      <div className="mf-orb mf-orb-cyan" />
      <div className="mf-orb mf-orb-mid" />
      <div className="mf-grid-overlay" />
      <div className="mf-ui">
        <div className="mf-logo-header">
          <Image
            src="/mirofish_logo.png"
            className="mf-logo-img"
            alt="MiroFish"
            width={78}
            height={78}
          />
          <span className="mf-logo-tagline">
            Swarm Intelligence · Prediction Engine
          </span>
        </div>
        <div className="mf-editorial">
          <span className="mf-edit-eye">What is Swarm Intelligence?</span>
          <p className="mf-edit-headline">
            Instead of training a model on data, you simulate a society.
          </p>
          <div className="mf-edit-div" />
          <p className="mf-edit-body">
            MiroFish builds a living digital world populated by AI agents — each
            with unique personality, memory, and biases. They post, debate, form
            factions, shift opinions. The prediction emerges from collective
            behaviour. Applicable to elections, sports, markets, and policy.
          </p>
        </div>
        <div className="mf-edit-stats">
          <div>
            <span className="mf-edit-stat-n">120</span>
            <span className="mf-edit-stat-l">Agents per simulation</span>
          </div>
          <div>
            <span className="mf-edit-stat-n">30+</span>
            <span className="mf-edit-stat-l">Simulation rounds</span>
          </div>
          <div>
            <span className="mf-edit-stat-n">#1</span>
            <span className="mf-edit-stat-l">GitHub Global Trending</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function MockOpenClaw() {
  return (
    <div className="mock-openclaw w-full h-full">
      <div className="oc-orb oc-orb-teal1" />
      <div className="oc-orb oc-orb-teal2" />
      <div className="oc-grid-overlay" />
      <div className="oc-ui">
        <div className="oc-wordmark-row">
          <Image
            src="/openclaw.png"
            className="oc-logo-img"
            alt="OpenClaw logo"
            width={44}
            height={44}
          />
          <div className="oc-wordmark">
            Open<span className="oc-wm-accent">Claw</span>
          </div>
        </div>
        <div className="oc-subtitle">Use Cases for Personal AI Agent Teams</div>
        <div className="oc-cases">
          <div className="oc-case">
            <span className="oc-case-num">01</span>
            <span className="oc-case-label">Multi-agentic office infrastructure</span>
          </div>
          <div className="oc-case oc-case-mid">
            <span className="oc-case-num">02</span>
            <span className="oc-case-label">Fully integrated outreach team</span>
          </div>
          <div className="oc-case oc-case-dim">
            <span className="oc-case-num">03</span>
            <span className="oc-case-label">Idea testing and research frameworks</span>
          </div>
        </div>
        <div className="oc-bottom">Python · AWS · REST API · Claude</div>
      </div>
    </div>
  );
}

/* ---------- card shell ---------- */
function MockShell({
  project,
  onOpen,
  aspect,
  children,
}: {
  project: Project;
  onOpen: (p: Project) => void;
  aspect: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80, rotateX: 14, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1200, transformStyle: "preserve-3d" }}
    >
      <TiltCard
        max={12}
        onClick={() => onOpen(project)}
        ariaLabel={`${project.name} project`}
        className="group cursor-pointer rounded-2xl"
      >
        <div
          className={`relative ${aspect} rounded-2xl overflow-hidden border transition-shadow duration-500`}
          style={{
            borderColor: `${project.accent}33`,
            boxShadow: `0 30px 80px -40px rgba(0,0,0,0.8)`,
          }}
        >
          {children}
          {/* hover accent ring + deep glow */}
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ boxShadow: `inset 0 0 0 1px ${project.accent}, 0 26px 60px -26px ${project.accent}` }}
          />
          {/* sheen sweep on hover */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
            <div className="absolute -inset-y-12 -left-1/3 w-1/4 rotate-12 bg-white/8 blur-lg opacity-0 group-hover:opacity-100 group-hover:translate-x-[480%] transition-all duration-[1100ms] ease-out" />
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

function Editorial({
  cat,
  title,
  children,
  keys,
  accent,
}: {
  cat: string;
  title: string;
  children: React.ReactNode;
  keys: Key[];
  accent: string;
}) {
  return (
    <div>
      <span className="label-sm" style={{ color: accent }}>
        {cat}
      </span>
      <h3 className="display-md text-white mt-2 mb-3">{title}</h3>
      <div className="body-lg text-dark-on-variant space-y-3 max-w-xl">
        {children}
      </div>
      <ProjectKeys keys={keys} accent={accent} />
    </div>
  );
}

/* ---------- section ---------- */
export default function Projects() {
  const [active, setActive] = useState<Project | null>(null);
  const P = projects;

  return (
    <section className="page-pad py-32" id="projects" aria-label="Selected Works">
      <Reveal>
        <h2 className="display-md text-white mb-3">Things we&rsquo;ve shipped.</h2>
      </Reveal>
      <SectionLabel>Selected Works</SectionLabel>

      {/* Row 1 — featured LeSpot + stacked Tracker/Meetball */}
      <div className="grid lg:grid-cols-[1.35fr_1fr] gap-10 mb-32">
        <Reveal x={-56} y={0}>
          <MockShell project={P.lespot} onOpen={setActive} aspect="aspect-[5/4]">
            <MockLeSpot />
          </MockShell>
          <div className="mt-6">
            <Editorial
              cat="AI APP · FULL-STACK"
              title="LeSpot"
              accent={P.lespot.accent}
              keys={[
                { label: "Live app", href: "https://web-lespot.vercel.app/", icon: "◆" },
                { label: "Landing page", href: "https://lespot-paris.netlify.app/", icon: "◇" },
              ]}
            >
              <p>
                Free cultural event discovery for international students in Paris.
                1,500+ curated events across all 20 arrondissements — surfaced by
                an AI layer that matches your mood, schedule, and interests in
                seconds.
              </p>
              <p className="label-sm text-dark-on-variant !mt-4 tracking-wide">
                React · TypeScript · Supabase · PostgreSQL · Gemini AI · Vercel
              </p>
            </Editorial>
          </div>
        </Reveal>

        <div className="flex flex-col gap-14">
          <Reveal delay={0.1} x={56} y={0}>
            <MockShell project={P.tracker} onOpen={setActive} aspect="aspect-[16/10]">
              <MockTracker />
            </MockShell>
            <div className="mt-5">
              <Editorial
                cat="PRODUCTIVITY · FULL-STACK"
                title="Student Life Tracker"
                accent={P.tracker.accent}
                keys={[
                  { label: "Live app", href: "https://studentlifetracker.lovable.app/", icon: "◆" },
                ]}
              >
                <p className="text-[0.95rem]">
                  Task management, academic scheduling, wellness tracking, and
                  gamified streaks — backed by a 9-table Supabase schema and a
                  custom reliability scoring engine.
                </p>
              </Editorial>
            </div>
          </Reveal>

          <Reveal delay={0.2} x={56} y={0}>
            <MockShell project={P.meetball} onOpen={setActive} aspect="aspect-[16/10]">
              <MockMeetball />
            </MockShell>
            <div className="mt-5">
              <Editorial
                cat="AUTOMATION · EMAIL ENGINEERING"
                title="Meetball"
                accent={P.meetball.accent}
                keys={[
                  { label: "Visit Meetball", href: "https://meetball.fun", icon: "◆" },
                ]}
              >
                <p className="text-[0.95rem]">
                  Sustainable automation for a Lisbon community startup — HTML
                  email templates and Make.com pipelines (Webhooks → Router →
                  Resend) that route app events into personalised, deduplicated
                  delivery. Live for Web Summit Lisbon.
                </p>
              </Editorial>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Personal Research — MiroFish */}
      <SectionLabel>Personal Research</SectionLabel>
      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 items-center mb-32">
        <Reveal x={-56} y={0}>
          <MockShell project={P.mirofish} onOpen={setActive} aspect="aspect-[16/10]">
            <MockMirofish />
          </MockShell>
        </Reveal>
        <Reveal x={56} y={0} delay={0.12}>
        <Editorial
          cat="AI AGENTS · SIMULATION · FORECASTING"
          title="MiroFish"
          accent={P.mirofish.accent}
          keys={[
            { label: "Hungary 2026 research", href: "/projects/hungary-2026", icon: "◆" },
          ]}
        >
          <p>
            Deploy 120 AI agents into a digital world. Let them debate, form
            factions, shift opinions. Extract the prediction from their
            collective behaviour.
          </p>
          <p className="label-sm text-dark-on-variant !mt-4 tracking-wide">
            Python · Neo4j AuraDB · OpenRouter · NVIDIA Nemotron 120B · OASIS
          </p>
        </Editorial>
        </Reveal>
      </div>

      {/* Legacy — OpenClaw */}
      <SectionLabel>Legacy Experiments</SectionLabel>
      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 items-center">
        <Reveal x={-56} y={0}>
          <MockShell project={P.openclaw} onOpen={setActive} aspect="aspect-[16/9]">
            <MockOpenClaw />
          </MockShell>
        </Reveal>
        <Reveal x={56} y={0} delay={0.12}>
        <Editorial
          cat="AI AGENTS · INFRA"
          title="OpenClaw"
          accent={P.openclaw.accent}
          keys={[]}
        >
          <p className="text-[0.95rem]">
            A personal AI agent framework for coordinating teams of specialised
            LLM agents around a shared goal — autonomous delegation and
            multi-step execution over a REST API layer, on Python + AWS Lambda,
            orchestrated via Claude.
          </p>
        </Editorial>
        </Reveal>
      </div>

      <ProjectPanel project={active} onClose={() => setActive(null)} />
    </section>
  );
}
