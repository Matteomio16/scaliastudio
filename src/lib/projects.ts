export type Project = {
  id: string;
  category: string;
  name: string;
  role: string;
  tagline: string;
  accent: string;
  description?: string[];
  panelHTML?: string;
  outcomes?: string[];
  tech: string;
  link?: string;
  linkText?: string;
  link2?: string;
  link2Text?: string;
  ringImage: string;
  /** Landscape 5:4 case-study image shown on the hero ring card */
  caseImage?: string;
  /** Short name shown in the caption below the ring card */
  ringLabel?: string;
  /** Very short description shown under the ring label */
  ringDesc?: string;
};

export const projects: Record<string, Project> = {
  lespot: {
    id: "lespot",
    category: "AI APP · FULL-STACK",
    name: "LeSpot",
    role: "Matteo Mio — Lead Developer & Product Owner",
    tagline: "Cultural Discovery · Made Easy",
    accent: "#b565f0",
    description: [
      "LeSpot is a free cultural event discovery platform built for international students living in Paris. Faced with a city that hides its best free events behind language barriers and scattered sources, LeSpot curates 1,500+ verified events across all 20 arrondissements — from hidden courtyard concerts to ministerial exhibitions — and matches them to the user's mood in seconds.",
      "Built in collaboration with Open Data University and with support from Ministère de la Culture's open data initiative. The app runs a Gemini AI recommendation engine on a 9-table Supabase backend, with full auth, row-level security, and a 7-step onboarding flow designed to capture cultural preferences on first use.",
    ],
    outcomes: [
      "1,500+ free events curated across all 20 Paris arrondissements",
      "Gemini AI powers mood-based personalised recommendations",
      "Built in collaboration with Open Data University & Ministère de la Culture",
      "7-step onboarding flow with cultural preference capture",
      "Live beta deployed on Vercel — early access waitlist active",
    ],
    tech: "React · TypeScript · Supabase · Gemini AI · Vercel · PostgreSQL",
    link: "https://web-lespot.vercel.app/",
    linkText: "Open live app",
    link2: "https://lespot-paris.netlify.app/",
    link2Text: "Early access landing page",
    ringImage: "/mirofish_logo.png",
    caseImage: "/case-lespot.webp",
    ringLabel: "LeSpot",
    ringDesc: "Cultural discovery app",
  },
  tracker: {
    id: "tracker",
    category: "PRODUCTIVITY · FULL-STACK",
    name: "Student Productivity Tracker",
    role: "Matteo Mio — Lead Developer & Product Designer",
    tagline: "Reliability · Streaks · Wellness",
    accent: "#22c55e",
    description: [
      "Student Productivity Tracker is an academic and wellness management platform designed for the realities of university life. Built after identifying the gap between generic productivity tools (Notion, Todoist) and the specific pressures of being a student — exam deadlines, wellness tracking, session logging, and the psychology of consistency.",
      "The core innovation is a custom 3-axis reliability scoring engine: completion rate (40%), focus quality (40%), and precision (20%) — aggregated over a 10-day rolling window. A Duolingo-style streak system reinforces daily engagement. The codebase runs on 7 custom React hooks, a 9-table Supabase schema with full RLS, and Recharts for data visualisation.",
    ],
    outcomes: [
      "9-table PostgreSQL schema with row-level security in Supabase",
      "Custom 3-axis reliability scoring engine (completion 40% · focus 40% · precision 20%)",
      "Gamified Duolingo-style streak system for daily accountability",
      "4 core modules: Task sessions, Academic scheduling, Wellness tracking, Profile",
      "7 custom React hooks — clean, composable state architecture",
      "Live app deployed on Lovable",
    ],
    tech: "React · TypeScript · Supabase · PostgreSQL · Recharts · Vite",
    link: "https://studentlifetracker.lovable.app/",
    linkText: "Open live app",
    ringImage: "/lovable-color.png",
    caseImage: "/case-tracker.webp",
    ringLabel: "Track.er",
    ringDesc: "Student productivity app",
  },
  meetball: {
    id: "meetball",
    category: "AUTOMATION · EMAIL ENGINEERING",
    name: "Meetball — Email Automation",
    role: "Matteo Mio — Automations & Email Marketing Lead",
    tagline: "Match · Connect · Meet",
    accent: "#ef8354",
    description: [
      "Meetball is a Lisbon-based community startup connecting people at events — Portugal Tech Week, Web Summit, hackathons. The product matches attendees who need help with those who can provide it. Brought in as Automations & Email Marketing Lead to design and ship the full notification system and automated email marketing infrastructure.",
      "Delivered 6 hand-coded HTML/CSS email workflows and multiple Make.com pipelines routing webhook events through conditional logic — Webhooks → Router → filter branches → Resend nodes + Data store deduplication. The full system went live for Web Summit Lisbon, one of Europe's largest tech conferences.",
    ],
    outcomes: [
      "6 production HTML/CSS email workflows — notifications, outreach, re-engagement sequences",
      "Multiple Make.com pipelines: Webhooks → Router → Resend + Data store with deduplication logic",
      "Full system deployed live for Web Summit Lisbon",
      "Event organiser campaign: QR code assets, printable flyers, PPT/PDF display, day-of facilitation script",
      "KPIs defined: 70% helper connection rate · 40% MiniMeet creation rate · 50% re-engagement rate",
    ],
    tech: "Make.com · Resend · Webhooks · HTML Email · CSS · Data Store",
    link: "https://meetball.fun",
    linkText: "View Meetball",
    ringImage: "/make-color.png",
    caseImage: "/case-meetball.webp",
    ringLabel: "Automation",
    ringDesc: "Notification & email systems",
  },
  mirofish: {
    id: "mirofish",
    category: "AI AGENTS · SIMULATION · FORECASTING",
    name: "MiroFish — Swarm Intelligence Engine",
    role: "Matteo Mio — Builder & Researcher",
    tagline: "Swarm Intelligence · Prediction Engine",
    accent: "#2d9cff",
    outcomes: [
      "120 agents with independent personalities per simulation",
      "250+ node Neo4j knowledge graph built from seed documents",
      "5-stage pipeline: Graph Build → Agent Setup → Dual Simulation → Report Generation → Deep Interaction",
      "#1 on GitHub Global Trending — above OpenAI, Google, and Microsoft",
      "Backed by $4.1M from Chen Tianqiao",
    ],
    description: [
      "Multi-agent AI simulation for real-world forecasting, built on MiroFish — an open-source swarm intelligence engine backed by $4.1M from Chen Tianqiao and reaching #1 on GitHub Global Trending above OpenAI, Google, and Microsoft. Rather than statistics, 120 agents with independent personalities simulate social dynamics: posts, debates, coalitions, opinion shifts. Predictions emerge from that collective behaviour.",
      "Use Case 01 — 2026 FIFA World Cup Prediction: across 3 simulation runs, France appeared as finalist every time (with Argentina, Brazil, and Spain each winning once) — closely aligned with prediction market consensus.",
      "Use Case 02 (in research) — 2026 Hungarian Parliamentary Election: Orbán's Fidesz-KDNP vs. Péter Magyar's Tisza, April 12 2026 — described by Politico Europe as \"Europe's most important election of 2026.\" Being enhanced by Brain in the Fish, a Rust-based performance server under development for higher agent counts and faster simulation cycles.",
    ],
    tech: "Python · Neo4j AuraDB · OpenRouter · NVIDIA Nemotron 120B · OASIS",
    link: "/projects/hungary-2026",
    linkText: "Latest research: Hungary 2026 election simulation",
    ringImage: "/mirofish_logo.png",
    caseImage: "/case-mirofish.webp",
    ringLabel: "MiroFish",
    ringDesc: "AI simulation platform",
  },
  openclaw: {
    id: "openclaw",
    category: "AI AGENTS · INFRASTRUCTURE",
    name: "OpenClaw — Multi-Agent Framework",
    role: "Scaleform — Research & Infrastructure",
    tagline: "Use Cases for Personal AI Agent Teams",
    accent: "#01696f",
    description: [
      "OpenClaw is Scaleform's multi-agent AI framework — a blueprint for personal AI agent teams. Rather than a single AI assistant, OpenClaw orchestrates networks of specialised agents into self-running structures that delegate tasks, maintain context, and operate autonomously. The framework is designed to be reproduced and adapted across different use cases.",
      "The infrastructure runs on a remote AWS instance with a REST API layer connecting each agent node. Agents query LLMs via OpenRouter — keeping the stack lean, cost-free, and portable. OpenClaw is the foundation for a growing library of multi-agent use cases, from simulated office infrastructure to outreach automation and rapid research pipelines.",
    ],
    outcomes: [
      "Multi-agentic office infrastructure — CEO delegates to COO, CTO, HR, Research autonomously",
      "Fully integrated outreach team — agents research targets, draft and schedule communications",
      "Idea testing & research frameworks — parallel agent reasoning for faster validation",
      "Remote AWS instance with REST API layer — fully self-hosted and reproducible",
      "OpenRouter integration — free agentic LLMs across all agent nodes",
      "Blueprint for personal AI agent teams at startup and enterprise scale",
    ],
    tech: "Python · AWS · REST API · OpenRouter · Multi-agent orchestration",
    ringImage: "/openclaw.png",
  },
};

export const projectList = Object.values(projects);
