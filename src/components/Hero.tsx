import { SiteImage as Image } from "@/components/SiteImage";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-navy pb-20 pt-28 sm:items-center sm:pb-24 sm:pt-24"
    >
      <Image
        src="/images/hero-earth.jpg"
        alt="Earth from orbit representing PJBUMI Tech aerospace and satellite programmes"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-navy/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-transparent to-navy/35" />
      <div className="absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-brand/15 blur-3xl animate-pulse-soft" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <h1 className="sr-only">
            PJBUMI Tech — aerospace, drone, satellite and hydrogen technology
          </h1>
          <p className="animate-fade-up">
            <Image
              src="/images/idxa-logo.png"
              alt="Independence-X Aerospace, partner of PJBUMI Tech"
              width={827}
              height={125}
              priority
              className="h-auto w-[min(100%,28rem)] sm:w-[min(100%,34rem)]"
            />
          </p>
          <p className="animate-fade-up-delay-1 mt-6 max-w-xl text-lg leading-relaxed text-white/78 sm:text-xl">
            Integrating expertise across multi-disciplinary engineering and
            cutting-edge technology—with hydrogen systems that power next-generation
            aerospace, energy, and endurance platforms.
          </p>
          <div className="animate-fade-up-delay-2 mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#products"
              className="rounded-sm bg-brand px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-brand-hover"
            >
              Explore Capabilities
            </a>
            <a
              href="#news"
              className="rounded-sm border border-white/35 bg-white/5 px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:border-white/60 hover:bg-white/10"
            >
              Latest News
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
