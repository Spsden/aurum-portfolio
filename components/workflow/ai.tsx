"use client";

import { AI_SECTION } from "@/content/workflow-data";
import {
  Reveal,
  StaggerWrapper,
  StaggerItem,
} from "@/components/ui/enhancers/motion-utils";

export default function WorkflowAI() {
  return (
    <section className="w-full py-12 sm:py-16 md:py-20">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <Reveal>
          <div className="max-w-2xl mb-8 sm:mb-10">
            <p className="text-xs sm:text-sm font-medium text-theme-fg-400 uppercase tracking-wider mb-2">
              Intelligence
            </p>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-theme-fg mb-3">
              {AI_SECTION.heading}
            </h2>
            <p className="text-sm sm:text-base text-theme-fg-300 leading-relaxed">
              {AI_SECTION.intro}
            </p>
          </div>
        </Reveal>

        <StaggerWrapper className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {AI_SECTION.useCases.map((item) => (
            <StaggerItem key={item.title}>
              <div className="bg-theme-bg-200 rounded-xl border border-theme-bg-300 shadow-theme-sm p-5 sm:p-6 h-full">
                <h3 className="text-sm sm:text-base font-semibold text-theme-fg mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-theme-fg-300 leading-relaxed">
                  {item.body}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerWrapper>

        <Reveal>
          <div className="mt-8 sm:mt-10 p-5 sm:p-6 rounded-xl border border-indigo-500/20 bg-indigo-500/5 shadow-theme-sm">
            <p className="text-sm sm:text-base text-theme-fg-300 leading-relaxed text-center max-w-2xl mx-auto">
              &ldquo;{AI_SECTION.principle}&rdquo;
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
