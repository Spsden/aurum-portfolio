export const WORKFLOW_IMAGES = {
  macbook: "/workflow/macbook.jpg",
  ubuntu: "/workflow/ubuntu.jpg",
  lazyvim: "/workflow/lazyvim.jpg",
  terminal: "/workflow/terminal.jpg",
  cli: "/workflow/cli.jpg",
  devEnv: "/workflow/dev-env.jpg",
  productivity: "/workflow/productivity.jpg",
};

export const WORKFLOW_HERO = {
  heading: "My Developer Workflow",
  subheading:
    "A behind-the-scenes look at the tools, systems, and engineering environment behind the work.",
  tags: [
    "Macbook M1",
    "Ubuntu",
    "LazyVim",
    "Terminal-first",
    "Backend Engineering",
    "AI-assisted Development",
  ],
};

export const SETUP_OVERVIEW = [
  {
    title: "Macbook M1",
    description:
      "Apple M1 chip with 16GB RAM running macOS. Primary machine for daily development, handling everything from code to containers.",
    image: WORKFLOW_IMAGES.macbook,
    tags: ["Apple Silicon", "16GB", "macOS"],
  },
  {
    title: "Ubuntu Environment",
    description:
      "Linux environment for server-side development. Docker containers, SSH sessions, and backend services run seamlessly.",
    image: WORKFLOW_IMAGES.ubuntu,
    tags: ["Linux", "Docker", "SSH"],
  },
  {
    title: "LazyVim",
    description:
      "Neovim configured with LazyVim starter template. Full LSP support, Treesitter, Telescope, and a plugin ecosystem tailored for backend engineering.",
    image: WORKFLOW_IMAGES.lazyvim,
    tags: ["Neovim", "LSP", "Treesitter", "Telescope"],
  },
  {
    title: "Terminal Workflow",
    description:
      "Kitty terminal with ZSH, Starship prompt, tmux for multiplexing. Everything happens in the terminal—Git, Docker, SSH, scripting.",
    image: WORKFLOW_IMAGES.terminal,
    tags: ["Kitty", "ZSH", "tmux", "Starship"],
  },
  {
    title: "CLI Tooling",
    description:
      "Core CLI tools: Git, Docker, kubectl, jq, ripgrep, fd, lazygit, bat. A curated set that eliminates context switching.",
    image: WORKFLOW_IMAGES.cli,
    tags: ["Git", "Docker", "lazygit", "ripgrep"],
  },
  {
    title: "Development Environment",
    description:
      "Consistent dev environments with Docker Compose, makefiles, and reproducible builds. Minimal setup friction across projects.",
    image: WORKFLOW_IMAGES.devEnv,
    tags: ["Docker Compose", "Makefile", "Reproducible"],
  },
  {
    title: "Productivity Tools",
    description:
      "Arc browser, Obsidian for notes, Linear for issue tracking, Warp for AI-enhanced terminal sessions.",
    image: WORKFLOW_IMAGES.productivity,
    tags: ["Arc", "Obsidian", "Linear", "Warp"],
  },
];

export const EDITOR_SECTION = {
  heading: "LazyVim — Keyboard-Driven Engineering",
  intro:
    "The editor is where the craft happens. LazyVim transforms Neovim into an IDE with the speed of Vim and the intelligence of modern LSP.",
  highlights: [
    {
      title: "Language Server Protocol (LSP)",
      body: "Real-time diagnostics, auto-completions, go-to-definition, hover information, and code actions for Go, TypeScript, Python, and more. The editor understands your code at the AST level.",
    },
    {
      title: "Treesitter Syntax",
      body: "Incremental parsing powered by Treesitter gives accurate, fast syntax highlighting and text object selection based on the syntax tree—not regex patterns.",
    },
    {
      title: "Telescope Fuzzy Finder",
      body: "Blazing-fast fuzzy search for files, buffers, git commits, help tags, and live grep across the entire project. The primary navigation interface.",
    },
    {
      title: "Git Integration",
      body: "Lazygit integration alongside Neovim's native git tools. Blame, diff, staging, and history inspection without leaving the editor.",
    },
    {
      title: "Terminal Multiplexing",
      body: "tmux integration with seamless pane navigation. Running tests, builds, and servers in split panes while editing in another.",
    },
    {
      title: "Plugin Ecosystem",
      body: "Curated plugin set via Lazy.nvim: which-key, noice, flash, mini.pairs, oil.nvim, among others. Each selected for deliberate purpose.",
    },
  ],
};

export const TERMINAL_SECTION = {
  heading: "Terminal & CLI Workflow",
  intro:
    "The terminal is the command center. Every engineering task flows through it—from Git operations to container management to server administration.",
  commands: [
    {
      cmd: "git log --oneline --graph --decorate",
      desc: "Visual commit history",
    },
    { cmd: "docker compose up -d", desc: "Spin up development services" },
    {
      cmd: "ssh user@server -i ~/.ssh/id_ed25519",
      desc: "Server access with key-based auth",
    },
    {
      cmd: "rg --no-heading -n 'pattern' src/",
      desc: "Fast recursive search with ripgrep",
    },
    { cmd: "lazygit", desc: "Terminal UI for Git operations" },
    {
      cmd: "kubectl get pods --watch",
      desc: "Monitor Kubernetes pods",
    },
  ],
  tools: [
    {
      name: "ZSH",
      desc: "Shell with completions, syntax highlighting, and history substring search.",
    },
    {
      name: "Starship Prompt",
      desc: "Minimal, fast prompt with contextual Git, Docker, and language info.",
    },
    {
      name: "tmux",
      desc: "Terminal multiplexer for session persistence and split-pane workflows.",
    },
    {
      name: "Kitty",
      desc: "GPU-accelerated terminal emulator with excellent font rendering.",
    },
  ],
};

export const OS_SECTION = {
  heading: "Operating Systems",
  intro:
    "A dual-environment setup that leverages the strengths of each OS for development and infrastructure work.",
  systems: [
    {
      name: "Macbook M1",
      role: "Primary Development Machine",
      specs: "Apple M1 · 16GB RAM · 512GB SSD · macOS Sonoma",
      description:
        "Daily driver for coding, containers, design, and communication. macOS provides a polished UNIX environment with native Docker support and a vast ecosystem of developer tools.",
      image: WORKFLOW_IMAGES.macbook,
    },
    {
      name: "Ubuntu",
      role: "Server & Infrastructure Environment",
      specs: "Linux · Docker · SSH · Cloud VMs",
      description:
        "Ubuntu powers the server-side workflow. SSH sessions to cloud instances, container orchestration, and infrastructure management all happen in a terminal-first Linux environment.",
      image: WORKFLOW_IMAGES.ubuntu,
    },
  ],
  note: "The combination provides the best of both worlds: macOS for a polished daily driver with native UNIX tooling, and Ubuntu for server-native development. Tooling is kept consistent across both environments via dotfiles and Docker.",
};

export const AI_SECTION = {
  heading: "AI-Assisted Development",
  intro:
    "Practical AI integration into daily engineering work—not for writing code wholesale, but for accelerating the thoughtful parts of development.",
  useCases: [
    {
      title: "Debugging",
      body: "AI helps narrow down root causes faster by analyzing error patterns, suggesting potential fixes, and pointing to relevant documentation.",
    },
    {
      title: "Architecture Exploration",
      body: "Rapidly exploring architectural options, trade-offs, and design patterns before committing to an implementation.",
    },
    {
      title: "Documentation",
      body: "Generating docstrings, API documentation, and inline comments from code structure—reducing the friction of documenting as you go.",
    },
    {
      title: "Refactoring",
      body: "Identifying refactoring opportunities, suggesting safer type signatures, and generating migration patterns for larger code changes.",
    },
    {
      title: "Boilerplate Reduction",
      body: "Automating repetitive code patterns: CRUD endpoints, database schemas, test stubs, and configuration files.",
    },
    {
      title: "Learning",
      body: "Exploring unfamiliar codebases, understanding library patterns, and getting contextual explanations without context-switching to browser tabs.",
    },
  ],
  principle:
    "AI is a thinking amplifier, not a replacement for engineering judgment. Every suggestion is reviewed, understood, and adapted before it reaches production.",
};

export const PRINCIPLES_SECTION = {
  heading: "Workflow Principles",
  intro:
    "A set of engineering principles that guide tooling choices, workflow design, and daily development habits.",
  principles: [
    {
      title: "Keyboard-First",
      body: "Minimize mouse dependency. Vim motions, tmux keybindings, and CLI tools keep hands on the keyboard and flow uninterrupted.",
    },
    {
      title: "Reproducibility",
      body: "Docker Compose, dotfiles, and makefiles ensure any environment can be recreated in minutes. No manual setup steps.",
    },
    {
      title: "Automation Over Repetition",
      body: "If a task is done more than twice, script it. CI/CD, git hooks, aliases, and custom scripts eliminate repetitive manual work.",
    },
    {
      title: "Minimal Context Switching",
      body: "The terminal and editor handle Git, Docker, file management, and code. Fewer tools means fewer mental context switches.",
    },
    {
      title: "Clean Developer UX",
      body: "Fast feedback loops, readable output, consistent tooling across projects. Developer experience is treated as a first-class concern.",
    },
    {
      title: "Simplicity",
      body: "Choose the right tool for the job. Avoid over-engineering workflows. A simple, well-understood toolset beats a complex one every time.",
    },
  ],
};
