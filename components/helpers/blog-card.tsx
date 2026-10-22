"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { formatDate } from "@/lib/format";
import type { BlogSummary } from "@/types/blog.t";

type Props = {
  blog: BlogSummary;
};

export default function BlogCard({ blog }: Props) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
      className="h-full"
    >
      <Link
        href={`/blogs/${blog.slug}`}
        className="group block h-full bg-theme-bg-200 rounded-2xl border border-theme-bg-300 shadow-theme-lg hover:shadow-theme-xl transition-all duration-300 overflow-hidden"
      >
        <div className="p-6 sm:p-7 flex flex-col h-full">
          <div className="flex items-center gap-3 text-xs text-theme-fg-400 mb-3">
            <span>{formatDate(blog.date)}</span>
            <span className="w-1 h-1 rounded-full bg-theme-fg-400" />
            <span>{blog.author}</span>
          </div>

          <h3 className="text-lg font-semibold text-theme-fg group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors duration-200">
            {blog.title}
          </h3>

          <p className="mt-3 text-sm text-theme-fg-300 leading-relaxed line-clamp-3">
            {blog.excerpt}
          </p>

          <div className="mt-auto pt-5 flex items-center gap-1.5 text-sm font-medium text-theme-fg-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors duration-200">
            Read more
            <svg
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
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
  );
}
