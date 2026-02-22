import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { MetricCard } from "@/components/analytics/MetricCard"

const SPARKLINE = [
  { value: 420 }, { value: 480 }, { value: 455 }, { value: 510 },
  { value: 540 }, { value: 495 }, { value: 580 }, { value: 620 },
  { value: 600 }, { value: 680 }, { value: 710 }, { value: 760 },
]

const SPARKLINE_DOWN = [
  { value: 760 }, { value: 720 }, { value: 680 }, { value: 640 },
  { value: 610 }, { value: 580 }, { value: 540 }, { value: 510 },
  { value: 480 }, { value: 450 }, { value: 420 }, { value: 390 },
]

const meta = {
  title: "Analytics/MetricCard",
  component: MetricCard,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Large KPI card used in the Analytics Summary tab. Shows metric label, bold value, trend arrow + % change, and a mini sparkline (AreaChart). Loading state uses skeleton placeholders.",
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
// KpiRow uses render() without args so we need the bare StoryObj type
type Story = StoryObj

export const PositiveTrend: Story = {
  args: {
    label:         "Total Impressions",
    value:         "23.4M",
    change:        18.2,
    trendLabel:    "vs last period",
    sparklineData: SPARKLINE,
  },
  parameters: { docs: { description: { story: "Green ↑ trend — value grew vs. previous period." } } },
}

export const NegativeTrend: Story = {
  args: {
    label:         "Conversions",
    value:         "8,241",
    change:        -3.2,
    sparklineData: SPARKLINE_DOWN,
  },
  parameters: { docs: { description: { story: "Red ↓ trend — value declined vs. previous period." } } },
}

export const Neutral: Story = {
  args: {
    label: "Avg. Engagement Rate",
    value: "5.4%",
    sparklineData: SPARKLINE.map((p, i) => ({ value: p.value + Math.sin(i) * 10 })),
  },
  parameters: { docs: { description: { story: "No change prop — neutral state, gray sparkline." } } },
}

export const NoSparkline: Story = {
  args: {
    label:  "Total Media Value",
    value:  "$481K",
    change: 9.4,
  },
  parameters: { docs: { description: { story: "Without sparklineData — value and trend only." } } },
}

export const Loading: Story = {
  args: {
    label:   "Loading…",
    value:   "",
    loading: true,
  },
  parameters: { docs: { description: { story: "Loading skeleton state while data fetches." } } },
}

export const KpiRow: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <MetricCard label="Total Impressions" value="23.4M" change={18.2} sparklineData={SPARKLINE} />
      <MetricCard label="Total Reach"       value="18.1M" change={14.7} sparklineData={SPARKLINE} />
      <MetricCard label="Engagement"        value="1.27M" change={22.1} sparklineData={SPARKLINE} />
      <MetricCard label="TMV"               value="$481K" change={9.4}  sparklineData={SPARKLINE} />
      <MetricCard label="Revenue"           value="$142K" change={31.5} sparklineData={SPARKLINE} />
      <MetricCard label="Conversions"       value="8,241" change={-3.2} sparklineData={SPARKLINE_DOWN} />
    </div>
  ),
  parameters: {
    docs: { description: { story: "Full 6-card KPI row as it appears on the Analytics Summary tab." } },
  },
}
