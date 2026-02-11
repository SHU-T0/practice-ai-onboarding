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

const steps = [
  { num: "01", title: "TestFlight配布", desc: "実機でテスト", color: COLORS.secondary },
  { num: "02", title: "ユーザーテスト", desc: "フィードバック収集", color: COLORS.accent },
  { num: "03", title: "最終プレゼン", desc: "成果発表", color: COLORS.success },
];

export const WeekThree: React.FC = () => {
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
            color: COLORS.accent,
            opacity: labelOp,
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          Week 3 — Ship
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
            marginBottom: 72,
          }}
        >
          仕上げ &{" "}
          <span style={{ color: COLORS.accentLight }}>発表</span>
        </div>

        {/* Steps flow */}
        <div className="flex items-center" style={{ gap: 0 }}>
          {steps.map((step, i) => {
            const stepDelay = 20 + i * 40;
            const stepScale = spring({
              frame: frame - stepDelay,
              fps,
              config: { damping: 14, stiffness: 100 },
            });
            const stepOp = interpolate(frame - stepDelay, [0, 12], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            // Arrow
            const arrowDelay = stepDelay + 20;
            const arrowProgress = interpolate(frame - arrowDelay, [0, 20], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.quad),
            });

            return (
              <React.Fragment key={i}>
                {/* Step card */}
                <div
                  className="flex flex-col items-center rounded-2xl"
                  style={{
                    width: 300,
                    backgroundColor: `${COLORS.bgLight}cc`,
                    border: `1px solid ${step.color}25`,
                    backdropFilter: "blur(8px)",
                    transform: `scale(${stepScale})`,
                    opacity: stepOp,
                    padding: "36px 28px",
                  }}
                >
                  {/* Number circle */}
                  <div
                    className="flex items-center justify-center"
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 24,
                      border: `2px solid ${step.color}`,
                      backgroundColor: `${step.color}15`,
                      marginBottom: 20,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: FONTS.en,
                        fontSize: 16,
                        fontWeight: 700,
                        color: step.color,
                      }}
                    >
                      {step.num}
                    </span>
                  </div>

                  {/* Title */}
                  <div
                    style={{
                      fontFamily: FONTS.main,
                      fontSize: 22,
                      fontWeight: 700,
                      color: COLORS.text,
                      letterSpacing: "0.04em",
                      marginBottom: 8,
                    }}
                  >
                    {step.title}
                  </div>

                  {/* Description */}
                  <div
                    style={{
                      fontFamily: FONTS.body,
                      fontSize: 15,
                      color: COLORS.textSub,
                      letterSpacing: "0.02em",
                    }}
                  >
                    {step.desc}
                  </div>
                </div>

                {/* Arrow connector */}
                {i < steps.length - 1 && (
                  <div
                    className="flex items-center"
                    style={{
                      width: 80,
                      opacity: arrowProgress,
                    }}
                  >
                    <div
                      style={{
                        flex: 1,
                        height: 2,
                        background: `linear-gradient(90deg, ${step.color}66, ${steps[i + 1].color}66)`,
                        transform: `scaleX(${arrowProgress})`,
                        transformOrigin: "left",
                      }}
                    />
                    <div
                      style={{
                        width: 0,
                        height: 0,
                        borderTop: "6px solid transparent",
                        borderBottom: "6px solid transparent",
                        borderLeft: `10px solid ${steps[i + 1].color}66`,
                      }}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
