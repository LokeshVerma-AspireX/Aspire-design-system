import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('@storybook/nextjs-vite').StorybookConfig} */
const config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-docs",
    "@chromatic-com/storybook",
    "@storybook/addon-a11y",
    "@storybook/addon-themes",
    "@storybook/addon-storysource",
  ],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
    defaultName: "Documentation",
  },
  staticDirs: ["../public"],
  viteFinal: async (config) => {
    const { mergeConfig } = await import("vite");
    return mergeConfig(config, {
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "../src"),
        },
      },
    });
  },
};

export default config;
