"use client"

import * as React from "react"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { WorkflowStage } from "./types"

interface WorkflowStagePreviewProps {
  stages: WorkflowStage[]
  note?: string
  size?: "sm" | "default"
  className?: string
}

function WorkflowStagePreview({
  stages,
  note,
  size = "default",
  className,
}: WorkflowStagePreviewProps) {
  if (stages.length === 0 && note) {
    return (
      <p className={cn("text-sm italic text-muted-foreground", className)}>
        {note}
      </p>
    )
  }

  return (
    <div className={cn("flex flex-wrap items-center gap-1", className)}>
      {stages.map((stage, i) => (
        <React.Fragment key={stage.label}>
          <span
            className={cn(
              "inline-flex items-center rounded-full border border-border bg-muted/50 font-medium text-foreground",
              size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-3 py-1 text-xs"
            )}
          >
            {stage.label}
          </span>
          {i < stages.length - 1 && (
            <ChevronRight
              className={cn(
                "shrink-0 text-muted-foreground",
                size === "sm" ? "size-3" : "size-3.5"
              )}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

export { WorkflowStagePreview, type WorkflowStagePreviewProps }
