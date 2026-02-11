import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6366F1",
        secondary: "#06B6D4",
        accent: "#F59E0B",
        "bg-dark": "#0F172A",
        "bg-light": "#1E293B",
        "text-main": "#F8FAFC",
        "text-sub": "#94A3B8",
        success: "#22C55E",
      },
    },
  },
  plugins: [],
} satisfies Config;
