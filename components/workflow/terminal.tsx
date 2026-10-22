"use client";

import Image from "next/image";
import { TERMINAL_SECTION, WORKFLOW_IMAGES } from "@/content/workflow-data";
import {
  Reveal,
  StaggerWrapper,
  StaggerItem,
} from "@/components/ui/enhancers/motion-utils";

export default function WorkflowTerminal() {
  return (
    <section className="w-full py-12 sm:py-16 md:py-20">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <Reveal>
          <div className="max-w-2xl mb-8 sm:mb-10">
            <p className="text-xs sm:text-sm font-medium text-theme-fg-400 uppercase tracking-wider mb-2">
              Terminal & CLI
            </p>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-theme-fg mb-3">
              {TERMINAL_SECTION.heading}
            </h2>
            <p className="text-sm sm:text-base text-theme-fg-300 leading-relaxed">
              {TERMINAL_SECTION.intro}
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8">
          <div className="lg:col-span-2">
            <Reveal>
              <div className="bg-gray-900 dark:bg-gray-950 rounded-xl border border-gray-800 shadow-theme-lg overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 bg-gray-800/50 border-b border-gray-800">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  <span className="ml-2 text-xs text-gray-400 font-mono">
                    ~/code/project — zsh (kitty)
                  </span>
                </div>
                <div className="p-4 sm:p-5 space-y-2.5 text-xs sm:text-sm font-mono leading-relaxed">
                  {TERMINAL_SECTION.commands.map((c, i) => (
                    <div key={i}>
                      <div className="flex items-start gap-2">
                        <span className="text-green-400 shrink-0">❯</span>
                        <span className="text-gray-100">{c.cmd}</span>
                      </div>
                      <p className="text-gray-500 pl-5 text-xs mt-0.5">
                        {c.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-3">
            <Reveal>
              <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-theme-bg-300 shadow-theme-lg bg-theme-bg-200">
                <Image
                  src={WORKFLOW_IMAGES.terminal}
                  alt="Terminal screenshot"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </div>
            </Reveal>
          </div>
        </div>

        <StaggerWrapper className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-8 sm:mt-10">
          {TERMINAL_SECTION.tools.map((tool) => (
            <StaggerItem key={tool.name}>
              <div className="bg-theme-bg-200 rounded-xl border border-theme-bg-300 shadow-theme-sm p-5 h-full">
                <h3 className="text-sm sm:text-base font-semibold text-theme-fg mb-1.5 font-mono">
                  {tool.name}
                </h3>
                <p className="text-xs sm:text-sm text-theme-fg-300 leading-relaxed">
                  {tool.desc}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerWrapper>
      </div>
    </section>
  );
}
