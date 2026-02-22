"use client"

import * as React from "react"
import { ChevronDown, Plus, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface FilterOption {
  label: string
  value: string
}

interface QuickFilterDef {
  id: string
  label: string
  options: FilterOption[]
  value?: string
  onValueChange?: (value: string | null) => void
}

interface AppliedFilterChip {
  id: string
  label: string
  onRemove: () => void
}

interface FilterBarProps {
  savedViews?: FilterOption[]
  currentSavedView?: string
  onSavedViewChange?: (value: string) => void
  quickFilters?: QuickFilterDef[]
  appliedFilters?: AppliedFilterChip[]
  onAddFilter?: () => void
  className?: string
}

function SavedViewsDropdown({
  views,
  current,
  onChange,
}: {
  views: FilterOption[]
  current?: string
  onChange?: (v: string) => void
}) {
  const selectedLabel = views.find((v) => v.value === current)?.label ?? "Saved Views"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="inline-flex h-8 items-center gap-1.5 rounded-md border border-input bg-background px-3 text-sm text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50">
          {selectedLabel}
          <ChevronDown className="size-3.5 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-44">
        <DropdownMenuRadioGroup
          value={current}
          onValueChange={(v) => onChange?.(v)}
        >
          {views.map((view) => (
            <DropdownMenuRadioItem key={view.value} value={view.value}>
              {view.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function QuickFilter({ id, label, options, value, onValueChange }: QuickFilterDef) {
  const selectedLabel = options.find((o) => o.value === value)?.label

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "inline-flex h-8 items-center gap-1.5 rounded-md border px-3 text-sm transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
            value
              ? "border-primary/50 bg-primary/10 text-foreground"
              : "border-input bg-background text-foreground hover:bg-muted"
          )}
        >
          <span className="text-muted-foreground">{label}:</span>
          <span>{selectedLabel ?? "Any"}</span>
          <ChevronDown className="size-3.5 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-44">
        <DropdownMenuRadioGroup
          value={value ?? ""}
          onValueChange={(v) => onValueChange?.(v || null)}
        >
          <DropdownMenuRadioItem value="">Any</DropdownMenuRadioItem>
          {options.map((opt) => (
            <DropdownMenuRadioItem key={opt.value} value={opt.value}>
              {opt.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function FilterBar({
  savedViews,
  currentSavedView,
  onSavedViewChange,
  quickFilters,
  appliedFilters,
  onAddFilter,
  className,
}: FilterBarProps) {
  const hasChips = appliedFilters && appliedFilters.length > 0

  return (
    <div
      data-slot="filter-bar"
      className={cn("flex flex-col gap-2 border-b border-border px-6 py-3", className)}
    >
      {/* Row 1: controls */}
      <div className="flex flex-wrap items-center gap-2">
        {savedViews && savedViews.length > 0 && (
          <>
            <SavedViewsDropdown
              views={savedViews}
              current={currentSavedView}
              onChange={onSavedViewChange}
            />
            <div className="h-5 w-px bg-border" />
          </>
        )}

        {quickFilters?.map((f) => (
          <QuickFilter key={f.id} {...f} />
        ))}

        <Button
          variant="ghost"
          size="sm"
          onClick={onAddFilter}
          className="h-8 gap-1 px-3 text-sm text-muted-foreground hover:text-foreground"
        >
          <Plus className="size-3.5" />
          Add Filter
        </Button>
      </div>

      {/* Row 2: applied filter chips */}
      {hasChips && (
        <div className="flex flex-wrap items-center gap-1.5">
          {appliedFilters.map((chip) => (
            <span
              key={chip.id}
              className="inline-flex items-center gap-1 rounded-full border border-primary/40 bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-foreground"
            >
              {chip.label}
              <button
                onClick={chip.onRemove}
                aria-label={`Remove ${chip.label} filter`}
                className="ml-0.5 rounded-full text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="size-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export { FilterBar, type FilterBarProps, type QuickFilterDef, type AppliedFilterChip, type FilterOption }
