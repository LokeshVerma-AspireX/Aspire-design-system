"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { formatK } from "@/lib/formatters"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { TrendIndicator } from "./TrendIndicator"

export interface CreatorPerformanceRow {
  rank: number
  name: string
  initials: string
  avatarUrl?: string
  posts: number
  impressions: number
  engagementRate: number
  revenue: number
  revenueChange?: number
}

function RankBadge({ rank }: { rank: number }) {
  return (
    <span
      className={cn(
        "inline-flex size-7 items-center justify-center rounded-full border text-xs font-bold",
        rank === 1 && "border-amber-200  bg-amber-100  text-amber-700  dark:border-amber-700  dark:bg-amber-900/40  dark:text-amber-300",
        rank === 2 && "border-slate-200  bg-slate-100  text-slate-600  dark:border-slate-700  dark:bg-slate-800      dark:text-slate-300",
        rank === 3 && "border-orange-200 bg-orange-100 text-orange-700 dark:border-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
        rank > 3  && "border-border     bg-muted      text-muted-foreground"
      )}
    >
      {rank}
    </span>
  )
}

interface CreatorPerformanceTableProps {
  creators: CreatorPerformanceRow[]
  className?: string
}

function CreatorPerformanceTable({ creators, className }: CreatorPerformanceTableProps) {
  return (
    <div className={cn("overflow-x-auto rounded-xl border border-border", className)}>
      <table className="w-full text-sm">
        <thead className="border-b border-border bg-muted/40">
          <tr>
            <th className="w-12 px-4 py-3 text-left text-xs font-medium text-muted-foreground">Rank</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Creator</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Posts</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Impressions</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Eng. Rate</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Revenue</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {creators.map((creator) => (
            <tr
              key={creator.rank}
              className="bg-background hover:bg-muted/30 transition-colors"
            >
              <td className="px-4 py-3">
                <RankBadge rank={creator.rank} />
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <Avatar className="size-8 shrink-0">
                    {creator.avatarUrl && (
                      <AvatarImage src={creator.avatarUrl} alt={creator.name} />
                    )}
                    <AvatarFallback className="text-xs font-bold">
                      {creator.initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-foreground">{creator.name}</span>
                </div>
              </td>
              <td className="px-4 py-3 text-muted-foreground">{creator.posts}</td>
              <td className="px-4 py-3 font-medium text-foreground">
                {formatK(creator.impressions)}
              </td>
              <td className="px-4 py-3 text-foreground">{creator.engagementRate.toFixed(1)}%</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <span className="font-medium text-foreground">${formatK(creator.revenue)}</span>
                  {creator.revenueChange !== undefined && (
                    <TrendIndicator
                      direction={
                        creator.revenueChange > 0
                          ? "up"
                          : creator.revenueChange < 0
                          ? "down"
                          : "neutral"
                      }
                      value={Math.abs(creator.revenueChange)}
                    />
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export { CreatorPerformanceTable, type CreatorPerformanceTableProps }
