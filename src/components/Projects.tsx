import { SiteImage as Image } from "@/components/SiteImage";
import { ProgressRing } from "./ProgressRing";

export function Projects() {
  return (
    <section id="internal-projects" className="relative overflow-hidden py-20 sm:py-28">
      <Image
        src="/images/contact-bg.jpg"
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
        aria-hidden
      />
      <div className="absolute inset-0 bg-navy/88" />
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="section-eyebrow text-brand">Live Development</p>
          <h2 className="mt-3 font-[family-name:var(--font-sora)] text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Current project status
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/70">
            Engineering progress across active UAV and renewable energy
            programmes—updated for operational visibility.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="glass-panel rounded-2xl p-7 sm:p-9">
            <div className="flex flex-wrap justify-around gap-8">
              <ProgressRing
                value={73}
                label="ReGiD Mk-X3 — Test Flight in Progress"
              />
              <ProgressRing value={56} label="ADiRa — Development Programme" />
            </div>
            <div className="mt-10 grid gap-4 border-t border-white/15 pt-7 sm:grid-cols-3">
              <Stat
                label="Maiden Flight"
                value="30 Jun 2026"
                hint="Target schedule"
              />
              <Stat label="Days Left" value="0" hint="Countdown window" />
              <Stat label="Days Late" value="0" hint="Schedule variance" />
            </div>
          </div>

          <div className="flex flex-col justify-between gap-6 rounded-2xl border border-white/12 bg-white/5 p-7 sm:p-9">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
                Project Updates
              </p>
              <h3 className="mt-3 font-[family-name:var(--font-sora)] text-xl font-semibold text-white">
                ReGiD Mk-X3 — Test Flight in Progress
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/65">
                Hydrogen-electric unmanned systems advancing through flight
                readiness milestones, supported by strategic partnerships in
                Malaysia and France.
              </p>
            </div>
            <div className="space-y-3">
              <UpdateRow title="Propulsion integration" status="Active" />
              <UpdateRow title="Telemetry validation" status="In review" />
              <UpdateRow title="Flight envelope expansion" status="Queued" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div>
      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white/45">
        {label}
      </p>
      <p className="mt-1 font-[family-name:var(--font-sora)] text-xl font-semibold text-white tabular-nums">
        {value}
      </p>
      <p className="mt-1 text-xs text-white/45">{hint}</p>
    </div>
  );
}

function UpdateRow({ title, status }: { title: string; status: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3 last:border-0 last:pb-0">
      <p className="text-sm text-white/80">{title}</p>
      <span className="rounded-sm bg-brand/15 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-brand">
        {status}
      </span>
    </div>
  );
}
