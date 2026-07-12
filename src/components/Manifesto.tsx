import Reveal from "./Reveal";

export default function Manifesto() {
  return (
    <section
      className="page-pad py-32 text-center relative"
      aria-label="Manifesto"
    >
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[280px] rounded-full blur-[110px] opacity-30 -z-10"
        style={{ background: "rgba(45,108,255,0.4)" }}
      />
      <Reveal>
        <blockquote>
          <p className="display-md text-white">
            &ldquo;We don&rsquo;t wait for permission
            <br />
            to build things.&rdquo;
          </p>
          <cite className="label-sm text-accent-blue-glow block mt-6 not-italic">
            &mdash; THE SCALEFORM MANIFESTO
          </cite>
        </blockquote>
      </Reveal>
    </section>
  );
}
