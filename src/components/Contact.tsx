"use client";

import { SiteImage as Image } from "@/components/SiteImage";
import { CONTACT_EMAIL, submitContactForm } from "@/lib/contactForm";
import { FormEvent, useState } from "react";

const offices = [
  {
    entityName: "PJBUMI Technologies",
    entitySuffix: "Sdn. Bhd.",
    detail: "Company No: 201701036428 (1250599-D)",
    locations: [
      {
        title: "Kuala Lumpur",
        designation: "Corporate Office",
        address:
          "Unit 22-1 Level 22, MOF Inc. Tower, Platinum Park, No 9 Persiaran KLCC, 50088 Kuala Lumpur, Malaysia",
        phone: "+60 2 333 9201",
      },
      {
        title: "Sendayan",
        designation: "Technology Facility",
        address:
          "218, Jalan Sendayan Metropark 2/3, Sendayan Metropark, 71950 Seremban, Negeri Sembilan, Malaysia",
        phone: "+60 6 672 0808",
      },
    ],
  },
  {
    entityName: "PJBUMI Technologies",
    entitySuffix: "SAS",
    detail: "Company No: RCS Toulouse 107 926 883",
    locations: [
      {
        title: "Toulouse",
        designation: "Global Tech Center",
        address:
          "13 Rue Sainte Ursule 31000, Toulouse, France",
        phone: "+33 6 75 43 56 69",
      },
    ],
  },
];

type Status = "idle" | "sending" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot — treat as success without sending
    if (String(data.get("botcheck") ?? data.get("_gotcha") ?? "").trim()) {
      setStatus("success");
      form.reset();
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      await submitContactForm({
        name: data.get("name"),
        email: data.get("email"),
        message: data.get("message"),
      });
      setStatus("success");
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to send your message right now.",
      );
    }
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
              href="tel:+6023339201"
              className="transition hover:text-white"
            >
              +60 2 333 9201
            </a>
            <span className="mx-3 text-white/30">|</span>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="transition hover:text-white"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <form
            id="contact-form"
            onSubmit={onSubmit}
            className="space-y-4 rounded-sm border border-white/15 bg-white/5 p-6 sm:p-8"
          >
            <input
              type="checkbox"
              name="botcheck"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden
            />
            <input
              type="text"
              name="_gotcha"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden
            />
            <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-white/55">
                Name
              </span>
              <input
                required
                name="name"
                disabled={status === "sending"}
                className="w-full rounded-sm border border-white/20 bg-navy/40 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-brand disabled:opacity-60"
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
                disabled={status === "sending"}
                className="w-full rounded-sm border border-white/20 bg-navy/40 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-brand disabled:opacity-60"
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
                disabled={status === "sending"}
                className="w-full resize-y rounded-sm border border-white/20 bg-navy/40 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-brand disabled:opacity-60"
                placeholder="Tell us about your project or inquiry"
              />
            </label>
            <button
              type="submit"
              disabled={status === "sending"}
              className="rounded-sm bg-brand px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "sending" ? "Sending…" : "Submit Inquiry"}
            </button>
            {status === "success" && (
              <p className="text-sm text-emerald-300">
                Thank you. Your message has been sent — our team will follow up
                shortly.
              </p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-300">
                {errorMessage} You can also email us directly at{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="underline underline-offset-2"
                >
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
            )}
          </form>

          <div className="grid gap-8 sm:grid-cols-2 sm:gap-10">
            {offices.map((office) => (
              <div key={`${office.entityName}-${office.entitySuffix}`}>
                <h3 className="font-[family-name:var(--font-sora)] text-lg font-semibold text-white">
                  <span className="block">{office.entityName}</span>
                  <span className="mt-0.5 block text-base font-semibold text-white/90">
                    {office.entitySuffix}
                  </span>
                </h3>
                <p className="mt-1 text-sm text-white/50">{office.detail}</p>
                <div className="mt-4 space-y-5">
                  {office.locations.map((location) => (
                    <div key={location.title}>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
                        {location.title}
                      </p>
                      <p className="mt-1 text-sm font-medium text-white/85">
                        {location.designation}
                      </p>
                      <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-white/70">
                        {location.address}
                      </p>
                      {"phone" in location && location.phone && (
                        <p className="mt-2 text-sm text-white/70">
                          <a
                            href={`tel:${location.phone.replace(/\s/g, "")}`}
                            className="transition hover:text-white"
                          >
                            {location.phone}
                          </a>
                        </p>
                      )}
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
