"use client"

import * as React from "react"
import { Pencil } from "lucide-react"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import type { WizardStepProps } from "../CreationWizard"

interface ReviewSection {
  id: string
  title: string
  stepIndex: number
  rows: { label: string; value: React.ReactNode }[]
}

interface ReviewStepConfig {
  title?: string
  description?: string
  confirmLabel?: string
  sections: ReviewSection[] | ((data: Record<string, any>) => ReviewSection[])
}

interface ReviewStepProps extends WizardStepProps {
  config: ReviewStepConfig
  onEditSection?: (stepIndex: number) => void
}

function ReviewRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5 text-sm">
      <span className="shrink-0 text-muted-foreground">{label}</span>
      <span className="text-right font-medium text-foreground">{value ?? "—"}</span>
    </div>
  )
}

function ReviewStep({ data, updateData, errors, config, onEditSection }: ReviewStepProps) {
  const title = config.title ?? "Review & Create"
  const description = config.description ?? "Review your details before submitting."
  const confirmLabel = config.confirmLabel ?? "I've reviewed and everything looks correct"

  const sections = typeof config.sections === "function"
    ? config.sections(data)
    : config.sections

  return (
    <div className="space-y-6">
      {/* Section title */}
      <div>
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
      </div>

      {/* Review sections */}
      {sections.map((section) => (
        <section
          key={section.id}
          className="rounded-lg border border-border overflow-hidden"
        >
          <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-2.5">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {section.title}
            </h3>
            {onEditSection && (
              <button
                type="button"
                onClick={() => onEditSection(section.stepIndex)}
                className="inline-flex items-center gap-1 text-xs text-primary hover:underline underline-offset-2"
              >
                <Pencil className="size-3" />
                Edit
              </button>
            )}
          </div>
          <div className="divide-y divide-border px-4">
            {section.rows.map((row, i) => (
              <ReviewRow key={i} label={row.label} value={row.value} />
            ))}
          </div>
        </section>
      ))}

      {/* Confirm checkbox */}
      <div className="flex items-start gap-3 rounded-lg border border-border p-4">
        <Checkbox
          id="wizard-confirm"
          checked={data._confirmed ?? false}
          onCheckedChange={(checked) => updateData("_confirmed", !!checked)}
        />
        <Label
          htmlFor="wizard-confirm"
          className="text-sm leading-relaxed text-foreground cursor-pointer"
        >
          {confirmLabel}
        </Label>
      </div>
      {errors._confirmed && (
        <p className="text-xs text-red-500">{errors._confirmed}</p>
      )}
    </div>
  )
}

export {
  ReviewStep,
  type ReviewStepProps,
  type ReviewStepConfig,
  type ReviewSection,
}
