import * as React from "react"
import { Check, Shield, Tag } from "lucide-react"
import { cn } from "@/lib/utils"

interface ContentCardProps {
  thumbnailUrl?: string
  creatorName: string
  creatorInitials?: string
  date: string
  usageRights?: string
  tagCount?: number
  status: "approved" | "pending" | "rejected" | "in_review"
  hasAdRights?: boolean
  platform?: "instagram" | "tiktok" | "youtube"
  className?: string
}

const statusConfig = {
  approved:  { label: "Approved",  icon: <Check className="size-3" />, cls: "text-green-600 bg-green-50 border-green-200" },
  pending:   { label: "Pending",   icon: null,                           cls: "text-amber-600 bg-amber-50 border-amber-200" },
  rejected:  { label: "Rejected",  icon: null,                           cls: "text-red-600 bg-red-50 border-red-200" },
  in_review: { label: "In Review", icon: null,                           cls: "text-blue-600 bg-blue-50 border-blue-200" },
}

function ContentCard({
  thumbnailUrl,
  creatorName,
  creatorInitials,
  date,
  usageRights = "Limited Broad",
  tagCount = 0,
  status,
  hasAdRights = false,
  platform,
  className,
}: ContentCardProps) {
  const sc = statusConfig[status]

  return (
    <div
      className={cn(
        "flex w-52 shrink-0 flex-col overflow-hidden rounded-xl border bg-card shadow-sm",
        className
      )}
    >
      {/* Thumbnail */}
      <div className="relative h-36 bg-muted">
        {thumbnailUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={thumbnailUrl} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="size-10 rounded-full bg-muted-foreground/20" />
          </div>
        )}
        {/* Creator avatar overlay */}
        <div className="absolute bottom-2 left-2 flex size-7 items-center justify-center rounded-full bg-foreground text-[10px] font-bold text-background ring-2 ring-background">
          {creatorInitials ?? creatorName.slice(0, 2).toUpperCase()}
        </div>
        {hasAdRights && (
          <span className="absolute top-2 right-2 rounded-full bg-green-500 px-1.5 py-0.5 text-[10px] font-semibold text-white">
            Ad Rights
          </span>
        )}
      </div>

      {/* Meta */}
      <div className="flex flex-col gap-1.5 p-3">
        <span className="text-xs text-muted-foreground">{date}</span>

        <div className="flex items-center gap-1.5">
          <Shield className="size-3 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">{usageRights}</span>
          {tagCount > 0 && (
            <>
              <span className="text-muted-foreground">·</span>
              <Tag className="size-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{tagCount}</span>
            </>
          )}
        </div>

        <span
          className={cn(
            "inline-flex items-center gap-1 self-start rounded-full border px-2 py-0.5 text-xs font-medium",
            sc.cls
          )}
        >
          {sc.icon}
          {sc.label}
        </span>
      </div>
    </div>
  )
}

export { ContentCard, type ContentCardProps }
