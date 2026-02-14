import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import { CodeBlock } from "./code-block";
import { MdxCheckboxLi } from "./mdx-checkbox-li";
import { AlertTriangle, Lightbulb, Info } from "lucide-react";
import { createHeadingIdFactory } from "@/lib/heading-utils";

// Create per-render MDX component mapping so heading IDs are deterministic
// and unique even when headings have the same text.

export function createMdxComponents(): MDXRemoteProps["components"] {
  const nextHeadingId = createHeadingIdFactory();

  return {
  h1: ({ children, ...props }) => (
    <h1
      className="mt-8 mb-4 text-3xl font-bold tracking-tight"
      {...props}
    >
      {children}
    </h1>
  ),

  h2: ({ children, ...props }) => {
    const id = nextHeadingId(extractText(children));
    return (
      <h2
        id={id}
        className="mt-10 mb-4 scroll-mt-20 border-b pb-2 text-2xl font-bold tracking-tight"
        {...props}
      >
        {children}
      </h2>
    );
  },

  h3: ({ children, ...props }) => {
    const id = nextHeadingId(extractText(children));
    return (
      <h3
        id={id}
        className="mt-8 mb-3 scroll-mt-20 text-xl font-semibold tracking-tight"
        {...props}
      >
        {children}
      </h3>
    );
  },

  h4: ({ children, ...props }) => (
    <h4 className="mt-6 mb-2 text-lg font-semibold" {...props}>
      {children}
    </h4>
  ),

  p: ({ children, ...props }) => (
    <p className="mb-4 leading-7" {...props}>
      {children}
    </p>
  ),

  ul: ({ children, ...props }) => (
    <ul className="mb-4 ml-6 list-disc space-y-1" {...props}>
      {children}
    </ul>
  ),

  ol: ({ children, ...props }) => (
    <ol className="mb-4 ml-6 list-decimal space-y-1" {...props}>
      {children}
    </ol>
  ),

  li: (props) => {
    // Delegate to client component for checkbox detection
    return <MdxCheckboxLi {...props} />;
  },

  pre: ({ children, style, ...props }: React.ComponentPropsWithoutRef<"pre"> & { style?: React.CSSProperties }) => {
    const codeElement = children as React.ReactElement<{
      className?: string;
      children?: React.ReactNode;
    }>;
    if (
      codeElement &&
      typeof codeElement === "object" &&
      "props" in codeElement
    ) {
      const lang = codeElement.props.className
        ?.replace(/language-/, "")
        .replace(/shiki/, "")
        .trim();
      return (
        <div className="mb-4" style={style}>
          <CodeBlock language={lang || undefined}>
            <code className={codeElement.props.className}>
              {codeElement.props.children}
            </code>
          </CodeBlock>
        </div>
      );
    }
    return <pre {...props}>{children}</pre>;
  },

  code: ({
    children,
    className,
    ...props
  }: React.ComponentPropsWithoutRef<"code">) => {
    // Inline code only — block code is handled by pre
    if (!className || className.includes("shiki")) {
      if (!className) {
        return (
          <code
            className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono"
            {...props}
          >
            {children}
          </code>
        );
      }
    }
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },

  blockquote: ({ children, ...props }) => {
    const text = extractText(children);
    let Icon = Info;
    let borderColor = "border-blue-500";
    let bgColor = "bg-blue-50 dark:bg-blue-950/30";

    if (text.includes("⚠") || text.includes("注意") || text.includes("Warning")) {
      Icon = AlertTriangle;
      borderColor = "border-amber-500";
      bgColor = "bg-amber-50 dark:bg-amber-950/30";
    } else if (
      text.includes("💡") ||
      text.includes("ヒント") ||
      text.includes("Tip")
    ) {
      Icon = Lightbulb;
      borderColor = "border-emerald-500";
      bgColor = "bg-emerald-50 dark:bg-emerald-950/30";
    }

    return (
      <blockquote
        className={`mb-4 flex gap-3 rounded-lg border-l-4 ${borderColor} ${bgColor} p-4`}
        {...props}
      >
        <Icon className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
        <div className="[&>p]:mb-0">{children}</div>
      </blockquote>
    );
  },

  table: ({ children, ...props }) => (
    <div className="mb-4 overflow-x-auto rounded-lg border">
      <table className="w-full text-sm" {...props}>
        {children}
      </table>
    </div>
  ),

  thead: ({ children, ...props }) => (
    <thead className="border-b bg-muted/50" {...props}>
      {children}
    </thead>
  ),

  th: ({ children, ...props }) => (
    <th
      className="px-4 py-2 text-left font-semibold text-muted-foreground"
      {...props}
    >
      {children}
    </th>
  ),

  td: ({ children, ...props }) => (
    <td className="px-4 py-2 border-t" {...props}>
      {children}
    </td>
  ),

  a: ({ children, href, ...props }) => (
    <a
      href={href}
      className="text-primary underline underline-offset-4 hover:text-primary/80"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    >
      {children}
    </a>
  ),

  hr: () => <hr className="my-8 border-t" />,

  strong: ({ children, ...props }) => (
    <strong className="font-semibold" {...props}>
      {children}
    </strong>
  ),
  };
}

function extractText(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (!node) return "";
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (typeof node === "object" && node !== null && "props" in node) {
    const el = node as { props: { children?: React.ReactNode } };
    return extractText(el.props.children);
  }
  return "";
}
