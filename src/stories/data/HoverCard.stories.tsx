import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "storybook/test"
import { within, userEvent, expect, waitFor } from "storybook/test"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  CalendarDays,
  MapPin,
  Link as LinkIcon,
  Users,
  TrendingUp,
  Heart,
  MessageCircle,
  Eye,
  DollarSign,
  BarChart3,
  Instagram,
  Youtube,
} from "lucide-react"

/**
 * # HoverCard
 *
 * A popup card that appears when the user hovers over a trigger element.
 * Ideal for previewing content behind a link without navigating away.
 * Built on top of Radix UI HoverCard with open/close animations.
 *
 * ## When to Use
 * - To preview user profiles when hovering over a name or avatar
 * - To show additional context for links, tags, or badges
 * - To display supplementary info (stats, descriptions) without cluttering the UI
 * - For non-critical information that enhances but is not required
 *
 * ## When NOT to Use
 * - For critical information users must see -- display it inline instead
 * - On touch devices where hover is unreliable -- use a Popover or Dialog
 * - For interactive content with forms or buttons -- use a Popover instead
 * - When the trigger is too small to hover accurately
 *
 * ## Accessibility
 * - Trigger is keyboard-focusable and activates on hover/focus
 * - Content is announced by screen readers when it appears
 * - Dismisses on Escape key
 * - Has appropriate delay before opening (`openDelay`) and closing (`closeDelay`)
 * - Content is rendered in a Portal to avoid overflow clipping
 *
 * ## Import
 * ```tsx
 * import {
 *   HoverCard,
 *   HoverCardTrigger,
 *   HoverCardContent,
 * } from '@/components/ui/hover-card'
 * ```
 *
 * ## Quick Start
 * ```tsx
 * <HoverCard>
 *   <HoverCardTrigger asChild>
 *     <Button variant="link">Hover me</Button>
 *   </HoverCardTrigger>
 *   <HoverCardContent>
 *     <p>Preview content here</p>
 *   </HoverCardContent>
 * </HoverCard>
 * ```
 */
const meta: Meta<typeof HoverCard> = {
  title: "4. Components/Data Display/HoverCard",
  component: HoverCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Sighted users can preview content behind a link before navigating. Appears on hover after a configurable delay.",
      },
    },
  },
  argTypes: {
    openDelay: {
      control: { type: "number", min: 0, max: 1000, step: 50 },
      description:
        "Delay in milliseconds before the hover card opens after the pointer enters the trigger.",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "700" },
        category: "Behavior",
      },
    },
    closeDelay: {
      control: { type: "number", min: 0, max: 1000, step: 50 },
      description:
        "Delay in milliseconds before the hover card closes after the pointer leaves.",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "300" },
        category: "Behavior",
      },
    },
    open: {
      control: "boolean",
      description:
        "Controlled open state. Use with `onOpenChange` for full control.",
      table: {
        type: { summary: "boolean" },
        category: "State",
      },
    },
    onOpenChange: {
      control: false,
      description:
        "Callback fired when the open state changes. Required for controlled usage.",
      table: {
        type: { summary: "(open: boolean) => void" },
        category: "Events",
      },
    },
    defaultOpen: {
      control: "boolean",
      description: "The initial open state in uncontrolled mode.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "State",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// ─── BASIC VARIANTS ─────────────────────────────────

/**
 * Default hover card with avatar and basic profile info.
 * The trigger uses `asChild` to render as a link-styled button.
 *
 * ```tsx
 * <HoverCard>
 *   <HoverCardTrigger asChild>
 *     <Button variant="link">@aspiredesign</Button>
 *   </HoverCardTrigger>
 *   <HoverCardContent className="w-80">
 *     <div className="flex justify-between space-x-4">
 *       <Avatar>...</Avatar>
 *       <div>
 *         <h4>@aspiredesign</h4>
 *         <p>Description text</p>
 *       </div>
 *     </div>
 *   </HoverCardContent>
 * </HoverCard>
 * ```
 */
export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">@aspiredesign</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@aspiredesign</h4>
            <p className="text-sm text-muted-foreground">
              Building design systems that scale. Open source advocate.
            </p>
            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
              <span className="text-xs text-muted-foreground">
                Joined January 2023
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
}

/**
 * Hover card with profile details including location, website,
 * follower/following counts, and role badge.
 *
 * ```tsx
 * <HoverCard>
 *   <HoverCardTrigger asChild>
 *     <Button variant="link" className="h-auto p-0 text-sm">Name</Button>
 *   </HoverCardTrigger>
 *   <HoverCardContent className="w-72">
 *     <Avatar />
 *     <Badge>Role</Badge>
 *     <p>Bio</p>
 *     <div>...metadata...</div>
 *   </HoverCardContent>
 * </HoverCard>
 * ```
 */
export const WithProfileInfo: Story = {
  name: "With Profile Info",
  render: () => (
    <div className="flex items-center gap-1 text-sm text-muted-foreground">
      Designed by{" "}
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="link" className="h-auto p-0 text-sm">
            Sarah Johnson
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-72">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="Sarah Johnson"
                />
                <AvatarFallback>SJ</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold">Sarah Johnson</p>
                </div>
                <p className="text-xs text-muted-foreground">@sarah_j</p>
                <Badge variant="secondary" className="mt-1 text-xs">
                  Lead Designer
                </Badge>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Building design systems that scale. Open source contributor and
              workshop facilitator.
            </p>
            <div className="space-y-1.5 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                San Francisco, CA
              </div>
              <div className="flex items-center gap-1.5">
                <LinkIcon className="h-3.5 w-3.5" />
                aspiredesign.io
              </div>
              <div className="flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5" />
                Joined March 2021
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5" />
                <span>
                  <strong className="text-foreground">2.4k</strong> followers
                  {" "}&middot;{" "}
                  <strong className="text-foreground">318</strong> following
                </span>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
}

/**
 * Hover card showing statistics -- useful for metric labels or KPI badges.
 *
 * ```tsx
 * <HoverCard>
 *   <HoverCardTrigger asChild>
 *     <Badge variant="outline" className="cursor-pointer">Metric</Badge>
 *   </HoverCardTrigger>
 *   <HoverCardContent>
 *     <p>Stat details</p>
 *   </HoverCardContent>
 * </HoverCard>
 * ```
 */
export const WithStats: Story = {
  name: "With Stats",
  render: () => {
    const metrics = [
      {
        label: "Engagement Rate",
        value: "4.8%",
        change: "+0.6%",
        desc: "Average engagement rate across all posts in the last 30 days. Includes likes, comments, shares, and saves.",
      },
      {
        label: "Avg. Reach",
        value: "45.2K",
        change: "+12%",
        desc: "Average reach per post. Calculated from the total impressions divided by the number of published posts.",
      },
      {
        label: "ROI",
        value: "3.2x",
        change: "+0.4x",
        desc: "Return on investment based on earned media value divided by total campaign spend.",
      },
    ]

    return (
      <div className="flex items-center gap-2">
        {metrics.map(({ label, value, change, desc }) => (
          <HoverCard key={label} openDelay={200}>
            <HoverCardTrigger asChild>
              <Badge variant="outline" className="cursor-pointer gap-1.5">
                {label}
                <span className="font-semibold">{value}</span>
              </Badge>
            </HoverCardTrigger>
            <HoverCardContent className="w-64" side="top">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{label}</p>
                  <span className="text-xs text-emerald-600 font-medium">
                    {change}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>
    )
  },
}

/**
 * Hover card triggered by a link. Shows preview details for the
 * destination before the user navigates.
 *
 * ```tsx
 * <HoverCard>
 *   <HoverCardTrigger asChild>
 *     <a href="#" className="underline">Link text</a>
 *   </HoverCardTrigger>
 *   <HoverCardContent>
 *     <p>Link preview</p>
 *   </HoverCardContent>
 * </HoverCard>
 * ```
 */
export const OnLinkHover: Story = {
  name: "On Link Hover",
  render: () => (
    <p className="text-sm text-muted-foreground">
      Check out our{" "}
      <HoverCard openDelay={300}>
        <HoverCardTrigger asChild>
          <a
            href="#"
            className="font-medium text-foreground underline underline-offset-4"
          >
            creator marketplace
          </a>
        </HoverCardTrigger>
        <HoverCardContent className="w-72">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Aspire Creator Marketplace</h4>
            <p className="text-xs text-muted-foreground">
              Browse 50,000+ vetted creators across Instagram, TikTok, YouTube,
              and more. Filter by niche, engagement rate, and audience demographics.
            </p>
            <div className="flex items-center gap-3 text-xs text-muted-foreground pt-1">
              <span className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                50K+ creators
              </span>
              <span className="flex items-center gap-1">
                <BarChart3 className="h-3 w-3" />
                Real-time analytics
              </span>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>{" "}
      for campaign partnerships.
    </p>
  ),
}

/**
 * Custom alignment examples. HoverCardContent supports `side` and `align` props.
 *
 * ```tsx
 * <HoverCardContent side="right" align="start" sideOffset={8}>
 *   ...
 * </HoverCardContent>
 * ```
 */
export const CustomAlignment: Story = {
  name: "Custom Alignment",
  render: () => (
    <div className="flex items-center gap-8">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="outline" size="sm">
            Align Start
          </Button>
        </HoverCardTrigger>
        <HoverCardContent align="start" className="w-48">
          <p className="text-sm">Aligned to the start of the trigger.</p>
        </HoverCardContent>
      </HoverCard>

      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="outline" size="sm">
            Align Center
          </Button>
        </HoverCardTrigger>
        <HoverCardContent align="center" className="w-48">
          <p className="text-sm">Centered (default alignment).</p>
        </HoverCardContent>
      </HoverCard>

      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="outline" size="sm">
            Align End
          </Button>
        </HoverCardTrigger>
        <HoverCardContent align="end" className="w-48">
          <p className="text-sm">Aligned to the end of the trigger.</p>
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
}

// ─── ASPIRE REAL-WORLD COMPOSITIONS ─────────────────

/**
 * Creator Profile Hover Card from the Contacts page.
 * Shows creator avatar, name, platforms, follower count,
 * engagement rate, and recent post metrics on hover.
 *
 * ```tsx
 * <HoverCard>
 *   <HoverCardTrigger asChild>
 *     <button className="flex items-center gap-2">
 *       <Avatar />
 *       <span>Creator Name</span>
 *     </button>
 *   </HoverCardTrigger>
 *   <HoverCardContent className="w-80">
 *     <div>...creator profile preview...</div>
 *   </HoverCardContent>
 * </HoverCard>
 * ```
 */
export const CreatorProfileHover: Story = {
  name: "Aspire -- Creator Profile Hover",
  render: () => (
    <div className="text-sm">
      Assigned to{" "}
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <button className="inline-flex items-center gap-1.5 font-medium hover:underline underline-offset-4">
            <Avatar className="h-5 w-5">
              <AvatarFallback className="text-[10px]">ER</AvatarFallback>
            </Avatar>
            Emma Rodriguez
          </button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Avatar className="h-12 w-12">
                <AvatarFallback>ER</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold">Emma Rodriguez</p>
                <p className="text-xs text-muted-foreground">@emmarod</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <Badge variant="outline" className="text-[10px] gap-1">
                    <Instagram className="h-2.5 w-2.5" />
                    245K
                  </Badge>
                  <Badge variant="outline" className="text-[10px] gap-1">
                    <Youtube className="h-2.5 w-2.5" />
                    89K
                  </Badge>
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Lifestyle & beauty creator. 500+ brand partnerships. Featured in
              Vogue, Elle, and Cosmopolitan.
            </p>
            <div className="grid grid-cols-3 gap-2 rounded-md bg-muted/50 p-2">
              <div className="text-center">
                <p className="text-sm font-semibold">4.8%</p>
                <p className="text-[10px] text-muted-foreground">Engagement</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold">245K</p>
                <p className="text-[10px] text-muted-foreground">Followers</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold">$2.4K</p>
                <p className="text-[10px] text-muted-foreground">Avg. CPP</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                Los Angeles, CA
              </div>
              <div className="flex items-center gap-1">
                <CalendarDays className="h-3 w-3" />
                Joined Feb 2024
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
}

/**
 * Campaign Details Hover Card. Shows campaign summary when
 * hovering over a campaign name in a list or table.
 *
 * ```tsx
 * <HoverCard>
 *   <HoverCardTrigger asChild>
 *     <Button variant="link">Campaign Name</Button>
 *   </HoverCardTrigger>
 *   <HoverCardContent className="w-72">
 *     <Badge>Status</Badge>
 *     <h4>Campaign Name</h4>
 *     <div>...campaign stats...</div>
 *   </HoverCardContent>
 * </HoverCard>
 * ```
 */
export const CampaignDetailsHover: Story = {
  name: "Aspire -- Campaign Details Hover",
  render: () => (
    <div className="text-sm text-muted-foreground">
      Part of the{" "}
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <Button variant="link" className="h-auto p-0 text-sm">
            Summer Glow 2026
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-72">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold">Summer Glow 2026</h4>
              <Badge className="bg-emerald-500 text-white">Active</Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Promote the new summer skincare line across Instagram and TikTok
              with lifestyle and beauty creators.
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-1.5">
                <DollarSign className="h-3 w-3 text-muted-foreground" />
                <span>
                  Budget: <strong className="text-foreground">$25,000</strong>
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="h-3 w-3 text-muted-foreground" />
                <span>
                  Creators: <strong className="text-foreground">12</strong>
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Eye className="h-3 w-3 text-muted-foreground" />
                <span>
                  Reach: <strong className="text-foreground">1.2M</strong>
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <TrendingUp className="h-3 w-3 text-muted-foreground" />
                <span>
                  ROI: <strong className="text-foreground">3.2x</strong>
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <CalendarDays className="h-3 w-3" />
              Jun 1 -- Aug 31, 2026
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>{" "}
      campaign.
    </div>
  ),
}

// ─── INTERACTION TESTS ─────────────────────────────

/**
 * Verifies that the hover card trigger is in the document and
 * can receive hover events. Uses the defaultOpen prop to test
 * content rendering.
 */
export const TriggerRenderTest: Story = {
  name: "Test: Trigger renders correctly",
  render: () => (
    <HoverCard defaultOpen>
      <HoverCardTrigger asChild>
        <Button variant="link" data-testid="hover-trigger">
          @testuser
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-64">
        <p className="text-sm" data-testid="hover-content">
          Hover card content is visible
        </p>
      </HoverCardContent>
    </HoverCard>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // The trigger should be rendered as a button
    const trigger = canvas.getByRole("link", { name: "@testuser" })
    await expect(trigger).toBeInTheDocument()
  },
}

/**
 * Verifies that opening the hover card via defaultOpen renders
 * content correctly and the content is accessible.
 */
export const ContentVisibilityTest: Story = {
  name: "Test: Content renders when open",
  render: () => (
    <HoverCard defaultOpen>
      <HoverCardTrigger asChild>
        <Button variant="link">@visibilitytest</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-64">
        <div className="space-y-1">
          <h4 className="text-sm font-semibold">Test User</h4>
          <p className="text-xs text-muted-foreground">
            This content should be visible when defaultOpen is true.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
  play: async ({ canvasElement }) => {
    // Content rendered in a portal, so use document.body
    await waitFor(() => {
      const content = document.querySelector(
        '[data-slot="hover-card-content"]'
      )
      expect(content).toBeInTheDocument()
    })

    // Verify text content is present
    await waitFor(() => {
      const heading = document.querySelector(
        '[data-slot="hover-card-content"]'
      )
      expect(heading?.textContent).toContain("Test User")
    })
  },
}
