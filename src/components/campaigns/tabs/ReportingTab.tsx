"use client"

import * as React from "react"
import { BarChart3, DollarSign, Eye, TrendingUp, Users } from "lucide-react"
import { cn } from "@/lib/utils"

// ─── KPI Card ────────────────────────────────────────────────────────────────

function KpiCard({
  icon: Icon,
  label,
  value,
  change,
}: {
  icon: React.ElementType
  label: string
  value: string
  change?: string
}) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-stone-200 bg-background p-5 dark:border-stone-800">
      <div className="flex items-center gap-2">
        <div className="flex size-9 items-center justify-center rounded-md bg-stone-100 dark:bg-stone-800">
          <Icon className="size-4 text-stone-600 dark:text-stone-400" />
        </div>
        <span className="text-sm text-stone-500 dark:text-stone-400">{label}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-semibold text-stone-900 dark:text-stone-100">{value}</span>
        {change && (
          <span className="text-xs font-medium text-green-600 dark:text-green-400">{change}</span>
        )}
      </div>
    </div>
  )
}

// ─── Chart Placeholder ───────────────────────────────────────────────────────

function ChartPlaceholder({ title, height = 240 }: { title: string; height?: number }) {
  return (
    <div className="rounded-lg border border-stone-200 bg-background p-5 dark:border-stone-800">
      <h3 className="mb-4 text-sm font-semibold text-stone-900 dark:text-stone-100">{title}</h3>
      <div
        className="flex items-center justify-center rounded-md bg-stone-50 dark:bg-stone-900/30"
        style={{ height }}
      >
        <div className="flex flex-col items-center gap-2 text-stone-400 dark:text-stone-500">
          <BarChart3 className="size-8" />
          <span className="text-sm">Chart placeholder</span>
        </div>
      </div>
    </div>
  )
}

// ─── Component ───────────────────────────────────────────────────────────────

function ReportingTab({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-6 p-6", className)}>
      {/* KPIs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard icon={Eye} label="Total Impressions" value="1.2M" change="+12.5%" />
        <KpiCard icon={TrendingUp} label="Engagement Rate" value="4.8%" change="+0.3%" />
        <KpiCard icon={Users} label="Audience Reached" value="856K" change="+8.2%" />
        <KpiCard icon={DollarSign} label="ROI" value="3.4x" change="+0.5x" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ChartPlaceholder title="Impressions Over Time" height={280} />
        <ChartPlaceholder title="Engagement by Platform" height={280} />
      </div>

      <ChartPlaceholder title="Content Performance" height={320} />
    </div>
  )
}

export { ReportingTab }
