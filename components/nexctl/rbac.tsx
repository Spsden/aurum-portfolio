"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Shield, Lock, Key, FileKey, Eye } from "lucide-react";

const permissions = [
  "deny-by-default RBAC engine",
  "JSON policy document evaluation",
  "Pre-built role templates (admin, engineer, viewer)",
  "Provider-scoped permission boundaries",
  "AES-GCM encrypted credential vault",
  "JWT-based API authentication",
  "HMAC webhook signature verification",
  "Immutable audit trails with correlation IDs",
];

const policyExample = `{
  "role": "infra-engineer",
  "permissions": {
    "nodes": ["read", "exec"],
    "jobs": ["create", "read"],
    "providers": ["read"],
    "rbac": ["read"]
  },
  "scope": ["prod-eu-*", "staging-*"]
}`;

export default function NexctlRBAC() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-theme-bg via-theme-bg-100/50 to-theme-bg pointer-events-none" />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-theme-bg-300 bg-theme-bg-200/80 text-xs font-medium text-theme-fg-400 mb-4">
              <Shield className="w-3.5 h-3.5" />
              Security & Access Control
            </div>
            <h2 className="text-3xl sm:text-4xl font-stack-headline font-bold text-theme-fg">
              Enterprise-Grade RBAC
            </h2>
            <p className="mt-4 text-lg text-theme-fg-300 max-w-2xl mx-auto">
              Deny-by-default access control with granular permissions,
              encrypted secrets, and complete audit trails.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <div className="space-y-3">
                {permissions.map((p, i) => (
                  <motion.div
                    key={p}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-theme-bg-200 transition-colors"
                  >
                    <Lock className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-theme-fg-300">{p}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="mt-8 rounded-xl overflow-hidden border border-theme-bg-300 bg-theme-bg-200"
              >
                <div className="flex items-center gap-2 px-4 py-2.5 bg-theme-bg-100 border-b border-theme-bg-300">
                  <FileKey className="w-4 h-4 text-theme-fg-400" />
                  <span className="text-xs font-mono text-theme-fg-400">policy.json</span>
                </div>
                <pre className="p-4 text-xs font-mono text-theme-fg-300 overflow-x-auto leading-relaxed">
                  {policyExample}
                </pre>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="order-1 lg:order-2"
            >
              <div className="rounded-2xl overflow-hidden border border-theme-bg-300 shadow-xl">
                <div className="flex items-center gap-2 px-4 py-3 bg-theme-bg-100 border-b border-theme-bg-300">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <span className="text-xs text-theme-fg-400 font-mono ml-2">
                    Access Control
                  </span>
                </div>
                <Image
                  src="/nexctl/s2.png"
                  alt="RBAC Access Control"
                  width={1200}
                  height={800}
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
