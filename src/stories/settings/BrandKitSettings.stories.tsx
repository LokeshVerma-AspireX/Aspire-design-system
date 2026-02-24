import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BrandKitSettings } from "@/components/settings/BrandKitSettings"

const meta = {
  title: "6. Pages/Settings/BrandKitSettings",
  component: BrandKitSettings,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Brand kit management with logo upload (light/dark preview areas, logo variants), interactive brand color swatches with live preview, typography font selector with type scale, and brand voice tone selector with sample outreach text.",
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
} satisfies Meta<typeof BrandKitSettings>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
