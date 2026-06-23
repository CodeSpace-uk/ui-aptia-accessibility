import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { COLORS } from "./theme";

// Subtle idle bob + breathing applied to whole figure.
const useIdle = (seed: number) => {
  const frame = useCurrentFrame();
  const bob = Math.sin((frame + seed * 20) / 22) * 6;
  const breathe = 1 + Math.sin((frame + seed * 14) / 26) * 0.012;
  return { bob, breathe };
};

// Blink: quick eye-close every ~2.5s.
const useBlink = (seed: number) => {
  const frame = useCurrentFrame();
  const period = 78;
  const t = (frame + seed * 17) % period;
  return t < 4 ? interpolate(t, [0, 2, 4], [1, 0.12, 1]) : 1;
};

// Gentle waving arm angle for greeting.
const useWave = (start: number, active: boolean) => {
  const frame = useCurrentFrame();
  if (!active) return 0;
  const local = frame - start;
  if (local < 0) return 0;
  const env = Math.min(1, local / 10) * Math.max(0, 1 - Math.max(0, local - 36) / 18);
  return Math.sin(local / 3.4) * 22 * env;
};

interface CharProps {
  delay?: number;
  flip?: boolean;
  wave?: boolean;
  seed?: number;
  scale?: number;
}

// ---------- MALE corporate cartoon ----------
export const MaleChar: React.FC<CharProps> = ({ delay = 0, flip = false, wave = false, seed = 0, scale = 1 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame: frame - delay, fps, config: { damping: 14, stiffness: 120 } });
  const { bob, breathe } = useIdle(seed);
  const blink = useBlink(seed);
  const waveAngle = useWave(delay + 10, wave);

  const skin = "#E8B89A";
  const hair = "#3A2C22";
  const suit = "#23405E";
  const suitDark = "#19324A";
  const shirt = "#F2F6FB";
  const tie = COLORS.primary;

  return (
    <div
      style={{
        opacity: enter,
        transform: `translateY(${interpolate(enter, [0, 1], [60, 0]) + bob}px) scaleX(${flip ? -1 : 1}) scale(${breathe * scale})`,
        transformOrigin: "bottom center",
      }}
    >
      <svg width="200" height="320" viewBox="0 0 200 320">
        {/* shadow */}
        <ellipse cx="100" cy="312" rx="58" ry="10" fill="rgba(0,0,0,0.28)" />
        {/* legs */}
        <rect x="78" y="216" width="18" height="86" rx="9" fill={suitDark} />
        <rect x="104" y="216" width="18" height="86" rx="9" fill={suitDark} />
        <ellipse cx="87" cy="305" rx="16" ry="8" fill="#11202F" />
        <ellipse cx="113" cy="305" rx="16" ry="8" fill="#11202F" />
        {/* torso / suit jacket */}
        <path d="M64 150 Q100 138 136 150 L142 228 Q100 240 58 228 Z" fill={suit} />
        {/* shirt + tie */}
        <path d="M88 150 L100 168 L112 150 L112 210 L88 210 Z" fill={shirt} />
        <path d="M100 168 L106 178 L100 215 L94 178 Z" fill={tie} />
        {/* left arm (static) */}
        <rect x="52" y="156" width="18" height="64" rx="9" fill={suit} />
        <circle cx="61" cy="224" r="10" fill={skin} />
        {/* right arm (waves) */}
        <g transform={`rotate(${waveAngle} 138 162)`}>
          <rect x="130" y="156" width="18" height="64" rx="9" fill={suit} transform="rotate(-18 138 162)" />
          <circle cx="158" cy="214" r="11" fill={skin} />
        </g>
        {/* neck */}
        <rect x="92" y="120" width="16" height="22" rx="7" fill={skin} />
        {/* head */}
        <g transform={`scale(1, ${blink === 1 ? 1 : 1})`}>
          <ellipse cx="100" cy="96" rx="40" ry="42" fill={skin} />
          {/* hair */}
          <path d="M60 92 Q58 50 100 50 Q142 50 140 92 Q138 70 100 70 Q72 72 70 96 Z" fill={hair} />
          {/* ears */}
          <circle cx="60" cy="98" r="8" fill={skin} />
          <circle cx="140" cy="98" r="8" fill={skin} />
          {/* eyes */}
          <g transform={`scale(1 ${blink})`} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
            <ellipse cx="86" cy="96" rx="5" ry={6 * blink} fill="#22303C" />
            <ellipse cx="114" cy="96" rx="5" ry={6 * blink} fill="#22303C" />
          </g>
          {/* brows */}
          <rect x="80" y="84" width="14" height="3" rx="1.5" fill={hair} />
          <rect x="106" y="84" width="14" height="3" rx="1.5" fill={hair} />
          {/* smile */}
          <path d="M88 112 Q100 122 112 112" stroke="#9C5B45" strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
};

// ---------- FEMALE corporate cartoon ----------
export const FemaleChar: React.FC<CharProps> = ({ delay = 0, flip = false, wave = false, seed = 1, scale = 1 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame: frame - delay, fps, config: { damping: 14, stiffness: 120 } });
  const { bob, breathe } = useIdle(seed);
  const blink = useBlink(seed);
  const waveAngle = useWave(delay + 10, wave);

  const skin = "#F0C9A8";
  const hair = "#5A3A2E";
  const blazer = "#3C5A78";
  const blazerDark = "#2C4761";
  const blouse = COLORS.accent;

  return (
    <div
      style={{
        opacity: enter,
        transform: `translateY(${interpolate(enter, [0, 1], [60, 0]) + bob}px) scaleX(${flip ? -1 : 1}) scale(${breathe * scale})`,
        transformOrigin: "bottom center",
      }}
    >
      <svg width="200" height="320" viewBox="0 0 200 320">
        {/* shadow */}
        <ellipse cx="100" cy="312" rx="56" ry="10" fill="rgba(0,0,0,0.28)" />
        {/* legs / skirt */}
        <path d="M72 214 L128 214 L138 250 L62 250 Z" fill={blazerDark} />
        <rect x="82" y="248" width="14" height="56" rx="7" fill={skin} />
        <rect x="104" y="248" width="14" height="56" rx="7" fill={skin} />
        <ellipse cx="89" cy="306" rx="14" ry="7" fill="#3A2230" />
        <ellipse cx="111" cy="306" rx="14" ry="7" fill="#3A2230" />
        {/* torso / blazer */}
        <path d="M66 152 Q100 140 134 152 L138 222 Q100 232 62 222 Z" fill={blazer} />
        {/* blouse */}
        <path d="M88 150 L100 166 L112 150 L110 206 L90 206 Z" fill={blouse} />
        {/* left arm */}
        <rect x="54" y="158" width="16" height="62" rx="8" fill={blazer} />
        <circle cx="62" cy="224" r="9" fill={skin} />
        {/* right arm (waves) */}
        <g transform={`rotate(${waveAngle} 134 164)`}>
          <rect x="130" y="158" width="16" height="62" rx="8" fill={blazer} transform="rotate(-18 134 164)" />
          <circle cx="156" cy="216" r="10" fill={skin} />
        </g>
        {/* neck */}
        <rect x="92" y="122" width="16" height="20" rx="7" fill={skin} />
        {/* hair back */}
        <path d="M56 96 Q54 150 70 168 L70 110 Z" fill={hair} />
        <path d="M144 96 Q146 150 130 168 L130 110 Z" fill={hair} />
        {/* head */}
        <g>
          <ellipse cx="100" cy="96" rx="39" ry="42" fill={skin} />
          {/* hair top */}
          <path d="M59 96 Q56 48 100 48 Q144 48 141 96 Q138 72 100 72 Q70 72 59 96 Z" fill={hair} />
          {/* eyes */}
          <ellipse cx="86" cy="96" rx="5" ry={6 * blink} fill="#22303C" />
          <ellipse cx="114" cy="96" rx="5" ry={6 * blink} fill="#22303C" />
          {/* lashes */}
          <path d="M80 90 L84 92 M120 90 L116 92" stroke="#22303C" strokeWidth="2" strokeLinecap="round" />
          {/* brows */}
          <rect x="80" y="84" width="13" height="3" rx="1.5" fill={hair} />
          <rect x="107" y="84" width="13" height="3" rx="1.5" fill={hair} />
          {/* smile */}
          <path d="M89 112 Q100 121 111 112" stroke="#B86A6A" strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
};
