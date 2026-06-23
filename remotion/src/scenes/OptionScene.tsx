import React from "react";
import { AbsoluteFill, interpolate } from "remotion";
import { COLORS } from "../theme";
import { display, body, Kicker, StageCard, FlowArrow, useEnter } from "../ui";
import { MaleChar, FemaleChar } from "../Characters";

export interface OptionData {
  number: string;
  title: string;
  accent: string;
  badge: string;
  stages: { title: string; icon: string; points: string[] }[];
}

export const OptionScene: React.FC<{ data: OptionData }> = ({ data }) => {
  const head = useEnter(6, 18);
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ position: "absolute", top: 86, left: 160 }}>
        <Kicker delay={0} color={data.accent}>
          Option {data.number}
        </Kicker>
        <div
          style={{
            fontFamily: display,
            fontWeight: 700,
            fontSize: 56,
            color: COLORS.ink,
            marginTop: 14,
            opacity: head,
            transform: `translateY(${interpolate(head, [0, 1], [20, 0])}px)`,
          }}
        >
          {data.title}
        </div>
        <div style={{ fontFamily: body, fontSize: 22, color: COLORS.sub, marginTop: 6, opacity: head }}>
          {data.badge}
        </div>
      </div>

      <div style={{ position: "absolute", top: 60, right: 130 }}>
        {Number(data.number) % 2 === 0 ? (
          <FemaleChar delay={20} seed={Number(data.number) + 2} scale={0.62} />
        ) : (
          <MaleChar delay={20} seed={Number(data.number) + 1} scale={0.62} />
        )}
      </div>

      <div style={{ display: "flex", alignItems: "stretch", marginTop: 90 }}>
        {data.stages.map((st, i) => (
          <React.Fragment key={i}>
            <StageCard title={st.title} icon={st.icon} points={st.points} delay={18 + i * 18} accent={data.accent} />
            {i < data.stages.length - 1 && <FlowArrow delay={30 + i * 18} accent={data.accent} />}
          </React.Fragment>
        ))}
      </div>
    </AbsoluteFill>
  );
};
