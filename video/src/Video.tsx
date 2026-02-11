import React from "react";
import { TransitionSeries, linearTiming, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";

import { Opening } from "./scenes/Opening";
import { Problem } from "./scenes/Problem";
import { Overview } from "./scenes/Overview";
import { WeekOne } from "./scenes/WeekOne";
import { WeekTwo } from "./scenes/WeekTwo";
import { WeekThree } from "./scenes/WeekThree";
import { Principles } from "./scenes/Principles";
import { Tools } from "./scenes/Tools";
import { Outcomes } from "./scenes/Outcomes";
import { Closing } from "./scenes/Closing";

const T = 15; // Base transition duration in frames

// Total effective = sum(durations) - 9 * T = 2250
// 2250 + 135 = 2385 total scene frames needed
const scenes = [
  { component: Opening, duration: 285 },    // S1: ~9.5秒
  { component: Problem, duration: 285 },     // S2: ~9.5秒
  { component: Overview, duration: 315 },    // S3: ~10.5秒
  { component: WeekOne, duration: 225 },     // S4a: 7.5秒
  { component: WeekTwo, duration: 165 },     // S4b: 5.5秒
  { component: WeekThree, duration: 195 },   // S4c: 6.5秒
  { component: Principles, duration: 285 },  // S5: 9.5秒
  { component: Tools, duration: 255 },       // S6: 8.5秒
  { component: Outcomes, duration: 225 },    // S7: 7.5秒
  { component: Closing, duration: 150 },     // S8: 5秒
];

// Each transition is tailored to the scene context
const transitions = [
  // Opening → Problem: gentle crossfade (calm intro)
  { presentation: fade(), timing: linearTiming({ durationInFrames: T }) },
  // Problem → Overview: slide right (topic shift)
  { presentation: slide({ direction: "from-right" }), timing: springTiming({ config: { damping: 200 }, durationInFrames: T }) },
  // Overview → WeekOne: wipe (timeline → detail zoom)
  { presentation: wipe({ direction: "from-left" }), timing: linearTiming({ durationInFrames: T }) },
  // WeekOne → WeekTwo: slide right (week progression)
  { presentation: slide({ direction: "from-right" }), timing: linearTiming({ durationInFrames: T }) },
  // WeekTwo → WeekThree: slide right (week progression)
  { presentation: slide({ direction: "from-right" }), timing: linearTiming({ durationInFrames: T }) },
  // WeekThree → Principles: crossfade (section change)
  { presentation: fade(), timing: linearTiming({ durationInFrames: T }) },
  // Principles → Tools: wipe (info scenes)
  { presentation: wipe({ direction: "from-left" }), timing: linearTiming({ durationInFrames: T }) },
  // Tools → Outcomes: slide up (results rising)
  { presentation: slide({ direction: "from-bottom" }), timing: springTiming({ config: { damping: 200 }, durationInFrames: T }) },
  // Outcomes → Closing: slow crossfade (lingering end)
  { presentation: fade(), timing: linearTiming({ durationInFrames: T }) },
];

export const Video: React.FC = () => {
  return (
    <TransitionSeries>
      {scenes.map((scene, i) => {
        const Scene = scene.component;
        return (
          <React.Fragment key={i}>
            <TransitionSeries.Sequence durationInFrames={scene.duration}>
              <Scene />
            </TransitionSeries.Sequence>
            {i < scenes.length - 1 && (
              <TransitionSeries.Transition
                presentation={transitions[i].presentation}
                timing={transitions[i].timing}
              />
            )}
          </React.Fragment>
        );
      })}
    </TransitionSeries>
  );
};
