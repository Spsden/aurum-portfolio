"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/enhancers/motion-utils";

export default function WorkflowCTA() {
  return (
    <Reveal>
      <section className="py-8 sm:py-12">
        <div className="rounded-2xl border border-theme-bg-300 bg-theme-bg-200 shadow-theme-lg p-6 sm:p-8 md:p-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="max-w-xl">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-theme-fg">
                Inside My Developer Workflow
              </h2>
              <p className="mt-2 text-sm sm:text-base text-theme-fg-400 leading-relaxed">
                A deep dive into the tools, editor setup, terminal workflow, and
                engineering principles behind the projects I build.
              </p>
            </div>
            <Link
              href="/workflow"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-black text-white text-sm font-medium hover:bg-indigo-700 transition-colors duration-200 shrink-0"
            >
              Explore workflow
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </Reveal>
  );
}
