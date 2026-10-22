import { PROJECTS, TRAITS_PAGE, USER_DATA, TAG_LINES, BETA } from "./user-data";

export const TERMINAL_THEMES = {
  catppuccin: {
    name: "Catppuccin Mocha",
    bg: "#1e1e2e",
    fg: "#cdd6f4",
    prompt: "#89b4fa",
    accent: "#cba6f7",
    error: "#f38ba8",
    success: "#a6e3a1",
    warning: "#fab387",
    dim: "#6c7086",
    cursor: "#f5e0dc",
    selection: "#45475a",
    border: "#313244",
    heading: "#89b4fa",
    link: "#74c7ec",
  },
  tokyonight: {
    name: "Tokyo Night",
    bg: "#1a1b26",
    fg: "#c0caf5",
    prompt: "#7aa2f7",
    accent: "#bb9af7",
    error: "#f7768e",
    success: "#9ece6a",
    warning: "#e0af68",
    dim: "#565f89",
    cursor: "#c0caf5",
    selection: "#364a82",
    border: "#24283b",
    heading: "#7dcfff",
    link: "#73daca",
  },
  gruvbox: {
    name: "Gruvbox Dark",
    bg: "#282828",
    fg: "#ebdbb2",
    prompt: "#83a598",
    accent: "#d3869b",
    error: "#fb4934",
    success: "#b8bb26",
    warning: "#fabd2f",
    dim: "#928374",
    cursor: "#ebdbb2",
    selection: "#3c3836",
    border: "#3c3836",
    heading: "#8ec07c",
    link: "#83a598",
  },
  nord: {
    name: "Nord",
    bg: "#2e3440",
    fg: "#d8dee9",
    prompt: "#88c0d0",
    accent: "#b48ead",
    error: "#bf616a",
    success: "#a3be8c",
    warning: "#d08770",
    dim: "#616e88",
    cursor: "#d8dee9",
    selection: "#434c5e",
    border: "#3b4252",
    heading: "#8fbcbb",
    link: "#81a1c1",
  },
  dracula: {
    name: "Dracula",
    bg: "#282a36",
    fg: "#f8f8f2",
    prompt: "#bd93f9",
    accent: "#ff79c6",
    error: "#ff5555",
    success: "#50fa7b",
    warning: "#f1fa8c",
    dim: "#6272a4",
    cursor: "#f8f8f2",
    selection: "#44475a",
    border: "#44475a",
    heading: "#8be9fd",
    link: "#ffb86c",
  },
} as const;

export type ThemeKey = keyof typeof TERMINAL_THEMES;

export const DEFAULT_THEME: ThemeKey = "catppuccin";

export const COMMANDS: Record<
  string,
  {
    description: string;
    usage?: string;
    category: string;
  }
> = {
  help: {
    description: "Show available commands",
    category: "general",
  },
  about: {
    description: "About me",
    category: "general",
  },
  whoami: {
    description: "Display current user",
    category: "general",
  },
  pwd: {
    description: "Print working directory",
    category: "general",
  },
  ls: {
    description: "List portfolio sections",
    category: "general",
  },
  neofetch: {
    description: "Display system/portfolio info",
    category: "general",
  },
  projects: {
    description: "List portfolio projects",
    category: "content",
  },
  skills: {
    description: "Show technical skills",
    category: "content",
  },
  stack: {
    description: "Show current tech stack",
    category: "content",
  },
  experience: {
    description: "Show work experience",
    category: "content",
  },
  contact: {
    description: "Show contact information",
    category: "social",
  },
  socials: {
    description: "Show social links",
    category: "social",
  },
  resume: {
    description: "Open resume in browser",
    category: "social",
  },
  theme: {
    description: "Change terminal theme. Usage: theme <name>",
    usage: "theme <name> | theme list",
    category: "settings",
  },
  clear: {
    description: "Clear terminal",
    category: "general",
  },
  ssh: {
    description: "Connect to portfolio. Usage: ssh user@portfolio",
    usage: "ssh user@portfolio",
    category: "fun",
  },
  exit: {
    description: "Exit SSH session",
    category: "fun",
  },
  uptime: {
    description: "Show terminal session uptime",
    category: "general",
  },
  echo: {
    description: "Print text",
    usage: "echo <text>",
    category: "general",
  },
  date: {
    description: "Show current date and time",
    category: "general",
  },
  banner: {
    description: "Display the terminal banner",
    category: "general",
  },
  install: {
    description: "Install pratap package manager easter egg",
    usage: "install pratap",
    category: "fun",
  },
};

export function getAboutOutput(): string[] {
  return [
    `${USER_DATA.name}`,
    `${USER_DATA.jobTitle} at ${USER_DATA.org}`,
    `Based in ${USER_DATA.location}`,
    ``,
    TAG_LINES.subText.pre,
    ``,
    TAG_LINES.subText.post,
  ];
}

export function getWhoamiOutput(): string {
  return USER_DATA.name;
}

export function getPwdOutput(): string {
  return "/portfolio";
}

export function getLsOutput(): string[] {
  return [
    "about/          About me",
    "projects/       Portfolio projects",
    "experience/     Work experience",
    "skills/         Technical skills",
    "stack/          Current tech stack",
    "contact/        Contact information",
    "socials/        Social links",
    "resume/         Download resume",
    "workflow/       Developer workflow",
    "blog/           Blog posts",
  ];
}

export function getNeofetchOutput(): string[] {
  return [
    `         ██████████         ${USER_DATA.name}`,
    `       ██          ██       -----------------`,
    `      ██            ██      OS: macOS / Linux`,
    `     ██              ██     Shell: zsh`,
    `     ██  ██████████  ██     Editor: LazyVim`,
    `     ██  ██████████  ██     Terminal: kitty`,
    `     ██              ██     Location: ${USER_DATA.location}`,
    `      ██            ██      Org: ${USER_DATA.org}`,
    `       ██          ██       Role: ${USER_DATA.jobTitle}`,
    `         ██████████         Portfolio: pratap.world`,
  ];
}

export function getProjectsOutput(): string[] {
  const lines: string[] = [];
  PROJECTS.forEach((p) => {
    lines.push(`\x1b[1m${p.title}\x1b[0m`);
    if (p.subtitle) lines.push(`  ${p.subtitle}`);
    lines.push(`  ${p.description}`);
    if (p.techs && p.techs.length > 0)
      lines.push(`  Tech: ${p.techs.join(", ")}`);
    if (p.github) lines.push(`  GitHub: ${p.github}`);
    if (p.live) lines.push(`  Live: ${p.live}`);
    if (p.page) lines.push(`  Page: /${p.page}`);
    lines.push("");
  });
  return lines;
}

export function getSkillsOutput(): string[] {
  const skills = [
    { category: "Languages", items: ["Go", "TypeScript", "Python", "JavaScript", "Bash"] },
    {
      category: "Backend",
      items: ["Go (Fiber, goroutines)", "Node.js (Express)", "Spring Boot", "FastAPI", "REST APIs"],
    },
    {
      category: "Databases",
      items: ["PostgreSQL", "Redis", "GORM (ORM)", "MySQL"],
    },
    {
      category: "Frontend",
      items: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    },
    {
      category: "DevOps",
      items: [
        "Docker",
        "Docker Compose",
        "CI/CD",
        "Kubernetes (kubectl)",
        "SSH",
        "nginx",
        "systemd",
      ],
    },
    {
      category: "Tools",
      items: [
        "Neovim / LazyVim",
        "Git / lazygit",
        "ZSH / tmux / Kitty",
        "ripgrep / fd / jq / bat",
        "Makefile",
      ],
    },
    {
      category: "Security",
      items: ["JWT", "AES-GCM", "RBAC", "HTTP-only cookies", "Token rotation"],
    },
    {
      category: "AI / ML",
      items: ["Langchain", "RAG", "LLM integration"],
    },
  ];
  const lines: string[] = [];
  skills.forEach((s) => {
    lines.push(`\x1b[1m${s.category}\x1b[0m`);
    s.items.forEach((item) => lines.push(`  → ${item}`));
    lines.push("");
  });
  return lines;
}

export function getExperienceOutput(): string[] {
  const lines: string[] = [];
  TRAITS_PAGE.forEach((exp) => {
    lines.push(`\x1b[1m${exp.heading}\x1b[0m`);
    lines.push(`  ${exp.date}`);
    lines.push(`  ${exp.intro}`);
    lines.push("");
    exp.items.forEach((item) => {
      lines.push(`  \x1b[36m•\x1b[0m ${item.title}`);
      lines.push(`    ${item.body}`);
      lines.push("");
    });
    lines.push("───");
    lines.push("");
  });
  return lines;
}

export function getContactOutput(): string[] {
  return [
    `Email:    ${USER_DATA.email}`,
    `Location: ${USER_DATA.location}`,
    `Org:      ${USER_DATA.org}`,
    `Resume:   ${USER_DATA.resume}`,
    "",
    "Type 'socials' for social links",
    "Type 'resume' to open resume",
  ];
}

export function getSocialsOutput(): string[] {
  const socials = [
    { name: "GitHub", url: USER_DATA.github },
    { name: "LinkedIn", url: USER_DATA.linkedin },
    { name: "Twitter", url: USER_DATA.twitter },
    { name: "Instagram", url: USER_DATA.instagram },
    { name: "Facebook", url: USER_DATA.facebook },
  ];
  return socials.map((s) => `${s.name}: ${s.url}`);
}

export function getStackOutput(): string[] {
  const stack = [
    { category: "Language", items: "Go, TypeScript, Python" },
    { category: "Framework", items: "Fiber, Express, Spring Boot, FastAPI" },
    { category: "Database", items: "PostgreSQL, Redis" },
    { category: "Frontend", items: "Next.js, React, Tailwind CSS" },
    { category: "Infra", items: "Docker, SSH, nginx, systemd" },
    { category: "Editor", items: "LazyVim (Neovim)" },
    { category: "Terminal", items: "Kitty + ZSH + tmux + Starship" },
    { category: "CI/CD", items: "GitHub Actions, Custom pipelines" },
  ];
  return stack.map((s) => `\x1b[1m${s.category}:\x1b[0m ${s.items}`);
}

export function getInstallOutput(): string[] {
  const steps = [
    "\x1b[36m◼\x1b[0m Resolving dependencies...",
    "\x1b[33m◼\x1b[0m Fetching packages: pratap-core, pratap-cli, pratap-ai",
    "\x1b[33m◼\x1b[0m Building dependency graph...",
    "\x1b[32m✓\x1b[0m pratap-core@latest installed",
    "\x1b[32m✓\x1b[0m pratap-cli@latest installed",
    "\x1b[32m✓\x1b[0m pratap-ai@latest installed",
    "",
    "\x1b[32m✓\x1b[0m Successfully installed pratap v1.0.0",
    "",
    "\x1b[1mPackage contains:\x1b[0m",
    "  • Backend engineering expertise",
    "  • Distributed systems knowledge",
    "  • Secure architecture patterns",
    "  • Performance optimization skills",
    "  • 2+ years of production experience",
    "  • ∞ cups of coffee",
    "",
    "\x1b[33mUsage:\x1b[0m pratap [build] [scale] [optimize] [deploy]",
    "\x1b[33mDocs:\x1b[0m https://pratap.world/workflow",
  ];
  return steps;
}

export const BOOT_SEQUENCE = [
  { msg: "[  \x1b[32mOK\x1b[0m  ] Loading kernel modules", delay: 80 },
  { msg: "[  \x1b[32mOK\x1b[0m  ] Initializing terminal environment", delay: 60 },
  { msg: "[  \x1b[32mOK\x1b[0m  ] Connecting to portfolio database", delay: 100 },
  { msg: "[  \x1b[32mOK\x1b[0m  ] Loading user data", delay: 50 },
  { msg: "[  \x1b[32mOK\x1b[0m  ] Setting up command interface", delay: 70 },
];
