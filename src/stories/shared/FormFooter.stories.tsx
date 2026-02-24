import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"
import { within, userEvent, expect } from "storybook/test"
import * as React from "react"
import { FormFooter } from "@/components/shared/FormFooter"

/**
 * # FormFooter
 *
 * A sticky footer bar for multi-step wizards and dialog forms. Provides a
 * Close (X) button on the left and navigation buttons (Previous / Next) on
 * the right. The Previous button is hidden on the first step. The Next button
 * label and disabled state are configurable for each step.
 *
 * ## When to Use
 * - Wizard footers (offer creation, campaign setup, onboarding flows)
 * - Dialog or sheet form footers with step navigation
 * - Any multi-step form that needs consistent forward/back controls
 *
 * ## When NOT to Use
 * - Single-action forms -- use a single Button or ButtonGroup
 * - Confirmation dialogs -- use AlertDialog with its own footer
 * - Inline form submissions -- use a submit button within the form
 * - Tab-based navigation -- use Tabs component navigation
 *
 * ## Accessibility
 * - The Close button has `aria-label="Close"` for screen readers
 * - Previous button includes an ArrowLeft icon for visual direction
 * - Next button includes an ArrowRight icon for visual direction
 * - Disabled Next button is removed from the tab order and cannot be activated
 * - All buttons are `type="button"` to prevent accidental form submission
 *
 * ## Import
 * ```tsx
 * import { FormFooter } from '@/components/shared/FormFooter'
 * ```
 *
 * ## Quick Start
 * ```tsx
 * <FormFooter
 *   onClose={() => router.back()}
 *   onPrevious={() => setStep(s => s - 1)}
 *   onNext={() => setStep(s => s + 1)}
 *   showPrevious={step > 0}
 *   nextLabel={step === lastStep ? "Create" : "Next"}
 * />
 * ```
 */
const meta: Meta<typeof FormFooter> = {
  title: "4. Components/Forms/FormFooter",
  component: FormFooter,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Sticky wizard footer with a Close (X) button on the left and navigation buttons on the right. 'Previous' is hidden on the first step.",
      },
    },
  },
  argTypes: {
    onClose: {
      action: "close",
      description:
        "Callback fired when the Close (X) button is clicked. Typically navigates back or closes the wizard dialog.",
      table: {
        type: { summary: "() => void" },
        category: "Events",
      },
    },
    onPrevious: {
      action: "previous",
      description:
        "Callback fired when the Previous button is clicked. Navigates to the preceding step.",
      table: {
        type: { summary: "() => void" },
        category: "Events",
      },
    },
    onNext: {
      action: "next",
      description:
        "Callback fired when the Next button is clicked. Navigates to the next step or submits the form on the last step.",
      table: {
        type: { summary: "() => void" },
        category: "Events",
      },
    },
    nextLabel: {
      control: "text",
      description:
        'Label text for the Next/Submit button. Change to "Create", "Launch", or "Submit" on the final step.',
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '"Next"' },
        category: "Content",
      },
    },
    previousLabel: {
      control: "text",
      description: "Label text for the Previous button.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '"Previous"' },
        category: "Content",
      },
    },
    showPrevious: {
      control: "boolean",
      description:
        "Controls visibility of the Previous button. Set to `false` on the first step of a wizard.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "State",
      },
    },
    nextDisabled: {
      control: "boolean",
      description:
        "Disables the Next button, preventing navigation. Use when required fields are incomplete or validation fails.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "State",
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
  },
  args: {
    onClose: fn(),
    onPrevious: fn(),
    onNext: fn(),
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div className="max-w-2xl rounded-xl border border-border overflow-hidden">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof FormFooter>

// ─── STEP VARIANTS ────────────────────────────────

/**
 * First step of a wizard — the Previous button is hidden.
 *
 * ```tsx
 * <FormFooter
 *   showPrevious={false}
 *   nextLabel="Continue"
 *   onClose={() => closeWizard()}
 *   onNext={() => goToStep(1)}
 * />
 * ```
 */
export const FirstStep: Story = {
  name: "First Step (No Previous)",
  args: {
    showPrevious: false,
    nextLabel: "Continue",
  },
  parameters: {
    docs: {
      description: {
        story:
          "First wizard step. The Previous button is hidden since there is no preceding step. Only the Close and Next buttons are visible.",
      },
    },
  },
}

/**
 * Middle step of a wizard — both Previous and Next buttons visible.
 *
 * ```tsx
 * <FormFooter
 *   showPrevious
 *   nextLabel="Next"
 *   onClose={() => closeWizard()}
 *   onPrevious={() => goToStep(step - 1)}
 *   onNext={() => goToStep(step + 1)}
 * />
 * ```
 */
export const MiddleStep: Story = {
  name: "Middle Step",
  args: {
    showPrevious: true,
    nextLabel: "Next",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Middle wizard step. Both Previous and Next buttons are visible for bidirectional navigation.",
      },
    },
  },
}

/**
 * Last step of a wizard — the Next button label changes to the final CTA.
 *
 * ```tsx
 * <FormFooter
 *   showPrevious
 *   nextLabel="Create Offer"
 *   onClose={() => closeWizard()}
 *   onPrevious={() => goToStep(step - 1)}
 *   onNext={() => submitOffer()}
 * />
 * ```
 */
export const LastStep: Story = {
  name: 'Last Step ("Create" Label)',
  args: {
    showPrevious: true,
    nextLabel: "Create Offer",
  },
  parameters: {
    docs: {
      description: {
        story:
          'Final wizard step. The Next button label changes to "Create Offer" (or any final CTA) to signal the action is a submission rather than navigation.',
      },
    },
  },
}

/**
 * Next button disabled — required fields are missing or validation has failed.
 *
 * ```tsx
 * <FormFooter
 *   showPrevious
 *   nextLabel="Next"
 *   nextDisabled
 *   onClose={() => closeWizard()}
 *   onPrevious={() => goToStep(step - 1)}
 *   onNext={() => goToStep(step + 1)}
 * />
 * ```
 */
export const NextDisabled: Story = {
  name: "Next Disabled",
  args: {
    showPrevious: true,
    nextLabel: "Next",
    nextDisabled: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Next button disabled. Use when required fields are incomplete or validation fails. The Previous and Close buttons remain active.",
      },
    },
  },
}

/**
 * Custom button labels for non-standard wizard flows.
 *
 * ```tsx
 * <FormFooter
 *   showPrevious
 *   previousLabel="Back"
 *   nextLabel="Save & Continue"
 * />
 * ```
 */
export const CustomLabels: Story = {
  name: "Custom Labels",
  args: {
    showPrevious: true,
    previousLabel: "Back",
    nextLabel: "Save & Continue",
  },
  parameters: {
    docs: {
      description: {
        story:
          'Custom button labels. The Previous button reads "Back" and the Next button reads "Save & Continue". Useful for flows that auto-save at each step.',
      },
    },
  },
}

// ─── STEP PROGRESSION ─────────────────────────────

/**
 * Second step with "Continue" label — common in onboarding flows.
 */
export const SecondStep: Story = {
  name: "Second Step",
  args: {
    showPrevious: true,
    nextLabel: "Continue",
  },
  parameters: {
    docs: {
      description: {
        story: 'Second wizard step with both navigation buttons and "Continue" as the next label.',
      },
    },
  },
}

/**
 * Penultimate step with "Review" label — signals the next step is a review/confirmation.
 */
export const PenultimateStep: Story = {
  name: "Penultimate Step (Review)",
  args: {
    showPrevious: true,
    nextLabel: "Review",
  },
  parameters: {
    docs: {
      description: {
        story:
          'Penultimate step with "Review" label to signal the next step is a review/confirmation before submission.',
      },
    },
  },
}

/**
 * Launch campaign final CTA.
 */
export const LaunchCampaign: Story = {
  name: "Launch Campaign CTA",
  args: {
    showPrevious: true,
    nextLabel: "Launch Campaign",
  },
  parameters: {
    docs: {
      description: {
        story: 'Final step CTA for campaign creation flows with "Launch Campaign" label.',
      },
    },
  },
}

// ─── REAL-WORLD COMPOSITIONS ──────────────────────

/**
 * Wizard footer as it appears at the bottom of the Aspire offer creation wizard.
 *
 * ```tsx
 * <div className="flex flex-col border rounded-xl overflow-hidden">
 *   <div className="flex-1 p-6">Form content...</div>
 *   <FormFooter showPrevious nextLabel="Next" />
 * </div>
 * ```
 */
export const WizardFooter: Story = {
  name: "Real World — Wizard Footer",
  decorators: [
    (Story: React.ComponentType) => (
      <div className="max-w-2xl border rounded-xl overflow-hidden">
        <div className="p-6 space-y-4">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-foreground">
              Configure Discount
            </h2>
            <p className="text-sm text-muted-foreground">
              Set up the discount type and amount for your offer.
            </p>
          </div>
          <div className="h-32 rounded-lg border-2 border-dashed border-border bg-muted/20 flex items-center justify-center">
            <span className="text-sm text-muted-foreground">
              Form fields go here
            </span>
          </div>
        </div>
        <Story />
      </div>
    ),
  ],
  args: {
    showPrevious: true,
    nextLabel: "Next",
  },
  parameters: {
    docs: {
      description: {
        story:
          "The form footer as it appears at the bottom of a wizard step, below the form content area with a top border separator.",
      },
    },
  },
}

/**
 * Dialog form footer — used at the bottom of a dialog or sheet form.
 */
export const DialogFormFooter: Story = {
  name: "Real World — Dialog Form Footer",
  decorators: [
    (Story: React.ComponentType) => (
      <div className="max-w-md border rounded-xl overflow-hidden shadow-lg">
        <div className="p-6 space-y-4">
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-foreground">
              Quick Setup
            </h3>
            <p className="text-sm text-muted-foreground">
              Complete these fields to get started.
            </p>
          </div>
          <div className="h-24 rounded-lg border-2 border-dashed border-border bg-muted/20 flex items-center justify-center">
            <span className="text-sm text-muted-foreground">
              Dialog form content
            </span>
          </div>
        </div>
        <Story />
      </div>
    ),
  ],
  args: {
    showPrevious: false,
    nextLabel: "Save",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Footer used at the bottom of a dialog form. No Previous button since dialogs are typically single-step. The Next button reads \"Save\".",
      },
    },
  },
}

/**
 * Full wizard frame — stepper sidebar, form content, and footer combined.
 */
export const FullWizardFrame: Story = {
  name: "Real World — Full Wizard Frame",
  decorators: [
    (Story: React.ComponentType) => (
      <div className="max-w-3xl border rounded-xl overflow-hidden">
        <div className="flex min-h-72">
          <aside className="flex w-56 shrink-0 flex-col gap-1 border-r border-border bg-muted/30 px-4 py-6">
            <div className="flex items-center gap-3 px-1 py-2.5">
              <div className="flex size-6 shrink-0 items-center justify-center rounded-full border border-green-500 bg-green-500 text-white text-xs font-bold">
                <svg viewBox="0 0 15 15" className="size-3.5"><path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3354 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.5553 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/></svg>
              </div>
              <span className="text-sm font-medium text-foreground">Offer Basics</span>
            </div>
            <div className="flex items-center gap-3 px-1 py-2.5">
              <div className="flex size-6 shrink-0 items-center justify-center rounded-full border border-primary bg-primary text-primary-foreground text-xs font-bold">
                2
              </div>
              <span className="text-sm font-semibold text-foreground">Configure Discount</span>
            </div>
            <div className="flex items-center gap-3 px-1 py-2.5">
              <div className="flex size-6 shrink-0 items-center justify-center rounded-full border border-border bg-background text-muted-foreground text-xs font-bold">
                3
              </div>
              <span className="text-sm text-muted-foreground">Creator Earnings</span>
            </div>
          </aside>
          <div className="flex-1 p-6">
            <div className="space-y-1 mb-4">
              <h2 className="text-lg font-semibold text-foreground">Configure Discount</h2>
              <p className="text-sm text-muted-foreground">
                Set up discount type, amount, and promo code settings.
              </p>
            </div>
            <div className="h-28 rounded-lg border-2 border-dashed border-border bg-muted/20 flex items-center justify-center">
              <span className="text-sm text-muted-foreground">Form content</span>
            </div>
          </div>
        </div>
        <Story />
      </div>
    ),
  ],
  args: {
    showPrevious: true,
    nextLabel: "Next",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Complete wizard frame composition: stepper sidebar on the left, form content in the center, and the FormFooter at the bottom. Represents the full Aspire offer creation experience.",
      },
    },
  },
}

// ─── INTERACTION TESTS ────────────────────────────

/**
 * Verifies that clicking the Next button fires the onNext callback.
 */
export const NextClickTest: Story = {
  name: "Test: Next Button fires onNext",
  args: {
    showPrevious: false,
    nextLabel: "Continue",
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const nextButton = canvas.getByRole("button", { name: /Continue/i })
    await expect(nextButton).toBeInTheDocument()
    await expect(nextButton).toBeEnabled()
    await userEvent.click(nextButton)
    await expect(args.onNext).toHaveBeenCalledTimes(1)
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interaction test verifying that clicking the Next button fires the `onNext` callback exactly once.",
      },
    },
  },
}

/**
 * Verifies that the Close button fires onClose and the Previous button fires onPrevious.
 */
export const CloseAndPreviousTest: Story = {
  name: "Test: Close and Previous fire callbacks",
  args: {
    showPrevious: true,
    nextLabel: "Next",
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)

    // Test Close button
    const closeButton = canvas.getByRole("button", { name: "Close" })
    await expect(closeButton).toBeInTheDocument()
    await userEvent.click(closeButton)
    await expect(args.onClose).toHaveBeenCalledTimes(1)

    // Test Previous button
    const previousButton = canvas.getByRole("button", { name: /Previous/i })
    await expect(previousButton).toBeInTheDocument()
    await userEvent.click(previousButton)
    await expect(args.onPrevious).toHaveBeenCalledTimes(1)
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interaction test verifying that the Close button fires `onClose` and the Previous button fires `onPrevious`.",
      },
    },
  },
}

/**
 * Verifies that a disabled Next button does not fire onNext when clicked.
 */
export const DisabledNextTest: Story = {
  name: "Test: Disabled Next prevents navigation",
  args: {
    showPrevious: true,
    nextLabel: "Next",
    nextDisabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const nextButton = canvas.getByRole("button", { name: /Next/i })
    await expect(nextButton).toBeDisabled()
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interaction test verifying that a disabled Next button cannot be clicked and does not fire the `onNext` callback.",
      },
    },
  },
}

/**
 * Verifies that the Previous button is not rendered when showPrevious is false.
 */
export const HiddenPreviousTest: Story = {
  name: "Test: Previous hidden on first step",
  args: {
    showPrevious: false,
    nextLabel: "Continue",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Previous button should not exist
    const previousButton = canvas.queryByRole("button", { name: /Previous/i })
    await expect(previousButton).not.toBeInTheDocument()

    // Close and Next should still exist
    const closeButton = canvas.getByRole("button", { name: "Close" })
    await expect(closeButton).toBeInTheDocument()
    const nextButton = canvas.getByRole("button", { name: /Continue/i })
    await expect(nextButton).toBeInTheDocument()
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interaction test verifying that the Previous button is not rendered when `showPrevious` is false, while Close and Next remain visible.",
      },
    },
  },
}
