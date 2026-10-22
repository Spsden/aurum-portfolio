"use client";

import { motion } from "framer-motion";
import { Layout, Server, Shield, Cpu } from "lucide-react";

const layers = [
  {
    title: "Frontend",
    icon: Layout,
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
    items: ["Next.js 15 (App Router)", "React 19", "TanStack Query", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Backend",
    icon: Server,
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    items: ["Go (Fiber)", "GORM / PostgreSQL", "Event Bus (in-memory)", "Worker Pool", "Audit Pipeline"],
  },
  {
    title: "Infrastructure",
    icon: Cpu,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    items: ["Docker containers", "SSH node orchestration", "Event-driven automation", "Background workers", "Rate limiting"],
  },
  {
    title: "Security",
    icon: Shield,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    items: ["AES-GCM encryption", "JWT authentication", "RBAC policy engine", "OAuth 2.0 providers", "HMAC webhooks"],
  },
];

export default function NexctlArchitecture() {
  return (
    <section id="architecture" className="relative py-24 overflow-hidden">
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
              Architecture
            </h2>
            <p className="mt-4 text-lg text-theme-fg-300 max-w-2xl mx-auto">
              A modular monolith with event-driven internals and a plugin-based
              provider system designed for scale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {layers.map((layer, i) => (
              <motion.div
                key={layer.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className={`rounded-2xl border ${layer.border} ${layer.bg} p-6`}
              >
                <div className={`w-10 h-10 rounded-lg ${layer.bg} flex items-center justify-center mb-4 ${layer.color}`}>
                  <layer.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-theme-fg mb-4">
                  {layer.title}
                </h3>
                <ul className="space-y-2.5">
                  {layer.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-theme-fg-300">
                      <div className={`w-1.5 h-1.5 rounded-full ${layer.color} flex-shrink-0`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="mt-12 p-6 rounded-2xl border border-theme-bg-300 bg-theme-bg-100/50"
          >
            <h3 className="text-base font-semibold text-theme-fg mb-3">
              Design Decisions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-theme-fg-300">
              <div>
                <span className="font-medium text-theme-fg">Modular Monolith: </span>
                Keeps deployment simple while maintaining clear domain boundaries through Go packages and interfaces.
              </div>
              <div>
                <span className="font-medium text-theme-fg">Event-Driven Core: </span>
                All state changes flow through an in-memory event bus, enabling real-time updates and audit logging without coupling.
              </div>
              <div>
                <span className="font-medium text-theme-fg">Provider Plugin System: </span>
                Providers register capabilities at startup — the frontend and backend adapt dynamically without code changes.
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
