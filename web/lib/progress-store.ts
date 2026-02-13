"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProgressState {
  checkedItems: Record<string, boolean>;
  toggleItem: (chapterId: string, itemIndex: number) => void;
  isItemChecked: (chapterId: string, itemIndex: number) => boolean;
  getChapterProgress: (chapterId: string, totalItems: number) => number;
  getOverallProgress: (
    chapters: { slug: string; checklistCount: number }[]
  ) => number;
  resetProgress: () => void;
}

function itemKey(chapterId: string, itemIndex: number): string {
  return `${chapterId}:${itemIndex}`;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      checkedItems: {},

      toggleItem: (chapterId: string, itemIndex: number) => {
        const key = itemKey(chapterId, itemIndex);
        set((state) => ({
          checkedItems: {
            ...state.checkedItems,
            [key]: !state.checkedItems[key],
          },
        }));
      },

      isItemChecked: (chapterId: string, itemIndex: number) => {
        const key = itemKey(chapterId, itemIndex);
        return !!get().checkedItems[key];
      },

      getChapterProgress: (chapterId: string, totalItems: number) => {
        if (totalItems === 0) return 0;
        const checked = Object.keys(get().checkedItems).filter(
          (key) => key.startsWith(`${chapterId}:`) && get().checkedItems[key]
        ).length;
        return Math.round((checked / totalItems) * 100);
      },

      getOverallProgress: (
        chapters: { slug: string; checklistCount: number }[]
      ) => {
        const totalItems = chapters.reduce(
          (sum, ch) => sum + ch.checklistCount,
          0
        );
        if (totalItems === 0) return 0;
        const checkedItems = get().checkedItems;
        const slugSet = new Set(chapters.map((ch) => ch.slug));
        const checked = Object.entries(checkedItems).filter(
          ([key, val]) => val && slugSet.has(key.split(":")[0])
        ).length;
        return Math.min(100, Math.round((checked / totalItems) * 100));
      },

      resetProgress: () => set({ checkedItems: {} }),
    }),
    {
      name: "onboarding-progress",
    }
  )
);
