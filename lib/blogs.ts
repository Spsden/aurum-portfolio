import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import type { BlogManifest, BlogPost, BlogSummary } from "@/types/blog.t";

const CONTENT_DIR = path.join(process.cwd(), "content", "blogs");
const WORDS_PER_MINUTE = 200;
const EXCERPT_LENGTH = 160;
const SUMMARY_LENGTH = 240;
const SLUG_PATTERN = /^[a-z0-9][a-z0-9._-]*$/i;

async function readOptional(file: string): Promise<string | null> {
  try {
    return await readFile(file, "utf8");
  } catch {
    return null;
  }
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}

/** Strips markdown syntax down to prose for excerpts and reading time. */
function summarize(
  manifest: BlogManifest,
  slug: string,
  body: string,
): BlogSummary {
  const text = body
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/^\s{0,3}#{1,6}\s+/gm, " ")
    .replace(/^\s{0,3}>\s?/gm, " ")
    .replace(/^\s{0,3}(?:[-*+]|\d+\.)\s+/gm, " ")
    .replace(/[*_~]{1,3}/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/[|\-]{2,}/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const words = text === "" ? 0 : text.split(/\s+/).length;

  return {
    slug,
    title: manifest.title,
    author: manifest.author,
    date: manifest.date,
    updated: manifest.updated,
    description: manifest.description ?? truncate(text, SUMMARY_LENGTH),
    excerpt: truncate(text, EXCERPT_LENGTH),
    tags: manifest.tags ?? [],
    cover: manifest.cover,
    draft: manifest.draft ?? false,
    readingTime: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
  };
}

async function readManifest(slug: string): Promise<BlogManifest> {
  const raw = await readOptional(path.join(CONTENT_DIR, slug, "manifest.json"));
  if (raw === null) {
    throw new Error(`[blogs] content/blogs/${slug}: manifest.json is missing`);
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    throw new Error(
      `[blogs] content/blogs/${slug}: manifest.json is not valid JSON — ${
        (error as Error).message
      }`,
    );
  }

  const data = parsed as Record<string, unknown>;
  for (const key of ["title", "author", "date"] as const) {
    if (typeof data[key] !== "string" || (data[key] as string).trim() === "") {
      throw new Error(
        `[blogs] content/blogs/${slug}: manifest.json needs a non-empty "${key}"`,
      );
    }
  }
  if (Number.isNaN(Date.parse(data.date as string))) {
    throw new Error(
      `[blogs] content/blogs/${slug}: manifest.json "date" is not a valid ISO date — ${String(
        data.date,
      )}`,
    );
  }

  return {
    title: (data.title as string).trim(),
    author: (data.author as string).trim(),
    date: data.date as string,
    updated: typeof data.updated === "string" ? data.updated : undefined,
    description:
      typeof data.description === "string" && data.description.trim() !== ""
        ? data.description.trim()
        : undefined,
    tags: Array.isArray(data.tags)
      ? data.tags.filter((tag): tag is string => typeof tag === "string")
      : [],
    cover: typeof data.cover === "string" ? data.cover : undefined,
    draft: data.draft === true,
  };
}

/** Every published post, newest first. Drafts are hidden in production. */
export const getAllPosts = cache(async (): Promise<BlogSummary[]> => {
  let entries;
  try {
    entries = await readdir(CONTENT_DIR, { withFileTypes: true });
  } catch {
    return [];
  }

  const slugs = entries
    .filter(
      (entry) =>
        entry.isDirectory() &&
        !entry.name.startsWith(".") &&
        !entry.name.startsWith("_"),
    )
    .map((entry) => entry.name);

  const posts = await Promise.all(
    slugs.map(async (slug): Promise<BlogSummary | null> => {
      const body = await readOptional(path.join(CONTENT_DIR, slug, "index.md"));
      if (body === null) return null;

      const manifest = await readManifest(slug);
      if (manifest.draft && process.env.NODE_ENV === "production") return null;

      return summarize(manifest, slug, body);
    }),
  );

  return posts
    .filter((post): post is BlogSummary => post !== null)
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
});

export const getAllPostSlugs = cache(
  async (): Promise<string[]> =>
    (await getAllPosts()).map((post) => post.slug),
);

/** A single post (metadata + raw markdown), or null when it does not exist. */
export const getPost = cache(async (slug: string): Promise<BlogPost | null> => {
  if (!SLUG_PATTERN.test(slug) || slug.includes("..")) return null;

  const body = await readOptional(path.join(CONTENT_DIR, slug, "index.md"));
  if (body === null) return null;

  const manifest = await readManifest(slug);
  if (manifest.draft && process.env.NODE_ENV === "production") return null;

  return { meta: summarize(manifest, slug, body), body };
});
