import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { PerformanceLineChart } from "@/components/analytics/PerformanceLineChart"
import { PlatformBarChart }     from "@/components/analytics/PlatformBarChart"
import { CreatorScatterChart }  from "@/components/analytics/CreatorScatterChart"
import { TopPostsCarousel }     from "@/components/analytics/TopPostsCarousel"
import { TrendIndicator }       from "@/components/analytics/TrendIndicator"
import {
  PERFORMANCE_DATA,
  PLATFORM_DATA,
  TOP_POSTS,
  SCATTER_CREATORS,
} from "./sampleData"

const meta = {
  title: "Analytics/Charts",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "All Recharts-powered analytics visualizations: multi-line performance chart, grouped platform bar chart, creator scatter plot, and the top posts carousel.",
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj

// ─── TrendIndicator ───────────────────────────────────────────────────────────

export const TrendIndicatorVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3 text-sm">
      <div className="flex items-center gap-4">
        <TrendIndicator direction="up"      value={18.2} />
        <TrendIndicator direction="down"    value={3.2} />
        <TrendIndicator direction="neutral" />
      </div>
      <div className="flex items-center gap-4">
        <TrendIndicator direction="up"   value={9.4} size="md" />
        <TrendIndicator direction="down" value={7.8} size="md" />
      </div>
    </div>
  ),
  parameters: { docs: { description: { story: "Up (green), down (red), neutral (gray) — sm and md sizes." } } },
}

// ─── PerformanceLineChart ─────────────────────────────────────────────────────

export const PerformanceLine_AllMetrics: Story = {
  render: () => (
    <PerformanceLineChart data={PERFORMANCE_DATA} />
  ),
  parameters: { docs: { description: { story: "All 4 metrics over 26 weeks: Impressions, Reach, Engagement, TMV." } } },
}

export const PerformanceLine_ImpressionsOnly: Story = {
  render: () => (
    <PerformanceLineChart
      data={PERFORMANCE_DATA}
      activeMetrics={["impressions"]}
    />
  ),
  parameters: { docs: { description: { story: "Single metric — Impressions only." } } },
}

export const PerformanceLine_EngagementAndTMV: Story = {
  render: () => (
    <PerformanceLineChart
      data={PERFORMANCE_DATA}
      activeMetrics={["engagement", "tmv"]}
    />
  ),
}

// ─── PlatformBarChart ─────────────────────────────────────────────────────────

export const PlatformBar_Default: Story = {
  render: () => <PlatformBarChart data={PLATFORM_DATA} />,
  parameters: { docs: { description: { story: "Grouped bars for Instagram, TikTok, YouTube across Impressions, Reach, Engagement." } } },
}

export const PlatformBar_TwoChannels: Story = {
  render: () => (
    <PlatformBarChart
      data={[
        { platform: "Instagram", impressions: 11_200_000, reach: 8_700_000, engagement: 620_000 },
        { platform: "TikTok",    impressions:  8_400_000, reach: 6_200_000, engagement: 510_000 },
      ]}
    />
  ),
  parameters: { docs: { description: { story: "Two platforms only." } } },
}

// ─── CreatorScatterChart ──────────────────────────────────────────────────────

export const ScatterPlot_Default: Story = {
  render: () => <CreatorScatterChart data={SCATTER_CREATORS} />,
  parameters: { docs: { description: { story: "8 creators plotted by Reach vs. Engagement Rate. Dot size = Revenue." } } },
}

// ─── TopPostsCarousel ─────────────────────────────────────────────────────────

export const Carousel_Default: Story = {
  render: () => <TopPostsCarousel posts={TOP_POSTS} />,
  parameters: { docs: { description: { story: "8 top posts in a horizontal scroll. Platform badge in corner, metrics overlay at bottom." } } },
}

export const Carousel_Empty: Story = {
  render: () => <TopPostsCarousel posts={[]} />,
}

// ─── Side-by-side layout ─────────────────────────────────────────────────────

export const TwoChartsSideBySide: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <PlatformBarChart data={PLATFORM_DATA} />
      <TopPostsCarousel posts={TOP_POSTS} />
    </div>
  ),
  parameters: { docs: { description: { story: "Platform breakdown and top posts side by side — as seen on the Summary tab." } } },
}
