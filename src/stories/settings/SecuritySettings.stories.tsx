import type { Meta, StoryObj } from "@storybook/react"
import { SecuritySettings } from "@/components/settings/SecuritySettings"

const meta = {
  title: "6. Pages/Settings/SecuritySettings",
  component: SecuritySettings,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Security settings with password management (change password form + strength meter), two-factor authentication (enable/disable with QR code setup and recovery codes), active sessions table, and login history.",
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
} satisfies Meta<typeof SecuritySettings>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
