import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { Background } from "../components/Background";
import { COLORS } from "../styles/colors";
import { FONTS } from "../styles/fonts";

const outcomes = [
  {
    icon: "📱",
    title: "iOSアプリ",
    desc: "自分のアイデアが\n実機で動く",
    color: COLORS.primary,
    en: "Your Own App",
  },
  {
    icon: "💡",
    title: "AI開発スキル",
    desc: "AIを使いこなす\n新しい開発力",
    color: COLORS.secondary,
    en: "AI-Powered Skills",
  },
  {
    icon: "🚀",
    title: "ビジネスインパクト",
    desc: "アイデアを即座に\nプロトタイプ化",
    color: COLORS.accent,
    en: "Business Impact",
  },
];

export const Outcomes: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelOp = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleProgress = spring({ frame: frame - 5, fps, config: { damping: 200 } });

  return (
    <AbsoluteFill>
      <Background showDots showParticles={false} />

      <AbsoluteFill className="flex flex-col items-center justify-center">
        {/* Section label */}
        <div
          style={{
            fontFamily: FONTS.en,
            fontSize: 14,
            fontWeight: 500,
            letterSpacing: "0.3em",
            color: COLORS.textMuted,
            opacity: labelOp,
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          Expected Outcomes
        </div>

        {/* Title */}
        <div
          style={{
            fontFamily: FONTS.main,
            fontSize: 42,
            fontWeight: 700,
            color: COLORS.text,
            letterSpacing: "0.04em",
            opacity: interpolate(titleProgress, [0, 0.3], [0, 1], { extrapolateRight: "clamp" }),
            marginBottom: 64,
          }}
        >
          期待される成果
        </div>

        {/* Cards */}
        <div className="flex gap-8">
          {outcomes.map((o, i) => {
            const cardDelay = 15 + i * 28;

            const slideUp = spring({
              frame: frame - cardDelay,
              fps,
              config: { damping: 200 },
            });
            const y = interpolate(slideUp, [0, 1], [60, 0]);
            const cardOp = interpolate(slideUp, [0, 0.3], [0, 1], {
              extrapolateRight: "clamp",
            });

            // Subtle glow pulse after appear
            const pulseFrame = frame - cardDelay - 30;
            const pulse =
              pulseFrame > 0
                ? interpolate(
                    Math.sin(pulseFrame * 0.06) * 0.5 + 0.5,
                    [0, 1],
                    [0, 0.2]
                  )
                : 0;

            return (
              <div
                key={i}
                className="flex flex-col items-center text-center rounded-2xl"
                style={{
                  width: 340,
                  backgroundColor: `${COLORS.bgLight}cc`,
                  border: `1px solid ${o.color}25`,
                  backdropFilter: "blur(8px)",
                  transform: `translateY(${y}px)`,
                  opacity: cardOp,
                  boxShadow: `0 0 ${pulse * 40}px ${o.color}33`,
                  padding: "40px 32px",
                }}
              >
                {/* Icon */}
                <div style={{ fontSize: 52, marginBottom: 20 }}>{o.icon}</div>

                {/* EN label */}
                <div
                  style={{
                    fontFamily: FONTS.en,
                    fontSize: 12,
                    fontWeight: 500,
                    letterSpacing: "0.15em",
                    color: o.color,
                    textTransform: "uppercase",
                    marginBottom: 8,
                  }}
                >
                  {o.en}
                </div>

                {/* Title */}
                <div
                  style={{
                    fontFamily: FONTS.main,
                    fontSize: 24,
                    fontWeight: 700,
                    color: COLORS.text,
                    letterSpacing: "0.04em",
                    marginBottom: 12,
                  }}
                >
                  {o.title}
                </div>

                {/* Description */}
                <div
                  style={{
                    fontFamily: FONTS.body,
                    fontSize: 15,
                    color: COLORS.textSub,
                    letterSpacing: "0.02em",
                    whiteSpace: "pre-line",
                    lineHeight: 1.6,
                  }}
                >
                  {o.desc}
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
