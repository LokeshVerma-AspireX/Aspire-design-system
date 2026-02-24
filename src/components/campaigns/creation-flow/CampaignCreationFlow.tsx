"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { CampaignCreationHeader } from "./CampaignCreationHeader"
import { HorizontalStepper } from "./HorizontalStepper"
import { UnsavedChangesDialog } from "./UnsavedChangesDialog"
import { ObjectiveStep } from "./steps/ObjectiveStep"
import { CampaignTypeStep } from "./steps/CampaignTypeStep"
import { DetailsStep } from "./steps/DetailsStep"
import { ReviewStep } from "./steps/ReviewStep"
import { STEP_LABELS } from "./config"
import type {
  CampaignCreationData,
  CampaignCreationFlowProps,
  CreationFlowStepProps,
} from "./types"

// ── Step definitions ──────────────────────────────────────────────────────────

interface StepDef {
  id: string
  label: string
  component: React.ComponentType<CreationFlowStepProps>
  validation?: (data: CampaignCreationData) => true | string
}

const STEPS: StepDef[] = [
  {
    id: "objective",
    label: "Objective",
    component: ObjectiveStep,
    validation: (data) => {
      if (!data.objective) return "Please select an objective"
      return true
    },
  },
  {
    id: "campaign-type",
    label: "Campaign Type",
    component: CampaignTypeStep,
    validation: (data) => {
      if (!data.campaignType) return "Please select a campaign type"
      return true
    },
  },
  {
    id: "details",
    label: "Details",
    component: DetailsStep,
    validation: (data) => {
      if (!data.campaignName?.trim()) return "Campaign name is required"
      if (data.endDate && data.startDate && data.endDate < data.startDate) {
        return "End date must be after start date"
      }
      return true
    },
  },
  {
    id: "review",
    label: "Review",
    component: ReviewStep,
  },
]

// ── Main Component ────────────────────────────────────────────────────────────

function CampaignCreationFlow({
  onComplete,
  onCancel,
  initialData,
  initialStep = 0,
  className,
}: CampaignCreationFlowProps) {
  const [activeStep, setActiveStep] = React.useState(initialStep)
  const [data, setData] = React.useState<CampaignCreationData>(
    () => ({ ...initialData }) as CampaignCreationData
  )
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [showUnsavedDialog, setShowUnsavedDialog] = React.useState(false)

  const currentStep = STEPS[activeStep]
  const isFirstStep = activeStep === 0
  const isFinalStep = activeStep === STEPS.length - 1

  // Track whether user has entered any data
  const isDirty = React.useMemo(() => {
    return !!(
      data.objective ||
      data.campaignType ||
      data.campaignName?.trim() ||
      data.kpiTarget?.trim()
    )
  }, [data.objective, data.campaignType, data.campaignName, data.kpiTarget])

  const updateData = React.useCallback(
    (key: keyof CampaignCreationData, value: any) => {
      setData((prev) => ({ ...prev, [key]: value }))
      // Clear errors for this key
      setErrors((prev) => {
        if (prev[key]) {
          const next = { ...prev }
          delete next[key]
          return next
        }
        return prev
      })
    },
    []
  )

  function validateCurrentStep(): boolean {
    if (!currentStep.validation) return true
    const result = currentStep.validation(data)
    if (result === true) {
      setErrors({})
      return true
    }
    setErrors({ [currentStep.id]: result })
    return false
  }

  function goNext() {
    if (!validateCurrentStep()) return

    if (isFinalStep) {
      onComplete(data)
    } else {
      setActiveStep((prev) => prev + 1)
      setErrors({})
    }
  }

  function goPrevious() {
    setActiveStep((prev) => Math.max(prev - 1, 0))
    setErrors({})
  }

  function goToStep(step: number) {
    if (step >= 0 && step < STEPS.length) {
      setActiveStep(step)
      setErrors({})
    }
  }

  function handleClose() {
    if (isDirty) {
      setShowUnsavedDialog(true)
    } else {
      onCancel()
    }
  }

  // Keyboard shortcuts
  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault()
        handleClose()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }) // intentionally re-registers on every render to capture latest isDirty

  const StepComponent = currentStep.component

  // CTA label
  const ctaLabel = isFinalStep ? "Create Campaign" : "Continue"
  // Disable CTA based on step requirements
  const ctaDisabled =
    (activeStep === 0 && !data.objective) ||
    (activeStep === 1 && !data.campaignType) ||
    (activeStep === 2 && !data.campaignName?.trim())

  return (
    <div
      className={cn(
        "flex h-full flex-col overflow-hidden bg-background",
        className
      )}
    >
      {/* Header */}
      <CampaignCreationHeader
        onBack={goPrevious}
        onClose={handleClose}
        isFirstStep={isFirstStep}
      />

      {/* Horizontal Stepper */}
      <HorizontalStepper
        steps={[...STEP_LABELS]}
        activeStep={activeStep}
        className="border-b border-border"
      />

      {/* Step Content */}
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="mx-auto max-w-2xl">
          <StepComponent
            data={data}
            updateData={updateData}
            errors={errors}
            onGoToStep={goToStep}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-border px-6 py-4">
        {/* Error message */}
        <div>
          {errors[currentStep.id] && (
            <p className="text-sm text-red-500">{errors[currentStep.id]}</p>
          )}
        </div>

        {/* CTA */}
        <Button
          type="button"
          onClick={goNext}
          disabled={ctaDisabled}
          className="h-10 gap-1.5 px-6"
        >
          {ctaLabel}
        </Button>
      </div>

      {/* Unsaved Changes Dialog */}
      <UnsavedChangesDialog
        open={showUnsavedDialog}
        onDiscard={onCancel}
        onKeepEditing={() => setShowUnsavedDialog(false)}
      />
    </div>
  )
}

export { CampaignCreationFlow }
