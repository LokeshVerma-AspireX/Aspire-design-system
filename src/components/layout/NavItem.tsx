"use client"

import * as React from "react"
import { type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface NavItemProps {
  icon: LucideIcon
  label: string
  isActive?: boolean
  badge?: number
  collapsed?: boolean
  /** Stacked layout: icon above label (main nav items when collapsed). */
  stacked?: boolean
  onClick?: () => void
  className?: string
}

function NavItem({
  icon: Icon,
  label,
  isActive = false,
  badge,
  collapsed = true,
  stacked = false,
  onClick,
  className,
}: NavItemProps) {
  /* ───────────────────────────────────────────────
   * Stacked: icon above label, vertically centred.
   * Main-nav items when sidebar is collapsed (80 px).
   * Figma export: rounded-lg, py-2 px-3, icon 20 px,
   * label text-[11px], gap-1. Active = bg-sidebar-accent only.
   * ─────────────────────────────────────────────── */
  if (stacked) {
    return (
      <button
        onClick={onClick}
        aria-label={label}
        aria-current={isActive ? "page" : undefined}
        data-sidebar="menu-button"
        data-active={isActive || undefined}
        className={cn(
          "group relative flex w-full flex-col items-center justify-center gap-1 rounded-lg px-1 py-2 transition-colors",
          "text-sidebar-foreground",
          "hover:bg-sidebar-accent",
          isActive && "bg-sidebar-accent",
          "outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
          className
        )}
      >
        <Icon
          strokeWidth={1.5}
          className="size-5 shrink-0 text-sidebar-foreground"
        />
        <span className="max-w-full truncate text-center text-[11px] font-normal leading-tight">
          {label}
        </span>

        {badge != null && badge > 0 && (
          <span className="absolute top-0.5 right-0.5 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-sidebar-primary px-0.5 text-[8px] font-semibold text-sidebar-primary-foreground leading-none">
            {badge > 99 ? "99+" : badge}
          </span>
        )}
      </button>
    )
  }

  /* ───────────────────────────────────────────────
   * Icon-only collapsed: icon with tooltip.
   * Footer / utility items when sidebar is collapsed.
   * Figma export: w-10 h-10, p-3, rounded (4 px),
   * icon 18 px. Active = bg-sidebar-accent only.
   * ─────────────────────────────────────────────── */
  if (collapsed) {
    const button = (
      <button
        onClick={onClick}
        aria-label={label}
        aria-current={isActive ? "page" : undefined}
        data-sidebar="menu-button"
        data-active={isActive || undefined}
        className={cn(
          "group relative flex h-10 w-10 items-center justify-center rounded p-3 transition-colors",
          "text-sidebar-foreground",
          "hover:bg-sidebar-accent",
          isActive && "bg-sidebar-accent",
          "outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
          className
        )}
      >
        <Icon
          strokeWidth={1.5}
          className="size-[18px] shrink-0 text-sidebar-foreground"
        />

        {badge != null && badge > 0 && (
          <span className="absolute top-0.5 right-0.5 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-sidebar-primary px-0.5 text-[8px] font-semibold text-sidebar-primary-foreground leading-none">
            {badge > 99 ? "99+" : badge}
          </span>
        )}
      </button>
    )

    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent side="right" sideOffset={8}>
          {label}
          {badge != null && badge > 0 && (
            <span className="ml-1.5 text-sidebar-primary">({badge})</span>
          )}
        </TooltipContent>
      </Tooltip>
    )
  }

  /* ───────────────────────────────────────────────
   * Expanded inline: icon + label side-by-side (240 px sidebar).
   * Figma export: gap-2.5, px-3 py-2, rounded-lg,
   * icon 20 px. Active = bg-sidebar-accent only.
   * ─────────────────────────────────────────────── */
  return (
    <button
      onClick={onClick}
      aria-label={label}
      aria-current={isActive ? "page" : undefined}
      data-sidebar="menu-button"
      data-active={isActive || undefined}
      className={cn(
        "group relative flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        "text-sidebar-foreground",
        "hover:bg-sidebar-accent",
        isActive && "bg-sidebar-accent",
        "outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
        className
      )}
    >
      <Icon
        strokeWidth={1.5}
        className="size-5 shrink-0 text-sidebar-foreground"
      />

      <span className="truncate">{label}</span>

      {badge != null && badge > 0 && (
        <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-sidebar-primary px-1 text-[10px] font-semibold text-sidebar-primary-foreground">
          {badge > 99 ? "99+" : badge}
        </span>
      )}
    </button>
  )
}

export { NavItem, type NavItemProps }
