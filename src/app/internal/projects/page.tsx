import type { Metadata } from "next";
import Link from "next/link";
import { Projects } from "@/components/Projects";

export const metadata: Metadata = {
  title: "Internal Project Status | PJBUMI Tech",
  description: "Internal engineering project status dashboard.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function InternalProjectsPage() {
  return (
    <div className="min-h-screen bg-navy">
      <div className="border-b border-white/10 bg-navy/95">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-brand">
              Internal use only
            </p>
            <p className="mt-1 text-sm text-white/60">
              Project status dashboard — not linked from the public site.
            </p>
          </div>
          <Link
            href="/"
            className="rounded-sm border border-white/25 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white/80 transition hover:border-white/50 hover:text-white"
          >
            Back to public site
          </Link>
        </div>
      </div>
      <Projects />
    </div>
  );
}
