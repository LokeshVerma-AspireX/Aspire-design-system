"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getPlaceholderName } from "../config"
import type { CreationFlowStepProps } from "../types"

const MAX_NAME_LENGTH = 35

function DetailsStep({ data, updateData, errors }: CreationFlowStepProps) {
  const placeholder = getPlaceholderName(data.objective, data.campaignType)
  const nameLength = data.campaignName?.length ?? 0

  // Default start date to today if not set
  React.useEffect(() => {
    if (!data.startDate) {
      const today = new Date().toISOString().split("T")[0]
      updateData("startDate", today)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const today = new Date().toISOString().split("T")[0]

  return (
    <div className="mx-auto max-w-lg space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Name your campaign
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          You can update these anytime in Settings.
        </p>
      </div>

      {/* Campaign Name */}
      <div className="space-y-1.5">
        <Label htmlFor="campaign-name">
          Campaign name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="campaign-name"
          placeholder={placeholder}
          maxLength={MAX_NAME_LENGTH}
          value={data.campaignName ?? ""}
          onChange={(e) => updateData("campaignName", e.target.value)}
          aria-invalid={!!errors.campaignName}
        />
        <div className="flex items-center justify-between">
          {errors.campaignName ? (
            <p className="text-xs text-red-500">{errors.campaignName}</p>
          ) : (
            <span />
          )}
          <span
            className={cn(
              "text-xs",
              nameLength >= MAX_NAME_LENGTH
                ? "text-red-500"
                : "text-muted-foreground"
            )}
          >
            {nameLength} / {MAX_NAME_LENGTH}
          </span>
        </div>
      </div>

      {/* Start Date */}
      <div className="space-y-1.5">
        <Label htmlFor="start-date">Start date</Label>
        <Input
          id="start-date"
          type="date"
          min={today}
          value={data.startDate ?? ""}
          onChange={(e) => updateData("startDate", e.target.value)}
        />
      </div>

      {/* End Date */}
      <div className="space-y-1.5">
        <Label htmlFor="end-date">End date (optional)</Label>
        <Input
          id="end-date"
          type="date"
          placeholder="No end date"
          min={data.startDate ?? today}
          value={data.endDate ?? ""}
          onChange={(e) => updateData("endDate", e.target.value)}
        />
        {data.objective === "ambassador_program" && (
          <p className="text-xs text-muted-foreground">
            Ambassador programs typically don&apos;t have an end date
          </p>
        )}
        {errors.endDate && (
          <p className="text-xs text-red-500">{errors.endDate}</p>
        )}
      </div>
    </div>
  )
}

export { DetailsStep }
