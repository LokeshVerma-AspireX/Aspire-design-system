import type { Meta, StoryObj } from "@storybook/react"
import { DiscountValueInput } from "@/components/shared/DiscountValueInput"

const meta = {
  title: "Shared/DiscountValueInput",
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
  decorators: [
    (Story: React.ComponentType) => (
      <div className="max-w-xs">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DiscountValueInput>

export default meta
type Story = StoryObj<typeof meta>

export const PercentMode: Story = {
  args: { mode: "percent", value: 10 },
  parameters: { docs: { description: { story: "Percent mode — shows '% Percent' tab active and % suffix." } } },
}

export const FlatMode: Story = {
  args: { mode: "flat", value: 20 },
  parameters: { docs: { description: { story: "Flat mode — shows '$ Flat' tab active and $ prefix." } } },
}

export const Empty: Story = {
  args: { mode: "percent", value: "" },
}
