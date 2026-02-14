"use client";

import { createContext, useContext } from "react";

const ChapterContext = createContext<string>("");
const ChecklistCounterContext = createContext<{ next: () => number }>({
  next: () => 0,
});

export function ChapterProvider({
  chapterId,
  children,
}: {
  chapterId: string;
  children: React.ReactNode;
}) {
  let counter = 0;

  return (
    <ChapterContext.Provider value={chapterId}>
      <ChecklistCounterContext.Provider value={{ next: () => counter++ }}>
        {children}
      </ChecklistCounterContext.Provider>
    </ChapterContext.Provider>
  );
}

export function useChapterId() {
  return useContext(ChapterContext);
}

export function useChecklistCounter() {
  return useContext(ChecklistCounterContext);
}
