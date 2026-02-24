import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { MembersSettings } from "@/components/settings/MembersSettings"

const meta = {
  title: "6. Pages/Settings/MembersSettings",
  component: MembersSettings,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Team members management with invite dialog, members table (avatar, role badges, status dots, actions dropdown), and expandable role permissions matrix.",
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
} satisfies Meta<typeof MembersSettings>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
