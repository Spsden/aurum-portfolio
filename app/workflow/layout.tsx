import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Developer Workflow — Bhanupratap Singh",
  description:
    "A behind-the-scenes look at my engineering workflow: tools, editor setup, terminal workflow, and development philosophy.",
};

export default function WorkflowLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
