import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { IntegrationsSettings } from "@/components/settings/IntegrationsSettings"

const meta = {
  title: "6. Pages/Settings/IntegrationsSettings",
  component: IntegrationsSettings,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Integrations management with tab-filtered app cards (connected, error, not connected states), Shopify spotlight card with sync stats, and API keys table with generate/copy/revoke functionality.",
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
} satisfies Meta<typeof IntegrationsSettings>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
