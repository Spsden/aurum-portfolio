import type { Element, Root } from "hast";
import { visit } from "unist-util-visit";

type Options = {
  /** Prefix applied to relative sources, e.g. "/blogs/<slug>/" */
  base: string;
};

/**
 * Post bodies reference their co-located assets relatively:
 *
 *   ![alt](./images/diagram.svg "Optional caption")
 *
 * This plugin (1) rewrites the source to its served location, so the example
 * above becomes `/blogs/<slug>/images/diagram.svg`, and (2) lifts a markdown
 * title into a `<figure>/<figcaption>` pair.
 */
export function rehypeImages({ base }: Options) {
  return (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      if (node.tagName !== "img") return;
      const properties = (node.properties ??= {});
      const src = properties.src;
      const relative =
        typeof src === "string" &&
        !/^(?:[a-z]+:)?\/\//i.test(src) &&
        !src.startsWith("/") &&
        !src.startsWith("#");
      if (relative) {
        properties.src = base + (src as string).replace(/^\.?\/+/, "");
      }
    });

    visit(tree, "element", (node: Element) => {
      if (node.tagName !== "p") return;

      const children = node.children.filter(
        (child) => !(child.type === "text" && child.value.trim() === ""),
      );
      if (children.length !== 1) return;

      const image = children[0];
      if (image.type !== "element" || image.tagName !== "img") return;

      const title = image.properties?.title;
      if (typeof title !== "string" || !title) return;

      delete image.properties.title;
      node.tagName = "figure";
      node.children = [
        image,
        {
          type: "element",
          tagName: "figcaption",
          properties: {},
          children: [{ type: "text", value: title }],
        },
      ];
    });
  };
}
