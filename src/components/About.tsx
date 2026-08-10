import Image from "next/image";

const values = [
  {
    title: "Innovation",
    copy: "Advancing aerospace and energy systems with modern engineering workflows and applied R&D.",
  },
  {
    title: "Collaboration",
    copy: "Partnering across Malaysia, France, and strategic alliances to deliver multi-disciplinary solutions.",
  },
  {
    title: "Visibility",
    copy: "Clear programme status, documentation, and operational transparency for every development milestone.",
  },
];

export function About() {
  return (
    <section id="about" className="bg-mist py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[5/4] overflow-hidden rounded-sm">
          <Image
            src="/images/about-engineering.jpg"
            alt="Engineers collaborating on advanced technology systems"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-navy/40 to-transparent" />
        </div>

        <div>
          <p className="section-eyebrow">About Us</p>
          <h2 className="mt-3 font-[family-name:var(--font-sora)] text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
            Built for aerospace ambition and industrial reliability
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted">
            PJBUMI Technologies Sdn. Bhd. is a wholly-owned subsidiary of PJBumi
            Berhad, focused on unmanned aerial systems, satellite connectivity,
            hydrogen energy, and space research. With offices in Kuala Lumpur,
            Seremban, and Toulouse, we connect regional manufacturing strength
            with European aerospace expertise.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Our programmes include hydrogen-electric UAVs with H3 Dynamics,
            satellite initiatives with the Malaysian Space Agency, and
            commercial pathways across energy, logistics, and defense.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {values.map((item) => (
              <div key={item.title}>
                <h3 className="font-[family-name:var(--font-sora)] text-base font-semibold text-navy">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
