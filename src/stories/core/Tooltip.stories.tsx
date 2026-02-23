import type { Meta, StoryObj } from "@storybook/react"
import { within, userEvent, expect, waitFor } from "storybook/test"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Info,
  HelpCircle,
  Copy,
  Download,
  Trash2,
  Settings,
  Share2,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link as LinkIcon,
  Keyboard,
} from "lucide-react"

/**
 * # Tooltip
 *
 * An accessible popup that displays additional information when hovering or
 * focusing a trigger element. Powered by Radix UI, it supports configurable
 * placement, offset, and rich content.
 *
 * ## When to Use
 * - To provide supplementary context for icon-only buttons
 * - To explain truncated text or abbreviated labels
 * - To show keyboard shortcuts for actions
 * - To clarify disabled states or form field requirements
 *
 * ## When NOT to Use
 * - For critical information the user must see — use inline text or an Alert
 * - For interactive content (buttons, links) — use a Popover or DropdownMenu
 * - On mobile-only interfaces — tooltips rely on hover which is unavailable
 * - For long-form content — use a HoverCard or Dialog instead
 *
 * ## Accessibility
 * - Automatically adds `aria-describedby` linking trigger to content
 * - Opens on hover and focus, closes on Escape
 * - Content is rendered in a portal to avoid overflow clipping
 * - Trigger elements should have visible labels or `aria-label`
 * - `TooltipProvider` is already included in the global Storybook decorator
 *
 * ## Import
 * ```tsx
 * import {
 *   Tooltip,
 *   TooltipTrigger,
 *   TooltipContent,
 * } from '@/components/ui/tooltip'
 * ```
 *
 * ## Quick Start
 * ```tsx
 * <Tooltip>
 *   <TooltipTrigger asChild>
 *     <Button variant="outline">Hover me</Button>
 *   </TooltipTrigger>
 *   <TooltipContent>
 *     <p>Helpful information</p>
 *   </TooltipContent>
 * </Tooltip>
 * ```
 */
const meta: Meta<typeof Tooltip> = {
  title: "3. Primitives/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Accessible tooltip that appears on hover/focus. Wraps any trigger element. Supports all four sides, custom offsets, and rich content.",
      },
    },
  },
  argTypes: {
    open: {
      control: "boolean",
      description:
        "Controlled open state. Leave `undefined` for default uncontrolled behavior.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "undefined" },
        category: "State",
      },
    },
    defaultOpen: {
      control: "boolean",
      description: "Initial open state for uncontrolled usage.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "State",
      },
    },
    delayDuration: {
      control: { type: "number", min: 0, max: 2000, step: 50 },
      description:
        "Delay in ms before the tooltip opens on hover. Overrides the provider-level delay for this tooltip.",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "0 (from provider)" },
        category: "Behavior",
      },
    },
    children: {
      control: false,
      description:
        "Compose with `TooltipTrigger` and `TooltipContent` as children.",
      table: {
        type: { summary: "React.ReactNode" },
        category: "Content",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Tooltip>

// ─── CORE VARIANTS ─────────────────────────────────

/**
 * Basic tooltip on a button trigger.
 *
 * ```tsx
 * <Tooltip>
 *   <TooltipTrigger asChild>
 *     <Button variant="outline">Hover me</Button>
 *   </TooltipTrigger>
 *   <TooltipContent>
 *     <p>This is a tooltip</p>
 *   </TooltipContent>
 * </Tooltip>
 * ```
 */
export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This is a tooltip</p>
      </TooltipContent>
    </Tooltip>
  ),
}

// ─── ALL SIDES ─────────────────────────────────────

/**
 * Tooltips can appear on any of the four sides: `top`, `right`, `bottom`, `left`.
 * Set the `side` prop on `TooltipContent`.
 *
 * ```tsx
 * <TooltipContent side="top">Appears on top</TooltipContent>
 * <TooltipContent side="right">Appears on right</TooltipContent>
 * <TooltipContent side="bottom">Appears on bottom</TooltipContent>
 * <TooltipContent side="left">Appears on left</TooltipContent>
 * ```
 */
export const AllSides: Story = {
  name: "All Sides",
  render: () => (
    <div className="grid grid-cols-3 gap-4 p-12">
      <div />
      <div className="flex justify-center">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm">Top</Button>
          </TooltipTrigger>
          <TooltipContent side="top">Appears on top</TooltipContent>
        </Tooltip>
      </div>
      <div />
      <div className="flex justify-end">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm">Left</Button>
          </TooltipTrigger>
          <TooltipContent side="left">Appears on left</TooltipContent>
        </Tooltip>
      </div>
      <div />
      <div className="flex justify-start">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm">Right</Button>
          </TooltipTrigger>
          <TooltipContent side="right">Appears on right</TooltipContent>
        </Tooltip>
      </div>
      <div />
      <div className="flex justify-center">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm">Bottom</Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">Appears on bottom</TooltipContent>
        </Tooltip>
      </div>
      <div />
    </div>
  ),
}

// ─── ON BUTTON ─────────────────────────────────────

/**
 * Tooltip on a standard call-to-action button.
 *
 * ```tsx
 * <Tooltip>
 *   <TooltipTrigger asChild>
 *     <Button>Save Changes</Button>
 *   </TooltipTrigger>
 *   <TooltipContent>
 *     <p>Save all pending changes</p>
 *   </TooltipContent>
 * </Tooltip>
 * ```
 */
export const OnButton: Story = {
  name: "On Button",
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button>Save Changes</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Save all pending changes</p>
      </TooltipContent>
    </Tooltip>
  ),
}

// ─── ON ICON BUTTON ────────────────────────────────

/**
 * Icon-only buttons should always have a tooltip explaining the action.
 * The tooltip serves as the accessible label.
 *
 * ```tsx
 * <Tooltip>
 *   <TooltipTrigger asChild>
 *     <Button variant="ghost" size="icon" aria-label="Copy">
 *       <Copy />
 *     </Button>
 *   </TooltipTrigger>
 *   <TooltipContent>Copy to clipboard</TooltipContent>
 * </Tooltip>
 * ```
 */
export const IconButtonTooltips: Story = {
  name: "Icon Button Tooltips",
  render: () => (
    <div className="flex items-center gap-1">
      {[
        { icon: Copy, label: "Copy to clipboard" },
        { icon: Download, label: "Download" },
        { icon: Share2, label: "Share" },
        { icon: Settings, label: "Settings" },
        { icon: Trash2, label: "Delete permanently" },
      ].map(({ icon: Icon, label }) => (
        <Tooltip key={label}>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" aria-label={label}>
              <Icon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{label}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  ),
}

// ─── RICH CONTENT ──────────────────────────────────

/**
 * Tooltips can contain rich content including icons, multiple lines,
 * and formatted text. Keep content concise — for more complex content,
 * use a HoverCard or Popover instead.
 *
 * ```tsx
 * <TooltipContent className="max-w-xs">
 *   <div className="flex items-start gap-2">
 *     <Info className="mt-0.5 size-3.5 shrink-0" />
 *     <div>
 *       <p className="font-medium">Keyboard shortcut</p>
 *       <p className="text-foreground/70">Press Cmd+S to save</p>
 *     </div>
 *   </div>
 * </TooltipContent>
 * ```
 */
export const RichContent: Story = {
  name: "With Rich Content",
  render: () => (
    <div className="flex gap-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">
            <Keyboard className="mr-2" />
            Shortcuts
          </Button>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <div className="flex items-start gap-2">
            <Keyboard className="mt-0.5 size-3.5 shrink-0 text-background/70" />
            <div>
              <p className="font-medium">Keyboard Shortcuts</p>
              <p className="text-background/70">Cmd+S to save, Cmd+Z to undo</p>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">
            <Info className="mr-2" />
            Status
          </Button>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <div className="space-y-1">
            <p className="font-medium">Campaign Status: Active</p>
            <p className="text-background/70">Running since Jan 15, 2025. 12 creators enrolled, 8 posts delivered.</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
}

// ─── WITH SIDE OFFSET ──────────────────────────────

/**
 * Use `sideOffset` on `TooltipContent` to add spacing between the
 * tooltip and its trigger. The default is `0`.
 *
 * ```tsx
 * <TooltipContent sideOffset={8}>
 *   8px offset from trigger
 * </TooltipContent>
 * ```
 */
export const WithSideOffset: Story = {
  name: "With Side Offset",
  render: () => (
    <div className="flex gap-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm">Offset 0</Button>
        </TooltipTrigger>
        <TooltipContent sideOffset={0}>sideOffset: 0 (default)</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm">Offset 8</Button>
        </TooltipTrigger>
        <TooltipContent sideOffset={8}>sideOffset: 8</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm">Offset 16</Button>
        </TooltipTrigger>
        <TooltipContent sideOffset={16}>sideOffset: 16</TooltipContent>
      </Tooltip>
    </div>
  ),
}

// ─── DELAYED ───────────────────────────────────────

/**
 * Override the open delay for individual tooltips using `delayDuration`.
 * Useful for tooltips that should not appear immediately on hover.
 *
 * ```tsx
 * <Tooltip delayDuration={500}>
 *   <TooltipTrigger asChild>
 *     <Button>Slow tooltip</Button>
 *   </TooltipTrigger>
 *   <TooltipContent>Appeared after 500ms</TooltipContent>
 * </Tooltip>
 * ```
 */
export const Delayed: Story = {
  name: "Delayed Open",
  render: () => (
    <div className="flex gap-4">
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm">Instant (0ms)</Button>
        </TooltipTrigger>
        <TooltipContent>No delay</TooltipContent>
      </Tooltip>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm">300ms delay</Button>
        </TooltipTrigger>
        <TooltipContent>Delayed by 300ms</TooltipContent>
      </Tooltip>
      <Tooltip delayDuration={700}>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm">700ms delay</Button>
        </TooltipTrigger>
        <TooltipContent>Delayed by 700ms</TooltipContent>
      </Tooltip>
    </div>
  ),
}

// ─── REAL-WORLD COMPOSITIONS ───────────────────────

/**
 * Form field help tooltips — a common pattern for explaining field
 * requirements without cluttering the form layout.
 *
 * ```tsx
 * <div className="flex items-center gap-1.5">
 *   <Label htmlFor="field">Label</Label>
 *   <Tooltip>
 *     <TooltipTrigger asChild>
 *       <HelpCircle className="size-3.5 cursor-help text-muted-foreground" />
 *     </TooltipTrigger>
 *     <TooltipContent>Help text here</TooltipContent>
 *   </Tooltip>
 * </div>
 * ```
 */
export const FormFieldHelp: Story = {
  name: "Real World — Form Help Tooltips",
  render: () => (
    <div className="w-80 space-y-4">
      {[
        {
          id: "api-key",
          label: "API Key",
          type: "text" as const,
          placeholder: "sk-••••••••••••••••",
          tip: "Find your API key in Settings > Developer > API Keys",
        },
        {
          id: "webhook",
          label: "Webhook URL",
          type: "url" as const,
          placeholder: "https://your-app.com/webhook",
          tip: "We will send POST requests to this URL for campaign events",
        },
        {
          id: "budget",
          label: "Campaign Budget",
          type: "number" as const,
          placeholder: "5000",
          tip: "Total budget in USD. This includes creator fees and product costs.",
        },
      ].map(({ id, label, type, placeholder, tip }) => (
        <div key={id} className="grid gap-1.5">
          <div className="flex items-center gap-1.5">
            <Label htmlFor={id}>{label}</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="size-3.5 cursor-help text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent className="max-w-52">{tip}</TooltipContent>
            </Tooltip>
          </div>
          <Input id={id} type={type} placeholder={placeholder} />
        </div>
      ))}
    </div>
  ),
}

/**
 * Disabled button with a tooltip explaining why the action is unavailable.
 * Wrap the disabled button in a `<span>` to ensure the tooltip trigger
 * receives pointer events.
 *
 * ```tsx
 * <Tooltip>
 *   <TooltipTrigger asChild>
 *     <span tabIndex={0}>
 *       <Button disabled className="pointer-events-none">
 *         Delete Project
 *       </Button>
 *     </span>
 *   </TooltipTrigger>
 *   <TooltipContent>You need Admin access</TooltipContent>
 * </Tooltip>
 * ```
 */
export const DisabledButtonExplanation: Story = {
  name: "Real World — Disabled Action Explanation",
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <span tabIndex={0}>
          <Button disabled className="pointer-events-none">
            <Trash2 className="mr-2" />
            Delete Campaign
          </Button>
        </span>
      </TooltipTrigger>
      <TooltipContent>
        <p className="flex items-center gap-1.5">
          <Info className="size-3.5 text-amber-400 shrink-0" />
          You need Admin access to delete campaigns
        </p>
      </TooltipContent>
    </Tooltip>
  ),
}

/**
 * Text formatting toolbar — icon buttons with tooltips showing
 * actions and keyboard shortcuts.
 */
export const FormattingToolbar: Story = {
  name: "Real World — Formatting Toolbar",
  render: () => {
    const tools = [
      { icon: Bold, label: "Bold", shortcut: "Cmd+B" },
      { icon: Italic, label: "Italic", shortcut: "Cmd+I" },
      { icon: Underline, label: "Underline", shortcut: "Cmd+U" },
      { icon: AlignLeft, label: "Align Left", shortcut: "Cmd+Shift+L" },
      { icon: AlignCenter, label: "Align Center", shortcut: "Cmd+Shift+E" },
      { icon: AlignRight, label: "Align Right", shortcut: "Cmd+Shift+R" },
      { icon: LinkIcon, label: "Insert Link", shortcut: "Cmd+K" },
    ]
    return (
      <div className="flex items-center gap-0.5 rounded-md border bg-card p-1">
        {tools.map(({ icon: Icon, label, shortcut }) => (
          <Tooltip key={label}>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon-sm" aria-label={label}>
                <Icon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <span className="flex items-center gap-2">
                {label}
                <kbd className="rounded border border-background/20 bg-background/10 px-1 py-0.5 text-[10px] font-mono">
                  {shortcut}
                </kbd>
              </span>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    )
  },
}

/**
 * Tooltip on a badge element — useful for showing full status details
 * when the badge label is abbreviated.
 */
export const OnBadge: Story = {
  name: "Real World — Tooltip on Badge",
  render: () => (
    <div className="flex gap-3">
      <Tooltip>
        <TooltipTrigger asChild>
          <span>
            <Badge variant="secondary" className="cursor-help">IG</Badge>
          </span>
        </TooltipTrigger>
        <TooltipContent>Instagram</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <span>
            <Badge variant="secondary" className="cursor-help">TT</Badge>
          </span>
        </TooltipTrigger>
        <TooltipContent>TikTok</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <span>
            <Badge variant="secondary" className="cursor-help">YT</Badge>
          </span>
        </TooltipTrigger>
        <TooltipContent>YouTube</TooltipContent>
      </Tooltip>
    </div>
  ),
}

// ─── INTERACTION TESTS ─────────────────────────────

/**
 * Verifies that hovering over the trigger element causes the tooltip
 * content to appear in the DOM and become visible.
 */
export const HoverToShowTest: Story = {
  name: "Test: Hover Shows Tooltip",
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover to reveal</Button>
      </TooltipTrigger>
      <TooltipContent>Tooltip is visible</TooltipContent>
    </Tooltip>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole("button", { name: "Hover to reveal" })

    // Hover over the trigger
    await userEvent.hover(trigger)

    // The visual tooltip renders in a portal with data-slot="tooltip-content"
    // (role="tooltip" is a hidden accessibility span in Radix, not the visual element)
    await waitFor(() => {
      const el = document.querySelector('[data-slot="tooltip-content"]')
      expect(el).toBeTruthy()
      expect(el!.textContent).toContain("Tooltip is visible")
    }, { timeout: 3000 })

    // Unhover to dismiss
    await userEvent.unhover(trigger)
  },
}

/**
 * Verifies that focusing the trigger via keyboard (Tab) also opens
 * the tooltip, ensuring accessibility for keyboard-only users.
 */
export const FocusToShowTest: Story = {
  name: "Test: Focus Shows Tooltip",
  render: () => (
    <div>
      <button>Pre-focus target</button>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Focus me</Button>
        </TooltipTrigger>
        <TooltipContent>Tooltip via focus</TooltipContent>
      </Tooltip>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Tab to the pre-focus target first, then tab to the tooltip trigger
    const preFocus = canvas.getByRole("button", { name: "Pre-focus target" })
    preFocus.focus()
    await userEvent.tab()

    // The tooltip trigger should now be focused
    const trigger = canvas.getByRole("button", { name: "Focus me" })
    await expect(trigger).toHaveFocus()

    // The visual tooltip renders in a portal with data-slot="tooltip-content"
    await waitFor(() => {
      const el = document.querySelector('[data-slot="tooltip-content"]')
      expect(el).toBeTruthy()
      expect(el!.textContent).toContain("Tooltip via focus")
    }, { timeout: 3000 })
  },
}

/**
 * Verifies that multiple icon-button tooltips render correctly and
 * each shows the correct label on hover.
 */
export const IconTooltipTest: Story = {
  name: "Test: Icon Tooltips Show Labels",
  render: () => (
    <div className="flex items-center gap-1">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Copy item">
            <Copy />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Copy item</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Download file">
            <Download />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Download file</TooltipContent>
      </Tooltip>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Hover over the Copy button
    const copyButton = canvas.getByRole("button", { name: "Copy item" })
    await userEvent.hover(copyButton)

    // Visual tooltip appears in portal with data-slot="tooltip-content"
    await waitFor(() => {
      const el = document.querySelector('[data-slot="tooltip-content"]')
      expect(el).toBeTruthy()
      expect(el!.textContent).toContain("Copy item")
    }, { timeout: 3000 })

    // Unhover and wait for the old tooltip to fully close (exit animation)
    await userEvent.unhover(copyButton)
    await waitFor(() => {
      expect(document.querySelector('[data-slot="tooltip-content"]')).toBeNull()
    }, { timeout: 3000 })

    // Now hover the Download button
    const downloadButton = canvas.getByRole("button", { name: "Download file" })
    await userEvent.hover(downloadButton)

    // Wait for the new tooltip to appear with correct content
    await waitFor(() => {
      const el = document.querySelector('[data-slot="tooltip-content"]')
      expect(el).toBeTruthy()
      expect(el!.textContent).toContain("Download file")
    }, { timeout: 3000 })

    await userEvent.unhover(downloadButton)
  },
}
