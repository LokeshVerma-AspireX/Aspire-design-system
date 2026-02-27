"use client"

import * as React from "react"
import { Loader2 } from "lucide-react"
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
  /** Return true on success, a string for a step-level error, or a Record for field-level errors */
  validation?: (
    data: CampaignCreationData
  ) => true | string | Record<string, string>
}

const STEPS: StepDef[] = [
  {
    id: "objective",
    label: "Objective",
    component: ObjectiveStep,
    validation: (data) => {
      if (!data.objective) return "Please select an objective to continue."
      return true
    },
  },
  {
    id: "campaign-type",
    label: "Campaign Type",
    component: CampaignTypeStep,
    validation: (data) => {
      if (!data.campaignType) return "Please select a campaign type to continue."
      return true
    },
  },
  {
    id: "details",
    label: "Details",
    component: DetailsStep,
    validation: (data) => {
      if (!data.campaignName?.trim()) {
        // Field-level error — DetailsStep reads errors.campaignName
        return { campaignName: "Campaign name is required." }
      }
      if (data.endDate && data.startDate && data.endDate < data.startDate) {
        // Field-level error — DetailsStep reads errors.endDate
        return { endDate: "End date must be after the start date." }
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
  isSubmitting = false,
  defaultShowUnsavedDialog = false,
}: CampaignCreationFlowProps) {
  const [activeStep, setActiveStep] = React.useState(initialStep)
  const [data, setData] = React.useState<CampaignCreationData>(
    () => ({ ...initialData }) as CampaignCreationData
  )
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [showUnsavedDialog, setShowUnsavedDialog] = React.useState(
    defaultShowUnsavedDialog
  )

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
      // Clear errors for this field on change
      setErrors((prev) => {
        if (prev[key as string]) {
          const next = { ...prev }
          delete next[key as string]
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
    if (typeof result === "string") {
      // Step-level error — displayed in the footer
      setErrors({ [currentStep.id]: result })
    } else {
      // Field-level errors — each key maps to a field name read by the step component
      setErrors(result)
    }
    return false
  }

  function goNext() {
    if (isSubmitting) return
    if (!validateCurrentStep()) return

    if (isFinalStep) {
      onComplete(data)
    } else {
      setActiveStep((prev) => prev + 1)
      setErrors({})
    }
  }

  function goPrevious() {
    if (isSubmitting) return
    setActiveStep((prev) => Math.max(prev - 1, 0))
    setErrors({})
  }

  function goToStep(step: number) {
    if (isSubmitting) return
    if (step >= 0 && step < STEPS.length) {
      setActiveStep(step)
      setErrors({})
    }
  }

  function handleClose() {
    if (isSubmitting) return
    if (isDirty) {
      setShowUnsavedDialog(true)
    } else {
      onCancel()
    }
  }

  // Keyboard shortcut: Escape → close (with unsaved-changes guard)
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

  // Disable CTA based on per-step requirements (before validation fires)
  const ctaDisabled =
    isSubmitting ||
    (activeStep === 0 && !data.objective) ||
    (activeStep === 1 && !data.campaignType) ||
    (activeStep === 2 && !data.campaignName?.trim())

  // Footer error: step-level OR first field-level error
  const footerError =
    errors[currentStep.id] ?? Object.values(errors)[0] ?? null

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
        disabled={isSubmitting}
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
          {footerError && (
            <p className="text-sm text-destructive">{footerError}</p>
          )}
        </div>

        {/* CTA */}
        <Button
          type="button"
          onClick={goNext}
          disabled={ctaDisabled}
          className="h-10 min-w-32 gap-2 px-6"
        >
          {isFinalStep && isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Creating…
            </>
          ) : (
            ctaLabel
          )}
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
