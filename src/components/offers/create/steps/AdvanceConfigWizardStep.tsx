"use client"

import * as React from "react"
import type { WizardStepProps } from "@/components/shared/wizard"

function AdvanceConfigWizardStep({ data, updateData }: WizardStepProps) {
  return (
    <div className="space-y-6">
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
  )
}

export { AdvanceConfigWizardStep }
