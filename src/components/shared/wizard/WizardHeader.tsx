"use client"

import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface WizardHeaderProps {
  title: string
  currentStep: number
  totalSteps: number
  onClose?: () => void
  className?: string
}

function WizardHeader({
  title,
  currentStep,
  totalSteps,
  onClose,
  className,
}: WizardHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between border-b border-border px-6 py-4",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-semibold text-foreground">{title}</h1>
        <span className="text-sm text-muted-foreground">
          Step {currentStep} of {totalSteps}
        </span>
      </div>

      {onClose && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="size-8 text-muted-foreground hover:text-foreground"
          aria-label="Close wizard"
        >
          <X className="size-4" />
        </Button>
      )}
    </div>
  )
}

export { WizardHeader, type WizardHeaderProps }
