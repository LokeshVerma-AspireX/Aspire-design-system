import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "storybook/test"
import { within, userEvent, expect, waitFor } from "storybook/test"
import { useState } from "react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverAnchor,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Info,
  SlidersHorizontal,
  Calendar,
  Palette,
  Edit,
  Mail,
  MapPin,
  ExternalLink,
} from "lucide-react"

/**
 * # Popover
 *
 * A floating contextual overlay triggered by a button or element. Unlike
 * Dialog, a Popover has no backdrop and does not block interaction with
 * the rest of the page. It is anchored to its trigger element and
 * repositions automatically to stay in the viewport.
 *
 * ## When to Use
 * - For quick-edit forms (rename, update a single field)
 * - For filter dropdowns with switches or checkboxes
 * - For contextual info cards (user mentions, tooltips with actions)
 * - As a container for pickers (date picker, color picker)
 *
 * ## When NOT to Use
 * - For critical confirmations -- use Dialog instead
 * - For long forms or detail views -- use Sheet instead
 * - For read-only hover info -- use Tooltip instead
 * - For navigation menus -- use DropdownMenu instead
 *
 * ## Accessibility
 * - The trigger receives `aria-expanded` and `aria-haspopup` attributes
 * - Focus moves to the popover content when opened
 * - Pressing Escape closes the popover and returns focus to the trigger
 * - Content is dismissible by clicking outside
 *
 * ## Import
 * ```tsx
 * import {
 *   Popover,
 *   PopoverTrigger,
 *   PopoverContent,
 * } from '@/components/ui/popover'
 * ```
 *
 * ## Quick Start
 * ```tsx
 * <Popover>
 *   <PopoverTrigger asChild>
 *     <Button variant="outline">Open</Button>
 *   </PopoverTrigger>
 *   <PopoverContent>
 *     <p>Popover content here.</p>
 *   </PopoverContent>
 * </Popover>
 * ```
 */
const meta: Meta<typeof Popover> = {
  title: "4. Components/Feedback/Popover",
  component: Popover,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Floating contextual overlay triggered by a button. Lighter than Dialog -- no backdrop, no focus trapping.",
      },
    },
  },
  argTypes: {
    open: {
      control: "boolean",
      description:
        "Controlled open state. When provided, the popover becomes controlled and `onOpenChange` is required.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "undefined" },
        category: "State",
      },
    },
    defaultOpen: {
      control: "boolean",
      description: "The initial open state for uncontrolled usage.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "State",
      },
    },
    onOpenChange: {
      description:
        "Callback fired when the open state changes. Required for controlled mode.",
      table: {
        type: { summary: "(open: boolean) => void" },
        category: "Events",
      },
    },
    modal: {
      control: "boolean",
      description:
        "When true, interaction with outside elements is blocked while open.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "Behavior",
      },
    },
  },
  args: {
    onOpenChange: fn(),
  },
}

export default meta
type Story = StoryObj<typeof meta>

// ─── CORE VARIANTS ─────────────────────────────────

/**
 * Basic popover with simple text content.
 *
 * ```tsx
 * <Popover>
 *   <PopoverTrigger asChild>
 *     <Button variant="outline">
 *       <Info className="mr-2 h-4 w-4" />
 *       Open Popover
 *     </Button>
 *   </PopoverTrigger>
 *   <PopoverContent className="w-64">
 *     <p className="text-sm">Helpful info here.</p>
 *   </PopoverContent>
 * </Popover>
 * ```
 */
export const Basic: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Info className="mr-2 h-4 w-4" />
          Open Popover
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <p className="text-sm">
          This is a basic popover with some helpful information. It floats
          above the page without blocking interaction elsewhere.
        </p>
      </PopoverContent>
    </Popover>
  ),
}

/**
 * Popover containing a small form. Great for inline editing without
 * opening a full dialog.
 *
 * ```tsx
 * <PopoverContent className="w-72">
 *   <div className="grid gap-3">
 *     <Label htmlFor="name">Name</Label>
 *     <Input id="name" />
 *     <Button size="sm">Save</Button>
 *   </div>
 * </PopoverContent>
 * ```
 */
export const WithFormInside: Story = {
  name: "With Form Inside",
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Quick Edit</Button>
      </PopoverTrigger>
      <PopoverContent className="w-72">
        <div className="grid gap-3">
          <div className="space-y-1">
            <p className="text-sm font-semibold">Quick Edit</p>
            <p className="text-xs text-muted-foreground">
              Update key details without opening the full editor.
            </p>
          </div>
          <Separator />
          <div className="grid gap-2">
            <div className="grid gap-1">
              <Label htmlFor="pop-name" className="text-xs">
                Name
              </Label>
              <Input
                id="pop-name"
                defaultValue="Summer Collection"
                className="h-8 text-sm"
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="pop-url" className="text-xs">
                Slug
              </Label>
              <Input
                id="pop-url"
                defaultValue="/summer-2026"
                className="h-8 text-sm"
              />
            </div>
          </div>
          <Button size="sm" className="w-full">
            Save
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  ),
}

/**
 * Popover using the `PopoverHeader`, `PopoverTitle`, and
 * `PopoverDescription` sub-components for structured headings.
 *
 * ```tsx
 * <PopoverContent>
 *   <PopoverHeader>
 *     <PopoverTitle>Title</PopoverTitle>
 *     <PopoverDescription>Description text.</PopoverDescription>
 *   </PopoverHeader>
 *   <p>Body content...</p>
 * </PopoverContent>
 * ```
 */
export const WithHeaderTitle: Story = {
  name: "With Header & Title",
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Info className="mr-2 h-4 w-4" />
          Campaign Info
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72">
        <PopoverHeader className="mb-3">
          <PopoverTitle>Campaign Details</PopoverTitle>
          <PopoverDescription>
            Quick overview of the current campaign.
          </PopoverDescription>
        </PopoverHeader>
        <Separator className="mb-3" />
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Status</span>
            <Badge variant="secondary">Active</Badge>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Creators</span>
            <span className="font-medium">24</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Budget</span>
            <span className="font-medium">$12,000</span>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
}

// ─── ALIGNMENT VARIANTS ────────────────────────────

/**
 * Popover aligned to the start (left edge) of the trigger.
 *
 * ```tsx
 * <PopoverContent align="start">...</PopoverContent>
 * ```
 */
export const AlignStart: Story = {
  name: "Align Start",
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Align Start</Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-64">
        <p className="text-sm">
          This popover is aligned to the <strong>start</strong> (left) edge of
          the trigger button.
        </p>
      </PopoverContent>
    </Popover>
  ),
}

/**
 * Popover aligned to the center (default) of the trigger.
 *
 * ```tsx
 * <PopoverContent align="center">...</PopoverContent>
 * ```
 */
export const AlignCenter: Story = {
  name: "Align Center (Default)",
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Align Center</Button>
      </PopoverTrigger>
      <PopoverContent align="center" className="w-64">
        <p className="text-sm">
          This popover is aligned to the <strong>center</strong> of the trigger.
          This is the default alignment.
        </p>
      </PopoverContent>
    </Popover>
  ),
}

/**
 * Popover aligned to the end (right edge) of the trigger.
 *
 * ```tsx
 * <PopoverContent align="end">...</PopoverContent>
 * ```
 */
export const AlignEnd: Story = {
  name: "Align End",
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Align End</Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-64">
        <p className="text-sm">
          This popover is aligned to the <strong>end</strong> (right) edge of
          the trigger button.
        </p>
      </PopoverContent>
    </Popover>
  ),
}

// ─── PICKER CONTAINERS ─────────────────────────────

/**
 * Popover used as a container for a color picker. Demonstrates how
 * Popover can wrap any interactive content.
 *
 * ```tsx
 * <Popover>
 *   <PopoverTrigger asChild>
 *     <Button variant="outline">
 *       <Palette className="mr-2 h-4 w-4" />
 *       Pick Color
 *     </Button>
 *   </PopoverTrigger>
 *   <PopoverContent>
 *     ...color swatches...
 *   </PopoverContent>
 * </Popover>
 * ```
 */
export const AsColorPicker: Story = {
  name: "As Color Picker Container",
  render: () => {
    const colors = [
      "#ef4444",
      "#f97316",
      "#eab308",
      "#22c55e",
      "#06b6d4",
      "#3b82f6",
      "#8b5cf6",
      "#ec4899",
      "#6b7280",
      "#000000",
      "#ffffff",
      "#f5f5f4",
    ]
    const [selected, setSelected] = useState("#3b82f6")
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="gap-2">
            <div
              className="h-4 w-4 rounded-sm border"
              style={{ backgroundColor: selected }}
            />
            Brand Color
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56">
          <div className="space-y-3">
            <p className="text-sm font-medium">Choose a color</p>
            <div className="grid grid-cols-6 gap-1.5">
              {colors.map((color) => (
                <button
                  key={color}
                  className={`h-7 w-7 rounded-md border-2 transition-all ${
                    selected === color
                      ? "border-primary scale-110"
                      : "border-transparent hover:scale-105"
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelected(color)}
                  aria-label={`Select color ${color}`}
                />
              ))}
            </div>
            <Separator />
            <div className="flex items-center gap-2">
              <Label htmlFor="hex-input" className="text-xs shrink-0">
                Hex
              </Label>
              <Input
                id="hex-input"
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
                className="h-7 text-xs"
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    )
  },
}

/**
 * Popover used as a container for a date picker. Shows a simple date
 * range input inside a popover.
 *
 * ```tsx
 * <Popover>
 *   <PopoverTrigger asChild>
 *     <Button variant="outline">
 *       <Calendar className="mr-2 h-4 w-4" />
 *       Select dates
 *     </Button>
 *   </PopoverTrigger>
 *   <PopoverContent>
 *     ...date inputs...
 *   </PopoverContent>
 * </Popover>
 * ```
 */
export const AsDatePicker: Story = {
  name: "As Date Picker Container",
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Calendar className="h-4 w-4" />
          Select Dates
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72">
        <div className="space-y-3">
          <p className="text-sm font-medium">Date Range</p>
          <p className="text-xs text-muted-foreground">
            Choose the start and end dates for your campaign.
          </p>
          <Separator />
          <div className="grid gap-2">
            <div className="grid gap-1">
              <Label htmlFor="dp-start" className="text-xs">
                Start date
              </Label>
              <Input id="dp-start" type="date" className="h-8 text-sm" />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="dp-end" className="text-xs">
                End date
              </Label>
              <Input id="dp-end" type="date" className="h-8 text-sm" />
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              Clear
            </Button>
            <Button size="sm" className="flex-1">
              Apply
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
}

// ─── ASPIRE REAL-WORLD EXAMPLES ─────────────────────

/**
 * Aspire quick edit popover. Allows inline editing of a campaign name
 * and budget without navigating away.
 */
export const AspireQuickEdit: Story = {
  name: "Aspire -- Quick Edit Popover",
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-1.5">
          <Edit className="h-3.5 w-3.5" />
          Edit
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72">
        <div className="grid gap-3">
          <PopoverHeader>
            <PopoverTitle>Edit campaign</PopoverTitle>
            <PopoverDescription>
              Quick update without leaving the list.
            </PopoverDescription>
          </PopoverHeader>
          <Separator />
          <div className="grid gap-2">
            <div className="grid gap-1">
              <Label htmlFor="qe-name" className="text-xs">
                Campaign name
              </Label>
              <Input
                id="qe-name"
                defaultValue="Summer Collection 2026"
                className="h-8 text-sm"
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="qe-budget" className="text-xs">
                Budget ($)
              </Label>
              <Input
                id="qe-budget"
                type="number"
                defaultValue="12000"
                className="h-8 text-sm"
              />
            </div>
          </div>
          <Button size="sm" className="w-full">
            Save
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  ),
}

/**
 * Aspire filter popover with toggle switches. A lightweight alternative
 * to the full Sheet-based filter panel.
 */
export const AspireFilterPopover: Story = {
  name: "Aspire -- Filter Popover",
  render: () => {
    const [filters, setFilters] = useState({
      active: true,
      pending: false,
      archived: false,
    })
    const activeCount = Object.values(filters).filter(Boolean).length
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {activeCount > 0 && (
              <Badge className="ml-1 h-5 min-w-5 px-1 text-xs">
                {activeCount}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56">
          <div className="space-y-3">
            <p className="text-sm font-medium">Filter by status</p>
            <Separator />
            {(
              Object.entries(filters) as Array<
                [keyof typeof filters, boolean]
              >
            ).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <Label htmlFor={`f-${key}`} className="font-normal capitalize">
                  {key}
                </Label>
                <Switch
                  id={`f-${key}`}
                  checked={value}
                  onCheckedChange={(v) =>
                    setFilters((s) => ({ ...s, [key]: v }))
                  }
                />
              </div>
            ))}
            <Separator />
            <Button
              variant="ghost"
              size="sm"
              className="w-full"
              onClick={() =>
                setFilters({ active: false, pending: false, archived: false })
              }
            >
              Clear all
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    )
  },
}

/**
 * Aspire date picker popover. Used in campaign creation flows and
 * analytics date range selection.
 */
export const AspireDatePicker: Story = {
  name: "Aspire -- Date Picker",
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="gap-2 text-muted-foreground">
          <Calendar className="h-4 w-4" />
          Pick a date range
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72">
        <PopoverHeader className="mb-3">
          <PopoverTitle>Campaign dates</PopoverTitle>
          <PopoverDescription>
            Set the start and end dates for this campaign.
          </PopoverDescription>
        </PopoverHeader>
        <Separator className="mb-3" />
        <div className="grid gap-3">
          <div className="grid gap-1">
            <Label htmlFor="aspire-start" className="text-xs">
              Start
            </Label>
            <Input id="aspire-start" type="date" className="h-8 text-sm" />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="aspire-end" className="text-xs">
              End
            </Label>
            <Input id="aspire-end" type="date" className="h-8 text-sm" />
          </div>
          <Button size="sm" className="w-full">
            Apply dates
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  ),
}

/**
 * Aspire user mention card. Shows a rich profile card when hovering over
 * or clicking a user mention in the UI.
 */
export const AspireUserMentionCard: Story = {
  name: "Aspire -- User Mention Card",
  render: () => (
    <div className="text-sm text-muted-foreground">
      Assigned to{" "}
      <Popover>
        <PopoverTrigger asChild>
          <button className="inline-flex items-center gap-1 font-medium text-foreground underline-offset-4 hover:underline">
            @sarahj
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-3">
          <div className="flex gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="Sarah"
              />
              <AvatarFallback>SJ</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="text-sm font-semibold">Sarah Johnson</p>
                <Badge variant="secondary" className="text-xs">
                  Pro
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Lead Product Designer
              </p>
            </div>
          </div>
          <Separator className="my-3" />
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Mail className="h-3.5 w-3.5" />
              sarah@aspire.io
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              San Francisco, CA
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="mt-3 w-full gap-1.5"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            View profile
          </Button>
        </PopoverContent>
      </Popover>{" "}
      on Feb 18, 2026.
    </div>
  ),
}

// ─── INTERACTION TESTS ─────────────────────────────

/**
 * Interaction test: clicks the trigger and verifies the popover content
 * becomes visible.
 */
export const OpenPopoverTest: Story = {
  name: "Test -- Open Popover",
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open Test Popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <p className="text-sm">Test popover content is visible.</p>
      </PopoverContent>
    </Popover>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole("button", { name: "Open Test Popover" })
    await userEvent.click(trigger)
    // Popover renders in a portal — wait for open animation
    const body = within(document.body)
    await waitFor(() => {
      expect(body.getByText("Test popover content is visible.")).toBeVisible()
    }, { timeout: 3000 })
  },
}

/**
 * Interaction test: opens the popover and verifies a form label inside is
 * rendered correctly.
 */
export const VerifyFormInsideTest: Story = {
  name: "Test -- Verify Form Inside Popover",
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open Form Popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-72">
        <div className="grid gap-3">
          <p className="text-sm font-semibold">Edit Item</p>
          <div className="grid gap-1">
            <Label htmlFor="test-label" className="text-xs">
              Item name
            </Label>
            <Input
              id="test-label"
              defaultValue="Test Value"
              className="h-8 text-sm"
            />
          </div>
          <Button size="sm">Save</Button>
        </div>
      </PopoverContent>
    </Popover>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole("button", {
      name: "Open Form Popover",
    })
    await userEvent.click(trigger)
    const body = within(document.body)
    const label = await body.findByText("Item name", {}, { timeout: 5000 })
    await expect(label).toBeInTheDocument()
  },
}
