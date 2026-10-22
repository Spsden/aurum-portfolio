import React from "react";
import Image from "next/image";
import { FOOTER_DATA } from "@/content/user-data";
import { Reveal } from "../enhancers/motion-utils";

export default function Footer() {
  return (
    <footer className="w-full relative overflow-hidden bg-theme-bg">
      <Reveal>
        <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h2 className="text-4xl font-semibold mb-4 text-theme-fg">
              {FOOTER_DATA.title}
            </h2>
            <p className="text-lg text-theme-fg-300 max-w-lg">
              {FOOTER_DATA.description}
            </p>

            <a
              href={`mailto:${FOOTER_DATA.email}`}
              className="text-xl mt-4 block text-theme-fg-200 hover:text-accent hover:underline transition-colors"
            >
              {FOOTER_DATA.email}
            </a>
            <h3>Designed and developed with ❤️</h3>
          </div>

          <div className="flex space-x-8 text-lg mt-10 md:mt-0">
            {FOOTER_DATA.socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                className="text-theme-fg-300 hover:text-accent hover:underline transition-colors"
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="w-full h-[260px] relative">
        <Image
          src={FOOTER_DATA.image}
          alt="Footer Illustration"
          fill
          className="object-cover object-bottom dark:opacity-35"
          priority
        />
      </div>
    </footer>
  );
}
