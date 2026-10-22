"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Play, Clock, RotateCcw, Cpu, MemoryStick, KeyRound } from "lucide-react";

const terminalLog = `$ nexctl job run --image python:3.12 --script deploy.py
[nexctl] Creating job container...
[nexctl] Isolating with Docker...
[nexctl] Injecting encrypted secrets...
[nexctl] Executing: python deploy.py
✓ Deployment complete (2.4s)
[nexctl] Cleaning up container...
✓ Job finished — exit code 0`;

const jobFeatures = [
  { icon: Play, label: "Python / Bash / Node runtimes" },
  { icon: Clock, label: "Scheduled & on-demand execution" },
  { icon: RotateCcw, label: "Automatic retry with backoff" },
  { icon: Cpu, label: "Configurable CPU limits" },
  { icon: MemoryStick, label: "Memory allocation controls" },
  { icon: KeyRound, label: "Encrypted secrets injection" },
];

export default function NexctlJobs() {
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
              Docker-Isolated Job Runner
            </h2>
            <p className="mt-4 text-lg text-theme-fg-300 max-w-2xl mx-auto">
              Execute automation scripts in isolated environments with resource
              controls, retry logic, and built-in secrets management.
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
                    Infrastructure Jobs
                  </span>
                </div>
                <Image
                  src="/nexctl/s4.png"
                  alt="Infrastructure Jobs Dashboard"
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
              <div className="grid grid-cols-2 gap-3 mb-8">
                {jobFeatures.map((f) => (
                  <div
                    key={f.label}
                    className="flex items-center gap-3 p-3 rounded-xl border border-theme-bg-300 bg-theme-bg-100/50"
                  >
                    <f.icon className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                    <span className="text-xs text-theme-fg-300">{f.label}</span>
                  </div>
                ))}
              </div>

              <div className="rounded-xl overflow-hidden border border-gray-700 bg-gray-950">
                <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 border-b border-gray-800">
                  <TerminalIcon />
                  <span className="text-xs font-mono text-gray-400">terminal</span>
                </div>
                <pre className="p-4 text-xs font-mono text-green-400 overflow-x-auto leading-relaxed">
                  {terminalLog}
                </pre>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TerminalIcon() {
  return (
    <svg
      className="w-4 h-4 text-gray-400"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  );
}
