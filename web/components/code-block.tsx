"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  children: string;
  className?: string;
}

export function CodeBlock({ children, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const language = className?.replace(/language-/, "") || "";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative">
      {language && (
        <div className="absolute top-0 left-3 rounded-b bg-muted px-2 py-0.5 text-xs text-muted-foreground">
          {language}
        </div>
      )}
      <button
        onClick={handleCopy}
        className="absolute right-2 top-2 rounded-md border bg-background/80 p-1.5 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-muted"
        aria-label="Copy code"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-green-500" />
        ) : (
          <Copy className="h-3.5 w-3.5 text-muted-foreground" />
        )}
      </button>
      <pre className={`overflow-x-auto rounded-lg border bg-muted/50 p-4 pt-8 text-sm ${className || ""}`}>
        <code>{children}</code>
      </pre>
    </div>
  );
}
