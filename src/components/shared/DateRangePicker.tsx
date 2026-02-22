"use client"

import * as React from "react"
import { Calendar, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DateRange {
  from: string // YYYY-MM-DD
  to: string   // YYYY-MM-DD
}

type PresetKey = "7d" | "30d" | "90d" | "6m" | "1y"

const PRESETS: { label: string; value: PresetKey; range: DateRange }[] = [
  { label: "Last 7 days",   value: "7d",  range: { from: "2026-02-14", to: "2026-02-21" } },
  { label: "Last 30 days",  value: "30d", range: { from: "2026-01-22", to: "2026-02-21" } },
  { label: "Last 90 days",  value: "90d", range: { from: "2025-11-23", to: "2026-02-21" } },
  { label: "Last 6 months", value: "6m",  range: { from: "2025-08-21", to: "2026-02-21" } },
  { label: "Last year",     value: "1y",  range: { from: "2025-02-21", to: "2026-02-21" } },
]

function formatDisplay(date: string): string {
  const d = new Date(date + "T00:00:00")
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

interface DateRangePickerProps {
  value?: DateRange
  onChange?: (range: DateRange) => void
  className?: string
}

function DateRangePicker({ value, onChange, className }: DateRangePickerProps) {
  const [preset, setPreset] = React.useState<PresetKey>("30d")

  const active = PRESETS.find((p) => p.value === preset)
  const range = value ?? active?.range ?? PRESETS[1].range

  const label = value
    ? `${formatDisplay(value.from)} – ${formatDisplay(value.to)}`
    : (active?.label ?? "Date Range")

  function handlePreset(v: string) {
    const p = v as PresetKey
    setPreset(p)
    const found = PRESETS.find((pr) => pr.value === p)
    if (found) onChange?.(found.range)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "inline-flex h-9 items-center gap-1.5 rounded-lg border border-input bg-background px-3 text-sm text-foreground",
            "hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
            className
          )}
        >
          <Calendar className="size-3.5 text-muted-foreground" />
          <span>{label}</span>
          <ChevronDown className="size-3.5 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-44">
        <DropdownMenuRadioGroup value={preset} onValueChange={handlePreset}>
          {PRESETS.map((p) => (
            <DropdownMenuRadioItem key={p.value} value={p.value}>
              {p.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <div className="px-2 py-1.5 text-xs text-muted-foreground">
          {formatDisplay(range.from)} – {formatDisplay(range.to)}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { DateRangePicker, type DateRange, type DateRangePickerProps }
