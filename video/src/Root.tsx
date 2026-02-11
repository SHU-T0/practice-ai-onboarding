import "./style.css";
import { Composition } from "remotion";
import { Video } from "./Video";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="ai-onboarding-intro"
      component={Video}
      durationInFrames={2250}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
