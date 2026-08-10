"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";

const offices = [
  {
    entity: "PJBUMI Technologies Sdn. Bhd.",
    detail: "Company No: 201701036428 (1250599-D)",
    locations: [
      {
        title: "Kuala Lumpur",
        address:
          "Unit 22-1 Level 22, MOF Inc. Tower, Platinum Park, No 9 Persiaran KLCC, 50088 Kuala Lumpur, Malaysia",
      },
      {
        title: "Seremban",
        address:
          "218, Jalan Sendayan Metropark 2/3, Sendayan Metropark, 71950 Seremban, Negeri Sembilan, Malaysia",
      },
    ],
  },
  {
    entity: "PJBUMI Technologies SAS",
    detail: "France subsidiary",
    locations: [
      {
        title: "Toulouse",
        address: "13 Rue Sainte Ursule 31000, Toulouse, France",
      },
    ],
  },
];

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="contact" className="relative overflow-hidden py-20 sm:py-28">
      <Image
        src="/images/contact-bg.jpg"
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
        aria-hidden
      />
      <div className="absolute inset-0 bg-navy/90" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="section-eyebrow">Contact</p>
          <h2 className="mt-3 font-[family-name:var(--font-sora)] text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Let’s build the next capability together
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/70">
            Reach us for engineering collaboration, aerospace development, and
            technical partnership inquiries.
          </p>
          <p className="mt-5 text-sm text-white/80">
            <a
              href="tel:+60378310075"
              className="transition hover:text-white"
            >
              +603 - 7831 0075
            </a>
            <span className="mx-3 text-white/30">|</span>
            <a
              href="mailto:info@pjbumitech.com"
              className="transition hover:text-white"
            >
              info@pjbumitech.com
            </a>
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <form
            onSubmit={onSubmit}
            className="space-y-4 rounded-sm border border-white/15 bg-white/5 p-6 sm:p-8"
          >
            <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-white/55">
                Name
              </span>
              <input
                required
                name="name"
                className="w-full rounded-sm border border-white/20 bg-navy/40 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-brand"
                placeholder="Your name"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-white/55">
                Email
              </span>
              <input
                required
                type="email"
                name="email"
                className="w-full rounded-sm border border-white/20 bg-navy/40 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-brand"
                placeholder="you@company.com"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-white/55">
                Message
              </span>
              <textarea
                required
                name="message"
                rows={5}
                className="w-full resize-y rounded-sm border border-white/20 bg-navy/40 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-brand"
                placeholder="Tell us about your project or inquiry"
              />
            </label>
            <button
              type="submit"
              className="rounded-sm bg-brand px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-brand-hover"
            >
              Submit Inquiry
            </button>
            {submitted && (
              <p className="text-sm text-emerald-300">
                Thank you. Our team will follow up with you shortly.
              </p>
            )}
          </form>

          <div className="space-y-8">
            {offices.map((office) => (
              <div key={office.entity}>
                <h3 className="font-[family-name:var(--font-sora)] text-lg font-semibold text-white">
                  {office.entity}
                </h3>
                <p className="mt-1 text-sm text-white/50">{office.detail}</p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {office.locations.map((location) => (
                    <div key={location.title}>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
                        {location.title}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-white/70">
                        {location.address}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
