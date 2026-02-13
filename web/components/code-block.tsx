"use client";

import { useState, useRef, useCallback } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  children: React.ReactNode;
  language?: string;
}

export function CodeBlock({ children, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const handleCopy = useCallback(async () => {
    const text = preRef.current?.textContent || "";
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <div className="group relative">
      {language && (
        <div className="absolute top-0 left-3 z-10 rounded-b bg-white/10 px-2 py-0.5 text-xs text-gray-400">
          {language}
        </div>
      )}
      <button
        onClick={handleCopy}
        className="absolute right-2 top-2 z-10 rounded-md border border-white/10 bg-white/5 p-1.5 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-white/10"
        aria-label="Copy code"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-green-400" />
        ) : (
          <Copy className="h-3.5 w-3.5 text-gray-400" />
        )}
      </button>
      <pre
        ref={preRef}
        className="overflow-x-auto rounded-lg border border-white/10 p-4 pt-8 text-sm [&>code]:bg-transparent"
      >
        {children}
      </pre>
    </div>
  );
}
