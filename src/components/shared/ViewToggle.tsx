"use client"

import * as React from "react"
import { LayoutGrid, List } from "lucide-react"
import { cn } from "@/lib/utils"

type ViewMode = "grid" | "list"

interface ViewToggleProps {
  value?: ViewMode
  defaultValue?: ViewMode
  onChange?: (value: ViewMode) => void
  className?: string
}

function ViewToggle({ value, defaultValue = "list", onChange, className }: ViewToggleProps) {
  const [internal, setInternal] = React.useState<ViewMode>(defaultValue)
  const current = value ?? internal

  function handleChange(next: ViewMode) {
    setInternal(next)
    onChange?.(next)
  }

  return (
    <div
      data-slot="view-toggle"
      role="group"
      aria-label="View mode"
      className={cn(
        "flex items-center rounded-md border border-input overflow-hidden",
        className
      )}
    >
      {(["list", "grid"] as const).map((mode) => {
        const Icon = mode === "list" ? List : LayoutGrid
        const isActive = current === mode
        return (
          <button
            key={mode}
            type="button"
            aria-label={`${mode} view`}
            aria-pressed={isActive}
            onClick={() => handleChange(mode)}
            className={cn(
              "flex h-8 w-8 items-center justify-center transition-colors",
              isActive
                ? "bg-foreground text-background"
                : "bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Icon className="size-3.5" />
          </button>
        )
      })}
    </div>
  )
}

export { ViewToggle, type ViewMode, type ViewToggleProps }
