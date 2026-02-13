"use client";

import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  value: number;
  label?: string;
  showPercentage?: boolean;
  size?: "sm" | "md";
}

export function ProgressBar({
  value,
  label,
  showPercentage = true,
  size = "md",
}: ProgressBarProps) {
  return (
    <div className="space-y-1.5">
      {(label || showPercentage) && (
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          {label && <span>{label}</span>}
          {showPercentage && <span>{value}%</span>}
        </div>
      )}
      <Progress value={value} className={size === "sm" ? "h-1.5" : "h-2.5"} />
    </div>
  );
}
