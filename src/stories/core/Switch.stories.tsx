import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "storybook/test"
import { within, userEvent, expect } from "storybook/test"
import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Bell, Moon, Globe, Shield, Smartphone } from "lucide-react"
import type { ElementType } from "react"

/**
 * # Switch
 *
 * A toggle switch for binary on/off states. Built on Radix UI Switch, it
 * provides an accessible, animated control that communicates an immediate
 * state change to the user.
 *
 * ## When to Use
 * - To toggle a setting that takes **immediate effect** (e.g., enable notifications)
 * - For binary on/off preferences in settings panels
 * - When the change does not require a form submission to apply
 *
 * ## When NOT to Use
 * - For selections that require a "Save" action — use a **Checkbox** instead
 * - For choosing between more than two options — use **RadioGroup** or **Select**
 * - Inside dense data tables — prefer a compact Checkbox
 *
 * ## Accessibility
 * - Uses `role="switch"` with `aria-checked` managed by Radix
 * - Always pair with a visible `<Label>` or provide `aria-label`
 * - Supports keyboard activation (Space key)
 * - Focus ring is visible on keyboard navigation
 * - Disabled state sets `aria-disabled` and removes from interaction
 *
 * ## Import
 * ```tsx
 * import { Switch } from '@/components/ui/switch'
 * ```
 *
 * ## Quick Start
 * ```tsx
 * <div className="flex items-center gap-2">
 *   <Switch id="airplane" />
 *   <Label htmlFor="airplane">Airplane Mode</Label>
 * </div>
 * ```
 */
const meta: Meta<typeof Switch> = {
  title: "3. Primitives/Switch",
  component: Switch,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Toggle switch for binary on/off states. Prefer Switch over Checkbox when the change takes immediate effect.",
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/iOUu95ALlUm7fDs2eQPLQb/New-STA-with-Shadcn",
    },
  },
  argTypes: {
    checked: {
      control: "boolean",
      description: "Controlled checked state of the switch.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "State",
      },
    },
    defaultChecked: {
      control: "boolean",
      description: "Initial checked state for uncontrolled usage.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "State",
      },
    },
    onCheckedChange: {
      action: "checkedChange",
      description: "Callback fired when the switch is toggled. Receives the new boolean value.",
      table: {
        type: { summary: "(checked: boolean) => void" },
        category: "Events",
      },
    },
    disabled: {
      control: "boolean",
      description: "Disables the switch, preventing interaction and reducing opacity.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "State",
      },
    },
    size: {
      control: "select",
      options: ["default", "sm"],
      description: 'Size of the switch. Use `"sm"` for compact UIs like table rows.',
      table: {
        type: { summary: '"default" | "sm"' },
        defaultValue: { summary: '"default"' },
        category: "Appearance",
      },
    },
    id: {
      control: "text",
      description: "HTML id attribute. Required when pairing with a `<Label>` via `htmlFor`.",
      table: {
        type: { summary: "string" },
        category: "Accessibility",
      },
    },
    name: {
      control: "text",
      description: "Form field name. Used when the switch is inside a `<form>`.",
      table: {
        type: { summary: "string" },
        category: "Form",
      },
    },
  },
  args: {
    onCheckedChange: fn(),
  },
}

export default meta
type Story = StoryObj<typeof Switch>

// ─── CORE STATES ──────────────────────────────────

/**
 * Default unchecked switch. Always pair with a `<Label>`.
 *
 * ```tsx
 * <div className="flex items-center gap-2">
 *   <Switch id="sw" />
 *   <Label htmlFor="sw">Off by default</Label>
 * </div>
 * ```
 */
export const Default: Story = {
  args: { id: "sw-default" },
  render: (args) => (
    <div className="flex items-center gap-2">
      <Switch {...args} />
      <Label htmlFor="sw-default">Off by default</Label>
    </div>
  ),
}

/**
 * Checked (on) state. Use `checked` prop for controlled usage.
 *
 * ```tsx
 * <Switch checked={true} onCheckedChange={setEnabled} />
 * ```
 */
export const Checked: Story = {
  args: { id: "sw-on", defaultChecked: true },
  render: (args) => (
    <div className="flex items-center gap-2">
      <Switch {...args} />
      <Label htmlFor="sw-on">Enabled</Label>
    </div>
  ),
}

/** Disabled state prevents all interaction. Opacity is reduced automatically. */
export const Disabled: Story = {
  args: { id: "sw-disabled", disabled: true },
  render: (args) => (
    <div className="flex items-center gap-2">
      <Switch {...args} />
      <Label htmlFor="sw-disabled" className="text-muted-foreground">
        Unavailable
      </Label>
    </div>
  ),
}

/** Disabled while checked. Useful for locked preferences or plan-gated features. */
export const DisabledChecked: Story = {
  name: "Disabled + Checked",
  args: { id: "sw-dis-chk", disabled: true, defaultChecked: true },
  render: (args) => (
    <div className="flex items-center gap-2">
      <Switch {...args} />
      <Label htmlFor="sw-dis-chk" className="text-muted-foreground">
        Always on (locked)
      </Label>
    </div>
  ),
}

// ─── SIZES ────────────────────────────────────────

/**
 * Small size variant for compact UIs like table rows or dense forms.
 *
 * ```tsx
 * <Switch size="sm" />
 * ```
 */
export const SmallSize: Story = {
  name: "Small Size",
  args: { id: "sw-sm", size: "sm" },
  render: (args) => (
    <div className="flex items-center gap-2">
      <Switch {...args} />
      <Label htmlFor="sw-sm" className="text-sm">
        Compact switch
      </Label>
    </div>
  ),
}

/** Side-by-side comparison of both switch sizes. */
export const AllSizes: Story = {
  name: "All Sizes",
  render: () => (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-2">
        <Switch id="sz-default" size="default" />
        <Label htmlFor="sz-default">Default</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="sz-sm" size="sm" />
        <Label htmlFor="sz-sm" className="text-sm">
          Small
        </Label>
      </div>
    </div>
  ),
}

// ─── WITH LABEL PATTERNS ──────────────────────────

/**
 * Label with description text. Common pattern for settings pages.
 *
 * ```tsx
 * <div className="flex items-center justify-between">
 *   <div>
 *     <Label htmlFor="notif">Enable email notifications</Label>
 *     <p className="text-sm text-muted-foreground">
 *       Receive updates about your campaigns via email.
 *     </p>
 *   </div>
 *   <Switch id="notif" />
 * </div>
 * ```
 */
export const WithDescription: Story = {
  name: "With Description",
  render: () => (
    <div className="flex w-96 items-center justify-between rounded-lg border p-4">
      <div className="space-y-0.5">
        <Label htmlFor="notif-desc" className="text-sm font-medium">
          Enable email notifications
        </Label>
        <p className="text-sm text-muted-foreground">
          Receive updates about your campaigns via email.
        </p>
      </div>
      <Switch id="notif-desc" />
    </div>
  ),
}

/**
 * Interactive controlled switch showing live status text.
 *
 * ```tsx
 * const [on, setOn] = useState(false)
 * <Switch checked={on} onCheckedChange={setOn} />
 * <span>{on ? "On" : "Off"}</span>
 * ```
 */
export const Interactive: Story = {
  name: "Interactive Toggle",
  render: () => {
    const [on, setOn] = useState(false)
    return (
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-3">
          <Switch id="sw-interactive" checked={on} onCheckedChange={setOn} />
          <Label htmlFor="sw-interactive">Dark mode</Label>
        </div>
        <p className="text-xs text-muted-foreground">
          Status: <span className="font-medium">{on ? "On" : "Off"}</span>
        </p>
      </div>
    )
  },
}

// ─── REAL-WORLD COMPOSITIONS ──────────────────────

/**
 * Aspire notification settings panel with icon + label + description rows.
 *
 * ```tsx
 * <Switch
 *   id="email-notif"
 *   checked={states["email-notif"]}
 *   onCheckedChange={(v) => setStates(s => ({ ...s, "email-notif": v }))}
 * />
 * ```
 */
export const SettingsPanel: Story = {
  name: "Real World -- Notification Settings",
  render: () => {
    const settings: Array<{
      id: string
      icon: ElementType
      label: string
      description: string
      default: boolean
    }> = [
      {
        id: "email-notif",
        icon: Bell,
        label: "Email notifications",
        description: "Receive updates via email",
        default: true,
      },
      {
        id: "push-notif",
        icon: Smartphone,
        label: "Push notifications",
        description: "Alerts on your mobile device",
        default: true,
      },
      {
        id: "dark-mode",
        icon: Moon,
        label: "Dark mode",
        description: "Use dark color scheme",
        default: false,
      },
      {
        id: "public-profile",
        icon: Globe,
        label: "Public profile",
        description: "Make your profile visible to everyone",
        default: false,
      },
      {
        id: "two-factor",
        icon: Shield,
        label: "Two-factor auth",
        description: "Extra security for your account",
        default: true,
      },
    ]

    const [states, setStates] = useState(
      Object.fromEntries(settings.map((s) => [s.id, s.default]))
    )

    return (
      <div className="w-96 rounded-lg border bg-card">
        <div className="p-4">
          <h3 className="font-semibold">Settings</h3>
          <p className="text-sm text-muted-foreground">
            Manage your preferences
          </p>
        </div>
        <Separator />
        <div className="divide-y">
          {settings.map(({ id, icon: Icon, label, description }) => (
            <div key={id} className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">{label}</p>
                  <p className="text-xs text-muted-foreground">{description}</p>
                </div>
              </div>
              <Switch
                id={id}
                checked={states[id]}
                onCheckedChange={(v) =>
                  setStates((s) => ({ ...s, [id]: v }))
                }
              />
            </div>
          ))}
        </div>
      </div>
    )
  },
}

/**
 * Aspire auto-approve content toggle with confirmation text.
 *
 * ```tsx
 * <Switch
 *   id="auto-approve"
 *   checked={autoApprove}
 *   onCheckedChange={setAutoApprove}
 * />
 * ```
 */
export const AutoApproveContent: Story = {
  name: "Real World -- Auto-Approve Content",
  render: () => {
    const [autoApprove, setAutoApprove] = useState(false)
    return (
      <div className="w-96 rounded-lg border bg-card p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <p className="text-sm font-medium">Auto-approve content</p>
            <p className="text-xs text-muted-foreground">
              Automatically approve creator submissions without manual review.
            </p>
          </div>
          <Switch
            id="auto-approve"
            checked={autoApprove}
            onCheckedChange={setAutoApprove}
          />
        </div>
        {autoApprove && (
          <div className="rounded-md bg-amber-50 border border-amber-200 p-3 dark:bg-amber-950 dark:border-amber-800">
            <p className="text-xs text-amber-800 dark:text-amber-200">
              Content will be published immediately without your review. You can
              still remove content after it goes live.
            </p>
          </div>
        )}
      </div>
    )
  },
}

// ─── INTERACTION TESTS ────────────────────────────

/**
 * Verifies that clicking the switch toggles it on and fires `onCheckedChange`.
 */
export const ClickToToggleTest: Story = {
  name: "Test: Click to Toggle",
  args: { id: "sw-test-click" },
  render: (args) => (
    <div className="flex items-center gap-2">
      <Switch {...args} />
      <Label htmlFor="sw-test-click">Toggle me</Label>
    </div>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const switchEl = canvas.getByRole("switch")

    // Initially unchecked
    await expect(switchEl).toHaveAttribute("data-state", "unchecked")

    // Click to turn on
    await userEvent.click(switchEl)
    await expect(args.onCheckedChange).toHaveBeenCalledTimes(1)
    await expect(args.onCheckedChange).toHaveBeenCalledWith(true)
  },
}

/**
 * Verifies that a disabled switch does NOT fire `onCheckedChange` on click.
 */
export const DisabledClickTest: Story = {
  name: "Test: Disabled Prevents Toggle",
  args: { id: "sw-test-disabled", disabled: true },
  render: (args) => (
    <div className="flex items-center gap-2">
      <Switch {...args} />
      <Label htmlFor="sw-test-disabled">Cannot toggle</Label>
    </div>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const switchEl = canvas.getByRole("switch")

    // Should be disabled
    await expect(switchEl).toBeDisabled()

    // Click should not fire handler
    await userEvent.click(switchEl)
    await expect(args.onCheckedChange).not.toHaveBeenCalled()
  },
}

/**
 * Verifies keyboard interaction: pressing Space toggles the switch.
 */
export const KeyboardToggleTest: Story = {
  name: "Test: Keyboard Toggle",
  args: { id: "sw-test-keyboard" },
  render: (args) => (
    <div className="flex items-center gap-2">
      <Switch {...args} />
      <Label htmlFor="sw-test-keyboard">Keyboard test</Label>
    </div>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const switchEl = canvas.getByRole("switch")

    // Focus the switch
    await userEvent.tab()
    await expect(switchEl).toHaveFocus()

    // Press Space to toggle
    await userEvent.keyboard(" ")
    await expect(args.onCheckedChange).toHaveBeenCalledTimes(1)
    await expect(args.onCheckedChange).toHaveBeenCalledWith(true)
  },
}
