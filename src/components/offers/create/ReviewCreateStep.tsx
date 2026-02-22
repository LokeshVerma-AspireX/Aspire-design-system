"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { FormFooter } from "@/components/shared/FormFooter"
import type { OfferDetailsStepData } from "./OfferDetailsStep"
import type { ConfigureDiscountStepData } from "./ConfigureDiscountStep"

interface ReviewCreateStepProps {
  offerDetails?: Partial<OfferDetailsStepData>
  discountConfig?: Partial<ConfigureDiscountStepData>
  onClose?: () => void
  onPrevious?: () => void
  onSubmit?: () => void
}

function ReviewRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5 text-sm">
      <span className="shrink-0 text-muted-foreground">{label}</span>
      <span className="text-right font-medium text-foreground">{value ?? "—"}</span>
    </div>
  )
}

function ReviewCreateStep({
  offerDetails,
  discountConfig,
  onClose,
  onPrevious,
  onSubmit,
}: ReviewCreateStepProps) {
  const discountSummary = discountConfig?.discountValue
    ? discountConfig.discountMode === "percent"
      ? `${discountConfig.discountValue}% off`
      : `$${discountConfig.discountValue} off`
    : "—"

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="mx-auto max-w-xl space-y-6">
          <div>
            <h2 className="text-base font-semibold text-foreground">Review & Create</h2>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Review your offer details before publishing.
            </p>
          </div>

          {/* Offer Details summary */}
          <section className="rounded-lg border border-border overflow-hidden">
            <div className="border-b border-border bg-muted/40 px-4 py-2.5">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Offer Details
              </h3>
            </div>
            <div className="divide-y divide-border px-4">
              <ReviewRow label="Offer Name" value={offerDetails?.offerName || "—"} />
              <ReviewRow
                label="Duration"
                value={
                  offerDetails?.dateRange?.from
                    ? `${offerDetails.dateRange.from} → ${offerDetails.dateRange.to ?? "TBD"}`
                    : "—"
                }
              />
              <ReviewRow
                label="Promo Codes"
                value={offerDetails?.generatePromoCodes ? "Enabled" : "Disabled"}
              />
            </div>
          </section>

          {/* Discount summary */}
          <section className="rounded-lg border border-border overflow-hidden">
            <div className="border-b border-border bg-muted/40 px-4 py-2.5">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Discount Configuration
              </h3>
            </div>
            <div className="divide-y divide-border px-4">
              <ReviewRow label="Customer Discount" value={discountSummary} />
              <ReviewRow
                label="SecureCodes™"
                value={discountConfig?.enableSecureCodes ? "Enabled" : "Disabled"}
              />
              <ReviewRow
                label="Landing Page"
                value={discountConfig?.enableLandingPage ? "Enabled" : "Disabled"}
              />
            </div>
          </section>
        </div>
      </div>

      <FormFooter
        onClose={onClose}
        onPrevious={onPrevious}
        onNext={onSubmit}
        showPrevious
        nextLabel="Create Offer"
      />
    </div>
  )
}

export { ReviewCreateStep, type ReviewCreateStepProps }
