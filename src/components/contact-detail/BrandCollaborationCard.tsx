import * as React from "react"
import { cn } from "@/lib/utils"

interface BrandCollaborationCardProps {
  imageUrl?: string
  brandName: string
  metric: string
  metricLabel?: string
  date: string
  className?: string
}

function BrandCollaborationCard({
  imageUrl,
  brandName,
  metric,
  metricLabel = "Engagements",
  date,
  className,
}: BrandCollaborationCardProps) {
  return (
    <div
      className={cn(
        "flex w-44 shrink-0 flex-col overflow-hidden rounded-xl border bg-card shadow-sm",
        className
      )}
    >
      {/* Image */}
      <div className="h-28 bg-muted">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageUrl} alt={brandName} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-2xl font-bold text-muted-foreground/30">
              {brandName.slice(0, 1)}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-0.5 p-3">
        <p className="text-sm font-semibold text-foreground truncate">{brandName}</p>
        <p className="text-xs text-muted-foreground">{metricLabel}</p>
        <p className="text-base font-bold text-foreground">{metric}</p>
        <p className="text-xs text-muted-foreground">{date}</p>
      </div>
    </div>
  )
}

export { BrandCollaborationCard, type BrandCollaborationCardProps }
