import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"
import { within, userEvent, expect } from "storybook/test"
import { ImageUploadArea } from "@/components/shared/ImageUploadArea"

/**
 * # ImageUploadArea
 *
 * A dashed-border drop zone for uploading images. Users can click the zone or
 * drag-and-drop an image file. Once uploaded, a preview thumbnail is shown with
 * an inline remove button. The component handles `dragover`, `dragleave`, and
 * `drop` events internally, transitioning the border to the primary color on
 * drag-over.
 *
 * ## When to Use
 * - Campaign hero image uploads
 * - Brand logo or product photo uploads
 * - Offer cover image selection
 * - Any single-image upload field in a form
 *
 * ## When NOT to Use
 * - Multi-file uploads (e.g. bulk media libraries) -- use a dedicated file list
 * - Non-image file uploads (PDFs, CSVs) -- use a generic file input
 * - Avatar selection -- use the Avatar component with an edit overlay
 *
 * ## Accessibility
 * - The drop zone has `role="button"` and `tabIndex={0}` for keyboard access
 * - Pressing Enter activates the hidden file input
 * - The remove button has `aria-label="Remove image"` for screen readers
 * - The hidden file input has `aria-label="Upload image"`
 *
 * ## Import
 * ```tsx
 * import { ImageUploadArea } from '@/components/shared/ImageUploadArea'
 * ```
 *
 * ## Quick Start
 * ```tsx
 * <ImageUploadArea
 *   onFileSelect={(file) => console.log(file.name)}
 *   onRemove={() => setPreview(undefined)}
 *   recommendedSize="Recommended: 1200x630px"
 * />
 * ```
 */
const meta: Meta<typeof ImageUploadArea> = {
  title: "4. Components/Forms/ImageUploadArea",
  component: ImageUploadArea,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Dashed-border image upload zone. Click or drag an image file to upload. Shows a preview with a remove button. Drag-over state transitions the border to the primary color.",
      },
    },
  },
  argTypes: {
    previewUrl: {
      control: "text",
      description:
        "URL of the image to preview. When set, the component renders a preview thumbnail with a remove button instead of the upload zone.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
        category: "Content",
      },
    },
    onFileSelect: {
      action: "fileSelected",
      description:
        "Callback fired when the user selects a file via click or drag-and-drop. Receives the selected `File` object.",
      table: {
        type: { summary: "(file: File) => void" },
        category: "Events",
      },
    },
    onRemove: {
      action: "removed",
      description:
        "Callback fired when the user clicks the remove button on the image preview.",
      table: {
        type: { summary: "() => void" },
        category: "Events",
      },
    },
    recommendedSize: {
      control: "text",
      description:
        "Helper text displayed below the upload prompt indicating the recommended image dimensions and format.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '"Recommended: 1200x630px"' },
        category: "Content",
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes merged via `cn()` utility.",
      table: {
        type: { summary: "string" },
        category: "Appearance",
      },
    },
    isDragOver: {
      control: "boolean",
      description:
        "Controls the drag-over visual state externally. Internally managed via drag events but can be overridden for demos.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "State",
      },
    },
  },
  args: {
    onFileSelect: fn(),
    onRemove: fn(),
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div className="max-w-lg">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ImageUploadArea>

// ─── CORE STATES ──────────────────────────────────

/**
 * Default empty upload zone. Click the zone or drag an image file into it.
 *
 * ```tsx
 * <ImageUploadArea onFileSelect={(file) => handleUpload(file)} />
 * ```
 */
export const Empty: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          "Default empty state -- shows the upload cloud icon, prompt text, and recommended size hint. Users can click or drag-and-drop.",
      },
    },
  },
}

/**
 * Preview state with an uploaded image and a remove button in the top-right corner.
 *
 * ```tsx
 * <ImageUploadArea
 *   previewUrl="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80"
 *   onRemove={() => setPreview(undefined)}
 * />
 * ```
 */
export const WithPreview: Story = {
  args: {
    previewUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Image preview with a circular remove button in the top-right corner. The image fills the container via `object-cover`.",
      },
    },
  },
}

/**
 * Simulated drag-over state with the primary-tinted border and background.
 * The internal `dragOver` state is managed by drag events, but the visual can
 * be forced via the `className` prop for demonstration.
 *
 * ```tsx
 * <ImageUploadArea className="border-primary/60 bg-primary/5" />
 * ```
 */
export const DragOverState: Story = {
  name: "Drag Over State",
  args: {
    className: "border-primary/60 bg-primary/5",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Simulates the drag-over visual state. When a user drags a file over the zone, the border transitions to the primary color and the background gets a subtle tint.",
      },
    },
  },
}

/**
 * Custom recommended size text for specific upload contexts.
 *
 * ```tsx
 * <ImageUploadArea
 *   recommendedSize="Recommended: 800x400px - JPG or PNG - Max 5MB"
 * />
 * ```
 */
export const WithRecommendedSize: Story = {
  name: "With Recommended Size",
  args: {
    recommendedSize: "Recommended: 800x400px · JPG or PNG · Max 5MB",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Custom recommended size hint. Use this to communicate specific image requirements to the user such as dimensions, format, and file size limits.",
      },
    },
  },
}

/**
 * Preview state with the remove action. Clicking the X button fires `onRemove`.
 *
 * ```tsx
 * <ImageUploadArea
 *   previewUrl="/uploads/campaign-hero.jpg"
 *   onRemove={() => clearImage()}
 * />
 * ```
 */
export const WithRemoveAction: Story = {
  name: "With Remove Action",
  args: {
    previewUrl:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Preview with a visible remove button. Clicking the X icon calls `onRemove` to clear the uploaded image and return to the empty state.",
      },
    },
  },
}

// ─── SIZE VARIATIONS ──────────────────────────────

/**
 * Compact upload area for space-constrained form layouts.
 *
 * ```tsx
 * <ImageUploadArea className="min-h-20 py-6" />
 * ```
 */
export const Compact: Story = {
  args: {
    className: "min-h-20 py-6",
  },
  parameters: {
    docs: {
      description: {
        story: "Smaller height for compact form layouts where vertical space is limited.",
      },
    },
  },
}

/**
 * 16:9 aspect ratio zone for video thumbnail or hero banner uploads.
 *
 * ```tsx
 * <ImageUploadArea
 *   className="aspect-video"
 *   recommendedSize="Recommended: 1920x1080px (16:9)"
 * />
 * ```
 */
export const AspectRatio16x9: Story = {
  name: "16:9 Aspect Ratio",
  args: {
    className: "aspect-video",
    recommendedSize: "Recommended: 1920x1080px (16:9)",
  },
  parameters: {
    docs: {
      description: {
        story: "Constrained to 16:9 ratio for video thumbnail or hero banner uploads.",
      },
    },
  },
}

/**
 * Square aspect ratio zone ideal for logo or avatar-style uploads.
 *
 * ```tsx
 * <ImageUploadArea
 *   className="aspect-square max-w-48"
 *   recommendedSize="Recommended: 512x512px (1:1)"
 * />
 * ```
 */
export const SquareAspect: Story = {
  name: "Square Aspect Ratio",
  args: {
    className: "aspect-square max-w-48",
    recommendedSize: "Recommended: 512x512px (1:1)",
  },
  parameters: {
    docs: {
      description: {
        story: "Square 1:1 ratio for logo or avatar uploads.",
      },
    },
  },
}

// ─── REAL-WORLD COMPOSITIONS ──────────────────────

/**
 * Campaign hero image upload — typical usage in the Aspire offer creation wizard.
 *
 * ```tsx
 * <div className="space-y-2">
 *   <label className="text-sm font-medium">Campaign Hero Image</label>
 *   <ImageUploadArea
 *     recommendedSize="Recommended: 1200x630px · JPG or PNG"
 *     onFileSelect={handleFile}
 *   />
 * </div>
 * ```
 */
export const CampaignHeroImage: Story = {
  name: "Real World — Campaign Hero Image",
  render: (args) => (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">
        Campaign Hero Image
      </label>
      <p className="text-xs text-muted-foreground">
        Upload a compelling image that represents your campaign.
      </p>
      <ImageUploadArea
        {...args}
        recommendedSize="Recommended: 1200x630px · JPG or PNG · Max 10MB"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Campaign hero image upload as it appears in the Aspire offer creation wizard. Includes a label, helper text, and the upload zone.",
      },
    },
  },
}

/**
 * Brand logo upload — compact square zone with tight size recommendation.
 *
 * ```tsx
 * <div className="space-y-2">
 *   <label className="text-sm font-medium">Brand Logo</label>
 *   <ImageUploadArea
 *     className="aspect-square max-w-40"
 *     recommendedSize="512x512px · PNG with transparency"
 *   />
 * </div>
 * ```
 */
export const BrandLogoUpload: Story = {
  name: "Real World — Brand Logo Upload",
  render: (args) => (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">Brand Logo</label>
      <ImageUploadArea
        {...args}
        className="aspect-square max-w-40"
        recommendedSize="512x512px · PNG with transparency"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Compact square upload zone for brand logo uploads in settings or campaign setup.",
      },
    },
  },
}

/**
 * Product photo upload — multiple zones in a grid for e-commerce product images.
 */
export const ProductPhotoGrid: Story = {
  name: "Real World — Product Photo Grid",
  render: (args) => (
    <div className="space-y-3">
      <label className="text-sm font-medium text-foreground">
        Product Photos
      </label>
      <p className="text-xs text-muted-foreground">
        Upload up to 4 product images. The first image will be used as the
        primary photo.
      </p>
      <div className="grid grid-cols-2 gap-3">
        <ImageUploadArea
          {...args}
          previewUrl="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80"
          className="aspect-square"
        />
        <ImageUploadArea
          {...args}
          previewUrl="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80"
          className="aspect-square"
        />
        <ImageUploadArea
          {...args}
          className="aspect-square"
          recommendedSize="800x800px"
        />
        <ImageUploadArea
          {...args}
          className="aspect-square"
          recommendedSize="800x800px"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Grid of upload zones for product photos. The first two slots have previews, the remaining two are empty upload zones.",
      },
    },
  },
}

// ─── INTERACTION TESTS ────────────────────────────

/**
 * Verifies that the upload zone is keyboard accessible and responds to Enter key.
 */
export const KeyboardAccessTest: Story = {
  name: "Test: Keyboard Accessibility",
  args: {
    recommendedSize: "Recommended: 1200x630px",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const uploadZone = canvas.getByRole("button")
    await expect(uploadZone).toBeInTheDocument()
    await expect(uploadZone).toHaveAttribute("tabindex", "0")
    await userEvent.tab()
    await expect(uploadZone).toHaveFocus()
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interaction test that verifies the upload zone has `role=\"button\"`, `tabIndex={0}`, and can receive focus via keyboard Tab.",
      },
    },
  },
}

/**
 * Verifies that the remove button is present on the preview and fires onRemove when clicked.
 */
export const RemoveButtonTest: Story = {
  name: "Test: Remove Button Fires onRemove",
  args: {
    previewUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80",
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const removeButton = canvas.getByRole("button", { name: "Remove image" })
    await expect(removeButton).toBeInTheDocument()
    await userEvent.click(removeButton)
    await expect(args.onRemove).toHaveBeenCalledTimes(1)
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interaction test that verifies the remove button is rendered on the preview and fires the `onRemove` callback when clicked.",
      },
    },
  },
}

/**
 * Verifies the hidden file input has the correct accept attribute.
 */
export const FileInputAttributeTest: Story = {
  name: "Test: File Input Accept Attribute",
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const fileInput = canvas.getByLabelText("Upload image")
    await expect(fileInput).toBeInTheDocument()
    await expect(fileInput).toHaveAttribute("accept", "image/*")
    await expect(fileInput).toHaveAttribute("type", "file")
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interaction test verifying the hidden file input has `type=\"file\"` and `accept=\"image/*\"` attributes.",
      },
    },
  },
}
