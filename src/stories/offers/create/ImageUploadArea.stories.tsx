import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { ImageUploadArea } from "@/components/shared/ImageUploadArea"

const meta = {
  title: "Offers/Create/ImageUploadArea",
  component: ImageUploadArea,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Dashed-border image upload zone. Supports drag-and-drop, click-to-browse, image preview with remove button, and a custom size recommendation label.",
      },
    },
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div className="max-w-lg">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ImageUploadArea>

export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = {
  args: {},
  parameters: { docs: { description: { story: "Default empty state — click or drag an image." } } },
}

export const CustomRecommendedSize: Story = {
  args: { recommendedSize: "Recommended: 800x400px · JPG or PNG" },
}

export const WithPreview: Story = {
  args: {
    previewUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80",
    onRemove: () => alert("Remove clicked"),
  },
  parameters: { docs: { description: { story: "Shows image preview with a × remove button in the top-right corner." } } },
}

export const Compact: Story = {
  args: { className: "min-h-24" },
  parameters: { docs: { description: { story: "Reduced height for tight layouts." } } },
}
