"use client"

import * as React from "react"
import { AreaChart, Area, ResponsiveContainer } from "recharts"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { TrendIndicator, type TrendDirection } from "./TrendIndicator"

interface SparklinePoint {
  value: number
}

interface MetricCardProps {
  label: string
  value: string
  change?: number
  trendLabel?: string
  sparklineData?: SparklinePoint[]
  loading?: boolean
  className?: string
}

function MetricCard({
  label,
  value,
  change,
  trendLabel,
  sparklineData,
  loading,
  className,
}: MetricCardProps) {
  const uid = React.useId().replace(/:/g, "")

  if (loading) {
    return (
      <div className={cn("rounded-xl border border-border bg-card p-5", className)}>
        <Skeleton className="h-4 w-24 mb-3" />
        <Skeleton className="h-8 w-32 mb-2" />
        <Skeleton className="h-3 w-16" />
      </div>
    )
  }

  const direction: TrendDirection =
    change === undefined ? "neutral" : change > 0 ? "up" : change < 0 ? "down" : "neutral"

  const chartColor =
    direction === "up" ? "#16a34a" : direction === "down" ? "#ef4444" : "#94a3b8"

  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-5 flex flex-col gap-3",
        className
      )}
    >
      <p className="text-sm text-muted-foreground">{label}</p>

      <div className="flex items-end justify-between gap-2">
        <div className="flex flex-col gap-0.5">
          <span className="text-2xl font-bold tracking-tight text-foreground">{value}</span>
          {change !== undefined && (
            <TrendIndicator direction={direction} value={Math.abs(change)} />
          )}
          {trendLabel && (
            <span className="text-xs text-muted-foreground">{trendLabel}</span>
          )}
        </div>

        {sparklineData && sparklineData.length > 0 && (
          <div className="h-12 w-20 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={sparklineData}
                margin={{ top: 2, right: 0, bottom: 2, left: 0 }}
              >
                <defs>
                  <linearGradient id={`sg-${uid}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor={chartColor} stopOpacity={0.35} />
                    <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={chartColor}
                  strokeWidth={1.5}
                  fill={`url(#sg-${uid})`}
                  dot={false}
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  )
}

export { MetricCard, type MetricCardProps, type SparklinePoint }
