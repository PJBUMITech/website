import Image from "next/image";

const pillars = [
  {
    title: "Drone Tech",
    copy: "Hybrid and hydrogen-electric endurance platforms for industrial, surveillance, and remote missions.",
    image: "/images/drone-regid-flying-v5.jpg",
    alt: "ReGiD Mk-X3 hydrogen-powered endurance drone flying outdoors",
  },
  {
    title: "Space Tech",
    copy: "Communications satellites and microgravity research platforms enabling connectivity without borders.",
    image: "/images/satellite-constellation-hq-v3-stars.jpg",
    alt: "Satellite constellation network orbiting Earth",
  },
  {
    title: "H2 Tech",
    copy: "A decade of R&D in hydrogen storage and on-demand generation powering next-generation systems.",
    image: "/images/hydrogen-genset-hero.png",
    alt: "PJBUMI Tech hydrogen genset power system",
  },
];

export function Capabilities() {
  return (
    <section id="capabilities" className="bg-mist py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="section-eyebrow">Our Focus</p>
          <h2 className="mt-3 font-[family-name:var(--font-sora)] text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
            Three domains. One engineering standard.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            From Malaysia to Toulouse, we design and commercialize advanced
            systems at the intersection of aerospace, energy, and digital
            operations.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {pillars.map((item) => (
            <article
              key={item.title}
              className="group relative min-h-[22rem] overflow-hidden rounded-sm"
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/55 to-navy/15" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                <h3 className="font-[family-name:var(--font-sora)] text-xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/75">
                  {item.copy}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
