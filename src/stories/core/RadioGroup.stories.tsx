import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "storybook/test"
import { within, userEvent, expect } from "storybook/test"
import { useState } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DollarSign, Percent, Gift, Video, Image, FileText } from "lucide-react"
import type { ElementType } from "react"

/**
 * # RadioGroup
 *
 * A set of mutually exclusive radio buttons where only one option can be
 * selected at a time. Built on Radix UI RadioGroup with full keyboard
 * navigation and ARIA semantics.
 *
 * ## When to Use
 * - To let users pick exactly one option from a small set (2-6 choices)
 * - When all options should be visible simultaneously for easy comparison
 * - For settings, preferences, or form fields with mutually exclusive values
 *
 * ## When NOT to Use
 * - For more than 6 options — use a Select dropdown instead
 * - When users can select multiple values — use Checkbox group
 * - For binary toggles — use Switch or a single Checkbox
 * - For navigation or tabs — use Tabs component
 *
 * ## Accessibility
 * - Container has `role="radiogroup"` with proper labelling
 * - Each item has `role="radio"` with `aria-checked` state management
 * - Arrow keys navigate between options within the group
 * - Space selects the focused option
 * - Tab moves focus into and out of the group as a single stop
 * - Disabled items are skipped during keyboard navigation
 * - Pair each `RadioGroupItem` with a `<Label>` via `id`/`htmlFor`
 *
 * ## Import
 * ```tsx
 * import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
 * ```
 *
 * ## Quick Start
 * ```tsx
 * <RadioGroup defaultValue="option-a">
 *   <div className="flex items-center space-x-2">
 *     <RadioGroupItem value="option-a" id="option-a" />
 *     <Label htmlFor="option-a">Option A</Label>
 *   </div>
 *   <div className="flex items-center space-x-2">
 *     <RadioGroupItem value="option-b" id="option-b" />
 *     <Label htmlFor="option-b">Option B</Label>
 *   </div>
 * </RadioGroup>
 * ```
 */
const meta: Meta<typeof RadioGroup> = {
  title: "3. Primitives/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A set of checkable buttons where only one can be selected at a time. Built on Radix UI RadioGroup.",
      },
    },
  },
  argTypes: {
    defaultValue: {
      control: "text",
      description: "The initial selected value when uncontrolled.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
        category: "Value",
      },
    },
    value: {
      control: "text",
      description: "The controlled selected value. Use with `onValueChange`.",
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
      description: "When true, disables the entire group, preventing interaction.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "State",
      },
    },
    required: {
      control: "boolean",
      description: "Marks the radio group as required for form validation.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "Form",
      },
    },
    name: {
      control: "text",
      description: "Name attribute for form submission. All items share this name.",
      table: {
        type: { summary: "string" },
        category: "Form",
      },
    },
    orientation: {
      control: "select",
      options: ["vertical", "horizontal"],
      description: "Layout orientation. Affects arrow key navigation direction.",
      table: {
        type: { summary: '"vertical" | "horizontal"' },
        defaultValue: { summary: '"vertical"' },
        category: "Appearance",
      },
    },
    className: {
      control: "text",
      description: "Additional CSS class names for the group container.",
      table: {
        type: { summary: "string" },
        category: "Appearance",
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
 * Basic radio group with labelled options and a default selection.
 *
 * ```tsx
 * <RadioGroup defaultValue="option-one">
 *   <div className="flex items-center space-x-2">
 *     <RadioGroupItem value="option-one" id="option-one" />
 *     <Label htmlFor="option-one">Option One</Label>
 *   </div>
 *   <div className="flex items-center space-x-2">
 *     <RadioGroupItem value="option-two" id="option-two" />
 *     <Label htmlFor="option-two">Option Two</Label>
 *   </div>
 * </RadioGroup>
 * ```
 */
export const Default: Story = {
  render: (args) => (
    <RadioGroup {...args} defaultValue="option-one" className="space-y-2">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-one" id="option-one" />
        <Label htmlFor="option-one">Option One</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-two" id="option-two" />
        <Label htmlFor="option-two">Option Two</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-three" id="option-three" />
        <Label htmlFor="option-three">Option Three</Label>
      </div>
    </RadioGroup>
  ),
}

/**
 * Each option includes a description to help users understand the choice.
 *
 * ```tsx
 * <RadioGroup defaultValue="comfortable" className="space-y-3">
 *   <div className="flex items-start space-x-3">
 *     <RadioGroupItem value="compact" id="compact" className="mt-0.5" />
 *     <div>
 *       <Label htmlFor="compact">Compact</Label>
 *       <p className="text-xs text-muted-foreground">Minimal spacing</p>
 *     </div>
 *   </div>
 * </RadioGroup>
 * ```
 */
export const WithDescriptions: Story = {
  name: "With Descriptions",
  render: (args) => (
    <RadioGroup {...args} defaultValue="comfortable" className="space-y-3">
      {[
        { value: "compact", label: "Compact", desc: "Minimal spacing, fits more content on screen." },
        { value: "comfortable", label: "Comfortable", desc: "Balanced spacing for everyday use." },
        { value: "spacious", label: "Spacious", desc: "Generous spacing for better readability." },
      ].map(({ value, label, desc }) => (
        <div key={value} className="flex items-start space-x-3">
          <RadioGroupItem value={value} id={value} className="mt-0.5" />
          <div className="space-y-0.5">
            <Label htmlFor={value} className="cursor-pointer font-medium">
              {label}
            </Label>
            <p className="text-xs text-muted-foreground">{desc}</p>
          </div>
        </div>
      ))}
    </RadioGroup>
  ),
}

/**
 * Horizontal layout using a flex row. Ideal when there are 2-4 short options.
 *
 * ```tsx
 * <RadioGroup defaultValue="left" className="flex gap-4" orientation="horizontal">
 *   <div className="flex items-center space-x-2">
 *     <RadioGroupItem value="left" id="left" />
 *     <Label htmlFor="left">Left</Label>
 *   </div>
 *   ...
 * </RadioGroup>
 * ```
 */
export const HorizontalLayout: Story = {
  name: "Horizontal Layout",
  render: (args) => (
    <RadioGroup {...args} defaultValue="center" className="flex gap-6" orientation="horizontal">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="left" id="align-left" />
        <Label htmlFor="align-left">Left</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="center" id="align-center" />
        <Label htmlFor="align-center">Center</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="right" id="align-right" />
        <Label htmlFor="align-right">Right</Label>
      </div>
    </RadioGroup>
  ),
}

/**
 * Pre-selected value via `defaultValue`. The matching radio button renders
 * as checked on mount.
 *
 * ```tsx
 * <RadioGroup defaultValue="medium">
 *   <RadioGroupItem value="small" id="small" />
 *   <RadioGroupItem value="medium" id="medium" />
 *   <RadioGroupItem value="large" id="large" />
 * </RadioGroup>
 * ```
 */
export const WithDefaultValue: Story = {
  name: "With Default Value",
  render: (args) => (
    <RadioGroup {...args} defaultValue="medium" className="space-y-2">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="small" id="size-small" />
        <Label htmlFor="size-small">Small</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="medium" id="size-medium" />
        <Label htmlFor="size-medium">Medium (default)</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="large" id="size-large" />
        <Label htmlFor="size-large">Large</Label>
      </div>
    </RadioGroup>
  ),
}

// ─── STATES ─────────────────────────────────────────

/**
 * Disabled state on individual items. The disabled option is skipped
 * during keyboard navigation and cannot be selected.
 *
 * ```tsx
 * <RadioGroup defaultValue="first">
 *   <RadioGroupItem value="first" id="first" />
 *   <RadioGroupItem value="second" id="second" disabled />
 *   <RadioGroupItem value="third" id="third" />
 * </RadioGroup>
 * ```
 */
export const DisabledItem: Story = {
  name: "Disabled Item",
  render: (args) => (
    <RadioGroup {...args} defaultValue="first" className="space-y-2">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="first" id="dis-first" />
        <Label htmlFor="dis-first">Available option</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="second" id="dis-second" disabled />
        <Label htmlFor="dis-second" className="opacity-50 cursor-not-allowed">
          Disabled option
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="third" id="dis-third" />
        <Label htmlFor="dis-third">Available option</Label>
      </div>
    </RadioGroup>
  ),
}

/**
 * Entire group disabled. All items become non-interactive.
 *
 * ```tsx
 * <RadioGroup disabled defaultValue="option-a">
 *   ...
 * </RadioGroup>
 * ```
 */
export const DisabledGroup: Story = {
  name: "Disabled Group",
  render: () => (
    <RadioGroup disabled defaultValue="option-a" className="space-y-2">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-a" id="disgrp-a" />
        <Label htmlFor="disgrp-a" className="opacity-50 cursor-not-allowed">
          Option A (selected)
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-b" id="disgrp-b" />
        <Label htmlFor="disgrp-b" className="opacity-50 cursor-not-allowed">
          Option B
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-c" id="disgrp-c" />
        <Label htmlFor="disgrp-c" className="opacity-50 cursor-not-allowed">
          Option C
        </Label>
      </div>
    </RadioGroup>
  ),
}

// ─── ASPIRE REAL-WORLD EXAMPLES ─────────────────────

/**
 * Payment type selector for the Aspire offer creation wizard. Each option
 * includes an icon and description.
 *
 * ```tsx
 * <RadioGroup value={paymentType} onValueChange={setPaymentType}>
 *   <label className="flex cursor-pointer items-start gap-3 rounded-lg border p-4">
 *     <RadioGroupItem value="flat-fee" id="flat-fee" className="mt-0.5" />
 *     <div>
 *       <DollarSign className="h-4 w-4" />
 *       <span>Flat Fee</span>
 *       <p>One-time payment for content delivery</p>
 *     </div>
 *   </label>
 * </RadioGroup>
 * ```
 */
export const AspirePaymentType: Story = {
  name: "Aspire — Payment Type",
  render: () => {
    const [paymentType, setPaymentType] = useState("flat-fee")
    const options: Array<{
      value: string
      icon: ElementType
      name: string
      description: string
      badge?: string
    }> = [
      {
        value: "flat-fee",
        icon: DollarSign,
        name: "Flat Fee",
        description: "One-time payment for content delivery.",
        badge: "Most common",
      },
      {
        value: "commission",
        icon: Percent,
        name: "Commission",
        description: "Percentage-based payment on sales generated.",
      },
      {
        value: "product-gifting",
        icon: Gift,
        name: "Product Gifting",
        description: "Send free products in exchange for content.",
      },
    ]

    return (
      <div className="w-96 space-y-3">
        <div>
          <h3 className="font-semibold">Payment Type</h3>
          <p className="text-sm text-muted-foreground">
            Choose how creators will be compensated.
          </p>
        </div>
        <RadioGroup value={paymentType} onValueChange={setPaymentType} className="space-y-2">
          {options.map(({ value, icon: Icon, name, description, badge }) => (
            <label
              key={value}
              htmlFor={`pay-${value}`}
              className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors ${
                paymentType === value
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-muted-foreground/50"
              }`}
            >
              <RadioGroupItem value={value} id={`pay-${value}`} className="mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium text-sm">{name}</span>
                  {badge && (
                    <Badge variant="secondary" className="text-xs">
                      {badge}
                    </Badge>
                  )}
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
              </div>
            </label>
          ))}
        </RadioGroup>
      </div>
    )
  },
}

/**
 * Campaign type selector used when creating a new campaign in Aspire.
 *
 * ```tsx
 * <RadioGroup defaultValue="ugc">
 *   <div className="flex items-center space-x-2">
 *     <RadioGroupItem value="ugc" id="ugc" />
 *     <Label htmlFor="ugc">User-Generated Content</Label>
 *   </div>
 *   ...
 * </RadioGroup>
 * ```
 */
export const AspireCampaignType: Story = {
  name: "Aspire — Campaign Type",
  render: () => {
    const [campaignType, setCampaignType] = useState("ugc")
    const types = [
      {
        value: "ugc",
        label: "User-Generated Content",
        desc: "Creators produce content featuring your product for their own channels.",
      },
      {
        value: "sponsored",
        label: "Sponsored Post",
        desc: "Paid partnership posts with disclosure on creator channels.",
      },
      {
        value: "affiliate",
        label: "Affiliate Program",
        desc: "Creators earn commission on sales through unique tracking links.",
      },
      {
        value: "ambassador",
        label: "Brand Ambassador",
        desc: "Long-term partnership with ongoing content and representation.",
      },
    ]

    return (
      <div className="w-96 space-y-3">
        <div>
          <h3 className="font-semibold">Campaign Type</h3>
          <p className="text-sm text-muted-foreground">
            Select the type of creator campaign to launch.
          </p>
        </div>
        <RadioGroup value={campaignType} onValueChange={setCampaignType} className="space-y-3">
          {types.map(({ value, label, desc }) => (
            <div key={value} className="flex items-start space-x-3">
              <RadioGroupItem value={value} id={`ct-${value}`} className="mt-0.5" />
              <div className="space-y-0.5">
                <Label htmlFor={`ct-${value}`} className="cursor-pointer font-medium">
                  {label}
                </Label>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </RadioGroup>
      </div>
    )
  },
}

/**
 * Content format selector used in Aspire offer deliverables configuration.
 * Horizontal card layout with icons for quick visual scanning.
 *
 * ```tsx
 * <RadioGroup value={format} onValueChange={setFormat} className="flex gap-3">
 *   <label className="flex flex-col items-center gap-2 rounded-lg border p-4">
 *     <RadioGroupItem value="video" id="fmt-video" />
 *     <Video className="h-5 w-5" />
 *     <span>Video</span>
 *   </label>
 * </RadioGroup>
 * ```
 */
export const AspireContentFormat: Story = {
  name: "Aspire — Content Format",
  render: () => {
    const [format, setFormat] = useState("video")
    const formats: Array<{ value: string; icon: ElementType; label: string }> = [
      { value: "video", icon: Video, label: "Video" },
      { value: "image", icon: Image, label: "Image" },
      { value: "blog", icon: FileText, label: "Blog Post" },
    ]

    return (
      <div className="space-y-3">
        <div>
          <h3 className="font-semibold">Content Format</h3>
          <p className="text-sm text-muted-foreground">
            What type of content should the creator deliver?
          </p>
        </div>
        <RadioGroup
          value={format}
          onValueChange={setFormat}
          className="flex gap-3"
          orientation="horizontal"
        >
          {formats.map(({ value, icon: Icon, label }) => (
            <label
              key={value}
              htmlFor={`fmt-${value}`}
              className={`flex cursor-pointer flex-col items-center gap-2 rounded-lg border px-6 py-4 transition-colors ${
                format === value
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-muted-foreground/50"
              }`}
            >
              <RadioGroupItem value={value} id={`fmt-${value}`} />
              <Icon className={`h-5 w-5 ${format === value ? "text-primary" : "text-muted-foreground"}`} />
              <span className="text-sm font-medium">{label}</span>
            </label>
          ))}
        </RadioGroup>
      </div>
    )
  },
}

// ─── ALL STATES GALLERY ─────────────────────────────

/** Side-by-side comparison of radio item states. */
export const AllStates: Story = {
  name: "All States",
  render: () => (
    <div className="flex gap-8">
      <div className="space-y-1">
        <span className="text-xs text-muted-foreground">Unselected</span>
        <RadioGroup className="space-y-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="unselected" id="state-unselected" />
            <Label htmlFor="state-unselected">Unselected</Label>
          </div>
        </RadioGroup>
      </div>
      <div className="space-y-1">
        <span className="text-xs text-muted-foreground">Selected</span>
        <RadioGroup defaultValue="selected" className="space-y-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="selected" id="state-selected" />
            <Label htmlFor="state-selected">Selected</Label>
          </div>
        </RadioGroup>
      </div>
      <div className="space-y-1">
        <span className="text-xs text-muted-foreground">Disabled</span>
        <RadioGroup className="space-y-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="disabled" id="state-disabled" disabled />
            <Label htmlFor="state-disabled" className="opacity-50">Disabled</Label>
          </div>
        </RadioGroup>
      </div>
      <div className="space-y-1">
        <span className="text-xs text-muted-foreground">Disabled + Selected</span>
        <RadioGroup disabled defaultValue="dis-sel" className="space-y-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="dis-sel" id="state-dis-sel" />
            <Label htmlFor="state-dis-sel" className="opacity-50">Disabled</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  ),
}

// ─── INTERACTION TESTS ──────────────────────────────

/**
 * Verifies that clicking a radio button selects it and fires the
 * `onValueChange` callback with the correct value.
 */
export const SelectionTest: Story = {
  name: "Interaction: Select an Option",
  args: {
    onValueChange: fn(),
  },
  render: (args) => (
    <RadioGroup {...args} className="space-y-2">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="alpha" id="test-alpha" />
        <Label htmlFor="test-alpha">Alpha</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="bravo" id="test-bravo" />
        <Label htmlFor="test-bravo">Bravo</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="charlie" id="test-charlie" />
        <Label htmlFor="test-charlie">Charlie</Label>
      </div>
    </RadioGroup>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)

    // All radios should start unchecked
    const radios = canvas.getAllByRole("radio")
    for (const radio of radios) {
      await expect(radio).not.toBeChecked()
    }

    // Click "Bravo"
    const bravoRadio = canvas.getByLabelText("Bravo")
    await userEvent.click(bravoRadio)
    await expect(args.onValueChange).toHaveBeenCalledWith("bravo")

    // Verify "Bravo" is now checked
    await expect(bravoRadio).toBeChecked()
  },
}

/**
 * Verifies that selecting a different option deselects the previous one,
 * ensuring mutual exclusivity.
 */
export const MutualExclusivityTest: Story = {
  name: "Interaction: Mutual Exclusivity",
  args: {
    onValueChange: fn(),
  },
  render: (args) => (
    <RadioGroup {...args} defaultValue="first" className="space-y-2">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="first" id="excl-first" />
        <Label htmlFor="excl-first">First</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="second" id="excl-second" />
        <Label htmlFor="excl-second">Second</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="third" id="excl-third" />
        <Label htmlFor="excl-third">Third</Label>
      </div>
    </RadioGroup>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)

    // "First" should be checked by default
    const firstRadio = canvas.getByLabelText("First")
    await expect(firstRadio).toBeChecked()

    // Click "Third" — it should become checked and "First" should uncheck
    const thirdRadio = canvas.getByLabelText("Third")
    await userEvent.click(thirdRadio)

    await expect(args.onValueChange).toHaveBeenCalledWith("third")
    await expect(thirdRadio).toBeChecked()
    await expect(firstRadio).not.toBeChecked()
  },
}

/**
 * Verifies that a disabled radio item cannot be selected by clicking.
 */
export const DisabledInteractionTest: Story = {
  name: "Interaction: Disabled Item Prevents Selection",
  args: {
    onValueChange: fn(),
  },
  render: (args) => (
    <RadioGroup {...args} className="space-y-2">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="enabled" id="distest-enabled" />
        <Label htmlFor="distest-enabled">Enabled</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="disabled" id="distest-disabled" disabled />
        <Label htmlFor="distest-disabled" className="opacity-50">
          Disabled
        </Label>
      </div>
    </RadioGroup>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)

    // Attempt to click the disabled radio
    const disabledRadio = canvas.getByLabelText("Disabled")
    await expect(disabledRadio).toBeDisabled()
    await userEvent.click(disabledRadio)

    // onValueChange should not have been called with "disabled"
    // It may not have been called at all, or only with "enabled" if clicked
    const calls = (args.onValueChange as ReturnType<typeof fn>).mock.calls
    const disabledCalls = calls.filter((call: string[]) => call[0] === "disabled")
    await expect(disabledCalls.length).toBe(0)
  },
}
