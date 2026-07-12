import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "The Simulation of Democracy — MiroFish Research | SCALEFORM",
  description:
    "45 AI agents, 100 simulation rounds, 1,965 social interactions — a multi-agent AI simulation of Hungary's 2026 parliamentary election with no polling data used as input.",
};

/* ---------- data ---------- */
const stats = [
  { n: "45", l: "AI Agents" },
  { n: "1,965", l: "Agent Interactions" },
  { n: "143M", l: "Tokens Used" },
  { n: "$7.95", l: "Total API Cost" },
  { n: "11", l: "Bias Corrections" },
  { n: "48h", l: "Compute Time" },
];

const PARTY = {
  tisza: "#3b82f6",
  fidesz: "#ef4444",
  dk: "#f59e0b",
  mkkp: "#10b981",
  other: "#8a8f9c",
};

const seatRows = [
  { party: "TISZA", color: PARTY.tisza, smd: 66, list: 35, total: 101, share: "50.8%", majority: true },
  { party: "Fidesz-KDNP", color: PARTY.fidesz, smd: 38, list: 46, total: 84, share: "42.2%" },
  { party: "DK", color: PARTY.dk, smd: 1, list: 6, total: 7, share: "3.5%" },
  { party: "MKKP", color: PARTY.mkkp, smd: 0, list: 5, total: 5, share: "2.5%" },
  { party: "Other", color: PARTY.other, smd: 1, list: 1, total: 2, share: "1.0%" },
];

const sensitivity = [
  {
    label: "Tipping point — TISZA majority",
    val: "λ = 0.57",
    desc: "TISZA gains a majority only when lambda crosses 0.57. At λ = 0.55 they finish at 99 seats — one short.",
  },
  {
    label: "Calibrated estimate",
    val: "λ = 0.58",
    critical: true,
    desc: "TISZA 101 seats. Bare majority, one-seat margin. Fidesz loses their majority once lambda exceeds 0.20.",
  },
  {
    label: "If Fidesz overperforms +2pp",
    val: "95–97",
    desc: "TISZA falls short of a majority. Hung parliament — without precedent in modern Hungary.",
  },
  {
    label: "If TISZA underperforms −2pp",
    val: "Hung",
    desc: "A similar 4–6 seat shift. Hung parliament becomes the central scenario.",
  },
];

/* ---------- small pieces ---------- */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="h-px w-8 bg-accent-blue" />
      <span className="label-sm text-accent-blue-glow">{children}</span>
    </div>
  );
}

export default function HungaryResearch() {
  return (
    <main
      className="relative min-h-screen overflow-hidden"
      style={{ background: "var(--dark-bg)", color: "var(--dark-on)" }}
    >
      {/* ambient depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(60% 40% at 50% -5%, rgba(45,108,255,0.16), transparent 60%), radial-gradient(50% 30% at 90% 20%, rgba(1,105,111,0.14), transparent 60%)",
        }}
      />

      {/* top bar */}
      <header className="relative z-10 h-14 flex items-center justify-between page-pad border-b border-dark-outline backdrop-blur-xl">
        <Link
          href="/"
          className="text-[0.8125rem] text-dark-on-variant hover:text-accent-blue-glow transition-colors"
        >
          ← Back to portfolio
        </Link>
        <span className="label-sm text-dark-on-variant">MiroFish · Research</span>
      </header>

      <div className="relative z-10 page-pad">
        <div className="mx-auto max-w-3xl">
          {/* HERO */}
          <header className="pt-20 md:pt-28 pb-14">
            <Reveal className="flex items-center gap-3 mb-7">
              <Image
                src="/mirofish_logo.png"
                alt="MiroFish"
                width={30}
                height={30}
                className="h-7 w-7 rounded-md object-cover"
              />
              <span className="label-sm text-dark-on-variant">
                MiroFish · Swarm Intelligence Research
              </span>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="display-lg">
                The Simulation of{" "}
                <span className="italic">Democracy</span>
              </h1>
            </Reveal>

            <Reveal delay={0.1} className="flex flex-wrap gap-x-6 gap-y-2 mt-6 label-sm text-dark-on-variant">
              <span>Matteo Mio</span>
              <span>April 2026</span>
              <span>Hungarian Electoral Prediction</span>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="body-lg text-dark-on-variant mt-7 max-w-2xl">
                45 AI agents. 100 simulation rounds. 1,965 discrete social
                interactions. A full multi-agent AI simulation of Hungary&apos;s
                2026 parliamentary election — with no polling data used as input.
                The prediction emerges entirely from collective behaviour.
              </p>
            </Reveal>

            <Reveal delay={0.2} className="flex flex-wrap gap-4 mt-9">
              <a
                href="/simulation-of-democracy.pdf"
                download
                className="inline-flex items-center gap-2 rounded-xl px-5 py-3 bg-accent-blue text-white label-sm hover:brightness-110 transition"
              >
                ↓ Download full paper
              </a>
              <a
                href="#results"
                className="inline-flex items-center gap-2 rounded-xl px-5 py-3 border border-dark-outline text-dark-on label-sm hover:border-accent-blue-glow transition-colors"
              >
                View results →
              </a>
            </Reveal>
          </header>

          {/* STAT STRIP */}
          <Reveal className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-px rounded-2xl overflow-hidden border border-dark-outline bg-dark-outline">
            {stats.map((s) => (
              <div
                key={s.l}
                className="flex flex-col gap-1 p-5 bg-dark-surface"
                style={{ background: "var(--dark-surface)" }}
              >
                <span className="font-newsreader text-2xl md:text-3xl text-accent-blue-glow leading-none">
                  {s.n}
                </span>
                <span className="label-sm text-dark-on-variant">{s.l}</span>
              </div>
            ))}
          </Reveal>

          {/* THE EXPERIMENT */}
          <section className="pt-20">
            <Reveal>
              <SectionLabel>The Experiment</SectionLabel>
              <h2 className="display-md text-white max-w-2xl">
                Polling captures a snapshot. This simulates the process.
              </h2>
            </Reveal>
            <Reveal delay={0.05} className="body-lg text-dark-on-variant space-y-5 mt-7 max-w-2xl">
              <p>
                Standard polls cannot model how a rural pensioner&apos;s vote
                shifts after weeks of state television, or the strategic
                calculation of a DK supporter in a marginal Budapest constituency
                who knows their candidate cannot win. MiroFish addresses this gap
                by instantiating AI-powered agents representing distinct voter
                archetypes, letting them interact, form opinions, and arrive at
                vote intentions through simulated social dynamics — with no
                polling data used as an anchor.
              </p>
              <p>
                Hungary&apos;s April 2026 election is the most competitive since
                2010 — a genuine contest between Fidesz and TISZA (Péter
                Magyar&apos;s party) on a structurally asymmetric field of
                gerrymandered constituencies and state-media dominance. The
                question posed to the simulation:{" "}
                <em className="text-dark-on">
                  &ldquo;How do different voter segments form their final voting
                  decision — and what aggregate outcome does that produce?&rdquo;
                </em>
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <blockquote
                className="mt-8 max-w-2xl rounded-2xl border-l-2 p-6 body-lg italic text-dark-on"
                style={{
                  borderColor: "var(--accent-blue)",
                  background: "rgba(45,108,255,0.07)",
                }}
              >
                &ldquo;The experiment was run by a 21-year-old student with no
                data-science background, in the middle of LSE exam revision, on
                less than $10 in API credits.&rdquo;
              </blockquote>
            </Reveal>
          </section>

          {/* METHODOLOGY */}
          <section className="pt-20">
            <Reveal>
              <SectionLabel>Methodology</SectionLabel>
              <h2 className="display-md text-white">Architecture &amp; stack</h2>
            </Reveal>
            <Reveal delay={0.05} className="body-lg text-dark-on-variant space-y-5 mt-7 max-w-2xl">
              <p>
                The simulation runs on MiroFish — a platform built on CAMEL-AI and
                OASIS for the agent layer, Gemini 2.5 Flash Lite via OpenRouter for
                all reasoning calls, and Neo4j AuraDB as the shared knowledge
                graph. Agents were seeded with six structured documents covering
                the Hungarian electoral system, party platforms, the media
                environment, economic grievances, and demographic profiles — but
                explicitly not with polling results.
              </p>
              <p>
                After the run, InsightForge (MiroFish&apos;s reporting layer)
                produced an initial output. This was followed by a deep-interaction
                phase — structured surveys sent to individual agents to extract
                vote-share estimates by segment. The raw output then passed through{" "}
                <strong className="text-dark-on font-semibold">
                  eleven documented bias corrections
                </strong>{" "}
                under a two-layer epistemic recalibration framework before final
                vote shares were accepted.
              </p>
              <p>
                Constituency-level seat modelling was handled by Chronicler-v2,
                calibrated to a strategic transfer rate (lambda = 0.58) from DK and
                MKKP voters to TISZA in competitive single-member districts.
              </p>
            </Reveal>
          </section>

          {/* RESULTS */}
          <section id="results" className="pt-20 scroll-mt-16">
            <Reveal>
              <SectionLabel>Final Results</SectionLabel>
              <h2 className="display-md text-white">Final 199-seat parliament</h2>
              <p className="body-lg text-dark-on-variant mt-6 max-w-2xl">
                TISZA wins a governing majority by a single seat. Fidesz drops 51
                seats from 2022. The result lands within 1pp of independent polling
                — without having been anchored to it at any point.
              </p>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="mt-8 rounded-2xl border border-dark-outline overflow-hidden">
                <div className="px-5 py-3 label-sm text-dark-on-variant border-b border-dark-outline bg-dark-surface">
                  Seat Projection — 199 Seats
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[420px]">
                    <thead>
                      <tr className="label-sm text-dark-on-variant">
                        <th className="font-medium px-5 py-3">Party</th>
                        <th className="font-medium px-5 py-3 text-right">SMD</th>
                        <th className="font-medium px-5 py-3 text-right">List</th>
                        <th className="font-medium px-5 py-3 text-right">Total</th>
                        <th className="font-medium px-5 py-3 text-right">Share</th>
                      </tr>
                    </thead>
                    <tbody className="body-lg">
                      {seatRows.map((r) => (
                        <tr
                          key={r.party}
                          className="border-t border-dark-outline"
                          style={r.majority ? { background: "rgba(59,130,246,0.08)" } : undefined}
                        >
                          <td className="px-5 py-3">
                            <span className="inline-flex items-center gap-2.5">
                              <span
                                className="h-2.5 w-2.5 rounded-full shrink-0"
                                style={{ background: r.color }}
                              />
                              {r.party}
                            </span>
                          </td>
                          <td className="px-5 py-3 text-right text-dark-on-variant tabular-nums">{r.smd}</td>
                          <td className="px-5 py-3 text-right text-dark-on-variant tabular-nums">{r.list}</td>
                          <td className="px-5 py-3 text-right font-semibold tabular-nums">{r.total}</td>
                          <td className="px-5 py-3 text-right text-dark-on-variant tabular-nums">
                            {r.share}
                            {r.majority && (
                              <span
                                className="ml-2 inline-block rounded px-1.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wide align-middle"
                                style={{ background: "rgba(59,130,246,0.2)", color: "#93b4ff" }}
                              >
                                Majority
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                      <tr className="border-t border-dark-outline label-sm text-dark-on-variant">
                        <td className="px-5 py-3">Total</td>
                        <td className="px-5 py-3 text-right tabular-nums">106</td>
                        <td className="px-5 py-3 text-right tabular-nums">93</td>
                        <td className="px-5 py-3 text-right tabular-nums">199</td>
                        <td className="px-5 py-3 text-right tabular-nums">100%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="body-lg text-dark-on-variant mt-7 max-w-2xl">
                TISZA reaches the bare majority threshold of 100 seats — enough to
                form a government and pass ordinary legislation, but not enough to
                change the constitution (which requires 133). Fidesz remains the
                largest party by vote share at 41.0% but loses their supermajority
                era. TISZA wins 66 SMDs not because it is nationally more popular,
                but because opposition votes consolidate behind a single candidate
                in enough constituencies.
              </p>
            </Reveal>
          </section>

          {/* SENSITIVITY */}
          <section className="pt-20">
            <Reveal>
              <SectionLabel>Sensitivity Analysis</SectionLabel>
              <h2 className="display-md text-white">The decisive variable: lambda</h2>
              <p className="body-lg text-dark-on-variant mt-6 max-w-2xl">
                Lambda (λ) is the strategic transfer rate — the share of DK and
                MKKP voters who tactically back TISZA in competitive single-member
                districts. It is the single variable that most determines the
                outcome.
              </p>
            </Reveal>
            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              {sensitivity.map((c, i) => (
                <Reveal key={c.label} delay={i * 0.05}>
                  <div
                    className="h-full rounded-2xl border p-6"
                    style={{
                      borderColor: c.critical ? "var(--accent-blue)" : "var(--dark-outline)",
                      background: c.critical ? "rgba(45,108,255,0.08)" : "var(--dark-surface)",
                    }}
                  >
                    <div className="label-sm text-dark-on-variant">{c.label}</div>
                    <div className="font-newsreader text-3xl mt-2 text-white">{c.val}</div>
                    <p className="body-lg text-dark-on-variant mt-3 text-[0.95rem]">{c.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* FULL PAPER */}
          <section className="pt-20">
            <Reveal>
              <SectionLabel>Full Paper</SectionLabel>
              <div className="rounded-2xl border border-dark-outline overflow-hidden">
                <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-dark-outline bg-dark-surface">
                  <span className="label-sm text-dark-on">
                    The Simulation of Democracy — Full Research Paper
                  </span>
                  <a
                    href="/simulation-of-democracy.pdf"
                    download
                    className="shrink-0 inline-flex items-center gap-2 rounded-lg px-3 py-2 bg-accent-blue text-white label-sm hover:brightness-110 transition"
                  >
                    ↓ Download PDF
                  </a>
                </div>
                <iframe
                  src="/simulation-of-democracy.pdf"
                  title="The Simulation of Democracy"
                  className="w-full h-[70vh] bg-white"
                />
              </div>
            </Reveal>
          </section>

          {/* FOOTNOTE */}
          <p className="body-lg text-dark-on-variant text-sm py-20 max-w-2xl">
            Research by Matteo Mio · Forward College / University of London (LSE
            programme) · April 2026 · Built with MiroFish, CAMEL-AI, OASIS, Neo4j
            AuraDB, Gemini 2.5 Flash Lite · Total cost: under $9 · Part of the
            SCALEFORM builder-studio research track.
          </p>
        </div>
      </div>
    </main>
  );
}
