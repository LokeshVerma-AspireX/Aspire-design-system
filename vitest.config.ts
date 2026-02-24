import path from "node:path"
import { fileURLToPath } from "node:url"

import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"

import { storybookTest } from "@storybook/addon-vitest/vitest-plugin"
import { playwright } from "@vitest/browser-playwright"

const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  test: {
    projects: [
      // Storybook integration tests (browser)
      {
        extends: true,
        plugins: [
          storybookTest({ configDir: path.join(dirname, ".storybook") }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: "chromium" }],
          },
          setupFiles: [".storybook/vitest.setup.js"],
        },
      },
      // Unit / smoke tests (jsdom)
      {
        plugins: [react()],
        test: {
          name: "unit",
          environment: "jsdom",
          setupFiles: ["./src/test/setup.ts"],
          globals: true,
          include: ["src/**/*.test.{ts,tsx}"],
        },
        resolve: {
          alias: { "@": path.resolve(dirname, "./src") },
        },
      },
    ],
  },
})
