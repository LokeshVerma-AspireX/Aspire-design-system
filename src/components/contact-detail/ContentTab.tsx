import * as React from "react"
import { cn } from "@/lib/utils"
import { ContentBriefGroup, type ContentBriefGroupProps } from "./ContentBriefGroup"

interface ContentTabProps {
  briefGroups: ContentBriefGroupProps[]
  className?: string
}

function ContentTab({ briefGroups, className }: ContentTabProps) {
  if (briefGroups.length === 0) {
    return (
      <div className={cn("flex items-center justify-center py-24", className)}>
        <p className="text-sm text-muted-foreground">No content submitted yet.</p>
      </div>
    )
  }

  return (
    <div className={cn("flex flex-col gap-6 p-6", className)}>
      {briefGroups.map((group, i) => (
        <ContentBriefGroup key={i} {...group} />
      ))}
    </div>
  )
}

export { ContentTab, type ContentTabProps }
