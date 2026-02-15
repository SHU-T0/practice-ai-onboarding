"use client";

import { useRef } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useProgressStore } from "@/lib/progress-store";
import { useChapterId } from "./chapter-context";
import { useNextCheckboxIndex } from "./checkbox-counter-context";
import { useHasMounted } from "@/lib/use-has-mounted";

interface MdxCheckboxLiProps {
  children?: React.ReactNode;
  [key: string]: unknown;
}

/** Check whether a React node is an <input type="checkbox"> element. */
function isInputCheckbox(node: React.ReactNode): boolean {
  return (
    typeof node === "object" &&
    node !== null &&
    "type" in node &&
    (node as React.ReactElement).type === "input" &&
    (node as React.ReactElement<{ type?: string }>).props?.type === "checkbox"
  );
}

/**
 * Detect the checkbox pattern produced by remark-gfm.
 *
 * Tight lists  → <li><input type="checkbox"> …text…</li>
 * Loose lists  → <li><p><input type="checkbox"> …text…</p> …rest…</li>
 *
 * Returns `{ found: true, restChildren }` when a checkbox is detected, where
 * `restChildren` is everything except the native checkbox input.
 */
function extractCheckbox(children: React.ReactNode): {
  found: boolean;
  restChildren: React.ReactNode[];
} {
  const childArray = Array.isArray(children) ? children : [children];

  // Skip leading whitespace text nodes (loose lists insert "\n" nodes).
  const firstIdx = childArray.findIndex(
    (c) => !(typeof c === "string" && c.trim() === ""),
  );
  if (firstIdx === -1) return { found: false, restChildren: childArray };

  const first = childArray[firstIdx];

  // Case 1: tight list – input is the direct first child of <li>
  if (isInputCheckbox(first)) {
    return { found: true, restChildren: childArray.slice(firstIdx + 1) };
  }

  // Case 2: loose list – first significant child is a wrapper element (native
  // <p> or custom MDX `p` component) whose own first child is the checkbox.
  if (
    typeof first === "object" &&
    first !== null &&
    "props" in first &&
    (first as React.ReactElement<{ children?: React.ReactNode }>).props
      ?.children != null
  ) {
    const wrapperProps = (
      first as React.ReactElement<{ children?: React.ReactNode }>
    ).props;
    const innerChildren = Array.isArray(wrapperProps.children)
      ? wrapperProps.children
      : [wrapperProps.children];

    if (isInputCheckbox(innerChildren[0])) {
      // Rebuild children: inline content from inside the wrapper (minus the
      // input) followed by remaining siblings (e.g. nested <ul>).
      const inlineParts = innerChildren.slice(1);
      const siblingParts = childArray.slice(firstIdx + 1);
      return { found: true, restChildren: [...inlineParts, ...siblingParts] };
    }
  }

  return { found: false, restChildren: childArray };
}

export function MdxCheckboxLi({ children, ...props }: MdxCheckboxLiProps) {
  const { found, restChildren } = extractCheckbox(children);

  if (!found) {
    return (
      <li className="leading-7" {...props}>
        {children}
      </li>
    );
  }

  return (
    <li className="list-none -ml-6" {...props}>
      <CheckboxItem>{restChildren}</CheckboxItem>
    </li>
  );
}

function CheckboxItem({ children }: { children: React.ReactNode }) {
  const chapterId = useChapterId();
  const nextIndex = useNextCheckboxIndex();
  // Stabilise the index so re-renders caused by Zustand store changes don't
  // keep incrementing the shared counter and produce wrong keys.
  const indexRef = useRef<number | null>(null);
  if (indexRef.current === null) {
    indexRef.current = nextIndex;
  }
  const itemIndex = indexRef.current;
  const mounted = useHasMounted();
  const { isItemChecked, toggleItem } = useProgressStore();
  const checked = mounted ? isItemChecked(chapterId, itemIndex) : false;

  return (
    <label className="flex items-start gap-3 py-1.5 cursor-pointer group">
      <Checkbox
        checked={checked}
        onCheckedChange={() => toggleItem(chapterId, itemIndex)}
        className="mt-0.5 shrink-0"
      />
      <span
        className={`text-sm leading-relaxed transition-colors ${
          checked ? "text-muted-foreground line-through" : "text-foreground"
        }`}
      >
        {children}
      </span>
    </label>
  );
}
