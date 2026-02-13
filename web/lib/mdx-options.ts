import remarkGfm from "remark-gfm";
import rehypeShiki from "@shikijs/rehype";
import type { PluggableList } from "unified";

const rehypePlugins: PluggableList = [
  [rehypeShiki as never, { theme: "github-dark" }],
];

export const mdxOptions = {
  remarkPlugins: [remarkGfm],
  rehypePlugins,
};
