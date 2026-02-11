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

const beforeItems = [
  { icon: "⏳", text: "IT部門に依頼 → 数ヶ月待ち" },
  { icon: "💸", text: "外注 → 数百万のコスト" },
  { icon: "💭", text: "アイデアが形にならない" },
];

const afterItems = [
  { icon: "⚡", text: "3週間でアプリ完成" },
  { icon: "🤖", text: "AIが書く、あなたが指示" },
  { icon: "📱", text: "TestFlight配布まで" },
];

export const Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Section label
  const labelOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Title
  const titleProgress = spring({ frame: frame - 5, fps, config: { damping: 200 } });
  const titleOpacity = interpolate(titleProgress, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Left panel
  const leftProgress = spring({ frame: frame - 20, fps, config: { damping: 200 } });
  const leftX = interpolate(leftProgress, [0, 1], [-80, 0]);

  // Right panel
  const rightProgress = spring({ frame: frame - 40, fps, config: { damping: 200 } });
  const rightX = interpolate(rightProgress, [0, 1], [80, 0]);

  // VS divider
  const vsScale = spring({ frame: frame - 60, fps, config: { damping: 12, stiffness: 120 } });
  const vsOpacity = interpolate(frame - 60, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <Background showDots={true} showParticles={false} />

      <AbsoluteFill className="flex flex-col items-center justify-center px-28">
        {/* Section label */}
        <div
          style={{
            fontFamily: FONTS.en,
            fontSize: 14,
            fontWeight: 500,
            letterSpacing: "0.3em",
            color: COLORS.textMuted,
            opacity: labelOpacity,
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          Why Now?
        </div>

        {/* Title */}
        <div
          style={{
            fontFamily: FONTS.main,
            fontSize: 44,
            fontWeight: 700,
            color: COLORS.text,
            letterSpacing: "0.04em",
            opacity: titleOpacity,
            marginBottom: 56,
          }}
        >
          なぜ今、
          <span style={{ color: COLORS.accent }}>AIオンボーディング</span>
          なのか
        </div>

        {/* Panels */}
        <div className="flex items-stretch gap-8" style={{ width: 1400 }}>
          {/* Before */}
          <div
            className="flex-1 rounded-3xl p-10"
            style={{
              backgroundColor: `${COLORS.bgLight}cc`,
              border: `1px solid ${COLORS.error}20`,
              transform: `translateX(${leftX}px)`,
              opacity: interpolate(leftProgress, [0, 0.3], [0, 1], { extrapolateRight: "clamp" }),
              backdropFilter: "blur(8px)",
            }}
          >
            <div
              style={{
                fontFamily: FONTS.en,
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.2em",
                color: COLORS.error,
                marginBottom: 28,
                textTransform: "uppercase",
              }}
            >
              Before
            </div>
            {beforeItems.map((item, i) => {
              const d = 50 + i * 20;
              const op = interpolate(frame - d, [0, 15], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              const y = interpolate(frame - d, [0, 15], [12, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              return (
                <div
                  key={i}
                  className="flex items-center gap-4"
                  style={{
                    opacity: op,
                    transform: `translateY(${y}px)`,
                    marginBottom: i < beforeItems.length - 1 ? 20 : 0,
                  }}
                >
                  <span style={{ fontSize: 28 }}>{item.icon}</span>
                  <span
                    style={{
                      fontFamily: FONTS.body,
                      fontSize: 22,
                      color: COLORS.textSub,
                      letterSpacing: "0.02em",
                    }}
                  >
                    {item.text}
                  </span>
                </div>
              );
            })}
          </div>

          {/* VS badge */}
          <div className="flex items-center">
            <div
              style={{
                fontFamily: FONTS.en,
                fontSize: 16,
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: COLORS.textMuted,
                opacity: vsOpacity,
                transform: `scale(${vsScale})`,
                width: 48,
                height: 48,
                borderRadius: 24,
                border: `1px solid ${COLORS.textMuted}33`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              VS
            </div>
          </div>

          {/* After */}
          <div
            className="flex-1 rounded-3xl p-10"
            style={{
              backgroundColor: `${COLORS.bgLight}cc`,
              border: `1px solid ${COLORS.success}20`,
              transform: `translateX(${rightX}px)`,
              opacity: interpolate(rightProgress, [0, 0.3], [0, 1], { extrapolateRight: "clamp" }),
              backdropFilter: "blur(8px)",
            }}
          >
            <div
              style={{
                fontFamily: FONTS.en,
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.2em",
                color: COLORS.success,
                marginBottom: 28,
                textTransform: "uppercase",
              }}
            >
              After
            </div>
            {afterItems.map((item, i) => {
              const d = 80 + i * 20;
              const op = interpolate(frame - d, [0, 15], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              const y = interpolate(frame - d, [0, 15], [12, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              return (
                <div
                  key={i}
                  className="flex items-center gap-4"
                  style={{
                    opacity: op,
                    transform: `translateY(${y}px)`,
                    marginBottom: i < afterItems.length - 1 ? 20 : 0,
                  }}
                >
                  <span style={{ fontSize: 28 }}>{item.icon}</span>
                  <span
                    style={{
                      fontFamily: FONTS.body,
                      fontSize: 22,
                      color: COLORS.text,
                      letterSpacing: "0.02em",
                    }}
                  >
                    {item.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
