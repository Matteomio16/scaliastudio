import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import StudioIntro from "@/components/StudioIntro";
import Toolkit from "@/components/Toolkit";
import Projects from "@/components/Projects";
import Manifesto from "@/components/Manifesto";
import About from "@/components/About";
import TechMarquee from "@/components/TechMarquee";
import Footer from "@/components/Footer";
import FlowingBackdrop from "@/components/FlowingBackdrop";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />

        {/* Dark futuristic zone — everything below the hero */}
        <div
          className="relative overflow-hidden isolate"
          style={{ background: "var(--dark-bg)", color: "var(--dark-on)" }}
        >
          <FlowingBackdrop />

          {/* wide, eased cream -> dark melt (no hard seam).
              Holds full cream for the first ~9% so the seam with the hero canvas
              is pure cream-on-cream, then a smoothstep falloff to transparent. */}
          <div
            className="absolute top-0 left-0 right-0 z-[1] pointer-events-none"
            style={{
              height: 560,
              background: `linear-gradient(to bottom,
                var(--surface) 0%,
                var(--surface) 9%,
                rgba(250,249,245,0.975) 17%,
                rgba(250,249,245,0.93) 25%,
                rgba(250,249,245,0.855) 33%,
                rgba(250,249,245,0.75) 41%,
                rgba(250,249,245,0.62) 49%,
                rgba(250,249,245,0.475) 57%,
                rgba(250,249,245,0.33) 65%,
                rgba(250,249,245,0.20) 73%,
                rgba(250,249,245,0.10) 82%,
                rgba(250,249,245,0.035) 91%,
                transparent 100%)`,
            }}
          />

          <div className="relative z-10">
            <StudioIntro />
            <Toolkit />
            <Projects />
            <Manifesto />
            <About />
            <TechMarquee />
            <Footer />
          </div>
        </div>
      </main>
    </>
  );
}
