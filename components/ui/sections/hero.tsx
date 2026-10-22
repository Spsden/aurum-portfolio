"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { IMAGES_PATH, TAG_LINES, USER_DATA } from "@/content/user-data";
import { HighlightText } from "../enhancers/highlight-text";
import { GlowButton } from "@/components/buttons/glow-button";
import { fadeUp } from "../enhancers/motion-utils";

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

export default function HeroSection() {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return (
      <section
        className={
          "w-full flex flex-col items-center justify-center py-8 sm:py-12 md:py-16 lg:py-20 " +
          "transition-colors duration-200"
        }
      >
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8 md:mb-10 w-full">
          <Image
            src={IMAGES_PATH.small_profile}
            alt="profile"
            width={72}
            height={72}
            className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full object-cover shadow-xl shrink-0"
          />
          <div
            className={
              "px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3 rounded-xl shadow-lg " +
              "text-sm sm:text-base md:text-lg " +
              "bg-theme-bg-400 text-theme-fg-200"
            }
          >
            {USER_DATA.prefix}
          </div>
        </div>

        <HighlightText
          setence={TAG_LINES.heroSection.sentence}
          highlights={TAG_LINES.heroSection.highlight}
        />

        <p className="w-full mt-4 sm:mt-5 md:mt-6 text-theme-fg-300 text-base sm:text-lg md:text-xl leading-relaxed">
          {TAG_LINES.subText.pre}
          <br />
          <br />
          {TAG_LINES.subText.post}
        </p>
        <div className="w-full flex justify-start mt-6 sm:mt-7 md:mt-8">
          <GlowButton text="Download resume" />
        </div>
      </section>
    );
  }

  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="visible"
      className={
        "w-full flex flex-col items-center justify-center py-8 sm:py-12 md:py-16 lg:py-20 " +
        "transition-colors duration-200"
      }
    >
      {/* Greeting card */}
      <motion.div variants={fadeUp} className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8 md:mb-10 w-full">
        <Image
          src={IMAGES_PATH.small_profile}
          alt="profile"
          width={72}
          height={72}
          className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full object-cover shadow-xl shrink-0"
        />
        <div
          className={
            "px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3 rounded-xl shadow-lg " +
            "text-sm sm:text-base md:text-lg " +
            "bg-theme-bg-400 text-theme-fg-200"
          }
        >
          {USER_DATA.prefix}
        </div>
      </motion.div>

      {/* Heading text */}
      <motion.div variants={fadeUp} className="w-full">
        <HighlightText
          setence={TAG_LINES.heroSection.sentence}
          highlights={TAG_LINES.heroSection.highlight}
        />
      </motion.div>

      {/* Sub text */}
      <motion.p
        variants={fadeUp}
        className="w-full mt-4 sm:mt-5 md:mt-6 text-theme-fg-300 text-base sm:text-lg md:text-xl leading-relaxed"
      >
        {TAG_LINES.subText.pre}
        <br />
        <br />
        {TAG_LINES.subText.post}
      </motion.p>

      <motion.div variants={fadeUp} className="w-full flex justify-start mt-6 sm:mt-7 md:mt-8">
        <GlowButton text="Download resume" />
      </motion.div>
    </motion.section>
  );
}
