import React from "react";
import { AbsoluteFill, interpolate } from "remotion";
import { COLORS } from "../theme";
import { display, body, Kicker, useEnter } from "../ui";

const Row: React.FC<{ n: string; label: string; out: string; delay: number; accent: string }> = ({
  n,
  label,
  out,
  delay,
  accent,
}) => {
  const s = useEnter(delay, 20);
  return (
    <div
      style={{
        opacity: s,
        transform: `translateY(${interpolate(s, [0, 1], [24, 0])}px)`,
        display: "flex",
        alignItems: "center",
        gap: 20,
        background: `linear-gradient(180deg, ${COLORS.panel}, #0E2034)`,
        border: `1px solid ${accent}55`,
        borderRadius: 16,
        padding: "20px 26px",
        width: 720,
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 10,
          background: `${accent}22`,
          border: `1px solid ${accent}66`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: display,
          fontWeight: 700,
          fontSize: 22,
          color: accent,
        }}
      >
        {n}
      </div>
      <div style={{ fontFamily: display, fontWeight: 600, fontSize: 25, color: COLORS.ink, flex: 1 }}>{label}</div>
      <div style={{ fontFamily: body, fontSize: 19, color: accent }}>{out}</div>
    </div>
  );
};

export const Scene6: React.FC = () => {
  const t = useEnter(6, 16);
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ marginBottom: 30, textAlign: "center" }}>
        <div style={{ display: "inline-block" }}>
          <Kicker delay={0}>End Point</Kicker>
        </div>
        <div
          style={{
            fontFamily: display,
            fontWeight: 700,
            fontSize: 64,
            color: COLORS.ink,
            marginTop: 18,
            opacity: t,
            transform: `translateY(${interpolate(t, [0, 1], [20, 0])}px)`,
          }}
        >
          One submission, three paths to BEST
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Row n="1" label="Auto Accept" out="→ Open Case" delay={14} accent={COLORS.green} />
        <Row n="2" label="Auto Accept" out="→ Closed Case" delay={22} accent={COLORS.primarySoft} />
        <Row n="3" label="Pending Queue" out="→ Open or Closed Case" delay={30} accent={COLORS.amber} />
      </div>
    </AbsoluteFill>
  );
};
