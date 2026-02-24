"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { OBJECTIVES, KPI_PERIODS } from "../config"
import type { CreationFlowStepProps } from "../types"

function ObjectiveStep({ data, updateData }: CreationFlowStepProps) {
  const selectedObjective = OBJECTIVES.find((o) => o.id === data.objective)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          What&apos;s the goal of this campaign?
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This helps us recommend the right setup and track what matters most.
        </p>
      </div>

      {/* Objective Cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {OBJECTIVES.map((objective) => {
          const isSelected = data.objective === objective.id
          return (
            <button
              key={objective.id}
              type="button"
              onClick={() => {
                updateData("objective", objective.id)
                if (data.objective !== objective.id) {
                  updateData("kpiTarget", undefined)
                }
              }}
              className={cn(
                "relative flex flex-col items-start gap-3 rounded-lg border-2 p-4 text-left transition-all",
                isSelected
                  ? objective.selectedColor
                  : "border-border bg-card hover:border-muted-foreground/30"
              )}
            >
              {/* Check badge */}
              {isSelected && (
                <div className="absolute right-3 top-3 flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="size-3" strokeWidth={3} />
                </div>
              )}

              {/* Icon */}
              <objective.icon
                className={cn(
                  "size-6",
                  isSelected ? "text-foreground" : "text-muted-foreground"
                )}
              />

              {/* Text */}
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {objective.title}
                </p>
                <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                  {objective.description}
                </p>
              </div>
            </button>
          )
        })}
      </div>

      {/* KPI Target (slide-in after selection) */}
      {selectedObjective && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 space-y-3 rounded-lg border border-border bg-muted/30 p-5">
          <div>
            <Label className="text-sm font-medium">
              Set a target (optional)
            </Label>
            <p className="mt-0.5 text-xs text-muted-foreground">
              You can always add or change this later.
            </p>
          </div>

          <div className="flex items-end gap-3">
            {/* KPI Input */}
            <div className="flex-1 space-y-1.5">
              <Label htmlFor="kpi-target" className="text-xs text-muted-foreground">
                {selectedObjective.kpiLabel}
              </Label>
              <Input
                id="kpi-target"
                placeholder={selectedObjective.kpiPlaceholder}
                value={data.kpiTarget ?? ""}
                onChange={(e) => updateData("kpiTarget", e.target.value)}
              />
            </div>

            {/* Period Dropdown */}
            <div className="w-44 space-y-1.5">
              <Label className="text-xs text-muted-foreground">
                Time period
              </Label>
              <Select
                value={data.kpiPeriod ?? "total_campaign"}
                onValueChange={(v) => updateData("kpiPeriod", v)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {KPI_PERIODS.map((period) => (
                    <SelectItem key={period.value} value={period.value}>
                      {period.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export { ObjectiveStep }
