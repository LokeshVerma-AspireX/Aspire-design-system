import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ProfileSettings } from "@/components/settings/ProfileSettings"

const meta = {
  title: "6. Pages/Settings/ProfileSettings",
  component: ProfileSettings,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Profile settings with avatar upload, form fields (name, email, phone, timezone, language, bio), connected accounts, and danger zone. Shows unsaved changes bar when form is modified.",
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
} satisfies Meta<typeof ProfileSettings>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
