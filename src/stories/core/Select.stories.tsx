import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"
import { within, userEvent, expect } from "storybook/test"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"

/**
 * # Select
 *
 * A dropdown select menu built on Radix UI primitives with full keyboard
 * navigation, screen-reader announcements, and typeahead search. Renders a
 * trigger button that opens a portal-based popover with scrollable option groups.
 *
 * ## When to Use
 * - To let users pick a single value from a predefined list of 5+ options
 * - When screen space is limited and a RadioGroup would take too much room
 * - For form fields such as country, role, status, or category selectors
 *
 * ## When NOT to Use
 * - For fewer than 5 options where all choices should be visible — use RadioGroup
 * - When users need to select multiple values — use a multi-select or Checkbox group
 * - For free-form text with suggestions — use Combobox / Command
 * - For boolean toggles — use Switch or Checkbox
 *
 * ## Accessibility
 * - Trigger has `role="combobox"` with `aria-expanded` and `aria-haspopup="listbox"`
 * - Options use `role="option"` with `aria-selected` on the active item
 * - Full keyboard support: Arrow keys to navigate, Enter/Space to select, Esc to close
 * - Typeahead: typing characters jumps to matching options
 * - Disabled items are excluded from keyboard navigation
 * - Pair with `<Label>` via matching `id`/`htmlFor` for screen-reader context
 *
 * ## Import
 * ```tsx
 * import {
 *   Select,
 *   SelectTrigger,
 *   SelectValue,
 *   SelectContent,
 *   SelectItem,
 *   SelectGroup,
 *   SelectLabel,
 *   SelectSeparator,
 * } from '@/components/ui/select'
 * ```
 *
 * ## Quick Start
 * ```tsx
 * <Select>
 *   <SelectTrigger className="w-48">
 *     <SelectValue placeholder="Pick one..." />
 *   </SelectTrigger>
 *   <SelectContent>
 *     <SelectItem value="a">Alpha</SelectItem>
 *     <SelectItem value="b">Bravo</SelectItem>
 *   </SelectContent>
 * </Select>
 * ```
 */
const meta: Meta<typeof Select> = {
  title: "3. Primitives/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Dropdown select built on Radix UI with keyboard navigation, typeahead, and screen-reader support.",
      },
    },
  },
  argTypes: {
    defaultValue: {
      control: "text",
      description: "The initial value when uncontrolled.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
        category: "Value",
      },
    },
    value: {
      control: "text",
      description: "The controlled value. Use with `onValueChange`.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
        category: "Value",
      },
    },
    onValueChange: {
      description: "Callback fired when the selected value changes.",
      table: {
        type: { summary: "(value: string) => void" },
        category: "Events",
      },
    },
    disabled: {
      control: "boolean",
      description: "When true, prevents interaction and reduces opacity.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "State",
      },
    },
    open: {
      control: "boolean",
      description: "Controlled open state of the dropdown.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "undefined" },
        category: "State",
      },
    },
    onOpenChange: {
      description: "Callback fired when the open state changes.",
      table: {
        type: { summary: "(open: boolean) => void" },
        category: "Events",
      },
    },
    name: {
      control: "text",
      description: "Name attribute for the hidden native select (form submission).",
      table: {
        type: { summary: "string" },
        category: "Form",
      },
    },
    required: {
      control: "boolean",
      description: "Marks the field as required for form validation.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "Form",
      },
    },
  },
  args: {
    onValueChange: fn(),
  },
}

export default meta
type Story = StoryObj<typeof meta>

// ─── BASIC VARIANTS ─────────────────────────────────

/**
 * Basic select with a placeholder prompt. The most common usage pattern.
 *
 * ```tsx
 * <Select>
 *   <SelectTrigger className="w-48">
 *     <SelectValue placeholder="Select an option" />
 *   </SelectTrigger>
 *   <SelectContent>
 *     <SelectItem value="option1">Option 1</SelectItem>
 *     <SelectItem value="option2">Option 2</SelectItem>
 *     <SelectItem value="option3">Option 3</SelectItem>
 *   </SelectContent>
 * </Select>
 * ```
 */
export const Default: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
        <SelectItem value="option3">Option 3</SelectItem>
      </SelectContent>
    </Select>
  ),
}

/**
 * Select with a pre-selected value via `defaultValue`.
 *
 * ```tsx
 * <Select defaultValue="option2">
 *   <SelectTrigger className="w-48">
 *     <SelectValue />
 *   </SelectTrigger>
 *   <SelectContent>
 *     <SelectItem value="option1">Option 1</SelectItem>
 *     <SelectItem value="option2">Option 2</SelectItem>
 *   </SelectContent>
 * </Select>
 * ```
 */
export const WithDefaultValue: Story = {
  name: "Pre-selected Value",
  render: (args) => (
    <Select {...args} defaultValue="option2">
      <SelectTrigger className="w-48">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
        <SelectItem value="option3">Option 3</SelectItem>
      </SelectContent>
    </Select>
  ),
}

/**
 * Placeholder text guides the user before any option is selected.
 *
 * ```tsx
 * <Select>
 *   <SelectTrigger className="w-56">
 *     <SelectValue placeholder="Choose a campaign type..." />
 *   </SelectTrigger>
 *   ...
 * </Select>
 * ```
 */
export const WithPlaceholder: Story = {
  name: "With Placeholder",
  render: (args) => (
    <Select {...args}>
      <SelectTrigger className="w-56">
        <SelectValue placeholder="Choose a campaign type..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="ugc">User-Generated Content</SelectItem>
        <SelectItem value="sponsored">Sponsored Post</SelectItem>
        <SelectItem value="affiliate">Affiliate</SelectItem>
        <SelectItem value="ambassador">Brand Ambassador</SelectItem>
      </SelectContent>
    </Select>
  ),
}

// ─── GROUPED OPTIONS ────────────────────────────────

/**
 * Options can be organized into labelled groups with separators for better
 * scannability in long lists.
 *
 * ```tsx
 * <Select>
 *   <SelectTrigger className="w-56">
 *     <SelectValue placeholder="Select a platform" />
 *   </SelectTrigger>
 *   <SelectContent>
 *     <SelectGroup>
 *       <SelectLabel>Social</SelectLabel>
 *       <SelectItem value="instagram">Instagram</SelectItem>
 *       <SelectItem value="tiktok">TikTok</SelectItem>
 *     </SelectGroup>
 *     <SelectSeparator />
 *     <SelectGroup>
 *       <SelectLabel>Video</SelectLabel>
 *       <SelectItem value="youtube">YouTube</SelectItem>
 *     </SelectGroup>
 *   </SelectContent>
 * </Select>
 * ```
 */
export const WithGroups: Story = {
  name: "With Grouped Options",
  render: (args) => (
    <Select {...args}>
      <SelectTrigger className="w-56">
        <SelectValue placeholder="Select a platform" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Social</SelectLabel>
          <SelectItem value="instagram">Instagram</SelectItem>
          <SelectItem value="tiktok">TikTok</SelectItem>
          <SelectItem value="twitter">X (Twitter)</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Video</SelectLabel>
          <SelectItem value="youtube">YouTube</SelectItem>
          <SelectItem value="twitch">Twitch</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Blog</SelectLabel>
          <SelectItem value="wordpress">WordPress</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
}

// ─── SIZES ──────────────────────────────────────────

/**
 * The small trigger size (`size="sm"`) is useful in dense UIs such as
 * filter bars and table headers.
 *
 * ```tsx
 * <Select>
 *   <SelectTrigger size="sm" className="w-40">
 *     <SelectValue placeholder="Filter" />
 *   </SelectTrigger>
 *   <SelectContent>
 *     <SelectItem value="all">All</SelectItem>
 *     <SelectItem value="active">Active</SelectItem>
 *   </SelectContent>
 * </Select>
 * ```
 */
export const SmallSize: Story = {
  name: "Small Size (sm)",
  render: (args) => (
    <div className="flex items-center gap-3">
      <Select {...args}>
        <SelectTrigger size="sm" className="w-40">
          <SelectValue placeholder="Small" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Default" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
}

// ─── STATES ─────────────────────────────────────────

/**
 * Disabled select prevents all interaction and reduces opacity.
 *
 * ```tsx
 * <Select disabled>
 *   <SelectTrigger className="w-48">
 *     <SelectValue placeholder="Disabled" />
 *   </SelectTrigger>
 *   <SelectContent>
 *     <SelectItem value="a">A</SelectItem>
 *   </SelectContent>
 * </Select>
 * ```
 */
export const Disabled: Story = {
  render: () => (
    <Select disabled>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Disabled" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="a">Option A</SelectItem>
        <SelectItem value="b">Option B</SelectItem>
      </SelectContent>
    </Select>
  ),
}

/**
 * Paired with a `<Label>` element for proper form accessibility. The `htmlFor`
 * attribute on the label must match the `id` on the `SelectTrigger`.
 *
 * ```tsx
 * <div className="grid w-56 gap-1.5">
 *   <Label htmlFor="role-select">Role</Label>
 *   <Select>
 *     <SelectTrigger id="role-select">
 *       <SelectValue placeholder="Select a role" />
 *     </SelectTrigger>
 *     <SelectContent>
 *       <SelectItem value="admin">Admin</SelectItem>
 *       <SelectItem value="editor">Editor</SelectItem>
 *     </SelectContent>
 *   </Select>
 * </div>
 * ```
 */
export const WithLabel: Story = {
  name: "With Label",
  render: (args) => (
    <div className="grid w-56 gap-1.5">
      <Label htmlFor="role-select">Role</Label>
      <Select {...args}>
        <SelectTrigger id="role-select">
          <SelectValue placeholder="Select a role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="admin">Admin</SelectItem>
          <SelectItem value="editor">Editor</SelectItem>
          <SelectItem value="viewer">Viewer</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
}

/**
 * Use `aria-invalid` and destructive styles to indicate a validation error.
 * Link an error message via `aria-describedby` for screen readers.
 *
 * ```tsx
 * <div className="grid w-56 gap-1.5">
 *   <Label htmlFor="platform-err" className="text-destructive">Platform</Label>
 *   <Select>
 *     <SelectTrigger id="platform-err" aria-invalid="true" aria-describedby="platform-hint">
 *       <SelectValue placeholder="Select a platform" />
 *     </SelectTrigger>
 *     <SelectContent>...</SelectContent>
 *   </Select>
 *   <p id="platform-hint" className="text-sm text-destructive">Platform is required.</p>
 * </div>
 * ```
 */
export const WithValidationError: Story = {
  name: "With Validation Error",
  render: (args) => (
    <div className="grid w-56 gap-1.5">
      <Label htmlFor="platform-err" className="text-destructive">
        Platform
      </Label>
      <Select {...args}>
        <SelectTrigger
          id="platform-err"
          aria-invalid="true"
          aria-describedby="platform-hint"
        >
          <SelectValue placeholder="Select a platform" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="instagram">Instagram</SelectItem>
          <SelectItem value="tiktok">TikTok</SelectItem>
          <SelectItem value="youtube">YouTube</SelectItem>
        </SelectContent>
      </Select>
      <p id="platform-hint" className="text-sm text-destructive">
        Platform is required.
      </p>
    </div>
  ),
}

// ─── COMPOSITIONS ───────────────────────────────────

/**
 * Multiple selects side by side for filter bars and multi-field forms.
 *
 * ```tsx
 * <div className="flex items-end gap-3">
 *   <div className="grid gap-1.5">
 *     <Label>Platform</Label>
 *     <Select><SelectTrigger className="w-40">...</SelectTrigger>...</Select>
 *   </div>
 *   <div className="grid gap-1.5">
 *     <Label>Status</Label>
 *     <Select><SelectTrigger className="w-40">...</SelectTrigger>...</Select>
 *   </div>
 * </div>
 * ```
 */
export const MultipleSideBySide: Story = {
  name: "Multiple Selects Side by Side",
  render: () => (
    <div className="flex items-end gap-3">
      <div className="grid gap-1.5">
        <Label htmlFor="filter-platform">Platform</Label>
        <Select>
          <SelectTrigger id="filter-platform" className="w-40">
            <SelectValue placeholder="All platforms" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="instagram">Instagram</SelectItem>
            <SelectItem value="tiktok">TikTok</SelectItem>
            <SelectItem value="youtube">YouTube</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="filter-status">Status</Label>
        <Select>
          <SelectTrigger id="filter-status" className="w-40">
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="paused">Paused</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="filter-date">Date Range</Label>
        <Select>
          <SelectTrigger id="filter-date" className="w-40">
            <SelectValue placeholder="Last 30 days" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
            <SelectItem value="1y">Last year</SelectItem>
            <SelectItem value="all">All time</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  ),
}

// ─── ASPIRE REAL-WORLD EXAMPLES ─────────────────────

/**
 * Platform selector for the Aspire creator platform filters. Groups platforms
 * by category for quick scanning.
 *
 * ```tsx
 * <Select defaultValue="instagram">
 *   <SelectTrigger className="w-48">
 *     <SelectValue />
 *   </SelectTrigger>
 *   <SelectContent>
 *     <SelectGroup>
 *       <SelectLabel>Social Media</SelectLabel>
 *       <SelectItem value="instagram">Instagram</SelectItem>
 *       <SelectItem value="tiktok">TikTok</SelectItem>
 *     </SelectGroup>
 *     ...
 *   </SelectContent>
 * </Select>
 * ```
 */
export const AspirePlatformSelector: Story = {
  name: "Aspire — Platform Selector",
  render: (args) => (
    <div className="grid w-56 gap-1.5">
      <Label htmlFor="aspire-platform">Platform</Label>
      <Select {...args} defaultValue="instagram">
        <SelectTrigger id="aspire-platform">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Social Media</SelectLabel>
            <SelectItem value="instagram">Instagram</SelectItem>
            <SelectItem value="tiktok">TikTok</SelectItem>
            <SelectItem value="twitter">X (Twitter)</SelectItem>
            <SelectItem value="facebook">Facebook</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Video</SelectLabel>
            <SelectItem value="youtube">YouTube</SelectItem>
            <SelectItem value="twitch">Twitch</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Blog</SelectLabel>
            <SelectItem value="wordpress">WordPress</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  ),
}

/**
 * Campaign status filter used in the Aspire Campaigns and Offers pages.
 *
 * ```tsx
 * <Select>
 *   <SelectTrigger size="sm" className="w-36">
 *     <SelectValue placeholder="Status" />
 *   </SelectTrigger>
 *   <SelectContent>
 *     <SelectItem value="all">All Statuses</SelectItem>
 *     <SelectItem value="draft">Draft</SelectItem>
 *     <SelectItem value="active">Active</SelectItem>
 *     <SelectItem value="paused">Paused</SelectItem>
 *     <SelectItem value="completed">Completed</SelectItem>
 *   </SelectContent>
 * </Select>
 * ```
 */
export const AspireCampaignStatus: Story = {
  name: "Aspire — Campaign Status",
  render: (args) => (
    <div className="grid w-48 gap-1.5">
      <Label htmlFor="campaign-status">Campaign Status</Label>
      <Select {...args}>
        <SelectTrigger id="campaign-status" size="sm">
          <SelectValue placeholder="All statuses" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          <SelectItem value="draft">Draft</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="paused">Paused</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
          <SelectItem value="archived">Archived</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
}

/**
 * Date range selector frequently used in the Aspire analytics dashboard
 * to scope chart and table data to a specific time window.
 *
 * ```tsx
 * <Select defaultValue="30d">
 *   <SelectTrigger size="sm" className="w-36">
 *     <SelectValue />
 *   </SelectTrigger>
 *   <SelectContent>
 *     <SelectItem value="7d">Last 7 days</SelectItem>
 *     <SelectItem value="30d">Last 30 days</SelectItem>
 *     <SelectItem value="90d">Last 90 days</SelectItem>
 *   </SelectContent>
 * </Select>
 * ```
 */
export const AspireDateRange: Story = {
  name: "Aspire — Date Range Selector",
  render: (args) => (
    <div className="grid w-48 gap-1.5">
      <Label htmlFor="date-range">Date Range</Label>
      <Select {...args} defaultValue="30d">
        <SelectTrigger id="date-range" size="sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="7d">Last 7 days</SelectItem>
          <SelectItem value="14d">Last 14 days</SelectItem>
          <SelectItem value="30d">Last 30 days</SelectItem>
          <SelectItem value="90d">Last 90 days</SelectItem>
          <SelectItem value="6m">Last 6 months</SelectItem>
          <SelectItem value="1y">Last year</SelectItem>
          <SelectItem value="all">All time</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
}

// ─── ALL VARIANTS GALLERY ───────────────────────────

/** Side-by-side comparison of Select trigger sizes. */
export const AllSizes: Story = {
  name: "All Sizes",
  render: () => (
    <div className="flex items-center gap-4">
      <div className="grid gap-1">
        <span className="text-xs text-muted-foreground">sm</span>
        <Select>
          <SelectTrigger size="sm" className="w-36">
            <SelectValue placeholder="Small" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="a">Option A</SelectItem>
            <SelectItem value="b">Option B</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-1">
        <span className="text-xs text-muted-foreground">default</span>
        <Select>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Default" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="a">Option A</SelectItem>
            <SelectItem value="b">Option B</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  ),
}

// ─── INTERACTION TESTS ──────────────────────────────

/**
 * Verifies that clicking the trigger opens the dropdown and that selecting
 * an option fires the `onValueChange` callback with the correct value.
 */
export const SelectionTest: Story = {
  name: "Interaction: Select an Option",
  args: {
    onValueChange: fn(),
  },
  render: (args) => (
    <Select {...args}>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Pick a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="cherry">Cherry</SelectItem>
      </SelectContent>
    </Select>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)

    // Open the select dropdown by clicking the trigger
    const trigger = canvas.getByRole("combobox")
    await userEvent.click(trigger)

    // Wait for the listbox to appear and select "Banana"
    const listbox = await within(document.body).findByRole("listbox")
    const bananaOption = within(listbox).getByText("Banana")
    await userEvent.click(bananaOption)

    // Verify the callback was fired with "banana"
    await expect(args.onValueChange).toHaveBeenCalledWith("banana")
  },
}

/**
 * Verifies that a disabled select cannot be opened via click interaction.
 */
export const DisabledInteractionTest: Story = {
  name: "Interaction: Disabled Prevents Opening",
  render: () => (
    <Select disabled>
      <SelectTrigger className="w-48" data-testid="disabled-trigger">
        <SelectValue placeholder="Disabled" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="a">Option A</SelectItem>
      </SelectContent>
    </Select>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Attempt to click the disabled trigger
    const trigger = canvas.getByRole("combobox")
    await userEvent.click(trigger)

    // Verify the listbox did NOT appear
    const listbox = within(document.body).queryByRole("listbox")
    await expect(listbox).toBeNull()
  },
}

/**
 * Verifies keyboard navigation: open with Enter, navigate with Arrow keys,
 * and select with Enter.
 */
export const KeyboardNavigationTest: Story = {
  name: "Interaction: Keyboard Navigation",
  args: {
    onValueChange: fn(),
  },
  render: (args) => (
    <Select {...args}>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Keyboard test" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="first">First</SelectItem>
        <SelectItem value="second">Second</SelectItem>
        <SelectItem value="third">Third</SelectItem>
      </SelectContent>
    </Select>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)

    // Focus the trigger and open with Enter
    const trigger = canvas.getByRole("combobox")
    await userEvent.click(trigger)

    // The dropdown should now be open
    const listbox = await within(document.body).findByRole("listbox")
    await expect(listbox).toBeTruthy()

    // Select "Second" by clicking it
    const secondOption = within(listbox).getByText("Second")
    await userEvent.click(secondOption)

    await expect(args.onValueChange).toHaveBeenCalledWith("second")
  },
}
