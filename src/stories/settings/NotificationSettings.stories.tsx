import type { Meta, StoryObj } from "@storybook/react"
import { NotificationSettings } from "@/components/settings/NotificationSettings"

const meta = {
  title: "6. Pages/Settings/NotificationSettings",
  component: NotificationSettings,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Notification preferences with master toggle, grouped notification categories (Campaign, Creator, Content, Billing, Weekly Digest) each with Email/Push/In-App toggles, quiet hours, and test notification.",
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
} satisfies Meta<typeof NotificationSettings>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
