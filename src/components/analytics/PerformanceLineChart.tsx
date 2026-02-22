"use client"

import * as React from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { cn } from "@/lib/utils"

export interface PerformanceDataPoint {
  date: string
  impressions: number
  reach: number
  engagement: number
  tmv: number
}

type MetricKey = "impressions" | "reach" | "engagement" | "tmv"

const METRIC_CONFIG: Record<
  MetricKey,
  { label: string; color: string; formatter: (v: number) => string }
> = {
  impressions: { label: "Impressions", color: "#84cc16", formatter: formatK },
  reach:       { label: "Reach",       color: "#0ea5e9", formatter: formatK },
  engagement:  { label: "Engagement",  color: "#ec4899", formatter: formatK },
  tmv:         { label: "TMV ($)",     color: "#f97316", formatter: (v) => `$${formatK(v)}` },
}

function formatK(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`
  return String(n)
}

interface PerformanceLineChartProps {
  data: PerformanceDataPoint[]
  activeMetrics?: MetricKey[]
  height?: number
  className?: string
}

function PerformanceLineChart({
  data,
  activeMetrics = ["impressions", "reach", "engagement", "tmv"],
  height = 300,
  className,
}: PerformanceLineChartProps) {
  return (
    <div className={cn("rounded-xl border border-border bg-card p-5", className)}>
      <h3 className="mb-4 text-sm font-semibold text-foreground">Performance Over Time</h3>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 4, right: 16, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(20 5.9% 90%)" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            tickFormatter={formatK}
            tick={{ fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            width={44}
          />
          <Tooltip
            formatter={(value: number, name: string) => [
              METRIC_CONFIG[name as MetricKey]?.formatter(value) ?? String(value),
              METRIC_CONFIG[name as MetricKey]?.label ?? name,
            ]}
            contentStyle={{
              fontSize: 12,
              borderRadius: 8,
              border: "1px solid hsl(20 5.9% 90%)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
            labelStyle={{ fontWeight: 600, marginBottom: 4 }}
          />
          <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
          {activeMetrics.map((key) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              name={METRIC_CONFIG[key].label}
              stroke={METRIC_CONFIG[key].color}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export { PerformanceLineChart, type MetricKey, type PerformanceLineChartProps }
