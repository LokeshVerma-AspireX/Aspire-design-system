import * as React from "react"
import { cn } from "@/lib/utils"

type StatusVariant = "active" | "deactivated" | "paused" | "error"

interface StatusDotProps {
  status: StatusVariant
  label?: string
  showLabel?: boolean
  className?: string
}

const statusConfig: Record<StatusVariant, { dot: string; defaultLabel: string }> = {
  active:      { dot: "bg-green-500",   defaultLabel: "Active" },
  deactivated: { dot: "bg-orange-400",  defaultLabel: "Deactivated" },
  paused:      { dot: "bg-slate-400",   defaultLabel: "Paused" },
  error:       { dot: "bg-red-500",     defaultLabel: "Error" },
}

function StatusDot({ status, label, showLabel = true, className }: StatusDotProps) {
  const config = statusConfig[status]
  const displayLabel = label ?? config.defaultLabel

  return (
    <span
      data-slot="status-dot"
      data-status={status}
      className={cn("inline-flex items-center gap-1.5", className)}
    >
      <span
        aria-hidden="true"
        className={cn("size-2 shrink-0 rounded-full", config.dot)}
      />
      {showLabel && (
        <span className="text-sm text-foreground">{displayLabel}</span>
      )}
    </span>
  )
}

export { StatusDot, type StatusVariant, type StatusDotProps }
