"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft } from "lucide-react";

export default function NexctlCTA() {
  return (
    <section className="relative py-24 overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-cyan-500/5"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-stack-headline font-bold text-theme-fg leading-tight">
            Stop Jumping Between
            <br />
            Infrastructure Dashboards.
          </h2>
          <p className="mt-6 text-lg sm:text-xl text-theme-fg-300 max-w-2xl mx-auto">
            Manage servers, providers, automation, and permissions from a single
            control plane. Built for teams who need enterprise-grade
            infrastructure orchestration.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {/* <a */}
            {/*   href="https://github.com/wantedbear007" */}
            {/*   target="_blank" */}
            {/*   rel="noopener noreferrer" */}
            {/*   className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-theme-fg text-theme-bg font-semibold text-sm hover:opacity-90 transition-all" */}
            {/* > */}
            {/*   View Source */}
            {/*   <ArrowUpRight className="w-4 h-4" /> */}
            {/* </a> */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-theme-bg-300 text-theme-fg-200 hover:bg-theme-bg-200 transition-all text-sm font-medium"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Portfolio
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
