"use client";

import { motion, useReducedMotion } from "framer-motion";
import { WORKFLOW_HERO } from "@/content/workflow-data";
import { fadeUp } from "@/components/ui/enhancers/motion-utils";

export default function WorkflowHero() {
  const prefersReduced = useReducedMotion();

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.15 },
    },
  };

  if (prefersReduced) {
    return (
      <section className="w-full py-16 sm:py-20 md:py-28">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-stack-headline font-semibold text-theme-fg leading-tight">
              {WORKFLOW_HERO.heading}
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-theme-fg-300 leading-relaxed max-w-2xl">
              {WORKFLOW_HERO.subheading}
            </p>
            <div className="flex flex-wrap gap-2 mt-6 sm:mt-8">
              {WORKFLOW_HERO.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-theme-bg-300 text-theme-fg-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-16 sm:py-20 md:py-28">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <motion.h1
            variants={fadeUp}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-stack-headline font-semibold text-theme-fg leading-tight"
          >
            {WORKFLOW_HERO.heading}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-theme-fg-300 leading-relaxed max-w-2xl"
          >
            {WORKFLOW_HERO.subheading}
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap gap-2 mt-6 sm:mt-8"
          >
            {WORKFLOW_HERO.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-theme-bg-300 text-theme-fg-400"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
