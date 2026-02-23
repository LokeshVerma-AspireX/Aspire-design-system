"use client"

import * as React from "react"
import { Megaphone, Gift, Link2, Crown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ImageUploadArea } from "@/components/shared/ImageUploadArea"
import type { WizardStepProps } from "@/components/shared/wizard"

// ─── Campaign type radio cards ───────────────────────────────────────────────

const CAMPAIGN_TYPES = [
  {
    value: "sponsored",
    label: "Sponsored",
    description: "Paid partnerships with creators for branded content",
    icon: Megaphone,
    color: "border-purple-500 bg-purple-50 dark:bg-purple-950/30",
  },
  {
    value: "gifted",
    label: "Gifted",
    description: "Send free products to creators in exchange for content",
    icon: Gift,
    color: "border-teal-500 bg-teal-50 dark:bg-teal-950/30",
  },
  {
    value: "affiliate",
    label: "Affiliate",
    description: "Commission-based partnerships with tracking links",
    icon: Link2,
    color: "border-amber-500 bg-amber-50 dark:bg-amber-950/30",
  },
  {
    value: "ambassador",
    label: "Ambassador",
    description: "Long-term brand ambassador partnerships",
    icon: Crown,
    color: "border-blue-500 bg-blue-50 dark:bg-blue-950/30",
  },
] as const

// ─── Component ───────────────────────────────────────────────────────────────

function CampaignBasicsStep({ data, updateData, errors }: WizardStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-semibold text-foreground">Campaign Basics</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Set the basic information for your campaign.
        </p>
      </div>

      {/* Campaign Name */}
      <div className="space-y-1.5">
        <Label htmlFor="campaign-name">
          Campaign Name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="campaign-name"
          placeholder="e.g. Summer Style Refresh 2026"
          value={data.campaignName ?? ""}
          onChange={(e) => updateData("campaignName", e.target.value)}
          aria-invalid={!!errors.campaignName || !!errors.basics}
        />
        {(errors.campaignName || errors.basics) && (
          <p className="text-xs text-red-500">{errors.campaignName || errors.basics}</p>
        )}
      </div>

      {/* Campaign Description */}
      <div className="space-y-1.5">
        <Label htmlFor="campaign-description">Campaign Description</Label>
        <Textarea
          id="campaign-description"
          placeholder="Describe the campaign goals, target audience, and key messaging..."
          rows={4}
          value={data.campaignDescription ?? ""}
          onChange={(e) => updateData("campaignDescription", e.target.value)}
          className="resize-none"
        />
      </div>

      {/* Campaign Type */}
      <div className="space-y-2">
        <Label>
          Campaign Type <span className="text-red-500">*</span>
        </Label>
        <div className="grid grid-cols-2 gap-3">
          {CAMPAIGN_TYPES.map((type) => {
            const isSelected = data.campaignType === type.value
            return (
              <button
                key={type.value}
                type="button"
                onClick={() => updateData("campaignType", type.value)}
                className={cn(
                  "flex flex-col items-start gap-2 rounded-lg border-2 p-4 text-left transition-all",
                  isSelected
                    ? type.color
                    : "border-border bg-card hover:border-muted-foreground/30"
                )}
              >
                <type.icon className={cn("size-5", isSelected ? "text-foreground" : "text-muted-foreground")} />
                <div>
                  <p className="text-sm font-semibold text-foreground">{type.label}</p>
                  <p className="text-xs text-muted-foreground">{type.description}</p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Campaign Duration */}
      <div className="space-y-1.5">
        <Label>Campaign Duration</Label>
        <div className="flex items-center gap-2">
          <Input
            type="date"
            value={data.campaignStartDate ?? ""}
            onChange={(e) => updateData("campaignStartDate", e.target.value)}
            className="flex-1"
            aria-label="Start date"
          />
          <span className="text-sm text-muted-foreground">to</span>
          <Input
            type="date"
            value={data.campaignEndDate ?? ""}
            min={data.campaignStartDate}
            onChange={(e) => updateData("campaignEndDate", e.target.value)}
            className="flex-1"
            aria-label="End date"
          />
        </div>
      </div>

      {/* Cover Image */}
      <div className="space-y-1.5">
        <Label>Cover Image</Label>
        <ImageUploadArea
          previewUrl={data.coverImagePreviewUrl}
          onFileSelect={(file) => {
            const url = URL.createObjectURL(file)
            updateData("coverImageFile", file)
            updateData("coverImagePreviewUrl", url)
          }}
          onRemove={() => {
            updateData("coverImageFile", undefined)
            updateData("coverImagePreviewUrl", undefined)
          }}
          recommendedSize="Recommended: 1200x630px"
          className="min-h-36"
        />
      </div>

      {/* Budget */}
      <div className="space-y-1.5">
        <Label htmlFor="campaign-budget">Total Budget</Label>
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
            $
          </span>
          <Input
            id="campaign-budget"
            type="number"
            min="0"
            step="100"
            placeholder="0.00"
            value={data.campaignBudget ?? ""}
            onChange={(e) => updateData("campaignBudget", e.target.value)}
            className="pl-7"
          />
        </div>
      </div>
    </div>
  )
}

export { CampaignBasicsStep }
