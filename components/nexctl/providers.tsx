"use client";

import { motion } from "framer-motion";
import {
  Github,
  CloudIcon,
  Globe,
  Building2,
  Triangle,
  Send,
} from "lucide-react";

const providers = [
  {
    name: "GitHub",
    icon: Github,
    color: "text-gray-500",
    bg: "bg-gray-500/10",
  },
  {
    name: "Cloudflare",
    icon: CloudIcon,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    name: "Google",
    icon: Globe,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    name: "AWS",
    icon: Building2,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    name: "Vercel",
    icon: Triangle,
    color: "text-gray-500",
    bg: "bg-gray-500/10",
  },
  {
    name: "Telegram",
    icon: Send,
    color: "text-sky-500",
    bg: "bg-sky-500/10",
  },
];

const highlights = [
  "Unified provider architecture with capability detection",
  "Reusable capability system — each provider declares supported features",
  "Centralized OAuth token handling with auto-refresh",
  "Provider-driven frontend rendering at runtime",
  "Webhook verification with HMAC signatures",
  "Extensible plugin system for custom providers",
];

export default function NexctlProviders() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-theme-bg via-theme-bg-100/30 to-theme-bg pointer-events-none" />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-stack-headline font-bold text-theme-fg">
              Provider Ecosystem
            </h2>
            <p className="mt-4 text-lg text-theme-fg-300 max-w-2xl mx-auto">
              A pluggable provider system that integrates with any service
              through a unified capability interface.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="grid grid-cols-3 gap-4">
                {providers.map((p, i) => (
                  <motion.div
                    key={p.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className={`flex flex-col items-center gap-3 p-6 rounded-2xl border border-theme-bg-300 ${p.bg} hover:border-theme-bg-400 transition-all duration-300`}
                  >
                    <p.icon className={`w-8 h-8 ${p.color}`} />
                    <span className="text-sm font-medium text-theme-fg-300">
                      {p.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="rounded-2xl border border-theme-bg-300 bg-theme-bg-100/50 p-6">
                <h3 className="text-lg font-semibold text-theme-fg mb-6">
                  Plugin Architecture Highlights
                </h3>
                <div className="space-y-4">
                  {highlights.map((h, i) => (
                    <motion.div
                      key={h}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 flex-shrink-0" />
                      <span className="text-sm text-theme-fg-300">{h}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
