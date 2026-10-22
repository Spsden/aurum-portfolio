import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nexctl — Unified Infrastructure Control Plane",
  description:
    "A cloud-agnostic infrastructure control plane and multi-provider integration platform. Centralize infrastructure management, provider integrations, SSH node orchestration, RBAC, Docker-isolated jobs, OAuth integrations, and audit logging.",
  openGraph: {
    title: "Nexctl — Unified Infrastructure Control Plane",
    description:
      "A cloud-agnostic infrastructure control plane and multi-provider integration platform.",
    images: ["/nexctl/s1.png"],
  },
};

export default function NexctlLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
