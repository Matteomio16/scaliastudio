import Image from "next/image";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";

const founders = [
  {
    name: "Matteo Mio",
    photo: "/1774863493730.png",
    role: "Co-founder, full-stack developer & AI integration strategist. Built LeSpot (in collaboration with Open Data University and Ministère de la Culture) and Student Life Tracker end-to-end. Shipped email automation infrastructure for Meetball. BA Economics & Politics at LSE — First Class Honours, first year. BabyVC Spring 2026 Fellow. AWS Prompt Engineering certified. Based in Geneva and Paris.",
    linkedin: "https://www.linkedin.com/in/matteomio/",
  },
  {
    name: "Max Hengl",
    photo: "/1759707821836.jpg",
    role: "Co-founder & AI integration strategist. Focused on how AI systems create real business value — from automation architecture to go-to-market. Former marketing agency founder with hands-on experience in web development and client acquisition. Incoming AI Integration Consulting at Accenture. BA Politics & Economics at LSE. Based in Vienna & Paris.",
    linkedin: "https://www.linkedin.com/in/max-hengl-590a72246/",
  },
];

export default function About() {
  return (
    <section className="page-pad py-24" id="about" aria-label="About Scaleform">
      <div className="grid md:grid-cols-2 gap-16">
        <Reveal>
          <span className="label-sm text-accent-blue-glow block mb-6">
            Our Story
          </span>
          <div className="body-lg space-y-4 max-w-md text-dark-on-variant">
            <p>
              Two Forward College &amp; LSE students, united by a frustration
              with the gap between what AI can do and what most organisations
              are actually shipping.
            </p>
            <p>
              Scaleform is our answer: a working studio where we build real
              products and design AI integration strategies — using LLMs not
              just as tools but as co-architects. From idea to live product in
              days, not months.
            </p>
            <p className="text-dark-on">
              Every project on this site is shipped, live, and built by us. No
              mock-ups. No hypotheticals.
            </p>
          </div>
        </Reveal>

        <div className="space-y-6">
          {founders.map((f) => (
            <Reveal key={f.name}>
              <TiltCard
                max={5}
                className="rounded-2xl bg-dark-surface border border-dark-outline p-5 flex gap-5"
              >
                <div className="w-20 h-20 shrink-0 rounded-full overflow-hidden grayscale">
                  <Image
                    src={f.photo}
                    alt={f.name}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="headline-lg text-white">{f.name}</h3>
                  <p className="body-lg text-dark-on-variant mt-1 text-[0.95rem]">
                    {f.role}
                  </p>
                  <div className="flex gap-6 mt-3">
                    <a
                      className="label-sm text-accent-blue-glow hover:underline"
                      href={f.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
