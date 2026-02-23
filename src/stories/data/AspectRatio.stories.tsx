import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "storybook/test"
import { within, expect } from "storybook/test"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Play,
  Image as ImageIcon,
  MapPin,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Instagram,
  Camera,
} from "lucide-react"

/**
 * # AspectRatio
 *
 * Displays content within a desired aspect ratio. Built on Radix UI's
 * AspectRatio primitive, it uses native CSS `aspect-ratio` under the hood
 * to maintain consistent proportions regardless of container width.
 *
 * ## When to Use
 * - To maintain consistent image proportions across a grid or list
 * - For video thumbnails and embed placeholders
 * - When displaying media content that should not be distorted
 * - For consistent card thumbnails in carousels or grids
 * - To create placeholder areas with predictable dimensions
 *
 * ## When NOT to Use
 * - For text-only content where height should be determined by content
 * - When the aspect ratio does not matter (e.g., full-width banners that fill viewport)
 * - For elements that should resize based on their content, not their width
 *
 * ## Accessibility
 * - Always include `alt` text on images inside the AspectRatio
 * - For decorative images, use `alt=""`
 * - For video placeholders, ensure play button is keyboard-accessible
 * - The container itself is a `<div>` with no semantic role
 *
 * ## Import
 * ```tsx
 * import { AspectRatio } from '@/components/ui/aspect-ratio'
 * ```
 *
 * ## Quick Start
 * ```tsx
 * <div className="w-72">
 *   <AspectRatio ratio={16 / 9} className="bg-muted rounded-md overflow-hidden">
 *     <img src="photo.jpg" alt="Description" className="h-full w-full object-cover" />
 *   </AspectRatio>
 * </div>
 * ```
 */
const meta: Meta<typeof AspectRatio> = {
  title: "4. Components/Data Display/AspectRatio",
  component: AspectRatio,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Displays content within a chosen aspect ratio. Uses native CSS aspect-ratio via Radix UI. Ensures consistent media proportions across layouts.",
      },
    },
  },
  argTypes: {
    ratio: {
      control: { type: "number", min: 0.1, max: 4, step: 0.1 },
      description:
        'Width divided by Height. Common ratios: 16/9 (widescreen), 4/3 (standard), 1 (square), 3/4 (portrait), 9/16 (vertical video).',
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "1" },
        category: "Configuration",
      },
    },
    className: {
      control: "text",
      description:
        "Additional CSS classes applied to the inner container. Use for background color, rounded corners, overflow hidden, etc.",
      table: {
        type: { summary: "string" },
        category: "Appearance",
      },
    },
    children: {
      control: false,
      description:
        "Content rendered inside the aspect ratio container. Typically an image, video, or placeholder.",
      table: {
        type: { summary: "React.ReactNode" },
        category: "Content",
      },
    },
  },
  args: {
    ratio: 16 / 9,
  },
}

export default meta
type Story = StoryObj<typeof meta>

// ─── RATIO VARIANTS ─────────────────────────────────

/**
 * 16:9 widescreen ratio -- the most common for video and hero images.
 *
 * ```tsx
 * <AspectRatio ratio={16 / 9} className="bg-muted rounded-md overflow-hidden">
 *   <img src="photo.jpg" alt="Hero" className="h-full w-full object-cover" />
 * </AspectRatio>
 * ```
 */
export const Widescreen: Story = {
  name: "16:9 Widescreen",
  args: {
    ratio: 16 / 9,
  },
  render: (args) => (
    <div className="w-72">
      <AspectRatio
        ratio={args.ratio}
        className="bg-muted rounded-md overflow-hidden"
      >
        <img
          src="https://images.unsplash.com/photo-1699900897867-a21de359f3bb?w=600&auto=format&fit=crop"
          alt="Design workspace"
          className="h-full w-full object-cover"
        />
      </AspectRatio>
    </div>
  ),
}

/**
 * 4:3 standard ratio -- traditional photo and presentation format.
 *
 * ```tsx
 * <AspectRatio ratio={4 / 3} className="bg-muted rounded-md overflow-hidden">
 *   <img src="photo.jpg" alt="Standard" className="h-full w-full object-cover" />
 * </AspectRatio>
 * ```
 */
export const Standard: Story = {
  name: "4:3 Standard",
  args: {
    ratio: 4 / 3,
  },
  render: (args) => (
    <div className="w-64">
      <AspectRatio
        ratio={args.ratio}
        className="bg-muted rounded-md overflow-hidden"
      >
        <img
          src="https://images.unsplash.com/photo-1699900897867-a21de359f3bb?w=500&auto=format&fit=crop"
          alt="Design workspace"
          className="h-full w-full object-cover"
        />
      </AspectRatio>
    </div>
  ),
}

/**
 * 1:1 square ratio -- used for profile avatars, thumbnails, and Instagram posts.
 *
 * ```tsx
 * <AspectRatio ratio={1} className="bg-muted rounded-md overflow-hidden">
 *   <img src="photo.jpg" alt="Square" className="h-full w-full object-cover" />
 * </AspectRatio>
 * ```
 */
export const Square: Story = {
  name: "1:1 Square",
  args: {
    ratio: 1,
  },
  render: (args) => (
    <div className="w-48">
      <AspectRatio
        ratio={args.ratio}
        className="bg-muted rounded-md overflow-hidden"
      >
        <img
          src="https://images.unsplash.com/photo-1699900897867-a21de359f3bb?w=400&auto=format&fit=crop"
          alt="Design workspace"
          className="h-full w-full object-cover"
        />
      </AspectRatio>
    </div>
  ),
}

/**
 * 3:4 portrait ratio -- used for product images and portrait photos.
 *
 * ```tsx
 * <AspectRatio ratio={3 / 4} className="bg-muted rounded-md overflow-hidden">
 *   <img src="photo.jpg" alt="Portrait" className="h-full w-full object-cover" />
 * </AspectRatio>
 * ```
 */
export const Portrait: Story = {
  name: "3:4 Portrait",
  args: {
    ratio: 3 / 4,
  },
  render: (args) => (
    <div className="w-40">
      <AspectRatio
        ratio={args.ratio}
        className="bg-muted rounded-md overflow-hidden"
      >
        <img
          src="https://images.unsplash.com/photo-1699900897867-a21de359f3bb?w=300&auto=format&fit=crop"
          alt="Design workspace"
          className="h-full w-full object-cover"
        />
      </AspectRatio>
    </div>
  ),
}

// ─── WITH CONTENT TYPES ─────────────────────────────

/**
 * AspectRatio with a placeholder instead of a real image.
 * Shows the ratio label and a skeleton-like background.
 *
 * ```tsx
 * <AspectRatio ratio={16 / 9} className="rounded-md border bg-muted/50 flex items-center justify-center">
 *   <div className="text-center">
 *     <div className="text-2xl font-bold">16:9</div>
 *     <p className="text-xs">Placeholder</p>
 *   </div>
 * </AspectRatio>
 * ```
 */
export const WithPlaceholder: Story = {
  name: "With Placeholder",
  render: () => (
    <div className="w-72">
      <AspectRatio
        ratio={16 / 9}
        className="rounded-md border bg-muted/50 flex items-center justify-center"
      >
        <div className="text-center space-y-2 text-muted-foreground">
          <ImageIcon className="h-8 w-8 mx-auto opacity-50" />
          <div className="text-2xl font-bold">16:9</div>
          <p className="text-xs">Placeholder content</p>
        </div>
      </AspectRatio>
    </div>
  ),
}

/**
 * AspectRatio used as a video thumbnail with a play button overlay.
 *
 * ```tsx
 * <AspectRatio ratio={16 / 9} className="bg-muted overflow-hidden">
 *   <img src="thumbnail.jpg" alt="Video" className="h-full w-full object-cover" />
 *   <div className="absolute inset-0 flex items-center justify-center bg-black/30">
 *     <Play className="h-5 w-5" />
 *   </div>
 * </AspectRatio>
 * ```
 */
export const VideoPlaceholder: Story = {
  name: "Video Placeholder",
  render: () => (
    <div className="w-80 space-y-2 rounded-lg overflow-hidden border bg-card">
      <div className="relative">
        <AspectRatio ratio={16 / 9} className="bg-muted overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=700&auto=format&fit=crop"
            alt="Design tokens tutorial"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-black shadow-lg">
              <Play className="h-5 w-5 ml-0.5" />
            </div>
          </div>
          <Badge className="absolute bottom-2 right-2 bg-black/80 text-white text-xs">
            12:34
          </Badge>
        </AspectRatio>
      </div>
      <div className="p-3 space-y-1">
        <p className="text-sm font-semibold leading-tight">
          Building a Design System from Scratch with Tailwind CSS
        </p>
        <p className="text-xs text-muted-foreground">
          Aspire Design &middot; 42K views
        </p>
      </div>
    </div>
  ),
}

/**
 * AspectRatio used as a map embed placeholder with a location pin.
 *
 * ```tsx
 * <AspectRatio ratio={16 / 9} className="rounded-md bg-muted/30 border">
 *   <div className="flex flex-col items-center justify-center h-full">
 *     <MapPin className="h-6 w-6" />
 *     <p className="text-xs">Location</p>
 *   </div>
 * </AspectRatio>
 * ```
 */
export const MapPlaceholder: Story = {
  name: "Map Placeholder",
  render: () => (
    <div className="w-80">
      <AspectRatio
        ratio={16 / 9}
        className="rounded-md bg-muted/30 border flex items-center justify-center"
      >
        <div className="text-center space-y-2 text-muted-foreground">
          <MapPin className="h-8 w-8 mx-auto" />
          <div>
            <p className="text-sm font-medium text-foreground">
              Los Angeles, CA
            </p>
            <p className="text-xs">Creator location</p>
          </div>
          <Button variant="outline" size="sm" className="text-xs">
            Open in Maps
          </Button>
        </div>
      </AspectRatio>
    </div>
  ),
}

// ─── ALL RATIOS GALLERY ─────────────────────────────

/**
 * Side-by-side comparison of all common aspect ratios with labels.
 */
export const AllRatios: Story = {
  name: "All Common Ratios",
  render: () => {
    const ratios = [
      { ratio: 1, label: "1:1 Square", w: "w-32" },
      { ratio: 16 / 9, label: "16:9 Widescreen", w: "w-48" },
      { ratio: 4 / 3, label: "4:3 Standard", w: "w-40" },
      { ratio: 3 / 4, label: "3:4 Portrait", w: "w-24" },
      { ratio: 9 / 16, label: "9:16 Vertical", w: "w-20" },
      { ratio: 21 / 9, label: "21:9 Ultra-wide", w: "w-56" },
    ]

    return (
      <div className="flex flex-wrap gap-4 items-end">
        {ratios.map(({ ratio, label, w }) => (
          <div key={label} className={`${w} space-y-1`}>
            <AspectRatio
              ratio={ratio}
              className="rounded-md bg-muted/50 border flex items-center justify-center"
            >
              <span className="text-xs text-muted-foreground font-mono">
                {label.split(" ")[0]}
              </span>
            </AspectRatio>
            <p className="text-xs text-center text-muted-foreground">
              {label}
            </p>
          </div>
        ))}
      </div>
    )
  },
}

// ─── ASPIRE REAL-WORLD COMPOSITIONS ─────────────────

/**
 * Content Thumbnail from the Posts Grid on the Analytics page.
 * A 1:1 square ratio with an image, overlay gradient, platform
 * badge, and engagement stats.
 *
 * ```tsx
 * <AspectRatio ratio={1} className="bg-muted rounded-md overflow-hidden">
 *   <img src="post.jpg" alt="Post" className="h-full w-full object-cover" />
 *   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
 *   <div className="absolute bottom-2 left-2">
 *     <Badge>Instagram</Badge>
 *     <div>...engagement stats...</div>
 *   </div>
 * </AspectRatio>
 * ```
 */
export const ContentThumbnail: Story = {
  name: "Aspire -- Content Thumbnail",
  render: () => (
    <div className="w-64">
      <AspectRatio
        ratio={1}
        className="bg-muted rounded-lg overflow-hidden relative group cursor-pointer"
      >
        <img
          src="https://images.unsplash.com/photo-1699900897867-a21de359f3bb?w=400&auto=format&fit=crop"
          alt="Creator post thumbnail"
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute top-2 right-2">
          <Badge className="bg-pink-500 text-white text-[10px] gap-1">
            <Instagram className="h-2.5 w-2.5" />
            Reel
          </Badge>
        </div>
        <div className="absolute bottom-2 left-2 right-2">
          <p className="text-white text-xs font-medium truncate mb-1">
            Summer skincare routine
          </p>
          <div className="flex items-center gap-3 text-white/80 text-[10px]">
            <span className="flex items-center gap-0.5">
              <Heart className="h-2.5 w-2.5" />
              12.4K
            </span>
            <span className="flex items-center gap-0.5">
              <MessageCircle className="h-2.5 w-2.5" />
              892
            </span>
            <span className="flex items-center gap-0.5">
              <Share2 className="h-2.5 w-2.5" />
              234
            </span>
          </div>
        </div>
      </AspectRatio>
    </div>
  ),
}

/**
 * Campaign Hero Image from the Campaign Detail page.
 * Uses a 16:9 ratio with campaign name overlay and action buttons.
 *
 * ```tsx
 * <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg overflow-hidden relative">
 *   <img src="hero.jpg" alt="Campaign" className="h-full w-full object-cover" />
 *   <div className="absolute inset-0 bg-black/40">
 *     <h2>Campaign Name</h2>
 *     <Badge>Status</Badge>
 *   </div>
 * </AspectRatio>
 * ```
 */
export const CampaignHeroImage: Story = {
  name: "Aspire -- Campaign Hero Image",
  render: () => (
    <div className="w-[480px]">
      <AspectRatio
        ratio={16 / 9}
        className="bg-muted rounded-lg overflow-hidden relative"
      >
        <img
          src="https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=800&auto=format&fit=crop"
          alt="Summer Glow 2026 Campaign"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge className="bg-emerald-500 text-white">Active</Badge>
              <Badge variant="outline" className="border-white/30 text-white">
                12 Creators
              </Badge>
            </div>
            <h2 className="text-2xl font-bold text-white">
              Summer Glow 2026
            </h2>
            <p className="text-sm text-white/80">
              Promote the new summer skincare line with lifestyle and beauty
              creators
            </p>
          </div>
        </div>
      </AspectRatio>
    </div>
  ),
}

/**
 * Post Preview Grid showing multiple posts with different aspect ratios.
 * Demonstrates how AspectRatio keeps thumbnails uniform in a grid layout.
 *
 * ```tsx
 * <div className="grid grid-cols-3 gap-2">
 *   <AspectRatio ratio={1} className="bg-muted rounded-md">
 *     <img src="post.jpg" alt="Post" className="h-full w-full object-cover" />
 *   </AspectRatio>
 * </div>
 * ```
 */
export const PostPreviewGrid: Story = {
  name: "Aspire -- Post Preview Grid",
  render: () => {
    const posts = [
      {
        type: "Photo",
        icon: Camera,
        likes: "12.4K",
        comments: "892",
      },
      {
        type: "Reel",
        icon: Play,
        likes: "34.1K",
        comments: "2.1K",
      },
      {
        type: "Photo",
        icon: Camera,
        likes: "8.7K",
        comments: "456",
      },
      {
        type: "Reel",
        icon: Play,
        likes: "15.8K",
        comments: "1.3K",
      },
      {
        type: "Photo",
        icon: Camera,
        likes: "22.3K",
        comments: "1.8K",
      },
      {
        type: "Photo",
        icon: Camera,
        likes: "6.5K",
        comments: "312",
      },
    ]

    return (
      <div className="w-[360px]">
        <div className="grid grid-cols-3 gap-1">
          {posts.map((post, i) => {
            const Icon = post.icon
            return (
              <AspectRatio
                key={i}
                ratio={1}
                className="bg-muted rounded-sm overflow-hidden relative group cursor-pointer"
              >
                <div className="h-full w-full bg-gradient-to-br from-muted to-muted-foreground/10 flex items-center justify-center">
                  <Icon className="h-6 w-6 text-muted-foreground/40" />
                </div>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="flex items-center gap-3 text-white text-xs">
                    <span className="flex items-center gap-1">
                      <Heart className="h-3 w-3 fill-white" />
                      {post.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="h-3 w-3" />
                      {post.comments}
                    </span>
                  </div>
                </div>
                {post.type === "Reel" && (
                  <div className="absolute top-1 right-1">
                    <Play className="h-3 w-3 text-white drop-shadow-md" />
                  </div>
                )}
              </AspectRatio>
            )
          })}
        </div>
      </div>
    )
  },
}

// ─── INTERACTION TESTS ─────────────────────────────

/**
 * Verifies that the AspectRatio component renders with the correct
 * data-slot attribute and contains its child content.
 */
export const RenderTest: Story = {
  name: "Test: Renders with correct structure",
  render: () => (
    <div className="w-48" data-testid="ratio-container">
      <AspectRatio ratio={16 / 9} className="bg-muted rounded-md">
        <p data-testid="ratio-content">Content inside aspect ratio</p>
      </AspectRatio>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Container should be in the DOM
    const container = canvas.getByTestId("ratio-container")
    await expect(container).toBeInTheDocument()

    // Content should be rendered inside
    const content = canvas.getByTestId("ratio-content")
    await expect(content).toBeInTheDocument()
    await expect(content).toHaveTextContent("Content inside aspect ratio")

    // The aspect-ratio wrapper should have the data-slot attribute
    const aspectRatioEl = canvasElement.querySelector(
      '[data-slot="aspect-ratio"]'
    )
    await expect(aspectRatioEl).toBeInTheDocument()
  },
}

/**
 * Verifies that images inside AspectRatio have proper alt text
 * for accessibility compliance.
 */
export const ImageAccessibilityTest: Story = {
  name: "Test: Image alt text present",
  render: () => (
    <div className="w-48">
      <AspectRatio ratio={16 / 9} className="bg-muted rounded-md overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1699900897867-a21de359f3bb?w=400&auto=format&fit=crop"
          alt="Accessible design workspace image"
          className="h-full w-full object-cover"
        />
      </AspectRatio>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Image should have alt text
    const image = canvas.getByRole("img")
    await expect(image).toBeInTheDocument()
    await expect(image).toHaveAttribute(
      "alt",
      "Accessible design workspace image"
    )

    // Image should have object-cover class for proper aspect ratio handling
    await expect(image).toHaveClass("object-cover")
  },
}
