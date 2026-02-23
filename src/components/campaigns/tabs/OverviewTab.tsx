"use client"

import * as React from "react"
import { Calendar, DollarSign, FileText, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"

// ─── KPI Card ────────────────────────────────────────────────────────────────

function KpiCard({
  icon: Icon,
  label,
  value,
  className,
}: {
  icon: React.ElementType
  label: string
  value: string
  className?: string
}) {
  return (
    <div className={cn("flex flex-col gap-2 rounded-lg border border-stone-200 bg-background p-5 dark:border-stone-800", className)}>
      <div className="flex items-center gap-2">
        <div className="flex size-9 items-center justify-center rounded-md bg-stone-100 dark:bg-stone-800">
          <Icon className="size-4 text-stone-600 dark:text-stone-400" />
        </div>
        <span className="text-sm text-stone-500 dark:text-stone-400">{label}</span>
      </div>
      <span className="text-2xl font-semibold text-stone-900 dark:text-stone-100">{value}</span>
    </div>
  )
}

// ─── Component ───────────────────────────────────────────────────────────────

function OverviewTab({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-6 p-6", className)}>
      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard icon={Users} label="Total Creators" value="24" />
        <KpiCard icon={FileText} label="Content Submitted" value="48" />
        <KpiCard icon={DollarSign} label="Total Spend" value="$12,500" />
        <KpiCard icon={Users} label="Avg. Engagement" value="4.8%" />
      </div>

      {/* Campaign Info */}
      <div className="rounded-lg border border-stone-200 bg-background p-5 dark:border-stone-800">
        <h3 className="mb-3 text-sm font-semibold text-stone-900 dark:text-stone-100">Campaign Description</h3>
        <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">
          Launch our summer beauty collection with top-tier beauty and lifestyle creators. This campaign
          focuses on authentic product showcases, tutorials, and lifestyle content across Instagram and TikTok.
          Target audience: 18-34 year olds interested in beauty, skincare, and wellness.
        </p>
      </div>

      {/* Quick Info */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="rounded-lg border border-stone-200 bg-background p-4 dark:border-stone-800">
          <span className="text-xs text-stone-500 dark:text-stone-400">Type</span>
          <div className="mt-1">
            <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-700 dark:bg-purple-900/40 dark:text-purple-300">
              Sponsored
            </span>
          </div>
        </div>
        <div className="rounded-lg border border-stone-200 bg-background p-4 dark:border-stone-800">
          <span className="text-xs text-stone-500 dark:text-stone-400">Date Range</span>
          <p className="mt-1 text-sm font-medium text-stone-900 dark:text-stone-100">Jan 15 — Mar 30, 2026</p>
        </div>
        <div className="rounded-lg border border-stone-200 bg-background p-4 dark:border-stone-800">
          <span className="text-xs text-stone-500 dark:text-stone-400">Status</span>
          <div className="mt-1">
            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/40 dark:text-green-300">
              Active
            </span>
          </div>
        </div>
        <div className="rounded-lg border border-stone-200 bg-background p-4 dark:border-stone-800">
          <span className="text-xs text-stone-500 dark:text-stone-400">Budget</span>
          <p className="mt-1 text-sm font-medium text-stone-900 dark:text-stone-100">$25,000</p>
        </div>
      </div>

      {/* Progress */}
      <div className="rounded-lg border border-stone-200 bg-background p-5 dark:border-stone-800">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">Deliverables Progress</h3>
          <span className="text-sm text-stone-500 dark:text-stone-400">48 of 80 complete</span>
        </div>
        <Progress value={60} className="h-2" />
      </div>
    </div>
  )
}

export { OverviewTab }
