"use client"

import * as React from "react"
import { Tag } from "lucide-react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ImageUploadArea } from "@/components/shared/ImageUploadArea"
import { FeatureToggleCard } from "@/components/shared/FeatureToggleCard"
import { FormFooter } from "@/components/shared/FormFooter"

interface DateRange {
  from?: string
  to?: string
}

interface OfferDetailsStepData {
  offerName: string
  offerDescription: string
  dateRange: DateRange
  imageFile?: File
  imagePreviewUrl?: string
  generatePromoCodes: boolean
}

interface OfferDetailsStepProps {
  data: OfferDetailsStepData
  onChange: (data: Partial<OfferDetailsStepData>) => void
  onClose?: () => void
  onNext?: () => void
}

function OfferDetailsStep({ data, onChange, onClose, onNext }: OfferDetailsStepProps) {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="mx-auto max-w-xl space-y-6">
          {/* Section title */}
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
              value={data.offerName}
              onChange={(e) => onChange({ offerName: e.target.value })}
            />
          </div>

          {/* Offer Description */}
          <div className="space-y-1.5">
            <Label htmlFor="offer-description">Offer Description</Label>
            <Textarea
              id="offer-description"
              placeholder="Describe what the offer includes, who it's for, and any special terms..."
              rows={4}
              value={data.offerDescription}
              onChange={(e) => onChange({ offerDescription: e.target.value })}
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
                value={data.dateRange.from ?? ""}
                onChange={(e) =>
                  onChange({ dateRange: { ...data.dateRange, from: e.target.value } })
                }
                className="flex-1"
                aria-label="Start date"
              />
              <span className="text-sm text-muted-foreground">to</span>
              <Input
                type="date"
                value={data.dateRange.to ?? ""}
                min={data.dateRange.from}
                onChange={(e) =>
                  onChange({ dateRange: { ...data.dateRange, to: e.target.value } })
                }
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
                onChange({ imageFile: file, imagePreviewUrl: url })
              }}
              onRemove={() => onChange({ imageFile: undefined, imagePreviewUrl: undefined })}
              className="min-h-36"
            />
          </div>

          {/* Generate promo codes toggle */}
          <FeatureToggleCard
            icon={<Tag className="size-4" />}
            title="Generate promo codes for this offer"
            description="Automatically create unique promo codes that creators can share with their audience to track conversions."
            checked={data.generatePromoCodes}
            onCheckedChange={(checked) => onChange({ generatePromoCodes: checked })}
          />
        </div>
      </div>

      {/* Footer */}
      <FormFooter
        onClose={onClose}
        onNext={onNext}
        nextLabel="Continue"
        showPrevious={false}
      />
    </div>
  )
}

export {
  OfferDetailsStep,
  type OfferDetailsStepProps,
  type OfferDetailsStepData,
  type DateRange,
}
