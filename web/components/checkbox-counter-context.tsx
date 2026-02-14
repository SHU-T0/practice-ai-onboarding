"use client";

import { createContext, useContext } from "react";

const CheckboxCounterContext = createContext<{ next: () => number } | null>(null);

export function CheckboxCounterProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  let counter = 0;
  return (
    <CheckboxCounterContext.Provider value={{ next: () => counter++ }}>
      {children}
    </CheckboxCounterContext.Provider>
  );
}

export function useNextCheckboxIndex(): number {
  const counterContext = useContext(CheckboxCounterContext);
  if (!counterContext) return 0;
  return counterContext.next();
}
