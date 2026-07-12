const items = [
  "GEMINI AI", "MAKE.COM", "N8N", "RESEND", "AWS", "REACT",
  "SUPABASE", "TYPESCRIPT", "VERCEL", "CLOUDFLARE", "PYTHON",
  "POSTGRESQL", "CLAUDE",
];

export default function TechMarquee() {
  const track = [...items, ...items];
  return (
    <section
      className="py-10 border-y border-dark-outline overflow-hidden"
      aria-label="Technology stack"
    >
      <div className="[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex gap-4 w-max motion-safe:animate-[marquee_28s_linear_infinite] hover:[animation-play-state:paused]">
          {track.map((item, i) => (
            <span
              key={i}
              aria-hidden={i >= items.length}
              className="label-sm text-dark-on-variant whitespace-nowrap"
            >
              {item}
              <span className="mx-4 text-accent-blue/60">&middot;</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
