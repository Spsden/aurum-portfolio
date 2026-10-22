"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { useTheme } from "next-themes";

const EXPAND_ICON =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 3h6v6" /><path d="M9 21H3v-6" /><path d="m21 3-7 7" /><path d="m3 21 7-7" /></svg>';

/**
 * Mermaid emits `width="100%"` plus an inline `max-width`, so the diagram is
 * scaled down to whatever column it lands in — a wide diagram ends up as 6px
 * text. Pin the SVG to its intrinsic viewBox size instead and let the host
 * scroll it. Returns that intrinsic width, for deciding on an expand button.
 */
function sizeToViewBox(svg: SVGSVGElement | null): number | null {
  const viewBox = svg
    ?.getAttribute("viewBox")
    ?.trim()
    .split(/[\s,]+/)
    .map(Number);
  if (!svg || viewBox?.length !== 4) return null;

  const [, , width, height] = viewBox;
  if (!width || !height) return null;

  svg.setAttribute("width", String(width));
  svg.setAttribute("height", String(height));
  svg.removeAttribute("style");

  return width;
}

/** Opened by the click handler, which is delegated through React. */
function expandButton(doc: Document) {
  const button = doc.createElement("button");
  button.type = "button";
  button.className = "mermaid-expand";
  button.setAttribute("aria-label", "Expand diagram");
  button.innerHTML = EXPAND_ICON;
  return button;
}

/**
 * Puts the diagram in a positioning context of its own, so the expand button
 * stays in the panel's corner instead of scrolling away with the diagram.
 */
function frameDiagram(host: HTMLElement) {
  const frame = host.ownerDocument.createElement("div");
  frame.className = "mermaid-frame";
  host.replaceWith(frame);
  frame.append(host);
  return frame;
}

type Props = {
  /** Pre-rendered HTML for the article body (server produced). */
  html: string;
  className?: string;
};

/**
 * Renders markdown HTML and upgrades every `.mermaid` host element into an SVG
 * diagram. Mermaid is imported lazily, so posts without diagrams never pay for
 * it, and diagrams are re-rendered when the theme changes.
 *
 * Diagrams are composed into a detached copy of the HTML and handed back to
 * React through `dangerouslySetInnerHTML`. Mutating the live DOM instead would
 * race with React re-applying this subtree and silently drop the SVG.
 *
 * A diagram wider than the article column scrolls inside its host and gains an
 * expand button that opens the same SVG at full size over the page.
 */
export default function MermaidRenderer({ html, className }: Props) {
  const [renderedHtml, setRenderedHtml] = useState<string | null>(null);
  /** SVG markup of the diagram currently shown at full size, if any. */
  const [expanded, setExpanded] = useState<string | null>(null);
  const renderCount = useRef(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const baseId = useId().replace(/[^a-zA-Z0-9]/g, "");
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const hosts = Array.from(doc.querySelectorAll<HTMLElement>(".mermaid"));
    if (hosts.length === 0) return;

    // The host is as wide as the article column regardless of what it holds, so
    // the live one can be measured before the diagrams are swapped in. A resize
    // afterwards can leave the button stale, which is why clicks that are not on
    // the button re-check the overflow on the live element.
    const columnWidth =
      wrapRef.current?.querySelector<HTMLElement>(".mermaid")?.clientWidth ?? 0;

    let cancelled = false;
    const run = renderCount.current++;

    void (async () => {
      try {
        // Loaded on demand (not statically): mermaid is large and only posts
        // that actually contain a diagram should pay for it in the client bundle.
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme: resolvedTheme === "dark" ? "dark" : "default",
          fontFamily: "inherit",
          themeVariables: {
            xyChart: {
              plotColorPalette: "#818cf8, #f472b6",
            },
          },
        });

        const diagrams: (string | null)[] = [];
        for (const [index, host] of hosts.entries()) {
          const source = host.dataset.mermaid ?? host.textContent ?? "";
          try {
            const { svg } = await mermaid.render(
              `mermaid-${baseId}-${run}-${index}`,
              source,
            );
            diagrams.push(svg);
          } catch (error) {
            console.error("[mermaid] failed to render diagram", error);
            diagrams.push(null);
          }
        }

        if (cancelled) return;

        hosts.forEach((host, index) => {
          const svg = diagrams[index];
          if (!svg) {
            // Degrade to the raw diagram source rather than a blank box.
            host.dataset.error = "true";
            return;
          }

          host.innerHTML = svg;
          host.removeAttribute("data-mermaid");

          const frame = frameDiagram(host);
          const width = sizeToViewBox(host.querySelector("svg"));
          if (width && columnWidth > 0 && width > columnWidth + 1) {
            frame.append(expandButton(host.ownerDocument));
          }
        });

        setRenderedHtml(doc.body.innerHTML);
      } catch (error) {
        // Mermaid itself could not be loaded — the raw source stays visible.
        if (cancelled) return;
        console.error("[mermaid] failed to load mermaid", error);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [html, resolvedTheme, baseId]);

  // The diagram HTML — hosts, plus the frames and expand buttons appended to
  // them — is injected through `dangerouslySetInnerHTML`, so this is a single
  // delegated listener on the wrapper rather than one per diagram.
  const handleClick = useCallback((event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement | null;
    if (!target) return;

    // The button sits beside the scrolling host, inside the same frame.
    const frame = target.closest<HTMLElement>(".mermaid-frame");
    const host = frame?.querySelector<HTMLElement>(".mermaid");
    if (!host) return;

    // A resize can leave the button on a diagram that now fits; only the
    // button opens those, a click on the diagram has to overflow to count.
    const fromButton = target.closest(".mermaid-expand") !== null;
    if (!fromButton && host.scrollWidth <= host.clientWidth + 1) return;

    const svg = host.querySelector("svg");
    if (svg) setExpanded(svg.outerHTML);
  }, []);

  // Overlay behaviour: Escape closes it, the page behind stops scrolling, and
  // focus moves to the close button and back again.
  useEffect(() => {
    if (expanded === null) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpanded(null);
    };
    const { overflow } = document.body.style;

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus();
    };
  }, [expanded]);

  return (
    <>
      <div
        ref={wrapRef}
        className={className}
        onClick={handleClick}
        dangerouslySetInnerHTML={{ __html: renderedHtml ?? html }}
      />
      {expanded !== null && (
        <div
          className="mermaid-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Diagram, full size"
          onClick={(event) => {
            if (event.target === event.currentTarget) setExpanded(null);
          }}
        >
          <button
            ref={closeRef}
            type="button"
            className="mermaid-modal-close"
            aria-label="Close diagram"
            onClick={() => setExpanded(null)}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
          <div
            className="mermaid-modal-body"
            dangerouslySetInnerHTML={{ __html: expanded }}
          />
        </div>
      )}
    </>
  );
}
