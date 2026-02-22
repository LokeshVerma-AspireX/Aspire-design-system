import type { Preview, Decorator } from "@storybook/react"
import "../src/app/globals.css"

/**
 * Apply the dark-mode class so Tailwind's
 *   @custom-variant dark (&:is(.dark *))
 * responds to the toolbar theme toggle.
 *
 * Fullscreen stories (InboxPage, AnalyticsPage, etc.) get h-screen and no
 * extra padding so page-level layouts fill the viewport correctly.
 * For padded/centered layouts Storybook itself controls the canvas padding.
 */
const withTheme: Decorator = (Story, context) => {
  const theme  = (context.globals.theme as string) ?? "light"
  const isDark = theme === "dark"
  const layout = (context.parameters.layout as string) ?? "padded"

  if (layout === "fullscreen") {
    return (
      <div className={isDark ? "dark" : ""} style={{ height: "100vh" }}>
        <div className="h-full bg-background text-foreground">
          <Story />
        </div>
      </div>
    )
  }

  // padded / centered — no extra padding added here; Storybook handles canvas padding
  return (
    <div className={isDark ? "dark" : ""}>
      <div className="bg-background text-foreground">
        <Story />
      </div>
    </div>
  )
}

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Global theme for components",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "light", icon: "sun",  title: "Light" },
          { value: "dark",  icon: "moon", title: "Dark"  },
        ],
        dynamicTitle: true,
      },
      defaultValue: "light",
    },
  },

  parameters: {
    // Default layout — individual stories override with "fullscreen" or "centered"
    layout: "padded",

    // Disable the built-in backgrounds panel; our decorator handles bg via CSS tokens
    backgrounds: { disable: true },

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date:  /Date$/i,
      },
    },

    a11y: { test: "todo" },
  },

  decorators: [withTheme],
}

export default preview
