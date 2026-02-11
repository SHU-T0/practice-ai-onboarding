import React, { useMemo } from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { COLORS, GRADIENTS } from "../styles/colors";

type BackgroundProps = {
  variant?: "default" | "strong" | "minimal";
  showDots?: boolean;
  showParticles?: boolean;
  particleCount?: number;
};

export const Background: React.FC<BackgroundProps> = ({
  variant = "default",
  showDots = true,
  showParticles = true,
  particleCount = 30,
}) => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const meshGradient =
    variant === "strong" ? GRADIENTS.meshBgStrong : GRADIENTS.meshBg;

  // Subtle floating orbs
  const orbX1 = interpolate(frame, [0, 300], [15, 25], {
    extrapolateRight: "wrap",
  });
  const orbY1 = interpolate(frame, [0, 400], [40, 60], {
    extrapolateRight: "wrap",
  });
  const orbX2 = interpolate(frame, [0, 350], [70, 85], {
    extrapolateRight: "wrap",
  });

  const particles = useMemo(() => {
    const colors = [COLORS.primary, COLORS.secondary, COLORS.accent];
    return Array.from({ length: particleCount }, (_, i) => ({
      x: ((i * 7919 + 1337) % 1000) / 1000,
      y: ((i * 6271 + 2903) % 1000) / 1000,
      size: 1.5 + ((i * 3571) % 3),
      speed: 0.2 + ((i * 4813) % 500) / 1000,
      opacity: 0.08 + ((i * 2341) % 200) / 1000,
      color: colors[i % colors.length],
    }));
  }, [particleCount]);

  return (
    <AbsoluteFill style={{ opacity: fadeIn }}>
      {/* Base dark background */}
      <AbsoluteFill style={{ backgroundColor: COLORS.bgDark }} />

      {/* Mesh gradient layer */}
      <AbsoluteFill style={{ backgroundImage: meshGradient }} />

      {/* Animated orbs */}
      <div
        className="absolute rounded-full"
        style={{
          left: `${orbX1}%`,
          top: `${orbY1}%`,
          width: 600,
          height: 600,
          background: `radial-gradient(circle, ${COLORS.primary}12 0%, transparent 70%)`,
          transform: "translate(-50%, -50%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          left: `${orbX2}%`,
          top: "30%",
          width: 500,
          height: 500,
          background: `radial-gradient(circle, ${COLORS.secondary}10 0%, transparent 70%)`,
          transform: "translate(-50%, -50%)",
          filter: "blur(40px)",
        }}
      />

      {/* Dot grid pattern */}
      {showDots && (
        <AbsoluteFill
          style={{
            backgroundImage: `radial-gradient(circle, ${COLORS.textMuted}15 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
            opacity: 0.4,
          }}
        />
      )}

      {/* Floating particles */}
      {showParticles &&
        particles.map((p, i) => {
          const xPos =
            ((p.x * 1920 + frame * p.speed * 0.3) % 1960) - 20;
          const yPos =
            p.y * 1080 + Math.sin((frame * 0.015 + i) * 2) * 15;
          return (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                left: xPos,
                top: yPos % 1080,
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                opacity: p.opacity,
              }}
            />
          );
        })}

      {/* Top vignette */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(15,23,42,0.4) 0%, transparent 30%, transparent 70%, rgba(15,23,42,0.4) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
