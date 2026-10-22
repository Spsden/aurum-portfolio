"use client";

import Image from "next/image";
import { SETUP_OVERVIEW } from "@/content/workflow-data";
import { Reveal, StaggerWrapper, StaggerItem } from "@/components/ui/enhancers/motion-utils";

export default function WorkflowOverview() {
  return (
    <section className="w-full py-12 sm:py-16 md:py-20">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <Reveal>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-theme-fg mb-2">
            Setup Overview
          </h2>
          <p className="text-sm sm:text-base text-theme-fg-400 max-w-xl mb-8 sm:mb-10">
            The hardware and software that powers the daily engineering workflow.
          </p>
        </Reveal>

        <StaggerWrapper className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {SETUP_OVERVIEW.map((item) => (
            <StaggerItem key={item.title}>
              <div className="group bg-theme-bg-200 rounded-2xl border border-theme-bg-300 shadow-theme-lg overflow-hidden h-full">
                <div className="relative w-full aspect-[16/10] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="text-base sm:text-lg font-semibold text-theme-fg">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-theme-fg-300 leading-relaxed">
                    {item.description}
                  </p>
                  {item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-theme-bg-300 text-theme-fg-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerWrapper>
      </div>
    </section>
  );
}
