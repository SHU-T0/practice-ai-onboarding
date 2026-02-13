"use client";

import { createContext, useContext, useRef } from "react";

const CheckboxCounterContext = createContext<React.RefObject<number> | null>(
  null
);

export function CheckboxCounterProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const counterRef = useRef(0);
  // Reset counter at start of each render pass so indices are stable
  counterRef.current = 0;
  return (
    <CheckboxCounterContext.Provider value={counterRef}>
      {children}
    </CheckboxCounterContext.Provider>
  );
}

export function useNextCheckboxIndex(): number {
  const ref = useContext(CheckboxCounterContext);
  if (!ref) return 0;
  return (ref as React.MutableRefObject<number>).current++;
}
