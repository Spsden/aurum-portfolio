"use client";

import { useState, useEffect, useCallback, useRef, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LZString from "lz-string";
import { Sparkles, Link2, Copy, Check, ArrowLeft, ScrollText, Archive, Shield, Timer, Globe, Zap } from "lucide-react";

type ViewState = "compose" | "encrypting" | "capsule" | "reading" | "empty";

interface TokenPayload {
  note: string;
  burnToken?: string;
  destroyAfter: number;
  expiresAt?: number;
}

function parseHash(): TokenPayload | null {
  const hash = window.location.hash.slice(1);
  if (!hash) return null;
  try {
    const d = LZString.decompressFromEncodedURIComponent(hash);
    if (!d) return null;
    try {
      const p = JSON.parse(d) as { n?: string; b?: string; t?: number; e?: number };
      if (!p.n) return null;
      if (p.e && Date.now() > p.e) return null;
      return { note: p.n, burnToken: p.b, destroyAfter: p.t ?? 4, expiresAt: p.e };
    } catch {
      return { note: d, burnToken: undefined, destroyAfter: 4 };
    }
  } catch {
    return null;
  }
}

const EXPIRY_OPTIONS = [
  { label: "Never", value: 0 },
  { label: "1h", value: 3600 },
  { label: "24h", value: 86400 },
  { label: "7d", value: 604800 },
];

function buildHash(note: string, burnToken?: string, destroyAfter?: number, expiresIn?: number): string {
  const p: Record<string, unknown> = { n: note, t: destroyAfter ?? 4 };
  if (burnToken) p.b = burnToken;
  if (expiresIn) p.e = Date.now() + expiresIn * 1000;
  return LZString.compressToEncodedURIComponent(JSON.stringify(p));
}

function generateToken(): string {
  const bytes = new Uint8Array(12);
  crypto.getRandomValues(bytes);
  return Array.from(bytes).map((b) => b.toString(36).padStart(2, "0")).join("");
}

const STORAGE_PREFIX = "mc_burn_";

const pillBtn = (active: boolean) =>
  `px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-200 cursor-pointer active:scale-90 ${
    active
      ? "bg-white text-black active:opacity-80"
      : "text-theme-fg-300 hover:text-theme-fg-200 hover:bg-white/10 active:bg-white/15"
  }`;

export default function VoidNote() {
  const [view, setView] = useState<ViewState>("compose");
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [revealed, setRevealed] = useState("");
  const [revealIdx, setRevealIdx] = useState(0);
  const [burn, setBurn] = useState(false);
  const [destroyAfter, setDestroyAfter] = useState(4);
  const [expiresIn, setExpiresIn] = useState(0);
  const [shares, setShares] = useState(0);
  const [resolved, setResolved] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const p = parseHash();
    if (!p) {
      if (window.location.hash.length > 1) setView("empty");
      return;
    }
    if (p.burnToken) {
      const k = STORAGE_PREFIX + p.burnToken;
      try {
        if (sessionStorage.getItem(k) === "read") { setView("empty"); return; }
        sessionStorage.setItem(k, "read");
      } catch {}
    }
    setResolved(p.note);
    setView("reading");
  }, []);

  useEffect(() => {
    if (view !== "reading" || !resolved) return;
    if (revealIdx >= resolved.length) return;
    const jitter = 18 + Math.random() * 24;
    timerRef.current = setTimeout(() => {
      const chunk = resolved.length > 500 ? 3 : resolved.length > 200 ? 2 : 1;
      const next = Math.min(revealIdx + chunk, resolved.length);
      setRevealed(resolved.slice(0, next));
      setRevealIdx(next);
    }, jitter);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [view, resolved, revealIdx]);

  const generate = useCallback(() => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setView("encrypting");
    const token = burn ? generateToken() : undefined;
    setTimeout(() => {
      const hash = buildHash(trimmed, token, destroyAfter, expiresIn);
      const u = `${window.location.origin}${window.location.pathname}#${hash}`;
      window.history.replaceState(null, "", `#${hash}`);
      setUrl(u);
      setResolved(trimmed);
      setRevealed("");
      setRevealIdx(0);
      setShares(0);
      setView("capsule");
    }, 800);
  }, [text, burn, destroyAfter, expiresIn]);

  const copyUrl = useCallback(async () => {
    try { await navigator.clipboard.writeText(url); }
    catch {
      const el = document.createElement("input");
      el.value = url; document.body.appendChild(el); el.select(); document.execCommand("copy"); document.body.removeChild(el);
    }
    setCopied(true);
    setShares((c) => c + 1);
    setTimeout(() => setCopied(false), 2000);
  }, [url]);

  const reset = useCallback(() => {
    setText(""); setUrl(""); setCopied(false); setRevealed(""); setRevealIdx(0);
    setResolved(""); setShares(0); setExpiresIn(0);
    window.history.replaceState(null, "", window.location.pathname);
    setView("compose");
    inputRef.current?.focus();
  }, []);

  const empty = !text.trim();
  const chars = text.length;

  const dots: ReactNode = (
    <span className="inline-flex">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="opacity-0"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.25 }}
        >.</motion.span>
      ))}
    </span>
  );

  const bar =
    "h-9 px-3 flex items-center gap-2 text-xs text-theme-fg-400 hover:text-theme-fg-300 transition-colors rounded-md hover:bg-theme-fg/[0.04]";

  if (view === "encrypting") {
    return (
      <div className="min-h-screen flex flex-col bg-[#058036] selection:bg-theme-fg/10">
        <main className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-10 h-10">
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-full border border-theme-fg-200/20"
                  animate={{ scale: [1, 1.5 - i * 0.12, 1], opacity: [0.3 - i * 0.05, 0.01, 0.3 - i * 0.05] }}
                  transition={{ duration: 1.8 - i * 0.2, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
                />
              ))}
            </div>
            <p className="text-sm text-theme-fg-400">Sealing your note{dots}</p>
          </div>
        </main>
      </div>
    );
  }

  if (view === "capsule") {
    return (
      <div className="min-h-screen flex flex-col bg-[#058036] selection:bg-theme-fg/10">
        <header className="flex items-center justify-between px-4 sm:px-6 h-12 border-b border-theme-bg-300">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-theme-fg-300" />
            <span className="text-sm font-medium text-theme-fg">VoidNote</span>
            <span className="text-[11px] text-theme-fg-400/70 ml-1.5 hidden sm:inline">Ephemeral text, shared safely.</span>
          </div>
          <a href="https://pratap.world" target="_blank" rel="noopener noreferrer" className="text-xs text-theme-fg-400 hover:text-theme-fg-300 transition-colors">
            <span className="hidden sm:inline">Created with ❤️ by </span>pratap.world
          </a>
        </header>
        <main className="flex-1 flex items-center justify-center px-4 sm:px-6">
          <div className="w-full max-w-xl">
            <div className="flex items-center gap-2 mb-3">
              <Link2 className="w-4 h-4 text-theme-fg-400" />
              <span className="text-xs font-medium text-theme-fg-400 uppercase tracking-wider">Shareable Link</span>
            </div>
            <div className="text-sm break-all font-mono bg-theme-bg-200 rounded-lg border border-theme-bg-300 p-4 select-all leading-relaxed text-theme-fg-200">
              {url}
            </div>
            <div className="flex items-center gap-3 mt-4 flex-wrap">
              <button onClick={copyUrl} className="h-9 px-4 rounded-lg bg-theme-fg text-theme-bg text-xs font-medium flex items-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all">
                {copied ? <><Check className="w-3.5 h-3.5" /> Copied</> : <><Copy className="w-3.5 h-3.5" /> Copy Link</>}
              </button>
              <button onClick={reset} className="h-9 px-4 rounded-lg border border-theme-bg-300 text-theme-fg-400 hover:text-theme-fg text-xs font-medium transition-colors">
                New Note
              </button>
              {shares > 0 && <span className="text-xs text-theme-fg-500 ml-auto">Copied {shares} time{shares !== 1 ? "s" : ""}</span>}
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (view === "reading" && resolved) {
    return (
      <div className="min-h-screen flex flex-col bg-[#058036] selection:bg-theme-fg/10">
        <header className="flex items-center justify-between px-4 sm:px-6 h-12 border-b border-theme-bg-300">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-theme-fg-300" />
            <span className="text-sm font-medium text-theme-fg">VoidNote</span>
            <span className="text-[11px] text-theme-fg-400/70 ml-1.5 hidden sm:inline">Ephemeral text, shared safely.</span>
          </div>
          <a href="https://pratap.world" target="_blank" rel="noopener noreferrer" className="text-xs text-theme-fg-400 hover:text-theme-fg-300 transition-colors">
            <span className="hidden sm:inline">Created with ❤️ by </span>pratap.world
          </a>
        </header>
        <main className="flex-1 px-4 sm:px-6 py-6 max-w-3xl mx-auto w-full">
          <div className="flex items-center gap-2 mb-4">
            <ScrollText className="w-4 h-4 text-theme-fg-400" />
            <span className="text-xs font-medium text-theme-fg-400 uppercase tracking-wider">Decoded Note</span>
            <span className="ml-auto text-xs text-theme-fg-500 font-mono">{revealIdx}/{resolved.length}</span>
          </div>
          <p className="text-sm sm:text-base text-theme-fg-200 leading-relaxed whitespace-pre-wrap">
            {revealed}
            {revealIdx < resolved.length && (
              <motion.span
                animate={{ opacity: [1, 0.15] }}
                transition={{ duration: 0.6, repeat: Infinity }}
                className="inline-block w-[2px] h-[1em] bg-theme-fg-400 ml-0.5 align-middle"
              />
            )}
          </p>
          {revealIdx >= resolved.length && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-6">
              <button onClick={reset} className="h-9 px-4 rounded-lg bg-theme-fg text-theme-bg text-xs font-medium flex items-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all">
                <ArrowLeft className="w-3.5 h-3.5" />
                Create Your Own
              </button>
            </motion.div>
          )}
        </main>
      </div>
    );
  }

  if (view === "empty") {
    return (
      <div className="min-h-screen flex flex-col bg-[#058036] selection:bg-theme-fg/10">
        <header className="flex items-center justify-between px-4 sm:px-6 h-12 border-b border-theme-bg-300">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-theme-fg-300" />
            <span className="text-sm font-medium text-theme-fg">VoidNote</span>
            <span className="text-[11px] text-theme-fg-400/70 ml-1.5 hidden sm:inline">Ephemeral text, shared safely.</span>
          </div>
          <a href="https://pratap.world" target="_blank" rel="noopener noreferrer" className="text-xs text-theme-fg-400 hover:text-theme-fg-300 transition-colors">
            <span className="hidden sm:inline">Created with ❤️ by </span>pratap.world
          </a>
        </header>
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <Archive className="w-8 h-8 text-theme-fg-400 mx-auto mb-3" />
            <p className="text-sm font-medium text-theme-fg-300">Note Expired</p>
            <p className="text-xs text-theme-fg-400 mt-1">This note no longer exists.</p>
            <button onClick={reset} className="mt-5 h-9 px-4 rounded-lg bg-theme-fg text-theme-bg text-xs font-medium flex items-center gap-2 mx-auto hover:opacity-90 active:scale-[0.98] transition-all">
              <Sparkles className="w-3.5 h-3.5" />
              Create a Note
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#058036] selection:bg-theme-fg/10">
      <header className="flex items-center justify-between px-4 sm:px-6 h-12 flex-shrink-0">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-theme-fg-300" />
          <span className="text-sm font-medium text-theme-fg">VoidNote</span>
          <span className="text-[11px] text-theme-fg-400/70 ml-1.5 hidden sm:inline">Ephemeral text, shared safely.</span>
          <span className="ml-2 text-xs text-theme-fg-400/60 font-mono tabular-nums">{chars}</span>
        </div>
        <a href="https://pratap.world" target="_blank" rel="noopener noreferrer" className="text-xs text-theme-fg-400 hover:text-theme-fg-300 transition-colors hidden sm:block">
          <span className="hidden sm:inline">Created with ❤️ by </span>pratap.world
        </a>
      </header>

      <div className="px-2 sm:px-6 py-2 sm:py-3 flex-shrink-0">
        <div className="flex items-center gap-2 sm:gap-3 bg-black/20 rounded-xl px-2 sm:px-3 py-2 shadow-lg shadow-black/30 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <button
            onClick={generate}
            disabled={empty}
            className="h-8 sm:h-7 px-2.5 sm:px-3 rounded-lg bg-theme-fg text-theme-bg text-[11px] font-medium disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-1.5 hover:opacity-90 active:scale-[0.98] flex-shrink-0"
          >
            <Sparkles className="w-3.5 sm:w-3 h-3.5 sm:h-3" />
            Generate
          </button>
          <div className="w-px h-4 bg-white/10 flex-shrink-0" />
          <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
            <Timer className="w-3 h-3 text-theme-fg-400 hidden sm:block" />
            <span className="text-[11px] text-theme-fg-500 font-medium uppercase tracking-wider mr-0.5 hidden sm:inline">Destroy</span>
            {[4, 10, 30, 60].map((s) => (
              <button key={s} onClick={() => setDestroyAfter(s)} className={pillBtn(destroyAfter === s)}>
                {s}s
              </button>
            ))}
          </div>
          <div className="w-px h-4 bg-white/10 flex-shrink-0" />
          <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
            <Globe className="w-3 h-3 text-theme-fg-400 hidden sm:block" />
            <span className="text-[11px] text-theme-fg-500 font-medium uppercase tracking-wider mr-0.5 hidden sm:inline">Expires</span>
            {EXPIRY_OPTIONS.map((o) => (
              <button key={o.value} onClick={() => setExpiresIn(o.value)} className={pillBtn(expiresIn === o.value)}>
                {o.label}
              </button>
            ))}
          </div>
          <div className="w-px h-4 bg-white/10 flex-shrink-0" />
          <label className="flex items-center gap-1.5 cursor-pointer py-1 px-1.5 rounded-md hover:bg-white/[0.06] transition-colors flex-shrink-0">
            <input type="checkbox" checked={burn} onChange={(e) => setBurn(e.target.checked)} className="sr-only" />
            <div className={`w-7 h-[15px] rounded-full relative transition-colors duration-200 ${burn ? "bg-theme-fg-300" : "bg-white/20"}`}>
              <motion.div
                layout
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className={`absolute top-[2px] w-[11px] h-[11px] rounded-full bg-[#058036] shadow-sm ${burn ? "right-[2px]" : "left-[2px]"}`}
              />
            </div>
            <Shield className={`w-3 h-3 ${burn ? "text-theme-fg-300" : "text-theme-fg-400"}`} />
            <span className="text-[11px] text-theme-fg-400 whitespace-nowrap">Burn after reading</span>
          </label>
        </div>
      </div>

      <textarea
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write something temporary..."
        className="flex-1 w-full bg-transparent text-sm sm:text-base text-theme-fg-200 placeholder:text-theme-fg-500/40 px-2 sm:px-6 py-5 resize-none focus:outline-none leading-relaxed"
        maxLength={5000}
      />
    </div>
  );
}
