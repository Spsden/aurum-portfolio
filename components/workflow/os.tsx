"use client";

import Image from "next/image";
import { OS_SECTION } from "@/content/workflow-data";
import { Reveal, StaggerWrapper, StaggerItem } from "@/components/ui/enhancers/motion-utils";

export default function WorkflowOS() {
  return (
    <section className="w-full py-12 sm:py-16 md:py-20">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <Reveal>
          <div className="max-w-2xl mb-8 sm:mb-10">
            <p className="text-xs sm:text-sm font-medium text-theme-fg-400 uppercase tracking-wider mb-2">
              Environment
            </p>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-theme-fg mb-3">
              {OS_SECTION.heading}
            </h2>
            <p className="text-sm sm:text-base text-theme-fg-300 leading-relaxed">
              {OS_SECTION.intro}
            </p>
          </div>
        </Reveal>

        <StaggerWrapper className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {OS_SECTION.systems.map((system) => (
            <StaggerItem key={system.name}>
              <div className="bg-theme-bg-200 rounded-2xl border border-theme-bg-300 shadow-theme-lg overflow-hidden h-full">
                <div className="relative w-full aspect-[16/9] overflow-hidden">
                  <Image
                    src={system.image}
                    alt={system.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-theme-fg">
                        {system.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-theme-fg-400">
                        {system.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {system.specs.split("·").map((spec) => (
                      <span
                        key={spec.trim()}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-theme-bg-300 text-theme-fg-400"
                      >
                        {spec.trim()}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-theme-fg-300 leading-relaxed">
                    {system.description}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerWrapper>

        <Reveal>
          <div className="mt-8 sm:mt-10 p-5 sm:p-6 rounded-xl border border-theme-bg-300 bg-theme-bg-200 shadow-theme-sm">
            <p className="text-sm text-theme-fg-400 leading-relaxed">
              <span className="text-theme-fg font-semibold">Note: </span>
              {OS_SECTION.note}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
