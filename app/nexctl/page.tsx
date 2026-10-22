"use client";

import Navbar from "@/components/ui/sections/navbar";
import NexctlHero from "@/components/nexctl/hero";
import NexctlOverview from "@/components/nexctl/overview";
import NexctlFeatures from "@/components/nexctl/features";
import NexctlInfrastructure from "@/components/nexctl/infrastructure";
import NexctlRBAC from "@/components/nexctl/rbac";
import NexctlJobs from "@/components/nexctl/jobs";
import NexctlProviders from "@/components/nexctl/providers";
import NexctlArchitecture from "@/components/nexctl/architecture";
import NexctlHighlights from "@/components/nexctl/highlights";
import NexctlCTA from "@/components/nexctl/cta";

export default function NexctlPage() {
  return (
    <>
      <Navbar />
      <main>
        <NexctlHero />
        <NexctlOverview />
        <NexctlFeatures />
        <NexctlInfrastructure />
        <NexctlRBAC />
        <NexctlJobs />
        <NexctlProviders />
        <NexctlArchitecture />
        <NexctlHighlights />
        <NexctlCTA />
      </main>
      <NexctlFooter />
    </>
  );
}

function NexctlFooter() {
  return (
    <footer className="w-full border-t border-theme-bg-300 bg-theme-bg-100">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <h3 className="text-lg font-stack-headline font-semibold text-theme-fg">
              Nexctl
            </h3>
            <p className="text-sm text-theme-fg-400 mt-1">
              Infrastructure Control Plane
            </p>
          </div>

          <div className="flex flex-wrap gap-6">
            <a
              href="#features"
              className="text-sm text-theme-fg-400 hover:text-theme-fg transition-colors"
            >
              Features
            </a>
            <a
              href="#architecture"
              className="text-sm text-theme-fg-400 hover:text-theme-fg transition-colors"
            >
              Architecture
            </a>
            <a
              href="#overview"
              className="text-sm text-theme-fg-400 hover:text-theme-fg transition-colors"
            >
              Security
            </a>
            <a
              href="https://github.com/wantedbear007"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-theme-fg-400 hover:text-theme-fg transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-theme-bg-300 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-xs text-theme-fg-500">
            &copy; {new Date().getFullYear()} Bhanupratap Singh. All rights
            reserved.
          </p>
          <p className="text-xs text-theme-fg-500">
            Built as part of portfolio showcase
          </p>
        </div>
      </div>
    </footer>
  );
}
