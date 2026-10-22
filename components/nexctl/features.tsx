"use client";

import { motion } from "framer-motion";
import {
  Puzzle,
  Terminal,
  Shield,
  Container,
  Key,
  ScrollText,
  Workflow,
  Webhook,
  Activity,
} from "lucide-react";

const features = [
  {
    icon: Puzzle,
    title: "Provider Plugin Architecture",
    description:
      "A plugin system that auto-registers providers with reusable capability detection. Each provider declares its capabilities — resources, actions, auth schemes — and the platform adapts dynamically.",
    gradient: "from-indigo-500/20 to-purple-500/20",
    iconColor: "text-indigo-500",
  },
  {
    icon: Terminal,
    title: "SSH Infrastructure Orchestration",
    description:
      "Manage Linux nodes via SSH with structured operations for Docker, nginx, systemd, cron, deployments, backups, and package management — all from a central dashboard.",
    gradient: "from-cyan-500/20 to-blue-500/20",
    iconColor: "text-cyan-500",
  },
  {
    icon: Shield,
    title: "RBAC with Policy Engine",
    description:
      "Deny-by-default role-based access control with JSON policy documents, role templates, and provider-scoped permissions. Every API request is authorized against the policy store.",
    gradient: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-500",
  },
  {
    icon: Container,
    title: "Docker-Isolated Job Runner",
    description:
      "Execute Python, Bash, and Node scripts in isolated Docker containers with configurable CPU/memory limits, encrypted secrets injection, and automatic retry logic.",
    gradient: "from-orange-500/20 to-amber-500/20",
    iconColor: "text-orange-500",
  },
  {
    icon: Key,
    title: "OAuth Token Management",
    description:
      "Centralized OAuth token lifecycle management with automatic refresh, encrypted storage, and provider-scoped credential injection. Supports GitHub, Google, and custom providers.",
    gradient: "from-pink-500/20 to-rose-500/20",
    iconColor: "text-pink-500",
  },
  {
    icon: ScrollText,
    title: "Audit Logging & Event Bus",
    description:
      "Every operation is recorded with correlation IDs across the event bus. Full audit trails for compliance, with structured logs and real-time event streaming.",
    gradient: "from-violet-500/20 to-purple-500/20",
    iconColor: "text-violet-500",
  },
  {
    icon: Workflow,
    title: "Dynamic Provider Workspace",
    description:
      "Provider-driven frontend rendering where each provider contributes its own UI components, actions, and notification handlers — registered at runtime through the plugin system.",
    gradient: "from-blue-500/20 to-indigo-500/20",
    iconColor: "text-blue-500",
  },
  {
    icon: Webhook,
    title: "Webhook Processing",
    description:
      "Ingest and verify webhooks from GitHub, Cloudflare, and others with HMAC signature validation. Route events to provider handlers through the internal event bus.",
    gradient: "from-amber-500/20 to-yellow-500/20",
    iconColor: "text-amber-500",
  },
  {
    icon: Activity,
    title: "Real-Time Infrastructure Ops",
    description:
      "Streaming terminal sessions, live node metrics, and real-time job logs. WebSocket-powered updates keep the dashboard synchronized with infrastructure state.",
    gradient: "from-cyan-500/20 to-sky-500/20",
    iconColor: "text-cyan-500",
  },
];

export default function NexctlFeatures() {
  return (
    <section id="features" className="relative py-24">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-stack-headline font-bold text-theme-fg">
            Everything Infrastructure Teams Need
          </h2>
          <p className="mt-4 text-lg text-theme-fg-300 max-w-2xl mx-auto">
            From provider integrations to job execution, Nexctl provides a
            unified toolkit for managing modern infrastructure.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="group relative p-6 rounded-2xl border border-theme-bg-300 bg-theme-bg-100/50 hover:border-theme-bg-400 transition-all duration-300"
            >
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              <div className="relative z-10">
                <div className={`w-10 h-10 rounded-lg bg-theme-bg-200 flex items-center justify-center mb-4 ${feature.iconColor}`}>
                  <feature.icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-theme-fg mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-theme-fg-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
