"use client";

import { createContext, useContext, useRef } from "react";

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
  const counterRef = useRef(0);
  // Reset counter on each render (new page)
  counterRef.current = 0;

  return (
    <ChapterContext.Provider value={chapterId}>
      <ChecklistCounterContext.Provider
        value={{ next: () => counterRef.current++ }}
      >
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
