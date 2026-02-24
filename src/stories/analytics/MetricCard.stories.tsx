import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, within } from "storybook/test"
import { fn } from "storybook/test"
import * as React from "react"
import { MetricCard } from "@/components/analytics/MetricCard"

/* ────────────────────────────────────────────────────────────────────────────
 * Sample sparkline datasets
 * ──────────────────────────────────────────────────────────────────────────── */

const SPARKLINE_UP = [
  { value: 420 }, { value: 480 }, { value: 455 }, { value: 510 },
  { value: 540 }, { value: 495 }, { value: 580 }, { value: 620 },
  { value: 600 }, { value: 680 }, { value: 710 }, { value: 760 },
]

const SPARKLINE_DOWN = [
  { value: 760 }, { value: 720 }, { value: 680 }, { value: 640 },
  { value: 610 }, { value: 580 }, { value: 540 }, { value: 510 },
  { value: 480 }, { value: 450 }, { value: 420 }, { value: 390 },
]

const SPARKLINE_FLAT = [
  { value: 500 }, { value: 510 }, { value: 495 }, { value: 505 },
  { value: 498 }, { value: 512 }, { value: 502 }, { value: 508 },
  { value: 497 }, { value: 503 }, { value: 509 }, { value: 501 },
]

/**
 * # MetricCard
 *
 * Large KPI card used on the **Analytics Summary** tab. Displays a metric
 * label, bold formatted value, optional trend arrow with percentage change,
 * an optional trend label, and a mini sparkline (Recharts `AreaChart`).
 * A `loading` state renders skeleton placeholders while data is being fetched.
 *
 * ## When to Use
 *
 * - Display a single key performance indicator (KPI) at the top of a dashboard.
 * - Show aggregate campaign metrics such as impressions, reach, revenue, or engagement.
 * - Provide at-a-glance trend direction with sparkline and change percentage.
 *
 * ## When NOT to Use
 *
 * - For detailed time-series analysis -- use `PerformanceLineChart` instead.
 * - For tabular metric comparisons -- use `DataTable` or `CreatorPerformanceTable`.
 * - When you need interactive drill-down -- MetricCard is display-only.
 *
 * ## Accessibility
 *
 * - The trend indicator uses both color and an icon (arrow up/down/minus) to
 *   convey direction, ensuring color-blind users can interpret the trend.
 * - The sparkline is decorative and rendered with `isAnimationActive={false}`.
 * - The card renders semantic HTML (`<p>`, `<span>`) with appropriate text
 *   contrast ratios against the card background.
 *
 * ## Import
 *
 * ```tsx
 * import { MetricCard } from "@/components/analytics/MetricCard"
 * ```
 *
 * ## Quick Start
 *
 * ```tsx
 * <MetricCard
 *   label="Total Impressions"
 *   value="1.2M"
 *   change={12.5}
 *   trendLabel="vs last period"
 *   sparklineData={[{ value: 100 }, { value: 120 }, { value: 150 }]}
 * />
 * ```
 */
const meta = {
  title: "4. Components/Data Display/MetricCard",
  component: MetricCard,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  argTypes: {
    label: {
      description: "The metric name displayed above the value.",
      control: { type: "text" },
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "—" },
        category: "Content",
      },
    },
    value: {
      description:
        "The formatted metric value (e.g. `\"1.2M\"`, `\"$45.2K\"`, `\"4.8%\"`).",
      control: { type: "text" },
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "—" },
        category: "Content",
      },
    },
    change: {
      description:
        "Percentage change vs. previous period. Positive shows green up arrow, negative shows red down arrow, omitted shows neutral.",
      control: { type: "number", min: -100, max: 100, step: 0.1 },
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "undefined" },
        category: "Content",
      },
    },
    trendLabel: {
      description:
        'Optional label shown below the change indicator (e.g. `"vs last period"`).',
      control: { type: "text" },
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
        category: "Content",
      },
    },
    sparklineData: {
      description:
        "Array of `{ value: number }` points rendered as a mini area chart. Pass an empty array or omit to hide.",
      control: false,
      table: {
        type: { summary: "SparklinePoint[]" },
        defaultValue: { summary: "undefined" },
        category: "Data",
      },
    },
    loading: {
      description:
        "When `true`, renders skeleton placeholders instead of content.",
      control: { type: "boolean" },
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "State",
      },
    },
    className: {
      description: "Additional CSS class names merged via `cn()`.",
      control: { type: "text" },
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
        category: "Style",
      },
    },
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div className="max-w-xs">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MetricCard>

export default meta
type Story = StoryObj<typeof meta>

/* ────────────────────────────────────────────────────────────────────────────
 * Stories
 * ──────────────────────────────────────────────────────────────────────────── */

/**
 * Basic MetricCard with just a label and value. No trend, no sparkline.
 *
 * ```tsx
 * <MetricCard label="Content Pieces" value="342" />
 * ```
 */
export const Basic: Story = {
  args: {
    label: "Content Pieces",
    value: "342",
  },
}

/**
 * Positive trend indicator with green up arrow and sparkline showing growth.
 * Typical usage for impressions or reach KPIs.
 *
 * ```tsx
 * <MetricCard
 *   label="Total Impressions"
 *   value="1.2M"
 *   change={12.5}
 *   trendLabel="vs last period"
 *   sparklineData={sparklineData}
 * />
 * ```
 */
export const PositiveTrend: Story = {
  args: {
    label: "Total Impressions",
    value: "1.2M",
    change: 12.5,
    trendLabel: "vs last period",
    sparklineData: SPARKLINE_UP,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // Verify the label and value are rendered
    await expect(canvas.getByText("Total Impressions")).toBeInTheDocument()
    await expect(canvas.getByText("1.2M")).toBeInTheDocument()
    // Verify the trend label is rendered
    await expect(canvas.getByText("vs last period")).toBeInTheDocument()
  },
}

/**
 * Negative trend with red down arrow and declining sparkline.
 * Shows how the card communicates a decrease in performance.
 *
 * ```tsx
 * <MetricCard
 *   label="Conversions"
 *   value="8,241"
 *   change={-3.2}
 *   sparklineData={sparklineDown}
 * />
 * ```
 */
export const NegativeTrend: Story = {
  args: {
    label: "Conversions",
    value: "8,241",
    change: -3.2,
    sparklineData: SPARKLINE_DOWN,
  },
}

/**
 * Sparkline with data but no `change` prop -- renders a neutral gray area chart.
 * Useful when trend data is unavailable but historical values exist.
 *
 * ```tsx
 * <MetricCard
 *   label="Engagement Rate"
 *   value="4.8%"
 *   sparklineData={sparklineFlat}
 * />
 * ```
 */
export const WithSparklineNeutral: Story = {
  args: {
    label: "Engagement Rate",
    value: "4.8%",
    sparklineData: SPARKLINE_FLAT,
  },
}

/**
 * Revenue card with positive change and trend label.
 *
 * ```tsx
 * <MetricCard
 *   label="Revenue"
 *   value="$45.2K"
 *   change={8.3}
 *   trendLabel="vs last period"
 *   sparklineData={sparklineUp}
 * />
 * ```
 */
export const RevenueCard: Story = {
  args: {
    label: "Revenue",
    value: "$45.2K",
    change: 8.3,
    trendLabel: "vs last period",
    sparklineData: SPARKLINE_UP,
  },
}

/**
 * Value and trend only -- no sparkline data provided.
 *
 * ```tsx
 * <MetricCard label="Total Media Value" value="$481K" change={9.4} />
 * ```
 */
export const WithoutSparkline: Story = {
  args: {
    label: "Total Media Value",
    value: "$481K",
    change: 9.4,
  },
}

/**
 * No `change` prop and no `sparklineData` -- minimal display with label and value only.
 *
 * ```tsx
 * <MetricCard label="Active Creators" value="127" />
 * ```
 */
export const WithoutTrend: Story = {
  args: {
    label: "Active Creators",
    value: "127",
  },
}

/**
 * Loading skeleton state. Renders three skeleton bars while data fetches.
 *
 * ```tsx
 * <MetricCard label="Loading..." value="" loading />
 * ```
 */
export const Loading: Story = {
  args: {
    label: "Loading...",
    value: "",
    loading: true,
  },
}

/**
 * Custom styling via the `className` prop. Adds a colored left border
 * to emphasize the card in a dashboard layout.
 *
 * ```tsx
 * <MetricCard
 *   label="Total Impressions"
 *   value="23.4M"
 *   change={18.2}
 *   className="border-l-4 border-l-green-500"
 *   sparklineData={sparklineUp}
 * />
 * ```
 */
export const CustomStyling: Story = {
  args: {
    label: "Total Impressions",
    value: "23.4M",
    change: 18.2,
    className: "border-l-4 border-l-green-500",
    sparklineData: SPARKLINE_UP,
  },
}

/**
 * Full 6-card KPI row as it appears on the Analytics Summary tab.
 * Demonstrates how MetricCards compose in a responsive grid layout.
 *
 * ```tsx
 * <div className="grid grid-cols-3 gap-4 lg:grid-cols-6">
 *   <MetricCard label="Total Impressions" value="23.4M" change={18.2} sparklineData={data} />
 *   <MetricCard label="Total Reach" value="18.1M" change={14.7} sparklineData={data} />
 *   ...
 * </div>
 * ```
 */
export const KpiRow: StoryObj = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <MetricCard
        label="Total Impressions"
        value="23.4M"
        change={18.2}
        trendLabel="vs last period"
        sparklineData={SPARKLINE_UP}
      />
      <MetricCard
        label="Total Reach"
        value="18.1M"
        change={14.7}
        trendLabel="vs last period"
        sparklineData={SPARKLINE_UP}
      />
      <MetricCard
        label="Engagement"
        value="1.27M"
        change={22.1}
        sparklineData={SPARKLINE_UP}
      />
      <MetricCard
        label="TMV"
        value="$481K"
        change={9.4}
        sparklineData={SPARKLINE_UP}
      />
      <MetricCard
        label="Revenue"
        value="$142K"
        change={31.5}
        trendLabel="vs last period"
        sparklineData={SPARKLINE_UP}
      />
      <MetricCard
        label="Conversions"
        value="8,241"
        change={-3.2}
        sparklineData={SPARKLINE_DOWN}
      />
    </div>
  ),
  decorators: [
    (Story: React.ComponentType) => (
      <div className="w-full max-w-5xl">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          "Full 6-card KPI row as it appears on the Analytics Summary tab. Uses a responsive 3-to-6 column grid.",
      },
    },
  },
}
