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

const codeLines = [
  { color: COLORS.textMuted, text: "// あなたのアイデアをコードに" },
  { color: COLORS.textSub, text: "const app = await AI.generate({" },
  { color: COLORS.secondary, text: '  prompt: "営業日報アプリを作って",' },
  { color: COLORS.textSub, text: '  framework: "expo",' },
  { color: COLORS.textSub, text: "});" },
];

const features = [
  { label: "講師ローテーション 15分/人", icon: "👨‍🏫" },
  { label: "AIと一緒に開発", icon: "🤖" },
  { label: "日次スタンドアップ", icon: "📊" },
];

export const WeekTwo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelOp = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleProgress = spring({ frame: frame - 5, fps, config: { damping: 200 } });

  // Code mock
  const mockScale = spring({
    frame: frame - 15,
    fps,
    config: { damping: 15, stiffness: 100 },
  });
  const mockOp = interpolate(frame - 15, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

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
            color: COLORS.secondary,
            opacity: labelOp,
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          Week 2 — Build
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
            marginBottom: 48,
          }}
        >
          <span style={{ color: COLORS.secondaryLight }}>個人開発</span>
          フェーズ
        </div>

        {/* Code mock */}
        <div
          className="rounded-2xl"
          style={{
            width: 680,
            backgroundColor: `${COLORS.bgLight}ee`,
            border: `1px solid ${COLORS.secondary}20`,
            backdropFilter: "blur(12px)",
            transform: `scale(${mockScale})`,
            opacity: mockOp,
            padding: "32px 36px",
            marginBottom: 40,
          }}
        >
          {/* Terminal dots */}
          <div className="flex gap-2" style={{ marginBottom: 20 }}>
            <div style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: "#EF4444" }} />
            <div style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: COLORS.accent }} />
            <div style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: COLORS.success }} />
          </div>

          {/* Code */}
          {codeLines.map((line, i) => {
            const lineDelay = 30 + i * 12;
            const lineOp = interpolate(frame - lineDelay, [0, 10], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            return (
              <div
                key={i}
                style={{
                  fontFamily: "'SF Mono', 'Fira Code', monospace",
                  fontSize: 17,
                  color: line.color,
                  opacity: lineOp,
                  lineHeight: 1.8,
                  letterSpacing: "0.02em",
                }}
              >
                {line.text}
              </div>
            );
          })}
        </div>

        {/* Feature badges */}
        <div className="flex gap-5">
          {features.map((f, i) => {
            const badgeDelay = 65 + i * 18;
            const badgeOp = interpolate(frame - badgeDelay, [0, 12], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const badgeY = interpolate(frame - badgeDelay, [0, 12], [15, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            return (
              <div
                key={i}
                className="flex items-center gap-3 rounded-full"
                style={{
                  padding: "12px 24px",
                  backgroundColor: `${COLORS.secondary}12`,
                  border: `1px solid ${COLORS.secondary}30`,
                  opacity: badgeOp,
                  transform: `translateY(${badgeY}px)`,
                }}
              >
                <span style={{ fontSize: 18 }}>{f.icon}</span>
                <span
                  style={{
                    fontFamily: FONTS.body,
                    fontSize: 16,
                    fontWeight: 500,
                    color: COLORS.textSub,
                    letterSpacing: "0.02em",
                  }}
                >
                  {f.label}
                </span>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
