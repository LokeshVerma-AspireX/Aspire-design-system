"use client"

import * as React from "react"
import type { WizardStepProps } from "@/components/shared/wizard"

function CreatorEarningsWizardStep({ data, updateData }: WizardStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-semibold text-foreground">Creator Earnings</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Define how creators earn commissions from this offer.
        </p>
      </div>
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
        Creator earnings configuration — coming soon
      </div>
    </div>
  )
}

export { CreatorEarningsWizardStep }
