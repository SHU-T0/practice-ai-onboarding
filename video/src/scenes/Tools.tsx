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

const tools = [
  { name: "Cursor", initial: "C", color: "#7C3AED", desc: "AI搭載コードエディタ" },
  { name: "Claude", initial: "Cl", color: "#D97706", desc: "AI対話アシスタント" },
  { name: "v0", initial: "v0", color: "#E5E5E5", desc: "UI自動生成" },
  { name: "Expo", initial: "Ex", color: "#4630EB", desc: "モバイルフレームワーク" },
  { name: "Supabase", initial: "Sb", color: "#3ECF8E", desc: "バックエンド基盤" },
  { name: "GitHub", initial: "Gh", color: "#8B949E", desc: "コード管理" },
];

export const Tools: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelOp = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleProgress = spring({ frame: frame - 5, fps, config: { damping: 200 } });

  // Active tool cycles
  const activeIndex = Math.min(
    Math.floor(Math.max(0, frame - 30) / 30),
    tools.length - 1
  );
  const activeTool = tools[activeIndex];
  const descOp = interpolate(
    Math.max(0, (frame - 30) % 30),
    [0, 10],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Circle layout
  const centerX = 960;
  const centerY = 560;
  const radius = 260;

  return (
    <AbsoluteFill>
      <Background showDots showParticles={false} />

      <AbsoluteFill>
        {/* Section label */}
        <div
          className="absolute flex flex-col items-center"
          style={{
            top: 100,
            left: 0,
            right: 0,
          }}
        >
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
            Tool Stack
          </div>
          <div
            style={{
              fontFamily: FONTS.main,
              fontSize: 36,
              fontWeight: 700,
              color: COLORS.text,
              letterSpacing: "0.04em",
              opacity: interpolate(titleProgress, [0, 0.3], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            使用ツール
          </div>
        </div>

        {/* Center description */}
        <div
          className="absolute flex flex-col items-center"
          style={{
            left: centerX - 160,
            top: centerY - 28,
            width: 320,
            opacity: descOp,
          }}
        >
          <div
            style={{
              fontFamily: FONTS.en,
              fontSize: 20,
              fontWeight: 700,
              color: activeTool.color,
              letterSpacing: "0.05em",
              marginBottom: 6,
            }}
          >
            {activeTool.name}
          </div>
          <div
            style={{
              fontFamily: FONTS.body,
              fontSize: 15,
              color: COLORS.textSub,
              letterSpacing: "0.02em",
            }}
          >
            {activeTool.desc}
          </div>
        </div>

        {/* Subtle ring */}
        <div
          className="absolute rounded-full"
          style={{
            left: centerX - radius - 2,
            top: centerY - radius - 2,
            width: (radius + 2) * 2,
            height: (radius + 2) * 2,
            border: `1px solid ${COLORS.textMuted}15`,
            opacity: labelOp,
          }}
        />

        {/* Tool nodes */}
        {tools.map((tool, i) => {
          const angle = (i / tools.length) * Math.PI * 2 - Math.PI / 2;
          const x = centerX + Math.cos(angle) * radius;
          const y = centerY + Math.sin(angle) * radius;

          const toolDelay = 10 + i * 15;
          const toolScale = spring({
            frame: frame - toolDelay,
            fps,
            config: { damping: 12, stiffness: 100 },
          });
          const toolOp = interpolate(frame - toolDelay, [0, 10], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          const isActive = i === activeIndex;
          const glowIntensity = isActive
            ? interpolate(frame % 30, [0, 15, 30], [0.3, 0.8, 0.3])
            : 0;

          return (
            <div
              key={i}
              className="absolute flex flex-col items-center"
              style={{
                left: x - 44,
                top: y - 44,
                width: 88,
                transform: `scale(${toolScale * (isActive ? 1.12 : 1)})`,
                opacity: toolOp,
              }}
            >
              {/* Icon circle */}
              <div
                className="flex items-center justify-center"
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 18,
                  backgroundColor: isActive ? `${tool.color}25` : `${COLORS.bgLight}cc`,
                  border: `2px solid ${isActive ? tool.color : `${tool.color}40`}`,
                  boxShadow: isActive
                    ? `0 0 ${20 + glowIntensity * 30}px ${tool.color}44`
                    : "none",
                  backdropFilter: "blur(8px)",
                }}
              >
                <span
                  style={{
                    fontFamily: FONTS.en,
                    fontSize: 18,
                    fontWeight: 700,
                    color: isActive ? tool.color : `${tool.color}cc`,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {tool.initial}
                </span>
              </div>

              {/* Name */}
              <span
                style={{
                  fontFamily: FONTS.en,
                  fontSize: 12,
                  fontWeight: 500,
                  color: isActive ? COLORS.text : COLORS.textMuted,
                  marginTop: 8,
                  letterSpacing: "0.05em",
                }}
              >
                {tool.name}
              </span>
            </div>
          );
        })}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
