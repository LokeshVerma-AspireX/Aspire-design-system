import "../src/app/globals.css";
import { withThemeByClassName } from "@storybook/addon-themes";

/** @type { import('@storybook/nextjs-vite').Preview } */
const preview = {
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "white",
      values: [
        { name: "white", value: "#ffffff" },
        { name: "dark", value: "#09090b" },
        { name: "muted", value: "#f4f4f5" },
        { name: "indigo", value: "#eef2ff" },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
  },
  decorators: [
    withThemeByClassName({
      themes: {
        light: "",
        dark: "dark",
      },
      defaultTheme: "light",
    }),
  ],
};

export default preview;
