"use client"

import * as React from "react"
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { cn } from "@/lib/utils"
import { formatK } from "@/lib/formatters"

export interface CreatorDataPoint {
  name: string
  reach: number
  engagementRate: number
  revenue: number
}

interface TooltipPayload {
  payload?: CreatorDataPoint
}

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean
  payload?: TooltipPayload[]
}) {
  if (!active || !payload?.length) return null
  const d = payload[0]?.payload
  if (!d) return null
  return (
    <div className="rounded-lg border border-border bg-background p-3 text-xs shadow-md">
      <p className="mb-1 font-semibold text-foreground">{d.name}</p>
      <p className="text-muted-foreground">Reach: {formatK(d.reach)}</p>
      <p className="text-muted-foreground">Eng. Rate: {d.engagementRate.toFixed(1)}%</p>
      <p className="text-muted-foreground">Revenue: ${formatK(d.revenue)}</p>
    </div>
  )
}

interface CreatorScatterChartProps {
  data: CreatorDataPoint[]
  height?: number
  className?: string
}

function CreatorScatterChart({ data, height = 280, className }: CreatorScatterChartProps) {
  return (
    <div className={cn("rounded-xl border border-border bg-card p-5", className)}>
      <h3 className="mb-0.5 text-sm font-semibold text-foreground">Creator Performance Map</h3>
      <p className="mb-4 text-xs text-muted-foreground">
        X: Reach · Y: Engagement Rate · Dot size: Revenue
      </p>
      <ResponsiveContainer width="100%" height={height}>
        <ScatterChart margin={{ top: 4, right: 16, bottom: 16, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(20 5.9% 90%)" />
          <XAxis
            dataKey="reach"
            type="number"
            name="Reach"
            tickFormatter={formatK}
            tick={{ fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            label={{ value: "Reach", position: "insideBottom", offset: -8, fontSize: 11 }}
          />
          <YAxis
            dataKey="engagementRate"
            type="number"
            name="Eng. Rate"
            tickFormatter={(v: number) => `${v}%`}
            tick={{ fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            width={40}
          />
          <ZAxis dataKey="revenue" range={[40, 500]} name="Revenue" />
          <Tooltip content={<CustomTooltip />} />
          <Scatter data={data} fill="#84cc16" fillOpacity={0.75} stroke="#65a30d" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  )
}

export { CreatorScatterChart, type CreatorScatterChartProps }
