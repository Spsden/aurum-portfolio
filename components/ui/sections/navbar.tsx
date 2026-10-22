"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { BETA, USER_DATA } from "@/content/user-data";
import ThemeToggle from "../enhancers/theme-toggle";

// Demo pages from the original template. Commented out on purpose:
//   /system  — system metrics dashboard (removed)
//   /blogs   — blog section (removed)
//   /cli     — original author's CLI demo
//   /voidnote — original author's product page
// Uncomment any of these if you want the page linked again.
const NAV_LINKS = [
  // { href: "/system", label: "System" },
  // { href: "/blogs", label: "Blog" },
  // { href: "/cli", label: "CLI" },
  // { href: "/voidnote", label: "VoidNote" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#projects", label: "Projects" },
] as const;

const navLinkClass =
  "text-sm font-medium text-theme-fg-300 hover:text-accent transition-colors relative after:absolute after:bottom-[-2px] after:left-0 after:h-[1.5px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full";

export default function Navbar() {
  const prefersReduced = useReducedMotion();

  return (
    <motion.nav
      initial={prefersReduced ? undefined : { opacity: 0, y: -12 }}
      animate={prefersReduced ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="w-full flex flex-wrap items-center gap-y-4 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-4 sm:py-6 md:py-8 lg:py-10 bg-theme-bg-100 border-b border-theme-bg-300"
    >
      <Link
        href="/"
        className="text-base sm:text-xl md:text-2xl font-semibold font-stack-headline text-theme-fg flex items-center gap-2"
      >
        {USER_DATA.name}
        {BETA && (
          <span className="px-2 py-0.5 text-xs font-medium rounded-md bg-amber-200 dark:bg-amber-800 text-amber-900 dark:text-amber-100">
            BETA
          </span>
        )}
      </Link>

      <div className="order-3 mt-1 flex w-full items-center justify-end gap-4 sm:order-none sm:mt-0 sm:ml-auto sm:w-auto sm:gap-6">
        {NAV_LINKS.map((link) => (
          <Link key={link.href} href={link.href} className={navLinkClass}>
            {link.label}
          </Link>
        ))}
        <ThemeToggle />
      </div>
    </motion.nav>
  );
}
