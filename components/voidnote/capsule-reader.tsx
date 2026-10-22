"use client";

import { useState, useEffect, useCallback } from "react";
import LZString from "lz-string";
import { Copy, Check, ExternalLink, Zap, Archive } from "lucide-react";

interface TokenPayload {
  note: string;
  burnToken?: string;
  destroyAfter: number;
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
      return { note: p.n, burnToken: p.b, destroyAfter: p.t ?? 4 };
    } catch {
      return { note: d, burnToken: undefined, destroyAfter: 4 };
    }
  } catch {
    return null;
  }
}

const STORAGE_PREFIX = "mc_burn_";

export default function CapsuleReader() {
  const [note, setNote] = useState<string | null>(null);
  const [invalid, setInvalid] = useState(false);
  const [copied, setCopied] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [destroyTime, setDestroyTime] = useState(4);
  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    const payload = parseHash();
    if (!payload) {
      setInvalid(true);
      return;
    }

    if (payload.burnToken) {
      const k = STORAGE_PREFIX + payload.burnToken;
      try {
        if (sessionStorage.getItem(k) === "read") { setInvalid(true); return; }
        sessionStorage.setItem(k, "read");
      } catch {}
    }

    setNote(payload.note);
    setDestroyTime(payload.destroyAfter);
    setCountdown(payload.destroyAfter);
  }, []);

  useEffect(() => {
    if (countdown === null || countdown <= 0) return;
    const timer = setTimeout(() => {
      setCountdown((c) => {
        if (c === null || c <= 1) {
          window.location.hash = "";
          setDeleted(true);
          return null;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleCopy = useCallback(async () => {
    if (!note) return;
    try { await navigator.clipboard.writeText(note); }
    catch {
      const el = document.createElement("textarea");
      el.value = note; document.body.appendChild(el); el.select(); document.execCommand("copy"); document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [note]);

  if (invalid || deleted) {
    return (
      <div className="min-h-screen flex flex-col bg-[#058036] selection:bg-theme-fg/10">
        <header className="flex items-center justify-between px-4 sm:px-6 h-12 flex-shrink-0">
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
            <p className="text-sm font-medium text-theme-fg-300">
              {invalid ? "Note Expired" : "Note Consumed"}
            </p>
            <p className="text-xs text-theme-fg-400 mt-1">
              {invalid ? "This note no longer exists." : "This note has been destroyed after being read."}
            </p>
            <a
              href="/voidnote"
              className="inline-flex items-center gap-2 mt-5 h-7 px-3 rounded-lg bg-theme-fg text-theme-bg text-[11px] font-medium hover:opacity-90 active:scale-[0.98] transition-all"
            >
              Create a Note
            </a>
          </div>
        </main>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="min-h-screen flex flex-col bg-[#058036] selection:bg-theme-fg/10">
        <main className="flex-1 flex items-center justify-center">
          <div className="flex items-center gap-3 text-theme-fg-400">
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span className="text-sm">Decoding...</span>
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
        </div>
        <a href="https://pratap.world" target="_blank" rel="noopener noreferrer" className="text-xs text-theme-fg-400 hover:text-theme-fg-300 transition-colors">
          <span className="hidden sm:inline">Created with ❤️ by </span>pratap.world
        </a>
      </header>

      <div className="px-2 sm:px-6 py-2 sm:py-3 flex flex-col gap-2 flex-shrink-0">
        <div className="flex items-center gap-2 bg-black/20 rounded-xl px-3 py-2 shadow-lg shadow-black/30 self-start">
          <button
            onClick={handleCopy}
            className="h-8 sm:h-7 px-2.5 sm:px-3 rounded-lg bg-theme-fg text-theme-bg text-[11px] font-medium flex items-center gap-1.5 hover:opacity-90 active:scale-[0.98] transition-all"
          >
            {copied ? <><Check className="w-3.5 sm:w-3 h-3.5 sm:h-3" /> Copied</> : <><Copy className="w-3.5 sm:w-3 h-3.5 sm:h-3" /> Copy</>}
          </button>
          <a
            href="/voidnote"
            className="inline-flex items-center gap-1.5 h-8 sm:h-7 px-2.5 sm:px-3 rounded-lg border border-white/20 text-theme-fg-300 hover:text-theme-fg-200 text-[11px] font-medium transition-colors"
          >
            <ExternalLink className="w-3.5 sm:w-3 h-3.5 sm:h-3" />
            New Note
          </a>
        </div>
        {countdown !== null && countdown > 0 && (
          <div className="flex items-center gap-2 sm:ml-auto">
            <div className="flex-1 sm:w-24 h-0.5 bg-white/15 rounded-full overflow-hidden">
              <div
                className="h-full bg-white/50 rounded-full transition-all duration-1000 ease-linear"
                style={{ width: `${(countdown / destroyTime) * 100}%` }}
              />
            </div>
            <span className="text-[11px] text-theme-fg-400 font-mono tabular-nums flex-shrink-0">{countdown}s</span>
          </div>
        )}
      </div>

      <main className="flex-1 px-4 sm:px-6 pb-5 max-w-3xl mx-auto w-full">
        <p className="text-sm sm:text-base text-theme-fg-200 leading-relaxed whitespace-pre-wrap">
          {note}
        </p>
      </main>
    </div>
  );
}
