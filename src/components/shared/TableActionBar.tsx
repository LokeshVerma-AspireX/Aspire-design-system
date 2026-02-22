"use client"

import * as React from "react"
import {
  ChevronDown,
  Columns3,
  Download,
  MoreHorizontal,
  Search,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ViewToggle, type ViewMode } from "./ViewToggle"

interface ActionItem {
  label: string
  onClick: () => void
  variant?: "default" | "destructive"
}

interface DateRangeOption {
  label: string
  value: string
}

interface TableActionBarProps {
  actions?: ActionItem[]
  moreItems?: ActionItem[]
  searchValue?: string
  onSearchChange?: (value: string) => void
  dateRangeOptions?: DateRangeOption[]
  dateRange?: string
  onDateRangeChange?: (value: string) => void
  onExport?: () => void
  onColumnSettings?: () => void
  view?: ViewMode
  onViewChange?: (view: ViewMode) => void
  className?: string
}

function TableActionBar({
  actions,
  moreItems,
  searchValue = "",
  onSearchChange,
  dateRangeOptions,
  dateRange,
  onDateRangeChange,
  onExport,
  onColumnSettings,
  view,
  onViewChange,
  className,
}: TableActionBarProps) {
  const [searchOpen, setSearchOpen] = React.useState(false)

  function handleSearchToggle() {
    if (searchOpen) {
      onSearchChange?.("")
    }
    setSearchOpen((prev) => !prev)
  }

  return (
    <div
      data-slot="table-action-bar"
      className={cn(
        "flex items-center justify-between gap-3 border-b border-border bg-background px-6 py-2.5",
        className
      )}
    >
      {/* Left side */}
      <div className="flex items-center gap-2">
        {/* Actions dropdown (black filled) */}
        {actions && actions.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="sm"
                className="h-8 gap-1 bg-foreground text-background hover:bg-foreground/85"
              >
                Actions
                <ChevronDown className="size-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {actions.map((item, i) => (
                <DropdownMenuItem
                  key={i}
                  onClick={item.onClick}
                  variant={item.variant === "destructive" ? "destructive" : "default"}
                >
                  {item.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {/* More (…) menu */}
        {moreItems && moreItems.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon-sm" aria-label="More options">
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {moreItems.map((item, i) => (
                <React.Fragment key={i}>
                  {i > 0 && item.variant === "destructive" && (
                    <DropdownMenuSeparator />
                  )}
                  <DropdownMenuItem
                    onClick={item.onClick}
                    variant={item.variant === "destructive" ? "destructive" : "default"}
                  >
                    {item.label}
                  </DropdownMenuItem>
                </React.Fragment>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-1.5">
        {/* Inline search */}
        {onSearchChange && (
          <div className="flex items-center">
            {searchOpen ? (
              <div className="flex items-center gap-1 rounded-md border border-input bg-background pl-2 pr-1">
                <Search className="size-3.5 shrink-0 text-muted-foreground" />
                <input
                  autoFocus
                  value={searchValue}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search…"
                  className="h-7 w-40 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
                <button
                  onClick={handleSearchToggle}
                  aria-label="Close search"
                  className="flex size-6 items-center justify-center rounded text-muted-foreground hover:text-foreground"
                >
                  <X className="size-3.5" />
                </button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Search"
                onClick={handleSearchToggle}
              >
                <Search className="size-4" />
              </Button>
            )}
          </div>
        )}

        {/* Export */}
        {onExport && (
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Export"
            onClick={onExport}
          >
            <Download className="size-4" />
          </Button>
        )}

        {/* Column settings */}
        {onColumnSettings && (
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Column settings"
            onClick={onColumnSettings}
          >
            <Columns3 className="size-4" />
          </Button>
        )}

        {/* Date range */}
        {dateRangeOptions && dateRangeOptions.length > 0 && (
          <Select value={dateRange} onValueChange={onDateRangeChange}>
            <SelectTrigger size="sm" className="h-8 min-w-[160px] text-xs">
              <SelectValue placeholder="Report Date" />
            </SelectTrigger>
            <SelectContent align="end">
              {dateRangeOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {/* View toggle */}
        {onViewChange && (
          <ViewToggle value={view} onChange={onViewChange} />
        )}
      </div>
    </div>
  )
}

export { TableActionBar, type TableActionBarProps, type ActionItem, type DateRangeOption }
