import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
} from "remotion";
import { Background } from "../components/Background";
import { COLORS } from "../styles/colors";
import { FONTS } from "../styles/fonts";

const days = [
  { day: 1, theme: "AI基礎 & プロンプト", output: "ChatGPT活用", accent: COLORS.primary },
  { day: 2, theme: "モバイルUI設計", output: "Figma→v0変換", accent: COLORS.primaryLight },
  { day: 3, theme: "Expo & React Native", output: "Hello World App", accent: COLORS.secondary },
  { day: 4, theme: "Supabase連携", output: "データCRUD", accent: COLORS.secondaryLight },
  { day: 5, theme: "統合 & デプロイ", output: "MVP完成", accent: COLORS.accent },
];

export const WeekOne: React.FC = () => {
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
            color: COLORS.primary,
            opacity: labelOp,
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          Week 1 — Foundation
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
            marginBottom: 60,
          }}
        >
          基礎習得{" "}
          <span style={{ color: COLORS.primaryLight }}>5日間</span>
          集中講義
        </div>

        {/* Day cards - staircase layout */}
        <div className="flex gap-5 items-end" style={{ width: 1400 }}>
          {days.map((d, i) => {
            const cardDelay = 20 + i * 22;
            const cardScale = spring({
              frame: frame - cardDelay,
              fps,
              config: { damping: 14, stiffness: 100 },
            });
            const cardOp = interpolate(frame - cardDelay, [0, 12], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            return (
              <div
                key={i}
                className="flex-1 rounded-2xl"
                style={{
                  backgroundColor: `${COLORS.bgLight}cc`,
                  border: `1px solid ${d.accent}25`,
                  backdropFilter: "blur(8px)",
                  transform: `scale(${cardScale}) translateY(${-i * 10}px)`,
                  opacity: cardOp,
                  padding: "28px 24px",
                }}
              >
                {/* Day badge */}
                <div
                  style={{
                    fontFamily: FONTS.en,
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    color: d.accent,
                    textTransform: "uppercase",
                    marginBottom: 14,
                  }}
                >
                  Day {d.day}
                </div>

                {/* Theme */}
                <div
                  style={{
                    fontFamily: FONTS.main,
                    fontSize: 20,
                    fontWeight: 700,
                    color: COLORS.text,
                    letterSpacing: "0.04em",
                    marginBottom: 16,
                    lineHeight: 1.4,
                  }}
                >
                  {d.theme}
                </div>

                {/* Output */}
                <div className="flex items-center gap-3">
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: COLORS.success,
                      boxShadow: `0 0 8px ${COLORS.success}66`,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: FONTS.body,
                      fontSize: 14,
                      color: COLORS.textSub,
                      letterSpacing: "0.02em",
                    }}
                  >
                    {d.output}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
