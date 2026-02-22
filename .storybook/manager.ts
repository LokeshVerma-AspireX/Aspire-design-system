import { addons } from "storybook/manager-api"
import { create } from "storybook/theming/create"

const aspireTheme = create({
  base: "light",
  brandTitle: "Aspire Design Story",
  brandUrl: "https://aspireiq.com",

  // Brand colours — Aspire lime-green
  colorPrimary: "#e3f1bb",
  colorSecondary: "#7cad2f",

  // Sidebar / app shell — warm stone
  appBg: "#fafaf9",         // stone-50
  appContentBg: "#ffffff",
  appBorderColor: "#e7e5e4", // stone-200
  appBorderRadius: 8,

  // Text
  textColor: "#1c1917",      // stone-900
  textMutedColor: "#78716c", // stone-500
  fontBase: '"Inter", system-ui, -apple-system, sans-serif',
  fontCode: '"Geist Mono", "Fira Code", monospace',

  // Top nav / tab bar
  barTextColor: "#78716c",
  barSelectedColor: "#7cad2f",
  barHoverColor: "#7cad2f",
  barBg: "#ffffff",

  // Form controls
  inputBg: "#ffffff",
  inputBorder: "#e7e5e4",
  inputTextColor: "#1c1917",
  inputBorderRadius: 6,
})

addons.setConfig({
  theme: aspireTheme,
  sidebar: { showRoots: true },
})
