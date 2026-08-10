import { asset } from "@/lib/asset";

export type NewsItem = {
  date: string;
  source: string;
  title: string;
  summary: string;
  href: string;
  tag: string;
};

export const newsItems: NewsItem[] = [
  {
    date: "2026-07-28",
    source: "DagangNews",
    tag: "Expansion",
    title:
      "PJBumi tembusi pasaran Eropah melalui anak syarikat baharu di Perancis",
    summary:
      "PJBumi Technologies menubuhkan PJBUMI Technologies SAS di Perancis sebagai platform bagi UAV hibrid, tenaga boleh baharu, dan teknologi kejuruteraan angkasa.",
    href: "https://www.dagangnews.com/article/terkini/pjbumi-tembusi-pasaran-eropah-melalui-anak-syarikat-baharu-di-perancis-72185",
  },
  {
    date: "2026-07-28",
    source: "MarketScreener",
    tag: "Corporate",
    title:
      "PJBumi Berhad incorporates wholly-owned French subsidiary, PJBUMI Technologies SAS",
    summary:
      "Bursa announcement confirming the Toulouse entity for hybrid UAV systems, hydrogen fuel cells, solar technology, and space engineering R&D.",
    href: "https://ae.marketscreener.com/news/pjbumi-berhad-incorporates-indirect-wholly-owned-subsidiary-in-france-ce7f51d2db80f523",
  },
  {
    date: "2025-06-30",
    source: "H3 Dynamics / Aviation Week",
    tag: "Partnership",
    title:
      "H3 Dynamics and PJBumi Technologies team on hydrogen-electric cargo UAV",
    summary:
      "Strategic partnership formalised at the 2025 Paris Air Show to produce and commercialise long-endurance hydrogen-electric UAS for Southeast Asia.",
    href: "https://www.h3dynamics.com/news/news/h3-dynamics-and-pjbumi-team-on-hydrogen-electric-uav",
  },
  {
    date: "2025-04-15",
    source: "Bursa Malaysia / PJBumi Berhad",
    tag: "Collaboration",
    title:
      "Collaboration agreement with Izmir Technology Industries (Independence-X Aerospace)",
    summary:
      "PJBUMITECH partners with IZMIRTECH on UAVs, drones, hydrogen power systems, and small satellite launch vehicle equipment across Malaysia and Indonesia.",
    href: "https://www.pjbumi.com.my/bursa-announcement/pjbumi-berhad-pjbumi-or-the-company-re-collaboration-agreement-entered-between-izmir-technology-industries-sdn-bhd-izmirtech-and-pjbumi-technologies-sdn-bhd-formerly-known-as-kem/",
  },
];

function formatDisplayDate(iso: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${iso}T12:00:00`));
}

export function News() {
  const [featured, ...rest] = newsItems;

  return (
    <section id="news" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="section-eyebrow">News & Updates</p>
            <h2 className="mt-3 font-[family-name:var(--font-sora)] text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
              Latest developments from PJBUMI Tech
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted sm:text-right">
            Coverage of expansion, partnerships, and engineering milestones
            across aerospace and energy programmes.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <a
            href={featured.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex min-h-[22rem] flex-col justify-end overflow-hidden rounded-sm bg-navy p-7 sm:p-9"
          >
            <div
              className="absolute inset-0 bg-cover bg-center opacity-45 transition duration-700 group-hover:scale-105 group-hover:opacity-55"
              style={{ backgroundImage: `url(${asset("/images/contact-bg.jpg")})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/20" />
            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.14em]">
                <span className="text-brand">{featured.tag}</span>
                <span className="text-white/40">·</span>
                <span className="text-white/55">{featured.source}</span>
                <span className="text-white/40">·</span>
                <time className="text-white/55" dateTime={featured.date}>
                  {formatDisplayDate(featured.date)}
                </time>
              </div>
              <h3 className="mt-4 font-[family-name:var(--font-sora)] text-2xl font-semibold leading-snug text-white sm:text-3xl">
                {featured.title}
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
                {featured.summary}
              </p>
              <span className="mt-6 inline-flex text-sm font-semibold uppercase tracking-[0.12em] text-white transition group-hover:text-brand">
                Read article →
              </span>
            </div>
          </a>

          <div className="flex flex-col divide-y divide-navy/10 border-y border-navy/10">
            {rest.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group py-5 transition first:pt-0 last:pb-0 hover:bg-mist/60 sm:px-4"
              >
                <div className="flex flex-wrap items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em]">
                  <span className="text-brand">{item.tag}</span>
                  <span className="text-muted/50">·</span>
                  <span className="text-muted">{item.source}</span>
                  <span className="text-muted/50">·</span>
                  <time className="text-muted" dateTime={item.date}>
                    {formatDisplayDate(item.date)}
                  </time>
                </div>
                <h3 className="mt-2 font-[family-name:var(--font-sora)] text-base font-semibold leading-snug text-navy transition group-hover:text-brand sm:text-lg">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.summary}
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
