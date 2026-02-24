import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"
import { within, userEvent, expect } from "storybook/test"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Users,
  TrendingUp,
  DollarSign,
  Activity,
  Check,
  Star,
  Zap,
  MoreHorizontal,
  Settings,
  Eye,
  Heart,
  MessageSquare,
  ArrowUpRight,
  Instagram,
  Youtube,
} from "lucide-react"
import type { ElementType } from "react"

/**
 * # Card
 *
 * A flexible container component with Header, Content, Footer, and Action
 * sub-components for building structured UI blocks. Cards are the primary
 * surface for grouping related content in the Aspire Design System.
 *
 * ## When to Use
 * - To group related information into a visual container (profile, stats, settings)
 * - As a form container for settings sections or wizard steps
 * - For dashboard metric cards and KPI displays
 * - To display creator profiles, campaign summaries, or offer details
 *
 * ## When NOT to Use
 * - For full-page layouts -- use PageShell or section containers
 * - For simple text grouping -- use semantic HTML headings and paragraphs
 * - For interactive list items -- use a dedicated ListItem component
 * - For modal content -- use Dialog or AlertDialog instead
 *
 * ## Accessibility
 * - Card renders as a `<div>` -- add appropriate ARIA roles if interactive
 * - Use `CardTitle` for section headings (rendered as a `<div>`, add heading elements inside if needed)
 * - `CardAction` is positioned in the header grid for consistent layout
 * - Ensure interactive elements within cards are keyboard accessible
 *
 * ## Import
 * ```tsx
 * import {
 *   Card,
 *   CardHeader,
 *   CardFooter,
 *   CardTitle,
 *   CardAction,
 *   CardDescription,
 *   CardContent,
 * } from '@/components/ui/card'
 * ```
 *
 * ## Quick Start
 * ```tsx
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Card Title</CardTitle>
 *     <CardDescription>A brief description.</CardDescription>
 *   </CardHeader>
 *   <CardContent>
 *     <p>Card content goes here.</p>
 *   </CardContent>
 * </Card>
 * ```
 */
const meta: Meta<typeof Card> = {
  title: "3. Primitives/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Flexible container with Header, Content, Footer, and Action sub-components. The primary surface for grouping related content in Aspire.",
      },
    },
  },
  argTypes: {
    className: {
      control: "text",
      description:
        "Additional CSS classes merged via `cn()`. Use for custom widths, borders, or background overrides.",
      table: {
        type: { summary: "string" },
        category: "Appearance",
      },
    },
    children: {
      control: false,
      description:
        "Card content. Typically composed of CardHeader, CardContent, CardFooter sub-components.",
      table: {
        type: { summary: "React.ReactNode" },
        category: "Content",
      },
    },
    onClick: {
      action: "clicked",
      description:
        "Optional click handler. When provided, consider adding `cursor-pointer` and hover styles.",
      table: {
        type: { summary: "() => void" },
        category: "Events",
      },
    },
  },
  args: {
    onClick: fn(),
  },
}

export default meta
type Story = StoryObj<typeof meta>

// ─── CORE COMPOSITIONS ─────────────────────────────

/**
 * Minimal card with just a content section.
 *
 * ```tsx
 * <Card className="w-72">
 *   <CardContent>
 *     <p>Simple card with content only.</p>
 *   </CardContent>
 * </Card>
 * ```
 */
export const Basic: Story = {
  render: () => (
    <Card className="w-72">
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Simple card with content only. No header or footer.
        </p>
      </CardContent>
    </Card>
  ),
}

/**
 * Card with header (title + description) and content section.
 *
 * ```tsx
 * <Card className="w-72">
 *   <CardHeader>
 *     <CardTitle>Card Title</CardTitle>
 *     <CardDescription>A brief description.</CardDescription>
 *   </CardHeader>
 *   <CardContent>
 *     <p>Card content goes here.</p>
 *   </CardContent>
 * </Card>
 * ```
 */
export const WithHeaderAndContent: Story = {
  name: "With Header and Content",
  render: () => (
    <Card className="w-72">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>A brief description of this card.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Card content goes here. Add any components or text.
        </p>
      </CardContent>
    </Card>
  ),
}

/**
 * Card with header, content, and footer containing action buttons.
 *
 * ```tsx
 * <Card className="w-72">
 *   <CardHeader>
 *     <CardTitle>Card Title</CardTitle>
 *     <CardDescription>Description text.</CardDescription>
 *   </CardHeader>
 *   <CardContent>...</CardContent>
 *   <CardFooter className="flex gap-2">
 *     <Button variant="outline" size="sm">Cancel</Button>
 *     <Button size="sm">Save</Button>
 *   </CardFooter>
 * </Card>
 * ```
 */
export const WithFooter: Story = {
  name: "With Footer",
  render: () => (
    <Card className="w-72">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>A brief description of this card.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Card content goes here. Add any components or text.
        </p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" size="sm">
          Cancel
        </Button>
        <Button size="sm">Save</Button>
      </CardFooter>
    </Card>
  ),
}

/**
 * Card with a `CardAction` button in the header. The action is automatically
 * positioned in the top-right of the header grid.
 *
 * ```tsx
 * <Card className="w-80">
 *   <CardHeader>
 *     <CardTitle>Notifications</CardTitle>
 *     <CardDescription>Manage your preferences.</CardDescription>
 *     <CardAction>
 *       <Button variant="ghost" size="icon" aria-label="Settings">
 *         <Settings className="h-4 w-4" />
 *       </Button>
 *     </CardAction>
 *   </CardHeader>
 *   <CardContent>...</CardContent>
 * </Card>
 * ```
 */
export const WithAction: Story = {
  name: "With Action Button",
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>
          Manage your notification preferences.
        </CardDescription>
        <CardAction>
          <Button variant="ghost" size="icon" aria-label="Settings">
            <Settings className="h-4 w-4" />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Email notifications</p>
              <p className="text-xs text-muted-foreground">
                Receive campaign updates via email
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Push notifications</p>
              <p className="text-xs text-muted-foreground">
                Browser push for new messages
              </p>
            </div>
            <Switch />
          </div>
        </div>
      </CardContent>
    </Card>
  ),
}

/**
 * Full-featured card using all sub-components: Header, Title, Description,
 * Action, Content, and Footer.
 *
 * ```tsx
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Full Featured Card</CardTitle>
 *     <CardDescription>Uses all sub-components.</CardDescription>
 *     <CardAction>
 *       <Button variant="ghost" size="icon-sm">
 *         <MoreHorizontal className="h-4 w-4" />
 *       </Button>
 *     </CardAction>
 *   </CardHeader>
 *   <CardContent>...</CardContent>
 *   <CardFooter>...</CardFooter>
 * </Card>
 * ```
 */
export const FullFeatured: Story = {
  name: "Full Featured",
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Full Featured Card</CardTitle>
        <CardDescription>
          This card uses all available sub-components for maximum flexibility.
        </CardDescription>
        <CardAction>
          <Button variant="ghost" size="icon" aria-label="More options">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Zap className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">Quick Setup</p>
              <p className="text-xs text-muted-foreground">
                Get started in under 5 minutes
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Check className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">Ready to Go</p>
              <p className="text-xs text-muted-foreground">
                Pre-configured for common use cases
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost" size="sm">
          Learn More
        </Button>
        <Button size="sm">Get Started</Button>
      </CardFooter>
    </Card>
  ),
}

/**
 * Card used as a form container. Common pattern for settings sections
 * and wizard steps in Aspire.
 *
 * ```tsx
 * <Card className="w-96">
 *   <CardHeader>
 *     <CardTitle>Campaign Settings</CardTitle>
 *     <CardDescription>Configure your campaign.</CardDescription>
 *   </CardHeader>
 *   <CardContent className="space-y-4">
 *     <div className="grid gap-1.5">
 *       <Label htmlFor="name">Campaign Name</Label>
 *       <Input id="name" placeholder="e.g. Summer Glow" />
 *     </div>
 *   </CardContent>
 *   <CardFooter className="flex justify-end gap-2">
 *     <Button variant="outline">Cancel</Button>
 *     <Button>Save</Button>
 *   </CardFooter>
 * </Card>
 * ```
 */
export const AsFormContainer: Story = {
  name: "As Form Container",
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Campaign Settings</CardTitle>
        <CardDescription>
          Configure your campaign details and targeting.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-1.5">
          <Label htmlFor="campaign-name">Campaign Name</Label>
          <Input
            id="campaign-name"
            placeholder="e.g. Summer Glow 2025"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="grid gap-1.5">
            <Label htmlFor="budget">Budget</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="budget"
                type="number"
                placeholder="5000"
                className="pl-9"
              />
            </div>
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="start-date">Start Date</Label>
            <Input id="start-date" type="date" />
          </div>
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            placeholder="Brief campaign description..."
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Save Settings</Button>
      </CardFooter>
    </Card>
  ),
}

/**
 * Card displaying a single stat/metric. Common in dashboard grids.
 *
 * ```tsx
 * <Card>
 *   <CardHeader className="flex flex-row items-center justify-between pb-2">
 *     <CardTitle className="text-sm font-medium text-muted-foreground">
 *       Total Revenue
 *     </CardTitle>
 *     <DollarSign className="h-4 w-4 text-muted-foreground" />
 *   </CardHeader>
 *   <CardContent>
 *     <div className="text-2xl font-bold">$45,231</div>
 *     <p className="text-xs text-muted-foreground">+20.1% from last month</p>
 *   </CardContent>
 * </Card>
 * ```
 */
export const AsStatsCard: Story = {
  name: "As Stats Card",
  render: () => {
    const stats: Array<{
      label: string
      value: string
      change: string
      icon: ElementType
      color: string
    }> = [
      {
        label: "Total Revenue",
        value: "$45,231",
        change: "+20.1%",
        icon: DollarSign,
        color: "text-emerald-500",
      },
      {
        label: "Active Creators",
        value: "2,350",
        change: "+180",
        icon: Users,
        color: "text-blue-500",
      },
      {
        label: "Engagement Rate",
        value: "4.8%",
        change: "+0.6%",
        icon: TrendingUp,
        color: "text-indigo-500",
      },
      {
        label: "Campaign ROI",
        value: "3.2x",
        change: "+0.4x",
        icon: Activity,
        color: "text-amber-500",
      },
    ]
    return (
      <div className="grid grid-cols-2 gap-3">
        {stats.map(({ label, value, change, icon: Icon, color }) => (
          <Card key={label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {label}
              </CardTitle>
              <Icon className={`h-4 w-4 ${color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{value}</div>
              <p className="text-xs text-muted-foreground">
                {change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  },
}

/**
 * Profile card displaying a user avatar, name, role, and stats.
 *
 * ```tsx
 * <Card className="w-64 text-center">
 *   <CardHeader className="items-center pb-2">
 *     <Avatar className="h-16 w-16">
 *       <AvatarImage src="..." alt="Name" />
 *       <AvatarFallback>AB</AvatarFallback>
 *     </Avatar>
 *     <CardTitle>Name</CardTitle>
 *     <CardDescription>Role</CardDescription>
 *   </CardHeader>
 *   <CardContent>...</CardContent>
 *   <CardFooter>...</CardFooter>
 * </Card>
 * ```
 */
export const AsProfileCard: Story = {
  name: "As Profile Card",
  render: () => (
    <Card className="w-64 text-center">
      <CardHeader className="items-center pb-2">
        <Avatar className="h-16 w-16">
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt="Sarah Johnson"
          />
          <AvatarFallback>SJ</AvatarFallback>
        </Avatar>
        <CardTitle className="mt-2">Sarah Johnson</CardTitle>
        <CardDescription>Lead Product Designer</CardDescription>
        <div className="flex gap-1 pt-1">
          <Badge variant="secondary">Figma</Badge>
          <Badge variant="secondary">UX</Badge>
        </div>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        <div className="flex justify-around py-2">
          <div>
            <p className="font-semibold text-foreground">42</p>
            <p className="text-xs">Projects</p>
          </div>
          <div>
            <p className="font-semibold text-foreground">1.2k</p>
            <p className="text-xs">Followers</p>
          </div>
          <div>
            <p className="font-semibold text-foreground">4.9</p>
            <p className="text-xs flex items-center justify-center gap-0.5">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              Rating
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="outline" className="flex-1" size="sm">
          Message
        </Button>
        <Button className="flex-1" size="sm">
          Follow
        </Button>
      </CardFooter>
    </Card>
  ),
}

// ─── ASPIRE / REAL-WORLD COMPOSITIONS ──────────────

/**
 * Creator card as it appears in the Aspire Contacts/Creators list.
 * Shows avatar, social handles, engagement metrics, and action buttons.
 *
 * ```tsx
 * <Card className="w-72">
 *   <CardHeader className="flex flex-row items-start gap-3">
 *     <Avatar className="h-12 w-12">...</Avatar>
 *     <div className="flex-1">
 *       <CardTitle className="text-base">Creator Name</CardTitle>
 *       <CardDescription>@handle</CardDescription>
 *     </div>
 *     <CardAction>
 *       <Badge variant="secondary">Active</Badge>
 *     </CardAction>
 *   </CardHeader>
 * </Card>
 * ```
 */
export const CreatorCard: Story = {
  name: "Aspire -- Creator Card",
  render: () => (
    <Card className="w-72">
      <CardHeader className="flex flex-row items-start gap-3">
        <Avatar className="h-12 w-12">
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt="Emma Rodriguez"
          />
          <AvatarFallback>ER</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-0.5">
          <CardTitle className="text-base">Emma Rodriguez</CardTitle>
          <CardDescription>@emmabeauty</CardDescription>
        </div>
        <CardAction>
          <Badge variant="secondary">Active</Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Instagram className="h-3.5 w-3.5" />
            <span>125k</span>
          </div>
          <div className="flex items-center gap-1">
            <Youtube className="h-3.5 w-3.5" />
            <span>89k</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart className="h-3.5 w-3.5" />
            <span>4.8%</span>
          </div>
        </div>
        <div className="flex gap-1 mt-3">
          <Badge variant="outline" className="text-xs">
            Beauty
          </Badge>
          <Badge variant="outline" className="text-xs">
            Lifestyle
          </Badge>
          <Badge variant="outline" className="text-xs">
            Fashion
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="outline" size="sm" className="flex-1">
          <Eye className="mr-1.5 h-3.5 w-3.5" />
          View
        </Button>
        <Button size="sm" className="flex-1">
          <MessageSquare className="mr-1.5 h-3.5 w-3.5" />
          Message
        </Button>
      </CardFooter>
    </Card>
  ),
}

/**
 * Campaign summary card for the dashboard overview.
 */
export const CampaignSummaryCard: Story = {
  name: "Aspire -- Campaign Summary Card",
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
            <Zap className="h-4 w-4 text-primary" />
          </div>
          <div>
            <CardTitle className="text-base">Summer Glow 2025</CardTitle>
            <CardDescription>Beauty &amp; Skincare</CardDescription>
          </div>
        </div>
        <CardAction>
          <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
            Active
          </Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-lg font-bold">12</p>
            <p className="text-xs text-muted-foreground">Creators</p>
          </div>
          <div>
            <p className="text-lg font-bold">1.2M</p>
            <p className="text-xs text-muted-foreground">Impressions</p>
          </div>
          <div>
            <p className="text-lg font-bold">$850</p>
            <p className="text-xs text-muted-foreground">Avg. CPM</p>
          </div>
        </div>
        <div className="mt-3 h-2 w-full rounded-full bg-muted">
          <div
            className="h-2 rounded-full bg-primary"
            style={{ width: "68%" }}
          />
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          68% of budget spent ($17,000 / $25,000)
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-xs text-muted-foreground">Ends Aug 31, 2025</p>
        <Button variant="ghost" size="sm">
          View Details
          <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
        </Button>
      </CardFooter>
    </Card>
  ),
}

/**
 * Metric card with trend indicator. Used on the Aspire Analytics dashboard.
 *
 * ```tsx
 * <Card>
 *   <CardHeader className="flex flex-row items-center justify-between pb-2">
 *     <CardTitle className="text-sm font-medium text-muted-foreground">
 *       Metric Label
 *     </CardTitle>
 *     <Icon className="h-4 w-4" />
 *   </CardHeader>
 *   <CardContent>
 *     <div className="text-2xl font-bold">Value</div>
 *     <p className="text-xs text-emerald-600">+Change from last period</p>
 *   </CardContent>
 * </Card>
 * ```
 */
export const MetricCard: Story = {
  name: "Aspire -- Metric Card",
  render: () => (
    <Card className="w-64">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Total Engagement
        </CardTitle>
        <TrendingUp className="h-4 w-4 text-emerald-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">48,294</div>
        <div className="flex items-center gap-1 mt-1">
          <span className="text-xs font-medium text-emerald-600">
            +12.5%
          </span>
          <span className="text-xs text-muted-foreground">
            from last month
          </span>
        </div>
      </CardContent>
    </Card>
  ),
}

/**
 * Settings section card. Groups related settings with toggles inside a card.
 *
 * ```tsx
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Email Notifications</CardTitle>
 *     <CardDescription>Choose what emails you receive.</CardDescription>
 *   </CardHeader>
 *   <CardContent className="space-y-4">
 *     <div className="flex items-center justify-between">
 *       <Label>Campaign updates</Label>
 *       <Switch defaultChecked />
 *     </div>
 *   </CardContent>
 * </Card>
 * ```
 */
export const SettingsSection: Story = {
  name: "Aspire -- Settings Section",
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Email Notifications</CardTitle>
        <CardDescription>
          Choose which email notifications you would like to receive.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Campaign updates</p>
            <p className="text-xs text-muted-foreground">
              New applications, content submissions
            </p>
          </div>
          <Switch defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Creator messages</p>
            <p className="text-xs text-muted-foreground">
              Direct messages from creators
            </p>
          </div>
          <Switch defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Weekly digest</p>
            <p className="text-xs text-muted-foreground">
              Summary of campaign performance
            </p>
          </div>
          <Switch />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Marketing emails</p>
            <p className="text-xs text-muted-foreground">
              Product updates and announcements
            </p>
          </div>
          <Switch />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button size="sm">Save Preferences</Button>
      </CardFooter>
    </Card>
  ),
}

/**
 * Pricing plan cards. Shows multiple tiers side by side with highlighted
 * recommended plan.
 */
export const PricingCards: Story = {
  name: "Pricing Plans",
  render: () => {
    const plans = [
      {
        name: "Starter",
        price: "$0",
        description: "Perfect for trying Aspire",
        features: [
          "5 campaigns",
          "50 creator searches",
          "Basic analytics",
          "Email support",
        ],
        cta: "Get started",
        variant: "outline" as const,
        highlight: false,
      },
      {
        name: "Pro",
        price: "$99",
        description: "Best for growing brands",
        features: [
          "Unlimited campaigns",
          "Unlimited searches",
          "Advanced analytics",
          "Priority support",
          "API access",
        ],
        cta: "Start free trial",
        variant: "default" as const,
        highlight: true,
      },
    ]
    return (
      <div className="flex gap-4">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`w-56 ${plan.highlight ? "border-primary shadow-md" : ""}`}
          >
            {plan.highlight && (
              <div className="rounded-t-xl bg-primary py-1 text-center text-xs font-medium text-primary-foreground">
                Most popular
              </div>
            )}
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {plan.name}
                {plan.highlight && (
                  <Zap className="h-4 w-4 text-primary" />
                )}
              </CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="pt-1">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-sm text-muted-foreground">/mo</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                    {f}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant={plan.variant} className="w-full">
                {plan.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  },
}

// ─── INTERACTION TESTS ─────────────────────────────

/**
 * Verifies that a card with an onClick handler fires the callback when clicked.
 */
export const ClickTest: Story = {
  name: "Test: Card click fires onClick",
  render: (args) => (
    <Card
      className="w-72 cursor-pointer hover:shadow-md transition-shadow"
      onClick={args.onClick}
      role="button"
      tabIndex={0}
    >
      <CardHeader>
        <CardTitle>Clickable Card</CardTitle>
        <CardDescription>Click this card to test the handler.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          This card is interactive and fires onClick when clicked.
        </p>
      </CardContent>
    </Card>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const card = canvas.getByRole("button")
    await userEvent.click(card)
    await expect(args.onClick).toHaveBeenCalledTimes(1)
  },
}

/**
 * Verifies that all sub-components render correctly inside a card.
 */
export const SubComponentsTest: Story = {
  name: "Test: All sub-components render",
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Test Title</CardTitle>
        <CardDescription>Test Description</CardDescription>
        <CardAction>
          <Button variant="ghost" size="icon" aria-label="Test Action">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p data-testid="card-content-text">Test Content</p>
      </CardContent>
      <CardFooter>
        <Button size="sm">Test Footer Button</Button>
      </CardFooter>
    </Card>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Verify all sub-components render
    await expect(canvas.getByText("Test Title")).toBeVisible()
    await expect(canvas.getByText("Test Description")).toBeVisible()
    await expect(canvas.getByText("Test Content")).toBeVisible()
    await expect(
      canvas.getByRole("button", { name: "Test Action" })
    ).toBeVisible()
    await expect(
      canvas.getByRole("button", { name: "Test Footer Button" })
    ).toBeVisible()
  },
}
