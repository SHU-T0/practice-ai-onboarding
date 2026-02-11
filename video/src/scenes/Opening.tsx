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

export const Opening: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // English tagline - blur to focus
  const tagBlur = interpolate(frame, [10, 40], [12, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const tagOpacity = interpolate(frame, [10, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const tagY = interpolate(frame, [10, 40], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  // Main JP title
  const mainDelay = 50;
  const mainScale = spring({
    frame: frame - mainDelay,
    fps,
    config: { damping: 15, stiffness: 80 },
  });
  const mainOpacity = interpolate(frame - mainDelay, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Accent line
  const lineWidth = interpolate(frame, [mainDelay + 15, mainDelay + 50], [0, 400], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  // Subtitle
  const subDelay = mainDelay + 40;
  const subProgress = spring({
    frame: frame - subDelay,
    fps,
    config: { damping: 200 },
  });
  const subY = interpolate(subProgress, [0, 1], [25, 0]);
  const subOpacity = interpolate(subProgress, [0, 0.4], [0, 1], {
    extrapolateRight: "clamp",
  });

  // "3 Weeks" badge
  const badgeDelay = subDelay + 30;
  const badgeScale = spring({
    frame: frame - badgeDelay,
    fps,
    config: { damping: 12, stiffness: 120 },
  });
  const badgeOpacity = interpolate(frame - badgeDelay, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Exit - fade entire scene near end
  const exitOpacity = interpolate(frame, [240, 270], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <Background variant="strong" particleCount={45} />

      <AbsoluteFill
        className="flex flex-col items-center justify-center"
        style={{ opacity: exitOpacity }}
      >
        {/* English tagline */}
        <div
          style={{
            fontFamily: FONTS.en,
            fontSize: 22,
            fontWeight: 300,
            letterSpacing: "0.25em",
            color: COLORS.textSub,
            opacity: tagOpacity,
            transform: `translateY(${tagY}px)`,
            filter: `blur(${tagBlur}px)`,
            textTransform: "uppercase",
            marginBottom: 32,
          }}
        >
          From Zero to App Developer with AI
        </div>

        {/* Main JP title */}
        <div
          style={{
            fontFamily: FONTS.main,
            fontSize: 68,
            fontWeight: 700,
            color: COLORS.text,
            transform: `scale(${mainScale})`,
            opacity: mainOpacity,
            letterSpacing: "0.06em",
            lineHeight: 1.3,
            textAlign: "center",
          }}
        >
          <span style={{ color: COLORS.primaryLight }}>AI駆動型</span>
          モバイル開発
          <br />
          <span style={{ color: COLORS.secondaryLight }}>オンボーディング</span>
          研修
        </div>

        {/* Gradient accent line */}
        <div
          style={{
            width: lineWidth,
            height: 2,
            borderRadius: 1,
            background: `linear-gradient(90deg, transparent, ${COLORS.primary}, ${COLORS.secondary}, transparent)`,
            marginTop: 28,
            marginBottom: 28,
          }}
        />

        {/* Subtitle */}
        <div
          style={{
            fontFamily: FONTS.body,
            fontSize: 24,
            fontWeight: 400,
            color: COLORS.textSub,
            letterSpacing: "0.04em",
            transform: `translateY(${subY}px)`,
            opacity: subOpacity,
            marginBottom: 36,
          }}
        >
          営業・ビジネスメンバーのためのアプリ開発プログラム
        </div>

        {/* 3 Weeks badge */}
        <div
          style={{
            fontFamily: FONTS.en,
            fontSize: 20,
            fontWeight: 500,
            letterSpacing: "0.15em",
            color: COLORS.accent,
            opacity: badgeOpacity,
            transform: `scale(${badgeScale})`,
            padding: "12px 32px",
            borderRadius: 100,
            border: `1px solid ${COLORS.accent}44`,
            backgroundColor: `${COLORS.accent}08`,
          }}
        >
          3 WEEKS INTENSIVE PROGRAM
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
