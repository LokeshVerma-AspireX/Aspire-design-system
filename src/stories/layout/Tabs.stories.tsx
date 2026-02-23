import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "storybook/test"
import { within, userEvent, expect } from "storybook/test"
import { useState } from "react"
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  User,
  FileText,
  Mail,
  BarChart3,
  Settings,
  Eye,
  Inbox,
  Users,
  Image,
  Bell,
  Shield,
  CreditCard,
  Palette,
} from "lucide-react"

/**
 * # Tabs
 *
 * A set of layered sections of content, known as tab panels, that are displayed
 * one at a time. Built on Radix UI Tabs primitive with two visual variants and
 * support for both horizontal and vertical orientations.
 *
 * ## When to Use
 * - To organize related content into switchable panels (e.g. contact detail views)
 * - To separate logical sections within a page without navigation (e.g. Overview / Content / Inbox)
 * - For settings pages with grouped categories
 * - When horizontal space is limited and content is mutually exclusive
 *
 * ## When NOT to Use
 * - For primary site navigation -- use a navbar or sidebar instead
 * - When all content should be visible at once -- use Accordion or stacked sections
 * - For step-by-step flows -- use a Stepper or Wizard
 * - When there are more than 6-8 tabs -- consider a sidebar or dropdown navigation
 *
 * ## Accessibility
 * - Uses `role="tablist"`, `role="tab"`, and `role="tabpanel"` automatically
 * - Arrow keys move focus between tabs (left/right for horizontal, up/down for vertical)
 * - Enter or Space activates the focused tab
 * - Disabled tabs are removed from keyboard navigation
 * - Each tab panel is associated with its trigger via `aria-controls` / `aria-labelledby`
 *
 * ## Import
 * ```tsx
 * import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
 * ```
 *
 * ## Quick Start
 * ```tsx
 * <Tabs defaultValue="overview">
 *   <TabsList>
 *     <TabsTrigger value="overview">Overview</TabsTrigger>
 *     <TabsTrigger value="content">Content</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="overview">Overview panel</TabsContent>
 *   <TabsContent value="content">Content panel</TabsContent>
 * </Tabs>
 * ```
 */
const meta: Meta<typeof Tabs> = {
  title: "5. Layout/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Tab navigation component with default (filled) and line (underline) variants, horizontal and vertical orientations. Built on Radix UI Tabs.",
      },
    },
  },
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description:
        "The orientation of the tab list. Controls arrow-key navigation direction and layout axis.",
      table: {
        type: { summary: '"horizontal" | "vertical"' },
        defaultValue: { summary: "horizontal" },
        category: "Layout",
      },
    },
    defaultValue: {
      control: "text",
      description:
        "The value of the tab that should be active when initially rendered. Use for uncontrolled tabs.",
      table: {
        type: { summary: "string" },
        category: "State",
      },
    },
    value: {
      control: "text",
      description:
        "The controlled value of the active tab. Must be used with `onValueChange`.",
      table: {
        type: { summary: "string" },
        category: "State",
      },
    },
    onValueChange: {
      action: "valueChanged",
      description: "Callback fired when the active tab changes.",
      table: {
        type: { summary: "(value: string) => void" },
        category: "Events",
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes applied to the root Tabs element.",
      table: {
        type: { summary: "string" },
        category: "Appearance",
      },
    },
  },
  args: {
    onValueChange: fn(),
  },
}

export default meta
type Story = StoryObj<typeof Tabs>

// ─── DEFAULT VARIANT ──────────────────────────────

/**
 * Default tab style with a muted background container around the tab triggers.
 * The active tab gets a white/card background with a subtle shadow.
 *
 * ```tsx
 * <Tabs defaultValue="overview">
 *   <TabsList>
 *     <TabsTrigger value="overview">Overview</TabsTrigger>
 *     <TabsTrigger value="analytics">Analytics</TabsTrigger>
 *     <TabsTrigger value="reports">Reports</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="overview">Overview content</TabsContent>
 *   <TabsContent value="analytics">Analytics content</TabsContent>
 *   <TabsContent value="reports">Reports content</TabsContent>
 * </Tabs>
 * ```
 */
export const Default: Story = {
  render: (args) => (
    <Tabs defaultValue="overview" className="w-[400px]" {...args}>
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="rounded-md border p-4 text-sm">
        Campaign overview with key metrics and summary data.
      </TabsContent>
      <TabsContent value="analytics" className="rounded-md border p-4 text-sm">
        Detailed analytics charts and performance breakdowns.
      </TabsContent>
      <TabsContent value="reports" className="rounded-md border p-4 text-sm">
        Exportable reports and downloadable summaries.
      </TabsContent>
    </Tabs>
  ),
}

// ─── LINE VARIANT ─────────────────────────────────

/**
 * Line variant with a transparent background and an underline indicator
 * on the active tab. Ideal for page-level navigation where tabs sit below
 * a page header.
 *
 * ```tsx
 * <Tabs defaultValue="details">
 *   <TabsList variant="line">
 *     <TabsTrigger value="details">Details</TabsTrigger>
 *     <TabsTrigger value="creators">Creators</TabsTrigger>
 *     <TabsTrigger value="analytics">Analytics</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="details">...</TabsContent>
 * </Tabs>
 * ```
 */
export const LineVariant: Story = {
  name: "Line Variant",
  render: (args) => (
    <Tabs defaultValue="details" className="w-[400px]" {...args}>
      <TabsList variant="line">
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="creators">Creators</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
      </TabsList>
      <TabsContent value="details" className="pt-4 text-sm">
        Campaign details including name, description, and target audience.
      </TabsContent>
      <TabsContent value="creators" className="pt-4 text-sm">
        List of creators assigned to this campaign.
      </TabsContent>
      <TabsContent value="analytics" className="pt-4 text-sm">
        Campaign performance metrics and engagement data.
      </TabsContent>
    </Tabs>
  ),
}

// ─── VERTICAL ORIENTATION ─────────────────────────

/**
 * Vertical tab layout with the tab list on the left and content on the right.
 * Useful for settings pages and longer navigation lists.
 *
 * ```tsx
 * <Tabs defaultValue="profile" orientation="vertical">
 *   <TabsList>
 *     <TabsTrigger value="profile">Profile</TabsTrigger>
 *     <TabsTrigger value="notifications">Notifications</TabsTrigger>
 *     <TabsTrigger value="security">Security</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="profile">Profile settings...</TabsContent>
 * </Tabs>
 * ```
 */
export const VerticalOrientation: Story = {
  name: "Vertical Orientation",
  render: (args) => (
    <Tabs
      defaultValue="profile"
      orientation="vertical"
      className="w-[500px]"
      {...args}
    >
      <TabsList>
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
      </TabsList>
      <TabsContent value="profile" className="rounded-md border p-4 text-sm">
        Manage your profile information, display name, and avatar.
      </TabsContent>
      <TabsContent
        value="notifications"
        className="rounded-md border p-4 text-sm"
      >
        Configure email and push notification preferences.
      </TabsContent>
      <TabsContent value="security" className="rounded-md border p-4 text-sm">
        Update password, enable two-factor authentication.
      </TabsContent>
      <TabsContent value="billing" className="rounded-md border p-4 text-sm">
        Manage your subscription, payment methods, and invoices.
      </TabsContent>
    </Tabs>
  ),
}

/**
 * Vertical orientation with the line variant. Produces a left-side underline
 * indicator instead of the filled background.
 */
export const VerticalLineVariant: Story = {
  name: "Vertical + Line Variant",
  render: (args) => (
    <Tabs
      defaultValue="general"
      orientation="vertical"
      className="w-[500px]"
      {...args}
    >
      <TabsList variant="line">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="appearance">Appearance</TabsTrigger>
        <TabsTrigger value="integrations">Integrations</TabsTrigger>
      </TabsList>
      <TabsContent value="general" className="pl-4 text-sm">
        General application settings and preferences.
      </TabsContent>
      <TabsContent value="appearance" className="pl-4 text-sm">
        Theme, colors, and layout customization.
      </TabsContent>
      <TabsContent value="integrations" className="pl-4 text-sm">
        Connect third-party services and APIs.
      </TabsContent>
    </Tabs>
  ),
}

// ─── WITH ICONS ───────────────────────────────────

/**
 * Tabs with leading icons in each trigger. Icons provide additional visual
 * cues and help users scan the tab bar quickly.
 *
 * ```tsx
 * <Tabs defaultValue="overview">
 *   <TabsList>
 *     <TabsTrigger value="overview">
 *       <Eye className="h-4 w-4" />
 *       Overview
 *     </TabsTrigger>
 *     <TabsTrigger value="content">
 *       <FileText className="h-4 w-4" />
 *       Content
 *     </TabsTrigger>
 *   </TabsList>
 * </Tabs>
 * ```
 */
export const WithIcons: Story = {
  name: "With Icons",
  render: (args) => (
    <Tabs defaultValue="overview" className="w-[500px]" {...args}>
      <TabsList>
        <TabsTrigger value="overview">
          <Eye className="h-4 w-4" />
          Overview
        </TabsTrigger>
        <TabsTrigger value="content">
          <FileText className="h-4 w-4" />
          Content
        </TabsTrigger>
        <TabsTrigger value="inbox">
          <Mail className="h-4 w-4" />
          Inbox
        </TabsTrigger>
        <TabsTrigger value="analytics">
          <BarChart3 className="h-4 w-4" />
          Analytics
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="rounded-md border p-4 text-sm">
        Creator overview with engagement metrics and recent activity.
      </TabsContent>
      <TabsContent value="content" className="rounded-md border p-4 text-sm">
        Published content, posts, and media assets.
      </TabsContent>
      <TabsContent value="inbox" className="rounded-md border p-4 text-sm">
        Direct messages and communication threads.
      </TabsContent>
      <TabsContent value="analytics" className="rounded-md border p-4 text-sm">
        Performance analytics and ROI tracking.
      </TabsContent>
    </Tabs>
  ),
}

/**
 * Line variant tabs with icons. Combines the underline indicator with
 * icon-enhanced triggers.
 */
export const LineVariantWithIcons: Story = {
  name: "Line Variant + Icons",
  render: (args) => (
    <Tabs defaultValue="overview" className="w-[500px]" {...args}>
      <TabsList variant="line">
        <TabsTrigger value="overview">
          <Eye className="h-4 w-4" />
          Overview
        </TabsTrigger>
        <TabsTrigger value="content">
          <FileText className="h-4 w-4" />
          Content
        </TabsTrigger>
        <TabsTrigger value="inbox">
          <Mail className="h-4 w-4" />
          Inbox
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="pt-4 text-sm">
        Creator overview with key metrics.
      </TabsContent>
      <TabsContent value="content" className="pt-4 text-sm">
        Content gallery and post management.
      </TabsContent>
      <TabsContent value="inbox" className="pt-4 text-sm">
        Inbox messages and conversations.
      </TabsContent>
    </Tabs>
  ),
}

// ─── DISABLED TAB ─────────────────────────────────

/**
 * Tabs with a disabled trigger. Disabled tabs cannot be activated and
 * are visually dimmed with reduced opacity.
 *
 * ```tsx
 * <TabsTrigger value="billing" disabled>
 *   Billing
 * </TabsTrigger>
 * ```
 */
export const WithDisabledTab: Story = {
  name: "With Disabled Tab",
  render: (args) => (
    <Tabs defaultValue="profile" className="w-[400px]" {...args}>
      <TabsList>
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="billing" disabled>
          Billing (Coming Soon)
        </TabsTrigger>
      </TabsList>
      <TabsContent value="profile" className="rounded-md border p-4 text-sm">
        Edit your public profile information.
      </TabsContent>
      <TabsContent value="account" className="rounded-md border p-4 text-sm">
        Manage account settings and preferences.
      </TabsContent>
      <TabsContent value="billing" className="rounded-md border p-4 text-sm">
        Billing information will appear here.
      </TabsContent>
    </Tabs>
  ),
}

// ─── CONTROLLED ───────────────────────────────────

/**
 * Controlled tabs where the active tab is managed via React state.
 * Useful when you need to programmatically switch tabs or sync tab
 * state with a URL parameter.
 *
 * ```tsx
 * const [tab, setTab] = useState("overview")
 * <Tabs value={tab} onValueChange={setTab}>
 *   <TabsList>
 *     <TabsTrigger value="overview">Overview</TabsTrigger>
 *     <TabsTrigger value="content">Content</TabsTrigger>
 *   </TabsList>
 *   ...
 * </Tabs>
 * <Button onClick={() => setTab("content")}>Go to Content</Button>
 * ```
 */
export const Controlled: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState("overview")
    return (
      <div className="w-[400px] space-y-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="inbox">Inbox</TabsTrigger>
          </TabsList>
          <TabsContent
            value="overview"
            className="rounded-md border p-4 text-sm"
          >
            Overview panel content.
          </TabsContent>
          <TabsContent
            value="content"
            className="rounded-md border p-4 text-sm"
          >
            Content panel content.
          </TabsContent>
          <TabsContent
            value="inbox"
            className="rounded-md border p-4 text-sm"
          >
            Inbox panel content.
          </TabsContent>
        </Tabs>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setActiveTab("overview")}
          >
            Go to Overview
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setActiveTab("content")}
          >
            Go to Content
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setActiveTab("inbox")}
          >
            Go to Inbox
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Active tab: <code className="font-mono">{activeTab}</code>
        </p>
      </div>
    )
  },
}

// ─── WITH RICH CONTENT ────────────────────────────

/**
 * Tabs with rich content inside each panel, including forms, lists,
 * and structured layouts. Demonstrates how tabs work as a container
 * for complex UI.
 */
export const WithRichContent: Story = {
  name: "With Rich Content",
  render: (args) => (
    <Tabs defaultValue="profile" className="w-[480px]" {...args}>
      <TabsList>
        <TabsTrigger value="profile">
          <User className="h-4 w-4" />
          Profile
        </TabsTrigger>
        <TabsTrigger value="notifications">
          <Bell className="h-4 w-4" />
          Notifications
        </TabsTrigger>
        <TabsTrigger value="security">
          <Shield className="h-4 w-4" />
          Security
        </TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <div className="space-y-4 rounded-md border p-4">
          <div className="space-y-1">
            <h3 className="text-sm font-medium">Profile Settings</h3>
            <p className="text-xs text-muted-foreground">
              Update your personal information.
            </p>
          </div>
          <div className="grid gap-3">
            <div className="grid gap-1.5">
              <Label htmlFor="tabs-name">Display name</Label>
              <Input id="tabs-name" defaultValue="Emma Rodriguez" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="tabs-email">Email</Label>
              <Input
                id="tabs-email"
                type="email"
                defaultValue="emma@aspire.io"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button size="sm">Save Changes</Button>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="notifications">
        <div className="space-y-3 rounded-md border p-4">
          <div className="space-y-1">
            <h3 className="text-sm font-medium">Notification Preferences</h3>
            <p className="text-xs text-muted-foreground">
              Choose how you want to be notified.
            </p>
          </div>
          {["Email notifications", "Push notifications", "SMS alerts"].map(
            (item) => (
              <div
                key={item}
                className="flex items-center justify-between rounded-md border px-3 py-2"
              >
                <span className="text-sm">{item}</span>
                <div className="h-5 w-9 rounded-full bg-muted" />
              </div>
            )
          )}
        </div>
      </TabsContent>
      <TabsContent value="security">
        <div className="space-y-3 rounded-md border p-4">
          <div className="space-y-1">
            <h3 className="text-sm font-medium">Security Settings</h3>
            <p className="text-xs text-muted-foreground">
              Keep your account secure.
            </p>
          </div>
          <div className="grid gap-3">
            <div className="grid gap-1.5">
              <Label htmlFor="tabs-password">Current password</Label>
              <Input id="tabs-password" type="password" placeholder="********" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="tabs-new-password">New password</Label>
              <Input
                id="tabs-new-password"
                type="password"
                placeholder="********"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button size="sm">Update Password</Button>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  ),
}

// ─── ALL VARIANTS GALLERY ─────────────────────────

/** Side-by-side comparison of default and line tab list variants. */
export const AllVariants: Story = {
  name: "All Variants",
  render: () => (
    <div className="w-[400px] space-y-8">
      <div className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Default Variant
        </p>
        <Tabs defaultValue="tab1">
          <TabsList variant="default">
            <TabsTrigger value="tab1">Account</TabsTrigger>
            <TabsTrigger value="tab2">Password</TabsTrigger>
            <TabsTrigger value="tab3">Settings</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Line Variant
        </p>
        <Tabs defaultValue="tab1">
          <TabsList variant="line">
            <TabsTrigger value="tab1">Account</TabsTrigger>
            <TabsTrigger value="tab2">Password</TabsTrigger>
            <TabsTrigger value="tab3">Settings</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  ),
}

// ─── ASPIRE REAL-WORLD COMPOSITIONS ───────────────

/**
 * Contact detail page tabs used in the Aspire platform. Shows the four main
 * tabs for viewing creator contact information: Overview, Content, Inbox,
 * and Profile.
 *
 * ```tsx
 * <Tabs defaultValue="overview">
 *   <TabsList variant="line">
 *     <TabsTrigger value="overview"><Eye /> Overview</TabsTrigger>
 *     <TabsTrigger value="content"><FileText /> Content</TabsTrigger>
 *     <TabsTrigger value="inbox"><Mail /> Inbox</TabsTrigger>
 *     <TabsTrigger value="profile"><User /> Profile</TabsTrigger>
 *   </TabsList>
 *   ...
 * </Tabs>
 * ```
 */
export const ContactDetailTabs: Story = {
  name: "Real World -- Contact Detail Tabs",
  render: () => (
    <div className="w-[560px] rounded-lg border bg-card">
      <div className="border-b px-6 pt-4">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
            ER
          </div>
          <div>
            <h2 className="text-sm font-semibold">Emma Rodriguez</h2>
            <p className="text-xs text-muted-foreground">
              @emmarod -- 125K followers
            </p>
          </div>
        </div>
        <Tabs defaultValue="overview">
          <TabsList variant="line">
            <TabsTrigger value="overview">
              <Eye className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="content">
              <FileText className="h-4 w-4" />
              Content
            </TabsTrigger>
            <TabsTrigger value="inbox">
              <Mail className="h-4 w-4" />
              Inbox
            </TabsTrigger>
            <TabsTrigger value="profile">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="p-6">
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Engagement", value: "4.2%" },
                { label: "Avg. Likes", value: "5,230" },
                { label: "Posts", value: "342" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-md border p-3">
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="text-lg font-semibold">{stat.value}</p>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="content" className="p-6 text-sm text-muted-foreground">
            Content gallery showing recent posts and media assets.
          </TabsContent>
          <TabsContent value="inbox" className="p-6 text-sm text-muted-foreground">
            Message threads and email conversations with this creator.
          </TabsContent>
          <TabsContent value="profile" className="p-6 text-sm text-muted-foreground">
            Detailed profile information, contact details, and social links.
          </TabsContent>
        </Tabs>
      </div>
    </div>
  ),
}

/**
 * Campaign detail tabs with Details, Creators, and Analytics sections.
 * Demonstrates tabs with badge counts on triggers.
 */
export const CampaignTabs: Story = {
  name: "Real World -- Campaign Tabs",
  render: () => (
    <div className="w-[520px] rounded-lg border bg-card">
      <div className="border-b px-6 py-4">
        <h2 className="text-base font-semibold">Summer Glow Campaign</h2>
        <p className="text-xs text-muted-foreground">Active -- 12 creators assigned</p>
      </div>
      <Tabs defaultValue="details">
        <div className="border-b px-6">
          <TabsList variant="line">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="creators">
              Creators
              <Badge variant="secondary" className="ml-1.5 text-xs">
                12
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="details" className="p-6 text-sm">
          <div className="space-y-3">
            <div>
              <p className="text-xs text-muted-foreground">Campaign Type</p>
              <p className="font-medium">Product Seeding</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Budget</p>
              <p className="font-medium">$15,000</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Timeline</p>
              <p className="font-medium">Jun 1 -- Aug 31, 2025</p>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="creators" className="p-6 text-sm text-muted-foreground">
          Creator roster with status, deliverables, and performance metrics.
        </TabsContent>
        <TabsContent value="analytics" className="p-6 text-sm text-muted-foreground">
          Campaign analytics: impressions, engagement, and ROI breakdown.
        </TabsContent>
      </Tabs>
    </div>
  ),
}

/**
 * Settings page with vertical tabs for navigating between settings categories.
 * Mirrors a typical SaaS settings layout.
 */
export const SettingsTabs: Story = {
  name: "Real World -- Settings Page",
  render: () => (
    <div className="w-[600px] rounded-lg border bg-card p-6">
      <h2 className="mb-4 text-base font-semibold">Settings</h2>
      <Tabs defaultValue="general" orientation="vertical">
        <TabsList variant="line">
          <TabsTrigger value="general">
            <Settings className="h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Palette className="h-4 w-4" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="billing">
            <CreditCard className="h-4 w-4" />
            Billing
          </TabsTrigger>
          <TabsTrigger value="team">
            <Users className="h-4 w-4" />
            Team
          </TabsTrigger>
        </TabsList>
        <TabsContent value="general" className="rounded-md border p-4">
          <h3 className="mb-2 text-sm font-medium">General Settings</h3>
          <div className="space-y-3">
            <div className="grid gap-1.5">
              <Label htmlFor="settings-org">Organization name</Label>
              <Input id="settings-org" defaultValue="Aspire Inc." />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="settings-url">Workspace URL</Label>
              <Input
                id="settings-url"
                defaultValue="aspire.io/workspace"
                readOnly
              />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="appearance" className="rounded-md border p-4 text-sm text-muted-foreground">
          Theme, logo, and brand color customization options.
        </TabsContent>
        <TabsContent value="notifications" className="rounded-md border p-4 text-sm text-muted-foreground">
          Email digest frequency and notification channel preferences.
        </TabsContent>
        <TabsContent value="billing" className="rounded-md border p-4 text-sm text-muted-foreground">
          Subscription plan, payment method, and invoice history.
        </TabsContent>
        <TabsContent value="team" className="rounded-md border p-4 text-sm text-muted-foreground">
          Team member management, roles, and permissions.
        </TabsContent>
      </Tabs>
    </div>
  ),
}

// ─── INTERACTION TESTS ────────────────────────────

/**
 * Verifies that clicking a tab trigger switches the visible content panel.
 * Asserts the first panel is visible by default, then clicks the second tab
 * and confirms the second panel becomes visible.
 */
export const TabSwitchTest: Story = {
  name: "Test: Tab click switches content",
  render: (args) => (
    <Tabs defaultValue="first" className="w-[400px]" {...args}>
      <TabsList>
        <TabsTrigger value="first">First</TabsTrigger>
        <TabsTrigger value="second">Second</TabsTrigger>
        <TabsTrigger value="third">Third</TabsTrigger>
      </TabsList>
      <TabsContent value="first">
        <p data-testid="panel-first">First panel content</p>
      </TabsContent>
      <TabsContent value="second">
        <p data-testid="panel-second">Second panel content</p>
      </TabsContent>
      <TabsContent value="third">
        <p data-testid="panel-third">Third panel content</p>
      </TabsContent>
    </Tabs>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // First panel should be visible by default
    await expect(canvas.getByTestId("panel-first")).toBeVisible()

    // Click second tab
    const secondTab = canvas.getByRole("tab", { name: "Second" })
    await userEvent.click(secondTab)

    // Second panel should now be visible
    await expect(canvas.getByTestId("panel-second")).toBeVisible()

    // First panel should no longer be visible
    const firstPanel = canvas.queryByTestId("panel-first")
    if (firstPanel) {
      expect(firstPanel).not.toBeVisible()
    }
  },
}

/**
 * Verifies that a disabled tab cannot be activated. Clicks the disabled tab
 * and confirms the original content panel remains visible.
 */
export const DisabledTabTest: Story = {
  name: "Test: Disabled tab cannot activate",
  render: (args) => (
    <Tabs defaultValue="active" className="w-[400px]" {...args}>
      <TabsList>
        <TabsTrigger value="active">Active Tab</TabsTrigger>
        <TabsTrigger value="disabled" disabled>
          Disabled Tab
        </TabsTrigger>
      </TabsList>
      <TabsContent value="active">
        <p data-testid="panel-active">Active panel is visible</p>
      </TabsContent>
      <TabsContent value="disabled">
        <p data-testid="panel-disabled">Disabled panel content</p>
      </TabsContent>
    </Tabs>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByTestId("panel-active")).toBeVisible()
    const disabledTab = canvas.getByRole("tab", { name: "Disabled Tab" })
    await expect(disabledTab).toBeDisabled()
  },
}

/**
 * Verifies keyboard navigation between tabs. Uses arrow keys to move
 * focus and Enter to activate tabs.
 */
export const KeyboardNavigationTest: Story = {
  name: "Test: Keyboard navigation",
  render: (args) => (
    <Tabs defaultValue="alpha" className="w-[400px]" {...args}>
      <TabsList>
        <TabsTrigger value="alpha">Alpha</TabsTrigger>
        <TabsTrigger value="beta">Beta</TabsTrigger>
        <TabsTrigger value="gamma">Gamma</TabsTrigger>
      </TabsList>
      <TabsContent value="alpha">
        <p data-testid="panel-alpha">Alpha content</p>
      </TabsContent>
      <TabsContent value="beta">
        <p data-testid="panel-beta">Beta content</p>
      </TabsContent>
      <TabsContent value="gamma">
        <p data-testid="panel-gamma">Gamma content</p>
      </TabsContent>
    </Tabs>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Focus the first tab
    const alphaTab = canvas.getByRole("tab", { name: "Alpha" })
    await userEvent.click(alphaTab)
    await expect(canvas.getByTestId("panel-alpha")).toBeVisible()

    // Press right arrow to move to Beta, then Enter to activate
    await userEvent.keyboard("{ArrowRight}")
    await expect(canvas.getByTestId("panel-beta")).toBeVisible()

    // Press right arrow again to move to Gamma
    await userEvent.keyboard("{ArrowRight}")
    await expect(canvas.getByTestId("panel-gamma")).toBeVisible()
  },
}
