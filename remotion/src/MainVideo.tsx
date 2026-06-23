import React from "react";
import { AbsoluteFill, Audio, staticFile, Sequence } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Background } from "./ui";
import { SCENES, TRANS } from "./theme";
import { COLORS } from "./theme";
import { Scene1 } from "./scenes/Scene1";
import { Scene2 } from "./scenes/Scene2";
import { Scene6 } from "./scenes/Scene6";
import { OptionScene, OptionData } from "./scenes/OptionScene";

const opt1: OptionData = {
  number: "1",
  title: "Auto Accept — Open Case",
  accent: COLORS.green,
  badge: "1done · cases move straight to the accepted queue",
  stages: [
    {
      title: "Member submission",
      icon: "inbox",
      points: ["Moves directly to the accepted queue", "Automatic acknowledgement email sent"],
    },
    {
      title: "CAP processing",
      icon: "gear",
      points: ["No pending queue — no manual processing", "Request type auto-populated", "Scheme details auto-populated"],
    },
    {
      title: "BEST case creation",
      icon: "check",
      points: ["Bots create an OPEN case in BEST", "CAP HTML docs uploaded to SharePoint", "Process: Member – File/Policy"],
    },
  ],
};

const opt2: OptionData = {
  number: "2",
  title: "Auto Accept — Closed Case",
  accent: COLORS.primarySoft,
  badge: "1done · submitted via PDVE COE site",
  stages: [
    {
      title: "Member submission",
      icon: "inbox",
      points: ["Moves directly to the accepted queue", "Automatic acknowledgement email sent"],
    },
    {
      title: "CAP processing",
      icon: "gear",
      points: ["No pending queue — no manual processing", "Request type auto-populated", "Scheme details auto-populated"],
    },
    {
      title: "BEST case creation",
      icon: "lock",
      points: ["Bots create a CLOSED case in BEST", "CAP HTML docs uploaded to SharePoint", "Activity: Close Case"],
    },
  ],
};

const opt3: OptionData = {
  number: "3",
  title: "Routing from the Pending Queue",
  accent: COLORS.amber,
  badge: "Agents process cases manually within SLA",
  stages: [
    {
      title: "Member submission",
      icon: "inbox",
      points: ["Cases move to the pending queue", "Automatic acknowledgement email sent"],
    },
    {
      title: "CAP processing",
      icon: "gear",
      points: ["SLA for agents to process manually", "One & Done — close case", "One & Done — create open case"],
    },
    {
      title: "BEST case creation",
      icon: "repeat",
      points: ["Bots create an OPEN or CLOSED case", "HTML + attachments to SharePoint", "Activity: Fulfilment or Closed Case"],
    },
  ],
};

const trans = () => (
  <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 16 })} />
);

export const MainVideo: React.FC = () => {
  // Audio aligned to each scene's actual start, accounting for transition overlap.
  const durations = Object.values(SCENES);
  const starts: number[] = [];
  let acc = 0;
  durations.forEach((v, i) => {
    starts.push(acc - TRANS * i);
    acc += v;
  });
  const clips = ["s1", "s2", "s3", "s4", "s5", "s6"];

  return (
    <AbsoluteFill>
      <Background />
      {clips.map((c, i) => (
        <Sequence key={c} from={starts[i]}>
          <Audio src={staticFile(`audio/${c}.mp3`)} />
        </Sequence>
      ))}
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={SCENES.s1}>
          <Scene1 />
        </TransitionSeries.Sequence>
        {trans()}
        <TransitionSeries.Sequence durationInFrames={SCENES.s2}>
          <Scene2 />
        </TransitionSeries.Sequence>
        {trans()}
        <TransitionSeries.Sequence durationInFrames={SCENES.s3}>
          <OptionScene data={opt1} />
        </TransitionSeries.Sequence>
        {trans()}
        <TransitionSeries.Sequence durationInFrames={SCENES.s4}>
          <OptionScene data={opt2} />
        </TransitionSeries.Sequence>
        {trans()}
        <TransitionSeries.Sequence durationInFrames={SCENES.s5}>
          <OptionScene data={opt3} />
        </TransitionSeries.Sequence>
        {trans()}
        <TransitionSeries.Sequence durationInFrames={SCENES.s6}>
          <Scene6 />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
