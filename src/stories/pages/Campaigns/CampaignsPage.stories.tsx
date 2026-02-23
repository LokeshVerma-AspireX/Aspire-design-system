import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { CampaignsPage } from "@/components/campaigns/CampaignsPage"
import { AppShell } from "@/components/layout/AppShell"
import type { Campaign } from "@/components/campaigns/CampaignCard"
import type { CampaignAnalyticsTabProps } from "@/components/campaigns/CampaignAnalyticsTab"

// ─── Sample campaigns ────────────────────────────────────────────────────────

const SAMPLE_CAMPAIGNS: Campaign[] = [
  {
    id: "1",
    name: "Summer Style Refresh 2026",
    coverImageUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&h=400&fit=crop",
    status: "active",
    type: "sponsored",
    startDate: "2026-01-15",
    endDate: "2026-03-30",
    creatorCount: 24,
    contentCount: 156,
    revenue: 45200,
    progress: 65,
    creators: [
      { name: "Sarah Chen", initials: "SC" },
      { name: "Mike Johnson", initials: "MJ" },
      { name: "Lisa Park", initials: "LP" },
      { name: "Alex Rivera", initials: "AR" },
    ],
  },
  {
    id: "2",
    name: "Petfluencer Perks",
    coverImageUrl: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=400&fit=crop",
    status: "active",
    type: "gifted",
    startDate: "2026-02-01",
    endDate: "2026-04-15",
    creatorCount: 48,
    contentCount: 312,
    revenue: 12800,
    progress: 40,
    creators: [
      { name: "Jordan Lee", initials: "JL" },
      { name: "Emma Wilson", initials: "EW" },
      { name: "David Kim", initials: "DK" },
    ],
  },
  {
    id: "3",
    name: "Fitness Challenge Q1",
    coverImageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop",
    status: "completed",
    type: "affiliate",
    startDate: "2026-01-01",
    endDate: "2026-03-31",
    creatorCount: 120,
    contentCount: 890,
    revenue: 89300,
    progress: 100,
    creators: [
      { name: "Tyler Brooks", initials: "TB" },
      { name: "Ava Martinez", initials: "AM" },
      { name: "Noah Clark", initials: "NC" },
      { name: "Mia Zhang", initials: "MZ" },
    ],
  },
  {
    id: "4",
    name: "VIP Brand Ambassadors",
    coverImageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
    status: "active",
    type: "ambassador",
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    creatorCount: 15,
    contentCount: 78,
    revenue: 156000,
    progress: 25,
    creators: [
      { name: "Olivia Scott", initials: "OS" },
      { name: "Liam Brown", initials: "LB" },
    ],
  },
  {
    id: "5",
    name: "Holiday Gift Guide",
    status: "draft",
    type: "sponsored",
    startDate: "2026-11-01",
    endDate: "2026-12-25",
    creatorCount: 0,
    contentCount: 0,
    revenue: 0,
    progress: 0,
  },
  {
    id: "6",
    name: "TikTok Launch Wave",
    coverImageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop",
    status: "paused",
    type: "sponsored",
    startDate: "2026-02-15",
    endDate: "2026-05-15",
    creatorCount: 32,
    contentCount: 198,
    revenue: 23100,
    progress: 55,
    creators: [
      { name: "Zoe Chen", initials: "ZC" },
      { name: "Ryan Patel", initials: "RP" },
      { name: "Grace Kim", initials: "GK" },
    ],
  },
  {
    id: "7",
    name: "Beauty Box Unboxing",
    coverImageUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=400&fit=crop",
    status: "active",
    type: "gifted",
    startDate: "2026-03-01",
    endDate: "2026-06-30",
    creatorCount: 67,
    contentCount: 234,
    revenue: 34500,
    progress: 30,
    creators: [
      { name: "Bella Rose", initials: "BR" },
      { name: "Chris Yang", initials: "CY" },
    ],
  },
  {
    id: "8",
    name: "Tech Review Sprint",
    coverImageUrl: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&h=400&fit=crop",
    status: "active",
    type: "affiliate",
    startDate: "2026-02-01",
    endDate: "2026-04-30",
    creatorCount: 42,
    contentCount: 187,
    revenue: 67800,
    progress: 72,
    creators: [
      { name: "Dev Patel", initials: "DP" },
      { name: "Sam Lee", initials: "SL" },
      { name: "Nina Volkov", initials: "NV" },
    ],
  },
]

// ─── Sample analytics ────────────────────────────────────────────────────────

const SAMPLE_ANALYTICS: CampaignAnalyticsTabProps = {
  kpis: [
    {
      label: "Total Campaigns",
      value: "12",
      change: 20,
      trendLabel: "vs last quarter",
      sparklineData: [{ value: 8 }, { value: 9 }, { value: 10 }, { value: 11 }, { value: 12 }],
    },
    {
      label: "Active Creators",
      value: "348",
      change: 15.3,
      trendLabel: "vs last quarter",
      sparklineData: [{ value: 200 }, { value: 250 }, { value: 290 }, { value: 320 }, { value: 348 }],
    },
    {
      label: "Total Content",
      value: "2,055",
      change: 32.1,
      trendLabel: "vs last quarter",
      sparklineData: [{ value: 1200 }, { value: 1400 }, { value: 1700 }, { value: 1900 }, { value: 2055 }],
    },
    {
      label: "Total Revenue",
      value: "$428.7K",
      change: 24.8,
      trendLabel: "vs last quarter",
      sparklineData: [{ value: 250 }, { value: 300 }, { value: 350 }, { value: 400 }, { value: 429 }],
    },
  ],
  performanceData: [
    { month: "Oct", impressions: 120000, engagement: 8500, revenue: 28000 },
    { month: "Nov", impressions: 145000, engagement: 12000, revenue: 35000 },
    { month: "Dec", impressions: 190000, engagement: 15500, revenue: 48000 },
    { month: "Jan", impressions: 210000, engagement: 18000, revenue: 52000 },
    { month: "Feb", impressions: 235000, engagement: 22000, revenue: 61000 },
  ],
  platformData: [
    { name: "Instagram", value: 45, color: "#E1306C" },
    { name: "TikTok", value: 30, color: "#000000" },
    { name: "YouTube", value: 15, color: "#FF0000" },
    { name: "Pinterest", value: 10, color: "#BD081C" },
  ],
  topCampaigns: [
    { id: "1", name: "VIP Brand Ambassadors", creators: 15, content: 78, impressions: 2340000, engagementRate: 4.2, revenue: 156000, roi: 5.2 },
    { id: "2", name: "Fitness Challenge Q1", creators: 120, content: 890, impressions: 1339500, engagementRate: 3.8, revenue: 89300, roi: 3.6 },
    { id: "3", name: "Tech Review Sprint", creators: 42, content: 187, impressions: 1017000, engagementRate: 3.5, revenue: 67800, roi: 4.1 },
    { id: "4", name: "Summer Style Refresh", creators: 24, content: 156, impressions: 678000, engagementRate: 3.1, revenue: 45200, roi: 2.8 },
    { id: "5", name: "Beauty Box Unboxing", creators: 67, content: 234, impressions: 517500, engagementRate: 2.9, revenue: 34500, roi: 2.3 },
  ],
  creatorActivity: [
    { week: "W1", submissions: 42 },
    { week: "W2", submissions: 58 },
    { week: "W3", submissions: 35 },
    { week: "W4", submissions: 72 },
    { week: "W5", submissions: 64 },
    { week: "W6", submissions: 89 },
    { week: "W7", submissions: 51 },
    { week: "W8", submissions: 76 },
  ],
}

const DEFAULT_PROPS = {
  campaigns: SAMPLE_CAMPAIGNS,
  activeTab: "campaigns" as const,
  currentPage: 1,
  totalPages: 2,
  totalItems: 8,
  pageSize: 10,
  analyticsProps: SAMPLE_ANALYTICS,
}

// ─── Meta ────────────────────────────────────────────────────────────────────

/**
 * # CampaignsPage
 *
 * Full campaigns page with card grid view, table view, analytics tab, filters,
 * search, and empty state. Supports switching between card and table layouts.
 *
 * ## Components Used
 * - `CampaignsPage` — main page orchestrating all sub-components
 * - `CampaignCard` — individual campaign card in grid view
 * - `CampaignAnalyticsTab` — analytics dashboard tab with KPIs and charts
 * - `PageHeader` — page title bar with Astra button
 * - `FilterBar` — quick-filter pills for status and type
 * - `ViewToggle` — grid/list view switcher
 * - `DataTable` — sortable table with column definitions for list view
 * - `Pagination` — page navigation for table view
 * - `StatusDot` — colored status indicators
 * - `EmptyState` — empty campaigns prompt with CTA
 * - `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` — campaigns/analytics switching
 * - `Input` — search field
 * - `Button` — create campaign action
 * - `AppShell` — application shell decorator (used in stories)
 *
 * ## Data Requirements
 * - `campaigns` — `Campaign[]` with `id`, `name`, `coverImageUrl?`, `status`, `type`, `startDate`, `endDate`, `creatorCount`, `contentCount`, `revenue`, `progress`, and optional `creators[]`
 * - `analyticsProps` (optional) — `CampaignAnalyticsTabProps` with `kpis`, `performanceData`, `platformData`, `topCampaigns`, `creatorActivity`
 * - Pagination: `currentPage`, `totalPages`, `totalItems`, `pageSize`
 * - Selection (table): `selectedIds` as `Set<string>`, `onSelectId`, `onSelectAll`
 *
 * ## Customization
 * - Switch between `"grid"` and `"list"` view via `viewMode` prop
 * - Control active tab (`"campaigns"` or `"analytics"`) via `activeTab` + `onTabChange`
 * - Provide `onCreateCampaign` / `onViewCampaign` callbacks for navigation
 * - Filter and search are controlled via `searchValue` + `onSearchChange`
 * - Wrap in `AppShell` for sidebar or render standalone
 *
 * ```tsx
 * import { CampaignsPage } from "@/components/campaigns/CampaignsPage"
 * ```
 */
const meta = {
  title: "6. Pages/Campaigns/CampaignsPage",
  component: CampaignsPage,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: DEFAULT_PROPS,
} satisfies Meta<typeof CampaignsPage>

export default meta
type Story = StoryObj

// ─── Stories ─────────────────────────────────────────────────────────────────

/** Card view (default) inside the AppShell. */
export const CardView: Story = {
  render: () => (
    <AppShell activeHref="/campaigns" user={{ name: "Lokesh Verma", initials: "LV" }}>
      <CampaignsPage {...DEFAULT_PROPS} />
    </AppShell>
  ),
}

/** Table view with pagination. */
export const TableView: Story = {
  render: () => (
    <AppShell activeHref="/campaigns" user={{ name: "Lokesh Verma", initials: "LV" }}>
      <CampaignsPage {...DEFAULT_PROPS} viewMode="list" />
    </AppShell>
  ),
}

/** Empty state when no campaigns exist. */
export const Empty: Story = {
  render: () => (
    <AppShell activeHref="/campaigns" user={{ name: "Lokesh Verma", initials: "LV" }}>
      <CampaignsPage
        campaigns={[]}
        totalItems={0}
        totalPages={1}
        analyticsProps={SAMPLE_ANALYTICS}
      />
    </AppShell>
  ),
}

/** Analytics tab active with full data. */
export const AnalyticsTab: Story = {
  render: () => (
    <AppShell activeHref="/campaigns" user={{ name: "Lokesh Verma", initials: "LV" }}>
      <CampaignsPage {...DEFAULT_PROPS} activeTab="analytics" />
    </AppShell>
  ),
}

/** Filtered: only active campaigns. */
export const FilteredActive: Story = {
  render: () => (
    <AppShell activeHref="/campaigns" user={{ name: "Lokesh Verma", initials: "LV" }}>
      <CampaignsPage
        {...DEFAULT_PROPS}
        campaigns={SAMPLE_CAMPAIGNS.filter((c) => c.status === "active")}
        totalItems={5}
        totalPages={1}
      />
    </AppShell>
  ),
}

/** Standalone page without sidebar. */
export const Standalone: Story = {
  render: () => (
    <div className="h-screen">
      <CampaignsPage {...DEFAULT_PROPS} />
    </div>
  ),
}

/** Table view with row selection. */
export const TableWithSelection: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<Set<string>>(new Set(["1", "3"]))
    return (
      <AppShell activeHref="/campaigns" user={{ name: "Lokesh Verma", initials: "LV" }}>
        <CampaignsPage
          {...DEFAULT_PROPS}
          viewMode="list"
          selectedIds={selected}
          onSelectId={(id, checked) => {
            setSelected((prev) => {
              const next = new Set(prev)
              if (checked) next.add(id)
              else next.delete(id)
              return next
            })
          }}
          onSelectAll={(checked) => {
            setSelected(
              checked ? new Set(SAMPLE_CAMPAIGNS.map((c) => c.id)) : new Set()
            )
          }}
        />
      </AppShell>
    )
  },
}
