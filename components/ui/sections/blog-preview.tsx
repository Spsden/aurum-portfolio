"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { formatDateShort } from "@/lib/format";
import type { BlogSummary } from "@/types/blog.t";
import { Reveal } from "../enhancers/motion-utils";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

type Props = {
  posts: BlogSummary[];
};

export default function BlogPreview({ posts }: Props) {
  if (posts.length === 0) return null;

  return (
    <section className="py-8 sm:py-12">
      <Reveal>
        <div className="flex items-end justify-between mb-6 sm:mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-theme-fg">
              Latest from the blog
            </h2>
            <p className="mt-1.5 text-sm text-theme-fg-400 max-w-md">
              Thoughts on backend engineering, distributed systems, and
              infrastructure.
            </p>
          </div>
          <Link
            href="/blogs"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-theme-fg-400 hover:text-theme-fg transition-colors shrink-0"
          >
            View all
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </Reveal>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {posts.slice(0, 3).map((post) => (
          <motion.div key={post.slug} variants={item}>
            <Link
              href={`/blogs/${post.slug}`}
              className="group block bg-theme-bg-200 rounded-2xl border border-theme-bg-300 shadow-theme-lg hover:shadow-theme-xl transition-all duration-200 overflow-hidden h-full"
            >
              <div className="p-5 sm:p-6 flex flex-col h-full">
                <div className="flex items-center gap-2 text-xs text-theme-fg-400 mb-2.5">
                  <time dateTime={post.date}>{formatDateShort(post.date)}</time>
                  <span className="w-1 h-1 rounded-full bg-theme-fg-400 shrink-0" />
                  <span className="truncate">{post.author}</span>
                </div>

                <h3 className="text-base font-semibold text-theme-fg group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors duration-200 leading-snug">
                  {post.title}
                </h3>

                <p className="mt-2 text-sm text-theme-fg-300 leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="mt-auto pt-4 flex items-center gap-1 text-sm font-medium text-theme-fg-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors duration-200">
                  Read
                  <svg
                    className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-6 text-center sm:hidden">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-theme-fg-400 hover:text-theme-fg transition-colors"
        >
          View all blogs
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
