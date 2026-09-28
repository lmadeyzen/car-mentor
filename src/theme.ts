export const ACCENT_COLOR = "#00573F";
export const ACCENT_COLOR_DARK = "#33c39b";

export type ThemeProps = { $isDark: boolean };

export const pick =
  (dark: string, light: string) =>
  ({ $isDark }: ThemeProps) =>
    $isDark ? dark : light;

export const pageBackground = pick("#0b110f", "#f3f5f4");
export const accent = pick(ACCENT_COLOR_DARK, ACCENT_COLOR);
export const accentHover = pick("#4fd4ae", "#00694c");
export const accentSoft = pick("rgba(51, 195, 155, 0.12)", "rgba(0, 87, 63, 0.08)");
export const onAccent = pick("#08130f", "#ffffff");
export const surface = pick("#141c19", "#ffffff");
export const surfaceMuted = pick("#1a2522", "#f4f7f6");
export const border = pick("rgba(255, 255, 255, 0.07)", "rgba(15, 35, 28, 0.08)");
export const borderStrong = pick("rgba(255, 255, 255, 0.12)", "rgba(15, 35, 28, 0.14)");
export const textStrong = pick("#eef3f1", "#111a17");
export const textBody = pick("#bcc9c4", "#4a5753");
export const textMuted = pick("#8d9d97", "#6b7873");
export const cardShadow = pick(
  "0 1px 2px rgba(0, 0, 0, 0.4), 0 12px 32px rgba(0, 0, 0, 0.28)",
  "0 1px 2px rgba(15, 35, 28, 0.04), 0 12px 32px rgba(15, 35, 28, 0.06)"
);
export const cardShadowHover = pick(
  "0 2px 4px rgba(0, 0, 0, 0.4), 0 24px 48px rgba(0, 0, 0, 0.4)",
  "0 2px 4px rgba(15, 35, 28, 0.05), 0 24px 48px rgba(15, 35, 28, 0.12)"
);
