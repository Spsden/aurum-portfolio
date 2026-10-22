"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import type { OnMount } from "@monaco-editor/react";
import {
  SNIPPETS,
  MONACO_THEMES,
  PLAYGROUND_THEMES,
  DEFAULT_THEME,
  type PlaygroundTheme,
} from "@/content/playground-data";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

type OutputLine = {
  id: number;
  type: "log" | "error" | "warn" | "info" | "result";
  content: string;
};

const STORAGE_KEY = "playground-code";
const THEME_KEY = "playground-theme";

function formatValue(val: unknown): string {
  if (val === null) return "null";
  if (val === undefined) return "undefined";
  if (typeof val === "string") return val;
  if (typeof val === "number" || typeof val === "boolean")
    return String(val);
  if (val instanceof Error) return val.stack || val.message;
  if (Array.isArray(val)) return JSON.stringify(val, null, 2);
  if (typeof val === "object") return JSON.stringify(val, null, 2);
  return String(val);
}

const INITIAL_CODE = `// Welcome to pratap's playground
// Write JavaScript below and hit Run or Cmd+Enter

console.log("Hello from the playground!");

const tools = ["Go", "TypeScript", "Python", "Docker"];
console.log("Stack:", tools);

const sum = [1, 2, 3, 4, 5].reduce((a, b) => a + b, 0);
console.log("Sum:", sum);
`;

export default function Playground() {
  const [code, setCode] = useState(INITIAL_CODE);
  const [output, setOutput] = useState<OutputLine[]>([]);
  const [theme, setTheme] = useState<PlaygroundTheme>(DEFAULT_THEME);
  const [activeSnippet, setActiveSnippet] = useState<string | null>(null);
  const [showSnippets, setShowSnippets] = useState(false);
  const [splitPos, setSplitPos] = useState(55);
  const [isDragging, setIsDragging] = useState(false);
  const [editorReady, setEditorReady] = useState(false);
  const [cursorPos, setCursorPos] = useState({ line: 1, column: 1 });
  const [editorMounted, setEditorMounted] = useState(false);
  const [mounted, setMounted] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(1);
  const monacoRef = useRef<Parameters<OnMount>[1] | null>(null);
  const editorRef = useRef<Parameters<OnMount>[0] | null>(null);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setCode(saved);
    const savedTheme = localStorage.getItem(THEME_KEY) as PlaygroundTheme | null;
    if (savedTheme && MONACO_THEMES[savedTheme]) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, code);
  }, [code]);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  useEffect(() => {
    if (!isDragging) return;
    const handleMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const pos = ((e.clientX - rect.left) / rect.width) * 100;
      setSplitPos(Math.min(Math.max(pos, 25), 75));
    };
    const handleUp = () => setIsDragging(false);
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };
  }, [isDragging]);

  const addOutput = useCallback(
    (type: OutputLine["type"], content: string) => {
      const id = nextId.current++;
      setOutput((prev) => [...prev, { id, type, content }]);
    },
    [],
  );

  const clearOutput = useCallback(() => {
    setOutput([]);
  }, []);

  const handleEditorMount: OnMount = useCallback((editor, monaco) => {
    monacoRef.current = monaco;
    editorRef.current = editor;
    setEditorMounted(true);

    editor.onDidChangeCursorPosition((e) => {
      setCursorPos({ line: e.position.lineNumber, column: e.position.column });
    });

    editor.addAction({
      id: "run-code",
      label: "Run Code",
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter],
      run: () => {
        runCode(editor.getValue());
      },
    });

    editor.focus();
  }, []);

  const handleEditorWillMount = useCallback(
    (monaco: any) => {
      Object.entries(MONACO_THEMES).forEach(([key, themeData]) => {
        monaco.editor.defineTheme(key, themeData as any);
      });
      setEditorReady(true);
    },
    [],
  );

  const runCode = useCallback(
    (source: string) => {
      const id = nextId.current++;
      setOutput((prev) => [
        ...prev,
        {
          id,
          type: "info",
          content: `▶ Running...`,
        },
      ]);

      setTimeout(() => {
        const capturedLogs: OutputLine[] = [];

        const fakeConsole = {
          log: (...args: unknown[]) => {
            const content = args.map(formatValue).join(" ");
            capturedLogs.push({
              id: nextId.current++,
              type: "log" as const,
              content,
            });
          },
          error: (...args: unknown[]) => {
            const content = args.map(formatValue).join(" ");
            capturedLogs.push({
              id: nextId.current++,
              type: "error" as const,
              content,
            });
          },
          warn: (...args: unknown[]) => {
            const content = args.map(formatValue).join(" ");
            capturedLogs.push({
              id: nextId.current++,
              type: "warn" as const,
              content,
            });
          },
          info: (...args: unknown[]) => {
            const content = args.map(formatValue).join(" ");
            capturedLogs.push({
              id: nextId.current++,
              type: "info" as const,
              content,
            });
          },
        };

        try {
          const fn = new Function("console", source);
          const result = fn(fakeConsole);

          if (result !== undefined) {
            capturedLogs.push({
              id: nextId.current++,
              type: "result",
              content: `→ ${formatValue(result)}`,
            });
          }

          setOutput((prev) => {
            const filtered = prev.filter((l) => l.id !== id);
            return [...filtered, ...capturedLogs];
          });
        } catch (err) {
          setOutput((prev) => {
            const filtered = prev.filter((l) => l.id !== id);
            filtered.push({
              id: nextId.current++,
              type: "error",
              content: `✕ ${err instanceof Error ? err.message : String(err)}`,
            });
            if (err instanceof Error && err.stack) {
              const lines = err.stack.split("\n").slice(1, 4).join("\n");
              filtered.push({
                id: nextId.current++,
                type: "error",
                content: lines,
              });
            }
            return filtered;
          });
        }
      }, 100);
    },
    [],
  );

  const loadSnippet = useCallback(
    (snippetId: string) => {
      const snippet = SNIPPETS.find((s) => s.id === snippetId);
      if (!snippet) return;
      setCode(snippet.code);
      setActiveSnippet(snippetId);
      setShowSnippets(false);
      clearOutput();
    },
    [clearOutput],
  );

  const handleThemeChange = useCallback((newTheme: PlaygroundTheme) => {
    setTheme(newTheme);
    const monaco = monacoRef.current;
    if (monaco) {
      monaco.editor.setTheme(newTheme);
    }
  }, []);

  const resetCode = useCallback(() => {
    setCode(INITIAL_CODE);
    setActiveSnippet(null);
    clearOutput();
  }, [clearOutput]);

  const isMobile = mounted && typeof window !== "undefined" && window.innerWidth < 768;
  const effectiveSplit = isMobile ? 100 : splitPos;

  const currentTheme = MONACO_THEMES[theme];
  const bgColor = currentTheme.colors["editor.background"];
  const fgColor = currentTheme.colors["editor.foreground"];
  const borderColor = currentTheme.colors["editor.selectionBackground"];

  return (
    <div className="w-full h-screen flex flex-col overflow-hidden" style={{ backgroundColor: bgColor, color: fgColor }}>
      <Toolbar
        theme={theme}
        bgColor={bgColor}
        fgColor={fgColor}
        borderColor={borderColor}
        themeName={PLAYGROUND_THEMES.find((t) => t.id === theme)?.label ?? theme}
        onRun={() => runCode(code)}
        onClear={clearOutput}
        onReset={resetCode}
        onThemeChange={handleThemeChange}
        showSnippets={showSnippets}
        onToggleSnippets={() => setShowSnippets((v) => !v)}
        onLoadSnippet={loadSnippet}
        activeSnippet={activeSnippet}
      />

      <div ref={containerRef} className="flex-1 flex overflow-hidden" style={{ flexDirection: isMobile ? "column" : "row" }}>
        <div style={{ width: isMobile ? "100%" : `${effectiveSplit}%`, height: isMobile ? "55%" : "100%" }}>
          <MonacoEditor
            language="javascript"
            theme={theme}
            value={code}
            onChange={(val) => setCode(val ?? "")}
            beforeMount={handleEditorWillMount}
            onMount={handleEditorMount}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              fontFamily: "'Geist Mono', 'SF Mono', 'Fira Code', monospace",
              lineNumbers: "on",
              renderLineHighlight: "line",
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 2,
              wordWrap: "on",
              bracketPairColorization: { enabled: true },
              padding: { top: 16 },
              smoothScrolling: true,
              cursorBlinking: "smooth",
              cursorSmoothCaretAnimation: "on",
              suggestOnTriggerCharacters: true,
              quickSuggestions: true,
              formatOnPaste: true,
            }}
          />
        </div>

        {!isMobile && (
          <div
            className="cursor-col-resize shrink-0 relative"
            style={{ width: 4, backgroundColor: borderColor }}
            onMouseDown={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
          >
            <div
              className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity"
              style={{ backgroundColor: currentTheme.colors["focusBorder"] + "60" }}
            />
          </div>
        )}

        <div
          className="flex flex-col overflow-hidden"
          style={{
            width: isMobile ? "100%" : `${100 - effectiveSplit}%`,
            height: isMobile ? "45%" : "100%",
            borderLeft: isMobile ? "none" : `1px solid ${borderColor}`,
            borderTop: isMobile ? `1px solid ${borderColor}` : "none",
          }}
        >
          <div
            style={{
              padding: "8px 12px",
              fontSize: 12,
              color: currentTheme.colors["editorLineNumber.foreground"],
              borderBottom: `1px solid ${borderColor}`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            <span>Console</span>
            {output.length > 0 && (
              <button
                onClick={clearOutput}
                style={{ color: currentTheme.colors["editorLineNumber.foreground"], fontSize: 11, opacity: 0.7 }}
                className="hover:opacity-100 transition-opacity"
                aria-label="Clear console"
              >
                Clear
              </button>
            )}
          </div>
          <div
            ref={outputRef}
            className="flex-1 overflow-y-auto"
            style={{
              padding: "12px",
              fontFamily: "'Geist Mono', 'SF Mono', 'Fira Code', monospace",
              fontSize: 13,
              lineHeight: 1.6,
            }}
          >
            {output.length === 0 && (
              <div style={{ color: currentTheme.colors["editorLineNumber.foreground"], opacity: 0.5 }}>
                Output will appear here. Hit Run or press Cmd+Enter.
              </div>
            )}
            {output.map((line) => (
              <div
                key={line.id}
                style={{
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  paddingLeft: line.type === "result" ? 0 : 0,
                }}
              >
                <ConsoleLine line={line} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <StatusBar
        cursorPos={cursorPos}
        themeName={PLAYGROUND_THEMES.find((t) => t.id === theme)?.label ?? theme}
        bgColor={bgColor}
        fgColor={fgColor}
        borderColor={borderColor}
        lineCount={code.split("\n").length}
      />
    </div>
  );
}

function ConsoleLine({ line }: { line: OutputLine }) {
  const colors: Record<string, string> = {
    log: "var(--playground-log, #cdd6f4)",
    error: "var(--playground-error, #f38ba8)",
    warn: "var(--playground-warn, #fab387)",
    info: "var(--playground-info, #89b4fa)",
    result: "var(--playground-result, #a6e3a1)",
  };

  const prefixes: Record<string, string> = {
    log: "",
    error: "✕ ",
    warn: "⚠ ",
    info: "→ ",
    result: "",
  };

  const prefix = prefixes[line.type];
  const color = colors[line.type];

  return (
    <span style={{ color }}>
      {prefix && <span style={{ opacity: 0.6 }}>{prefix}</span>}
      {line.content}
    </span>
  );
}

function Toolbar({
  theme,
  bgColor,
  fgColor,
  borderColor,
  themeName,
  onRun,
  onClear,
  onReset,
  onThemeChange,
  showSnippets,
  onToggleSnippets,
  onLoadSnippet,
  activeSnippet,
}: {
  theme: PlaygroundTheme;
  bgColor: string;
  fgColor: string;
  borderColor: string;
  themeName: string;
  onRun: () => void;
  onClear: () => void;
  onReset: () => void;
  onThemeChange: (t: PlaygroundTheme) => void;
  showSnippets: boolean;
  onToggleSnippets: () => void;
  onLoadSnippet: (id: string) => void;
  activeSnippet: string | null;
}) {
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showActions, setShowActions] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px 12px",
        borderBottom: `1px solid ${borderColor}`,
        flexShrink: 0,
        gap: 8,
        flexWrap: "wrap",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button
          onClick={onRun}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "6px 14px",
            borderRadius: 8,
            border: "none",
            backgroundColor: "#a6e3a1",
            color: "#1e1e2e",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
          }}
          aria-label="Run code"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M8 5v14l11-7z" />
          </svg>
          Run
        </button>

        <div className="relative">
          <button
            onClick={onToggleSnippets}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              padding: "6px 10px",
              borderRadius: 6,
              border: `1px solid ${borderColor}`,
              backgroundColor: "transparent",
              color: fgColor,
              fontSize: 12,
              cursor: "pointer",
              opacity: 0.8,
            }}
            aria-label="Select snippet"
          >
            {activeSnippet ? SNIPPETS.find((s) => s.id === activeSnippet)?.label : "Snippets"}
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          {showSnippets && (
            <>
              <div className="fixed inset-0 z-10" onClick={onToggleSnippets} />
              <div
                className="absolute top-full left-0 mt-1 z-20"
                style={{
                  minWidth: 200,
                  borderRadius: 8,
                  border: `1px solid ${borderColor}`,
                  backgroundColor: bgColor,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
                  maxHeight: 320,
                  overflowY: "auto",
                }}
              >
                {SNIPPETS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => onLoadSnippet(s.id)}
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      padding: "8px 12px",
                      border: "none",
                      backgroundColor: s.id === activeSnippet ? borderColor : "transparent",
                      color: fgColor,
                      fontSize: 12,
                      cursor: "pointer",
                    }}
                    className="hover:opacity-80 transition-opacity"
                  >
                    <div style={{ fontWeight: 600, marginBottom: 2 }}>{s.label}</div>
                    <div style={{ opacity: 0.5, fontSize: 11 }}>{s.description}</div>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <div className="relative">
          <button
            onClick={() => setShowThemeMenu((v) => !v)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              padding: "6px 10px",
              borderRadius: 6,
              border: `1px solid ${borderColor}`,
              backgroundColor: "transparent",
              color: fgColor,
              fontSize: 12,
              cursor: "pointer",
              opacity: 0.8,
            }}
            aria-label="Select theme"
          >
            {themeName}
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          {showThemeMenu && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowThemeMenu(false)} />
              <div
                className="absolute top-full right-0 mt-1 z-20"
                style={{
                  minWidth: 160,
                  borderRadius: 8,
                  border: `1px solid ${borderColor}`,
                  backgroundColor: bgColor,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
                }}
              >
                {PLAYGROUND_THEMES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      onThemeChange(t.id);
                      setShowThemeMenu(false);
                    }}
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      padding: "8px 12px",
                      border: "none",
                      backgroundColor: t.id === theme ? borderColor : "transparent",
                      color: fgColor,
                      fontSize: 12,
                      cursor: "pointer",
                    }}
                    className="hover:opacity-80 transition-opacity"
                  >
                    {t.label}
                    {t.id === theme && " ✓"}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => setShowActions((v) => !v)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 28,
              height: 28,
              borderRadius: 6,
              border: `1px solid ${borderColor}`,
              backgroundColor: "transparent",
              color: fgColor,
              fontSize: 14,
              cursor: "pointer",
              opacity: 0.7,
            }}
            aria-label="More actions"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <circle cx="12" cy="5" r="2" />
              <circle cx="12" cy="12" r="2" />
              <circle cx="12" cy="19" r="2" />
            </svg>
          </button>
          {showActions && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowActions(false)} />
              <div
                className="absolute top-full right-0 mt-1 z-20"
                style={{
                  minWidth: 140,
                  borderRadius: 8,
                  border: `1px solid ${borderColor}`,
                  backgroundColor: bgColor,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
                }}
              >
                <ActionItem label="Clear console" onClick={onClear} bgColor={bgColor} fgColor={fgColor} borderColor={borderColor} />
                <ActionItem label="Reset editor" onClick={onReset} bgColor={bgColor} fgColor={fgColor} borderColor={borderColor} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function ActionItem({
  label,
  onClick,
  bgColor,
  fgColor,
  borderColor,
}: {
  label: string;
  onClick: () => void;
  bgColor: string;
  fgColor: string;
  borderColor: string;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "block",
        width: "100%",
        textAlign: "left",
        padding: "8px 12px",
        border: "none",
        backgroundColor: "transparent",
        color: fgColor,
        fontSize: 12,
        cursor: "pointer",
      }}
      className="hover:opacity-80 transition-opacity"
    >
      {label}
    </button>
  );
}

function StatusBar({
  cursorPos,
  themeName,
  bgColor,
  fgColor,
  borderColor,
  lineCount,
}: {
  cursorPos: { line: number; column: number };
  themeName: string;
  bgColor: string;
  fgColor: string;
  borderColor: string;
  lineCount: number;
}) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "6px 14px",
        borderRadius: 8,
        border: "none",
        backgroundColor: "#a6e3a1",
        color: "#1e1e2e",
        fontSize: 13,
        fontWeight: 600,
        cursor: "pointer",
      }}
      aria-label="Run code"
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <span>JavaScript</span>
        <span>Ln {cursorPos.line}, Col {cursorPos.column}</span>
        <span>{lineCount} lines</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <span>Spaces: 2</span>
        <span>{themeName}</span>
      </div>
    </div>
  );
}


