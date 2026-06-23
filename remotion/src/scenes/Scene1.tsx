import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../theme";
import { display, body, Kicker, useEnter } from "../ui";
import { MaleChar, FemaleChar } from "../Characters";

export const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useEnter(8, 16);
  const sub = useEnter(20, 20);
  const line = useEnter(28, 24);
  return (
    <AbsoluteFill style={{ justifyContent: "center", paddingLeft: 160 }}>
      <div style={{ marginBottom: 28 }}>
        <Kicker delay={0}>Process Training</Kicker>
      </div>
      <div
        style={{
          fontFamily: display,
          fontWeight: 700,
          fontSize: 132,
          lineHeight: 0.98,
          color: COLORS.ink,
          opacity: t,
          transform: `translateY(${interpolate(t, [0, 1], [40, 0])}px)`,
        }}
      >
        CAP{" "}
        <span style={{ color: COLORS.sub }}>to</span>{" "}
        <span style={{ color: COLORS.primary }}>BEST</span>
      </div>
      <div
        style={{
          fontFamily: display,
          fontWeight: 500,
          fontSize: 46,
          color: COLORS.ink,
          marginTop: 8,
          opacity: t,
        }}
      >
        Process Flow
      </div>
      <div
        style={{
          width: interpolate(line, [0, 1], [0, 360]),
          height: 4,
          background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.accent})`,
          borderRadius: 2,
          margin: "30px 0",
        }}
      />
      <div
        style={{
          fontFamily: body,
          fontSize: 28,
          color: COLORS.sub,
          maxWidth: 760,
          opacity: sub,
          transform: `translateY(${interpolate(sub, [0, 1], [16, 0])}px)`,
        }}
      >
        How member digital submissions flow from CAP into BEST — three options, explained.
      </div>
      <div style={{ position: "absolute", right: 150, bottom: 90, display: "flex", alignItems: "flex-end", gap: 30 }}>
        <FemaleChar delay={26} wave seed={2} scale={1.05} />
        <MaleChar delay={34} wave seed={5} scale={1.15} />
      </div>
    </AbsoluteFill>
  );
};
