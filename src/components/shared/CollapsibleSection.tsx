"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface CollapsibleSectionProps {
  title: string
  defaultOpen?: boolean
  children?: React.ReactNode
  className?: string
}

function CollapsibleSection({
  title,
  defaultOpen = false,
  children,
  className,
}: CollapsibleSectionProps) {
  const [open, setOpen] = React.useState(defaultOpen)

  return (
    <div className={cn("rounded-lg border border-border overflow-hidden", className)}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between bg-background px-4 py-3 text-sm font-medium text-foreground hover:bg-muted/50 transition-colors"
        aria-expanded={open}
      >
        {title}
        <ChevronDown
          className={cn(
            "size-4 text-muted-foreground transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>
      {open && children && (
        <div className="border-t border-border bg-background px-4 py-4">
          {children}
        </div>
      )}
    </div>
  )
}

export { CollapsibleSection, type CollapsibleSectionProps }
