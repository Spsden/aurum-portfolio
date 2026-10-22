"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Check, Container, Globe, Gauge, HardDrive, Package } from "lucide-react";

const capabilities = [
  "SSH-managed Linux node orchestration",
  "Docker container deployment & management",
  "nginx reverse proxy configuration",
  "systemd service management",
  "cron job scheduling",
  "Zero-downtime application deployments",
  "Automated backup cycles",
  "Real-time system metrics & monitoring",
  "Package management across fleets",
];

export default function NexctlInfrastructure() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-stack-headline font-bold text-theme-fg">
              Infrastructure Node Management
            </h2>
            <p className="mt-4 text-lg text-theme-fg-300 max-w-2xl mx-auto">
              Manage your entire server fleet from a single interface — no more
              hopping between SSH sessions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="rounded-2xl overflow-hidden border border-theme-bg-300 shadow-xl">
                <div className="flex items-center gap-2 px-4 py-3 bg-theme-bg-100 border-b border-theme-bg-300">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <span className="text-xs text-theme-fg-400 font-mono ml-2">
                    Infrastructure Nodes
                  </span>
                </div>
                <Image
                  src="/nexctl/s3.png"
                  alt="Infrastructure Nodes Dashboard"
                  width={1200}
                  height={800}
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="space-y-4">
                {capabilities.map((cap, i) => (
                  <motion.div
                    key={cap}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-theme-bg-200 transition-colors"
                  >
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    </div>
                    <span className="text-sm text-theme-fg-300">{cap}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-3 gap-4">
                {[
                  { icon: Container, label: "Docker", color: "text-blue-500" },
                  { icon: Globe, label: "nginx", color: "text-green-500" },
                  { icon: Gauge, label: "Metrics", color: "text-purple-500" },
                  { icon: HardDrive, label: "Backups", color: "text-orange-500" },
                  { icon: Package, label: "Packages", color: "text-cyan-500" },
                ].map((t) => (
                  <div
                    key={t.label}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl border border-theme-bg-300 bg-theme-bg-100/50"
                  >
                    <t.icon className={`w-5 h-5 ${t.color}`} />
                    <span className="text-xs font-medium text-theme-fg-400">{t.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
