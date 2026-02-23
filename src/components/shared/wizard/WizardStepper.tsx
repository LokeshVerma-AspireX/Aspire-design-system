"use client"

import * as React from "react"
import { Check, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

type StepStatus = "completed" | "active" | "upcoming" | "error"

interface WizardStepDef {
  id: string
  label: string
  icon?: React.ComponentType<{ className?: string }>
  optional?: boolean
}

interface WizardStepperProps {
  steps: WizardStepDef[]
  activeStep: number
  errorSteps?: Set<number>
  onStepClick?: (index: number) => void
  className?: string
}

function WizardStepper({
  steps,
  activeStep,
  errorSteps,
  onStepClick,
  className,
}: WizardStepperProps) {
  return (
    <aside
      className={cn(
        "flex w-60 shrink-0 flex-col gap-0 border-r border-border bg-muted/30 py-6",
        className
      )}
    >
      {steps.map((step, i) => {
        const status: StepStatus = errorSteps?.has(i)
          ? "error"
          : i < activeStep
            ? "completed"
            : i === activeStep
              ? "active"
              : "upcoming"

        const isClickable = status === "completed" || status === "error"

        return (
          <div key={step.id} className="relative flex flex-col">
            {/* Connecting line */}
            {i < steps.length - 1 && (
              <div
                className={cn(
                  "absolute left-[1.625rem] top-[2.25rem] h-[calc(100%-0.5rem)] w-0.5",
                  i < activeStep ? "bg-green-500/40" : "bg-border"
                )}
              />
            )}

            <button
              type="button"
              disabled={!isClickable}
              onClick={() => isClickable && onStepClick?.(i)}
              className={cn(
                "relative z-10 flex items-center gap-3 px-4 py-2.5 text-left transition-colors",
                status === "active" && "bg-primary/10",
                isClickable && "cursor-pointer hover:bg-muted/60",
                !isClickable && status !== "active" && "cursor-default"
              )}
            >
              {/* Step indicator circle */}
              <div
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-bold transition-colors",
                  status === "completed" &&
                    "border-green-500 bg-green-500 text-white",
                  status === "active" &&
                    "border-primary bg-primary text-primary-foreground",
                  status === "upcoming" &&
                    "border-border bg-background text-muted-foreground",
                  status === "error" &&
                    "border-red-500 bg-red-500 text-white"
                )}
              >
                {status === "completed" ? (
                  <Check className="size-3.5" strokeWidth={2.5} />
                ) : status === "error" ? (
                  <AlertCircle className="size-3.5" strokeWidth={2.5} />
                ) : (
                  <span>{i + 1}</span>
                )}
              </div>

              {/* Step label */}
              <div className="flex flex-col">
                <span
                  className={cn(
                    "text-sm leading-tight",
                    status === "active" && "font-semibold text-foreground",
                    status === "completed" && "font-medium text-muted-foreground",
                    status === "upcoming" && "text-muted-foreground",
                    status === "error" && "font-medium text-red-600 dark:text-red-400"
                  )}
                >
                  {step.label}
                </span>
                {step.optional && (
                  <span className="text-[11px] text-muted-foreground/70">
                    (Optional)
                  </span>
                )}
              </div>
            </button>
          </div>
        )
      })}
    </aside>
  )
}

export {
  WizardStepper,
  type WizardStepperProps,
  type WizardStepDef,
  type StepStatus,
}
