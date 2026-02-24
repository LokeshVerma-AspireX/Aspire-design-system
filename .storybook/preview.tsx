import type { Preview, Decorator } from "@storybook/react"
import React from "react"
import { TooltipProvider } from "../src/components/ui/tooltip"
import { THEMES, THEME_MAP, type ThemeDefinition } from "../src/themes/registry"
import "../src/app/globals.css"

// ---------------------------------------------------------------------------
// Decorator: inject the selected theme + mode CSS variables into :root
// ---------------------------------------------------------------------------
const withTheme: Decorator = (Story, context) => {
  const themeName = (context.globals?.theme as string) ?? "aspire"
  const mode = (context.globals?.mode as string) ?? "light"
  const layout = (context.parameters.layout as string) ?? "padded"
  const isDark = mode === "dark"

  React.useEffect(() => {
    const def: ThemeDefinition | undefined = THEME_MAP[themeName]
    if (!def) return

    const tokens = isDark ? def.tokens.dark : def.tokens.light
    const root = document.documentElement

    // Apply all CSS variables from the theme
    Object.entries(tokens).forEach(([key, value]) => {
      root.style.setProperty(key, value)
    })

    // Toggle dark class
    root.classList.toggle("dark", isDark)
  }, [themeName, isDark])

  if (layout === "fullscreen") {
    return (
      <div className={isDark ? "dark" : ""} style={{ height: "100vh" }}>
        <div className="h-full bg-background text-foreground">
          <TooltipProvider>
            <Story />
          </TooltipProvider>
        </div>
      </div>
    )
  }

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="bg-background text-foreground">
        <TooltipProvider>
          <Story />
        </TooltipProvider>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Preview config
// ---------------------------------------------------------------------------
const preview: Preview = {
  tags: ["autodocs"],

  globalTypes: {
    theme: {
      name: "Theme",
      description: "Global color theme",
      defaultValue: "aspire",
      toolbar: {
        icon: "paintbrush",
        items: THEMES.map((t) => ({ value: t.name, title: t.label })),
        dynamicTitle: true,
      },
    },
    mode: {
      name: "Mode",
      defaultValue: "light",
      toolbar: {
        icon: "sun",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
  },

  parameters: {
    layout: "padded",
    backgrounds: { disable: true },

    docs: {
      toc: true,
      source: {
        type: "code",
        language: "tsx",
      },
    },

    controls: {
      expanded: true,
      sort: "requiredFirst",
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: { test: "todo" },

    options: {
      storySort: {
        order: [
          "1. Getting Started",
          "2. Foundations",
          "3. Primitives",
          "4. Components",
          [
            "Data Display",
            "Forms",
            "Feedback",
            "Navigation",
            "Tables",
            "Charts",
            "Utilities",
          ],
          "5. Layout",
          "6. Pages",
          [
            "Contacts",
            "Offers",
            "Analytics",
            "Inbox",
            "Settings",
            "Dashboard",
            "Auth",
            "Checkout",
          ],
          "7. Patterns",
        ],
      },
    },
  },

  decorators: [withTheme],
}

export default preview
