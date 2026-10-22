"use client";

import Image from "next/image";

import { motion } from "framer-motion";

import { TRAITS_PAGE } from "@/content/user-data";
import { TraitsPage } from "@/types/traints.t";
import { Reveal, StaggerWrapper, StaggerItem, staggerItem } from "../ui/enhancers/motion-utils";

type Props = {
  data?: TraitsPage[];
};

export default function TraitsSection({ data = TRAITS_PAGE }: Props) {
  return (
    <>
      {data.map((exp) => (
        <section key={exp.heading} className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-10 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
            <div className="md:col-span-7 relative">
              <div className="hidden md:block absolute -left-14 top-0 bottom-0">
                <div className="w-0.5 h-full bg-theme-bg-300 mx-auto" />
                <div
                  className="w-3 h-3 rounded-full bg-accent absolute -left-1.5 top-4 ring-4 ring-accent-soft/40"
                  aria-hidden
                />
              </div>

              <div className="mt-2 md:mt-0">
                <Reveal>
                  <p className="text-xs sm:text-sm text-theme-fg-400 mb-3 sm:mb-4">
                    {exp.date}
                  </p>
                </Reveal>
                <Reveal>
                  <h2 className="text-lg sm:text-2xl md:text-3xl font-semibold mb-3 sm:mb-4 text-theme-fg">
                    {exp.heading}
                  </h2>
                </Reveal>
                <Reveal>
                  <p className="text-sm sm:text-base text-theme-fg-300 mb-3 sm:mb-4 max-w-prose">
                    {exp.intro}
                  </p>
                </Reveal>
                {exp.subIntro && (
                  <Reveal>
                    <p className="text-sm sm:text-base text-theme-fg-300 mb-4 sm:mb-6">
                      {exp.subIntro}
                    </p>
                  </Reveal>
                )}

                <StaggerWrapper className="space-y-4 sm:space-y-5 md:space-y-6">
                  {exp.items.map((it, idx) => (
                    <StaggerItem key={it.title}>
                      <div className="flex gap-3 sm:gap-4 md:gap-6 items-start">
                        <div className="flex-shrink-0">
                          <span className="font-semibold text-base sm:text-lg text-accent">
                            {idx + 1}.
                          </span>
                        </div>

                        <div>
                          <h3 className="text-sm sm:text-base font-medium text-theme-fg">
                            {it.title}
                          </h3>
                          <p className="text-xs sm:text-sm md:text-base text-theme-fg-300 mt-1 max-w-prose">
                            {it.body}
                          </p>
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerWrapper>
              </div>
            </div>

            {/* Right column: image card */}
            <Reveal className="md:col-span-5 flex justify-center md:justify-end items-start">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="w-full max-w-sm rounded-xl overflow-hidden shadow-lg"
                aria-hidden={false}
              >
                <div className="relative aspect-[4/2]">
                  <Image
                    src={exp.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover dark:opacity-45"
                    priority
                  />

                  <div className="absolute inset-0 flex items-center justify-center px-4">
                    <h3
                      className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-black text-center drop-shadow-sm"
                      style={{ lineHeight: 1.05 }}
                    ></h3>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          </div>
        </section>
      ))}
    </>
  );
}
