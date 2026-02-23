"use client"

import * as React from "react"
import { Tag } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ImageUploadArea } from "@/components/shared/ImageUploadArea"
import { FeatureToggleCard } from "@/components/shared/FeatureToggleCard"
import type { WizardStepProps } from "@/components/shared/wizard"

function OfferBasicsWizardStep({ data, updateData, errors }: WizardStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-semibold text-foreground">Offer Details</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Set the basic information for your offer. This will be shown to creators.
        </p>
      </div>

      {/* Offer Name */}
      <div className="space-y-1.5">
        <Label htmlFor="offer-name">Offer Name</Label>
        <Input
          id="offer-name"
          placeholder="e.g. Summer Skincare Promotion"
          value={data.offerName ?? ""}
          onChange={(e) => updateData("offerName", e.target.value)}
          aria-invalid={!!errors.offerName || !!errors["offer-basics"]}
        />
        {(errors.offerName || errors["offer-basics"]) && (
          <p className="text-xs text-red-500">{errors.offerName || errors["offer-basics"]}</p>
        )}
      </div>

      {/* Offer Description */}
      <div className="space-y-1.5">
        <Label htmlFor="offer-description">Offer Description</Label>
        <Textarea
          id="offer-description"
          placeholder="Describe what the offer includes, who it's for, and any special terms..."
          rows={4}
          value={data.offerDescription ?? ""}
          onChange={(e) => updateData("offerDescription", e.target.value)}
          className="resize-none"
        />
        <p className="text-xs text-muted-foreground">
          This description will be visible to creators when they view the offer details.
        </p>
      </div>

      {/* Offer Duration */}
      <div className="space-y-1.5">
        <Label>Offer Duration</Label>
        <div className="flex items-center gap-2">
          <Input
            type="date"
            value={data.dateRangeFrom ?? ""}
            onChange={(e) => updateData("dateRangeFrom", e.target.value)}
            className="flex-1"
            aria-label="Start date"
          />
          <span className="text-sm text-muted-foreground">to</span>
          <Input
            type="date"
            value={data.dateRangeTo ?? ""}
            min={data.dateRangeFrom}
            onChange={(e) => updateData("dateRangeTo", e.target.value)}
            className="flex-1"
            aria-label="End date"
          />
        </div>
      </div>

      {/* Image Upload */}
      <div className="space-y-1.5">
        <Label>Offer Image</Label>
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
          className="min-h-36"
        />
      </div>

      {/* Generate promo codes toggle */}
      <FeatureToggleCard
        icon={<Tag className="size-4" />}
        title="Generate promo codes for this offer"
        description="Automatically create unique promo codes that creators can share with their audience to track conversions."
        checked={data.generatePromoCodes ?? false}
        onCheckedChange={(checked) => updateData("generatePromoCodes", checked)}
      />
    </div>
  )
}

export { OfferBasicsWizardStep }
