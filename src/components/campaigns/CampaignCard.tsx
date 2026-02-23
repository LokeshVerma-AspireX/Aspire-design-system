"use client"

import * as React from "react"
import { Users, Image, DollarSign, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// ─── Types ───────────────────────────────────────────────────────────────────

export type CampaignStatus = "active" | "draft" | "paused" | "completed"
export type CampaignType = "sponsored" | "gifted" | "affiliate" | "ambassador"

export interface CampaignCreator {
  name: string
  avatarUrl?: string
  initials: string
}

export interface Campaign {
  id: string
  name: string
  coverImageUrl?: string
  status: CampaignStatus
  type: CampaignType
  startDate: string
  endDate: string
  creatorCount: number
  contentCount: number
  revenue: number
  progress: number
  creators?: CampaignCreator[]
}

interface CampaignCardProps {
  campaign: Campaign
  onView?: (id: string) => void
  className?: string
}

// ─── Config ──────────────────────────────────────────────────────────────────

const statusConfig: Record<CampaignStatus, { label: string; className: string }> = {
  active:    { label: "Active",    className: "bg-green-500 text-white" },
  draft:     { label: "Draft",     className: "bg-gray-500 text-white" },
  paused:    { label: "Paused",    className: "bg-orange-500 text-white" },
  completed: { label: "Completed", className: "bg-blue-500 text-white" },
}

const typeConfig: Record<CampaignType, { label: string; className: string }> = {
  sponsored:  { label: "Sponsored",  className: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300" },
  gifted:     { label: "Gifted",     className: "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300" },
  affiliate:  { label: "Affiliate",  className: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300" },
  ambassador: { label: "Ambassador", className: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300" },
}

const typeGradients: Record<CampaignType, string> = {
  sponsored:  "from-purple-500/20 to-purple-600/40",
  gifted:     "from-teal-500/20 to-teal-600/40",
  affiliate:  "from-amber-500/20 to-amber-600/40",
  ambassador: "from-blue-500/20 to-blue-600/40",
}

function formatCurrency(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`
  if (value >= 1_000) return `$${(value / 1_000).toFixed(1)}K`
  return `$${value}`
}

function formatDateRange(start: string, end: string): string {
  const fmt = (d: string) => {
    const date = new Date(d + "T00:00:00")
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }
  return `${fmt(start)} — ${fmt(end)}`
}

// ─── Component ───────────────────────────────────────────────────────────────

function CampaignCard({ campaign, onView, className }: CampaignCardProps) {
  const status = statusConfig[campaign.status]
  const type = typeConfig[campaign.type]

  return (
    <div
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-md",
        className
      )}
    >
      {/* Cover image */}
      <div className="relative h-[200px] overflow-hidden">
        {campaign.coverImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={campaign.coverImageUrl}
            alt=""
            className="h-full w-full object-cover transition-transform group-hover:scale-[1.02]"
          />
        ) : (
          <div
            className={cn(
              "flex h-full w-full items-center justify-center bg-gradient-to-br",
              typeGradients[campaign.type]
            )}
          >
            <span className="text-4xl font-bold text-foreground/10">
              {campaign.name.charAt(0)}
            </span>
          </div>
        )}

        {/* Status badge */}
        <span
          className={cn(
            "absolute right-3 top-3 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
            status.className
          )}
        >
          {status.label}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* Name + type */}
        <div className="flex flex-col gap-1.5">
          <h3 className="line-clamp-2 text-base font-semibold text-foreground">
            {campaign.name}
          </h3>
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium",
                type.className
              )}
            >
              {type.label}
            </span>
            <span className="text-[13px] text-muted-foreground">
              {formatDateRange(campaign.startDate, campaign.endDate)}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border" />

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2 text-center">
          {[
            { icon: Users, value: campaign.creatorCount.toString(), label: "Creators" },
            { icon: Image, value: campaign.contentCount.toString(), label: "Content" },
            { icon: DollarSign, value: formatCurrency(campaign.revenue), label: "Revenue" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-0.5">
              <div className="flex items-center gap-1">
                <stat.icon className="size-4 text-muted-foreground" />
                <span className="text-sm font-semibold text-foreground">{stat.value}</span>
              </div>
              <span className="text-[11px] text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        {/* <div className="space-y-1">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Progress</span>
            <span>{campaign.progress}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className={cn(
                "h-full rounded-full transition-all",
                campaign.progress >= 100
                  ? "bg-green-500"
                  : campaign.progress >= 50
                    ? "bg-primary"
                    : "bg-blue-500"
              )}
              style={{ width: `${Math.min(campaign.progress, 100)}%` }}
            />
          </div>
        </div> */}

        {/* Footer: avatar stack + view button */}
        <div className="flex items-center justify-between">
        
        </div>
      </div>
    </div>
  )
}

export { CampaignCard, type CampaignCardProps }
