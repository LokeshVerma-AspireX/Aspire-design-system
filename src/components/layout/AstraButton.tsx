"use client"

import * as React from "react"
import { Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface AstraButtonProps {
  collapsed?: boolean
  onClick?: () => void
  className?: string
}

function AstraButton({ collapsed = false, onClick, className }: AstraButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label="Ask Astra AI"
      className={cn(
        "group flex items-center gap-2 rounded-lg border border-primary/30 px-3 py-2",
        "bg-primary/10 text-primary text-sm font-medium",
        "transition-all hover:bg-primary/20 hover:border-primary/50",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
        collapsed && "justify-center px-2",
        className
      )}
    >
      <Sparkles
        className={cn(
          "size-4 shrink-0 transition-transform",
          "group-hover:scale-110 group-hover:rotate-12"
        )}
      />
      {!collapsed && <span className="truncate">Ask Astra</span>}
    </button>
  )
}

export { AstraButton, type AstraButtonProps }
