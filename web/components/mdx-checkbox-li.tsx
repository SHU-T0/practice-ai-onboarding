"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { useProgressStore } from "@/lib/progress-store";
import { useChapterId } from "./chapter-context";
import { useNextCheckboxIndex } from "./checkbox-counter-context";
import { useHasMounted } from "@/lib/use-has-mounted";

interface MdxCheckboxLiProps {
  children?: React.ReactNode;
  [key: string]: unknown;
}

export function MdxCheckboxLi({ children, ...props }: MdxCheckboxLiProps) {
  const childArray = Array.isArray(children) ? children : [children];
  const firstChild = childArray[0];

  // Detect checkbox pattern from markdown `- [ ]` / `- [x]`
  const isCheckbox =
    typeof firstChild === "object" &&
    firstChild !== null &&
    "type" in firstChild &&
    (firstChild as React.ReactElement).type === "input" &&
    (firstChild as React.ReactElement<{ type?: string }>).props?.type ===
      "checkbox";

  if (!isCheckbox) {
    return (
      <li className="leading-7" {...props}>
        {children}
      </li>
    );
  }

  const restChildren = childArray.slice(1);

  return (
    <li className="list-none -ml-6" {...props}>
      <CheckboxItem>{restChildren}</CheckboxItem>
    </li>
  );
}

function CheckboxItem({ children }: { children: React.ReactNode }) {
  const chapterId = useChapterId();
  const itemIndex = useNextCheckboxIndex();
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
