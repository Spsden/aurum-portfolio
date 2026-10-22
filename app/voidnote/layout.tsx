import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VoidNote — Suraj pratap Singh",
  description:
    "Ephemeral note sharing encoded entirely in the URL. No backend, no database, no storage — just a temporary link.",
};

export default function VoidNoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
