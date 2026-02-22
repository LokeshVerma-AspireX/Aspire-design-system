import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { FormFooter } from "@/components/shared/FormFooter"

const meta = {
  title: "Shared/FormFooter",
  component: FormFooter,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Sticky wizard footer with a Close (×) button on the left and navigation buttons on the right. 'Previous' is hidden on the first step.",
      },
    },
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div className="max-w-2xl rounded-xl border border-border overflow-hidden">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FormFooter>

export default meta
type Story = StoryObj<typeof meta>

export const FirstStep: Story = {
  args: {
    showPrevious: false,
    nextLabel: "Continue",
    onClose: () => {},
    onNext: () => {},
  },
  parameters: { docs: { description: { story: "No Previous button — used on the first wizard step." } } },
}

export const MiddleStep: Story = {
  args: {
    showPrevious: true,
    nextLabel: "Next",
    onClose: () => {},
    onPrevious: () => {},
    onNext: () => {},
  },
}

export const LastStep: Story = {
  args: {
    showPrevious: true,
    nextLabel: "Create Offer",
    onClose: () => {},
    onPrevious: () => {},
    onNext: () => {},
  },
  parameters: { docs: { description: { story: "Final step — CTA button label changes to 'Create Offer'." } } },
}

export const NextDisabled: Story = {
  args: {
    showPrevious: true,
    nextLabel: "Next",
    nextDisabled: true,
    onClose: () => {},
    onPrevious: () => {},
    onNext: () => {},
  },
  parameters: { docs: { description: { story: "Next button disabled — used when required fields are missing." } } },
}
