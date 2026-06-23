import { Composition } from "remotion";
import { MainVideo } from "./MainVideo";
import { TOTAL, FPS } from "./theme";

export const RemotionRoot = () => (
  <Composition
    id="main"
    component={MainVideo}
    durationInFrames={TOTAL}
    fps={FPS}
    width={1920}
    height={1080}
  />
);
