import type { Meta, StoryObj } from "@storybook/react"
import { within, expect } from "storybook/test"
import { AspireLogo } from "@/components/layout/AspireLogo"

/**
 * # AspireLogo
 *
 * The Aspire brand logo component rendered as inline SVG. Supports three
 * variants -- `mark` (the stylised "A" letterform with swoosh), `circle`
 * (the "A" inside a filled circle), and `full` (the complete wordmark with
 * "spire" text). All variants use `currentColor` so the logo inherits the
 * parent text colour and works seamlessly with theme switching.
 *
 * ## When to Use
 * - In the sidebar header (mark or circle when collapsed, full when expanded)
 * - In page headers, footers, or loading states
 * - On auth/login pages as the brand identity
 * - In email templates or print contexts (SVG scales cleanly)
 *
 * ## When NOT to Use
 * - For favicon -- export a static `.ico` or `.png` instead
 * - When a raster image is required (e.g. Open Graph tags) -- use a `.png` export
 * - For decorative icons unrelated to the Aspire brand -- use Lucide icons
 *
 * ## Accessibility
 * - All SVG elements have `aria-hidden="true"` since the logo is decorative
 * - When the logo is the only content in a link, add an `aria-label` on the parent
 * - Uses `currentColor` for fill, inheriting colour from the text context
 *
 * ## Import
 * ```tsx
 * import { AspireLogo } from '@/components/layout/AspireLogo'
 * ```
 *
 * ## Quick Start
 * ```tsx
 * <AspireLogo variant="full" size="md" />
 * <AspireLogo variant="mark" size="lg" className="text-primary" />
 * <AspireLogo variant="circle" size="sm" />
 * ```
 */
const meta: Meta<typeof AspireLogo> = {
  title: "5. Layout/AspireLogo",
  component: AspireLogo,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Aspire brand logo with SVG mark. Supports `mark` (icon only), `circle` (mark inside filled circle), and `full` (mark + wordmark) variants across five sizes (xs-xl). Uses `currentColor` so it inherits the parent text colour and works with theme switching.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "radio",
      options: ["mark", "circle", "full"],
      description: "Logo variant. `mark` renders the stylised \"A\" letterform with swoosh. `circle` renders the \"A\" inside a filled circle. `full` renders the complete wordmark with \"spire\" text.",
      table: {
        type: { summary: '"mark" | "circle" | "full"' },
        defaultValue: { summary: '"mark"' },
        category: "Appearance",
      },
    },
    size: {
      control: "radio",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Size of the logo. For `mark` and `circle`: xs=20px, sm=24px, md=32px, lg=40px, xl=48px. For `full`: height xs=16px, sm=20px, md=24px, lg=32px, xl=40px with proportional width.",
      table: {
        type: { summary: '"xs" | "sm" | "md" | "lg" | "xl"' },
        defaultValue: { summary: '"md"' },
        category: "Appearance",
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes merged onto the root SVG element. Use text colour classes (e.g. `text-primary`) to change the logo colour.",
      table: {
        type: { summary: "string" },
        category: "Appearance",
      },
    },
  },
  args: {
    variant: "mark",
    size: "md",
  },
}

export default meta
type Story = StoryObj<typeof meta>

// ─── CORE VARIANTS ──────────────────────────────────────────────────────────

/**
 * Default mark-only logo at medium size. The stylised "A" letterform
 * with the signature swoosh.
 *
 * ```tsx
 * <AspireLogo variant="mark" size="md" />
 * ```
 */
export const Default: Story = {
  args: {
    variant: "mark",
    size: "md",
  },
}

/**
 * Circle mark -- the "A" inside a filled circle. Used as an app icon
 * or compact brand identifier.
 *
 * ```tsx
 * <AspireLogo variant="circle" size="md" />
 * ```
 */
export const Circle: Story = {
  args: {
    variant: "circle",
    size: "md",
  },
}

/**
 * Full logo with the complete Aspire wordmark. Used in expanded sidebar
 * headers and marketing contexts.
 *
 * ```tsx
 * <AspireLogo variant="full" size="md" />
 * ```
 */
export const Full: Story = {
  args: {
    variant: "full",
    size: "md",
  },
}

// ─── SIZE VARIANTS ──────────────────────────────────────────────────────────

/**
 * All five sizes of the mark variant side by side (xs through xl).
 *
 * ```tsx
 * {["xs", "sm", "md", "lg", "xl"].map(size => (
 *   <AspireLogo variant="mark" size={size} key={size} />
 * ))}
 * ```
 */
export const MarkSizes: Story = {
  name: "Sizes: Mark",
  render: () => (
    <div className="flex items-end gap-6">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <AspireLogo variant="mark" size={size} />
          <span className="text-xs text-muted-foreground">{size}</span>
        </div>
      ))}
    </div>
  ),
}

/**
 * All five sizes of the circle variant side by side.
 *
 * ```tsx
 * {["xs", "sm", "md", "lg", "xl"].map(size => (
 *   <AspireLogo variant="circle" size={size} key={size} />
 * ))}
 * ```
 */
export const CircleSizes: Story = {
  name: "Sizes: Circle",
  render: () => (
    <div className="flex items-end gap-6">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <AspireLogo variant="circle" size={size} />
          <span className="text-xs text-muted-foreground">{size}</span>
        </div>
      ))}
    </div>
  ),
}

/**
 * All five sizes of the full wordmark variant. Height scales from
 * 16px (xs) to 40px (xl) with proportional width.
 *
 * ```tsx
 * {["xs", "sm", "md", "lg", "xl"].map(size => (
 *   <AspireLogo variant="full" size={size} key={size} />
 * ))}
 * ```
 */
export const FullSizes: Story = {
  name: "Sizes: Full Wordmark",
  render: () => (
    <div className="flex flex-col items-start gap-4">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <div key={size} className="flex items-center gap-4">
          <span className="w-6 text-xs text-muted-foreground">{size}</span>
          <AspireLogo variant="full" size={size} />
        </div>
      ))}
    </div>
  ),
}

// ─── COLOUR / BACKGROUND VARIANTS ───────────────────────────────────────────

/**
 * Logo on different coloured backgrounds, verifying `currentColor` inheritance.
 * Pass a text colour class to adapt the logo to any background.
 *
 * ```tsx
 * <div className="bg-foreground p-4">
 *   <AspireLogo variant="full" size="md" className="text-background" />
 * </div>
 * ```
 */
export const OnColoredBackground: Story = {
  name: "On Colored Backgrounds",
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-6">
        <div className="flex items-center justify-center rounded-lg bg-foreground p-4">
          <AspireLogo variant="full" size="md" className="text-background" />
        </div>
        <div className="flex items-center justify-center rounded-lg bg-primary p-4">
          <AspireLogo variant="full" size="md" className="text-primary-foreground" />
        </div>
        <div className="flex items-center justify-center rounded-lg bg-sidebar p-4 border">
          <AspireLogo variant="full" size="md" className="text-sidebar-foreground" />
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center justify-center rounded-lg bg-foreground p-4">
          <AspireLogo variant="circle" size="lg" className="text-background" />
        </div>
        <div className="flex items-center justify-center rounded-lg bg-primary p-4">
          <AspireLogo variant="circle" size="lg" className="text-primary-foreground" />
        </div>
        <div className="flex items-center justify-center rounded-lg bg-sidebar p-4 border">
          <AspireLogo variant="circle" size="lg" className="text-sidebar-foreground" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Logo uses `currentColor` -- pass a text colour class to adapt to any background.",
      },
    },
  },
}

/**
 * Dark background test -- mark variant on a dark surface.
 *
 * ```tsx
 * <div className="bg-zinc-900 p-6">
 *   <AspireLogo variant="mark" size="xl" className="text-white" />
 * </div>
 * ```
 */
export const OnDarkBackground: Story = {
  name: "On Dark Background",
  render: () => (
    <div className="flex items-center gap-8">
      <div className="flex items-center justify-center rounded-lg bg-zinc-900 p-6">
        <AspireLogo variant="mark" size="xl" className="text-white" />
      </div>
      <div className="flex items-center justify-center rounded-lg bg-zinc-900 p-6">
        <AspireLogo variant="circle" size="xl" className="text-white" />
      </div>
      <div className="flex items-center justify-center rounded-lg bg-zinc-900 px-6 py-4">
        <AspireLogo variant="full" size="lg" className="text-white" />
      </div>
    </div>
  ),
}

/**
 * Light background with default foreground colour.
 */
export const OnLightBackground: Story = {
  name: "On Light Background",
  render: () => (
    <div className="flex items-center gap-8">
      <div className="flex items-center justify-center rounded-lg bg-white p-6 border">
        <AspireLogo variant="mark" size="xl" className="text-zinc-900" />
      </div>
      <div className="flex items-center justify-center rounded-lg bg-white p-6 border">
        <AspireLogo variant="circle" size="xl" className="text-zinc-900" />
      </div>
      <div className="flex items-center justify-center rounded-lg bg-white px-6 py-4 border">
        <AspireLogo variant="full" size="lg" className="text-zinc-900" />
      </div>
    </div>
  ),
}

// ─── REAL-WORLD COMPOSITIONS ────────────────────────────────────────────────

/**
 * Sidebar context -- how the logo appears in collapsed and expanded nav states.
 *
 * ```tsx
 * // Collapsed sidebar
 * <AspireLogo variant="mark" size="lg" className="text-sidebar-foreground" />
 *
 * // Expanded sidebar
 * <AspireLogo variant="full" size="md" className="text-sidebar-foreground" />
 * ```
 */
export const SidebarContext: Story = {
  name: "Real World -- Sidebar Context",
  render: () => (
    <div className="flex items-start gap-8">
      <div className="flex w-20 flex-col items-center gap-2 rounded-lg border bg-sidebar p-3">
        <AspireLogo variant="mark" size="lg" className="text-sidebar-foreground" />
        <span className="text-[10px] text-muted-foreground">Collapsed (mark)</span>
      </div>
      <div className="flex w-20 flex-col items-center gap-2 rounded-lg border bg-sidebar p-3">
        <AspireLogo variant="circle" size="lg" className="text-sidebar-foreground" />
        <span className="text-[10px] text-muted-foreground">Collapsed (circle)</span>
      </div>
      <div className="flex w-60 flex-col gap-2 rounded-lg border bg-sidebar p-3">
        <AspireLogo variant="full" size="md" className="text-sidebar-foreground" />
        <span className="text-[10px] text-muted-foreground">Expanded</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Shows the logo as used in the SideNav -- mark or circle when collapsed (80px), full wordmark when expanded (240px).",
      },
    },
  },
}

/**
 * Header bar context -- logo in a top navigation bar with a page title.
 *
 * ```tsx
 * <header className="flex items-center gap-3 border-b px-4 py-2">
 *   <AspireLogo variant="mark" size="sm" />
 *   <span className="text-sm font-semibold">Aspire</span>
 * </header>
 * ```
 */
export const HeaderContext: Story = {
  name: "Real World -- Header Bar",
  render: () => (
    <div className="w-96">
      <header className="flex items-center gap-3 rounded-lg border bg-card px-4 py-3">
        <AspireLogo variant="mark" size="sm" />
        <div className="h-5 w-px bg-border" />
        <span className="text-sm font-semibold">Aspire Platform</span>
      </header>
    </div>
  ),
}

/**
 * Auth page context -- large logo used on login/signup pages.
 *
 * ```tsx
 * <div className="flex flex-col items-center gap-4">
 *   <AspireLogo variant="full" size="xl" />
 *   <p className="text-muted-foreground">Sign in to your account</p>
 * </div>
 * ```
 */
export const AuthPageContext: Story = {
  name: "Real World -- Auth Page",
  render: () => (
    <div className="flex w-80 flex-col items-center gap-4 rounded-xl border bg-card p-8">
      <AspireLogo variant="full" size="xl" />
      <p className="text-sm text-muted-foreground">Sign in to your account</p>
      <div className="mt-2 w-full space-y-3">
        <div className="h-9 w-full rounded-md bg-muted/40 animate-pulse" />
        <div className="h-9 w-full rounded-md bg-muted/40 animate-pulse" />
        <div className="h-9 w-full rounded-md bg-primary/20 animate-pulse" />
      </div>
    </div>
  ),
}

// ─── ALL VARIANTS GALLERY ───────────────────────────────────────────────────

/**
 * Complete gallery showing all 3 variants at all 5 sizes.
 */
export const AllVariantsGallery: Story = {
  name: "All Variants Gallery",
  render: () => (
    <div className="space-y-8">
      <div>
        <p className="mb-3 text-sm font-medium text-muted-foreground">Mark</p>
        <div className="flex items-end gap-6">
          {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
            <div key={size} className="flex flex-col items-center gap-2">
              <AspireLogo variant="mark" size={size} />
              <span className="text-xs text-muted-foreground">{size}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-3 text-sm font-medium text-muted-foreground">Circle</p>
        <div className="flex items-end gap-6">
          {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
            <div key={size} className="flex flex-col items-center gap-2">
              <AspireLogo variant="circle" size={size} />
              <span className="text-xs text-muted-foreground">{size}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-3 text-sm font-medium text-muted-foreground">Full Wordmark</p>
        <div className="flex flex-col items-start gap-3">
          {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
            <div key={size} className="flex items-center gap-4">
              <span className="w-6 text-xs text-muted-foreground">{size}</span>
              <AspireLogo variant="full" size={size} />
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
}

// ─── INTERACTION TESTS ──────────────────────────────────────────────────────

/**
 * Verifies the SVG element is rendered with `aria-hidden="true"` since
 * the logo is purely decorative.
 */
export const AriaHiddenTest: Story = {
  name: "Test: SVG is aria-hidden",
  args: {
    variant: "mark",
    size: "md",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const svg = canvasElement.querySelector("svg")
    await expect(svg).not.toBeNull()
    await expect(svg).toHaveAttribute("aria-hidden", "true")
  },
}

/**
 * Verifies the full wordmark variant renders the expected SVG viewBox.
 */
export const FullWordmarkViewBoxTest: Story = {
  name: "Test: Full Wordmark ViewBox",
  args: {
    variant: "full",
    size: "lg",
  },
  play: async ({ canvasElement }) => {
    const svg = canvasElement.querySelector("svg")
    await expect(svg).not.toBeNull()
    await expect(svg).toHaveAttribute("viewBox", "0 0 214 75")
  },
}

/**
 * Verifies the mark variant uses the correct 40x40 viewBox.
 */
export const MarkViewBoxTest: Story = {
  name: "Test: Mark ViewBox",
  args: {
    variant: "mark",
    size: "md",
  },
  play: async ({ canvasElement }) => {
    const svg = canvasElement.querySelector("svg")
    await expect(svg).not.toBeNull()
    await expect(svg).toHaveAttribute("viewBox", "0 0 40 40")
  },
}
