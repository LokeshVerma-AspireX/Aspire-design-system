import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "storybook/test"
import { within, userEvent, expect } from "storybook/test"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"

/**
 * # Label
 *
 * An accessible form label built on the Radix UI Label primitive. Clicking the
 * label focuses the associated control via the `htmlFor` attribute, and it
 * automatically reflects the disabled state of its peer input.
 *
 * ## When to Use
 * - To label any form control (Input, Textarea, Select, Checkbox, Switch)
 * - To provide a clickable target that focuses the associated input
 * - To display required field indicators or optional badges
 *
 * ## When NOT to Use
 * - For general text descriptions — use `<p>` or helper text
 * - For section headings — use heading elements (`<h2>`, `<h3>`)
 * - For non-form-related labels — use `<span>` with appropriate semantics
 *
 * ## Accessibility
 * - Uses Radix UI Label primitive for robust screen-reader support
 * - `htmlFor` links the label to a form control via its `id`
 * - Clicking the label focuses the associated control
 * - Automatically reflects `peer-disabled` styles when the linked input is disabled
 * - Supports `group-data-[disabled=true]` for disabled groups
 * - `select-none` prevents accidental text selection during click
 *
 * ## Import
 * ```tsx
 * import { Label } from '@/components/ui/label'
 * ```
 *
 * ## Quick Start
 * ```tsx
 * <Label htmlFor="email">Email address</Label>
 * <Input id="email" type="email" />
 * ```
 */
const meta: Meta<typeof Label> = {
  title: "3. Primitives/Label",
  component: Label,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Accessible form label built on Radix UI. Clicking the label focuses the linked control.",
      },
    },
  },
  argTypes: {
    htmlFor: {
      control: "text",
      description:
        "The `id` of the form element this label is associated with. Clicking the label will focus that element.",
      table: {
        type: { summary: "string" },
        category: "Core",
      },
    },
    children: {
      control: "text",
      description: "Label text or child elements (e.g. text + required asterisk).",
      table: {
        type: { summary: "React.ReactNode" },
        category: "Content",
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes merged via `cn()` utility.",
      table: {
        type: { summary: "string" },
        category: "Appearance",
      },
    },
    onClick: {
      action: "clicked",
      description: "Fires when the label is clicked.",
      table: {
        type: { summary: "(e: MouseEvent) => void" },
        category: "Events",
      },
    },
  },
  args: {
    onClick: fn(),
    children: "Field label",
  },
}

export default meta
type Story = StoryObj<typeof Label>

// ─── CORE VARIANTS ────────────────────────────────

/**
 * Default label paired with an Input. The `htmlFor` / `id` link ensures
 * clicking the label focuses the input.
 *
 * ```tsx
 * <div className="grid gap-1.5">
 *   <Label htmlFor="email">Email</Label>
 *   <Input type="email" id="email" placeholder="creator@aspire.io" />
 * </div>
 * ```
 */
export const Default: Story = {
  render: () => (
    <div className="grid gap-1.5">
      <Label htmlFor="email-default">Email</Label>
      <Input
        type="email"
        id="email-default"
        placeholder="creator@aspire.io"
        className="w-64"
      />
    </div>
  ),
}

/**
 * Standalone label without an associated control, for use in the controls panel.
 *
 * ```tsx
 * <Label>Creator name</Label>
 * ```
 */
export const Standalone: Story = {
  args: {
    children: "Creator name",
  },
}

// ─── REQUIRED & OPTIONAL PATTERNS ─────────────────

/**
 * Required field pattern with a destructive asterisk.
 *
 * ```tsx
 * <Label htmlFor="email-req">
 *   Email <span className="text-destructive">*</span>
 * </Label>
 * ```
 */
export const RequiredField: Story = {
  name: "Required Field",
  render: () => (
    <div className="grid gap-1.5">
      <Label htmlFor="email-req">
        Email <span className="text-destructive">*</span>
      </Label>
      <Input
        type="email"
        id="email-req"
        placeholder="creator@aspire.io"
        className="w-64"
        required
      />
    </div>
  ),
}

/**
 * Optional field pattern with a muted badge.
 *
 * ```tsx
 * <div className="flex items-center gap-2">
 *   <Label htmlFor="bio">Bio</Label>
 *   <Badge variant="outline" className="text-xs font-normal py-0">Optional</Badge>
 * </div>
 * ```
 */
export const OptionalBadge: Story = {
  name: "With Optional Badge",
  render: () => (
    <div className="grid gap-1.5 w-64">
      <div className="flex items-center gap-2">
        <Label htmlFor="bio-opt">Bio</Label>
        <Badge variant="outline" className="py-0 text-xs font-normal">
          Optional
        </Badge>
      </div>
      <Input id="bio-opt" placeholder="Tell brands about yourself" />
    </div>
  ),
}

// ─── WITH HELPER TEXT ─────────────────────────────

/**
 * Label with hint/helper text below the input.
 *
 * ```tsx
 * <div className="grid gap-1.5 w-64">
 *   <Label htmlFor="handle">Creator handle</Label>
 *   <Input id="handle" placeholder="@janedoe" />
 *   <p className="text-xs text-muted-foreground">Letters, numbers, and underscores only.</p>
 * </div>
 * ```
 */
export const WithHintText: Story = {
  name: "With Hint Text",
  render: () => (
    <div className="grid gap-1.5 w-64">
      <Label htmlFor="handle">Creator handle</Label>
      <Input id="handle" placeholder="@janedoe" />
      <p className="text-xs text-muted-foreground">
        Letters, numbers, and underscores only.
      </p>
    </div>
  ),
}

/**
 * Label with error text in a destructive state.
 *
 * ```tsx
 * <div className="grid gap-1.5 w-64">
 *   <Label htmlFor="name-err" className="text-destructive">Campaign name</Label>
 *   <Input id="name-err" aria-invalid="true" defaultValue="" />
 *   <p className="text-sm text-destructive">Campaign name is required.</p>
 * </div>
 * ```
 */
export const WithErrorText: Story = {
  name: "With Error Text",
  render: () => (
    <div className="grid gap-1.5 w-64">
      <Label htmlFor="name-err" className="text-destructive">
        Campaign name
      </Label>
      <Input
        id="name-err"
        aria-invalid="true"
        placeholder="Required"
        defaultValue=""
      />
      <p className="text-sm text-destructive">Campaign name is required.</p>
    </div>
  ),
}

// ─── STATES ───────────────────────────────────────

/**
 * Disabled state. When the associated input is disabled, the label
 * automatically receives reduced opacity via `peer-disabled` styles.
 *
 * ```tsx
 * <div className="grid gap-1.5">
 *   <Label htmlFor="disabled-input" className="opacity-50">Disabled field</Label>
 *   <Input id="disabled-input" disabled placeholder="Not editable" />
 * </div>
 * ```
 */
export const DisabledState: Story = {
  name: "Disabled State",
  render: () => (
    <div className="grid gap-1.5">
      <Label htmlFor="disabled-input" className="opacity-50">
        Disabled field
      </Label>
      <Input
        id="disabled-input"
        disabled
        placeholder="Not editable"
        className="w-64"
      />
    </div>
  ),
}

// ─── WITH DIFFERENT CONTROLS ──────────────────────

/**
 * Label paired with a Textarea for multi-line content.
 *
 * ```tsx
 * <div className="grid w-80 gap-1.5">
 *   <Label htmlFor="brief">Campaign brief</Label>
 *   <Textarea id="brief" placeholder="Describe the campaign..." rows={4} />
 * </div>
 * ```
 */
export const WithTextarea: Story = {
  name: "With Textarea",
  render: () => (
    <div className="grid w-80 gap-1.5">
      <Label htmlFor="brief">Campaign brief</Label>
      <Textarea
        id="brief"
        placeholder="Describe the campaign deliverables and guidelines..."
        rows={4}
      />
    </div>
  ),
}

/**
 * Label paired with a Checkbox. The label is clickable and toggles
 * the checkbox state.
 *
 * ```tsx
 * <div className="flex items-start gap-2">
 *   <Checkbox id="terms" />
 *   <Label htmlFor="terms" className="cursor-pointer">
 *     I agree to the Terms of Service
 *   </Label>
 * </div>
 * ```
 */
export const WithCheckbox: Story = {
  name: "With Checkbox",
  render: () => (
    <div className="flex items-start gap-2">
      <Checkbox id="terms" className="mt-0.5" />
      <div className="grid gap-1">
        <Label htmlFor="terms" className="cursor-pointer">
          I agree to the Creator Terms of Service
        </Label>
        <p className="text-xs text-muted-foreground">
          By checking this box, you accept Aspire&apos;s privacy policy and
          content guidelines.
        </p>
      </div>
    </div>
  ),
}

/**
 * Label paired with a Switch toggle.
 *
 * ```tsx
 * <div className="flex items-center gap-3">
 *   <Switch id="notifications" />
 *   <Label htmlFor="notifications" className="cursor-pointer">
 *     Enable email notifications
 *   </Label>
 * </div>
 * ```
 */
export const WithSwitch: Story = {
  name: "With Switch",
  render: () => (
    <div className="flex items-center gap-3">
      <Switch id="notifications" />
      <Label htmlFor="notifications" className="cursor-pointer">
        Enable email notifications
      </Label>
    </div>
  ),
}

/**
 * Labels paired with RadioGroup items for single-selection options.
 *
 * ```tsx
 * <RadioGroup defaultValue="email">
 *   <div className="flex items-center gap-1.5">
 *     <RadioGroupItem value="email" id="contact-email" />
 *     <Label htmlFor="contact-email" className="font-normal cursor-pointer">Email</Label>
 *   </div>
 *   ...
 * </RadioGroup>
 * ```
 */
export const WithRadioGroup: Story = {
  name: "With Radio Group",
  render: () => (
    <div className="space-y-3">
      <Label>Preferred contact method</Label>
      <RadioGroup defaultValue="email" className="space-y-2">
        <div className="flex items-center gap-2">
          <RadioGroupItem value="email" id="contact-email" />
          <Label
            htmlFor="contact-email"
            className="cursor-pointer font-normal"
          >
            Email
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="phone" id="contact-phone" />
          <Label
            htmlFor="contact-phone"
            className="cursor-pointer font-normal"
          >
            Phone
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="dm" id="contact-dm" />
          <Label htmlFor="contact-dm" className="cursor-pointer font-normal">
            Direct message
          </Label>
        </div>
      </RadioGroup>
    </div>
  ),
}

// ─── REAL-WORLD COMPOSITIONS ──────────────────────

/**
 * Full form group composition with multiple labeled fields, required
 * markers, and radio selection — typical of the Aspire contact form.
 *
 * ```tsx
 * <div className="w-80 space-y-4 rounded-lg border bg-card p-5">
 *   <h3 className="font-semibold text-sm">Creator Information</h3>
 *   <div className="grid gap-1.5">
 *     <Label htmlFor="full-name">Full name <span className="text-destructive">*</span></Label>
 *     <Input id="full-name" placeholder="Emma Rodriguez" />
 *   </div>
 *   ...
 * </div>
 * ```
 */
export const FormGroup: Story = {
  name: "Real World — Creator Form",
  render: () => (
    <div className="w-80 space-y-4 rounded-lg border bg-card p-5">
      <h3 className="text-sm font-semibold">Creator Information</h3>
      <div className="grid gap-1.5">
        <Label htmlFor="full-name">
          Full name <span className="text-destructive">*</span>
        </Label>
        <Input id="full-name" placeholder="Emma Rodriguez" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="work-email">
          Work email <span className="text-destructive">*</span>
        </Label>
        <Input
          id="work-email"
          type="email"
          placeholder="emma@aspire.io"
        />
      </div>
      <div className="grid gap-1.5">
        <Label>Preferred contact</Label>
        <RadioGroup defaultValue="email" className="flex gap-4">
          <div className="flex items-center gap-1.5">
            <RadioGroupItem value="email" id="fg-email" />
            <Label
              htmlFor="fg-email"
              className="cursor-pointer font-normal"
            >
              Email
            </Label>
          </div>
          <div className="flex items-center gap-1.5">
            <RadioGroupItem value="phone" id="fg-phone" />
            <Label
              htmlFor="fg-phone"
              className="cursor-pointer font-normal"
            >
              Phone
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  ),
}

/**
 * Settings form with labels, switches, and checkboxes — common in the
 * Aspire notification preferences page.
 */
export const SettingsForm: Story = {
  name: "Real World — Notification Settings",
  render: () => (
    <div className="w-80 space-y-5 rounded-lg border bg-card p-5">
      <h3 className="text-sm font-semibold">Notification Preferences</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="new-offers" className="cursor-pointer">
              New offers
            </Label>
            <p className="text-xs text-muted-foreground">
              Get notified about new campaign offers
            </p>
          </div>
          <Switch id="new-offers" defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="messages" className="cursor-pointer">
              Messages
            </Label>
            <p className="text-xs text-muted-foreground">
              Receive alerts for new inbox messages
            </p>
          </div>
          <Switch id="messages" defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="analytics" className="cursor-pointer">
              Weekly analytics
            </Label>
            <p className="text-xs text-muted-foreground">
              Summary of your content performance
            </p>
          </div>
          <Switch id="analytics" />
        </div>
      </div>
    </div>
  ),
}

// ─── INTERACTION TESTS ────────────────────────────

/**
 * Verifies that clicking the label focuses the associated input.
 */
export const ClickToFocusTest: Story = {
  name: "Test: Click label focuses input",
  render: () => (
    <div className="grid gap-1.5">
      <Label htmlFor="focus-test-input">Creator name</Label>
      <Input
        id="focus-test-input"
        placeholder="Type creator name..."
        className="w-64"
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const label = canvas.getByText("Creator name")
    const input = canvas.getByPlaceholderText("Type creator name...")

    // Click the label — the input should receive focus
    await userEvent.click(label)
    await expect(input).toHaveFocus()
  },
}

/**
 * Verifies that clicking a label associated with a checkbox toggles it.
 */
export const CheckboxToggleTest: Story = {
  name: "Test: Click label toggles checkbox",
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="test-checkbox" />
      <Label htmlFor="test-checkbox" className="cursor-pointer">
        Accept terms
      </Label>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const label = canvas.getByText("Accept terms")
    const checkbox = canvas.getByRole("checkbox")

    // Initially unchecked
    await expect(checkbox).not.toBeChecked()

    // Click label — checkbox should become checked
    await userEvent.click(label)
    await expect(checkbox).toBeChecked()

    // Click label again — checkbox should uncheck
    await userEvent.click(label)
    await expect(checkbox).not.toBeChecked()
  },
}

/**
 * Verifies that typing into an input after clicking the label works correctly.
 */
export const LabelThenTypeTest: Story = {
  name: "Test: Label click then type into input",
  render: () => (
    <div className="grid gap-1.5">
      <Label htmlFor="type-test-input">Campaign name</Label>
      <Input id="type-test-input" placeholder="Enter campaign name..." className="w-64" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const label = canvas.getByText("Campaign name")
    const input = canvas.getByPlaceholderText("Enter campaign name...")

    // Click label to focus the input, then type
    await userEvent.click(label)
    await expect(input).toHaveFocus()
    await userEvent.type(input, "Summer Glow 2025")
    await expect(input).toHaveValue("Summer Glow 2025")
  },
}
