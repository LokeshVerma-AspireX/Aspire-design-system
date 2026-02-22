import * as React from "react"
import { TrendingDown, TrendingUp, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

type TrendDirection = "up" | "down" | "neutral"

interface StatCard {
  label: string
  value: string
  trend: TrendDirection
  trendLabel?: string
  period?: string
}

interface SocialStatsCardsProps {
  stats: StatCard[]
  period?: string
  className?: string
}

const trendConfig: Record<TrendDirection, { icon: React.ElementType; cls: string }> = {
  up:      { icon: TrendingUp,   cls: "text-green-500" },
  down:    { icon: TrendingDown, cls: "text-red-500" },
  neutral: { icon: Minus,        cls: "text-muted-foreground" },
}

function SocialStatsCard({ label, value, trend, trendLabel, period }: StatCard) {
  const { icon: Icon, cls } = trendConfig[trend]

  return (
    <div className="flex flex-col gap-1 rounded-xl border bg-card p-4 shadow-sm">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</p>
      <div className="flex items-end justify-between gap-2">
        <p className="text-2xl font-bold text-foreground tabular-nums">{value}</p>
        <Icon className={cn("size-5 mb-0.5 shrink-0", cls)} />
      </div>
      {(trendLabel || period) && (
        <p className="text-xs text-muted-foreground">{trendLabel ?? period}</p>
      )}
    </div>
  )
}

function SocialStatsCards({ stats, period = "Last 30 days", className }: SocialStatsCardsProps) {
  return (
    <div className={cn("grid grid-cols-2 gap-3", className)}>
      {stats.map((stat, i) => (
        <SocialStatsCard key={i} {...stat} period={stat.period ?? period} />
      ))}
    </div>
  )
}

export { SocialStatsCards, type SocialStatsCardsProps, type StatCard, type TrendDirection }
