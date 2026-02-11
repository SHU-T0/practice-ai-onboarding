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

const principles = [
  { num: "01", title: "AI → ペア → 講師", sub: "3段階サポート", color: COLORS.primary },
  { num: "02", title: "座学15分以内", sub: "即・実践", color: COLORS.secondary },
  { num: "03", title: "コードを書かない", sub: "AIに指示を出す", color: COLORS.accent },
  { num: "04", title: "エラー =", sub: "学びの機会", color: COLORS.success },
];

const PRINCIPLE_DURATION = 60;

export const Principles: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelOp = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleProgress = spring({ frame: frame - 5, fps, config: { damping: 200 } });

  // Progress dots
  const activePrincipleIndex = Math.min(
    Math.floor(Math.max(0, frame - 20) / PRINCIPLE_DURATION),
    principles.length - 1
  );

  return (
    <AbsoluteFill>
      <Background showDots showParticles={false} />

      <AbsoluteFill className="flex flex-col items-center justify-center">
        {/* Section label */}
        <div
          className="absolute"
          style={{
            top: 100,
            fontFamily: FONTS.en,
            fontSize: 14,
            fontWeight: 500,
            letterSpacing: "0.3em",
            color: COLORS.textMuted,
            opacity: labelOp,
            textTransform: "uppercase",
          }}
        >
          Core Principles
        </div>

        {/* Title */}
        <div
          className="absolute"
          style={{
            top: 130,
            fontFamily: FONTS.main,
            fontSize: 36,
            fontWeight: 700,
            color: COLORS.text,
            letterSpacing: "0.04em",
            opacity: interpolate(titleProgress, [0, 0.3], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          教育の4原則
        </div>

        {/* Progress indicators */}
        <div
          className="absolute flex gap-3"
          style={{ bottom: 100, opacity: labelOp }}
        >
          {principles.map((p, i) => (
            <div
              key={i}
              style={{
                width: i <= activePrincipleIndex ? 32 : 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: i <= activePrincipleIndex ? p.color : `${COLORS.textMuted}40`,
                transition: "none",
              }}
            />
          ))}
        </div>

        {/* Cycling principles */}
        {principles.map((p, i) => {
          const startFrame = 20 + i * PRINCIPLE_DURATION;
          const localFrame = frame - startFrame;

          // Enter
          const enterScale = spring({
            frame: localFrame,
            fps,
            config: { damping: 12, stiffness: 100 },
          });
          const enterOp = interpolate(localFrame, [0, 10], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          // Text slide
          const textProgress = spring({
            frame: localFrame - 10,
            fps,
            config: { damping: 200 },
          });
          const textX = interpolate(textProgress, [0, 1], [40, 0]);
          const textOp = interpolate(textProgress, [0, 0.5], [0, 1], {
            extrapolateRight: "clamp",
          });

          // Exit
          const exitFrame = localFrame - (PRINCIPLE_DURATION - 15);
          const exitY = interpolate(exitFrame, [0, 15], [0, -60], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const exitOp = interpolate(exitFrame, [0, 15], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          const isVisible = localFrame >= -5 && localFrame < PRINCIPLE_DURATION + 5;
          if (!isVisible) return null;

          return (
            <div
              key={i}
              className="absolute flex items-center gap-12"
              style={{
                transform: `scale(${enterScale}) translateY(${exitY}px)`,
                opacity: enterOp * exitOp,
              }}
            >
              {/* Large number */}
              <div
                style={{
                  fontFamily: FONTS.en,
                  fontSize: 120,
                  fontWeight: 700,
                  color: p.color,
                  opacity: 0.15,
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}
              >
                {p.num}
              </div>

              {/* Text block */}
              <div
                style={{
                  transform: `translateX(${textX}px)`,
                  opacity: textOp,
                }}
              >
                <div
                  style={{
                    fontFamily: FONTS.main,
                    fontSize: 48,
                    fontWeight: 700,
                    color: COLORS.text,
                    letterSpacing: "0.04em",
                    lineHeight: 1.3,
                    marginBottom: 8,
                  }}
                >
                  {p.title}
                </div>
                <div
                  style={{
                    fontFamily: FONTS.body,
                    fontSize: 28,
                    color: p.color,
                    letterSpacing: "0.06em",
                  }}
                >
                  {p.sub}
                </div>
              </div>
            </div>
          );
        })}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
