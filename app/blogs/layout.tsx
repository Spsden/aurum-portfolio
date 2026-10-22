import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs — Bhanupratap Singh",
  description:
    "Thoughts on backend engineering, distributed systems, infrastructure, and building things that scale.",
  openGraph: {
    title: "Blogs — Bhanupratap Singh",
    description:
      "Thoughts on backend engineering, distributed systems, infrastructure, and building things that scale.",
  },
};

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
