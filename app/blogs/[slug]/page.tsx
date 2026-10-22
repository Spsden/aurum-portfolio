import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import MermaidRenderer from "@/components/blog/mermaid-renderer";
import Navbar from "@/components/ui/sections/navbar";
import Footer from "@/components/ui/sections/footer";
import { getAllPostSlugs, getPost } from "@/lib/blogs";
import { formatDate } from "@/lib/format";
import { renderMarkdown } from "@/lib/markdown";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-static";

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Blog — Suraj Pratap Singh" };

  const { meta } = post;
  const cover = meta.cover ? `/blogs/${meta.slug}/${meta.cover}` : undefined;

  return {
    title: `${meta.title} — Suraj Pratap Singh`,
    description: meta.description,
    openGraph: {
      type: "article",
      title: meta.title,
      description: meta.description,
      publishedTime: meta.date,
      modifiedTime: meta.updated,
      tags: meta.tags,
      images: cover ? [cover] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const html = await renderMarkdown(post.body, post.meta.slug);

  return (
    <>
      <Navbar />
      <main className="w-full max-w-3xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-1.5 text-sm text-theme-fg-400 hover:text-theme-fg transition-colors mb-6 sm:mb-8"
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back to blogs
        </Link>

        <article>
          <header className="mb-8 sm:mb-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-theme-fg leading-tight">
              {post.meta.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-theme-fg-400">
              <span>{post.meta.author}</span>
              <span className="w-1 h-1 rounded-full bg-theme-fg-400" />
              <time dateTime={post.meta.date}>
                {formatDate(post.meta.date)}
              </time>
              <span className="w-1 h-1 rounded-full bg-theme-fg-400" />
              <span>{post.meta.readingTime} min read</span>
            </div>
            {post.meta.tags.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-2">
                {post.meta.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-theme-bg-300 bg-theme-bg-200 px-2.5 py-0.5 text-xs text-theme-fg-400"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            )}
          </header>

          <MermaidRenderer
            html={html}
            className="prose prose-sm sm:prose-base max-w-none"
          />
        </article>

        <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-theme-bg-300">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-1.5 text-sm text-theme-fg-400 hover:text-theme-fg transition-colors"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back to blogs
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
