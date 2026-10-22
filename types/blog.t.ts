/**
 * Blog content model.
 *
 * Posts are authored as folders on disk:
 *
 *   content/blogs/<slug>/manifest.json   metadata
 *   content/blogs/<slug>/index.md        markdown body
 *   content/blogs/<slug>/images/*        co-located assets
 *
 * `<slug>` (the folder name) is the URL segment: `/blogs/<slug>`.
 */

export type BlogManifest = {
  title: string;
  author: string;
  /** ISO date, e.g. "2026-10-08" */
  date: string;
  /** ISO date of the last meaningful edit */
  updated?: string;
  /** Short summary; falls back to an excerpt of the body */
  description?: string;
  tags?: string[];
  /** Post-relative image path, e.g. "images/cover.svg" */
  cover?: string;
  /** Hidden from production builds when true */
  draft?: boolean;
};

/** A post as shown in lists (no body). */
export type BlogSummary = {
  slug: string;
  title: string;
  author: string;
  date: string;
  updated?: string;
  description: string;
  excerpt: string;
  tags: string[];
  cover?: string;
  draft: boolean;
  /** Estimated reading time in minutes */
  readingTime: number;
};

/** A post with its raw markdown body. */
export type BlogPost = {
  meta: BlogSummary;
  body: string;
};
