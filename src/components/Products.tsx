import { SiteImage as Image } from "@/components/SiteImage";

const products = [
  {
    tag: "Drones",
    title: "Advanced Long-range Endurance Drones",
    body: "Powered by hybrid battery and hydrogen-electric systems for hours of uninterrupted operation. Built for industrial monitoring, surveillance, and remote logistics.",
    image: "/images/drone-regid-flying-v5.jpg",
    alt: "ReGiD Mk-X3 hydrogen-powered long-range endurance drone flying outdoors",
    fit: "cover" as const,
    overlay: false,
    points: [
      "Hybrid / hydrogen-electric propulsion",
      "Industrial & remote monitoring ready",
      "Partnership with H3 Dynamics (France)",
    ],
  },
  {
    tag: "Satellites",
    title: "Advanced Communications Satellites",
    body: "IoT connectivity anywhere, everywhere—supporting energy, logistics, agriculture, and defense with reliable coverage in remote locations.",
    image: "/images/satellite-tech.jpg",
    alt: "Orbital satellite communications imagery",
    fit: "cover" as const,
    overlay: true,
    points: [
      "Seamless remote IoT connectivity",
      "Cube satellite development",
      "Cross-industry mission support",
    ],
  },
  {
    tag: "Space Research",
    title: "MERCAP: Microgravity Experiment Capsule",
    body: "Showcasing MERCAP by Independence-X Aerospace—a capsule built for biotech and pharmaceutical experiments in Low Earth Orbit.",
    image: "/images/mercap-brochure-hq.jpg",
    alt: "MERCAP microgravity experiment re-entry capsule brochure",
    fit: "contain" as const,
    overlay: false,
    points: [
      "4–14 day LEO missions",
      "Hydrogen fuel cell power",
      "Real-time telemetry & safe re-entry",
    ],
  },
];

export function Products() {
  return (
    <section id="products" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="section-eyebrow">Our Products</p>
            <h2 className="mt-3 font-[family-name:var(--font-sora)] text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
              Technology that extends reach and endurance
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted sm:text-right">
            Solutions engineered for real-world operations across aerospace,
            energy, and scientific research.
          </p>
        </div>

        <div className="mt-14 space-y-16 sm:space-y-24">
          {products.map((product, index) => {
            const reverse = index % 2 === 1;
            const isContain = product.fit === "contain";
            return (
              <article
                key={product.title}
                className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-14 ${
                  reverse ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div
                  className={`relative overflow-hidden rounded-sm ${
                    isContain
                      ? "aspect-[3/4] bg-navy shadow-[0_20px_50px_rgba(11,22,40,0.18)] sm:aspect-[3/4]"
                      : "aspect-[16/11]"
                  }`}
                >
                  <Image
                    src={product.image}
                    alt={product.alt}
                    fill
                    className={
                      isContain ? "object-contain p-3 sm:p-4" : "object-cover"
                    }
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    quality={90}
                  />
                  {!isContain && product.overlay && (
                    <div className="absolute inset-0 bg-gradient-to-tr from-navy/35 to-transparent" />
                  )}
                </div>
                <div>
                  <p className="section-eyebrow">{product.tag}</p>
                  <h3 className="mt-3 font-[family-name:var(--font-sora)] text-2xl font-semibold tracking-tight text-navy sm:text-3xl">
                    {product.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-muted">
                    {product.body}
                  </p>
                  <ul className="mt-6 space-y-2.5">
                    {product.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-3 text-sm text-navy/85"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
