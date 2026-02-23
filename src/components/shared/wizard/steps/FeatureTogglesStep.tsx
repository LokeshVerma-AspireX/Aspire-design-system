"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { FeatureToggleCard } from "@/components/shared/FeatureToggleCard"
import type { WizardStepProps } from "../CreationWizard"

interface FeatureToggleItem {
  id: string
  icon?: React.ReactNode
  title: string
  description?: string
  recommended?: boolean
  checklistItems?: string[]
  footerLink?: { label: string; onClick?: () => void }
}

interface FeatureTogglesStepConfig {
  title?: string
  description?: string
  features: FeatureToggleItem[]
}

interface FeatureTogglesStepProps extends WizardStepProps {
  config: FeatureTogglesStepConfig
}

function FeatureTogglesStep({
  data,
  updateData,
  config,
}: FeatureTogglesStepProps) {
  const title = config.title ?? "Features"
  const description = config.description ?? "Enable or disable features for your setup."

  return (
    <div className="space-y-6">
      {/* Section title */}
      <div>
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
      </div>

      {/* Feature cards */}
      <div className="space-y-3">
        {config.features.map((feature) => (
          <FeatureToggleCard
            key={feature.id}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            recommended={feature.recommended}
            checked={data[feature.id] ?? false}
            onCheckedChange={(checked) => updateData(feature.id, checked)}
            checklistItems={feature.checklistItems}
            footerLink={feature.footerLink}
          />
        ))}
      </div>
    </div>
  )
}

export {
  FeatureTogglesStep,
  type FeatureTogglesStepProps,
  type FeatureTogglesStepConfig,
  type FeatureToggleItem,
}
