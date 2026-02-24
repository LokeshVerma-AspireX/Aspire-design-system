import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "storybook/test"
import { within, userEvent, expect } from "storybook/test"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Zap,
  Star,
  Instagram,
  Youtube,
  CircleDot,
  ArrowUpRight,
  Sparkles,
  TrendingUp,
} from "lucide-react"

/**
 * # Badge
 *
 * Small status labels used to highlight categories, states, counts, and
 * metadata. Badges are non-interactive by default but can be rendered as
 * links with the `asChild` prop.
 *
 * ## When to Use
 * - To indicate the status of an item (Active, Paused, Draft, Completed)
 * - To label categories, tags, or content types
 * - To highlight platform names (Instagram, TikTok, YouTube)
 * - To show counts or metrics inline with other content
 *
 * ## When NOT to Use
 * - For primary actions — use a Button instead
 * - For toggleable states — use a Toggle or Switch instead
 * - For large, prominent labels — use a heading or card title
 * - For navigation — use a Link or NavigationMenu instead
 *
 * ## Accessibility
 * - Uses a `<span>` element by default (non-interactive)
 * - When rendered as a link via `asChild`, ensure the anchor has an `href`
 * - Color alone should not convey meaning; pair with text labels or icons
 * - Focus ring is visible when used as an interactive element
 *
 * ## Import
 * ```tsx
 * import { Badge } from '@/components/ui/badge'
 * ```
 *
 * ## Quick Start
 * ```tsx
 * <Badge variant="default">Active</Badge>
 * <Badge variant="secondary">Draft</Badge>
 * <Badge variant="destructive">Cancelled</Badge>
 * ```
 */
const meta: Meta<typeof Badge> = {
  title: "3. Primitives/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Small status labels for highlighting categories, states, and metadata. Supports six variants and optional icon pairing.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "outline", "ghost", "link"],
      description:
        "Visual style of the badge. Each variant maps to a distinct color and border treatment.",
      table: {
        type: { summary: '"default" | "secondary" | "destructive" | "outline" | "ghost" | "link"' },
        defaultValue: { summary: "default" },
        category: "Appearance",
      },
    },
    asChild: {
      control: "boolean",
      description:
        "When `true`, merges badge styles onto the child element instead of rendering a `<span>`. Useful for wrapping `<a>` or `Link` elements.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "Advanced",
      },
    },
    children: {
      control: "text",
      description: "Badge label text or child elements (text, icons, or both).",
      table: {
        type: { summary: "React.ReactNode" },
        category: "Content",
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes merged onto the badge element.",
      table: {
        type: { summary: "string" },
        category: "Appearance",
      },
    },
  },
  args: {
    variant: "default",
    children: "Badge",
  },
}

export default meta
type Story = StoryObj<typeof Badge>

// ─── CORE VARIANTS ─────────────────────────────────

/**
 * The primary badge variant. Use for the most important status indicators.
 *
 * ```tsx
 * <Badge variant="default">Active</Badge>
 * ```
 */
export const Default: Story = {
  args: { variant: "default", children: "Active" },
}

/**
 * Secondary badge for less prominent labels and categories.
 *
 * ```tsx
 * <Badge variant="secondary">Draft</Badge>
 * ```
 */
export const Secondary: Story = {
  args: { variant: "secondary", children: "Draft" },
}

/**
 * Destructive badge for errors, cancellations, and critical states.
 *
 * ```tsx
 * <Badge variant="destructive">Cancelled</Badge>
 * ```
 */
export const Destructive: Story = {
  args: { variant: "destructive", children: "Cancelled" },
}

/**
 * Outline badge with a visible border. Use for neutral or informational labels.
 *
 * ```tsx
 * <Badge variant="outline">Pending</Badge>
 * ```
 */
export const Outline: Story = {
  args: { variant: "outline", children: "Pending" },
}

/**
 * Ghost badge with no background. Use for subtle inline metadata.
 *
 * ```tsx
 * <Badge variant="ghost">Info</Badge>
 * ```
 */
export const Ghost: Story = {
  args: { variant: "ghost", children: "Info" },
}

/**
 * Link-style badge with an underline on hover. Use when the badge navigates somewhere.
 *
 * ```tsx
 * <Badge variant="link">View all</Badge>
 * ```
 */
export const LinkVariant: Story = {
  name: "Link",
  args: { variant: "link", children: "View all" },
}

// ─── ALL VARIANTS ──────────────────────────────────

/** Side-by-side comparison of all six badge variants. */
export const AllVariants: Story = {
  name: "All Variants",
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="ghost">Ghost</Badge>
      <Badge variant="link">Link</Badge>
    </div>
  ),
}

// ─── WITH ICONS ────────────────────────────────────

/**
 * Badges paired with leading icons for enhanced visual meaning.
 * The badge component automatically sizes SVGs to 12px (size-3).
 *
 * ```tsx
 * <Badge>
 *   <CheckCircle />
 *   Active
 * </Badge>
 * ```
 */
export const WithIcons: Story = {
  name: "With Icons",
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge className="bg-emerald-500 hover:bg-emerald-600">
        <CheckCircle />
        Active
      </Badge>
      <Badge variant="destructive">
        <XCircle />
        Inactive
      </Badge>
      <Badge variant="outline">
        <Clock />
        Pending
      </Badge>
      <Badge className="bg-amber-500 hover:bg-amber-600">
        <AlertCircle />
        Warning
      </Badge>
      <Badge variant="secondary">
        <Sparkles />
        New
      </Badge>
    </div>
  ),
}

// ─── AS LINK ───────────────────────────────────────

/**
 * Use `asChild` to render the badge as an anchor element.
 *
 * ```tsx
 * <Badge asChild variant="link">
 *   <a href="/campaigns">
 *     View campaigns
 *     <ArrowUpRight />
 *   </a>
 * </Badge>
 * ```
 */
export const AsLink: Story = {
  name: "As Link (asChild)",
  render: () => (
    <div className="flex gap-2">
      <Badge asChild variant="link">
        <a href="#campaigns">
          View campaigns
          <ArrowUpRight />
        </a>
      </Badge>
      <Badge asChild variant="outline">
        <a href="#analytics">
          Analytics
          <ArrowUpRight />
        </a>
      </Badge>
    </div>
  ),
}

// ─── ASPIRE REAL-WORLD COMPOSITIONS ────────────────

/**
 * Campaign status badges as used throughout the Aspire platform.
 * Each campaign state maps to a specific variant and color.
 *
 * ```tsx
 * <Badge className="bg-emerald-500">Active</Badge>
 * <Badge variant="outline"><Clock />Paused</Badge>
 * <Badge variant="secondary">Draft</Badge>
 * <Badge variant="destructive">Cancelled</Badge>
 * ```
 */
export const CampaignStatuses: Story = {
  name: "Real World — Campaign Statuses",
  render: () => {
    const campaigns = [
      { name: "Summer Collection 2025", status: "Active" as const, variant: undefined as undefined, color: "bg-emerald-500 hover:bg-emerald-600" as const, icon: CheckCircle },
      { name: "Holiday Gift Guide", status: "Paused" as const, variant: "outline" as const, color: undefined as undefined, icon: Clock },
      { name: "Spring Launch", status: "Draft" as const, variant: "secondary" as const, color: undefined as undefined, icon: CircleDot },
      { name: "Winter Promo", status: "Cancelled" as const, variant: "destructive" as const, color: undefined as undefined, icon: XCircle },
    ]
    return (
      <div className="w-96 divide-y rounded-lg border bg-card">
        {campaigns.map((c) => (
          <div key={c.name} className="flex items-center justify-between p-3">
            <div>
              <p className="text-sm font-medium">{c.name}</p>
              <p className="text-xs text-muted-foreground">Campaign</p>
            </div>
            <Badge variant={c.variant} className={c.color}>
              <c.icon />
              {c.status}
            </Badge>
          </div>
        ))}
      </div>
    )
  },
}

/**
 * Platform badges identifying social media channels.
 */
export const PlatformBadges: Story = {
  name: "Real World — Platform Badges",
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="outline">
        <Instagram />
        Instagram
      </Badge>
      <Badge variant="outline">
        <svg viewBox="0 0 24 24" fill="currentColor" className="size-3">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.22 6.22 0 0 0-.79-.05 6.29 6.29 0 0 0-6.28 6.28 6.29 6.29 0 0 0 6.28 6.29 6.29 6.29 0 0 0 6.29-6.29V8.73a8.18 8.18 0 0 0 4.78 1.53V6.83a4.85 4.85 0 0 1-.97-.14z" />
        </svg>
        TikTok
      </Badge>
      <Badge variant="outline">
        <Youtube />
        YouTube
      </Badge>
    </div>
  ),
}

/**
 * Content type badges used in analytics and content grids.
 */
export const ContentTypeBadges: Story = {
  name: "Real World — Content Types",
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="secondary">Story</Badge>
      <Badge variant="secondary">Reel</Badge>
      <Badge variant="secondary">Post</Badge>
      <Badge variant="secondary">Video</Badge>
      <Badge variant="secondary">Carousel</Badge>
    </div>
  ),
}

/**
 * Badges used in a table row context — showing creator list with statuses
 * and performance indicators.
 */
export const InTableRow: Story = {
  name: "Real World — Table Row Context",
  render: () => {
    const creators = [
      { name: "Sarah Chen", platform: "Instagram", status: "Active", engagement: "4.2%", trend: "up" },
      { name: "Mike Rivera", platform: "TikTok", status: "Pending", engagement: "6.8%", trend: "up" },
      { name: "Alex Kim", platform: "YouTube", status: "Draft", engagement: "2.1%", trend: "down" },
    ]
    return (
      <div className="w-full max-w-lg rounded-lg border bg-card">
        <div className="grid grid-cols-4 gap-2 border-b p-3 text-xs font-medium text-muted-foreground">
          <span>Creator</span>
          <span>Platform</span>
          <span>Status</span>
          <span>Engagement</span>
        </div>
        {creators.map((c) => (
          <div key={c.name} className="grid grid-cols-4 items-center gap-2 border-b p-3 last:border-b-0">
            <span className="text-sm font-medium">{c.name}</span>
            <Badge variant="outline" className="w-fit text-xs">{c.platform}</Badge>
            <Badge
              variant={
                c.status === "Active"
                  ? "default"
                  : c.status === "Pending"
                    ? "outline"
                    : "secondary"
              }
              className={c.status === "Active" ? "w-fit bg-emerald-500 hover:bg-emerald-600 text-xs" : "w-fit text-xs"}
            >
              {c.status}
            </Badge>
            <div className="flex items-center gap-1">
              <span className="text-sm">{c.engagement}</span>
              {c.trend === "up" && <TrendingUp className="size-3 text-emerald-500" />}
            </div>
          </div>
        ))}
      </div>
    )
  },
}

/**
 * Pricing tier badges with colors and icons.
 */
export const PricingTiers: Story = {
  name: "Real World — Pricing Tiers",
  render: () => (
    <div className="flex gap-2">
      <Badge variant="outline">Free</Badge>
      <Badge className="bg-indigo-500 hover:bg-indigo-600">
        <Zap />
        Pro
      </Badge>
      <Badge className="bg-amber-500 hover:bg-amber-600">
        <Star />
        Enterprise
      </Badge>
    </div>
  ),
}

/**
 * Tag cloud — interactive badges used for filtering content.
 */
export const TagCloud: Story = {
  name: "Real World — Tag Cloud",
  render: () => {
    const tags = [
      "Beauty", "Fashion", "Lifestyle", "Food", "Travel",
      "Fitness", "Tech", "Gaming", "Music", "Education",
    ]
    return (
      <div className="flex max-w-sm flex-wrap gap-1.5">
        {tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-accent">
            {tag}
          </Badge>
        ))}
      </div>
    )
  },
}

// ─── INTERACTION TESTS ─────────────────────────────

/**
 * Verifies all six badge variants render with correct text content
 * and the expected `data-variant` attribute.
 */
export const VariantRenderTest: Story = {
  name: "Test: All Variants Render",
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="ghost">Ghost</Badge>
      <Badge variant="link">Link</Badge>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const variants = ["Default", "Secondary", "Destructive", "Outline", "Ghost", "Link"]
    for (const variant of variants) {
      const badge = canvas.getByText(variant)
      await expect(badge).toBeVisible()
    }
    // Verify data-variant attribute on a specific badge
    const defaultBadge = canvas.getByText("Default")
    await expect(defaultBadge).toHaveAttribute("data-variant", "default")
    const destructiveBadge = canvas.getByText("Destructive")
    await expect(destructiveBadge).toHaveAttribute("data-variant", "destructive")
  },
}

/**
 * Verifies that a badge rendered as a link via `asChild` is clickable
 * and has the expected anchor element.
 */
export const AsChildClickTest: Story = {
  name: "Test: asChild Link is Clickable",
  render: () => (
    <Badge asChild variant="link">
      <a href="#test-link" data-testid="badge-link">
        Clickable badge
        <ArrowUpRight />
      </a>
    </Badge>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const link = canvas.getByTestId("badge-link")
    await expect(link).toBeVisible()
    await expect(link.tagName.toLowerCase()).toBe("a")
    await expect(link).toHaveAttribute("href", "#test-link")
    await userEvent.click(link)
  },
}
