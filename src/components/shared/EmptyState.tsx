"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  learnMoreLabel?: string
  onLearnMore?: () => void
  className?: string
}

function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  learnMoreLabel = "Learn more →",
  onLearnMore,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 px-6 py-16 text-center",
        className
      )}
    >
      {icon && (
        <div className="flex size-14 items-center justify-center rounded-full border border-border bg-muted text-muted-foreground">
          {icon}
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
        {description && (
          <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      {(actionLabel || onLearnMore) && (
        <div className="flex flex-col items-center gap-2">
          {actionLabel && (
            <Button
              onClick={onAction}
              className="h-9 bg-foreground text-background hover:bg-foreground/85"
            >
              {actionLabel}
            </Button>
          )}
          {onLearnMore && (
            <button
              onClick={onLearnMore}
              className="text-sm text-muted-foreground underline-offset-2 hover:text-foreground hover:underline transition-colors"
            >
              {learnMoreLabel}
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export { EmptyState, type EmptyStateProps }
