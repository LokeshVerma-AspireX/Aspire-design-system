"use client"

import * as React from "react"
import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ActivityItem, type ActivityItemProps } from "./ActivityItem"

type ActivityItemData = Omit<ActivityItemProps, "isLast">

interface ActivityFeedProps {
  activities: ActivityItemData[]
  campaignFilter?: string
  activityTypeFilter?: string
  onCampaignFilterChange?: (v: string) => void
  onActivityTypeFilterChange?: (v: string) => void
  onNewActivity?: () => void
  campaignOptions?: Array<{ label: string; value: string }>
  activityTypeOptions?: Array<{ label: string; value: string }>
  className?: string
}

function ActivityFeed({
  activities,
  campaignFilter,
  activityTypeFilter,
  onCampaignFilterChange,
  onActivityTypeFilterChange,
  onNewActivity,
  campaignOptions = [],
  activityTypeOptions = [],
  className,
}: ActivityFeedProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-2">
        <Button
          size="sm"
          onClick={onNewActivity}
          className="h-8 gap-1 bg-foreground text-background hover:bg-foreground/85"
        >
          <Plus className="size-3.5" />
          New Activity
        </Button>

        <div className="flex items-center gap-2">
          {campaignOptions.length > 0 && (
            <Select value={campaignFilter} onValueChange={onCampaignFilterChange}>
              <SelectTrigger size="sm" className="h-8 text-xs min-w-[130px]">
                <SelectValue placeholder="All Campaigns" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Campaigns</SelectItem>
                {campaignOptions.map((o) => (
                  <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {activityTypeOptions.length > 0 && (
            <Select value={activityTypeFilter} onValueChange={onActivityTypeFilterChange}>
              <SelectTrigger size="sm" className="h-8 text-xs min-w-[130px]">
                <SelectValue placeholder="Activity Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {activityTypeOptions.map((o) => (
                  <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </div>

      {/* Timeline */}
      {activities.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted-foreground">No activity yet.</p>
      ) : (
        <div className="flex flex-col">
          {activities.map((activity, i) => (
            <ActivityItem
              key={i}
              {...activity}
              isLast={i === activities.length - 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export { ActivityFeed, type ActivityFeedProps, type ActivityItemData }
