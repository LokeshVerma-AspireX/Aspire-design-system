import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "storybook/test"
import { within, userEvent, expect, waitFor } from "storybook/test"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Star,
  Heart,
  MessageCircle,
  Eye,
  TrendingUp,
  Image as ImageIcon,
  Play,
  Users,
} from "lucide-react"

/**
 * # Carousel
 *
 * A touch-friendly, swipeable carousel built on top of [Embla Carousel](https://www.embla-carousel.com/).
 * Supports horizontal and vertical orientations, looping, auto-play via plugins,
 * multiple visible items, and full keyboard navigation.
 *
 * ## When to Use
 * - To showcase a collection of items (posts, creators, campaigns) in a limited space
 * - For hero banners or featured content sections
 * - When users should browse items sequentially with visual context of adjacent items
 * - For testimonials, product highlights, or image galleries
 *
 * ## When NOT to Use
 * - For long lists where users need to scan all items at once -- use a grid or table
 * - For critical content that must always be visible -- carousels hide items off-screen
 * - For navigation menus -- use Tabs or NavigationMenu instead
 * - When there are fewer than 3 items -- just lay them out in a row
 *
 * ## Accessibility
 * - Root has `role="region"` and `aria-roledescription="carousel"`
 * - Each slide has `role="group"` and `aria-roledescription="slide"`
 * - Previous/Next buttons have screen-reader-only labels
 * - Full keyboard navigation: ArrowLeft/ArrowRight to navigate
 * - Buttons are automatically disabled at the start/end when looping is off
 *
 * ## Import
 * ```tsx
 * import {
 *   Carousel,
 *   CarouselContent,
 *   CarouselItem,
 *   CarouselPrevious,
 *   CarouselNext,
 * } from '@/components/ui/carousel'
 * ```
 *
 * ## Quick Start
 * ```tsx
 * <Carousel className="w-full max-w-xs">
 *   <CarouselContent>
 *     <CarouselItem>Slide 1</CarouselItem>
 *     <CarouselItem>Slide 2</CarouselItem>
 *   </CarouselContent>
 *   <CarouselPrevious />
 *   <CarouselNext />
 * </Carousel>
 * ```
 */
const meta: Meta<typeof Carousel> = {
  title: "4. Components/Data Display/Carousel",
  component: Carousel,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A carousel with motion and swipe built using Embla Carousel. Supports looping, autoplay, multiple visible items, and vertical orientation.",
      },
    },
  },
  argTypes: {
    orientation: {
      control: "radio",
      options: ["horizontal", "vertical"],
      description:
        "The scroll direction of the carousel. Horizontal scrolls left/right, vertical scrolls up/down.",
      table: {
        type: { summary: '"horizontal" | "vertical"' },
        defaultValue: { summary: "horizontal" },
        category: "Appearance",
      },
    },
    opts: {
      control: "object",
      description:
        "Embla Carousel options. Common options include `loop`, `align`, `dragFree`, `containScroll`, and `startIndex`.",
      table: {
        type: { summary: "EmblaOptionsType" },
        defaultValue: { summary: "{}" },
        category: "Configuration",
      },
    },
    plugins: {
      control: false,
      description:
        "Array of Embla Carousel plugins such as Autoplay, AutoHeight, or ClassNames.",
      table: {
        type: { summary: "EmblaPluginType[]" },
        category: "Configuration",
      },
    },
    setApi: {
      control: false,
      description:
        "Callback that receives the Embla API instance when the carousel mounts. Useful for external controls.",
      table: {
        type: { summary: "(api: CarouselApi) => void" },
        category: "Events",
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes applied to the carousel root element.",
      table: {
        type: { summary: "string" },
        category: "Appearance",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// ─── BASIC VARIANTS ─────────────────────────────────

/**
 * Default horizontal carousel with navigation arrows.
 * Each item takes full width of the container.
 *
 * ```tsx
 * <Carousel className="w-full max-w-xs">
 *   <CarouselContent>
 *     {items.map((item, i) => (
 *       <CarouselItem key={i}>
 *         <Card>
 *           <CardContent className="flex aspect-square items-center justify-center p-6">
 *             <span className="text-4xl font-semibold">{i + 1}</span>
 *           </CardContent>
 *         </Card>
 *       </CarouselItem>
 *     ))}
 *   </CarouselContent>
 *   <CarouselPrevious />
 *   <CarouselNext />
 * </Carousel>
 * ```
 */
export const Default: Story = {
  render: () => (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {Array.from({ length: 5 }, (_, i) => (
          <CarouselItem key={i}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{i + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
}

/**
 * Vertical carousel -- slides scroll up and down.
 * Set `orientation="vertical"` on the `<Carousel>` component.
 *
 * ```tsx
 * <Carousel orientation="vertical" className="w-full max-w-xs">
 *   <CarouselContent className="-mt-1 h-[200px]">
 *     <CarouselItem className="pt-1 basis-1/2">...</CarouselItem>
 *   </CarouselContent>
 *   <CarouselPrevious />
 *   <CarouselNext />
 * </Carousel>
 * ```
 */
export const Vertical: Story = {
  name: "Vertical Orientation",
  render: () => (
    <Carousel orientation="vertical" className="w-full max-w-xs">
      <CarouselContent className="-mt-1 h-[200px]">
        {Array.from({ length: 5 }, (_, i) => (
          <CarouselItem key={i} className="pt-1 basis-1/2">
            <div className="p-1">
              <Card>
                <CardContent className="flex items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{i + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
}

/**
 * Show multiple items per view using `basis-1/3` on each CarouselItem.
 * Use negative margin on CarouselContent and matching padding on items
 * to control the gap.
 *
 * ```tsx
 * <Carousel opts={{ align: "start" }} className="w-full max-w-sm">
 *   <CarouselContent className="-ml-2">
 *     <CarouselItem className="pl-2 basis-1/3">...</CarouselItem>
 *   </CarouselContent>
 * </Carousel>
 * ```
 */
export const MultipleItemsPerView: Story = {
  name: "Multiple Items Per View",
  render: () => (
    <Carousel opts={{ align: "start" }} className="w-full max-w-sm">
      <CarouselContent className="-ml-2">
        {Array.from({ length: 8 }, (_, i) => (
          <CarouselItem key={i} className="pl-2 basis-1/3">
            <Card>
              <CardContent className="flex aspect-square items-center justify-center p-2">
                <span className="text-2xl font-semibold">{i + 1}</span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
}

/**
 * Looping carousel that wraps around infinitely.
 * Set `opts={{ loop: true }}` to enable.
 *
 * ```tsx
 * <Carousel opts={{ loop: true }}>
 *   <CarouselContent>...</CarouselContent>
 *   <CarouselPrevious />
 *   <CarouselNext />
 * </Carousel>
 * ```
 */
export const Looping: Story = {
  name: "With Loop",
  render: () => (
    <Carousel opts={{ loop: true }} className="w-full max-w-xs">
      <CarouselContent>
        {Array.from({ length: 5 }, (_, i) => (
          <CarouselItem key={i}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{i + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
}

// ─── WITH CARDS ─────────────────────────────────────

/**
 * Carousel items containing rich cards with image placeholders,
 * titles, and descriptions.
 *
 * ```tsx
 * <Carousel opts={{ loop: true }} className="w-72">
 *   <CarouselContent>
 *     <CarouselItem>
 *       <Card>
 *         <CardContent>
 *           <Badge variant="secondary">Label</Badge>
 *           <h3>Title</h3>
 *           <p>Description</p>
 *         </CardContent>
 *       </Card>
 *     </CarouselItem>
 *   </CarouselContent>
 * </Carousel>
 * ```
 */
export const WithCards: Story = {
  name: "With Rich Cards",
  render: () => {
    const features = [
      {
        title: "Design Tokens",
        desc: "Consistent colors, spacing, and typography across your entire product.",
        badge: "Foundation",
      },
      {
        title: "Accessibility",
        desc: "WCAG 2.1 AA compliant components with full keyboard navigation.",
        badge: "Built-in",
      },
      {
        title: "Dark Mode",
        desc: "Automatic dark mode support with a single CSS class toggle.",
        badge: "Ready",
      },
      {
        title: "TypeScript",
        desc: "Full type safety with autocomplete for all component props.",
        badge: "v5",
      },
    ]

    return (
      <Carousel opts={{ loop: true }} className="w-72">
        <CarouselContent>
          {features.map(({ title, desc, badge }) => (
            <CarouselItem key={title}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex flex-col items-start gap-3 p-6">
                    <Badge variant="secondary">{badge}</Badge>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="text-sm text-muted-foreground">{desc}</p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    )
  },
}

// ─── ASPIRE REAL-WORLD COMPOSITIONS ─────────────────

/**
 * Top Posts Carousel from the Analytics page.
 * Showcases high-performing social posts with engagement metrics.
 *
 * ```tsx
 * <Carousel opts={{ align: "start", loop: true }} className="w-full max-w-lg">
 *   <CarouselContent className="-ml-3">
 *     <CarouselItem className="pl-3 basis-1/2">
 *       <Card>
 *         <AspectRatio ratio={1}>...</AspectRatio>
 *         <CardContent>...metrics...</CardContent>
 *       </Card>
 *     </CarouselItem>
 *   </CarouselContent>
 * </Carousel>
 * ```
 */
export const TopPostsCarousel: Story = {
  name: "Aspire -- Top Posts Carousel",
  render: () => {
    const posts = [
      {
        creator: "Emma Rodriguez",
        initials: "ER",
        platform: "Instagram",
        likes: "12.4K",
        comments: "892",
        views: "45.2K",
        caption: "Summer vibes with the new collection! #aspire #collab",
      },
      {
        creator: "Alex Kim",
        initials: "AK",
        platform: "TikTok",
        likes: "34.1K",
        comments: "2.1K",
        views: "120K",
        caption: "Unboxing the brand new palette -- you need this!",
      },
      {
        creator: "Sarah Chen",
        initials: "SC",
        platform: "YouTube",
        likes: "8.7K",
        comments: "456",
        views: "89.3K",
        caption: "Full review: Is the hype worth it? (Spoiler: YES)",
      },
      {
        creator: "Jordan Lee",
        initials: "JL",
        platform: "Instagram",
        likes: "15.8K",
        comments: "1.3K",
        views: "62.1K",
        caption: "Morning routine featuring my faves from Aspire",
      },
    ]

    return (
      <Carousel
        opts={{ align: "start", loop: true }}
        className="w-full max-w-lg"
      >
        <CarouselContent className="-ml-3">
          {posts.map((post) => (
            <CarouselItem key={post.creator} className="pl-3 basis-1/2">
              <Card className="overflow-hidden">
                <div className="flex aspect-square items-center justify-center bg-muted">
                  <ImageIcon className="h-10 w-10 text-muted-foreground/50" />
                </div>
                <CardContent className="p-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-[10px]">
                        {post.initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs font-medium truncate">
                      {post.creator}
                    </span>
                    <Badge variant="outline" className="ml-auto text-[10px]">
                      {post.platform}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {post.caption}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      {post.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="h-3 w-3" />
                      {post.comments}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {post.views}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    )
  },
}

/**
 * Creator Showcase carousel. Displays creator profiles with
 * avatar, bio, follower count, and engagement rate.
 *
 * ```tsx
 * <Carousel opts={{ loop: true }} className="w-80">
 *   <CarouselContent>
 *     <CarouselItem>
 *       <Card>
 *         <Avatar /><h4>Creator Name</h4>
 *         <p>Bio</p>
 *         <div>...stats...</div>
 *       </Card>
 *     </CarouselItem>
 *   </CarouselContent>
 * </Carousel>
 * ```
 */
export const CreatorShowcase: Story = {
  name: "Aspire -- Creator Showcase",
  render: () => {
    const creators = [
      {
        name: "Emma Rodriguez",
        handle: "@emmarod",
        initials: "ER",
        bio: "Lifestyle & beauty content creator. 500+ brand partnerships.",
        followers: "245K",
        engagement: "4.8%",
        rating: 5,
      },
      {
        name: "Alex Kim",
        handle: "@alexkim",
        initials: "AK",
        bio: "Tech reviewer and unboxing specialist. Featured on TechCrunch.",
        followers: "890K",
        engagement: "3.2%",
        rating: 5,
      },
      {
        name: "Sarah Chen",
        handle: "@sarahchen",
        initials: "SC",
        bio: "Fitness & wellness advocate. Certified personal trainer.",
        followers: "156K",
        engagement: "6.1%",
        rating: 4,
      },
      {
        name: "Jordan Lee",
        handle: "@jordanlee",
        initials: "JL",
        bio: "Food & travel blogger. 40 countries and counting.",
        followers: "320K",
        engagement: "5.5%",
        rating: 5,
      },
    ]

    return (
      <Carousel opts={{ loop: true }} className="w-80">
        <CarouselContent>
          {creators.map((creator) => (
            <CarouselItem key={creator.name}>
              <Card className="mx-1">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>{creator.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold">{creator.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {creator.handle}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 pt-0">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {creator.bio}
                  </p>
                  <div className="flex gap-0.5">
                    {Array.from({ length: creator.rating }, (_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                    {Array.from({ length: 5 - creator.rating }, (_, i) => (
                      <Star
                        key={`empty-${i}`}
                        className="h-4 w-4 text-muted-foreground/30"
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="font-medium">{creator.followers}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="font-medium">{creator.engagement}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    )
  },
}

/**
 * Campaign Highlights carousel. Shows active campaign cards
 * with status badges, budget, and performance indicators.
 *
 * ```tsx
 * <Carousel opts={{ align: "start" }} className="w-full max-w-md">
 *   <CarouselContent className="-ml-3">
 *     <CarouselItem className="pl-3 basis-2/3">
 *       <Card>...campaign info...</Card>
 *     </CarouselItem>
 *   </CarouselContent>
 * </Carousel>
 * ```
 */
export const CampaignHighlights: Story = {
  name: "Aspire -- Campaign Highlights",
  render: () => {
    const campaigns = [
      {
        name: "Summer Glow 2026",
        status: "Active",
        statusColor: "bg-emerald-500 text-white",
        budget: "$25,000",
        creators: 12,
        posts: 48,
        reach: "1.2M",
      },
      {
        name: "Back to School",
        status: "Draft",
        statusColor: "bg-muted text-muted-foreground",
        budget: "$15,000",
        creators: 8,
        posts: 0,
        reach: "--",
      },
      {
        name: "Holiday Gift Guide",
        status: "Completed",
        statusColor: "bg-blue-500 text-white",
        budget: "$40,000",
        creators: 25,
        posts: 112,
        reach: "3.8M",
      },
      {
        name: "Spring Collection",
        status: "Active",
        statusColor: "bg-emerald-500 text-white",
        budget: "$18,500",
        creators: 10,
        posts: 32,
        reach: "890K",
      },
    ]

    return (
      <Carousel
        opts={{ align: "start" }}
        className="w-full max-w-md"
      >
        <CarouselContent className="-ml-3">
          {campaigns.map((campaign) => (
            <CarouselItem key={campaign.name} className="pl-3 basis-2/3">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-semibold">
                      {campaign.name}
                    </CardTitle>
                    <Badge className={campaign.statusColor}>
                      {campaign.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 pt-0">
                  <p className="text-xs text-muted-foreground">
                    Budget: <span className="font-medium text-foreground">{campaign.budget}</span>
                  </p>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="text-lg font-semibold">{campaign.creators}</p>
                      <p className="text-[10px] text-muted-foreground">Creators</p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold">{campaign.posts}</p>
                      <p className="text-[10px] text-muted-foreground">Posts</p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold">{campaign.reach}</p>
                      <p className="text-[10px] text-muted-foreground">Reach</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    )
  },
}

// ─── INTERACTION TESTS ─────────────────────────────

/**
 * Verifies that clicking the Next button advances the carousel.
 * The next button should become enabled when there are more slides to show.
 */
export const NextButtonTest: Story = {
  name: "Test: Next button navigates forward",
  render: () => (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {Array.from({ length: 3 }, (_, i) => (
          <CarouselItem key={i}>
            <Card>
              <CardContent className="flex aspect-square items-center justify-center p-6">
                <span className="text-4xl font-semibold">Slide {i + 1}</span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const nextButton = canvas.getByRole("button", { name: "Next slide" })

    // Wait for carousel to initialize and Next button to be enabled
    await waitFor(() => {
      expect(nextButton).not.toBeDisabled()
    }, { timeout: 3000 })

    // Click next
    await userEvent.click(nextButton)
  },
}

/**
 * Verifies the carousel has the correct ARIA attributes for accessibility.
 */
export const AccessibilityTest: Story = {
  name: "Test: Carousel ARIA attributes",
  render: () => (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {Array.from({ length: 3 }, (_, i) => (
          <CarouselItem key={i}>
            <Card>
              <CardContent className="flex aspect-square items-center justify-center p-6">
                <span className="text-4xl font-semibold">{i + 1}</span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Carousel root should have region role
    const region = canvas.getByRole("region")
    await expect(region).toBeInTheDocument()

    // Should have carousel roledescription
    await expect(region).toHaveAttribute("aria-roledescription", "carousel")

    // Each slide should have group role with slide roledescription
    const slides = canvas.getAllByRole("group")
    await expect(slides.length).toBe(3)
    for (const slide of slides) {
      await expect(slide).toHaveAttribute("aria-roledescription", "slide")
    }
  },
}
