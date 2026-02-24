import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { within, expect } from "storybook/test"
import * as React from "react"
import { StepperSidebar, type StepDef } from "@/components/shared/StepperSidebar"

const OFFER_WIZARD_STEPS: StepDef[] = [
  { id: "offer-basics", label: "Offer Basics" },
  { id: "configure-discount", label: "Configure Discount" },
  { id: "creator-earnings", label: "Creator Earnings" },
  { id: "advance-config", label: "Advance Config" },
  { id: "review-create", label: "Review & Create" },
]

const CAMPAIGN_WIZARD_STEPS: StepDef[] = [
  { id: "details", label: "Campaign Details" },
  { id: "targeting", label: "Target Audience" },
  { id: "creators", label: "Add Creators" },
  { id: "budget", label: "Budget & Timeline" },
  { id: "review", label: "Review & Launch" },
]

const THREE_STEPS: StepDef[] = [
  { id: "details", label: "Campaign Details" },
  { id: "creators", label: "Add Creators" },
  { id: "review", label: "Review & Launch" },
]

/**
 * # StepperSidebar
 *
 * A vertical multi-step progress indicator typically docked on the left side
 * of a wizard or multi-step form. Completed steps show a green checkmark,
 * the active step is highlighted in the primary color, and upcoming steps
 * are muted gray with their step number.
 *
 * ## When to Use
 * - Multi-step wizard flows (offer creation, campaign setup)
 * - Long forms broken into sequential sections
 * - Any workflow where users need to see their progress
 *
 * ## When NOT to Use
 * - Horizontal step indicators -- use a horizontal stepper component
 * - Tab-based navigation where steps are non-sequential -- use Tabs
 * - Single-step forms or short forms that fit on one page
 * - Mobile layouts where vertical space is limited -- consider a compact stepper
 *
 * ## Accessibility
 * - Renders as an `<aside>` landmark for screen readers
 * - Step numbers are visible text for completed steps (replaced by checkmark icon)
 * - Active step uses `font-semibold` for visual emphasis
 * - Color is not the sole indicator -- completed steps use a check icon, active uses bold text
 *
 * ## Import
 * ```tsx
 * import { StepperSidebar } from '@/components/shared/StepperSidebar'
 * ```
 *
 * ## Quick Start
 * ```tsx
 * const steps = [
 *   { id: "basics", label: "Offer Basics" },
 *   { id: "config", label: "Configure Discount" },
 *   { id: "review", label: "Review & Create" },
 * ]
 *
 * <StepperSidebar steps={steps} activeStep={0} />
 * ```
 */
const meta: Meta<typeof StepperSidebar> = {
  title: "4. Components/Navigation/StepperSidebar",
  component: StepperSidebar,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Vertical multi-step indicator. Completed steps show a green checkmark, active step is highlighted in the primary color, upcoming steps are muted gray.",
      },
    },
  },
  argTypes: {
    steps: {
      control: "object",
      description:
        "Array of step definitions. Each step requires a unique `id` and a `label` string displayed next to the step indicator.",
      table: {
        type: { summary: "StepDef[]" },
        category: "Content",
      },
    },
    activeStep: {
      control: { type: "number", min: 0, max: 10 },
      description:
        "Zero-based index of the currently active step. Steps before this index are marked as completed, steps after are upcoming. If set beyond the array length, all steps show as completed.",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "0" },
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
    steps: OFFER_WIZARD_STEPS,
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div className="w-56 border rounded-xl overflow-hidden min-h-64">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof StepperSidebar>

// ─── ACTIVE STEP VARIANTS ─────────────────────────

/**
 * First step active — all other steps are upcoming (gray with step numbers).
 *
 * ```tsx
 * <StepperSidebar steps={steps} activeStep={0} />
 * ```
 */
export const FirstStepActive: Story = {
  name: "First Step Active",
  args: { activeStep: 0 },
  parameters: {
    docs: {
      description: {
        story:
          "First step active. All other steps are in the upcoming state with gray indicators showing their step number.",
      },
    },
  },
}

/**
 * Middle step active — steps 1-2 completed (green checkmarks), step 3 active.
 *
 * ```tsx
 * <StepperSidebar steps={steps} activeStep={2} />
 * ```
 */
export const MiddleStepActive: Story = {
  name: "Middle Step Active",
  args: { activeStep: 2 },
  parameters: {
    docs: {
      description: {
        story:
          "Middle step active. Steps 1 and 2 show green checkmarks indicating completion. Step 3 is highlighted as active. Steps 4 and 5 are upcoming.",
      },
    },
  },
}

/**
 * Last step active — all previous steps completed, final step highlighted.
 *
 * ```tsx
 * <StepperSidebar steps={steps} activeStep={4} />
 * ```
 */
export const LastStepActive: Story = {
  name: "Last Step Active",
  args: { activeStep: 4 },
  parameters: {
    docs: {
      description: {
        story:
          "Last step active. All previous steps show green checkmarks. The final step is highlighted in the primary color.",
      },
    },
  },
}

/**
 * All steps completed — `activeStep` set beyond the array length.
 *
 * ```tsx
 * <StepperSidebar steps={steps} activeStep={5} />
 * ```
 */
export const AllCompleted: Story = {
  name: "All Steps Completed",
  args: { activeStep: 5 },
  parameters: {
    docs: {
      description: {
        story:
          "When `activeStep` exceeds the array length, all steps display green checkmarks. Useful for a final confirmation or success state.",
      },
    },
  },
}

/**
 * Second step active — first step completed, step 2 highlighted.
 *
 * ```tsx
 * <StepperSidebar steps={steps} activeStep={1} />
 * ```
 */
export const SecondStepActive: Story = {
  name: "Second Step Active",
  args: { activeStep: 1 },
  parameters: {
    docs: {
      description: {
        story: "Second step active. The first step shows a green checkmark, step 2 is highlighted.",
      },
    },
  },
}

/**
 * Fourth step active — three completed, one active, one upcoming.
 *
 * ```tsx
 * <StepperSidebar steps={steps} activeStep={3} />
 * ```
 */
export const FourthStepActive: Story = {
  name: "Fourth Step Active",
  args: { activeStep: 3 },
  parameters: {
    docs: {
      description: {
        story: "Fourth step active. Three steps completed, one upcoming.",
      },
    },
  },
}

// ─── STEP COUNT VARIANTS ──────────────────────────

/**
 * Shorter 3-step wizard — fewer steps for simpler flows.
 *
 * ```tsx
 * const steps = [
 *   { id: "details", label: "Campaign Details" },
 *   { id: "creators", label: "Add Creators" },
 *   { id: "review", label: "Review & Launch" },
 * ]
 * <StepperSidebar steps={steps} activeStep={1} />
 * ```
 */
export const ThreeSteps: Story = {
  name: "Three Steps",
  args: { steps: THREE_STEPS, activeStep: 1 },
  parameters: {
    docs: {
      description: {
        story: "Shorter 3-step wizard. Suitable for simpler flows like a quick campaign setup.",
      },
    },
  },
}

/**
 * Five-step campaign wizard with all unique labels.
 *
 * ```tsx
 * <StepperSidebar steps={campaignSteps} activeStep={2} />
 * ```
 */
export const FiveStepCampaign: Story = {
  name: "Five Step Campaign Wizard",
  args: { steps: CAMPAIGN_WIZARD_STEPS, activeStep: 2 },
  parameters: {
    docs: {
      description: {
        story: "Five-step campaign wizard with targeting and budget steps.",
      },
    },
  },
}

// ─── REAL-WORLD COMPOSITIONS ──────────────────────

/**
 * Create Offer wizard — the stepper as it appears in the Aspire offer creation flow.
 *
 * ```tsx
 * <div className="flex min-h-96 border rounded-xl overflow-hidden">
 *   <StepperSidebar steps={offerSteps} activeStep={1} />
 *   <div className="flex-1 p-6">
 *     <h2>Configure Discount</h2>
 *     <p>Set up the discount type and amount...</p>
 *   </div>
 * </div>
 * ```
 */
export const CreateOfferWizard: Story = {
  name: "Real World — Create Offer Wizard",
  decorators: [
    (Story: React.ComponentType) => (
      <div className="flex min-h-96 max-w-3xl border rounded-xl overflow-hidden">
        <Story />
        <div className="flex-1 p-6 space-y-4">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-foreground">
              Configure Discount
            </h2>
            <p className="text-sm text-muted-foreground">
              Set up the discount type, amount, and promo code settings for your
              offer.
            </p>
          </div>
          <div className="h-40 rounded-lg border-2 border-dashed border-border bg-muted/20 flex items-center justify-center">
            <span className="text-sm text-muted-foreground">
              Form content goes here
            </span>
          </div>
        </div>
      </div>
    ),
  ],
  args: { steps: OFFER_WIZARD_STEPS, activeStep: 1 },
  parameters: {
    docs: {
      description: {
        story:
          "The stepper sidebar as it appears in the Aspire offer creation wizard, docked to the left of the form content area.",
      },
    },
  },
}

/**
 * Create Campaign wizard — five-step flow with the stepper at step 3.
 */
export const CreateCampaignWizard: Story = {
  name: "Real World — Create Campaign Wizard",
  decorators: [
    (Story: React.ComponentType) => (
      <div className="flex min-h-96 max-w-3xl border rounded-xl overflow-hidden">
        <Story />
        <div className="flex-1 p-6 space-y-4">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-foreground">
              Add Creators
            </h2>
            <p className="text-sm text-muted-foreground">
              Search and invite creators to join your campaign.
            </p>
          </div>
          <div className="h-40 rounded-lg border-2 border-dashed border-border bg-muted/20 flex items-center justify-center">
            <span className="text-sm text-muted-foreground">
              Creator search and selection UI
            </span>
          </div>
        </div>
      </div>
    ),
  ],
  args: { steps: CAMPAIGN_WIZARD_STEPS, activeStep: 2 },
  parameters: {
    docs: {
      description: {
        story:
          "Campaign creation wizard at step 3 (Add Creators). Two steps completed, three remaining.",
      },
    },
  },
}

// ─── INTERACTION TESTS ────────────────────────────

/**
 * Verifies that the correct step indicators are rendered for each state:
 * completed steps show checkmarks, active step is highlighted, upcoming
 * steps show their number.
 */
export const StepStatesTest: Story = {
  name: "Test: Step States Render Correctly",
  args: { steps: OFFER_WIZARD_STEPS, activeStep: 2 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Completed steps (0 and 1) should not show their number as text
    // Active step (2) should show "3" text
    const activeNumber = canvas.getByText("3")
    await expect(activeNumber).toBeInTheDocument()

    // Upcoming steps should show their numbers
    const upcomingNumber4 = canvas.getByText("4")
    await expect(upcomingNumber4).toBeInTheDocument()
    const upcomingNumber5 = canvas.getByText("5")
    await expect(upcomingNumber5).toBeInTheDocument()

    // Step labels should all be present
    await expect(canvas.getByText("Offer Basics")).toBeInTheDocument()
    await expect(canvas.getByText("Configure Discount")).toBeInTheDocument()
    await expect(canvas.getByText("Creator Earnings")).toBeInTheDocument()
    await expect(canvas.getByText("Advance Config")).toBeInTheDocument()
    await expect(canvas.getByText("Review & Create")).toBeInTheDocument()
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interaction test verifying that step indicators render correctly: completed steps show checkmarks (no number text), active step shows its number, and upcoming steps show their numbers. All step labels must be present.",
      },
    },
  },
}

/**
 * Verifies that the component renders as an aside landmark element.
 */
export const AsideLandmarkTest: Story = {
  name: "Test: Aside Landmark Element",
  args: { steps: THREE_STEPS, activeStep: 0 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // The component should render as a complementary landmark (aside)
    const aside = canvas.getByRole("complementary")
    await expect(aside).toBeInTheDocument()

    // First step should be active and show "1"
    const stepOne = canvas.getByText("1")
    await expect(stepOne).toBeInTheDocument()

    // All labels present
    await expect(canvas.getByText("Campaign Details")).toBeInTheDocument()
    await expect(canvas.getByText("Add Creators")).toBeInTheDocument()
    await expect(canvas.getByText("Review & Launch")).toBeInTheDocument()
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interaction test verifying the component renders as an `<aside>` element (complementary landmark) and all step labels are present.",
      },
    },
  },
}

/**
 * Verifies that all steps show completed state when activeStep exceeds array length.
 */
export const AllCompletedTest: Story = {
  name: "Test: All Steps Completed State",
  args: { steps: THREE_STEPS, activeStep: 5 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // When all steps are completed, no step numbers (1, 2, 3) should be visible as text
    // because they are replaced by check icons
    const stepOneText = canvas.queryByText("1")
    await expect(stepOneText).not.toBeInTheDocument()
    const stepTwoText = canvas.queryByText("2")
    await expect(stepTwoText).not.toBeInTheDocument()
    const stepThreeText = canvas.queryByText("3")
    await expect(stepThreeText).not.toBeInTheDocument()

    // Labels should still be present
    await expect(canvas.getByText("Campaign Details")).toBeInTheDocument()
    await expect(canvas.getByText("Add Creators")).toBeInTheDocument()
    await expect(canvas.getByText("Review & Launch")).toBeInTheDocument()
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interaction test verifying that when `activeStep` exceeds the step array length, no step numbers are visible (all replaced by check icons), while step labels remain.",
      },
    },
  },
}
