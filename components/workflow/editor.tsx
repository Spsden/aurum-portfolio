"use client";

import Image from "next/image";
import { EDITOR_SECTION, WORKFLOW_IMAGES } from "@/content/workflow-data";
import {
  Reveal,
  StaggerWrapper,
  StaggerItem,
} from "@/components/ui/enhancers/motion-utils";

export default function WorkflowEditor() {
  return (
    <section className="w-full py-12 sm:py-16 md:py-20">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <Reveal>
          <div className="max-w-2xl mb-8 sm:mb-10">
            <p className="text-xs sm:text-sm font-medium text-theme-fg-400 uppercase tracking-wider mb-2">
              Editor
            </p>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-theme-fg mb-3">
              {EDITOR_SECTION.heading}
            </h2>
            <p className="text-sm sm:text-base text-theme-fg-300 leading-relaxed">
              {EDITOR_SECTION.intro}
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8">
          <div className="lg:col-span-3">
            <Reveal>
              <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-theme-bg-300 shadow-theme-lg bg-theme-bg-200">
                <Image
                  src={WORKFLOW_IMAGES.lazyvim}
                  alt="LazyVim editor screenshot"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-2">
            <Reveal>
              <div className="bg-theme-bg-200 rounded-xl border border-theme-bg-300 shadow-theme-lg p-5 sm:p-6">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-theme-bg-300">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  <span className="ml-2 text-xs text-theme-fg-400 font-mono">
                    lazyvim@ ~/code ( main)
                  </span>
                </div>

                <div className="space-y-2 text-xs sm:text-sm font-mono text-theme-fg-300 leading-relaxed">
                  <p>
                    <span className="text-green-500"></span> LSP active —{" "}
                    <span className="text-theme-fg-200">gopls, tsserver</span>
                  </p>
                  <p>
                    <span className="text-indigo-400">󰊄</span> Treesitter —{" "}
                    <span className="text-theme-fg-200">go, ts, python</span>
                  </p>
                  <p>
                    <span className="text-blue-400">󰍉</span> Telescope —{" "}
                    <span className="text-theme-fg-200">find files, grep</span>
                  </p>
                  <p>
                    <span className="text-orange-400"></span> Lazygit —{" "}
                    <span className="text-theme-fg-200">staging, blame, log</span>
                  </p>
                  <p>
                    <span className="text-purple-400">󱕍</span> Which-key —{" "}
                    <span className="text-theme-fg-200">leader mappings</span>
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <StaggerWrapper className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mt-8 sm:mt-10">
          {EDITOR_SECTION.highlights.map((item) => (
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
      </div>
    </section>
  );
}
