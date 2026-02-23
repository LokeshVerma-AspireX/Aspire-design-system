"use client"

import * as React from "react"
import {
  Eye,
  Heart,
  Instagram,
  Mail,
  MessageSquare,
  TrendingUp,
  Users,
  Video,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import type { CreatorStatus } from "./MembersTab"

// ─── Types ───────────────────────────────────────────────────────────────────

interface ContentPiece {
  type: string
  date: string
  platform: string
}

interface ActivityItem {
  action: string
  date: string
}

interface Creator {
  id: string
  name: string
  email: string
  avatarUrl?: string
  handle: string
  platforms: string[]
  followers: number
  engagementRate: number
  avgViews: number
  postsPerMonth: number
  status: CreatorStatus
  offer: string
  deliverables: string
  contentSubmitted: ContentPiece[]
  activity: ActivityItem[]
}

interface CreatorDetailDrawerProps {
  creator: Creator | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSendMessage?: (creator: Creator) => void
  onViewFullProfile?: (creator: Creator) => void
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const statusConfig: Record<CreatorStatus, string> = {
  Approved: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  Invited: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  Pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  Declined: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
}

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return n.toString()
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

const platformIcon: Record<string, React.ElementType> = {
  Instagram: Instagram,
  TikTok: Video,
}

// ─── Stat Block ──────────────────────────────────────────────────────────────

function StatBlock({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType
  label: string
  value: string
}) {
  return (
    <div className="flex flex-col items-center gap-1.5 text-center">
      <Icon className="size-5 text-stone-400 dark:text-stone-500" />
      <span className="text-lg font-semibold text-stone-900 dark:text-stone-100">{value}</span>
      <span className="text-xs text-stone-500 dark:text-stone-400">{label}</span>
    </div>
  )
}

// ─── Component ───────────────────────────────────────────────────────────────

function CreatorDetailDrawer({
  creator,
  open,
  onOpenChange,
  onSendMessage,
  onViewFullProfile,
}: CreatorDetailDrawerProps) {
  if (!creator) return null

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[480px] overflow-y-auto sm:max-w-[480px]">
        <SheetHeader>
          <SheetTitle>Creator Profile</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-6 py-6">
          {/* Creator Hero */}
          <div className="flex flex-col items-center gap-3 text-center">
            <Avatar className="size-[72px]">
              <AvatarImage src={creator.avatarUrl} alt={creator.name} />
              <AvatarFallback className="bg-stone-200 text-lg font-medium text-stone-600 dark:bg-stone-700 dark:text-stone-300">
                {getInitials(creator.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold text-stone-900 dark:text-stone-100">
                {creator.name}
              </h2>
              <p className="text-sm text-stone-500 dark:text-stone-400">{creator.handle}</p>
            </div>
            <div className="flex items-center gap-2">
              {creator.platforms.map((platform) => {
                const Icon = platformIcon[platform] ?? Mail
                return (
                  <span
                    key={platform}
                    className="inline-flex items-center gap-1 rounded-full bg-stone-100 px-2.5 py-1 text-xs font-medium text-stone-700 dark:bg-stone-800 dark:text-stone-300"
                  >
                    <Icon className="size-3" />
                    {platform}
                  </span>
                )
              })}
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-4 gap-4 rounded-lg bg-stone-50 px-4 py-4 dark:bg-stone-900/40">
            <StatBlock icon={Users} label="Followers" value={formatNumber(creator.followers)} />
            <StatBlock icon={Heart} label="Eng. Rate" value={`${creator.engagementRate}%`} />
            <StatBlock icon={Eye} label="Avg. Views" value={formatNumber(creator.avgViews)} />
            <StatBlock icon={TrendingUp} label="Posts/mo" value={String(creator.postsPerMonth)} />
          </div>

          <Separator />

          {/* Campaign Details */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
              Campaign Details
            </h3>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-stone-500 dark:text-stone-400">Status</span>
                <span
                  className={cn(
                    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                    statusConfig[creator.status]
                  )}
                >
                  {creator.status}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-stone-500 dark:text-stone-400">Offer</span>
                <span className="text-sm font-medium text-stone-900 dark:text-stone-100">
                  {creator.offer}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-stone-500 dark:text-stone-400">Deliverables</span>
                <span className="text-sm text-stone-900 dark:text-stone-100">
                  {creator.deliverables}
                </span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Content Submitted */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
              Content Submitted
            </h3>
            {creator.contentSubmitted.length === 0 ? (
              <p className="text-sm text-stone-500 dark:text-stone-400">No content submitted yet.</p>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {creator.contentSubmitted.map((item, i) => {
                  const Icon = platformIcon[item.platform] ?? Mail
                  return (
                    <div
                      key={i}
                      className="flex flex-col gap-1 rounded-lg border border-stone-200 bg-stone-50 p-3 dark:border-stone-700 dark:bg-stone-900/30"
                    >
                      <div className="flex items-center gap-1.5">
                        <Icon className="size-3.5 text-stone-400" />
                        <span className="text-xs font-medium text-stone-700 dark:text-stone-300">
                          {item.type}
                        </span>
                      </div>
                      <span className="text-[11px] text-stone-500 dark:text-stone-400">
                        {item.date}
                      </span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          <Separator />

          {/* Activity Timeline */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
              Activity
            </h3>
            <div className="flex flex-col gap-0">
              {creator.activity.map((item, i) => (
                <div key={i} className="relative flex gap-3 pb-4 last:pb-0">
                  {/* Connector line */}
                  {i < creator.activity.length - 1 && (
                    <div className="absolute left-[7px] top-4 h-full w-px bg-stone-200 dark:bg-stone-700" />
                  )}
                  {/* Dot */}
                  <div className="relative z-10 mt-1 size-[15px] shrink-0 rounded-full border-2 border-stone-300 bg-background dark:border-stone-600" />
                  <div className="flex flex-col">
                    <span className="text-sm text-stone-900 dark:text-stone-100">
                      {item.action}
                    </span>
                    <span className="text-xs text-stone-500 dark:text-stone-400">{item.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 border-t border-stone-200 pt-4 dark:border-stone-800">
          <Button
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => creator && onSendMessage?.(creator)}
          >
            <MessageSquare className="mr-1.5 size-4" />
            Send Message
          </Button>
          <Button
            variant="link"
            className="text-stone-600 dark:text-stone-400"
            onClick={() => creator && onViewFullProfile?.(creator)}
          >
            View Full Profile →
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export { CreatorDetailDrawer, type Creator, type CreatorDetailDrawerProps }
