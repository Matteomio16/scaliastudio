import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import ServicesNav from "./ServicesNav";
import FlowField from "./FlowField";
import HeroCards from "./HeroCards";
import FullStackCard from "./FullStackCard";
import MarketSimCard from "./MarketSimCard";
import Pipeline from "./Pipeline";
import WeekStrip from "./WeekStrip";
import "./services.css";

export const metadata: Metadata = {
  title: "Services | Scalia Studio",
  description:
    "Every service we sell is already shipped and live — 3D websites, full-stack apps, market simulations, and automation. Grab a card and see what you want to build.",
};

const chips = [
  { href: "#svc-web", label: "Dynamic websites", dot: "#2d6cff", color: "#2d5fd8", border: "rgba(45,108,255,0.35)", bg: "rgba(45,108,255,0.08)" },
  { href: "#svc-fullstack", label: "Full-stack apps", dot: "#22c55e", color: "#158043", border: "rgba(34,150,80,0.35)", bg: "rgba(34,197,94,0.09)" },
  { href: "#svc-ai", label: "Market simulations", dot: "#b565f0", color: "#8b45c9", border: "rgba(181,101,240,0.4)", bg: "rgba(181,101,240,0.1)" },
  { href: "#svc-auto", label: "Automation & AI", dot: "#ef8354", color: "#c05a24", border: "rgba(207,99,41,0.35)", bg: "rgba(239,131,84,0.1)" },
];

const badge: React.CSSProperties = {
  display: "inline-block",
  fontSize: "0.625rem",
  fontWeight: 600,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  padding: "0.35rem 0.7rem",
  borderRadius: 999,
};

const cardHeading: React.CSSProperties = {
  fontFamily: "var(--font-newsreader), serif",
  fontWeight: 400,
  fontSize: "clamp(2rem,3.8vw,3.2rem)",
  letterSpacing: "-0.02em",
  lineHeight: 1.05,
  margin: "1.2rem 0 0",
};

const startBuild: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.5rem",
  color: "#fff",
  fontSize: "0.85rem",
  fontWeight: 500,
  padding: "0.75rem 1.3rem",
  borderRadius: 10,
};

const secLink: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.35rem",
  fontSize: "0.85rem",
};

const ctaRow: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: "1.5rem",
  marginTop: "1.9rem",
};

const chipRow: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "0.5rem",
  marginTop: "1.6rem",
};

/** Card visuals sit in one column of a max-1200px two-up grid. */
const CASE_SIZES = "(max-width: 1280px) 45vw, 520px";

/** Section shells opt into the flow field's colour via data-accent/data-theme. */
const cardSection: React.CSSProperties = {
  padding: "clamp(1.5rem,3vh,2.5rem) clamp(1.5rem,5.5vw,4rem)",
  scrollMarginTop: 80,
};

function TechChip({
  children,
  border,
  color,
}: {
  children: React.ReactNode;
  border: string;
  color: string;
}) {
  return (
    <span
      style={{
        fontSize: "0.7rem",
        padding: "0.4rem 0.7rem",
        borderRadius: 8,
        border: `1px solid ${border}`,
        color,
      }}
    >
      {children}
    </span>
  );
}

export default function ServicesPage() {
  return (
    <div
      style={{
        position: "relative",
        background: "#faf9f5",
        color: "#1b1c1a",
        overflowX: "hidden",
      }}
    >
      <FlowField />
      <ServicesNav />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* ============ HERO ============ */}
        <section
          id="svc-top"
          data-accent="45,108,255"
          data-theme="cream"
          className="page-pad"
          style={{
            position: "relative",
            minHeight: "100svh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            paddingTop: "clamp(4.5rem,9vh,6.5rem)",
            paddingBottom: 0,
          }}
        >
          <p
            style={{
              fontSize: "0.6875rem",
              fontWeight: 500,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#44483f",
              margin: "0 0 1.4rem",
            }}
          >
            Services &nbsp;&middot;&nbsp; Paris — Geneva — Vienna
          </p>
          <h1
            style={{
              fontFamily: "var(--font-newsreader), serif",
              fontWeight: 400,
              fontSize: "clamp(2.1rem,5.2vw,4.3rem)",
              letterSpacing: "-0.025em",
              lineHeight: 1.02,
              margin: 0,
              maxWidth: "16ch",
            }}
          >
            Most studios send a deck.
            <br />
            <span style={{ fontStyle: "italic" }}>
              You&rsquo;re standing in ours.
            </span>
            <span className="svc-caret">|</span>
          </h1>
          <p
            style={{
              fontSize: "clamp(1rem,1.3vw,1.18rem)",
              lineHeight: 1.6,
              color: "#44483f",
              maxWidth: "46ch",
              margin: "1.8rem 0 0",
            }}
          >
            Every service we sell is already shipped and live. Grab a card and
            see what you want to build.
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "0.85rem",
              marginTop: "2.2rem",
            }}
          >
            <a
              className="svc-btn"
              href="#svc-contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.9rem",
                fontWeight: 500,
                color: "#1b1c1a",
                background: "rgba(255,255,255,0.7)",
                border: "1px solid #c4c8ba",
                padding: "0.8rem 1.4rem",
                borderRadius: 999,
              }}
            >
              Contact us directly
            </a>
            <a
              className="svc-btn"
              href="#svc-build"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.9rem",
                fontWeight: 600,
                color: "#faf9f5",
                background: "#11224d",
                padding: "0.8rem 1.6rem",
                borderRadius: 999,
                boxShadow: "0 16px 34px -16px rgba(17,34,77,0.85)",
              }}
            >
              Start a build <span>&rarr;</span>
            </a>
          </div>
          <div
            className="svc-scroll-cue"
            style={{ marginTop: "clamp(1.4rem,3vh,2.2rem)" }}
          >
            <svg width="18" height="28" viewBox="0 0 18 28" fill="none" aria-hidden="true">
              <line x1="9" y1="1" x2="9" y2="23" stroke="#44483f" strokeWidth="1" />
              <polyline points="3,17 9,23 15,17" stroke="#44483f" strokeWidth="1" fill="none" />
            </svg>
          </div>

          <HeroCards heroId="svc-top" />

          {/* fade the card stack out into the cream page */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: 190,
              background:
                "linear-gradient(to bottom, rgba(250,249,245,0) 0%, rgba(250,249,245,0.85) 62%, #faf9f5 100%)",
              zIndex: 3,
              pointerEvents: "none",
            }}
          />
        </section>

        {/* ============ WHAT DO YOU WANT TO BUILD ============ */}
        <section
          id="svc-build"
          className="page-pad"
          style={{
            paddingTop: "clamp(3.5rem,9vh,8rem)",
            paddingBottom: "clamp(1rem,3vh,2rem)",
            background: "transparent",
            textAlign: "center",
          }}
        >
          <Reveal>
            <p
              style={{
                fontSize: "0.6875rem",
                fontWeight: 500,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#8c9080",
                margin: "0 0 1.2rem",
              }}
            >
              Four things we build
            </p>
          </Reveal>
          <Reveal>
            <h2
              style={{
                fontFamily: "var(--font-newsreader), serif",
                fontWeight: 400,
                fontSize: "clamp(2rem,4.4vw,3.4rem)",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                margin: "0 auto",
                maxWidth: "18ch",
              }}
            >
              What do you want to build?
            </h2>
          </Reveal>
          <Reveal>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "0.75rem",
                marginTop: "2.2rem",
              }}
            >
              {chips.map((c) => (
                <a
                  key={c.href}
                  className="svc-chip"
                  href={c.href}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.7rem 1.15rem",
                    borderRadius: 999,
                    border: `1px solid ${c.border}`,
                    background: c.bg,
                    color: c.color,
                    fontSize: "0.85rem",
                    fontWeight: 500,
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: c.dot,
                    }}
                  />
                  {c.label}
                </a>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ============ 01 · DYNAMIC WEBSITES ============ */}
        <section
          id="svc-web"
          data-accent="45,108,255"
          data-theme="cream"
          style={cardSection}
        >
          <Reveal>
            <div
              style={{
                maxWidth: 1200,
                margin: "0 auto",
                background: "#edf1fb",
                borderRadius: 28,
                padding: "clamp(1.75rem,4vw,3.5rem)",
                boxShadow: "0 30px 70px -40px rgba(45,108,255,0.35)",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
                gap: "clamp(2rem,4vw,4rem)",
                alignItems: "center",
              }}
            >
              <div>
                <span
                  style={{
                    ...badge,
                    color: "#2d6cff",
                    background: "rgba(45,108,255,0.12)",
                  }}
                >
                  01 &middot; Dynamic Websites
                </span>
                <h3 style={cardHeading}>
                  Sites people can&rsquo;t stop{" "}
                  <span style={{ fontStyle: "italic", color: "#2d6cff" }}>
                    touching.
                  </span>
                </h3>
                <p
                  style={{
                    fontSize: "1rem",
                    lineHeight: 1.65,
                    color: "#3d4b66",
                    maxWidth: "44ch",
                    margin: "1.2rem 0 0",
                  }}
                >
                  3D, cursor-reactive, scroll-driven — WebGL tuned to run
                  smoothly on real phones. The kind of site that gets
                  screenshotted and sent to a friend. Proof? You&rsquo;re on one.
                </p>
                <div style={chipRow}>
                  {["Three.js", "React Three Fiber", "WebGL", "Framer Motion"].map(
                    (t) => (
                      <TechChip key={t} border="rgba(45,108,255,0.28)" color="#2d5fd8">
                        {t}
                      </TechChip>
                    ),
                  )}
                </div>
                <div style={ctaRow}>
                  <a
                    className="svc-btn"
                    href="#svc-contact"
                    style={{
                      ...startBuild,
                      background: "#11224d",
                      boxShadow: "0 12px 28px -14px rgba(17,34,77,0.8)",
                    }}
                  >
                    Start a build <span>&rarr;</span>
                  </a>
                  <a className="svc-seclink" href="#svc-top" style={{ ...secLink, color: "#2d6cff" }}>
                    See our own site &rarr;
                  </a>
                </div>
              </div>
              <div style={{ position: "relative", minHeight: 280 }}>
                <div
                  style={{
                    position: "absolute",
                    left: "8%",
                    top: "6%",
                    width: "66%",
                    transform: "rotate(-4deg)",
                    borderRadius: 12,
                    overflow: "hidden",
                    boxShadow: "0 30px 60px -30px rgba(27,28,26,0.4)",
                    border: "1px solid rgba(255,255,255,0.8)",
                  }}
                >
                  <Image
                    src="/proj-lalo.png"
                    alt="Lalo — language-learning web app"
                    width={1058}
                    height={936}
                    sizes={CASE_SIZES}
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                </div>
                <div
                  style={{
                    position: "absolute",
                    right: "4%",
                    bottom: "2%",
                    width: "70%",
                    transform: "rotate(3deg)",
                    borderRadius: 12,
                    overflow: "hidden",
                    boxShadow: "0 40px 80px -34px rgba(27,28,26,0.55)",
                    border: "1px solid rgba(255,255,255,0.9)",
                  }}
                >
                  <Image
                    src="/proj-marina.png"
                    alt="Marina San Carlos — full-service marina website"
                    width={1282}
                    height={909}
                    sizes={CASE_SIZES}
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ============ 02 · FULL-STACK APPS ============ */}
        <section
          id="svc-fullstack"
          data-accent="34,197,94"
          data-theme="cream"
          style={cardSection}
        >
          <Reveal>
            <FullStackCard />
          </Reveal>
        </section>

        {/* ============ 03 · MARKET SIMULATIONS ============ */}
        <section
          id="svc-ai"
          data-accent="181,101,240"
          data-theme="dark"
          style={cardSection}
        >
          <Reveal>
            <MarketSimCard />
          </Reveal>
        </section>

        {/* ============ 04 · AUTOMATION & AI INTEGRATION ============ */}
        <section
          id="svc-auto"
          data-accent="239,131,84"
          data-theme="cream"
          style={{ ...cardSection, paddingBottom: "clamp(3rem,6vh,5rem)" }}
        >
          <Reveal>
            <div
              style={{
                maxWidth: 1200,
                margin: "0 auto",
                background: "#fbefe4",
                borderRadius: 28,
                padding: "clamp(1.75rem,4vw,3.5rem)",
                boxShadow: "0 30px 70px -40px rgba(207,99,41,0.32)",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
                gap: "clamp(2rem,4vw,4rem)",
                alignItems: "center",
              }}
            >
              <div>
                <span
                  style={{
                    ...badge,
                    color: "#c05a24",
                    background: "rgba(239,131,84,0.16)",
                  }}
                >
                  04 &middot; Automation &amp; AI Integration
                </span>
                <h3 style={cardHeading}>
                  It runs while we sleep —{" "}
                  <span style={{ fontStyle: "italic", color: "#cf6329" }}>
                    and thinks while it runs.
                  </span>
                </h3>
                <p
                  style={{
                    fontSize: "1rem",
                    lineHeight: 1.65,
                    color: "#5a4536",
                    maxWidth: "46ch",
                    margin: "1.2rem 0 0",
                  }}
                >
                  <strong style={{ fontWeight: 600, color: "#1b1c1a" }}>
                    Meetball
                  </strong>{" "}
                  — six hand-coded email workflows and Make.com pipelines routing
                  live webhooks through conditional logic and de-duplication into
                  Resend, shipped for Web Summit Lisbon. When a workflow needs
                  judgment, we wire in LLM copilots and multi-agent systems — our{" "}
                  <strong style={{ fontWeight: 600, color: "#1b1c1a" }}>
                    OpenClaw
                  </strong>{" "}
                  framework — that decide, draft, and act. Cost-aware by design.
                </p>
                <div style={chipRow}>
                  {["Make.com", "n8n", "Resend", "OpenRouter", "Multi-agent"].map(
                    (t) => (
                      <TechChip key={t} border="rgba(207,99,41,0.3)" color="#a8501f">
                        {t}
                      </TechChip>
                    ),
                  )}
                </div>
                <div style={ctaRow}>
                  <a
                    className="svc-btn"
                    href="#svc-contact"
                    style={{
                      ...startBuild,
                      background: "#7a3b17",
                      boxShadow: "0 12px 28px -14px rgba(122,59,23,0.8)",
                    }}
                  >
                    Start a build <span>&rarr;</span>
                  </a>
                  <a
                    className="svc-seclink"
                    href="https://meetball.fun"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ ...secLink, color: "#cf6329" }}
                  >
                    View Meetball &rarr;
                  </a>
                </div>
              </div>
              <Pipeline />
            </div>
          </Reveal>
        </section>

        {/* ============ MELT TO DARK ============ */}
        <div
          id="svc-darkzone"
          aria-hidden
          style={{
            height: 300,
            background:
              "linear-gradient(to bottom, rgba(250,249,245,1) 0%, rgba(250,249,245,0.92) 22%, rgba(120,110,120,0.06) 50%, rgba(8,10,16,0.78) 80%, #080a10 100%)",
          }}
        />

        {/* ============ HOW WE WORK ============ */}
        <section
          data-accent="45,108,255"
          data-theme="dark"
          className="page-pad"
          aria-label="How we work"
          style={{
            position: "relative",
            background: "#080a10",
            color: "#f3f1ec",
            paddingTop: "clamp(3rem,9vh,7rem)",
            paddingBottom: "clamp(3rem,9vh,7rem)",
          }}
        >
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <Reveal>
              <p
                style={{
                  fontSize: "0.6875rem",
                  fontWeight: 500,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "#6fa0ff",
                  margin: "0 0 1.6rem",
                }}
              >
                How we work
              </p>
            </Reveal>
            <Reveal>
              <h2
                style={{
                  fontFamily: "var(--font-newsreader), serif",
                  fontWeight: 400,
                  fontSize: "clamp(2rem,5vw,4rem)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.05,
                  margin: 0,
                  maxWidth: "18ch",
                }}
              >
                You&rsquo;ll have a working link{" "}
                <span style={{ fontStyle: "italic" }}>
                  before you have a quote.
                </span>
              </h2>
            </Reveal>
            <Reveal>
              <WeekStrip />
            </Reveal>
            <Reveal>
              <p
                style={{
                  fontSize: "1.05rem",
                  lineHeight: 1.65,
                  color: "#9aa4b6",
                  maxWidth: "52ch",
                  margin: "2rem 0 0",
                }}
              >
                Brief on Monday. Scoped by Tuesday. Building by Wednesday. Live by
                the weekend. We move in days because we build with AI as a
                co-architect — not as a party trick.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ============ CONTACT ============ */}
        <section
          id="svc-contact"
          data-accent="45,108,255"
          data-theme="dark"
          className="page-pad"
          aria-label="Contact"
          style={{
            position: "relative",
            background: "#080a10",
            color: "#f3f1ec",
            paddingTop: "clamp(4rem,11vh,9rem)",
            paddingBottom: "4rem",
            overflow: "hidden",
            borderTop: "1px solid #232a38",
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              left: "50%",
              top: "36%",
              transform: "translate(-50%,-50%)",
              fontFamily: "var(--font-pirata), serif",
              fontSize: "clamp(6rem,26vw,22rem)",
              lineHeight: 0.8,
              color: "rgba(255,255,255,0.028)",
              whiteSpace: "nowrap",
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            PERMANENCE
          </div>
          <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto" }}>
            <a
              href="mailto:scaleformoffice@gmail.com"
              style={{
                display: "inline-block",
                fontFamily: "var(--font-newsreader), serif",
                fontWeight: 400,
                fontSize: "clamp(2.8rem,9vw,7rem)",
                letterSpacing: "-0.02em",
                lineHeight: 1,
                color: "#fff",
              }}
            >
              Let&rsquo;s talk <span style={{ color: "#6fa0ff" }}>&rarr;</span>
            </a>
            <p
              style={{
                fontSize: "1.05rem",
                lineHeight: 1.6,
                color: "#9aa4b6",
                maxWidth: "40ch",
                margin: "2rem 0 0",
              }}
            >
              Every project on this site is shipped, live, and built by us. No
              mock-ups. No hypotheticals. Tell us what you&rsquo;re trying to
              build.
            </p>
            <hr
              style={{
                border: "none",
                borderTop: "1px solid #232a38",
                margin: "clamp(3rem,7vh,5rem) 0 2rem",
              }}
            />
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "flex-end",
                justifyContent: "space-between",
                gap: "1.5rem",
              }}
            >
              <div>
                <div style={{ fontWeight: 600, letterSpacing: "0.04em", color: "#f3f1ec" }}>
                  SCALIA STUDIO
                </div>
                <div style={{ display: "flex", gap: "1.5rem", marginTop: "0.7rem" }}>
                  <a
                    href="mailto:scaleformoffice@gmail.com"
                    style={{
                      fontSize: "0.6875rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#9aa4b6",
                    }}
                  >
                    Email
                  </a>
                  <a
                    href="https://www.linkedin.com/company/scaleform-o%C3%BC/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: "0.6875rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#9aa4b6",
                    }}
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
              <p
                style={{
                  fontSize: "0.6875rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#6b7688",
                  margin: 0,
                }}
              >
                © 2026 Scalia Studio — Built for permanence
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
