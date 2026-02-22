import type { Meta, StoryObj } from "@storybook/react"
import { ImageUploadArea } from "@/components/shared/ImageUploadArea"

const meta = {
  title: "Shared/ImageUploadArea",
  component: ImageUploadArea,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Dashed-border image upload zone. Click or drag an image file to upload. Shows a preview with a × remove button. Drag-over state transitions the border to a lime/primary color.",
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
  parameters: { docs: { description: { story: "Default empty state — click the zone or drag an image file." } } },
}

export const WithPreview: Story = {
  args: {
    previewUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80",
    onRemove: () => alert("Remove clicked"),
  },
  parameters: { docs: { description: { story: "Image preview with × remove button in the top-right corner." } } },
}

export const CustomRecommendedSize: Story = {
  args: { recommendedSize: "Recommended: 800x400px · JPG or PNG · Max 5MB" },
}

export const Compact: Story = {
  args: { className: "min-h-20 py-6" },
  parameters: { docs: { description: { story: "Smaller height for compact form layouts." } } },
}

export const TallAspect: Story = {
  args: {
    className: "aspect-video",
    recommendedSize: "Recommended: 1920x1080px (16:9)",
  },
  parameters: { docs: { description: { story: "Constrained to 16:9 ratio for video thumbnail uploads." } } },
}
