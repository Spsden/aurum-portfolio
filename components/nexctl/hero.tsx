"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowDown, LayoutDashboard, Shield, Terminal } from "lucide-react";

export default function NexctlHero() {

  const nexCtlUrl = "https://nexctl.pratap.world"


  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-theme-bg to-theme-bg pointer-events-none z-10" />

      <motion.div
        className="absolute top-1/4 -left-32 w-96 h-96 bg-indigo-500/20 dark:bg-indigo-500/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-32 w-80 h-80 bg-cyan-500/20 dark:bg-cyan-500/10 rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-500/10 dark:bg-violet-500/5 rounded-full blur-3xl"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-theme-bg-300 bg-theme-bg-200/80 text-xs font-medium text-theme-fg-400 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Cloud-Agnostic Infrastructure Control Plane
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-stack-headline font-bold leading-tight text-theme-fg">
              One Unified{" "}
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                Control Plane
              </span>{" "}
              for Infrastructure
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-theme-fg-300 leading-relaxed max-w-xl">
              Manage servers, cloud providers, automation, and permissions from
              a single platform. Built for DevOps and platform teams who need
              enterprise-grade infrastructure orchestration.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#features"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-theme-fg text-theme-bg font-semibold text-sm hover:opacity-90 transition-all"
              >
                Explore Architecture
                <ArrowDown className="w-4 h-4" />
              </a>
              <a
                href="https://nexctl.pratap.world/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-theme-bg-300 text-theme-fg-200 hover:bg-theme-bg-200 transition-all text-sm font-medium"
              >
                Visit
                {/* <ArrowDown className="w-4 h-4" /> */}
              </a>
            </div>

            <div className="mt-10 flex items-center gap-6 text-theme-fg-400 text-sm">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                <span>SSH Orchestration</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>RBAC</span>
              </div>
              <div className="flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4" />
                <span>Docker Jobs</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-theme-bg-300 shadow-2xl">
              <div className="flex items-center gap-2 px-4 py-3 bg-theme-bg-100 border-b border-theme-bg-300">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-xs text-theme-fg-400 font-mono ml-2">
                  Nexctl Dashboard
                </span>
              </div>
              <Image
                src="/nexctl/s1.png"
                alt="Nexctl Dashboard"
                width={1200}
                height={800}
                className="w-full h-auto object-cover"
                priority
              />
            </div>

            <motion.div
              className="absolute -bottom-6 -left-6 p-4 rounded-xl bg-theme-bg-100 border border-theme-bg-300 shadow-lg hidden md:block"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <p className="text-xs text-theme-fg-400">Access Control</p>
                  <p className="text-sm font-semibold text-theme-fg">RBAC Active</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -top-4 -right-4 p-4 rounded-xl bg-theme-bg-100 border border-theme-bg-300 shadow-lg hidden md:block"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                  <Terminal className="w-5 h-5 text-cyan-500" />
                </div>
                <div>
                  <p className="text-xs text-theme-fg-400">Nodes Online</p>
                  <p className="text-sm font-semibold text-theme-fg">12 Active</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
