import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { StepperSidebar } from "@/components/shared/StepperSidebar"

const OFFER_STEPS = [
  { id: "offer-basics",       label: "Offer Basics" },
  { id: "configure-discount", label: "Configure Discount" },
  { id: "creator-earnings",   label: "Creator Earnings" },
  { id: "advance-config",     label: "Advance Config" },
  { id: "review-create",      label: "Review & Create" },
]

const meta = {
  title: "6. Pages/Offers/CreateOffer/StepperSidebar",
  component: StepperSidebar,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Vertical step indicator used in multi-step wizards. Completed steps show a green checkmark, active step is highlighted, upcoming steps are gray.",
      },
    },
  },
  args: {
    steps: OFFER_STEPS,
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div className="h-[500px] w-64 border rounded-xl overflow-hidden">
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
  parameters: { docs: { description: { story: "Step 3 active — first two completed with green checkmarks." } } },
}

export const LastStepActive: Story = {
  args: { activeStep: 4 },
  parameters: { docs: { description: { story: "Last step active — first four completed." } } },
}

export const AllCompleted: Story = {
  args: { activeStep: 5 },
  parameters: { docs: { description: { story: "All steps completed (activeStep beyond array length)." } } },
}
