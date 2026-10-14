// hero.ts
import { heroui } from "@heroui/react";

// Route-inspired project colors; not official Route Academy brand values.
const palette = {
  background: "#061126",
  surface: "#0B1D3D",
  elevated: "#102B59",
  primary: "#123EAD",
  accent: "#91ACFF",
  text: "#EAF2FF",
  muted: "#AFC7ED",
  border: "#1D4075",
};

export default heroui({
  defaultTheme: "dark",
  themes: {
    dark: {
      colors: {
        background: palette.background,
        foreground: palette.text,
        divider: palette.border,
        content1: palette.surface,
        content2: palette.elevated,
        content3: palette.border,
        content4: palette.muted,
        primary: {
          50: palette.background, 100: palette.surface, 200: palette.elevated,
          300: palette.border, 400: palette.primary, 500: palette.primary,
          600: palette.primary, 700: palette.accent, 800: palette.muted,
          900: palette.text, DEFAULT: palette.primary, foreground: palette.text,
        },
        secondary: {
          50: palette.background, 100: palette.surface, 200: palette.elevated,
          300: palette.border, 400: palette.accent, 500: palette.accent,
          600: palette.accent, 700: palette.accent, 800: palette.muted,
          900: palette.text, DEFAULT: palette.accent, foreground: palette.background,
        },
        default: {
          50: palette.background, 100: palette.surface, 200: palette.elevated,
          300: palette.border, 400: palette.muted, 500: palette.muted,
          600: palette.muted, 700: palette.text, 800: palette.text,
          900: palette.text, DEFAULT: palette.elevated, foreground: palette.text,
        },
      },
    },
  },
});
