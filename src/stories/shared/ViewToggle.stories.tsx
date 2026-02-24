import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"
import { within, userEvent, expect } from "storybook/test"
import * as React from "react"
import { useState } from "react"
import { ViewToggle, type ViewMode } from "@/components/shared/ViewToggle"

/**
 * # ViewToggle
 *
 * A compact two-button toggle for switching between grid and list view
 * modes. The active mode gets a filled background, while the inactive
 * mode is transparent with a subtle hover state. Supports both controlled
 * and uncontrolled usage patterns.
 *
 * ## When to Use
 * - In table/grid toolbars to let users switch between card grid and list table views
 * - On content pages where the same data can be visualized in two layouts
 * - Paired with a FilterBar or search input in a page header
 *
 * ## When NOT to Use
 * - For more than two view modes -- use a SegmentedControl or Tabs instead
 * - For toggling a boolean setting -- use a Switch component
 * - For navigation between different pages -- use Tabs or a NavigationMenu
 * - Inside forms where the value must be submitted -- use RadioGroup
 *
 * ## Accessibility
 * - Wrapped in a `<div>` with `role="group"` and `aria-label="View mode"`
 * - Each button has `aria-label` ("list view" or "grid view")
 * - Each button has `aria-pressed` reflecting the active state
 * - Keyboard-focusable and activatable with Enter / Space
 * - Uses Lucide `List` and `LayoutGrid` icons for clear visual affordance
 *
 * ## Import
 * ```tsx
 * import { ViewToggle } from '@/components/shared/ViewToggle'
 * ```
 *
 * ## Quick Start
 * ```tsx
 * // Uncontrolled (internal state)
 * <ViewToggle defaultValue="list" onChange={(mode) => console.log(mode)} />
 *
 * // Controlled
 * const [view, setView] = useState<ViewMode>("grid")
 * <ViewToggle value={view} onChange={setView} />
 * ```
 */
const meta: Meta<typeof ViewToggle> = {
  title: "4. Components/Tables/ViewToggle",
  component: ViewToggle,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Grid/List view-mode switcher. Two icon buttons in a bordered group -- active state uses a filled background. Supports controlled and uncontrolled patterns.",
      },
    },
  },
  argTypes: {
    value: {
      description:
        'The controlled view mode. When provided, the component is fully controlled and `defaultValue` is ignored. Pass `undefined` for uncontrolled usage.',
      control: "select",
      options: [undefined, "grid", "list"],
      table: {
        type: { summary: '"grid" | "list"' },
        defaultValue: { summary: "undefined" },
        category: "Data",
      },
    },
    defaultValue: {
      description:
        "The initial view mode for uncontrolled usage. Ignored when `value` is provided.",
      control: "select",
      options: ["grid", "list"],
      table: {
        type: { summary: '"grid" | "list"' },
        defaultValue: { summary: '"list"' },
        category: "Data",
      },
    },
    onChange: {
      description:
        'Callback fired when the user clicks a view-mode button. Receives the new `ViewMode` ("grid" or "list").',
      table: {
        type: { summary: "(mode: ViewMode) => void" },
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
    onChange: fn(),
  },
}

export default meta
type Story = StoryObj<typeof ViewToggle>

// ─── CORE STORIES ─────────────────────────────────

/**
 * List view is active (the default). The list icon button has a filled
 * background and the grid icon is transparent.
 *
 * ```tsx
 * <ViewToggle defaultValue="list" />
 * ```
 */
export const ListSelected: Story = {
  name: "List Selected (Default)",
  args: {
    defaultValue: "list",
  },
  parameters: {
    docs: { description: { story: "Default state -- list view is active." } },
  },
}

/**
 * Grid view is active. The grid icon button has a filled background.
 *
 * ```tsx
 * <ViewToggle defaultValue="grid" />
 * ```
 */
export const GridSelected: Story = {
  name: "Grid Selected",
  args: {
    defaultValue: "grid",
  },
  parameters: {
    docs: { description: { story: "Grid view is active -- grid icon button is filled." } },
  },
}

/**
 * Controlled mode with external state. The parent component owns the
 * current view mode and passes it via the `value` prop.
 *
 * ```tsx
 * const [view, setView] = useState<ViewMode>("list")
 * <ViewToggle value={view} onChange={setView} />
 * ```
 */
export const Controlled: Story = {
  name: "Controlled",
  render: () => {
    const [view, setView] = useState<ViewMode>("list")
    return (
      <div className="flex flex-col items-center gap-4">
        <ViewToggle value={view} onChange={setView} />
        <p className="text-sm text-muted-foreground">
          Current view: <span className="font-medium text-foreground">{view}</span>
        </p>
      </div>
    )
  },
  parameters: {
    docs: { description: { story: "Fully controlled -- current mode shown below the toggle. Click to switch." } },
  },
}

/**
 * Uncontrolled mode. The component manages its own internal state.
 * The `onChange` callback still fires for external side effects.
 *
 * ```tsx
 * <ViewToggle defaultValue="grid" onChange={(mode) => console.log(mode)} />
 * ```
 */
export const Uncontrolled: Story = {
  name: "Uncontrolled",
  args: {
    defaultValue: "grid",
  },
  parameters: {
    docs: { description: { story: "Uncontrolled -- internal state manages the active mode. onChange still fires." } },
  },
}

// ─── ASPIRE REAL-WORLD EXAMPLES ──────────────────

/**
 * Campaign cards vs table view toggle. Shown inside a typical page
 * toolbar with a title on the left and the toggle on the right.
 *
 * ```tsx
 * <div className="flex items-center justify-between">
 *   <h2>Campaigns</h2>
 *   <ViewToggle defaultValue="grid" onChange={handleViewChange} />
 * </div>
 * ```
 */
export const CampaignViewToggle: Story = {
  name: "Real World -- Campaign Cards vs Table",
  render: () => {
    const [view, setView] = useState<ViewMode>("grid")
    return (
      <div className="w-96 space-y-4">
        <div className="flex items-center justify-between rounded-lg border border-border bg-background px-4 py-3">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Campaigns</h3>
            <p className="text-xs text-muted-foreground">12 active campaigns</p>
          </div>
          <ViewToggle value={view} onChange={setView} />
        </div>
        <div className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          {view === "grid"
            ? "Showing card grid layout"
            : "Showing table list layout"}
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: "Campaign page toolbar -- toggle switches between card grid and table list. The content area below reflects the selection.",
      },
    },
  },
}

/**
 * Content grid vs list toggle in a creator's content tab.
 *
 * ```tsx
 * <div className="flex items-center justify-between">
 *   <span>Content</span>
 *   <ViewToggle defaultValue="list" />
 * </div>
 * ```
 */
export const ContentViewToggle: Story = {
  name: "Real World -- Content Grid vs List",
  render: () => {
    const [view, setView] = useState<ViewMode>("list")
    return (
      <div className="w-96 space-y-4">
        <div className="flex items-center justify-between rounded-lg border border-border bg-background px-4 py-3">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Content</h3>
            <p className="text-xs text-muted-foreground">48 posts submitted</p>
          </div>
          <ViewToggle value={view} onChange={setView} />
        </div>
        <div className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          {view === "grid"
            ? "Showing content as thumbnail grid"
            : "Showing content as detailed list"}
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: "Content tab toolbar -- toggle switches between thumbnail grid and detailed list views.",
      },
    },
  },
}

/**
 * Toolbar composition with a search input and the view toggle,
 * as commonly seen on the Creators list page.
 */
export const InToolbar: Story = {
  name: "Real World -- In Toolbar with Search",
  render: () => (
    <div className="flex items-center justify-between rounded-lg border border-border bg-background px-4 py-2">
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-foreground">Creators</span>
        <span className="text-xs text-muted-foreground">1,247 results</span>
      </div>
      <ViewToggle defaultValue="list" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Typical placement inside a table toolbar alongside a results count.",
      },
    },
  },
}

// ─── ALL VARIANTS GALLERY ────────────────────────

/** Side-by-side comparison of list-active and grid-active states. */
export const AllVariants: Story = {
  name: "All Variants",
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <span className="w-24 text-xs font-medium text-muted-foreground uppercase tracking-wide">
          List Active
        </span>
        <ViewToggle defaultValue="list" />
      </div>
      <div className="flex items-center gap-3">
        <span className="w-24 text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Grid Active
        </span>
        <ViewToggle defaultValue="grid" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Both view states shown side by side for comparison.",
      },
    },
  },
}

// ─── INTERACTION TESTS ───────────────────────────

/**
 * Verifies clicking the grid button fires `onChange` with "grid" and
 * updates `aria-pressed` on both buttons.
 */
export const SwitchToGridTest: Story = {
  name: "Test: Switch to Grid",
  args: {
    defaultValue: "list",
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const gridButton = canvas.getByRole("button", { name: /grid view/i })
    const listButton = canvas.getByRole("button", { name: /list view/i })

    // Initial state: list is pressed
    await expect(listButton).toHaveAttribute("aria-pressed", "true")
    await expect(gridButton).toHaveAttribute("aria-pressed", "false")

    // Click grid
    await userEvent.click(gridButton)
    await expect(args.onChange).toHaveBeenCalledWith("grid")

    // After click: grid is pressed
    await expect(gridButton).toHaveAttribute("aria-pressed", "true")
    await expect(listButton).toHaveAttribute("aria-pressed", "false")
  },
}

/**
 * Verifies clicking the list button when grid is active fires `onChange`
 * with "list" and toggles `aria-pressed`.
 */
export const SwitchToListTest: Story = {
  name: "Test: Switch to List",
  args: {
    defaultValue: "grid",
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const gridButton = canvas.getByRole("button", { name: /grid view/i })
    const listButton = canvas.getByRole("button", { name: /list view/i })

    // Initial state: grid is pressed
    await expect(gridButton).toHaveAttribute("aria-pressed", "true")
    await expect(listButton).toHaveAttribute("aria-pressed", "false")

    // Click list
    await userEvent.click(listButton)
    await expect(args.onChange).toHaveBeenCalledWith("list")

    // After click: list is pressed
    await expect(listButton).toHaveAttribute("aria-pressed", "true")
    await expect(gridButton).toHaveAttribute("aria-pressed", "false")
  },
}
