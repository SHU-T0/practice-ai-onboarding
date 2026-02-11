export const COLORS = {
  primary: "#6366F1",
  primaryLight: "#818CF8",
  secondary: "#06B6D4",
  secondaryLight: "#22D3EE",
  accent: "#F59E0B",
  accentLight: "#FBBF24",
  bgDark: "#0F172A",
  bgLight: "#1E293B",
  bgCard: "#1E293B",
  text: "#F8FAFC",
  textSub: "#94A3B8",
  textMuted: "#64748B",
  success: "#22C55E",
  error: "#EF4444",
} as const;

// Gradient presets
export const GRADIENTS = {
  primaryToSecondary: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`,
  accentWarm: `linear-gradient(135deg, ${COLORS.accent}, #F97316)`,
  meshBg: `
    radial-gradient(ellipse at 20% 50%, ${COLORS.primary}15 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, ${COLORS.secondary}12 0%, transparent 50%),
    radial-gradient(ellipse at 50% 80%, ${COLORS.accent}08 0%, transparent 50%)
  `,
  meshBgStrong: `
    radial-gradient(ellipse at 20% 50%, ${COLORS.primary}25 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, ${COLORS.secondary}20 0%, transparent 50%),
    radial-gradient(ellipse at 50% 80%, ${COLORS.accent}15 0%, transparent 50%)
  `,
} as const;
