"use client"

import * as React from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { cn } from "@/lib/utils"
import { formatK } from "@/lib/formatters"

export interface PlatformData {
  platform: string
  impressions: number
  reach: number
  engagement: number
}

const BARS: { key: keyof Omit<PlatformData, "platform">; label: string; color: string }[] = [
  { key: "impressions", label: "Impressions", color: "#84cc16" },
  { key: "reach",       label: "Reach",       color: "#0ea5e9" },
  { key: "engagement",  label: "Engagement",  color: "#ec4899" },
]

interface PlatformBarChartProps {
  data: PlatformData[]
  height?: number
  className?: string
}

function PlatformBarChart({ data, height = 280, className }: PlatformBarChartProps) {
  return (
    <div className={cn("rounded-xl border border-border bg-card p-5", className)}>
      <h3 className="mb-4 text-sm font-semibold text-foreground">Platform Breakdown</h3>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={data}
          margin={{ top: 4, right: 16, bottom: 0, left: 0 }}
          barCategoryGap="30%"
          barGap={4}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(20 5.9% 90%)" vertical={false} />
          <XAxis
            dataKey="platform"
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tickFormatter={formatK}
            tick={{ fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            width={44}
          />
          <Tooltip
            formatter={(value: number) => formatK(value)}
            contentStyle={{
              fontSize: 12,
              borderRadius: 8,
              border: "1px solid hsl(20 5.9% 90%)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
          />
          <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
          {BARS.map((bar) => (
            <Bar
              key={bar.key}
              dataKey={bar.key}
              name={bar.label}
              fill={bar.color}
              radius={[4, 4, 0, 0]}
              maxBarSize={32}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export { PlatformBarChart, type PlatformBarChartProps }
