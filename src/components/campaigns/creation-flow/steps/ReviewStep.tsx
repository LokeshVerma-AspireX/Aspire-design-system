"use client"

import * as React from "react"
import { Pencil } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  OBJECTIVES,
  CAMPAIGN_TYPES,
  KPI_PERIODS,
  getNextSteps,
} from "../config"
import { WorkflowStagePreview } from "../WorkflowStagePreview"
import type { CreationFlowStepProps } from "../types"

function ReviewStep({ data, onGoToStep }: CreationFlowStepProps) {
  const objective = OBJECTIVES.find((o) => o.id === data.objective)
  const campaignType = CAMPAIGN_TYPES.find((t) => t.id === data.campaignType)
  const kpiPeriod = KPI_PERIODS.find((p) => p.value === (data.kpiPeriod ?? "total_campaign"))
  const nextSteps = getNextSteps(data.campaignType)

  function formatDate(dateStr?: string): string {
    if (!dateStr) return ""
    const d = new Date(dateStr + "T00:00:00")
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const dateDisplay = data.startDate
    ? `${formatDate(data.startDate)} \u2013 ${data.endDate ? formatDate(data.endDate) : "No end date"}`
    : "Not set"

  const kpiDisplay = data.kpiTarget
    ? `${data.kpiTarget} (${kpiPeriod?.label ?? "Total campaign"})`
    : "Not set yet"

  return (
    <div className="mx-auto max-w-lg space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          You&apos;re all set
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Here&apos;s a summary of your campaign. You can fine-tune everything in
          Settings after creation.
        </p>
      </div>

      {/* Campaign Summary */}
      <div className="space-y-1 rounded-lg border border-border">
        <SummaryRow
          label="Objective"
          value={
            objective ? (
              <span className="flex items-center gap-2">
                <objective.icon className="size-4 text-muted-foreground" />
                {objective.title}
              </span>
            ) : (
              "\u2014"
            )
          }
          onEdit={() => onGoToStep?.(0)}
        />
        <SummaryRow
          label="Target"
          value={
            <span className={cn(!data.kpiTarget && "text-muted-foreground")}>
              {kpiDisplay}
            </span>
          }
          onEdit={() => onGoToStep?.(0)}
        />
        <SummaryRow
          label="Campaign type"
          value={campaignType?.title ?? "\u2014"}
          onEdit={() => onGoToStep?.(1)}
        />
        <SummaryRow
          label="Campaign name"
          value={data.campaignName || "\u2014"}
          onEdit={() => onGoToStep?.(2)}
        />
        <SummaryRow
          label="Dates"
          value={dateDisplay}
          onEdit={() => onGoToStep?.(2)}
          isLast
        />
      </div>

      {/* Workflow Stages */}
      <div className="space-y-3">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Default workflow stages
          </h3>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Loaded from your campaign type. You can add, remove, or reorder
            stages in Settings &rarr; Workflow.
          </p>
        </div>

        {campaignType && (
          <WorkflowStagePreview
            stages={campaignType.stages}
            note={campaignType.stageNote}
          />
        )}
      </div>

      {/* Next Steps */}
      <div className="space-y-3 rounded-lg border border-border bg-muted/30 p-4">
        <h3 className="text-sm font-semibold text-foreground">
          After creating, you can
        </h3>
        <ul className="space-y-1.5">
          {nextSteps.map((step) => (
            <li
              key={step}
              className="flex items-start gap-2 text-xs text-muted-foreground"
            >
              <span className="mt-1.5 size-1 shrink-0 rounded-full bg-muted-foreground" />
              {step}
            </li>
          ))}
        </ul>
        <p className="text-xs italic text-muted-foreground/70">
          We&apos;ll guide you through these on your campaign dashboard.
        </p>
      </div>
    </div>
  )
}

// ── Summary Row ─────────────────────────────────────────────────────────────

interface SummaryRowProps {
  label: string
  value: React.ReactNode
  onEdit?: () => void
  isLast?: boolean
}

function SummaryRow({ label, value, onEdit, isLast }: SummaryRowProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between px-4 py-3",
        !isLast && "border-b border-border"
      )}
    >
      <div className="flex items-center gap-3">
        <span className="w-28 shrink-0 text-xs font-medium text-muted-foreground">
          {label}
        </span>
        <span className="text-sm text-foreground">{value}</span>
      </div>
      {onEdit && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onEdit}
          className="size-7 text-muted-foreground hover:text-foreground"
          aria-label={`Edit ${label}`}
        >
          <Pencil className="size-3.5" />
        </Button>
      )}
    </div>
  )
}

export { ReviewStep }
