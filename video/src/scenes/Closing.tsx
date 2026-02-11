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

export const Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // EN tagline - subtle entry
  const tagOp = interpolate(frame, [5, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Main tagline - spring scale
  const mainScale = spring({
    frame: frame - 10,
    fps,
    config: { damping: 12, stiffness: 100 },
  });
  const mainOp = interpolate(frame - 10, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Accent line
  const lineWidth = interpolate(frame, [25, 65], [0, 500], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  // Subtitle
  const subDelay = 40;
  const subProgress = spring({
    frame: frame - subDelay,
    fps,
    config: { damping: 200 },
  });
  const subY = interpolate(subProgress, [0, 1], [20, 0]);
  const subOp = interpolate(subProgress, [0, 0.4], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <Background variant="strong" particleCount={50} />

      <AbsoluteFill className="flex flex-col items-center justify-center">
        {/* EN tagline */}
        <div
          style={{
            fontFamily: FONTS.en,
            fontSize: 16,
            fontWeight: 300,
            letterSpacing: "0.25em",
            color: COLORS.textMuted,
            opacity: tagOp,
            textTransform: "uppercase",
            marginBottom: 28,
          }}
        >
          Don't Write Code. Direct the AI.
        </div>

        {/* Main tagline */}
        <div
          style={{
            fontFamily: FONTS.main,
            fontSize: 52,
            fontWeight: 700,
            color: COLORS.text,
            letterSpacing: "0.06em",
            textAlign: "center",
            lineHeight: 1.4,
            transform: `scale(${mainScale})`,
            opacity: mainOp,
          }}
        >
          コードを書かない。
          <br />
          <span style={{ color: COLORS.primaryLight }}>AIに指示を出す。</span>
        </div>

        {/* Gradient accent line */}
        <div
          style={{
            width: lineWidth,
            height: 2,
            borderRadius: 1,
            background: `linear-gradient(90deg, transparent, ${COLORS.primary}, ${COLORS.secondary}, ${COLORS.accent}, transparent)`,
            marginTop: 28,
            marginBottom: 28,
          }}
        />

        {/* Subtitle */}
        <div
          style={{
            fontFamily: FONTS.body,
            fontSize: 22,
            color: COLORS.textSub,
            letterSpacing: "0.04em",
            textAlign: "center",
            lineHeight: 1.6,
            transform: `translateY(${subY}px)`,
            opacity: subOp,
          }}
        >
          営業・ビジネスメンバーが
          <br />
          <span
            style={{
              fontFamily: FONTS.main,
              fontWeight: 700,
              color: COLORS.accentLight,
            }}
          >
            3週間でアプリ開発者になる
          </span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
