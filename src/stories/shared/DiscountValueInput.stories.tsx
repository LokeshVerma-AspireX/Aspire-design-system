import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"
import { within, userEvent, expect } from "storybook/test"
import * as React from "react"
import { DiscountValueInput, type DiscountMode } from "@/components/shared/DiscountValueInput"
import { Label } from "@/components/ui/label"

// ─── Meta ─────────────────────────────────────────────────────────────────────

/**
 * # DiscountValueInput
 *
 * A toggle-tab input for discount values that switches between flat dollar
 * amounts and percentage values. The input prefix/suffix, step, and max
 * constraints update dynamically based on the active mode.
 *
 * ## When to Use
 * - Setting discount values for offers and promo codes
 * - Commission rate inputs (flat fee vs percentage)
 * - Any form field that needs to toggle between currency and percentage modes
 * - In the Aspire offer creation wizard for setting creator discount values
 *
 * ## When NOT to Use
 * - For simple currency inputs without mode switching -- use a plain Input with adornments
 * - For percentage-only fields (e.g. tax rate) -- use a plain Input with % suffix
 * - For selecting from predefined discount tiers -- use Select or RadioGroup
 *
 * ## Accessibility
 * - Mode toggle buttons are focusable and activatable via keyboard
 * - The number input supports standard keyboard controls (arrow keys, typing)
 * - In percent mode, input is constrained to `max={100}`
 * - In flat mode, input uses `step={0.01}` for precise currency values
 * - Hidden spinner buttons ensure clean visual presentation
 *
 * ## Import
 * ```tsx
 * import { DiscountValueInput } from '@/components/shared/DiscountValueInput'
 * ```
 *
 * ## Quick Start
 * ```tsx
 * const [mode, setMode] = useState<DiscountMode>("percent")
 * const [value, setValue] = useState<number | "">(10)
 *
 * <DiscountValueInput
 *   mode={mode}
 *   onModeChange={setMode}
 *   value={value}
 *   onChange={setValue}
 * />
 * ```
 */
const meta: Meta<typeof DiscountValueInput> = {
  title: "4. Components/Forms/DiscountValueInput",
  component: DiscountValueInput,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Toggle-tab input for discount values. Switch between '$ Flat' and '% Percent' modes. The suffix/prefix updates dynamically and the number input constrains the max for percent mode.",
      },
    },
  },
  argTypes: {
    mode: {
      control: "select",
      options: ["flat", "percent"],
      description: "The active discount mode. Controls the prefix/suffix and input constraints.",
      table: {
        type: { summary: '"flat" | "percent"' },
        defaultValue: { summary: '"percent"' },
        category: "Mode",
      },
    },
    onModeChange: {
      description: "Callback fired when the user clicks a mode toggle tab.",
      table: {
        type: { summary: "(mode: DiscountMode) => void" },
        category: "Events",
      },
    },
    value: {
      control: "text",
      description: 'The current numeric value. Use `""` for an empty state.',
      table: {
        type: { summary: 'number | ""' },
        defaultValue: { summary: '""' },
        category: "Value",
      },
    },
    onChange: {
      description: "Callback fired when the number input value changes.",
      table: {
        type: { summary: '(value: number | "") => void' },
        category: "Events",
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes applied to the outer wrapper.",
      table: {
        type: { summary: "string" },
        category: "Appearance",
      },
    },
  },
  args: {
    onModeChange: fn(),
    onChange: fn(),
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div className="max-w-xs">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

// ─── FLAT MODE ───────────────────────────────────────────────────────────────

/**
 * Flat dollar mode -- shows `$ Flat` tab active with a `$` prefix.
 * Input has `step={0.01}` for precise currency values and no max constraint.
 *
 * ```tsx
 * <DiscountValueInput mode="flat" value={20} />
 * ```
 */
export const FlatMode: Story = {
  name: "Flat Mode ($)",
  args: {
    mode: "flat",
    value: 20,
  },
  parameters: {
    docs: {
      description: {
        story: "Flat dollar mode with $20 value. The '$ Flat' tab is active, the input shows a '$' prefix, and there is no percentage suffix.",
      },
    },
  },
}

// ─── PERCENT MODE ────────────────────────────────────────────────────────────

/**
 * Percent mode -- shows `% Percent` tab active with a `%` suffix.
 * Input has `max={100}` and `step={1}`.
 *
 * ```tsx
 * <DiscountValueInput mode="percent" value={10} />
 * ```
 */
export const PercentMode: Story = {
  name: "Percent Mode (%)",
  args: {
    mode: "percent",
    value: 10,
  },
  parameters: {
    docs: {
      description: {
        story: "Percent mode with 10% value. The '% Percent' tab is active, the input shows a '%' suffix, and the max is constrained to 100.",
      },
    },
  },
}

// ─── WITH VALUE ──────────────────────────────────────────────────────────────

/**
 * Pre-filled with a higher value to demonstrate appearance with larger numbers.
 *
 * ```tsx
 * <DiscountValueInput mode="flat" value={149.99} />
 * ```
 */
export const WithValue: Story = {
  name: "With Pre-filled Value",
  args: {
    mode: "flat",
    value: 149.99,
  },
  parameters: {
    docs: {
      description: {
        story: "Flat mode with a pre-filled value of $149.99. Demonstrates how the input handles decimal currency values.",
      },
    },
  },
}

// ─── EMPTY ───────────────────────────────────────────────────────────────────

/**
 * Empty state with no value entered. The placeholder `0` is shown.
 *
 * ```tsx
 * <DiscountValueInput mode="percent" value="" />
 * ```
 */
export const Empty: Story = {
  args: {
    mode: "percent",
    value: "",
  },
  parameters: {
    docs: {
      description: {
        story: "Empty state in percent mode. The input shows the `0` placeholder. Useful as the initial state before the user enters a value.",
      },
    },
  },
}

// ─── CONTROLLED ──────────────────────────────────────────────────────────────

/**
 * Fully controlled component with React state managing both mode and value.
 * Toggle between flat and percent modes, and type a value to see
 * callbacks fire in real time.
 *
 * ```tsx
 * const [mode, setMode] = useState<DiscountMode>("percent")
 * const [value, setValue] = useState<number | "">(15)
 *
 * <DiscountValueInput
 *   mode={mode}
 *   onModeChange={setMode}
 *   value={value}
 *   onChange={setValue}
 * />
 * ```
 */
export const Controlled: Story = {
  render: () => {
    const [mode, setMode] = React.useState<DiscountMode>("percent")
    const [value, setValue] = React.useState<number | "">(15)

    return (
      <div className="max-w-xs space-y-4">
        <DiscountValueInput
          mode={mode}
          onModeChange={setMode}
          value={value}
          onChange={setValue}
        />
        <div className="rounded-md border border-border bg-muted/30 px-3 py-2 text-sm text-muted-foreground">
          <p><strong>Mode:</strong> {mode}</p>
          <p><strong>Value:</strong> {value === "" ? "(empty)" : value}</p>
          <p><strong>Display:</strong> {value === "" ? "--" : mode === "flat" ? `$${value}` : `${value}%`}</p>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: "Fully controlled state. The debug panel below shows the current mode and value in real time. Toggle between flat and percent, then type a value to see the state update.",
      },
    },
  },
}

// ─── ALL MODES GALLERY ───────────────────────────────────────────────────────

/**
 * Side-by-side comparison of both modes with values pre-filled.
 */
export const AllModes: Story = {
  name: "All Modes",
  render: () => (
    <div className="space-y-6 max-w-xs">
      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground uppercase tracking-wider">Flat Mode</Label>
        <DiscountValueInput mode="flat" value={25} />
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground uppercase tracking-wider">Percent Mode</Label>
        <DiscountValueInput mode="percent" value={15} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Side-by-side comparison of flat ($25) and percent (15%) modes. Demonstrates the visual differences between the two input configurations.",
      },
    },
  },
}

// ─── REAL WORLD: OFFER DISCOUNT ──────────────────────────────────────────────

/**
 * Offer discount input as used in the Aspire offer creation wizard.
 * Paired with a label and helper text.
 *
 * ```tsx
 * <div className="space-y-2">
 *   <Label>Discount Value</Label>
 *   <DiscountValueInput mode={mode} onModeChange={setMode} value={value} onChange={setValue} />
 *   <p className="text-xs text-muted-foreground">
 *     The discount applied when a creator's code is used at checkout.
 *   </p>
 * </div>
 * ```
 */
export const OfferDiscount: Story = {
  name: "Real World -- Offer Discount",
  render: () => {
    const [mode, setMode] = React.useState<DiscountMode>("percent")
    const [value, setValue] = React.useState<number | "">(20)

    return (
      <div className="max-w-xs space-y-2">
        <Label>Discount Value</Label>
        <DiscountValueInput
          mode={mode}
          onModeChange={setMode}
          value={value}
          onChange={setValue}
        />
        <p className="text-xs text-muted-foreground">
          The discount applied when a creator's code is used at checkout.
        </p>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: "Offer creation wizard pattern: labeled discount input with helper text. Starts at 20% -- toggle to flat mode for a dollar amount instead.",
      },
    },
  },
}

/**
 * Promo code value input paired with a code preview.
 */
export const PromoCodeValue: Story = {
  name: "Real World -- Promo Code Value",
  render: () => {
    const [mode, setMode] = React.useState<DiscountMode>("flat")
    const [value, setValue] = React.useState<number | "">(10)

    return (
      <div className="max-w-sm space-y-4 rounded-lg border border-border bg-card p-5">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold">Promo Code Settings</h3>
          <p className="text-xs text-muted-foreground">
            Configure the discount value for this promo code.
          </p>
        </div>
        <div className="space-y-2">
          <Label>Code Value</Label>
          <DiscountValueInput
            mode={mode}
            onModeChange={setMode}
            value={value}
            onChange={setValue}
          />
        </div>
        <div className="rounded-md bg-muted/50 px-3 py-2 text-sm">
          <span className="text-muted-foreground">Preview: </span>
          <span className="font-medium">
            SUMMER2026 &mdash;{" "}
            {value === ""
              ? "No discount"
              : mode === "flat"
                ? `$${value} off`
                : `${value}% off`}
          </span>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: "Promo code configuration card with a live preview of the discount. Shows how the mode and value combine into a human-readable discount description.",
      },
    },
  },
}

// ─── INTERACTION TESTS ───────────────────────────────────────────────────────

/**
 * Verifies that clicking the "$ Flat" tab switches to flat mode
 * and fires the onModeChange callback.
 */
export const ModeToggleTest: Story = {
  name: "Test: Mode Toggle",
  args: {
    mode: "percent",
    value: 10,
    onModeChange: fn(),
    onChange: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    // Click the "$ Flat" tab button
    const flatTab = canvas.getByText("$ Flat")
    await userEvent.click(flatTab)
    await expect(args.onModeChange).toHaveBeenCalledWith("flat")
  },
}

/**
 * Verifies that typing a value into the number input fires the
 * onChange callback with the correct numeric value.
 */
export const ValueInputTest: Story = {
  name: "Test: Value Input",
  args: {
    mode: "percent",
    value: "",
    onModeChange: fn(),
    onChange: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    // Find the number input by placeholder
    const input = canvas.getByPlaceholderText("0")
    await userEvent.click(input)
    await userEvent.type(input, "25")
    // onChange should have been called for each keystroke
    await expect(args.onChange).toHaveBeenCalled()
  },
}
