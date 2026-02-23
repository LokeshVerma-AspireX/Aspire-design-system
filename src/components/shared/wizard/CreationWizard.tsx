"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { WizardStepper } from "./WizardStepper"
import { WizardHeader } from "./WizardHeader"
import { WizardFooter } from "./WizardFooter"

// ─── Types ───────────────────────────────────────────────────────────────────

interface WizardStepProps {
  data: Record<string, any>
  updateData: (key: string, value: any) => void
  errors: Record<string, string>
}

interface WizardStep {
  id: string
  label: string
  icon?: React.ComponentType<{ className?: string }>
  description?: string
  component: React.ComponentType<WizardStepProps>
  validation?: (data: Record<string, any>) => boolean | string
  optional?: boolean
}

interface CreationWizardProps {
  title: string
  steps: WizardStep[]
  onComplete: (data: Record<string, any>) => void
  onCancel: () => void
  initialData?: Record<string, any>
  initialStep?: number
  completeLabel?: string
  loading?: boolean
  className?: string
}

// ─── CreationWizard ──────────────────────────────────────────────────────────

function CreationWizard({
  title,
  steps,
  onComplete,
  onCancel,
  initialData,
  initialStep = 0,
  completeLabel = "Complete",
  loading = false,
  className,
}: CreationWizardProps) {
  const [activeStep, setActiveStep] = React.useState(initialStep)
  const [data, setData] = React.useState<Record<string, any>>(initialData ?? {})
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [errorSteps, setErrorSteps] = React.useState<Set<number>>(new Set())

  const currentStep = steps[activeStep]
  const isFirstStep = activeStep === 0
  const isFinalStep = activeStep === steps.length - 1

  const updateData = React.useCallback((key: string, value: any) => {
    setData((prev) => ({ ...prev, [key]: value }))
    // Clear error for this key when user updates
    setErrors((prev) => {
      if (prev[key]) {
        const next = { ...prev }
        delete next[key]
        return next
      }
      return prev
    })
  }, [])

  function validateCurrentStep(): boolean {
    if (!currentStep.validation) return true

    const result = currentStep.validation(data)
    if (result === true) {
      // Clear error for this step
      setErrorSteps((prev) => {
        const next = new Set(prev)
        next.delete(activeStep)
        return next
      })
      return true
    }

    // Validation failed
    const errorMessage = typeof result === "string" ? result : "Please complete all required fields"
    setErrors((prev) => ({ ...prev, [currentStep.id]: errorMessage }))
    setErrorSteps((prev) => new Set(prev).add(activeStep))
    return false
  }

  function goNext() {
    if (!validateCurrentStep()) return

    if (isFinalStep) {
      onComplete(data)
    } else {
      setActiveStep((prev) => Math.min(prev + 1, steps.length - 1))
    }
  }

  function goPrevious() {
    setActiveStep((prev) => Math.max(prev - 1, 0))
  }

  function goToStep(index: number) {
    if (index < activeStep) {
      setActiveStep(index)
    }
  }

  const StepComponent = currentStep.component

  return (
    <div className={cn("flex h-full flex-col overflow-hidden bg-background", className)}>
      {/* Header */}
      <WizardHeader
        title={title}
        currentStep={activeStep + 1}
        totalSteps={steps.length}
        onClose={onCancel}
      />

      {/* Body: stepper + active step */}
      <div className="flex flex-1 overflow-hidden">
        <WizardStepper
          steps={steps.map((s) => ({
            id: s.id,
            label: s.label,
            icon: s.icon,
            optional: s.optional,
          }))}
          activeStep={activeStep}
          errorSteps={errorSteps}
          onStepClick={goToStep}
        />

        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Step content */}
          <div className="flex-1 overflow-y-auto px-8 py-6">
            <div className="mx-auto max-w-xl">
              <StepComponent
                data={data}
                updateData={updateData}
                errors={errors}
              />
            </div>
          </div>

          {/* Footer */}
          <WizardFooter
            onClose={onCancel}
            onPrevious={goPrevious}
            onNext={goNext}
            isFirstStep={isFirstStep}
            isFinalStep={isFinalStep}
            completeLabel={completeLabel}
            loading={loading}
          />
        </div>
      </div>
    </div>
  )
}

export {
  CreationWizard,
  type CreationWizardProps,
  type WizardStep,
  type WizardStepProps,
}
