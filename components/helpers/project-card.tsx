"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Project } from "@/types/project.t";

type Props = {
  project: Project;
};

export default function ProjectCard({ project }: Props) {
  const bullets = (project.bullets ?? []).slice(0, 3);
  const techs = project.techs ?? [];

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
      className="group bg-theme-bg-200 rounded-2xl border border-theme-bg-300 shadow-theme-lg hover:shadow-theme-xl transition-shadow duration-300 overflow-hidden h-full"
    >
      <div className="flex flex-col md:flex-row h-full">
        <div className="p-6 md:flex-1 md:pr-4 lg:pr-6 flex flex-col justify-between">
          <div>
            <header>
              <h3 className="text-lg font-semibold text-theme-fg">
                {project.title}
              </h3>
              {project.subtitle && (
                <p className="mt-1 text-sm text-theme-fg-400">
                  {project.subtitle}
                </p>
              )}
            </header>

            <p className="mt-4 text-sm text-theme-fg-300">
              {project.description}
            </p>

            {bullets.length > 0 && (
              <ul className="mt-4 space-y-2 text-sm text-theme-fg-300 list-disc list-inside">
                {bullets.map((b, i) => (
                  <li key={i} className="leading-snug">
                    {b}
                  </li>
                ))}
              </ul>
            )}

            {techs.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {techs.map((t, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-accent-soft text-theme-fg-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* footer (stays at bottom thanks to justify-between) */}
          <div className="mt-6 flex flex-wrap gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-theme-bg-300 text-sm font-medium text-theme-fg-200 hover:border-accent hover:text-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-ring transition-colors"
                aria-label={`${project.title} on GitHub`}
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M12 .5a12 12 0 00-3.8 23.4c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.5-1.2-1.2-1.5-1.2-1.5-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 .1 1.6-.7 2-1 .1-.8.4-1.3.7-1.6-2.7-.3-5.6-1.3-5.6-5.7 0-1.3.5-2.4 1.2-3.3-.1-.3-.5-1.6.1-3.3 0 0 1-.3 3.3 1.2a11.5 11.5 0 016 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 3 .1 3.3.8.9 1.2 2 1.2 3.3 0 4.4-2.9 5.4-5.7 5.7.4.3.8 1 .8 2v3c0 .3.2.7.8.6A12 12 0 0012 .5z" />
                </svg>
                GitHub
              </a>
            )}

            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-accent text-accent-contrast text-sm font-medium hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-ring"
                aria-label={`Open live demo for ${project.title}`}
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden
                >
                  <path d="M14 3h7v7" />
                  <path d="M10 14L21 3" />
                  <path d="M21 21H3V3" />
                </svg>
                Live
              </a>
            )}

            {project.page && (
              <Link
                href={project.page}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-theme-bg-300 text-sm font-medium text-theme-fg-200 hover:border-accent hover:text-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-ring transition-colors"
                aria-label={`View details for ${project.title}`}
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden
                >
                  <path d="M12 5v14" />
                  <path d="M5 12h14" />
                </svg>
                Details
              </Link>
            )}
          </div>
        </div>

        <div className="relative w-full h-44 md:h-auto md:w-40 lg:w-48 flex-shrink-0 overflow-hidden">
          <Image
            src={project.image}
            alt={project.imageAlt ?? project.title}
            fill
            className="object-cover rounded-tr-2xl rounded-br-2xl md:rounded-none transition-transform duration-300 group-hover:scale-105 dark:opacity-40"
            sizes="(max-width: 640px) 100vw, 200px"
            priority={false}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-tr-2xl rounded-br-2xl md:rounded-none" />
        </div>
      </div>
    </motion.article>
  );
}
