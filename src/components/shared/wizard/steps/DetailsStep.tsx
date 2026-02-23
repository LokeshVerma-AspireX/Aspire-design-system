"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ImageUploadArea } from "@/components/shared/ImageUploadArea"
import type { WizardStepProps } from "../CreationWizard"

interface DetailsStepConfig {
  /** Section title */
  title?: string
  /** Section description */
  description?: string
  /** Field configuration */
  fields?: {
    name?: boolean | { label?: string; placeholder?: string }
    description?: boolean | { label?: string; placeholder?: string; rows?: number }
    dateRange?: boolean | { label?: string }
    image?: boolean | { label?: string; recommendedSize?: string }
    budget?: boolean | { label?: string; placeholder?: string; currency?: string }
  }
}

interface DetailsStepProps extends WizardStepProps {
  config?: DetailsStepConfig
}

const DEFAULT_CONFIG: Required<DetailsStepConfig> = {
  title: "Details",
  description: "Set the basic information.",
  fields: {
    name: true,
    description: true,
    dateRange: true,
    image: true,
    budget: false,
  },
}

function getFieldConfig<T extends Record<string, any>>(
  field: boolean | T | undefined,
  defaults: T
): T | null {
  if (!field) return null
  if (field === true) return defaults
  return { ...defaults, ...field }
}

function DetailsStep({ data, updateData, errors, config }: DetailsStepProps) {
  const cfg = { ...DEFAULT_CONFIG, ...config }
  const fields = { ...DEFAULT_CONFIG.fields, ...cfg.fields }

  const nameConfig = getFieldConfig(fields.name, {
    label: "Name",
    placeholder: "Enter a name...",
  })

  const descConfig = getFieldConfig(fields.description, {
    label: "Description",
    placeholder: "Enter a description...",
    rows: 4,
  })

  const dateConfig = getFieldConfig(fields.dateRange, {
    label: "Duration",
  })

  const imageConfig = getFieldConfig(fields.image, {
    label: "Image",
    recommendedSize: "Recommended: 1200x630px",
  })

  const budgetConfig = getFieldConfig(fields.budget, {
    label: "Budget",
    placeholder: "0.00",
    currency: "$",
  })

  return (
    <div className="space-y-6">
      {/* Section title */}
      <div>
        <h2 className="text-base font-semibold text-foreground">{cfg.title}</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">{cfg.description}</p>
      </div>

      {/* Name */}
      {nameConfig && (
        <div className="space-y-1.5">
          <Label htmlFor="wizard-name">{nameConfig.label}</Label>
          <Input
            id="wizard-name"
            placeholder={nameConfig.placeholder}
            value={data.name ?? ""}
            onChange={(e) => updateData("name", e.target.value)}
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <p className="text-xs text-red-500">{errors.name}</p>
          )}
        </div>
      )}

      {/* Description */}
      {descConfig && (
        <div className="space-y-1.5">
          <Label htmlFor="wizard-description">{descConfig.label}</Label>
          <Textarea
            id="wizard-description"
            placeholder={descConfig.placeholder}
            rows={descConfig.rows}
            value={data.description ?? ""}
            onChange={(e) => updateData("description", e.target.value)}
            className="resize-none"
          />
        </div>
      )}

      {/* Date Range */}
      {dateConfig && (
        <div className="space-y-1.5">
          <Label>{dateConfig.label}</Label>
          <div className="flex items-center gap-2">
            <Input
              type="date"
              value={data.startDate ?? ""}
              onChange={(e) => updateData("startDate", e.target.value)}
              className="flex-1"
              aria-label="Start date"
            />
            <span className="text-sm text-muted-foreground">to</span>
            <Input
              type="date"
              value={data.endDate ?? ""}
              min={data.startDate}
              onChange={(e) => updateData("endDate", e.target.value)}
              className="flex-1"
              aria-label="End date"
            />
          </div>
        </div>
      )}

      {/* Image Upload */}
      {imageConfig && (
        <div className="space-y-1.5">
          <Label>{imageConfig.label}</Label>
          <ImageUploadArea
            previewUrl={data.imagePreviewUrl}
            onFileSelect={(file) => {
              const url = URL.createObjectURL(file)
              updateData("imageFile", file)
              updateData("imagePreviewUrl", url)
            }}
            onRemove={() => {
              updateData("imageFile", undefined)
              updateData("imagePreviewUrl", undefined)
            }}
            recommendedSize={imageConfig.recommendedSize}
            className="min-h-36"
          />
        </div>
      )}

      {/* Budget */}
      {budgetConfig && (
        <div className="space-y-1.5">
          <Label htmlFor="wizard-budget">{budgetConfig.label}</Label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              {budgetConfig.currency}
            </span>
            <Input
              id="wizard-budget"
              type="number"
              min="0"
              step="0.01"
              placeholder={budgetConfig.placeholder}
              value={data.budget ?? ""}
              onChange={(e) => updateData("budget", e.target.value)}
              className="pl-7"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export { DetailsStep, type DetailsStepProps, type DetailsStepConfig }
