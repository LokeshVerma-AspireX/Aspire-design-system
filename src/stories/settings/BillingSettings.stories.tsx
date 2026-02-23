import type { Meta, StoryObj } from "@storybook/react"
import { BillingSettings } from "@/components/settings/BillingSettings"

const meta = {
  title: "6. Pages/Settings/BillingSettings",
  component: BillingSettings,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Billing settings with premium plan card (usage progress bars near-limit warnings), payment method display, invoice history table with status badges, and usage summary stats.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-3xl p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BillingSettings>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
