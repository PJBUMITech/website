const subsidiaries = [
  "PJBUMI Heavy Engineering & Services",
  "PJBUMI Digital",
  "PJBUMI Technologies",
  "PJBUMI Enviro",
  "PT Petra Jaya Bumi",
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <a href="#top" className="inline-flex items-baseline">
            <span className="font-[family-name:var(--font-sora)] text-xl font-semibold text-brand">
              PJBUMI
            </span>
            <span className="font-[family-name:var(--font-sora)] text-xl font-semibold text-white">
              Tech
            </span>
          </a>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
            A subsidiary of PJBumi Berhad delivering aerospace, hydrogen, and
            advanced engineering solutions across Asia and Europe.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/40">
            Navigate
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-white/70">
            <li>
              <a href="#capabilities" className="hover:text-white">
                Capabilities
              </a>
            </li>
            <li>
              <a href="#products" className="hover:text-white">
                Products
              </a>
            </li>
            <li>
              <a href="#news" className="hover:text-white">
                News
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/40">
            Group Subsidiaries
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-white/70">
            {subsidiaries.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} PJBUMI Technologies Sdn. Bhd.</p>
          <p>Subsidiary of PJBumi Berhad</p>
        </div>
      </div>
    </footer>
  );
}
