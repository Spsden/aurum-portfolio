import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Playground — JavaScript IDE",
  description:
    "Interactive JavaScript playground with Monaco editor, real-time output, and multiple themes. Experiment with code directly in the browser.",
};

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
