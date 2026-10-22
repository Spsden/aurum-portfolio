#!/usr/bin/env node
/**
 * Copies co-located blog images into `public/` so Next can serve them statically.
 *
 * Authored at:  content/blogs/<slug>/images/**
 * Served from:  /blogs/<slug>/images/**
 *
 * Runs automatically via the `predev` / `prebuild` npm lifecycle scripts, so
 * `public/blogs/**` is generated output and is git-ignored.
 */
import { cp, mkdir, readdir, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const CONTENT_DIR = path.join(root, "content", "blogs");
const PUBLIC_DIR = path.join(root, "public", "blogs");

async function slugs() {
  if (!existsSync(CONTENT_DIR)) return [];
  const entries = await readdir(CONTENT_DIR, { withFileTypes: true });
  return entries
    .filter(
      (e) => e.isDirectory() && !e.name.startsWith(".") && !e.name.startsWith("_"),
    )
    .map((e) => e.name)
    .sort();
}

async function main() {
  await rm(PUBLIC_DIR, { recursive: true, force: true });

  let copied = 0;
  for (const slug of await slugs()) {
    const src = path.join(CONTENT_DIR, slug, "images");
    if (!existsSync(src)) continue;

    const dest = path.join(PUBLIC_DIR, slug, "images");
    await mkdir(dest, { recursive: true });
    await cp(src, dest, { recursive: true });
    copied += 1;
  }

  console.log(`[sync-assets] synced images for ${copied} post(s) -> public/blogs`);
}

main().catch((err) => {
  console.error("[sync-assets] failed:", err);
  process.exit(1);
});
