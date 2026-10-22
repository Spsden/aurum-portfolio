import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { rehypeImages } from "./rehype-images";
import { rehypeMermaid } from "./rehype-mermaid";

/**
 * Markdown -> HTML, at build time.
 *
 * Fenced ```mermaid blocks become `<div class="mermaid">` hosts that a client
 * component renders; everything else (code highlighting, tables, anchor ids,
 * relative images) is resolved here so pages ship as static HTML.
 */
export async function renderMarkdown(
  markdown: string,
  slug: string,
): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeMermaid)
    .use(rehypeSlug)
    .use(rehypeImages, { base: `/blogs/${slug}/` })
    .use(rehypePrettyCode, {
      theme: { light: "github-light", dark: "github-dark" },
      keepBackground: false,
    })
    .use(rehypeStringify)
    .process(markdown);

  return String(file);
}
