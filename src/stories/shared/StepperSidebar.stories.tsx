import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { StepperSidebar } from "@/components/shared/StepperSidebar"

const FIVE_STEPS = [
  { id: "offer-basics",       label: "Offer Basics" },
  { id: "configure-discount", label: "Configure Discount" },
  { id: "creator-earnings",   label: "Creator Earnings" },
  { id: "advance-config",     label: "Advance Config" },
  { id: "review-create",      label: "Review & Create" },
]

const THREE_STEPS = [
  { id: "details",  label: "Campaign Details" },
  { id: "creators", label: "Add Creators" },
  { id: "review",   label: "Review & Launch" },
]

const meta = {
  title: "Shared/StepperSidebar",
  component: StepperSidebar,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Vertical multi-step indicator. Completed steps show a green checkmark, active step is highlighted in lime (primary), upcoming steps are muted gray.",
      },
    },
  },
  args: { steps: FIVE_STEPS },
  decorators: [
    (Story: React.ComponentType) => (
      <div className="w-56 border rounded-xl overflow-hidden min-h-64">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof StepperSidebar>

export default meta
type Story = StoryObj<typeof meta>

export const Step1Active: Story = {
  args: { activeStep: 0 },
  parameters: { docs: { description: { story: "First step active — all others upcoming." } } },
}

export const Step3Active: Story = {
  args: { activeStep: 2 },
  parameters: { docs: { description: { story: "Steps 1–2 completed (green checkmarks), step 3 active." } } },
}

export const LastStepActive: Story = {
  args: { activeStep: 4 },
  parameters: { docs: { description: { story: "All previous steps completed; last step active." } } },
}

export const ThreeSteps: Story = {
  args: { steps: THREE_STEPS, activeStep: 1 },
  parameters: { docs: { description: { story: "Shorter 3-step wizard — step 2 active." } } },
}

export const AllCompleted: Story = {
  args: { activeStep: 5 },
  parameters: { docs: { description: { story: "activeStep beyond array length — all steps show green checkmarks." } } },
}
