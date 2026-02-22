"use client"

import * as React from "react"
import { FormFooter } from "@/components/shared/FormFooter"

interface AdvanceConfigStepProps {
  onClose?: () => void
  onPrevious?: () => void
  onNext?: () => void
}

function AdvanceConfigStep({ onClose, onPrevious, onNext }: AdvanceConfigStepProps) {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="mx-auto max-w-xl space-y-6">
          <div>
            <h2 className="text-base font-semibold text-foreground">Advanced Configuration</h2>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Configure advanced settings like attribution windows, UTM parameters, and integrations.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
            Advanced configuration — coming soon
          </div>
        </div>
      </div>
      <FormFooter
        onClose={onClose}
        onPrevious={onPrevious}
        onNext={onNext}
        showPrevious
        nextLabel="Next"
      />
    </div>
  )
}

export { AdvanceConfigStep, type AdvanceConfigStepProps }
