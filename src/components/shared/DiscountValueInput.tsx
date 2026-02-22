"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type DiscountMode = "flat" | "percent"

interface DiscountValueInputProps {
  mode?: DiscountMode
  onModeChange?: (mode: DiscountMode) => void
  value?: number | ""
  onChange?: (value: number | "") => void
  className?: string
}

function DiscountValueInput({
  mode = "percent",
  onModeChange,
  value = "",
  onChange,
  className,
}: DiscountValueInputProps) {
  const suffix = mode === "percent" ? "%" : ""
  const prefix = mode === "flat" ? "$" : ""

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {/* Toggle tabs */}
      <div className="inline-flex h-9 items-center rounded-lg border border-border bg-muted p-0.5">
        <button
          type="button"
          onClick={() => onModeChange?.("flat")}
          className={cn(
            "flex h-full items-center rounded-md px-4 text-sm font-medium transition-colors",
            mode === "flat"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          $ Flat
        </button>
        <button
          type="button"
          onClick={() => onModeChange?.("percent")}
          className={cn(
            "flex h-full items-center rounded-md px-4 text-sm font-medium transition-colors",
            mode === "percent"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          % Percent
        </button>
      </div>

      {/* Number input */}
      <div className="relative flex items-center">
        {prefix && (
          <span className="pointer-events-none absolute left-3 text-sm text-muted-foreground select-none">
            {prefix}
          </span>
        )}
        <input
          type="number"
          min={0}
          max={mode === "percent" ? 100 : undefined}
          step={mode === "percent" ? 1 : 0.01}
          value={value}
          onChange={(e) => {
            const v = e.target.value
            onChange?.(v === "" ? "" : Number(v))
          }}
          className={cn(
            "h-10 w-full rounded-md border border-input bg-background text-sm text-foreground transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-ring/50",
            "placeholder:text-muted-foreground",
            prefix ? "pl-7 pr-8" : "pl-3 pr-8",
            "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          )}
          placeholder="0"
        />
        {suffix && (
          <span className="pointer-events-none absolute right-3 text-sm text-muted-foreground select-none">
            {suffix}
          </span>
        )}
      </div>
    </div>
  )
}

export { DiscountValueInput, type DiscountValueInputProps, type DiscountMode }
