"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

type StepStatus = "completed" | "active" | "upcoming"

interface HorizontalStepperProps {
  steps: string[]
  activeStep: number
  className?: string
}

function HorizontalStepper({ steps, activeStep, className }: HorizontalStepperProps) {
  return (
    <nav
      aria-label="Progress"
      className={cn("flex items-center justify-center px-6 py-4", className)}
    >
      <ol className="flex items-center gap-0">
        {steps.map((label, i) => {
          const status: StepStatus =
            i < activeStep ? "completed" : i === activeStep ? "active" : "upcoming"

          return (
            <li key={label} className="flex items-center">
              <div className="flex flex-col items-center gap-1.5">
                {/* Circle */}
                <div
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition-colors",
                    status === "completed" &&
                      "border-green-500 bg-green-500 text-white",
                    status === "active" &&
                      "border-primary bg-primary text-primary-foreground",
                    status === "upcoming" &&
                      "border-border bg-background text-muted-foreground"
                  )}
                >
                  {status === "completed" ? (
                    <Check className="size-4" strokeWidth={2.5} />
                  ) : (
                    <span>{i + 1}</span>
                  )}
                </div>

                {/* Label */}
                <span
                  className={cn(
                    "whitespace-nowrap text-xs",
                    status === "active" && "font-semibold text-foreground",
                    status === "completed" && "font-medium text-muted-foreground",
                    status === "upcoming" && "text-muted-foreground"
                  )}
                >
                  {label}
                </span>
              </div>

              {/* Connecting line */}
              {i < steps.length - 1 && (
                <div
                  className={cn(
                    "mx-3 mb-5 h-0.5 w-16 shrink-0 transition-colors",
                    i < activeStep ? "bg-green-500" : "bg-border"
                  )}
                />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export { HorizontalStepper, type HorizontalStepperProps }
