import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "storybook/test"
import { within, userEvent, expect } from "storybook/test"
import { useState } from "react"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  LayoutGrid,
  List,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Star,
  Filter,
} from "lucide-react"

/**
 * # Toggle
 *
 * A two-state button that can be toggled on (pressed) or off (unpressed).
 * Built on Radix UI Toggle, it is ideal for toolbar actions and binary
 * formatting controls.
 *
 * ## When to Use
 * - For toolbar formatting actions (bold, italic, underline)
 * - For binary on/off actions where the control itself shows the state
 * - For icon-based controls in compact toolbars
 *
 * ## When NOT to Use
 * - For persistent settings that take immediate effect -- use **Switch**
 * - For selecting from a list of options -- use **Select** or **RadioGroup**
 * - For enabling/disabling a feature in a form -- use **Checkbox**
 *
 * ## Accessibility
 * - Uses `aria-pressed` managed by Radix to announce toggle state
 * - Always provide `aria-label` for icon-only toggles
 * - Supports keyboard activation (Enter and Space)
 * - Focus ring visible on keyboard navigation
 * - Disabled state sets `aria-disabled` and prevents interaction
 *
 * ## Import
 * ```tsx
 * import { Toggle } from '@/components/ui/toggle'
 * import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
 * ```
 *
 * ## Quick Start
 * ```tsx
 * <Toggle aria-label="Toggle bold">
 *   <Bold className="h-4 w-4" />
 * </Toggle>
 *
 * <ToggleGroup type="single" defaultValue="left">
 *   <ToggleGroupItem value="left" aria-label="Align left">
 *     <AlignLeft className="h-4 w-4" />
 *   </ToggleGroupItem>
 *   <ToggleGroupItem value="center" aria-label="Align center">
 *     <AlignCenter className="h-4 w-4" />
 *   </ToggleGroupItem>
 * </ToggleGroup>
 * ```
 */
const meta: Meta<typeof Toggle> = {
  title: "3. Primitives/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A two-state button that can be toggled on or off. Built on Radix UI Toggle. Use for toolbar actions and formatting controls.",
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/iOUu95ALlUm7fDs2eQPLQb/New-STA-with-Shadcn",
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline"],
      description: "Visual style of the toggle.",
      table: {
        type: { summary: '"default" | "outline"' },
        defaultValue: { summary: '"default"' },
        category: "Appearance",
      },
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
      description: "Size of the toggle button.",
      table: {
        type: { summary: '"default" | "sm" | "lg"' },
        defaultValue: { summary: '"default"' },
        category: "Appearance",
      },
    },
    pressed: {
      control: "boolean",
      description: "Controlled pressed (on) state.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "State",
      },
    },
    defaultPressed: {
      control: "boolean",
      description: "Initial pressed state for uncontrolled usage.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "State",
      },
    },
    onPressedChange: {
      action: "pressedChange",
      description: "Callback fired when the toggle is pressed or released. Receives the new boolean value.",
      table: {
        type: { summary: "(pressed: boolean) => void" },
        category: "Events",
      },
    },
    disabled: {
      control: "boolean",
      description: "Disables the toggle, preventing interaction and reducing opacity.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "State",
      },
    },
    children: {
      control: "text",
      description: "Toggle content -- typically an icon, text, or both.",
      table: {
        type: { summary: "React.ReactNode" },
        category: "Content",
      },
    },
  },
  args: {
    onPressedChange: fn(),
  },
}

export default meta
type Story = StoryObj<typeof Toggle>

// ─── CORE VARIANTS ────────────────────────────────

/**
 * Default toggle with transparent background. Gains an accent background
 * when pressed.
 *
 * ```tsx
 * <Toggle aria-label="Toggle bold">
 *   <Bold className="h-4 w-4" />
 * </Toggle>
 * ```
 */
export const Default: Story = {
  render: (args) => (
    <Toggle aria-label="Toggle bold" {...args}>
      <Bold className="h-4 w-4" />
    </Toggle>
  ),
}

/**
 * Outline variant with a visible border. Better visual affordance for
 * standalone toggles.
 *
 * ```tsx
 * <Toggle variant="outline" aria-label="Toggle star">
 *   <Star className="h-4 w-4" />
 * </Toggle>
 * ```
 */
export const Outline: Story = {
  args: { variant: "outline" },
  render: (args) => (
    <Toggle aria-label="Toggle star" {...args}>
      <Star className="h-4 w-4" />
    </Toggle>
  ),
}

/** Pressed (on) state. The accent background indicates active state. */
export const Pressed: Story = {
  args: { defaultPressed: true },
  render: (args) => (
    <Toggle aria-label="Toggle bold" {...args}>
      <Bold className="h-4 w-4" />
    </Toggle>
  ),
}

/** Disabled toggle. Opacity is reduced and interaction is blocked. */
export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <Toggle aria-label="Toggle bold" {...args}>
      <Bold className="h-4 w-4" />
    </Toggle>
  ),
}

/** Disabled while pressed. Useful for locked formatting in read-only mode. */
export const DisabledPressed: Story = {
  name: "Disabled + Pressed",
  args: { disabled: true, defaultPressed: true },
  render: (args) => (
    <Toggle aria-label="Toggle bold" {...args}>
      <Bold className="h-4 w-4" />
    </Toggle>
  ),
}

// ─── WITH TEXT ─────────────────────────────────────

/**
 * Toggle with both icon and text label.
 *
 * ```tsx
 * <Toggle aria-label="Toggle bold" variant="outline">
 *   <Bold className="h-4 w-4 mr-1.5" />
 *   Bold
 * </Toggle>
 * ```
 */
export const WithText: Story = {
  name: "With Text",
  render: () => (
    <div className="flex gap-2">
      <Toggle aria-label="Toggle bold" variant="outline">
        <Bold className="h-4 w-4 mr-1.5" />
        Bold
      </Toggle>
      <Toggle aria-label="Toggle italic" variant="outline">
        <Italic className="h-4 w-4 mr-1.5" />
        Italic
      </Toggle>
      <Toggle aria-label="Toggle underline" variant="outline">
        <Underline className="h-4 w-4 mr-1.5" />
        Underline
      </Toggle>
    </div>
  ),
}

// ─── SIZES ────────────────────────────────────────

/** Side-by-side comparison of all three toggle sizes. */
export const AllSizes: Story = {
  name: "All Sizes",
  render: () => (
    <div className="flex items-center gap-3">
      <div className="flex flex-col items-center gap-1">
        <Toggle size="sm" aria-label="Small">
          <Bold className="h-3.5 w-3.5" />
        </Toggle>
        <span className="text-xs text-muted-foreground">sm</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <Toggle size="default" aria-label="Default">
          <Bold className="h-4 w-4" />
        </Toggle>
        <span className="text-xs text-muted-foreground">default</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <Toggle size="lg" aria-label="Large">
          <Bold className="h-5 w-5" />
        </Toggle>
        <span className="text-xs text-muted-foreground">lg</span>
      </div>
    </div>
  ),
}

/** Side-by-side of default vs outline variants, both pressed. */
export const AllVariants: Story = {
  name: "All Variants",
  render: () => (
    <div className="flex gap-3">
      <div className="flex flex-col items-center gap-1">
        <Toggle aria-label="Default variant" defaultPressed>
          <Star className="h-4 w-4" />
        </Toggle>
        <span className="text-xs text-muted-foreground">default</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <Toggle variant="outline" aria-label="Outline variant" defaultPressed>
          <Star className="h-4 w-4" />
        </Toggle>
        <span className="text-xs text-muted-foreground">outline</span>
      </div>
    </div>
  ),
}

// ─── TOGGLE GROUP ─────────────────────────────────

/**
 * Single-select toggle group. Only one item can be active at a time.
 * Use for mutually exclusive options like text alignment.
 *
 * ```tsx
 * <ToggleGroup type="single" defaultValue="left">
 *   <ToggleGroupItem value="left" aria-label="Align left">
 *     <AlignLeft className="h-4 w-4" />
 *   </ToggleGroupItem>
 *   <ToggleGroupItem value="center" aria-label="Align center">
 *     <AlignCenter className="h-4 w-4" />
 *   </ToggleGroupItem>
 * </ToggleGroup>
 * ```
 */
export const ToggleGroupSingle: Story = {
  name: "ToggleGroup -- Single Select",
  render: () => (
    <ToggleGroup type="single" defaultValue="left" variant="outline">
      <ToggleGroupItem value="left" aria-label="Align left">
        <AlignLeft className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">
        <AlignCenter className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        <AlignRight className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="justify" aria-label="Justify">
        <AlignJustify className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
}

/**
 * Multi-select toggle group. Multiple items can be active simultaneously.
 * Use for non-exclusive formatting options like bold + italic + underline.
 *
 * ```tsx
 * <ToggleGroup type="multiple" variant="outline">
 *   <ToggleGroupItem value="bold" aria-label="Bold">
 *     <Bold className="h-4 w-4" />
 *   </ToggleGroupItem>
 *   <ToggleGroupItem value="italic" aria-label="Italic">
 *     <Italic className="h-4 w-4" />
 *   </ToggleGroupItem>
 * </ToggleGroup>
 * ```
 */
export const ToggleGroupMultiple: Story = {
  name: "ToggleGroup -- Multiple Select",
  render: () => (
    <ToggleGroup type="multiple" variant="outline">
      <ToggleGroupItem value="bold" aria-label="Bold">
        <Bold className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Italic">
        <Italic className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Underline">
        <Underline className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
}

/** ToggleGroup sizes: sm, default, and lg side-by-side. */
export const ToggleGroupSizes: Story = {
  name: "ToggleGroup -- All Sizes",
  render: () => (
    <div className="flex flex-col items-start gap-4">
      <div className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground">sm</span>
        <ToggleGroup type="single" defaultValue="grid" size="sm" variant="outline">
          <ToggleGroupItem value="grid" aria-label="Grid view">
            <LayoutGrid className="h-3.5 w-3.5" />
          </ToggleGroupItem>
          <ToggleGroupItem value="list" aria-label="List view">
            <List className="h-3.5 w-3.5" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground">default</span>
        <ToggleGroup type="single" defaultValue="grid" size="default" variant="outline">
          <ToggleGroupItem value="grid" aria-label="Grid view">
            <LayoutGrid className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="list" aria-label="List view">
            <List className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground">lg</span>
        <ToggleGroup type="single" defaultValue="grid" size="lg" variant="outline">
          <ToggleGroupItem value="grid" aria-label="Grid view">
            <LayoutGrid className="h-5 w-5" />
          </ToggleGroupItem>
          <ToggleGroupItem value="list" aria-label="List view">
            <List className="h-5 w-5" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  ),
}

// ─── REAL-WORLD COMPOSITIONS ──────────────────────

/**
 * Aspire text editor toolbar with bold/italic/underline toggles and
 * alignment toggle group. Common pattern for content creation.
 *
 * ```tsx
 * <ToggleGroup type="multiple" variant="outline" size="sm">
 *   <ToggleGroupItem value="bold">B</ToggleGroupItem>
 *   <ToggleGroupItem value="italic">I</ToggleGroupItem>
 * </ToggleGroup>
 * ```
 */
export const TextEditorToolbar: Story = {
  name: "Real World -- Text Editor Toolbar",
  render: () => {
    const [formatting, setFormatting] = useState<string[]>([])
    const [align, setAlign] = useState("left")

    return (
      <div className="w-96 rounded-lg border bg-card overflow-hidden">
        <div className="flex items-center gap-1 border-b px-2 py-1.5">
          <ToggleGroup
            type="multiple"
            size="sm"
            value={formatting}
            onValueChange={setFormatting}
          >
            <ToggleGroupItem value="bold" aria-label="Bold">
              <Bold className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Italic">
              <Italic className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Underline">
              <Underline className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
          <div className="mx-1 h-5 w-px bg-border" />
          <ToggleGroup
            type="single"
            size="sm"
            value={align}
            onValueChange={(v) => { if (v) setAlign(v) }}
          >
            <ToggleGroupItem value="left" aria-label="Align left">
              <AlignLeft className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="center" aria-label="Align center">
              <AlignCenter className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="right" aria-label="Align right">
              <AlignRight className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="justify" aria-label="Justify">
              <AlignJustify className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <div
          className={`p-4 min-h-[80px] text-sm text-muted-foreground ${
            formatting.includes("bold") ? "font-bold" : ""
          } ${formatting.includes("italic") ? "italic" : ""} ${
            formatting.includes("underline") ? "underline" : ""
          } text-${align}`}
        >
          Sample text. Toggle the buttons above to apply formatting.
        </div>
      </div>
    )
  },
}

/**
 * Aspire view mode toggle -- switch between grid and list views.
 * Common in contacts pages and content libraries.
 *
 * ```tsx
 * <ToggleGroup type="single" value={view} onValueChange={setView} variant="outline">
 *   <ToggleGroupItem value="grid"><LayoutGrid /></ToggleGroupItem>
 *   <ToggleGroupItem value="list"><List /></ToggleGroupItem>
 * </ToggleGroup>
 * ```
 */
export const ViewModeToggle: Story = {
  name: "Real World -- View Mode Toggle",
  render: () => {
    const [view, setView] = useState("grid")
    return (
      <div className="flex items-center gap-4">
        <ToggleGroup
          type="single"
          value={view}
          onValueChange={(v) => { if (v) setView(v) }}
          variant="outline"
          size="sm"
        >
          <ToggleGroupItem value="grid" aria-label="Grid view">
            <LayoutGrid className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="list" aria-label="List view">
            <List className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
        <span className="text-sm text-muted-foreground">
          Viewing as: <span className="font-medium capitalize">{view}</span>
        </span>
      </div>
    )
  },
}

/**
 * Aspire filter toggles for campaign content types.
 * Multiple filters can be active at once.
 */
export const FilterToggles: Story = {
  name: "Real World -- Filter Toggles",
  render: () => {
    const [filters, setFilters] = useState<string[]>([])
    const filterOptions = [
      { value: "instagram", label: "Instagram" },
      { value: "tiktok", label: "TikTok" },
      { value: "youtube", label: "YouTube" },
      { value: "twitter", label: "Twitter" },
    ]
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Platforms</span>
        </div>
        <ToggleGroup
          type="multiple"
          value={filters}
          onValueChange={setFilters}
          variant="outline"
          size="sm"
        >
          {filterOptions.map(({ value, label }) => (
            <ToggleGroupItem key={value} value={value}>
              {label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <p className="text-xs text-muted-foreground">
          {filters.length === 0
            ? "No filters applied -- showing all platforms"
            : `Filtering: ${filters.join(", ")}`}
        </p>
      </div>
    )
  },
}

/**
 * Media call controls with destructive styling for muted state.
 */
export const MediaControls: Story = {
  name: "Real World -- Media Call Controls",
  render: () => {
    const [micOn, setMicOn] = useState(true)
    const [videoOn, setVideoOn] = useState(true)

    return (
      <div className="flex items-center gap-3 rounded-xl border bg-card px-6 py-4">
        <Toggle
          variant="outline"
          pressed={!micOn}
          onPressedChange={() => setMicOn((v) => !v)}
          aria-label="Toggle microphone"
          className={!micOn ? "border-destructive text-destructive hover:text-destructive" : ""}
        >
          {micOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
        </Toggle>
        <Toggle
          variant="outline"
          pressed={!videoOn}
          onPressedChange={() => setVideoOn((v) => !v)}
          aria-label="Toggle camera"
          className={!videoOn ? "border-destructive text-destructive hover:text-destructive" : ""}
        >
          {videoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
        </Toggle>
        <span className="text-sm text-muted-foreground ml-2">
          {micOn ? "Mic on" : "Muted"} · {videoOn ? "Camera on" : "Camera off"}
        </span>
      </div>
    )
  },
}

// ─── INTERACTION TESTS ────────────────────────────

/**
 * Verifies that clicking a toggle changes its pressed state and fires `onPressedChange`.
 */
export const ClickToToggleTest: Story = {
  name: "Test: Click to Toggle",
  render: (args) => (
    <Toggle aria-label="Toggle bold" {...args}>
      <Bold className="h-4 w-4" />
    </Toggle>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const toggle = canvas.getByRole("button", { name: "Toggle bold" })

    // Initially not pressed
    await expect(toggle).toHaveAttribute("data-state", "off")

    // Click to press
    await userEvent.click(toggle)
    await expect(args.onPressedChange).toHaveBeenCalledTimes(1)
    await expect(args.onPressedChange).toHaveBeenCalledWith(true)
  },
}

/**
 * Verifies that a disabled toggle does NOT fire `onPressedChange` on click.
 */
export const DisabledClickTest: Story = {
  name: "Test: Disabled Prevents Toggle",
  args: { disabled: true },
  render: (args) => (
    <Toggle aria-label="Toggle bold" {...args}>
      <Bold className="h-4 w-4" />
    </Toggle>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const toggle = canvas.getByRole("button", { name: "Toggle bold" })

    // Should be disabled
    await expect(toggle).toBeDisabled()

    // Click should not fire handler
    await userEvent.click(toggle)
    await expect(args.onPressedChange).not.toHaveBeenCalled()
  },
}

/**
 * Verifies keyboard interaction: pressing Enter toggles the toggle button.
 */
export const KeyboardToggleTest: Story = {
  name: "Test: Keyboard Toggle",
  render: (args) => (
    <Toggle aria-label="Toggle bold" {...args}>
      <Bold className="h-4 w-4" />
    </Toggle>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const toggle = canvas.getByRole("button", { name: "Toggle bold" })

    // Focus the toggle
    await userEvent.tab()
    await expect(toggle).toHaveFocus()

    // Press Enter to toggle
    await userEvent.keyboard("{Enter}")
    await expect(args.onPressedChange).toHaveBeenCalledTimes(1)
    await expect(args.onPressedChange).toHaveBeenCalledWith(true)
  },
}
