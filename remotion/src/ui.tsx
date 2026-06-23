import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { loadFont as loadDisplay } from "@remotion/google-fonts/Outfit";
import { loadFont as loadBody } from "@remotion/google-fonts/Inter";
import { COLORS } from "./theme";

export const display = loadDisplay("normal", { weights: ["500", "600", "700"], subsets: ["latin"] }).fontFamily;
export const body = loadBody("normal", { weights: ["400", "500", "600"], subsets: ["latin"] }).fontFamily;

export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const drift = Math.sin(frame / 90) * 30;
  const drift2 = Math.cos(frame / 110) * 40;
  return (
    <AbsoluteFill style={{ background: `linear-gradient(160deg, ${COLORS.bgDeep} 0%, ${COLORS.bg} 55%, #0E2236 100%)` }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(620px 620px at ${22 + drift / 8}% ${28 + drift2 / 12}%, rgba(47,128,237,0.16), transparent 70%)`,
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(520px 520px at ${82 - drift / 10}% ${78 + drift / 14}%, rgba(45,212,191,0.10), transparent 70%)`,
        }}
      />
      {/* subtle grid */}
      <AbsoluteFill
        style={{
          opacity: 0.05,
          backgroundImage: `linear-gradient(${COLORS.ink} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.ink} 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />
    </AbsoluteFill>
  );
};

export const useEnter = (delay: number, damping = 18) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping, stiffness: 130 } });
  return s;
};

export const Icon: React.FC<{ name: string; color: string; size?: number }> = ({ name, color, size = 24 }) => {
  const sw = 2;
  const paths: Record<string, React.ReactNode> = {
    inbox: (
      <>
        <path d="M3 13h4l2 3h6l2-3h4" />
        <path d="M5 13V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8" />
      </>
    ),
    gear: (
      <>
        <circle cx="12" cy="12" r="3.2" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1" />
      </>
    ),
    check: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M8 12.5l2.5 2.5L16 9" />
      </>
    ),
    lock: (
      <>
        <rect x="5" y="11" width="14" height="9" rx="2" />
        <path d="M8 11V8a4 4 0 0 1 8 0v3" />
      </>
    ),
    repeat: (
      <>
        <path d="M4 9a8 8 0 0 1 13-3l3 3" />
        <path d="M20 5v4h-4" />
        <path d="M20 15a8 8 0 0 1-13 3l-3-3" />
        <path d="M4 19v-4h4" />
      </>
    ),
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      {paths[name] ?? paths.inbox}
    </svg>
  );
};


export const Kicker: React.FC<{ children: React.ReactNode; delay?: number; color?: string }> = ({
  children,
  delay = 0,
  color = COLORS.accent,
}) => {
  const s = useEnter(delay);
  return (
    <div
      style={{
        opacity: s,
        transform: `translateY(${interpolate(s, [0, 1], [14, 0])}px)`,
        fontFamily: body,
        fontWeight: 600,
        letterSpacing: 4,
        textTransform: "uppercase",
        fontSize: 22,
        color,
        display: "flex",
        alignItems: "center",
        gap: 14,
      }}
    >
      <span style={{ width: 36, height: 3, background: color, borderRadius: 2 }} />
      {children}
    </div>
  );
};

export const StageCard: React.FC<{
  title: string;
  points: string[];
  delay: number;
  accent: string;
  icon: string;
}> = ({ title, points, delay, accent, icon }) => {
  const s = useEnter(delay);
  return (
    <div
      style={{
        opacity: s,
        transform: `translateY(${interpolate(s, [0, 1], [40, 0])}px) scale(${interpolate(s, [0, 1], [0.96, 1])})`,
        background: `linear-gradient(180deg, ${COLORS.panel} 0%, #0E2034 100%)`,
        border: `1px solid ${COLORS.line}`,
        borderRadius: 20,
        padding: "26px 28px",
        width: 460,
        boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
        <div
          style={{
            width: 46,
            height: 46,
            borderRadius: 12,
            background: `${accent}22`,
            border: `1px solid ${accent}66`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
          }}
        >
          <Icon name={icon} color={accent} />
        </div>
        <div style={{ fontFamily: display, fontWeight: 600, fontSize: 26, color: COLORS.ink }}>{title}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {points.map((p, i) => {
          const ps = useEnter(delay + 8 + i * 6, 22);
          return (
            <div
              key={i}
              style={{
                opacity: ps,
                transform: `translateX(${interpolate(ps, [0, 1], [-12, 0])}px)`,
                display: "flex",
                gap: 12,
                fontFamily: body,
                fontSize: 19,
                lineHeight: 1.4,
                color: COLORS.sub,
              }}
            >
              <span style={{ color: accent, marginTop: 2 }}>▸</span>
              <span>{p}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const FlowArrow: React.FC<{ delay: number; accent: string }> = ({ delay, accent }) => {
  const s = useEnter(delay, 26);
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 70 }}>
      <svg width="70" height="40" viewBox="0 0 70 40">
        <line
          x1="4"
          y1="20"
          x2={interpolate(s, [0, 1], [4, 50])}
          y2="20"
          stroke={accent}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <polygon points="48,12 66,20 48,28" fill={accent} opacity={s} />
      </svg>
    </div>
  );
};
