"use client";

import { motion } from "framer-motion";
import {
  Terminal,
  ScrollText,
  Hash,
  Cpu,
  Workflow,
  Layout,
  Puzzle,
  RefreshCw,
  Database,
} from "lucide-react";

const highlights = [
  {
    icon: Terminal,
    title: "Streaming SSH Terminal",
    desc: "Real-time terminal sessions streamed via WebSocket with full PTY support, resize handling, and session recording.",
  },
  {
    icon: ScrollText,
    title: "Async Logging Pipeline",
    desc: "Non-blocking structured logging with correlation IDs that trace requests across the entire event bus and worker pool.",
  },
  {
    icon: Hash,
    title: "Correlation IDs",
    desc: "Every operation generates a unique correlation ID that propagates through all services, jobs, and audit records.",
  },
  {
    icon: Cpu,
    title: "Worker Pools",
    desc: "Configurable Goroutine worker pools for job execution, SSH operations, and webhook processing with backpressure handling.",
  },
  {
    icon: Workflow,
    title: "In-Memory Event Bus",
    desc: "Lightweight pub/sub event bus for internal communication — providers emit events, workers consume them, audit logs capture everything.",
  },
  {
    icon: Layout,
    title: "Dynamic Frontend Rendering",
    desc: "Provider-registered UI components render at runtime. The frontend adapts to available providers without redeployment.",
  },
  {
    icon: Puzzle,
    title: "Provider Auto-Registration",
    desc: "Providers self-register at startup via Go interfaces. The system detects capabilities, OAuth schemes, and UI components automatically.",
  },
  {
    icon: RefreshCw,
    title: "OAuth Token Refresh",
    desc: "Automatic OAuth token refresh with encrypted storage and concurrent access safety. Tokens are injected per-provider at runtime.",
  },
  {
    icon: Database,
    title: "Durable Execution Records",
    desc: "Every job, SSH command, and webhook event is persisted with full metadata. Historical execution data is queryable and exportable.",
  },
];

export default function NexctlHighlights() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-stack-headline font-bold text-theme-fg">
              Engineering Highlights
            </h2>
            <p className="mt-4 text-lg text-theme-fg-300 max-w-2xl mx-auto">
              Advanced engineering under the hood — from streaming terminals to
              event-driven architectures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map((h, i) => (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                className="p-6 rounded-2xl border border-theme-bg-300 bg-theme-bg-100/50 hover:border-theme-bg-400 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-4">
                  <h.icon className="w-5 h-5 text-indigo-500" />
                </div>
                <h3 className="text-base font-semibold text-theme-fg mb-2">
                  {h.title}
                </h3>
                <p className="text-sm text-theme-fg-400 leading-relaxed">
                  {h.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
