"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

type StepState = "completed" | "active" | "upcoming"

interface StepDef {
  id: string
  label: string
}

interface StepperSidebarProps {
  steps: StepDef[]
  activeStep: number // 0-based index
  className?: string
}

function StepperSidebar({ steps, activeStep, className }: StepperSidebarProps) {
  return (
    <aside
      className={cn(
        "flex w-56 shrink-0 flex-col gap-1 border-r border-border bg-muted/30 px-4 py-6",
        className
      )}
    >
      {steps.map((step, i) => {
        const state: StepState =
          i < activeStep ? "completed" : i === activeStep ? "active" : "upcoming"

        return (
          <div key={step.id} className="flex items-center gap-3 px-1 py-2.5">
            {/* Step indicator */}
            <div
              className={cn(
                "flex size-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold transition-colors",
                state === "completed" &&
                  "border-green-500 bg-green-500 text-white",
                state === "active" &&
                  "border-primary bg-primary text-primary-foreground",
                state === "upcoming" &&
                  "border-border bg-background text-muted-foreground"
              )}
            >
              {state === "completed" ? (
                <Check className="size-3.5" strokeWidth={2.5} />
              ) : (
                <span>{i + 1}</span>
              )}
            </div>

            {/* Step label */}
            <span
              className={cn(
                "text-sm leading-tight",
                state === "active" && "font-semibold text-foreground",
                state === "completed" && "font-medium text-foreground",
                state === "upcoming" && "text-muted-foreground"
              )}
            >
              {step.label}
            </span>
          </div>
        )
      })}
    </aside>
  )
}

export { StepperSidebar, type StepperSidebarProps, type StepDef, type StepState }
