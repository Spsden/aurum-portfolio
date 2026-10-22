"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  COMMANDS,
  TERMINAL_THEMES,
  BOOT_SEQUENCE,
  DEFAULT_THEME,
  getAboutOutput,
  getWhoamiOutput,
  getPwdOutput,
  getLsOutput,
  getNeofetchOutput,
  getProjectsOutput,
  getSkillsOutput,
  getExperienceOutput,
  getContactOutput,
  getSocialsOutput,
  getStackOutput,
  getInstallOutput,
  type ThemeKey,
} from "@/content/cli-data";
import { USER_DATA } from "@/content/user-data";

type Theme = (typeof TERMINAL_THEMES)[ThemeKey];

type Line = {
  id: number;
  html: string;
};

function stripAnsi(html: string): string {
  return html.replace(/\x1b\[1m/g, "<strong>").replace(/\x1b\[0m/g, "</strong>").replace(/\x1b\[36m/g, '<span style="color:var(--cli-accent)">').replace(/\x1b\[32m/g, '<span style="color:var(--cli-success)">').replace(/\x1b\[33m/g, '<span style="color:var(--cli-warning)">').replace(/\x1b\[31m/g, '<span style="color:var(--cli-error)">');
}

function closeSpans(html: string): string {
  let count = (html.match(/<span/g) || []).length;
  let closeCount = (html.match(/<\/span>/g) || []).length;
  let result = html;
  while (closeCount < count) {
    result += "</span>";
    closeCount++;
  }
  return result;
}

function ansiToHtml(text: string): string {
  return closeSpans(stripAnsi(text));
}

const COMMAND_LIST = Object.keys(COMMANDS).sort();

function getAutocompleteMatches(input: string): string[] {
  if (!input) return [];
  return COMMAND_LIST.filter((cmd) => cmd.startsWith(input) && cmd !== input);
}

export default function Terminal() {
  const [booted, setBooted] = useState(false);
  const [lines, setLines] = useState<Line[]>([{ id: 0, html: "" }]);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [mode, setMode] = useState<"insert" | "normal">("insert");
  const [theme, setTheme] = useState<Theme>(TERMINAL_THEMES[DEFAULT_THEME]);
  const [sshMode, setSshMode] = useState(false);
  const [autocompleteIndex, setAutocompleteIndex] = useState(-1);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [bootMsgs, setBootMsgs] = useState<number>(0);
  const [startTime] = useState(Date.now());
  const [sessionId] = useState(() => Math.random().toString(36).slice(2, 8));

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(1);

  const addLine = useCallback((html: string) => {
    const id = nextId.current++;
    setLines((prev) => [...prev, { id, html }]);
  }, []);

  const addLines = useCallback(
    (items: string[]) => {
      items.forEach((line) => addLine(ansiToHtml(line)));
    },
    [addLine],
  );

  const clearLines = useCallback(() => {
    setLines([]);
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function boot() {
      for (let i = 0; i < BOOT_SEQUENCE.length; i++) {
        if (cancelled) break;
        await new Promise((r) => setTimeout(r, BOOT_SEQUENCE[i].delay));
        if (cancelled) break;
        setBootMsgs(i + 1);
      }
      if (!cancelled) {
        setBooted(true);
        addLine("");
        addLine(
          `Welcome to <strong>pratap</strong>'s portfolio terminal v1.0.0`,
        );
        addLine(`Session: ${sessionId}`);
        addLine(`Type '<strong>help</strong>' to get started.`);
        addLine(`Type '<strong>neofetch</strong>' for system info.`);
        addLine("");
        focusInput();
      }
    }
    boot();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const prompt = sshMode ? "user@portfolio ~ %" : "guest@pratap ~ %";

  const executeCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim();
      const parts = trimmed.split(/\s+/);
      const command = parts[0].toLowerCase();
      const args = parts.slice(1);

      addLine(
        `<span style="color:var(--cli-prompt)">${prompt}</span> ${ansiToHtml(trimmed)}`,
      );

      if (!trimmed) return;

      setCommandHistory((prev) => [...prev, trimmed]);
      setHistoryIndex(-1);

      switch (command) {
        case "help": {
          addLine("");
          addLine("<strong>Available Commands:</strong>");
          addLine("");

          const categories: Record<string, string[]> = {};
          Object.entries(COMMANDS).forEach(([name, def]) => {
            if (!categories[def.category]) categories[def.category] = [];
            categories[def.category].push(name);
          });

          Object.entries(categories).forEach(([cat, cmds]) => {
            addLine(
              `  <span style="color:var(--cli-dim)">${cat}</span>`,
            );
            cmds.forEach((c) => {
              const def = COMMANDS[c];
              const usage = def.usage ? ` — ${def.usage}` : "";
              addLine(
                `    <strong>${c}</strong>${usage}\n    ${def.description}`,
              );
            });
            addLine("");
          });
          break;
        }

        case "about":
          addLines(getAboutOutput());
          break;

        case "whoami":
          addLine(getWhoamiOutput());
          break;

        case "pwd":
          addLine(getPwdOutput());
          break;

        case "ls":
          addLines(getLsOutput());
          break;

        case "neofetch":
          addLines(getNeofetchOutput());
          break;

        case "projects":
          addLines(getProjectsOutput());
          break;

        case "skills":
          addLines(getSkillsOutput());
          break;

        case "stack":
          addLines(getStackOutput());
          break;

        case "experience":
          addLines(getExperienceOutput());
          break;

        case "contact":
          addLines(getContactOutput());
          break;

        case "socials":
          addLines(getSocialsOutput());
          break;

        case "resume": {
          addLine("Opening resume in browser...");
          window.open(USER_DATA.resume, "_blank");
          break;
        }

        case "theme": {
          const themeArg = args[0]?.toLowerCase();
          if (themeArg === "list") {
            addLine("Available themes:");
            Object.entries(TERMINAL_THEMES).forEach(([key, t]) => {
              const indicator =
                t.name === theme.name ? " \x1b[32m← active\x1b[0m" : "";
              addLine(`  ${key}${ansiToHtml(indicator)}`);
            });
          } else if (themeArg && TERMINAL_THEMES[themeArg as ThemeKey]) {
            setTheme(TERMINAL_THEMES[themeArg as ThemeKey]);
            addLine(
              `Theme switched to <strong>${TERMINAL_THEMES[themeArg as ThemeKey].name}</strong>`,
            );
          } else if (themeArg) {
            addLine(
              `\x1b[31mError:\x1b[0m Unknown theme "${themeArg}". Type 'theme list' for available themes.`,
            );
          } else {
            addLine(
              `Current theme: <strong>${theme.name}</strong>`,
            );
            addLine(`Type 'theme list' for all themes.`);
          }
          break;
        }

        case "clear":
          clearLines();
          break;

        case "ssh": {
          const target = args[0]?.toLowerCase();
          if (target === "user@portfolio") {
            if (sshMode) {
              addLine("Already connected to portfolio.");
              break;
            }
            addLine("");
            addLine(
              `<span style="color:var(--cli-warning)">Connecting to portfolio...</span>`,
            );
            setTimeout(() => {
              addLine(
                `<span style="color:var(--cli-success)">✓ Authenticated</span>`,
              );
            }, 200);
            setTimeout(() => {
              addLine(
                `<span style="color:var(--cli-success)">✓ Connection established</span>`,
              );
              addLine(
                `Welcome to ${USER_DATA.name}'s portfolio. Type 'exit' to disconnect.`,
              );
              addLine("");
              setSshMode(true);
            }, 400);
          } else {
            addLine(
              `\x1b[31mError:\x1b[0m Unknown host. Usage: ssh user@portfolio`,
            );
          }
          break;
        }

        case "exit":
          if (sshMode) {
            addLine("Disconnecting from portfolio...");
            setTimeout(() => {
              addLine(
                `<span style="color:var(--cli-success)">✓ Disconnected</span>`,
              );
              addLine("");
              setSshMode(false);
            }, 200);
          } else {
            addLine(
              "Type 'clear' to clear the terminal, or visit / to go back to the portfolio.",
            );
          }
          break;

        case "uptime": {
          const uptimeMs = Date.now() - startTime;
          const mins = Math.floor(uptimeMs / 60000);
          const secs = Math.floor((uptimeMs % 60000) / 1000);
          addLine(
            `Session uptime: ${mins}m ${secs}s (Session: ${sessionId})`,
          );
          break;
        }

        case "echo":
          addLine(args.join(" ") || "");
          break;

        case "date":
          addLine(new Date().toLocaleString());
          break;

        case "banner":
          addLine(`<strong>pratap</strong>'s portfolio terminal v1.0.0`);
          addLine(`Session: ${sessionId}`);
          break;

        case "install": {
          if (args[0]?.toLowerCase() === "pratap") {
            addLine("");
            addLines(getInstallOutput());
            addLine("");
          } else {
            addLine(
              `Usage: install pratap`,
            );
          }
          break;
        }

        default:
          addLine(
            `\x1b[31mError:\x1b[0m Unknown command: "${command}". Type 'help' for available commands.`,
          );
      }
    },
    [addLine, addLines, clearLines, prompt, sshMode, theme.name, startTime, sessionId],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (mode === "normal") {
        if (e.key === "i" || e.key === "I") {
          setMode("insert");
          return;
        }
        if (e.key === "j") {
          e.preventDefault();
          navigateHistory(-1);
          return;
        }
        if (e.key === "k") {
          e.preventDefault();
          navigateHistory(1);
          return;
        }
        if (e.key === "Escape") {
          return;
        }
        return;
      }

      if (e.key === "Escape") {
        e.preventDefault();
        setMode("normal");
        return;
      }

      if (e.key === "Enter") {
        e.preventDefault();
        const cmd = input;
        setInput("");
        setShowAutocomplete(false);
        setAutocompleteIndex(-1);
        executeCommand(cmd);
        return;
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        navigateHistory(-1);
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        navigateHistory(1);
        return;
      }

      if (e.key === "Tab") {
        e.preventDefault();
        const clean = input.trimEnd();
        const matches = getAutocompleteMatches(clean);
        if (matches.length === 0) return;

        const nextIndex = !showAutocomplete
          ? 0
          : (autocompleteIndex + 1) % Math.min(matches.length, 8);
        setAutocompleteIndex(nextIndex);
        setShowAutocomplete(true);
        setInput(matches[nextIndex]);
        return;
      }

      if (showAutocomplete) {
        setShowAutocomplete(false);
        setAutocompleteIndex(-1);
      }
    },
    [input, mode, commandHistory, historyIndex, showAutocomplete, autocompleteIndex, executeCommand],
  );

  const navigateHistory = useCallback(
    (direction: number) => {
      if (commandHistory.length === 0) return;
      const newIndex = Math.max(
        -1,
        Math.min(commandHistory.length - 1, historyIndex + direction),
      );
      setHistoryIndex(newIndex);
      if (newIndex === -1) {
        setInput("");
      } else {
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    },
    [commandHistory, historyIndex],
  );

  const matches =
    showAutocomplete ? getAutocompleteMatches(input).slice(0, 8) : [];

  const cursorColor = theme.cursor;

  const bootLines = BOOT_SEQUENCE.slice(0, bootMsgs);

  const vimIndicator = mode === "normal" ? "NORMAL" : "INSERT";

  return (
    <div
      className="w-full h-screen flex flex-col"
      style={{
        backgroundColor: theme.bg,
        color: theme.fg,
        fontFamily: "'Geist Mono', 'SF Mono', 'Fira Code', monospace",
        fontSize: "14px",
        lineHeight: "1.6",
      }}
      onClick={focusInput}
    >
      <div
        style={{
          borderBottom: `1px solid ${theme.border}`,
          padding: "8px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
          fontSize: "12px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: theme.error,
              display: "inline-block",
            }}
          />
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: theme.warning,
              display: "inline-block",
            }}
          />
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: theme.success,
              display: "inline-block",
            }}
          />
          <span style={{ color: theme.dim, marginLeft: 8 }}>
            pratap terminal —
            <span style={{ color: theme.prompt }}>
              {" "}{sshMode ? "connected (ssh)" : "local"}
            </span>
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span
            style={{
              color: mode === "normal" ? theme.accent : theme.dim,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.5px",
            }}
          >
            {vimIndicator}
          </span>
          <span style={{ color: theme.dim, fontSize: 11 }}>
            {theme.name}
          </span>
        </div>
      </div>

      <div
        ref={terminalRef}
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "16px",
          scrollBehavior: "smooth",
        }}
      >
        {bootLines.length > 0 && (
          <div style={{ marginBottom: 12 }}>
            {bootLines.map((b, i) => (
              <div
                key={i}
                style={{ color: theme.dim, fontSize: 13, lineHeight: 1.7 }}
                dangerouslySetInnerHTML={{ __html: b.msg }}
              />
            ))}
            {!booted && (
              <span
                style={{
                  color: theme.accent,
                  animation: "pulse 1s infinite",
                }}
              >
                _
              </span>
            )}
          </div>
        )}

        {lines.map((line) => (
          <div
            key={line.id}
            style={{
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              minHeight: "1.2em",
            }}
            dangerouslySetInnerHTML={{ __html: line.html || " " }}
          />
        ))}

        {booted && (
          <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
            <span style={{ color: theme.prompt, whiteSpace: "pre" }}>
              {prompt}{" "}
            </span>
            <div style={{ position: "relative", flex: 1 }}>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  if (e.target.value) {
                    const m = getAutocompleteMatches(e.target.value);
                    setShowAutocomplete(false);
                    setAutocompleteIndex(-1);
                  }
                }}
                onKeyDown={handleKeyDown}
                spellCheck={false}
                autoComplete="off"
                autoFocus
                style={{
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "transparent",
                  caretColor: cursorColor,
                  fontFamily: "inherit",
                  fontSize: "inherit",
                  lineHeight: "inherit",
                  width: "100%",
                  position: "absolute",
                  left: 0,
                  top: 0,
                  padding: 0,
                  margin: 0,
                }}
                aria-label="Terminal input"
              />
              <span
                style={{
                  color: theme.fg,
                  pointerEvents: "none",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                }}
              >
                {input || ""}
                <span
                  style={{
                    color: cursorColor,
                    animation: "cli-blink 1s step-end infinite",
                  }}
                >
                  ▊
                </span>
              </span>
            </div>
          </div>
        )}

        {matches.length > 0 && (
          <div
            style={{
              paddingTop: 4,
              display: "flex",
              flexWrap: "wrap",
              gap: 4,
            }}
          >
            {matches.map((m, i) => (
              <span
                key={m}
                style={{
                  padding: "1px 8px",
                  borderRadius: 3,
                  fontSize: 12,
                  backgroundColor:
                    i === autocompleteIndex ? theme.selection : "transparent",
                  color:
                    i === autocompleteIndex ? theme.fg : theme.dim,
                  cursor: "pointer",
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  setInput(m + " ");
                  setShowAutocomplete(false);
                  inputRef.current?.focus();
                }}
              >
                {m}
              </span>
            ))}
          </div>
        )}
      </div>

      <div
        style={{
          borderTop: `1px solid ${theme.border}`,
          padding: "6px 16px",
          fontSize: 11,
          color: theme.dim,
          display: "flex",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <span>
          <span style={{ color: theme.success }}>●</span>{" "}
          {sshMode ? "SSH connected" : "Local session"}
        </span>
        <span>
          {sshMode
            ? "Type 'exit' to disconnect"
            : "Tab: autocomplete · ↑↓: history · Esc: vim mode"}
        </span>
      </div>

      <style>{`
        @keyframes cli-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
