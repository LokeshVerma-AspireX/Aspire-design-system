"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { CAMPAIGN_TYPES, OBJECTIVE_TO_RECOMMENDED_TYPE } from "../config"
import { WorkflowStagePreview } from "../WorkflowStagePreview"
import type { CreationFlowStepProps, CampaignTypeCardConfig } from "../types"

function CampaignTypeStep({ data, updateData }: CreationFlowStepProps) {
  const recommendedType = data.objective
    ? OBJECTIVE_TO_RECOMMENDED_TYPE[data.objective]
    : undefined

  // Sort: recommended first, then remaining in original order
  const sortedTypes = React.useMemo(() => {
    if (!recommendedType) return CAMPAIGN_TYPES
    const recommended: CampaignTypeCardConfig[] = []
    const rest: CampaignTypeCardConfig[] = []
    for (const t of CAMPAIGN_TYPES) {
      if (t.id === recommendedType) recommended.push(t)
      else rest.push(t)
    }
    return [...recommended, ...rest]
  }, [recommendedType])

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Choose a campaign type
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This sets up your default workflow stages. You can customize them in
          Settings.
        </p>
      </div>

      {/* Campaign Type Cards (vertical stack) */}
      <div className="space-y-3">
        {sortedTypes.map((type) => {
          const isSelected = data.campaignType === type.id
          const isRecommended = type.id === recommendedType

          return (
            <button
              key={type.id}
              type="button"
              onClick={() => updateData("campaignType", type.id)}
              className={cn(
                "relative flex w-full items-start gap-4 rounded-lg border-2 p-4 text-left transition-all",
                isSelected
                  ? type.selectedColor
                  : "border-border bg-card hover:border-muted-foreground/30"
              )}
            >
              {/* Check badge */}
              {isSelected && (
                <div className="absolute right-4 top-4 flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="size-3" strokeWidth={3} />
                </div>
              )}

              {/* Icon */}
              <div
                className={cn(
                  "flex size-10 shrink-0 items-center justify-center rounded-lg",
                  isSelected
                    ? "bg-background/60"
                    : "bg-muted"
                )}
              >
                <type.icon
                  className={cn(
                    "size-5",
                    isSelected ? "text-foreground" : "text-muted-foreground"
                  )}
                />
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-foreground">
                    {type.title}
                  </p>
                  {isRecommended && (
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                      Recommended
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {type.subtitle}
                </p>

                {/* Stage Preview */}
                <WorkflowStagePreview
                  stages={type.stages}
                  note={type.stageNote}
                  size="sm"
                  className="mt-2"
                />
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export { CampaignTypeStep }
