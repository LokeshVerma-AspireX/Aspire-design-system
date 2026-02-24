import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, within, userEvent } from "storybook/test"
import * as React from "react"
import { AnalyticsPage } from "@/components/analytics/AnalyticsPage"
import { AppShell } from "@/components/layout/AppShell"
import {
  KPI_METRICS,
  PERFORMANCE_DATA,
  PLATFORM_DATA,
  TOP_POSTS,
  POSTS_GRID_DATA,
  POSTS_TABLE_DATA,
  CREATOR_RANKINGS,
  SCATTER_CREATORS,
} from "./sampleData"

/* ────────────────────────────────────────────────────────────────────────────
 * Convenience bundle of all sample data
 * ──────────────────────────────────────────────────────────────────────────── */

const ALL_DATA = {
  kpiMetrics: KPI_METRICS,
  performanceData: PERFORMANCE_DATA,
  platformData: PLATFORM_DATA,
  topPosts: TOP_POSTS,
  postsGridData: POSTS_GRID_DATA,
  postsTableData: POSTS_TABLE_DATA,
  creators: CREATOR_RANKINGS,
  scatterCreators: SCATTER_CREATORS,
}

/**
 * # AnalyticsPage
 *
 * Full analytics and reporting page for the Aspire platform.
 * Presents campaign performance data across four tabs:
 *
 * - **Summary** -- KPI metric cards, performance line chart, platform bar chart,
 *   and a top-posts carousel.
 * - **Posts** -- Grid or table view of all campaign posts with a view toggle.
 * - **Members** -- Ranked creator performance table and a scatter plot mapping
 *   reach vs. engagement rate.
 * - **Networks** -- Placeholder for upcoming network-level analytics.
 *
 * A `DateRangePicker` in the page header controls the reporting window.
 *
 * ## Components Used
 *
 * - `MetricCard` -- KPI cards on the Summary tab
 * - `PerformanceLineChart` -- Multi-line Recharts time series
 * - `PlatformBarChart` -- Grouped bar chart by platform
 * - `TopPostsCarousel` -- Horizontal scrolling post cards
 * - `PostsGrid` / `PostsTable` -- Posts tab content
 * - `CreatorPerformanceTable` -- Ranked creator table
 * - `CreatorScatterChart` -- Scatter plot (reach vs. engagement)
 * - `DateRangePicker` -- Date range selector in header
 * - `Tabs` / `TabsList` / `TabsTrigger` / `TabsContent` -- shadcn/ui tabs
 *
 * ## Data Requirements
 *
 * | Prop | Type | Tab |
 * |------|------|-----|
 * | `kpiMetrics` | `KpiMetric[]` | Summary |
 * | `performanceData` | `PerformanceDataPoint[]` | Summary |
 * | `platformData` | `PlatformData[]` | Summary |
 * | `topPosts` | `TopPost[]` | Summary |
 * | `postsGridData` | `PostData[]` | Posts |
 * | `postsTableData` | `PostTableRow[]` | Posts |
 * | `creators` | `CreatorPerformanceRow[]` | Members |
 * | `scatterCreators` | `CreatorDataPoint[]` | Members |
 *
 * All props are optional. When a prop is omitted, the corresponding section
 * is hidden gracefully.
 *
 * ## Customization
 *
 * - Pass fewer `kpiMetrics` to reduce the KPI row from 6 to 2-3 cards.
 * - Pass a subset of `platformData` to show only the relevant channels.
 * - The page adapts to viewport width with responsive grid breakpoints.
 * - Wrap in `<AppShell>` for the full sidebar layout experience.
 *
 * ## Import
 *
 * ```tsx
 * import { AnalyticsPage } from "@/components/analytics/AnalyticsPage"
 * ```
 *
 * ## Quick Start
 *
 * ```tsx
 * <AnalyticsPage
 *   kpiMetrics={kpiMetrics}
 *   performanceData={performanceData}
 *   platformData={platformData}
 *   topPosts={topPosts}
 *   postsGridData={postsGridData}
 *   postsTableData={postsTableData}
 *   creators={creators}
 *   scatterCreators={scatterCreators}
 * />
 * ```
 */
const meta = {
  title: "6. Pages/Analytics/AnalyticsPage",
  component: AnalyticsPage,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    kpiMetrics: {
      description:
        "Array of KPI metric objects rendered as `MetricCard` components on the Summary tab.",
      control: false,
      table: {
        type: { summary: "KpiMetric[]" },
        defaultValue: { summary: "undefined" },
        category: "Summary Tab",
      },
    },
    performanceData: {
      description:
        "Time-series data points for the `PerformanceLineChart` on the Summary tab.",
      control: false,
      table: {
        type: { summary: "PerformanceDataPoint[]" },
        defaultValue: { summary: "undefined" },
        category: "Summary Tab",
      },
    },
    platformData: {
      description:
        "Platform breakdown data for the `PlatformBarChart` on the Summary tab.",
      control: false,
      table: {
        type: { summary: "PlatformData[]" },
        defaultValue: { summary: "undefined" },
        category: "Summary Tab",
      },
    },
    topPosts: {
      description:
        "Top performing posts for the `TopPostsCarousel` on the Summary tab.",
      control: false,
      table: {
        type: { summary: "TopPost[]" },
        defaultValue: { summary: "undefined" },
        category: "Summary Tab",
      },
    },
    postsGridData: {
      description: "Post card data for the grid view on the Posts tab.",
      control: false,
      table: {
        type: { summary: "PostData[]" },
        defaultValue: { summary: "undefined" },
        category: "Posts Tab",
      },
    },
    postsTableData: {
      description: "Post row data for the table view on the Posts tab.",
      control: false,
      table: {
        type: { summary: "PostTableRow[]" },
        defaultValue: { summary: "undefined" },
        category: "Posts Tab",
      },
    },
    creators: {
      description:
        "Creator ranking data for the `CreatorPerformanceTable` on the Members tab.",
      control: false,
      table: {
        type: { summary: "CreatorPerformanceRow[]" },
        defaultValue: { summary: "undefined" },
        category: "Members Tab",
      },
    },
    scatterCreators: {
      description:
        "Creator data points for the `CreatorScatterChart` on the Members tab.",
      control: false,
      table: {
        type: { summary: "CreatorDataPoint[]" },
        defaultValue: { summary: "undefined" },
        category: "Members Tab",
      },
    },
  },
} satisfies Meta<typeof AnalyticsPage>

export default meta
type Story = StoryObj<typeof meta>

/* ────────────────────────────────────────────────────────────────────────────
 * Stories
 * ──────────────────────────────────────────────────────────────────────────── */

/**
 * Default view landing on the **Summary** tab with the full dataset:
 * 6 KPI cards, performance line chart, platform bar chart, and top posts carousel.
 *
 * ```tsx
 * <AnalyticsPage
 *   kpiMetrics={KPI_METRICS}
 *   performanceData={PERFORMANCE_DATA}
 *   platformData={PLATFORM_DATA}
 *   topPosts={TOP_POSTS}
 *   postsGridData={POSTS_GRID_DATA}
 *   postsTableData={POSTS_TABLE_DATA}
 *   creators={CREATOR_RANKINGS}
 *   scatterCreators={SCATTER_CREATORS}
 * />
 * ```
 */
export const SummaryTab: Story = {
  args: ALL_DATA,
  render: (args) => (
    <div className="h-screen">
      <AnalyticsPage {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // Verify the page title renders
    await expect(canvas.getByText("Analytics")).toBeInTheDocument()
    // Verify at least one KPI card label is visible
    await expect(canvas.getByText("Total Impressions")).toBeInTheDocument()
    // Verify the Summary tab is present
    await expect(canvas.getByRole("tab", { name: "Summary" })).toBeInTheDocument()
  },
}

/**
 * Navigate to the **Posts** tab to see the 24-post grid with a grid/table
 * view toggle. Click the list icon to switch to table view.
 *
 * ```tsx
 * <AnalyticsPage postsGridData={POSTS_GRID_DATA} postsTableData={POSTS_TABLE_DATA} />
 * ```
 */
export const PostsTab: Story = {
  args: ALL_DATA,
  render: (args) => (
    <div className="h-screen">
      <AnalyticsPage {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Navigate to the Posts tab to see the 24-post grid with a grid/table view toggle.",
      },
    },
  },
}

/**
 * Navigate to the **Members** tab to see the 8-creator ranking table
 * and scatter plot mapping reach vs. engagement rate.
 *
 * ```tsx
 * <AnalyticsPage creators={CREATOR_RANKINGS} scatterCreators={SCATTER_CREATORS} />
 * ```
 */
export const MembersTab: Story = {
  args: ALL_DATA,
  render: (args) => (
    <div className="h-screen">
      <AnalyticsPage {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Navigate to the Members tab to see the 8-creator ranking table and scatter plot.",
      },
    },
  },
}

/**
 * Full Aspire application frame with a collapsed sidebar.
 * Demonstrates how AnalyticsPage integrates within `AppShell`.
 *
 * ```tsx
 * <AppShell activeHref="/analytics" user={{ name: "Jason Roh", initials: "JR" }} defaultCollapsed>
 *   <AnalyticsPage {...allData} />
 * </AppShell>
 * ```
 */
export const WithSidebar: Story = {
  args: ALL_DATA,
  render: (args) => (
    <AppShell
      activeHref="/analytics"
      user={{ name: "Jason Roh", initials: "JR" }}
      badgeCounts={{ messages: 2 }}
      defaultCollapsed
    >
      <AnalyticsPage {...args} />
    </AppShell>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Full Aspire app frame with collapsed sidebar. Shows AnalyticsPage in the real layout context.",
      },
    },
  },
}

/**
 * Empty state with no props passed. All sections are hidden gracefully,
 * leaving only the page header, date picker, and tab bar.
 *
 * ```tsx
 * <AnalyticsPage />
 * ```
 */
export const NoData: Story = {
  args: {},
  render: (args) => (
    <div className="h-screen">
      <AnalyticsPage {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Empty state -- no data props passed. All chart sections are hidden; only the header and tabs remain.",
      },
    },
  },
}

/**
 * Minimal dataset: 2 KPI cards, 1 platform, and the top 3 creators.
 * All other sections remain empty, showing how the page degrades gracefully
 * with partial data.
 *
 * ```tsx
 * <AnalyticsPage
 *   kpiMetrics={[
 *     { label: "Total Impressions", value: "142K", change: 4.2 },
 *     { label: "Revenue", value: "$8.4K", change: -1.8 },
 *   ]}
 *   platformData={[
 *     { platform: "Instagram", impressions: 95000, reach: 72000, engagement: 4200 },
 *   ]}
 *   creators={creators.slice(0, 3)}
 * />
 * ```
 */
export const SmallDataset: Story = {
  args: {
    kpiMetrics: [
      {
        label: "Total Impressions",
        value: "142K",
        change: 4.2,
        sparklineData: [
          { value: 80 }, { value: 90 }, { value: 85 },
          { value: 100 }, { value: 110 }, { value: 142 },
        ],
      },
      { label: "Revenue", value: "$8.4K", change: -1.8 },
    ],
    platformData: [
      { platform: "Instagram", impressions: 95_000, reach: 72_000, engagement: 4_200 },
    ],
    creators: CREATOR_RANKINGS.slice(0, 3),
  },
  render: (args) => (
    <div className="h-screen">
      <AnalyticsPage {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Minimal dataset -- 2 KPI cards, 1 platform, top 3 creators. Other sections are empty.",
      },
    },
  },
}
