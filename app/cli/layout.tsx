import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CLI Terminal — Bhanupratap Singh",
  description:
    "Interactive developer terminal for Bhanupratap Singh's portfolio. Explore projects, skills, experience, and more from the command line.",
};

export default function CLILayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
