"use client";

import { PRINCIPLES_SECTION } from "@/content/workflow-data";
import {
  Reveal,
  StaggerWrapper,
  StaggerItem,
} from "@/components/ui/enhancers/motion-utils";

export default function WorkflowPrinciples() {
  return (
    <section className="w-full py-12 sm:py-16 md:py-20">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <Reveal>
          <div className="max-w-2xl mb-8 sm:mb-10">
            <p className="text-xs sm:text-sm font-medium text-theme-fg-400 uppercase tracking-wider mb-2">
              Philosophy
            </p>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-theme-fg mb-3">
              {PRINCIPLES_SECTION.heading}
            </h2>
            <p className="text-sm sm:text-base text-theme-fg-300 leading-relaxed">
              {PRINCIPLES_SECTION.intro}
            </p>
          </div>
        </Reveal>

        <StaggerWrapper className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {PRINCIPLES_SECTION.principles.map((principle) => (
            <StaggerItem key={principle.title}>
              <div className="bg-theme-bg-200 rounded-xl border border-theme-bg-300 shadow-theme-sm p-5 sm:p-6 h-full">
                <div className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-theme-bg-300 text-theme-fg-400 text-xs font-semibold shrink-0 mt-0.5 font-mono">
                    {PRINCIPLES_SECTION.principles.indexOf(principle) + 1}
                  </span>
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-theme-fg mb-1.5">
                      {principle.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-theme-fg-300 leading-relaxed">
                      {principle.body}
                    </p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerWrapper>
      </div>
    </section>
  );
}
