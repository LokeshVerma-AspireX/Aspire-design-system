import * as React from "react"
import { FileText, Megaphone } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ContentCard, type ContentCardProps } from "./ContentCard"

interface ContentBriefGroupProps {
  briefName: string
  campaignName?: string
  signedDate?: string
  content: ContentCardProps[]
  onViewBrief?: () => void
  onViewCampaign?: () => void
  className?: string
}

function ContentBriefGroup({
  briefName,
  campaignName,
  signedDate,
  content,
  onViewBrief,
  onViewCampaign,
  className,
}: ContentBriefGroupProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {/* Brief header */}
      <div className="flex items-center justify-between gap-3 rounded-xl border bg-card px-4 py-3 shadow-sm">
        <div className="flex flex-col gap-0.5 min-w-0">
          {signedDate && (
            <p className="text-xs font-medium text-green-600">Signed {signedDate}</p>
          )}
          <p className="font-semibold text-foreground truncate">{briefName}</p>
          {campaignName && (
            <p className="text-sm text-muted-foreground truncate">{campaignName}</p>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {onViewBrief && (
            <Button variant="outline" size="sm" onClick={onViewBrief} className="h-7 gap-1.5 text-xs">
              <FileText className="size-3.5" />
              View Brief
            </Button>
          )}
          {onViewCampaign && (
            <Button variant="outline" size="sm" onClick={onViewCampaign} className="h-7 gap-1.5 text-xs">
              <Megaphone className="size-3.5" />
              View Campaign
            </Button>
          )}
        </div>
      </div>

      {/* Horizontal scrollable content cards */}
      {content.length > 0 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {content.map((card, i) => (
            <ContentCard key={i} {...card} />
          ))}
        </div>
      )}
    </div>
  )
}

export { ContentBriefGroup, type ContentBriefGroupProps }
