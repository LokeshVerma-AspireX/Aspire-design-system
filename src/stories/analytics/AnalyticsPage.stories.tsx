import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { AnalyticsPage } from "@/components/analytics/AnalyticsPage"
import { PageShell }     from "@/components/layout/PageShell"
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

const ALL_DATA = {
  kpiMetrics:     KPI_METRICS,
  performanceData: PERFORMANCE_DATA,
  platformData:   PLATFORM_DATA,
  topPosts:       TOP_POSTS,
  postsGridData:  POSTS_GRID_DATA,
  postsTableData: POSTS_TABLE_DATA,
  creators:       CREATOR_RANKINGS,
  scatterCreators: SCATTER_CREATORS,
}

const meta = {
  title: "Analytics/AnalyticsPage",
  component: AnalyticsPage,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Full analytics and reporting page. Tabs: Summary (KPI cards + line chart + platform bars + top posts), Posts (grid/table toggle), Members (ranked table + scatter plot), Networks (placeholder). DateRangePicker in top-right.",
      },
    },
  },
} satisfies Meta<typeof AnalyticsPage>

export default meta
type Story = StoryObj<typeof meta>

export const SummaryTab: Story = {
  args: ALL_DATA,
  render: (args) => (
    <div className="h-screen">
      <AnalyticsPage {...args} />
    </div>
  ),
  parameters: {
    docs: { description: { story: "Summary tab — 6 KPI cards, performance line chart, platform bar chart, top posts carousel." } },
  },
}

export const PostsTab: Story = {
  args: ALL_DATA,
  render: (args) => (
    <div className="h-screen">
      <AnalyticsPage {...args} />
    </div>
  ),
  parameters: {
    docs: { description: { story: "Navigate to the Posts tab to see the 24-post grid with a grid/table view toggle." } },
  },
}

export const MembersTab: Story = {
  args: ALL_DATA,
  render: (args) => (
    <div className="h-screen">
      <AnalyticsPage {...args} />
    </div>
  ),
  parameters: {
    docs: { description: { story: "Navigate to the Members tab to see the 8-creator ranking table and scatter plot." } },
  },
}

export const WithSidebar: Story = {
  args: ALL_DATA,
  render: (args) => (
    <PageShell
      activeHref="/analytics"
      user={{ name: "Jason Roh", initials: "JR" }}
      badgeCounts={{ messages: 2 }}
      defaultCollapsed
    >
      <AnalyticsPage {...args} />
    </PageShell>
  ),
  parameters: {
    docs: { description: { story: "Full Aspire app frame with collapsed sidebar." } },
  },
}

export const NoData: Story = {
  args: {},
  render: (args) => (
    <div className="h-screen">
      <AnalyticsPage {...args} />
    </div>
  ),
  parameters: {
    docs: { description: { story: "Empty state — no props passed, all sections show empty." } },
  },
}

export const SmallDataset: Story = {
  args: {
    kpiMetrics: [
      { label: "Total Impressions", value: "142K", change: 4.2, sparklineData: [
        { value: 80 }, { value: 90 }, { value: 85 }, { value: 100 }, { value: 110 }, { value: 142 },
      ]},
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
    docs: { description: { story: "Minimal dataset — 2 KPI cards, 1 platform, top 3 creators. Other sections empty." } },
  },
}
