"use client";

import { motion } from "framer-motion";
import { Cloud, Server, Users, Shield } from "lucide-react";
import { useEffect, useState } from "react";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [target]);

  return (
    <span>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

const metrics = [
  { value: 12, suffix: "+", label: "Provider Integrations", icon: Cloud },
  { value: 500, suffix: "+", label: "Infrastructure Nodes", icon: Server },
  { value: 8, suffix: "", label: "RBAC Role Templates", icon: Users },
  { value: 99, suffix: ".9%", label: "Audit Coverage", icon: Shield },
];

export default function NexctlOverview() {
  return (
    <section id="overview" className="relative py-24">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-stack-headline font-bold text-theme-fg">
                Why Build Another Infrastructure Platform?
              </h2>
              <div className="mt-6 space-y-4 text-theme-fg-300 leading-relaxed">
                <p>
                  Modern infrastructure teams juggle AWS consoles, Cloudflare
                  dashboards, SSH terminals, CI/CD pipelines, and permission
                  systems — none of which talk to each other. Nexctl was built
                  to solve this fragmentation.
                </p>
                <p>
                  It is a cloud-agnostic control plane that unifies provider
                  integrations, SSH node orchestration, RBAC, Docker-isolated
                  job execution, OAuth token management, and audit logging into
                  a single, cohesive platform.
                </p>
                <p>
                  The system follows a modular monolith architecture with an
                  event-driven Go backend, a dynamic Next.js frontend, and a
                  plugin-based provider system that auto-registers capabilities.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                {["DevOps Engineers", "Platform Teams", "Cloud Architects", "Infra Teams"].map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1.5 text-xs font-medium rounded-full border border-theme-bg-300 bg-theme-bg-200 text-theme-fg-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {metrics.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="p-6 rounded-2xl border border-theme-bg-300 bg-theme-bg-100/50"
                >
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-4">
                    <m.icon className="w-5 h-5 text-indigo-500" />
                  </div>
                  <div className="text-3xl font-bold font-stack-headline text-theme-fg">
                    <AnimatedCounter target={m.value} suffix={m.suffix} />
                  </div>
                  <p className="mt-1 text-sm text-theme-fg-400">{m.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
