import { addons } from "storybook/manager-api";
import { create } from "storybook/theming/create";

const aspireTheme = create({
  base: "light",
  brandTitle: "Aspire Design Story",
  brandUrl: "https://aspireiq.com",
  colorPrimary: "#6366f1",
  colorSecondary: "#6366f1",
  appBg: "#fafafa",
  appContentBg: "#ffffff",
  appBorderColor: "#e4e4e7",
  appBorderRadius: 8,
  textColor: "#09090b",
  textMutedColor: "#71717a",
  barTextColor: "#71717a",
  barSelectedColor: "#6366f1",
  barHoverColor: "#6366f1",
  barBg: "#ffffff",
  inputBg: "#ffffff",
  inputBorder: "#e4e4e7",
  inputTextColor: "#09090b",
  inputBorderRadius: 6,
});

addons.setConfig({
  theme: aspireTheme,
  sidebar: { showRoots: true },
});