import Image from "next/image";
import Reveal from "./Reveal";

const tools = [
  { name: "Python", cat: "Programming", logo: "/Python-logo-notext.svg.png" },
  { name: "Claude", cat: "AI Assistant", logo: "/original-claude_logo-large-1761059695607.webp" },
  { name: "HTML", cat: "Markup", logo: "/HTML5_logo_and_wordmark.svg.png" },
  { name: "Make.com", cat: "Automation", logo: "/make-color.png" },
  { name: "Docker", cat: "Containers", logo: "/docker-icon.BfVtTavh.png" },
  { name: "CSS", cat: "Styling", logo: "/CSS3_logo_and_wordmark.svg.png" },
  { name: "MiroFish", cat: "Swarm Intelligence", logo: "/mirofish_logo.png" },
  { name: "C++", cat: "Programming", logo: "/C++-Logo.wine.png" },
  { name: "n8n", cat: "Automation", logo: "/N8n-logo-new.svg.png" },
  { name: "Lovable", cat: "AI App Builder", logo: "/lovable-color.png" },
  { name: "Git Bash", cat: "Version Control", logo: "/Git_Bash_Logo.png" },
  { name: "OpenClaw", cat: "Agent Framework", logo: "/openclaw.png" },
];

export default function Toolkit() {
  const track = [...tools, ...tools];
  return (
    <section className="pt-24 pb-16 overflow-hidden" aria-label="Our Toolkit">
      <Reveal className="page-pad mb-8">
        <span className="label-sm text-accent-blue-glow">Our Toolkit</span>
      </Reveal>
      <div className="[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex gap-5 w-max motion-safe:animate-[toolkit-scroll_38s_linear_infinite] hover:[animation-play-state:paused]">
          {track.map((t, i) => (
            <div
              key={i}
              aria-hidden={i >= tools.length}
              className="flex flex-col items-center justify-center gap-2 w-32 h-32 shrink-0 rounded-2xl bg-dark-surface border border-dark-outline hover:border-accent-blue/50 transition-colors"
            >
              <Image
                src={t.logo}
                alt={i < tools.length ? t.name : ""}
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
              <span className="text-sm font-medium text-dark-on">{t.name}</span>
              <span className="label-sm text-dark-on-variant text-[0.6rem]">
                {t.cat}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
