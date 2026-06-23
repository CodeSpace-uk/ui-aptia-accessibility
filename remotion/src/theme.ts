export const FPS = 30;

// Brand palette — clean & corporate
export const COLORS = {
  bg: "#0B1B2B",
  bgDeep: "#071320",
  panel: "#12283D",
  ink: "#EAF2FA",
  sub: "#9DB4CB",
  line: "#21425F",
  primary: "#2F80ED",
  primarySoft: "#5AA0F2",
  accent: "#2DD4BF",
  amber: "#F2B441",
  green: "#34C77B",
};

// Audio clip durations in seconds (from ffprobe), plus tail padding.
const audio = {
  s1: 8.616,
  s2: 11.808,
  s3: 26.304,
  s4: 20.712,
  s5: 23.4,
  s6: 8.664,
};

const tail = 0.7;
const f = (s: number) => Math.round((s + tail) * FPS);

export const SCENES = {
  s1: f(audio.s1),
  s2: f(audio.s2),
  s3: f(audio.s3),
  s4: f(audio.s4),
  s5: f(audio.s5),
  s6: f(audio.s6),
};

export const TRANS = 16;
const rawTotal = Object.values(SCENES).reduce((a, b) => a + b, 0);
// 6 scenes -> 5 transitions, each overlaps TRANS frames.
export const TOTAL = rawTotal - TRANS * 5;
