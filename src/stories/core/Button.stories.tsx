import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "storybook/test"
import { within, userEvent, expect } from "storybook/test"
import { Button } from "@/components/ui/button"
import {
  Loader2,
  Mail,
  Plus,
  ArrowRight,
  Download,
  Trash2,
  Send,
  Github,
  Save,
  ChevronRight,
} from "lucide-react"

/**
 * # Button
 *
 * Buttons trigger actions or navigate to new pages. They communicate what
 * happens when the user interacts with them.
 *
 * ## When to Use
 * - To trigger an action (submit form, open dialog, delete item)
 * - As a primary call-to-action on a page
 * - To navigate when the action has side effects
 *
 * ## When NOT to Use
 * - For navigation without side effects — use a Link instead
 * - For toggling a state — use Switch or Toggle instead
 * - Inside dense tables — use icon-only buttons or text links
 *
 * ## Accessibility
 * - Always has a visible label or `aria-label` for icon-only buttons
 * - Supports keyboard activation (Enter and Space)
 * - Disabled state removes from tab order
 * - Focus ring visible on keyboard navigation
 *
 * ## Import
 * ```tsx
 * import { Button } from '@/components/ui/button'
 * ```
 *
 * ## Quick Start
 * ```tsx
 * <Button variant="default" size="default" onClick={() => {}}>
 *   Click me
 * </Button>
 * ```
 */
const meta: Meta<typeof Button> = {
  title: "3. Primitives/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Primary action component. Use for form submissions, CTAs, and triggering actions.",
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
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ],
      description: "Visual style of the button",
      table: {
        type: { summary: '"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"' },
        defaultValue: { summary: "default" },
        category: "Appearance",
      },
    },
    size: {
      control: "select",
      options: ["default", "xs", "sm", "lg", "icon", "icon-xs", "icon-sm", "icon-lg"],
      description: "Size of the button. Use `icon` variants for square icon-only buttons.",
      table: {
        type: { summary: '"default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg"' },
        defaultValue: { summary: "default" },
        category: "Appearance",
      },
    },
    disabled: {
      control: "boolean",
      description: "Disables the button, preventing interaction and reducing opacity.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "State",
      },
    },
    asChild: {
      control: "boolean",
      description:
        "Merges props onto child element instead of rendering a `<button>`. Useful for wrapping Links.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "Advanced",
      },
    },
    onClick: {
      action: "clicked",
      description: "Click handler function",
      table: {
        type: { summary: "() => void" },
        category: "Events",
      },
    },
    children: {
      control: "text",
      description: "Button label text or child elements",
      table: {
        type: { summary: "React.ReactNode" },
        category: "Content",
      },
    },
  },
  args: {
    onClick: fn(),
    children: "Button",
  },
}

export default meta
type Story = StoryObj<typeof Button>

// ─── CORE VARIANTS ─────────────────────────────────

/** The primary button style. Use for the main action on a page. */
export const Default: Story = {
  args: { variant: "default", children: "Create Campaign" },
}

/** For dangerous or destructive actions like deleting items. */
export const Destructive: Story = {
  args: { variant: "destructive", children: "Delete Campaign" },
}

/** Secondary importance. Use alongside a primary button. */
export const Outline: Story = {
  args: { variant: "outline", children: "Cancel" },
}

/** Lower emphasis. Use for less important actions. */
export const Secondary: Story = {
  args: { variant: "secondary", children: "Save Draft" },
}

/** Minimal style. Use in toolbars, table rows, or inline actions. */
export const Ghost: Story = {
  args: { variant: "ghost", children: "View Details" },
}

/** Renders as a styled link. Use for navigation-style actions. */
export const Link: Story = {
  args: { variant: "link", children: "Learn more" },
}

// ─── SIZES ─────────────────────────────────────────

/** Extra-small button for tight UIs. */
export const ExtraSmall: Story = {
  args: { size: "xs", children: "Tag" },
}

/** Small button for compact UIs like table rows or filter bars. */
export const Small: Story = {
  args: { size: "sm", children: "Filter" },
}

/** Default size for most use cases. */
export const Medium: Story = {
  args: { size: "default", children: "Create Campaign" },
}

/** Large button for hero sections or prominent CTAs. */
export const Large: Story = {
  args: { size: "lg", children: "Get Started" },
}

/**
 * Square icon-only button. Always pair with `aria-label`.
 *
 * ```tsx
 * <Button size="icon" aria-label="Add new item">
 *   <Plus className="h-4 w-4" />
 * </Button>
 * ```
 */
export const IconOnly: Story = {
  args: { size: "icon", "aria-label": "Add new item" },
  render: (args) => (
    <Button {...args}>
      <Plus className="h-4 w-4" />
    </Button>
  ),
}

// ─── WITH ICONS ────────────────────────────────────

/**
 * Button with a leading icon. Common pattern for primary actions.
 *
 * ```tsx
 * <Button>
 *   <Mail className="mr-2 h-4 w-4" />
 *   Send Email
 * </Button>
 * ```
 */
export const WithLeadingIcon: Story = {
  name: "With Leading Icon",
  render: () => (
    <Button>
      <Mail className="mr-2 h-4 w-4" />
      Send Email
    </Button>
  ),
}

/**
 * Button with a trailing icon. Used for "next" or "continue" actions.
 *
 * ```tsx
 * <Button>
 *   Continue
 *   <ArrowRight className="ml-2 h-4 w-4" />
 * </Button>
 * ```
 */
export const WithTrailingIcon: Story = {
  name: "With Trailing Icon",
  render: () => (
    <Button>
      Continue
      <ArrowRight className="ml-2 h-4 w-4" />
    </Button>
  ),
}

// ─── STATES ────────────────────────────────────────

/** Disabled state — prevents all interaction. */
export const Disabled: Story = {
  args: { disabled: true, children: "Cannot Submit" },
}

/**
 * Loading state pattern. Replace text with spinner during async operations.
 *
 * ```tsx
 * <Button disabled>
 *   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
 *   Creating...
 * </Button>
 * ```
 */
export const Loading: Story = {
  render: () => (
    <Button disabled>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Creating...
    </Button>
  ),
}

// ─── ALL VARIANTS GALLERY ──────────────────────────

/** Side-by-side comparison of all button variants. */
export const AllVariants: Story = {
  name: "All Variants",
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
}

/** Side-by-side comparison of all button sizes. */
export const AllSizes: Story = {
  name: "All Sizes",
  render: () => (
    <div className="flex items-center gap-3">
      <Button size="xs">XS</Button>
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon" aria-label="Add">
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  ),
}

// ─── REAL-WORLD COMPOSITIONS ───────────────────────

/**
 * Common button group pattern used in page headers and dialog footers.
 *
 * ```tsx
 * <div className="flex gap-2">
 *   <Button variant="outline">Cancel</Button>
 *   <Button>Create Campaign</Button>
 * </div>
 * ```
 */
export const ButtonGroup: Story = {
  name: "Button Group (Common Pattern)",
  render: () => (
    <div className="flex gap-2">
      <Button variant="outline">Cancel</Button>
      <Button variant="outline">Save Draft</Button>
      <Button>Create Campaign</Button>
    </div>
  ),
}

/**
 * Destructive action with confirmation pattern.
 *
 * ```tsx
 * <div className="flex gap-2">
 *   <Button variant="ghost">Cancel</Button>
 *   <Button variant="destructive">
 *     <Trash2 className="mr-2 h-4 w-4" />
 *     Delete Campaign
 *   </Button>
 * </div>
 * ```
 */
export const DestructiveWithCancel: Story = {
  name: "Destructive + Cancel (Dialog Footer)",
  render: () => (
    <div className="flex gap-2">
      <Button variant="ghost">Cancel</Button>
      <Button variant="destructive">
        <Trash2 className="mr-2 h-4 w-4" />
        Delete Campaign
      </Button>
    </div>
  ),
}

/**
 * Login action stack — full-width buttons for auth pages.
 *
 * ```tsx
 * <div className="flex w-72 flex-col gap-3">
 *   <Button className="w-full">
 *     <Mail className="mr-2 h-4 w-4" />
 *     Continue with Email
 *   </Button>
 *   <Button variant="outline" className="w-full">
 *     <Github className="mr-2 h-4 w-4" />
 *     Continue with GitHub
 *   </Button>
 * </div>
 * ```
 */
export const LoginActions: Story = {
  name: "Real World — Login Actions",
  render: () => (
    <div className="flex w-72 flex-col gap-3">
      <Button className="w-full">
        <Mail className="mr-2 h-4 w-4" />
        Continue with Email
      </Button>
      <Button variant="outline" className="w-full">
        <Github className="mr-2 h-4 w-4" />
        Continue with GitHub
      </Button>
      <Button variant="ghost" className="w-full text-muted-foreground">
        Forgot password?
      </Button>
    </div>
  ),
}

/**
 * Compose email toolbar pattern from the Inbox page.
 *
 * ```tsx
 * <div className="flex items-center gap-2">
 *   <Button>
 *     <Send className="mr-2 h-4 w-4" />
 *     Send
 *   </Button>
 *   <Button variant="outline">Save Draft</Button>
 * </div>
 * ```
 */
export const InboxCompose: Story = {
  name: "Real World — Compose Email",
  render: () => (
    <div className="flex items-center gap-2">
      <Button>
        <Send className="mr-2 h-4 w-4" />
        Send
      </Button>
      <Button variant="outline">Save Draft</Button>
      <Button variant="ghost" size="icon" aria-label="Attach file">
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  ),
}

// ─── INTERACTION TESTS ─────────────────────────────

/** Verifies button click fires the onClick handler. */
export const ClickTest: Story = {
  args: { children: "Click Me" },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button", { name: "Click Me" })
    await userEvent.click(button)
    await expect(args.onClick).toHaveBeenCalledTimes(1)
  },
}

/** Verifies disabled button does NOT fire onClick. */
export const DisabledClickTest: Story = {
  args: { children: "Disabled", disabled: true },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button", { name: "Disabled" })
    await userEvent.click(button)
    await expect(args.onClick).not.toHaveBeenCalled()
  },
}
