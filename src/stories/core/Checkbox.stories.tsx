import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"
import { within, userEvent, expect } from "storybook/test"
import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

/**
 * # Checkbox
 *
 * An accessible checkbox input built on Radix UI that supports checked,
 * unchecked, and indeterminate states. Renders a styled square with a
 * check icon indicator when active.
 *
 * ## When to Use
 * - To let users toggle a boolean option on or off (e.g. "Remember me")
 * - For multi-select lists where users can pick zero or more items
 * - For "Select all" patterns with an indeterminate state
 * - In forms for terms acceptance or preference toggles
 *
 * ## When NOT to Use
 * - For mutually exclusive options — use RadioGroup instead
 * - For instant on/off toggles with immediate effect — use Switch
 * - For single-action confirmations — use a Button or Dialog
 *
 * ## Accessibility
 * - Renders with `role="checkbox"` and manages `aria-checked` automatically
 * - Supports three states: `true`, `false`, and `"indeterminate"`
 * - Full keyboard support: Space to toggle, Tab to navigate
 * - Always pair with a `<Label>` linked via matching `id`/`htmlFor`
 * - Disabled state sets `aria-disabled` and removes from interaction
 * - Focus ring visible on keyboard navigation
 *
 * ## Import
 * ```tsx
 * import { Checkbox } from '@/components/ui/checkbox'
 * ```
 *
 * ## Quick Start
 * ```tsx
 * <div className="flex items-center gap-2">
 *   <Checkbox id="agree" />
 *   <Label htmlFor="agree">I agree to the terms</Label>
 * </div>
 * ```
 */
const meta: Meta<typeof Checkbox> = {
  title: "3. Primitives/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Accessible checkbox with checked, unchecked, and indeterminate states. Built on Radix UI Checkbox.",
      },
    },
  },
  argTypes: {
    checked: {
      control: "select",
      options: [true, false, "indeterminate"],
      description:
        'The controlled checked state. Accepts `true`, `false`, or `"indeterminate"`.',
      table: {
        type: { summary: 'boolean | "indeterminate"' },
        defaultValue: { summary: "false" },
        category: "State",
      },
    },
    onCheckedChange: {
      description:
        "Callback fired when the checked state changes. Receives the new checked value.",
      table: {
        type: { summary: '(checked: boolean | "indeterminate") => void' },
        category: "Events",
      },
    },
    disabled: {
      control: "boolean",
      description:
        "When true, prevents interaction and reduces opacity. Sets `aria-disabled`.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "State",
      },
    },
    required: {
      control: "boolean",
      description: "Marks the checkbox as required for form validation.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "Form",
      },
    },
    name: {
      control: "text",
      description: "Name attribute for form submission.",
      table: {
        type: { summary: "string" },
        category: "Form",
      },
    },
    value: {
      control: "text",
      description:
        'Value attribute submitted with the form when checked. Defaults to `"on"`.',
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '"on"' },
        category: "Form",
      },
    },
    id: {
      control: "text",
      description: "HTML id attribute. Pair with `<Label htmlFor>` for accessibility.",
      table: {
        type: { summary: "string" },
        category: "Accessibility",
      },
    },
    className: {
      control: "text",
      description: "Additional CSS class names for custom styling.",
      table: {
        type: { summary: "string" },
        category: "Appearance",
      },
    },
  },
  args: {
    onCheckedChange: fn(),
  },
}

export default meta
type Story = StoryObj<typeof meta>

// ─── CORE STATES ────────────────────────────────────

/**
 * Default unchecked state. The most basic usage of the Checkbox.
 *
 * ```tsx
 * <div className="flex items-center gap-2">
 *   <Checkbox id="cb-default" />
 *   <Label htmlFor="cb-default">Unchecked</Label>
 * </div>
 * ```
 */
export const Unchecked: Story = {
  args: { id: "cb-unchecked" },
  render: (args) => (
    <div className="flex items-center gap-2">
      <Checkbox {...args} />
      <Label htmlFor="cb-unchecked">Unchecked</Label>
    </div>
  ),
}

/**
 * Checked state with the check icon indicator visible.
 *
 * ```tsx
 * <div className="flex items-center gap-2">
 *   <Checkbox id="cb-checked" checked />
 *   <Label htmlFor="cb-checked">Checked</Label>
 * </div>
 * ```
 */
export const Checked: Story = {
  args: { id: "cb-checked", checked: true },
  render: (args) => (
    <div className="flex items-center gap-2">
      <Checkbox {...args} />
      <Label htmlFor="cb-checked">Checked</Label>
    </div>
  ),
}

/**
 * Indeterminate state, commonly used for "Select all" when only some
 * child items are checked. Displays a dash indicator.
 *
 * ```tsx
 * <Checkbox checked="indeterminate" onCheckedChange={setChecked} />
 * ```
 */
export const Indeterminate: Story = {
  name: "Indeterminate State",
  render: () => {
    const [checked, setChecked] = useState<boolean | "indeterminate">("indeterminate")
    return (
      <div className="flex items-center gap-2">
        <Checkbox
          id="cb-indeterminate"
          checked={checked}
          onCheckedChange={setChecked}
        />
        <Label htmlFor="cb-indeterminate">
          Select all ({checked === "indeterminate" ? "some selected" : checked ? "all selected" : "none selected"})
        </Label>
      </div>
    )
  },
}

/**
 * Disabled unchecked state. Cannot be toggled.
 *
 * ```tsx
 * <Checkbox id="cb-disabled" disabled />
 * ```
 */
export const Disabled: Story = {
  args: { id: "cb-disabled", disabled: true },
  render: (args) => (
    <div className="flex items-center gap-2">
      <Checkbox {...args} />
      <Label htmlFor="cb-disabled" className="text-muted-foreground">
        Disabled option
      </Label>
    </div>
  ),
}

/**
 * Disabled and checked. Used for locked options that the user cannot change.
 *
 * ```tsx
 * <Checkbox id="cb-locked" disabled checked />
 * ```
 */
export const DisabledChecked: Story = {
  name: "Disabled + Checked",
  args: { id: "cb-dis-chk", disabled: true, checked: true },
  render: (args) => (
    <div className="flex items-center gap-2">
      <Checkbox {...args} />
      <Label htmlFor="cb-dis-chk" className="text-muted-foreground">
        Enabled by default (locked)
      </Label>
    </div>
  ),
}

// ─── WITH LABEL PATTERNS ────────────────────────────

/**
 * Standard pairing with a Label. Clicking the label toggles the checkbox.
 *
 * ```tsx
 * <div className="flex items-center gap-2">
 *   <Checkbox id="newsletter" />
 *   <Label htmlFor="newsletter">Subscribe to newsletter</Label>
 * </div>
 * ```
 */
export const WithLabel: Story = {
  name: "With Label",
  render: (args) => (
    <div className="flex items-center gap-2">
      <Checkbox {...args} id="newsletter" />
      <Label htmlFor="newsletter">Subscribe to newsletter</Label>
    </div>
  ),
}

/**
 * Checkbox with a label and supplemental description text below it.
 *
 * ```tsx
 * <div className="flex items-start gap-3">
 *   <Checkbox id="marketing" className="mt-0.5" />
 *   <div>
 *     <Label htmlFor="marketing">Marketing emails</Label>
 *     <p className="text-xs text-muted-foreground">
 *       Receive updates about campaigns and promotions.
 *     </p>
 *   </div>
 * </div>
 * ```
 */
export const WithDescription: Story = {
  name: "With Description",
  render: (args) => (
    <div className="flex items-start gap-3">
      <Checkbox {...args} id="marketing" className="mt-0.5" />
      <div className="space-y-0.5">
        <Label htmlFor="marketing" className="font-medium">
          Marketing emails
        </Label>
        <p className="text-xs text-muted-foreground">
          Receive updates about new campaigns, promotions, and creator spotlights.
        </p>
      </div>
    </div>
  ),
}

// ─── CHECKBOX GROUP ─────────────────────────────────

/**
 * A group of checkboxes for multi-select scenarios. Each checkbox operates
 * independently so the user can select any combination.
 *
 * ```tsx
 * <fieldset className="space-y-3">
 *   <legend className="text-sm font-medium">Platforms</legend>
 *   {platforms.map(p => (
 *     <div key={p.id} className="flex items-center gap-2">
 *       <Checkbox id={p.id} />
 *       <Label htmlFor={p.id}>{p.label}</Label>
 *     </div>
 *   ))}
 * </fieldset>
 * ```
 */
export const CheckboxGroup: Story = {
  name: "Checkbox Group",
  render: () => {
    const platforms = [
      { id: "plat-ig", label: "Instagram" },
      { id: "plat-tt", label: "TikTok" },
      { id: "plat-yt", label: "YouTube" },
      { id: "plat-tw", label: "X (Twitter)" },
      { id: "plat-fb", label: "Facebook" },
    ]
    const [selected, setSelected] = useState<string[]>(["plat-ig", "plat-yt"])

    const toggle = (id: string) =>
      setSelected((s) =>
        s.includes(id) ? s.filter((x) => x !== id) : [...s, id]
      )

    return (
      <fieldset className="space-y-3">
        <legend className="text-sm font-medium">Platforms</legend>
        {platforms.map(({ id, label }) => (
          <div key={id} className="flex items-center gap-2">
            <Checkbox
              id={id}
              checked={selected.includes(id)}
              onCheckedChange={() => toggle(id)}
            />
            <Label htmlFor={id}>{label}</Label>
          </div>
        ))}
        <p className="text-xs text-muted-foreground">
          {selected.length} of {platforms.length} selected
        </p>
      </fieldset>
    )
  },
}

/**
 * "Select all" pattern with indeterminate state management. The parent
 * checkbox reflects the aggregate state of its children.
 *
 * ```tsx
 * const allChecked = items.every(i => selected.includes(i.id))
 * const someChecked = items.some(i => selected.includes(i.id))
 * <Checkbox
 *   checked={allChecked ? true : someChecked ? "indeterminate" : false}
 *   onCheckedChange={(checked) => {
 *     setSelected(checked ? items.map(i => i.id) : [])
 *   }}
 * />
 * ```
 */
export const SelectAllPattern: Story = {
  name: "Select All with Indeterminate",
  render: () => {
    const items = [
      { id: "perm-read", label: "Read" },
      { id: "perm-write", label: "Write" },
      { id: "perm-delete", label: "Delete" },
      { id: "perm-admin", label: "Admin" },
    ]
    const [selected, setSelected] = useState<string[]>(["perm-read", "perm-write"])

    const allChecked = items.every((i) => selected.includes(i.id))
    const someChecked = items.some((i) => selected.includes(i.id))

    const toggleAll = (checked: boolean | "indeterminate") => {
      setSelected(checked ? items.map((i) => i.id) : [])
    }

    const toggle = (id: string) =>
      setSelected((s) =>
        s.includes(id) ? s.filter((x) => x !== id) : [...s, id]
      )

    return (
      <div className="w-64 space-y-2">
        <div className="flex items-center gap-2">
          <Checkbox
            id="select-all"
            checked={allChecked ? true : someChecked ? "indeterminate" : false}
            onCheckedChange={toggleAll}
          />
          <Label htmlFor="select-all" className="font-medium">
            Select all permissions
          </Label>
        </div>
        <Separator />
        <div className="space-y-2 pl-6">
          {items.map(({ id, label }) => (
            <div key={id} className="flex items-center gap-2">
              <Checkbox
                id={id}
                checked={selected.includes(id)}
                onCheckedChange={() => toggle(id)}
              />
              <Label htmlFor={id}>{label}</Label>
            </div>
          ))}
        </div>
      </div>
    )
  },
}

// ─── FORM CONTEXT ───────────────────────────────────

/**
 * Checkbox used within a form for terms acceptance. The submit button is
 * disabled until the checkbox is checked.
 *
 * ```tsx
 * <form>
 *   <div className="flex items-start gap-3">
 *     <Checkbox id="terms" required />
 *     <Label htmlFor="terms">I agree to the Terms of Service</Label>
 *   </div>
 *   <Button type="submit" disabled={!agreed}>Submit</Button>
 * </form>
 * ```
 */
export const InFormContext: Story = {
  name: "In Form Context (Terms Acceptance)",
  render: () => {
    const [agreed, setAgreed] = useState(false)
    return (
      <div className="w-80 space-y-4 rounded-lg border bg-card p-6">
        <div>
          <h3 className="font-semibold">Create account</h3>
          <p className="text-sm text-muted-foreground">
            Fill out the form and accept our terms
          </p>
        </div>
        <Separator />
        <div className="flex items-start gap-3">
          <Checkbox
            id="terms"
            checked={agreed}
            onCheckedChange={(v) => setAgreed(v === true)}
            className="mt-0.5"
          />
          <Label htmlFor="terms" className="font-normal leading-snug">
            I agree to the{" "}
            <span className="font-medium text-primary underline-offset-4 hover:underline cursor-pointer">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="font-medium text-primary underline-offset-4 hover:underline cursor-pointer">
              Privacy Policy
            </span>
          </Label>
        </div>
        <Button disabled={!agreed} className="w-full">
          Create Account
        </Button>
      </div>
    )
  },
}

// ─── ASPIRE REAL-WORLD EXAMPLES ─────────────────────

/**
 * Permission settings card used in the Aspire team management UI.
 * Each permission has a label and description with an independent toggle.
 *
 * ```tsx
 * {permissions.map(({ id, label, description }) => (
 *   <div key={id} className="flex items-center justify-between py-1">
 *     <div>
 *       <p className="text-sm font-medium">{label}</p>
 *       <p className="text-xs text-muted-foreground">{description}</p>
 *     </div>
 *     <Checkbox id={id} checked={...} onCheckedChange={...} />
 *   </div>
 * ))}
 * ```
 */
export const AspirePermissions: Story = {
  name: "Aspire — Permission Settings",
  render: () => {
    const perms = [
      { id: "perm-view", label: "View Creators", description: "Browse and search creator profiles" },
      { id: "perm-contact", label: "Contact Creators", description: "Send messages and offers to creators" },
      { id: "perm-campaign", label: "Manage Campaigns", description: "Create, edit, and archive campaigns" },
      { id: "perm-analytics", label: "View Analytics", description: "Access performance reports and dashboards" },
      { id: "perm-billing", label: "Manage Billing", description: "Update payment methods and view invoices" },
    ]
    const [selected, setSelected] = useState(["perm-view", "perm-contact", "perm-analytics"])

    const toggle = (id: string) =>
      setSelected((s) =>
        s.includes(id) ? s.filter((x) => x !== id) : [...s, id]
      )

    return (
      <div className="w-80 space-y-2 rounded-lg border bg-card p-4">
        <p className="text-sm font-medium">Team Permissions</p>
        <Separator />
        {perms.map(({ id, label, description }) => (
          <div key={id} className="flex items-center justify-between py-1">
            <div>
              <p className="text-sm font-medium">{label}</p>
              <p className="text-xs text-muted-foreground">{description}</p>
            </div>
            <Checkbox
              id={id}
              checked={selected.includes(id)}
              onCheckedChange={() => toggle(id)}
            />
          </div>
        ))}
      </div>
    )
  },
}

// ─── ALL STATES GALLERY ─────────────────────────────

/** Side-by-side comparison of all checkbox states. */
export const AllStates: Story = {
  name: "All States",
  render: () => (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-2">
        <Checkbox id="state-unchecked" />
        <Label htmlFor="state-unchecked">Unchecked</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="state-checked" checked onCheckedChange={() => {}} />
        <Label htmlFor="state-checked">Checked</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="state-indeterminate" checked="indeterminate" onCheckedChange={() => {}} />
        <Label htmlFor="state-indeterminate">Indeterminate</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="state-disabled" disabled />
        <Label htmlFor="state-disabled" className="text-muted-foreground">
          Disabled
        </Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="state-dis-checked" disabled checked onCheckedChange={() => {}} />
        <Label htmlFor="state-dis-checked" className="text-muted-foreground">
          Disabled + Checked
        </Label>
      </div>
    </div>
  ),
}

// ─── INTERACTION TESTS ──────────────────────────────

/**
 * Verifies clicking an unchecked checkbox toggles it to checked and fires
 * the `onCheckedChange` callback with `true`.
 */
export const ToggleCheckedTest: Story = {
  name: "Interaction: Toggle Checked",
  args: {
    id: "test-toggle",
    onCheckedChange: fn(),
  },
  render: (args) => (
    <div className="flex items-center gap-2">
      <Checkbox {...args} />
      <Label htmlFor="test-toggle">Toggle me</Label>
    </div>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)

    // Find the checkbox and verify it starts unchecked
    const checkbox = canvas.getByRole("checkbox")
    await expect(checkbox).not.toBeChecked()

    // Click to check it
    await userEvent.click(checkbox)
    await expect(args.onCheckedChange).toHaveBeenCalledWith(true)
  },
}

/**
 * Verifies that a disabled checkbox cannot be toggled via click and does
 * not fire the `onCheckedChange` callback.
 */
export const DisabledClickTest: Story = {
  name: "Interaction: Disabled Prevents Toggle",
  args: {
    id: "test-disabled",
    disabled: true,
    onCheckedChange: fn(),
  },
  render: (args) => (
    <div className="flex items-center gap-2">
      <Checkbox {...args} />
      <Label htmlFor="test-disabled" className="text-muted-foreground">
        Cannot toggle
      </Label>
    </div>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)

    // Find the checkbox and verify it is disabled
    const checkbox = canvas.getByRole("checkbox")
    await expect(checkbox).toBeDisabled()

    // Click should not fire the handler
    await userEvent.click(checkbox)
    await expect(args.onCheckedChange).not.toHaveBeenCalled()
  },
}

/**
 * Verifies that clicking the paired Label toggles the checkbox, confirming
 * the `id`/`htmlFor` linkage works correctly.
 */
export const LabelClickTest: Story = {
  name: "Interaction: Label Toggles Checkbox",
  args: {
    id: "test-label-click",
    onCheckedChange: fn(),
  },
  render: (args) => (
    <div className="flex items-center gap-2">
      <Checkbox {...args} />
      <Label htmlFor="test-label-click">Click this label</Label>
    </div>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)

    // Click the label text instead of the checkbox itself
    const label = canvas.getByText("Click this label")
    await userEvent.click(label)

    // The checkbox should have toggled
    await expect(args.onCheckedChange).toHaveBeenCalledWith(true)
  },
}
