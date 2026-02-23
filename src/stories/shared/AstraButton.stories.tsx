import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "storybook/test"
import { within, userEvent, expect } from "storybook/test"
import * as React from "react"
import { AstraButton } from "@/components/layout/AstraButton"

/**
 * # AstraButton
 *
 * The AI assistant trigger button for Aspire's "Ask Astra" feature.
 * Displays a Sparkles icon alongside the "Ask Astra" label in expanded
 * mode, or just the icon in collapsed sidebar mode. Features a
 * primary-tinted border and background with a sparkle rotation
 * animation on hover.
 *
 * ## When to Use
 * - In the sidebar as the primary entry point for the Astra AI assistant
 * - As a floating action button to invoke AI-powered features
 * - When the user needs quick access to AI assistance from any page
 *
 * ## When NOT to Use
 * - As a generic button -- use the standard `Button` component instead
 * - For non-AI actions -- the sparkle icon and branding are Astra-specific
 * - In forms or dialogs -- this is a navigation/action trigger, not a form control
 * - When multiple AI entry points exist on the same page -- use one AstraButton
 *
 * ## Accessibility
 * - Has `aria-label="Ask Astra AI"` for screen readers, especially important
 *   in collapsed (icon-only) mode where there is no visible text
 * - Keyboard-focusable with a visible focus ring (`focus-visible:ring-2`)
 * - Hover animation on the sparkle icon is decorative and does not affect usability
 * - Color contrast meets WCAG AA on both light and dark backgrounds
 *
 * ## Import
 * ```tsx
 * import { AstraButton } from '@/components/layout/AstraButton'
 * ```
 *
 * ## Quick Start
 * ```tsx
 * <AstraButton onClick={() => openAstraPanel()} />
 * <AstraButton collapsed onClick={() => openAstraPanel()} />
 * ```
 */
const meta: Meta<typeof AstraButton> = {
  title: "4. Components/Utilities/AstraButton",
  component: AstraButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "AI assistant trigger button. Shows a Sparkles icon + 'Ask Astra' label in expanded mode, icon-only in collapsed mode. Primary-tinted border and background with sparkle rotation on hover.",
      },
    },
  },
  argTypes: {
    collapsed: {
      description:
        "When `true`, renders icon-only mode for collapsed sidebar layouts. The text label is hidden and the button is centered and compact.",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "Appearance",
      },
    },
    onClick: {
      description:
        "Click handler fired when the button is pressed. Typically opens the Astra AI assistant panel.",
      table: {
        type: { summary: "() => void" },
        category: "Events",
      },
    },
    className: {
      description: "Additional CSS classes merged via `cn()` utility.",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
        category: "Appearance",
      },
    },
  },
  args: {
    onClick: fn(),
  },
}

export default meta
type Story = StoryObj<typeof AstraButton>

// ─── CORE STORIES ─────────────────────────────────

/**
 * Default expanded state showing the Sparkles icon and "Ask Astra" label.
 * This is the standard appearance in the expanded sidebar.
 *
 * ```tsx
 * <AstraButton onClick={() => openAstraPanel()} />
 * ```
 */
export const Default: Story = {
  args: {
    collapsed: false,
  },
  parameters: {
    docs: { description: { story: "Full-width with Sparkles icon and 'Ask Astra' label." } },
  },
}

/**
 * Collapsed icon-only state for narrow sidebar layouts. Only the
 * Sparkles icon is visible; the text label is hidden.
 *
 * ```tsx
 * <AstraButton collapsed onClick={() => openAstraPanel()} />
 * ```
 */
export const Collapsed: Story = {
  args: {
    collapsed: true,
  },
  parameters: {
    docs: { description: { story: "Collapsed sidebar mode -- icon only, no text label." } },
  },
}

/**
 * Hover the button to see the sparkle icon scale up and rotate 12
 * degrees. The background also transitions to a deeper primary tint.
 *
 * ```tsx
 * <AstraButton onClick={() => openAstraPanel()} />
 * ```
 */
export const HoverState: Story = {
  name: "Hover State (Interactive)",
  args: {
    collapsed: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Hover over the button to preview the sparkle rotation and background tint transition. The border also intensifies on hover.",
      },
    },
  },
}

/**
 * Custom className applied to adjust width or add spacing.
 *
 * ```tsx
 * <AstraButton className="w-full" onClick={() => openAstraPanel()} />
 * ```
 */
export const FullWidth: Story = {
  name: "Full Width",
  args: {
    collapsed: false,
    className: "w-64",
  },
  parameters: {
    docs: { description: { story: "Full-width variant using a custom className for wider sidebar layouts." } },
  },
}

// ─── ASPIRE REAL-WORLD EXAMPLES ──────────────────

/**
 * AstraButton in expanded and collapsed states on the sidebar
 * background. This is the most common usage context in the Aspire app.
 *
 * ```tsx
 * <aside className="w-52 bg-sidebar p-4">
 *   <AstraButton onClick={() => openAstraPanel()} />
 * </aside>
 * ```
 */
export const InSidebar: Story = {
  name: "Real World -- In Sidebar",
  render: () => (
    <div className="flex flex-col gap-6 w-56 rounded-xl border border-border bg-sidebar p-4">
      <div>
        <p className="text-xs font-medium text-sidebar-foreground/60 uppercase tracking-wide mb-2">
          Expanded Sidebar
        </p>
        <AstraButton collapsed={false} onClick={fn()} />
      </div>
      <div>
        <p className="text-xs font-medium text-sidebar-foreground/60 uppercase tracking-wide mb-2">
          Collapsed Sidebar
        </p>
        <div className="w-10">
          <AstraButton collapsed onClick={fn()} />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Expanded and collapsed states rendered on the dark sidebar background, simulating the actual sidebar context.",
      },
    },
  },
}

/**
 * AstraButton in a sidebar navigation context with nav items above it
 * to show the typical placement at the bottom of the sidebar.
 */
export const InSidebarWithNav: Story = {
  name: "Real World -- Sidebar Navigation Context",
  render: () => (
    <div className="flex flex-col w-52 rounded-xl border border-border bg-sidebar overflow-hidden">
      <div className="flex-1 p-3 space-y-1">
        {["Dashboard", "Campaigns", "Creators", "Analytics"].map((item) => (
          <div
            key={item}
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent"
          >
            <div className="size-4 rounded bg-sidebar-foreground/20" />
            {item}
          </div>
        ))}
      </div>
      <div className="border-t border-sidebar-border p-3">
        <AstraButton collapsed={false} onClick={fn()} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "AstraButton placed at the bottom of a sidebar below navigation items, which is the standard placement in the Aspire app shell.",
      },
    },
  },
}

// ─── ALL VARIANTS GALLERY ────────────────────────

/** Side-by-side comparison of expanded and collapsed states. */
export const AllVariants: Story = {
  name: "All Variants",
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <span className="w-28 text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Expanded
        </span>
        <AstraButton collapsed={false} onClick={fn()} />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-28 text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Collapsed
        </span>
        <AstraButton collapsed onClick={fn()} />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-28 text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Full Width
        </span>
        <AstraButton collapsed={false} className="w-64" onClick={fn()} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All AstraButton variants: expanded, collapsed, and full-width.",
      },
    },
  },
}

// ─── INTERACTION TESTS ───────────────────────────

/**
 * Verifies clicking the expanded AstraButton fires the `onClick` handler.
 */
export const ExpandedClickTest: Story = {
  name: "Test: Expanded Click",
  args: {
    collapsed: false,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button", { name: /ask astra ai/i })
    await userEvent.click(button)
    await expect(args.onClick).toHaveBeenCalledTimes(1)
  },
}

/**
 * Verifies clicking the collapsed (icon-only) AstraButton fires the
 * `onClick` handler. The button should be findable by its aria-label.
 */
export const CollapsedClickTest: Story = {
  name: "Test: Collapsed Click",
  args: {
    collapsed: true,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button", { name: /ask astra ai/i })

    // Verify the button text is not visible in collapsed mode
    const buttonText = canvas.queryByText("Ask Astra")
    await expect(buttonText).not.toBeInTheDocument()

    // Click and verify handler fires
    await userEvent.click(button)
    await expect(args.onClick).toHaveBeenCalledTimes(1)
  },
}
