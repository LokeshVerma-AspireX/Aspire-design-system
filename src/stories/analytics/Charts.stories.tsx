import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, within } from "storybook/test"
import { fn } from "storybook/test"
import * as React from "react"
import { PerformanceLineChart } from "@/components/analytics/PerformanceLineChart"
import { PlatformBarChart } from "@/components/analytics/PlatformBarChart"
import { CreatorScatterChart } from "@/components/analytics/CreatorScatterChart"
import { TopPostsCarousel } from "@/components/analytics/TopPostsCarousel"
import { TrendIndicator } from "@/components/analytics/TrendIndicator"
import {
  PERFORMANCE_DATA,
  PLATFORM_DATA,
  TOP_POSTS,
  SCATTER_CREATORS,
} from "./sampleData"

/**
 * # Charts
 *
 * All Recharts-powered analytics visualizations used across the Aspire
 * Analytics page. This stories file documents four chart components and
 * the `TrendIndicator` helper:
 *
 * - **PerformanceLineChart** -- Multi-line time series for impressions,
 *   reach, engagement, and TMV over a configurable date range.
 * - **PlatformBarChart** -- Grouped bar chart comparing metrics across
 *   social platforms (Instagram, TikTok, YouTube, etc.).
 * - **CreatorScatterChart** -- Scatter plot mapping creators by reach
 *   (x-axis) vs. engagement rate (y-axis) with dot size scaled by revenue.
 * - **TopPostsCarousel** -- Horizontally scrollable card carousel showing
 *   top-performing posts with platform badges and metric overlays.
 * - **TrendIndicator** -- Inline trend arrow + percentage used inside
 *   `MetricCard` and table cells.
 *
 * ## When to Use
 *
 * - **PerformanceLineChart**: Show metric trends over time on the Summary tab.
 * - **PlatformBarChart**: Compare aggregate metrics across social channels.
 * - **CreatorScatterChart**: Visualize creator performance distribution on
 *   the Members tab.
 * - **TopPostsCarousel**: Highlight the highest-performing content pieces.
 * - **TrendIndicator**: Anywhere a directional percentage change is needed.
 *
 * ## When NOT to Use
 *
 * - For single KPI values, use `MetricCard` instead of a chart.
 * - For tabular data with sorting/filtering, use `DataTable`.
 * - For pie/donut charts or other chart types not covered here, extend
 *   with additional Recharts components.
 *
 * ## Accessibility
 *
 * - All charts use `ResponsiveContainer` to scale within their parent.
 * - Tooltips provide exact values on hover for users who cannot read
 *   chart positions precisely.
 * - `TrendIndicator` uses both icon shape and color to convey direction.
 * - The scatter chart includes a custom tooltip with creator name and
 *   all three mapped dimensions.
 *
 * ## Import
 *
 * ```tsx
 * import { PerformanceLineChart } from "@/components/analytics/PerformanceLineChart"
 * import { PlatformBarChart } from "@/components/analytics/PlatformBarChart"
 * import { CreatorScatterChart } from "@/components/analytics/CreatorScatterChart"
 * import { TopPostsCarousel } from "@/components/analytics/TopPostsCarousel"
 * import { TrendIndicator } from "@/components/analytics/TrendIndicator"
 * ```
 *
 * ## Quick Start
 *
 * ```tsx
 * <PerformanceLineChart data={performanceData} />
 * <PlatformBarChart data={platformData} />
 * <CreatorScatterChart data={scatterCreators} />
 * <TopPostsCarousel posts={topPosts} />
 * <TrendIndicator direction="up" value={18.2} />
 * ```
 */
const meta = {
  title: "4. Components/Charts/Charts",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta

export default meta
type Story = StoryObj

/* ════════════════════════════════════════════════════════════════════════════
 * TrendIndicator
 * ════════════════════════════════════════════════════════════════════════════ */

/**
 * `TrendIndicator` renders an inline trend arrow with an optional percentage
 * value. Available directions: `up` (green), `down` (red), `neutral` (gray).
 * Two sizes: `sm` (default) and `md`.
 *
 * ```tsx
 * <TrendIndicator direction="up" value={18.2} />
 * <TrendIndicator direction="down" value={3.2} />
 * <TrendIndicator direction="neutral" />
 * ```
 */
export const TrendIndicatorVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 text-sm">
      <div>
        <p className="mb-2 text-xs font-medium text-muted-foreground">Size: sm (default)</p>
        <div className="flex items-center gap-4">
          <TrendIndicator direction="up" value={18.2} />
          <TrendIndicator direction="down" value={3.2} />
          <TrendIndicator direction="neutral" />
        </div>
      </div>
      <div>
        <p className="mb-2 text-xs font-medium text-muted-foreground">Size: md</p>
        <div className="flex items-center gap-4">
          <TrendIndicator direction="up" value={9.4} size="md" />
          <TrendIndicator direction="down" value={7.8} size="md" />
          <TrendIndicator direction="neutral" size="md" />
        </div>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // Verify percentage values render
    await expect(canvas.getByText("+18.2%")).toBeInTheDocument()
    await expect(canvas.getByText((content) => content.includes("3.2%"))).toBeInTheDocument()
  },
  parameters: {
    docs: {
      description: {
        story:
          "Up (green), down (red), and neutral (gray) indicators in both `sm` and `md` sizes.",
      },
    },
  },
}

/* ════════════════════════════════════════════════════════════════════════════
 * PerformanceLineChart
 * ════════════════════════════════════════════════════════════════════════════ */

/**
 * Default `PerformanceLineChart` with all four metrics enabled:
 * Impressions, Reach, Engagement, and TMV. Data spans 26 weeks
 * (Aug 2025 through Feb 2026).
 *
 * ```tsx
 * <PerformanceLineChart data={PERFORMANCE_DATA} />
 * ```
 */
export const PerformanceLine_AllMetrics: Story = {
  render: () => <PerformanceLineChart data={PERFORMANCE_DATA} />,
  parameters: {
    docs: {
      description: {
        story:
          "All 4 metrics over 26 weeks: Impressions (lime), Reach (sky), Engagement (pink), TMV (orange).",
      },
    },
  },
}

/**
 * Single metric view -- only Impressions. Pass `activeMetrics` to filter
 * which lines are rendered.
 *
 * ```tsx
 * <PerformanceLineChart data={PERFORMANCE_DATA} activeMetrics={["impressions"]} />
 * ```
 */
export const PerformanceLine_ImpressionsOnly: Story = {
  render: () => (
    <PerformanceLineChart
      data={PERFORMANCE_DATA}
      activeMetrics={["impressions"]}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Single metric -- Impressions only. Useful for focused analysis.",
      },
    },
  },
}

/**
 * Two metrics: Engagement and TMV shown together. Demonstrates selective
 * metric display for comparing related indicators.
 *
 * ```tsx
 * <PerformanceLineChart
 *   data={PERFORMANCE_DATA}
 *   activeMetrics={["engagement", "tmv"]}
 * />
 * ```
 */
export const PerformanceLine_EngagementAndTMV: Story = {
  render: () => (
    <PerformanceLineChart
      data={PERFORMANCE_DATA}
      activeMetrics={["engagement", "tmv"]}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Two metrics -- Engagement (pink) and TMV (orange) -- for side-by-side comparison.",
      },
    },
  },
}

/**
 * Custom chart height of 400px. The default is 300px.
 *
 * ```tsx
 * <PerformanceLineChart data={PERFORMANCE_DATA} height={400} />
 * ```
 */
export const PerformanceLine_CustomHeight: Story = {
  render: () => (
    <PerformanceLineChart data={PERFORMANCE_DATA} height={400} />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Custom height (400px) for larger viewport layouts. Default is 300px.",
      },
    },
  },
}

/* ════════════════════════════════════════════════════════════════════════════
 * PlatformBarChart
 * ════════════════════════════════════════════════════════════════════════════ */

/**
 * Default `PlatformBarChart` with three platforms: Instagram, TikTok, YouTube.
 * Each platform shows grouped bars for Impressions, Reach, and Engagement.
 *
 * ```tsx
 * <PlatformBarChart data={PLATFORM_DATA} />
 * ```
 */
export const PlatformBar_Default: Story = {
  render: () => <PlatformBarChart data={PLATFORM_DATA} />,
  parameters: {
    docs: {
      description: {
        story:
          "Grouped bars for Instagram, TikTok, YouTube across Impressions (lime), Reach (sky), Engagement (pink).",
      },
    },
  },
}

/**
 * Two platforms only -- Instagram and TikTok. Shows how the chart adapts
 * when fewer data points are provided.
 *
 * ```tsx
 * <PlatformBarChart
 *   data={[
 *     { platform: "Instagram", impressions: 11_200_000, reach: 8_700_000, engagement: 620_000 },
 *     { platform: "TikTok", impressions: 8_400_000, reach: 6_200_000, engagement: 510_000 },
 *   ]}
 * />
 * ```
 */
export const PlatformBar_TwoChannels: Story = {
  render: () => (
    <PlatformBarChart
      data={[
        { platform: "Instagram", impressions: 11_200_000, reach: 8_700_000, engagement: 620_000 },
        { platform: "TikTok", impressions: 8_400_000, reach: 6_200_000, engagement: 510_000 },
      ]}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Two platforms only -- demonstrates adaptive spacing with fewer data points.",
      },
    },
  },
}

/**
 * Single platform -- Instagram only. Useful for platform-specific campaign reports.
 *
 * ```tsx
 * <PlatformBarChart
 *   data={[{ platform: "Instagram", impressions: 11_200_000, reach: 8_700_000, engagement: 620_000 }]}
 * />
 * ```
 */
export const PlatformBar_SingleChannel: Story = {
  render: () => (
    <PlatformBarChart
      data={[
        { platform: "Instagram", impressions: 11_200_000, reach: 8_700_000, engagement: 620_000 },
      ]}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Single platform view for focused channel reports.",
      },
    },
  },
}

/* ════════════════════════════════════════════════════════════════════════════
 * CreatorScatterChart
 * ════════════════════════════════════════════════════════════════════════════ */

/**
 * Default `CreatorScatterChart` with 8 creators plotted by Reach (x-axis)
 * vs. Engagement Rate (y-axis). Dot size is proportional to Revenue.
 *
 * ```tsx
 * <CreatorScatterChart data={SCATTER_CREATORS} />
 * ```
 */
export const ScatterPlot_Default: Story = {
  render: () => <CreatorScatterChart data={SCATTER_CREATORS} />,
  parameters: {
    docs: {
      description: {
        story:
          "8 creators plotted by Reach vs. Engagement Rate. Dot size maps to Revenue. Hover for details.",
      },
    },
  },
}

/**
 * Scatter chart with a subset of 3 creators. Shows how the chart looks
 * with fewer data points.
 *
 * ```tsx
 * <CreatorScatterChart data={SCATTER_CREATORS.slice(0, 3)} />
 * ```
 */
export const ScatterPlot_FewCreators: Story = {
  render: () => <CreatorScatterChart data={SCATTER_CREATORS.slice(0, 3)} />,
  parameters: {
    docs: {
      description: {
        story:
          "Three creators only -- demonstrates the chart with a small dataset.",
      },
    },
  },
}

/**
 * Custom height scatter chart at 360px (default is 280px).
 *
 * ```tsx
 * <CreatorScatterChart data={SCATTER_CREATORS} height={360} />
 * ```
 */
export const ScatterPlot_CustomHeight: Story = {
  render: () => <CreatorScatterChart data={SCATTER_CREATORS} height={360} />,
  parameters: {
    docs: {
      description: {
        story: "Taller scatter chart (360px) for layouts with more vertical space.",
      },
    },
  },
}

/* ════════════════════════════════════════════════════════════════════════════
 * TopPostsCarousel
 * ════════════════════════════════════════════════════════════════════════════ */

/**
 * Default `TopPostsCarousel` with 8 top-performing posts. Each card shows
 * a placeholder thumbnail, platform badge, impression count, and engagement rate.
 *
 * ```tsx
 * <TopPostsCarousel posts={TOP_POSTS} />
 * ```
 */
export const Carousel_Default: Story = {
  render: () => <TopPostsCarousel posts={TOP_POSTS} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // Verify the section title renders
    await expect(canvas.getByText("Top Performing Posts")).toBeInTheDocument()
  },
  parameters: {
    docs: {
      description: {
        story:
          "8 top posts in a horizontal scroll. Platform badge in top-left corner, metrics overlay at bottom.",
      },
    },
  },
}

/**
 * Empty carousel with no posts. Shows the graceful empty state message.
 *
 * ```tsx
 * <TopPostsCarousel posts={[]} />
 * ```
 */
export const Carousel_Empty: Story = {
  render: () => <TopPostsCarousel posts={[]} />,
  parameters: {
    docs: {
      description: {
        story: "Empty state -- renders 'No posts to display.' when the posts array is empty.",
      },
    },
  },
}

/**
 * Carousel with only 3 posts. Does not require scrolling, but keeps the
 * same card layout for consistency.
 *
 * ```tsx
 * <TopPostsCarousel posts={TOP_POSTS.slice(0, 3)} />
 * ```
 */
export const Carousel_FewPosts: Story = {
  render: () => <TopPostsCarousel posts={TOP_POSTS.slice(0, 3)} />,
  parameters: {
    docs: {
      description: {
        story:
          "Three posts only -- no horizontal scrolling needed, cards are left-aligned.",
      },
    },
  },
}

/* ════════════════════════════════════════════════════════════════════════════
 * Compositions
 * ════════════════════════════════════════════════════════════════════════════ */

/**
 * Platform bar chart and top posts carousel rendered side by side,
 * as they appear on the Analytics Summary tab in a 2-column grid.
 *
 * ```tsx
 * <div className="grid grid-cols-2 gap-4">
 *   <PlatformBarChart data={PLATFORM_DATA} />
 *   <TopPostsCarousel posts={TOP_POSTS} />
 * </div>
 * ```
 */
export const TwoChartsSideBySide: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <PlatformBarChart data={PLATFORM_DATA} />
      <TopPostsCarousel posts={TOP_POSTS} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Platform breakdown and top posts side by side -- as seen on the Summary tab.",
      },
    },
  },
}

/**
 * Full chart stack: performance line chart, platform bar + carousel row,
 * and scatter plot. Demonstrates the complete chart set in vertical layout.
 *
 * ```tsx
 * <div className="flex flex-col gap-4">
 *   <PerformanceLineChart data={PERFORMANCE_DATA} />
 *   <div className="grid grid-cols-2 gap-4">
 *     <PlatformBarChart data={PLATFORM_DATA} />
 *     <TopPostsCarousel posts={TOP_POSTS} />
 *   </div>
 *   <CreatorScatterChart data={SCATTER_CREATORS} />
 * </div>
 * ```
 */
export const AllChartsStacked: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <PerformanceLineChart data={PERFORMANCE_DATA} />
      <div className="grid grid-cols-2 gap-4">
        <PlatformBarChart data={PLATFORM_DATA} />
        <TopPostsCarousel posts={TOP_POSTS} />
      </div>
      <CreatorScatterChart data={SCATTER_CREATORS} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Full chart stack -- line chart, platform bars + carousel, and scatter plot in a vertical layout.",
      },
    },
  },
}
