"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#capabilities", label: "Capabilities" },
  { href: "#products", label: "Products" },
  { href: "#news", label: "News" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/10 bg-navy/90 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:h-20 sm:px-8">
        <a
          href="#top"
          aria-label="PJBUMI Tech home"
          className="group flex items-baseline gap-0.5"
        >
          <span className="font-[family-name:var(--font-sora)] text-xl font-semibold tracking-tight text-brand sm:text-2xl">
            PJBUMI
          </span>
          <span className="font-[family-name:var(--font-sora)] text-xl font-semibold tracking-tight text-white sm:text-2xl">
            Tech
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[0.78rem] font-medium uppercase tracking-[0.16em] text-white/70 transition hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-sm bg-brand px-4 py-2.5 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-brand-hover"
          >
            Partner With Us
          </a>
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-white/20 text-white lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <div className="flex w-5 flex-col gap-1.5">
            <span
              className={`h-0.5 w-full bg-white transition ${open ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`h-0.5 w-full bg-white transition ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`h-0.5 w-full bg-white transition ${open ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </div>
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-navy/95 px-5 py-6 backdrop-blur-xl lg:hidden">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium uppercase tracking-[0.14em] text-white/80"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="mt-2 inline-flex w-fit rounded-sm bg-brand px-4 py-2.5 text-sm font-semibold uppercase tracking-[0.14em] text-white"
              onClick={() => setOpen(false)}
            >
              Partner With Us
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
