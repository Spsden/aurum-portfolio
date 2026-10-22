import type { Element, Root } from "hast";
import { visit } from "unist-util-visit";

function textOf(node: Element): string {
  let out = "";
  visit(node, "text", (text) => {
    out += text.value;
  });
  return out;
}

/**
 * Rewrites ```mermaid fenced code blocks into a host element:
 *
 *   <div class="mermaid not-prose" data-mermaid="graph TD; ...">…</div>
 *
 * The client-side `MermaidRenderer` scans for `.mermaid` nodes and renders them
 * with mermaid.js, re-rendering whenever the theme changes. The original source
 * is preserved in `data-mermaid` so it can be re-rendered (and shown as a
 * fallback if the diagram is invalid).
 */
export function rehypeMermaid() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element, index, parent) => {
      if (node.tagName !== "pre" || index == null || !parent) return;

      const code = node.children[0];
      if (!code || code.type !== "element" || code.tagName !== "code") return;

      const classes = code.properties?.className;
      if (!Array.isArray(classes) || !classes.includes("language-mermaid")) return;

      const value = textOf(code).replace(/\n$/, "");
      const replacement: Element = {
        type: "element",
        tagName: "div",
        properties: {
          className: ["mermaid", "not-prose"],
          "data-mermaid": value,
        },
        children: [{ type: "text", value }],
      };

      parent.children[index] = replacement;
    });
  };
}
