import { loadFont as loadZenKaku } from "@remotion/google-fonts/ZenKakuGothicNew";
import { loadFont as loadSpaceGrotesk } from "@remotion/google-fonts/SpaceGrotesk";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

const zenKaku = loadZenKaku("normal", {
  weights: ["400", "500", "700"],
});

const spaceGrotesk = loadSpaceGrotesk("normal", {
  weights: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

const inter = loadInter("normal", {
  weights: ["400", "500", "600"],
  subsets: ["latin"],
});

export const FONTS = {
  jp: zenKaku.fontFamily,
  en: spaceGrotesk.fontFamily,
  enBody: inter.fontFamily,
  // Composite stack: English chars use Space Grotesk, Japanese falls back to Zen Kaku
  main: `${spaceGrotesk.fontFamily}, ${zenKaku.fontFamily}, sans-serif`,
  body: `${inter.fontFamily}, ${zenKaku.fontFamily}, sans-serif`,
} as const;
