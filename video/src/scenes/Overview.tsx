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

const weeks = [
  { label: "W0", title: "事前準備", desc: "環境構築", color: COLORS.textMuted },
  { label: "W1", title: "基礎習得", desc: "5日間集中講義", color: COLORS.primary },
  { label: "W2", title: "個人開発", desc: "AIペア開発", color: COLORS.secondary },
  { label: "W3", title: "仕上げ", desc: "テスト・発表", color: COLORS.accent },
];

export const Overview: React.FC = () => {
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
            marginBottom: 16,
          }}
        >
          Program Overview
        </div>

        {/* Title */}
        <div
          style={{
            fontFamily: FONTS.main,
            fontSize: 44,
            fontWeight: 700,
            color: COLORS.text,
            letterSpacing: "0.04em",
            opacity: interpolate(titleProgress, [0, 0.3], [0, 1], { extrapolateRight: "clamp" }),
            marginBottom: 80,
          }}
        >
          プログラム全体像
        </div>

        {/* Timeline */}
        <div className="relative flex items-start" style={{ width: 1100 }}>
          {/* Connecting line */}
          {[0, 1, 2].map((i) => {
            const lineDelay = 40 + i * 45;
            const lineProgress = interpolate(frame - lineDelay, [0, 30], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.quad),
            });
            const startX = i * 275 + 137;
            return (
              <div
                key={`line-${i}`}
                className="absolute"
                style={{
                  left: startX,
                  top: 30,
                  width: 275 * lineProgress,
                  height: 2,
                  background: `linear-gradient(90deg, ${weeks[i].color}66, ${weeks[i + 1].color}66)`,
                }}
              />
            );
          })}

          {/* Nodes */}
          {weeks.map((w, i) => {
            const nodeDelay = 25 + i * 45;
            const nodeScale = spring({
              frame: frame - nodeDelay,
              fps,
              config: { damping: 12, stiffness: 100 },
            });
            const nodeOp = interpolate(frame - nodeDelay, [0, 12], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            const textDelay = nodeDelay + 18;
            const textOp = interpolate(frame - textDelay, [0, 12], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const textY = interpolate(frame - textDelay, [0, 12], [10, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            return (
              <div
                key={i}
                className="flex flex-col items-center"
                style={{ width: 275 }}
              >
                {/* Circle node */}
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    backgroundColor: `${w.color}20`,
                    border: `2px solid ${w.color}`,
                    transform: `scale(${nodeScale})`,
                    opacity: nodeOp,
                    boxShadow: `0 0 24px ${w.color}33`,
                  }}
                >
                  <span
                    style={{
                      fontFamily: FONTS.en,
                      fontSize: 16,
                      fontWeight: 700,
                      color: w.color,
                      letterSpacing: "0.05em",
                    }}
                  >
                    {w.label}
                  </span>
                </div>

                {/* Title */}
                <div
                  style={{
                    fontFamily: FONTS.main,
                    fontSize: 24,
                    fontWeight: 700,
                    color: COLORS.text,
                    marginTop: 20,
                    opacity: textOp,
                    transform: `translateY(${textY}px)`,
                    letterSpacing: "0.04em",
                  }}
                >
                  {w.title}
                </div>

                {/* Description */}
                <div
                  style={{
                    fontFamily: FONTS.body,
                    fontSize: 16,
                    color: COLORS.textSub,
                    marginTop: 8,
                    opacity: textOp,
                    transform: `translateY(${textY}px)`,
                    letterSpacing: "0.02em",
                  }}
                >
                  {w.desc}
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
